"use client";

import { useMemo } from "react";
import { DailyActionCard } from "@/components/daily-action-card";
import { dailyDomains } from "@/lib/data/daily-domains";
import { dailyActions, getWeekActions, TOTAL_WEEKS } from "@/lib/data/daily-actions";
import {
  countCompletedInWeek,
  formatWeekLabel,
  getSuggestedToday,
  globalProgress,
  totalActionsInWeek,
  weekdayLabel,
} from "@/lib/daily-plan";
import { useDailyLog } from "@/hooks/use-daily-log";

export function DailyToday() {
  const { ready, log, today, isDone, toggle, completedSet, streak, todayCount, resetStart } =
    useDailyLog();

  const plan = useMemo(
    () => getSuggestedToday(log.startDate, today),
    [log.startDate, today],
  );

  const progress = useMemo(
    () => globalProgress(log.completedByDate),
    [log.completedByDate],
  );

  const weekDone = countCompletedInWeek(completedSet, plan.week);
  const weekTotal = totalActionsInWeek(plan.week);

  if (!ready) {
    return <p className="progress-empty">正在读取训练记录。</p>;
  }

  return (
    <div className="daily-today">
      <div className="daily-stats">
        <div className="daily-stat">
          <span className="daily-stat-num">{streak}</span>
          <span className="daily-stat-label">连续天数</span>
        </div>
        <div className="daily-stat">
          <span className="daily-stat-num">{todayCount}</span>
          <span className="daily-stat-label">今日完成</span>
        </div>
        <div className="daily-stat">
          <span className="daily-stat-num">
            {weekDone}/{weekTotal}
          </span>
          <span className="daily-stat-label">{formatWeekLabel(plan.week)}</span>
        </div>
        <div className="daily-stat">
          <span className="daily-stat-num">
            {progress.done}/{progress.total}
          </span>
          <span className="daily-stat-label">总进度</span>
        </div>
      </div>

      <p className="daily-today-lede">
        {weekdayLabel(today)} · {formatWeekLabel(plan.week)} · 计划从{" "}
        <time dateTime={log.startDate}>{log.startDate}</time> 起算。每周 5
        个行动日，周末可补做或复盘。
      </p>

      <div className="daily-actions-row">
        <button type="button" className="daily-reset" onClick={resetStart}>
          从今天开始重新计周
        </button>
      </div>

      <h2 className="section-head">今日建议</h2>
      {plan.primary ? (
        <DailyActionCard
          action={plan.primary}
          done={isDone(plan.primary.id)}
          onToggle={() => toggle(plan.primary!.id)}
          highlight
        />
      ) : null}

      {plan.extras.length > 0 ? (
        <>
          <h2 className="section-head">本周还可做</h2>
          <div className="daily-card-grid">
            {plan.extras.map((action) => (
              <DailyActionCard
                key={action.id}
                action={action}
                done={isDone(action.id)}
                onToggle={() => toggle(action.id)}
              />
            ))}
          </div>
        </>
      ) : null}

      <h2 className="section-head">本周全部</h2>
      <div className="daily-week-rail">
        {plan.weekActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`daily-week-chip${isDone(action.id) ? " is-done" : ""}`}
            onClick={() => toggle(action.id)}
          >
            <span className="daily-week-chip-order">{action.order}</span>
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DailyLibrary() {
  const { isDone, toggle } = useDailyLog();

  return (
    <div className="daily-library">
      {dailyDomains.map((domain) => {
        const items = dailyActions
          .filter((a) => a.domainId === domain.id)
          .sort((a, b) => a.week - b.week || a.order - b.order);
        const doneCount = items.filter((a) => isDone(a.id)).length;

        return (
          <section key={domain.id} className="daily-domain-section">
            <div className="daily-domain-head">
              <h2>{domain.name}</h2>
              <p>{domain.subtitle}</p>
              <p className="daily-domain-progress">
                {doneCount}/{items.length} 已完成
              </p>
            </div>
            <div className="daily-card-grid">
              {items.map((action) => (
                <DailyActionCard
                  key={action.id}
                  action={action}
                  done={isDone(action.id)}
                  onToggle={() => toggle(action.id)}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="daily-domain-section">
        <div className="daily-domain-head">
          <h2>12 周一览</h2>
          <p>按周浏览全部 {dailyActions.length} 个行动。</p>
        </div>
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => (
          <div key={week} className="daily-week-block">
            <h3>{formatWeekLabel(week)}</h3>
            <ul className="daily-week-list">
              {getWeekActions(week).map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    className={`daily-week-list-btn${isDone(action.id) ? " is-done" : ""}`}
                    onClick={() => toggle(action.id)}
                  >
                    {action.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
