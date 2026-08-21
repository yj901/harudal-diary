const EMOTION_LABELS = {
  happy: "기쁨",
  sad: "슬픔",
  angry: "화남",
  calm: "평온",
};

const INTENSITY_LABELS = ["스침", "번짐", "담김", "가득", "꽉참"];

const downloadFile = (filename, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const stamp = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
};

export const downloadBackupJson = (entries) => {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    entries,
  };
  downloadFile(
    `harudal-backup-${stamp()}.json`,
    `${JSON.stringify(payload, null, 2)}\n`,
    "application/json",
  );
};

export const downloadExportTxt = (entries) => {
  const body = entries
    .map((entry) => {
      const intensity =
        entry.intensity === null ? 4 : entry.intensity;
      const emotion = EMOTION_LABELS[entry.emotion] || "";
      const intensityLabel = INTENSITY_LABELS[intensity] || "";
      return `${entry.date} (${entry.day})\n${emotion} / ${intensityLabel}\n\n${entry.text || ""}`;
    })
    .join("\n\n----------\n\n");

  downloadFile(
    `harudal-export-${stamp()}.txt`,
    body ? `${body}\n` : "",
    "text/plain",
  );
};

const isValidEntry = (entry) =>
  entry &&
  entry.id != null &&
  entry.date &&
  entry.day &&
  ["happy", "sad", "angry", "calm"].includes(entry.emotion) &&
  typeof entry.text === "string";

export const parseBackupJson = (text) => {
  const data = JSON.parse(text);
  const list = Array.isArray(data) ? data : data?.entries;
  if (!Array.isArray(list)) {
    throw new Error("invalid backup");
  }

  const entries = list.filter(isValidEntry).map((entry) => ({
    id: Number(entry.id),
    date: String(entry.date),
    day: String(entry.day),
    emotion: entry.emotion,
    intensity:
      entry.intensity === null || entry.intensity === undefined
        ? null
        : Number(entry.intensity),
    text: String(entry.text),
  }));

  if (entries.length === 0 && list.length > 0) {
    throw new Error("invalid backup");
  }

  return entries;
};
