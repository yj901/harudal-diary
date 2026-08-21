export const getDateKey = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }

  const [year, month, day] = String(date).split(".").map(Number);
  return `${year}.${month}.${day}`;
};

const pad = (value) => String(value).padStart(2, "0");

export const formatEntryDate = (date) =>
  `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;

export const getDayName = (date) =>
  ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
    date.getDay()
  ];

export const findEntryByDate = (entries, date) => {
  const key = getDateKey(date);
  return [...entries]
    .reverse()
    .find((entry) => getDateKey(entry.date) === key);
};

export const sortEntriesNewest = (entries) =>
  [...entries].sort((a, b) => {
    const [aYear, aMonth, aDay] = getDateKey(a.date).split(".").map(Number);
    const [bYear, bMonth, bDay] = getDateKey(b.date).split(".").map(Number);
    const aTime = new Date(aYear, aMonth - 1, aDay).getTime();
    const bTime = new Date(bYear, bMonth - 1, bDay).getTime();
    if (bTime !== aTime) return bTime - aTime;
    return Number(b.id) - Number(a.id);
  });

export const formatHeaderDate = (date, day) => {
  if (!date) return "";
  const shortDay = String(day || "").replace("요일", "");
  return shortDay ? `${date} (${shortDay})` : date;
};
