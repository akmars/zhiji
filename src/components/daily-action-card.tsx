import type { DailyAction } from "@/lib/data/daily-actions";
import { getDomain } from "@/lib/data/daily-domains";
import { StepResources } from "@/components/step-resources";

type Props = {
  action: DailyAction;
  done: boolean;
  onToggle: () => void;
  highlight?: boolean;
};

export function DailyActionCard({ action, done, onToggle, highlight }: Props) {
  const domain = getDomain(action.domainId);

  return (
    <article className={`daily-card${highlight ? " is-highlight" : ""}${done ? " is-done" : ""}`}>
      <div className="daily-card-head">
        <div className="daily-card-meta">
          <span className="daily-domain">{domain?.name ?? action.domainId}</span>
          <span className="daily-duration">{action.durationMin} 分钟</span>
          {action.relatedStage ? (
            <a className="daily-stage-link" href={`/path/${action.relatedStage}`}>
              对应路径
            </a>
          ) : null}
        </div>
        <button type="button" className="daily-check" onClick={onToggle} aria-pressed={done}>
          <span className="daily-check-box" aria-hidden />
          {done ? "已完成" : "标记完成"}
        </button>
      </div>
      <h3 className="daily-card-title">{action.title}</h3>
      <div className="daily-block">
        <p className="daily-block-label">今日知识</p>
        <p>{action.knowledge}</p>
      </div>
      <div className="daily-block">
        <p className="daily-block-label">练习任务</p>
        <p>{action.exercise}</p>
      </div>
      <div className="daily-block">
        <p className="daily-block-label">完成标准</p>
        <p>{action.criteria}</p>
      </div>
      {action.links.length > 0 ? <StepResources links={action.links} /> : null}
    </article>
  );
}
