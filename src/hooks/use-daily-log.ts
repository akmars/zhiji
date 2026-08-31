"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  addDays,
  allCompletedIds,
  computeStreak,
  todayISO,
} from "@/lib/daily-plan";

const KEY = "zhiji-daily-log";
const listeners = new Set<() => void>();

type DailyLog = {
  startDate: string;
  completedByDate: Record<string, string[]>;
};

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function read(): DailyLog {
  if (typeof window === "undefined") {
    return { startDate: todayISO(), completedByDate: {} };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { startDate: todayISO(), completedByDate: {} };
    return JSON.parse(raw) as DailyLog;
  } catch {
    return { startDate: todayISO(), completedByDate: {} };
  }
}

function getSnapshot() {
  return JSON.stringify(read());
}

function getServerSnapshot() {
  return JSON.stringify({ startDate: "1970-01-01", completedByDate: {} });
}

function persist(next: DailyLog) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

export function useDailyLog() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const log = JSON.parse(snapshot) as DailyLog;
  const today = todayISO();

  const isDone = useCallback(
    (actionId: string, date = today) => {
      return (log.completedByDate[date] ?? []).includes(actionId);
    },
    [log.completedByDate, today],
  );

  const toggle = useCallback(
    (actionId: string, date = today) => {
      const dayList = log.completedByDate[date] ?? [];
      const nextDay = dayList.includes(actionId)
        ? dayList.filter((id) => id !== actionId)
        : [...dayList, actionId];
      const nextByDate = { ...log.completedByDate };
      if (nextDay.length === 0) delete nextByDate[date];
      else nextByDate[date] = nextDay;
      persist({ ...log, completedByDate: nextByDate });
    },
    [log, today],
  );

  const resetStart = useCallback(() => {
    persist({ startDate: todayISO(), completedByDate: log.completedByDate });
  }, [log.completedByDate]);

  const clearAll = useCallback(() => {
    persist({ startDate: todayISO(), completedByDate: {} });
  }, []);

  const completedSet = allCompletedIds(log.completedByDate);
  const streak = computeStreak(log.completedByDate, today);

  return {
    ready: true,
    log,
    today,
    isDone,
    toggle,
    resetStart,
    clearAll,
    completedSet,
    streak,
    todayCount: (log.completedByDate[today] ?? []).length,
  };
}

export { addDays };
