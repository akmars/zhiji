"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "zhiji-stages-done";
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot() {
  return JSON.stringify(read());
}

function getServerSnapshot() {
  return "[]";
}

export function useProgress() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const done = JSON.parse(snapshot) as string[];

  const persist = useCallback((next: string[]) => {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    emit();
  }, []);

  const mark = useCallback(
    (slug: string) => {
      if (done.includes(slug)) return;
      persist([...done, slug]);
    },
    [done, persist],
  );

  const unmark = useCallback(
    (slug: string) => {
      persist(done.filter((item) => item !== slug));
    },
    [done, persist],
  );

  return {
    done,
    ready: true,
    isDone: (slug: string) => done.includes(slug),
    mark,
    unmark,
    count: done.length,
  };
}
