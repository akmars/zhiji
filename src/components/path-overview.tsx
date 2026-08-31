"use client";

import Link from "next/link";
import { stages } from "@/lib/data/stages";
import { useProgress } from "@/hooks/use-progress";

export function PathOverview() {
  const { ready, isDone, count } = useProgress();

  return (
    <div>
      <p className="path-count" aria-live="polite">
        {ready
          ? count === 0
            ? "还没有标记任何关卡。"
            : `已走完 ${count} / ${stages.length} 关。`
          : "正在读取进度。"}
      </p>
      <ol className="path-rail">
        {stages.map((stage, index) => (
          <li key={stage.slug} className={isDone(stage.slug) ? "is-done" : ""}>
            <Link href={`/path/${stage.slug}`} className="path-stop">
              <span className="path-index">{stage.index}</span>
              <span className="path-copy">
                <strong>
                  {stage.title}
                  <em>{stage.kicker}</em>
                </strong>
                <span>{stage.summary}</span>
                <span className="path-meta">
                  {stage.level} · {stage.hours}
                  {ready && isDone(stage.slug) ? " · 已走完" : ""}
                </span>
              </span>
            </Link>
            {index < stages.length - 1 ? <span className="path-join" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
