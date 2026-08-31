"use client";

import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";

export function ProgressToggle({ slug }: { slug: string }) {
  const { ready, isDone, mark, unmark } = useProgress();
  if (!ready) {
    return (
      <p className="progress-empty" role="status">
        正在读取进度。
      </p>
    );
  }
  const done = isDone(slug);
  return (
    <div className="progress-row">
      <Button
        type="button"
        variant={done ? "secondary" : "default"}
        onClick={() => (done ? unmark(slug) : mark(slug))}
      >
        {done ? "已走完这一关" : "标记为已走完"}
      </Button>
      <p className="progress-hint">
        {done ? "进度存在这台浏览器里，换设备不会同步。" : "走完自测后再标。"}
      </p>
    </div>
  );
}
