import { create } from "zustand";
import {
  deleteEntry,
  getAllEntries,
  putEntry,
  replaceAllEntries,
} from "../data/idb";
import { requestPersistentStorage } from "../data/persistStorage";
import {
  findEntryByDate,
  formatEntryDate,
  getDayName,
} from "../data/entryUtils";

const emptyDraft = {
  emotion: null,
  intensity: null,
  text: "",
  date: "",
  day: "",
};

export const useEntryStore = create((set, get) => ({
  entries: [],
  isHydrated: false,
  overwriteId: null,
  draftEntryId: null,
  draft: { ...emptyDraft },

  hydrate: async () => {
    try {
      const entries = await getAllEntries();
      set({ entries, isHydrated: true });
    } catch {
      set({ entries: [], isHydrated: true });
    }
  },

  getEntryById: (id) =>
    get().entries.find((entry) => String(entry.id) === String(id)),

  getEntryByDate: (date) => findEntryByDate(get().entries, date),

  setDraft: (partial) =>
    set((state) => ({ draft: { ...state.draft, ...partial } })),

  initWriteDraft: (date = new Date(), overwriteId = null) => {
    const target = date instanceof Date ? date : new Date();
    set({
      overwriteId,
      draftEntryId: "write",
      draft: {
        emotion: null,
        intensity: null,
        text: "",
        date: formatEntryDate(target),
        day: getDayName(target),
      },
    });
  },

  initEditDraft: (id) => {
    const entry = get().getEntryById(id);
    if (!entry) return false;
    set({
      overwriteId: null,
      draftEntryId: String(id),
      draft: {
        emotion: entry.emotion ?? null,
        intensity: entry.intensity === null ? 4 : entry.intensity,
        text: entry.text ?? "",
        date: entry.date,
        day: entry.day,
      },
    });
    return true;
  },

  saveDraft: async (editId) => {
    const { draft, entries, overwriteId } = get();
    if (!draft.emotion) return { ok: false, reason: "emotion" };

    const intensity = draft.intensity === null ? 4 : draft.intensity;
    const targetId = editId || overwriteId;

    if (targetId) {
      const prev = get().getEntryById(targetId);
      if (!prev) return { ok: false, reason: "missing" };
      const next = {
        ...prev,
        date: draft.date || prev.date,
        day: draft.day || prev.day,
        emotion: draft.emotion,
        intensity,
        text: draft.text,
      };
      await putEntry(next);
      set({
        overwriteId: null,
        entries: entries.map((entry) =>
          String(entry.id) === String(targetId) ? next : entry,
        ),
      });
      await requestPersistentStorage();
      return { ok: true, id: prev.id };
    }

    const nextId =
      entries.reduce((max, entry) => Math.max(max, Number(entry.id) || 0), 0) +
      1;
    const next = {
      id: nextId,
      date: draft.date,
      day: draft.day,
      emotion: draft.emotion,
      intensity,
      text: draft.text,
    };
    await putEntry(next);
    set({ overwriteId: null, entries: [...entries, next] });
    await requestPersistentStorage();
    return { ok: true, id: nextId };
  },

  deleteEntryById: async (id) => {
    await deleteEntry(id);
    set({
      entries: get().entries.filter(
        (entry) => String(entry.id) !== String(id),
      ),
    });
  },

  replaceEntries: async (nextEntries) => {
    await replaceAllEntries(nextEntries);
    set({ entries: nextEntries });
    await requestPersistentStorage();
  },
}));
