// Sirf user ke apne phone (browser localStorage) mein rakhi jaane wali jaankari.
// Server par kuch nahi jaata. Har read/write try/catch mein, taaki private mode mein bhi page chale.

export type LocalCase = {
  code: string;
  sentOn: string; // YYYY-MM-DD
  followUp: string; // YYYY-MM-DD
  name: string;
  mobile: string;
  city: string;
  lenderName: string;
  loanId: string;
  to: string[];
  cc: string[];
  subject: string;
  threats: string[];
  numbers: string;
  incidentDate: string;
  story: string;
  dismissedOn?: string;
};

export type DiaryEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  kind: "call" | "sms" | "wa" | "contact" | "other";
  number: string;
  what: string;
};

const K_CASES = "arz.cases";
const K_DIARY = "arz.diary";

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const getCases = () => read<LocalCase[]>(K_CASES, []);
export function saveCase(c: LocalCase) {
  write(K_CASES, [c, ...getCases().filter((x) => x.code !== c.code)].slice(0, 20));
}
export function updateLocalCase(code: string, patch: Partial<LocalCase>) {
  write(K_CASES, getCases().map((x) => (x.code === code ? { ...x, ...patch } : x)));
}
export function deleteCase(code: string) {
  write(K_CASES, getCases().filter((x) => x.code !== code));
}

export const getDiary = () => read<DiaryEntry[]>(K_DIARY, []);
export function setDiary(list: DiaryEntry[]) {
  write(K_DIARY, list);
}

export const KIND_EN: Record<DiaryEntry["kind"], string> = {
  call: "Phone call",
  sms: "SMS",
  wa: "WhatsApp",
  contact: "Call/message to my family or contacts",
  other: "Other",
};

// Diary ko sabut ki list (English) mein badalna, complaint/police arzi ke liye
export function diaryText(list: DiaryEntry[]) {
  return [...list]
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .map((e, i) => `${i + 1}. ${e.date}${e.time ? ` ${e.time}` : ""} | ${KIND_EN[e.kind]}${e.number ? ` | ${e.number}` : ""}${e.what ? ` | ${e.what}` : ""}`)
    .join("\n");
}

export function diaryNumbers(list: DiaryEntry[]) {
  return Array.from(new Set(list.map((e) => e.number.trim()).filter(Boolean)));
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const addDays = (iso: string, n: number) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const daysSince = (iso: string) =>
  Math.max(0, Math.floor((new Date(today() + "T00:00:00").getTime() - new Date(iso + "T00:00:00").getTime()) / 864e5));

// Google Calendar ka "event banao" link (koi API key nahi chahiye)
export function calendarUrl(title: string, dateIso: string, details: string) {
  const d = dateIso.replace(/-/g, "");
  const next = addDays(dateIso, 1).replace(/-/g, "");
  const p = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${d}/${next}`, details });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export const waUrl = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
