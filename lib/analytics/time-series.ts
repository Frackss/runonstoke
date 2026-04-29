const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseWeekLabel(label: string) {
  if (label === "Now") return 0;
  const match = label.match(/^W-(\d+)$/);
  return match ? -Number(match[1]) : Number.NaN;
}

function parseDateLike(value: unknown) {
  if (value instanceof Date) return value.getTime();
  if (typeof value !== "string") return Number.NaN;
  const timestamp = Date.parse(value.includes("T") ? value : `${value}T00:00:00Z`);
  return Number.isNaN(timestamp) ? Number.NaN : timestamp;
}

function chronologicalValue(item: Record<string, unknown>, key: string) {
  const value = item[key];
  if (key === "day" && typeof value === "string" && DAY_ORDER.includes(value)) {
    return DAY_ORDER.indexOf(value);
  }
  if ((key === "week" || key === "label") && typeof value === "string") {
    const weekValue = parseWeekLabel(value);
    if (Number.isFinite(weekValue)) return weekValue;
  }
  const dateValue = parseDateLike(value);
  if (Number.isFinite(dateValue)) return dateValue;
  if (typeof value === "number") return value;
  return 0;
}

export function sortChronologicalData<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T & string,
) {
  return data
    .slice()
    .sort((a, b) => chronologicalValue(a, key) - chronologicalValue(b, key));
}

export function normalizeTimeSeries<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T & string,
) {
  return sortChronologicalData(data, key);
}

export function normalizeWeeklySeries<T extends { week: string }>(data: T[]) {
  return sortChronologicalData(data, "week");
}

export function normalizeDaySeries<T extends { day: string }>(data: T[]) {
  return sortChronologicalData(data, "day");
}

export function assertNowIsLast<T extends { week?: string }>(data: T[]) {
  const nowIndex = data.findIndex((item) => item.week === "Now");
  return nowIndex === -1 || nowIndex === data.length - 1;
}
