import { dailyActions, getWeekActions, TOTAL_WEEKS } from "@/lib/data/daily-actions";

export function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function parseISO(date: string) {
  const [y, m, day] = date.split("-").map(Number);
  return new Date(y, m - 1, day);
}

export function daysBetween(start: string, end: string) {
  const ms = parseISO(end).getTime() - parseISO(start).getTime();
  return Math.floor(ms / 86400000);
}

/** Week 1–12 from program start (day 0 = week 1). */
export function weekFromStart(startDate: string, onDate = todayISO()) {
  const days = Math.max(0, daysBetween(startDate, onDate));
  return Math.min(TOTAL_WEEKS, Math.floor(days / 7) + 1);
}

/** Suggested slot within the week: Mon–Fri → order 1–5, weekend → catch-up (order 5). */
export function suggestedOrderForDate(date = todayISO()) {
  const dow = parseISO(date).getDay();
  if (dow === 0 || dow === 6) return 5;
  return dow;
}

export function getSuggestedToday(startDate: string, onDate = todayISO()) {
  const week = weekFromStart(startDate, onDate);
  const order = suggestedOrderForDate(onDate);
  const weekActions = getWeekActions(week);
  const primary = weekActions.find((a) => a.order === order) ?? weekActions[0];
  const extras = weekActions.filter((a) => a.id !== primary?.id).slice(0, 2);
  return { week, order, primary, extras, weekActions };
}

export function countCompletedInWeek(completedIds: Set<string>, week: number) {
  return getWeekActions(week).filter((a) => completedIds.has(a.id)).length;
}

export function totalActionsInWeek(week: number) {
  return getWeekActions(week).length;
}

export function computeStreak(completedByDate: Record<string, string[]>, onDate = todayISO()) {
  let streak = 0;
  let cursor = onDate;
  while (true) {
    const ids = completedByDate[cursor];
    if (!ids || ids.length === 0) {
      if (cursor === onDate) {
        cursor = addDays(cursor, -1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function addDays(date: string, delta: number) {
  const d = parseISO(date);
  d.setDate(d.getDate() + delta);
  return d.toISOString().slice(0, 10);
}

export function allCompletedIds(completedByDate: Record<string, string[]>) {
  return new Set(Object.values(completedByDate).flat());
}

export function globalProgress(completedByDate: Record<string, string[]>) {
  const done = allCompletedIds(completedByDate).size;
  return { done, total: dailyActions.length };
}

export function formatWeekLabel(week: number) {
  return `第 ${week} 周`;
}

export function weekdayLabel(date = todayISO()) {
  const labels = ["日", "一", "二", "三", "四", "五", "六"];
  return "周" + labels[parseISO(date).getDay()];
}
