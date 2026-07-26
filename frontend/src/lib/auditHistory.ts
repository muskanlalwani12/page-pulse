import type { AuditReport } from "../types/audit";

export type HistoryEntry = {
  url: string;
  date: string; // ISO string
  report: AuditReport;
};

const STORAGE_KEY = "pagepulse_history";
const MAX_ENTRIES = 5;

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: HistoryEntry): HistoryEntry[] {
  const existing = getHistory().filter((item) => item.url !== entry.url);
  const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage might be unavailable (e.g. private browsing) — fail silently
  }
  return updated;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.round(
    (new Date(now.toDateString()).getTime() -
      new Date(date.toDateString()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
