const DB_NAME = "harudal-diary";
const DB_VERSION = 1;
const STORE_NAME = "entries";

let dbPromise = null;

const openDb = () => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });

  return dbPromise;
};

const toId = (id) => {
  const numericId = Number(id);
  return Number.isNaN(numericId) ? id : numericId;
};

const withStore = async (mode, handler) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    const request = handler(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllEntries = async () => {
  const entries = await withStore("readonly", (store) => store.getAll());
  return Array.isArray(entries) ? entries : [];
};

export const putEntry = (entry) =>
  withStore("readwrite", (store) => store.put(entry));

export const deleteEntry = (id) =>
  withStore("readwrite", (store) => store.delete(toId(id)));

export const replaceAllEntries = async (entries) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    entries.forEach((entry) => store.put(entry));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
