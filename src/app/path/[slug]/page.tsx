import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeltoidNeedle } from "@/components/deltoid-needle";
import { ProgressToggle } from "@/components/progress-toggle";
import { StageQuiz } from "@/components/stage-quiz";
import { getStage, neighbors, stages } from "@/lib/data/stages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stages.map((stage) => ({ slug: stage.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStage(slug);
  if (!stage) return { title: "关卡" };
  return { title: `${stage.index} ${stage.title}` };
}

export default async function StagePage({ params }: Props) {
  const { slug } = await params;
  const stage = getStage(slug);
  if (!stage) notFound();
  const { prev, next } = neighbors(stage.slug);

  return (
    <main className="page">
      <p className="stage-kicker">
        {stage.index} · {stage.kicker}
      </p>
      <h1 className="stage-title">{stage.title}</h1>
      <div className="stage-grid">
        <span>{stage.level}</span>
        <span>{stage.hours}</span>
      </div>
      <p className="lede">{stage.summary}</p>
      {stage.slug === "needle" ? (
        <div className="deltoid-wrap">
          <DeltoidNeedle />
        </div>
      ) : null}

      <h2 className="section-head">进这一关之前</h2>
      <ul className="already-list">
        {stage.already.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="section-head">要建立的概念</h2>
      <ul className="idea-list">
        {stage.ideas.map((idea) => (
          <li key={idea.name}>
            <h3>{idea.name}</h3>
            <p>{idea.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="section-head">按这个顺序做</h2>
      <ol className="step-list">
        {stage.steps.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="section-head">阅读</h2>
      <ul className="read-list">
        {stage.readings.map((reading) => (
          <li key={reading.title}>
            <h3>
              {reading.href ? (
                <a href={reading.href} target="_blank" rel="noreferrer">
                  {reading.title}
                </a>
              ) : (
                reading.title
              )}
            </h3>
            <p>{reading.detail}</p>
          </li>
        ))}
      </ul>

      <h2 className="section-head">容易走偏的地方</h2>
      <ul className="pitfall-list">
        {stage.pitfalls.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="section-head">自测</h2>
      <StageQuiz items={stage.quiz} />

      <ProgressToggle slug={stage.slug} />

      <nav className="pager">
        {prev ? (
          <Link href={`/path/${prev.slug}`}>
            <span className="dir">上一关</span>
            {prev.index} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/path/${next.slug}`}>
            <span className="dir">下一关</span>
            {next.index} {next.title}
          </Link>
        ) : (
          <Link href="/papers">
            <span className="dir">看论文</span>
            回到证明列表
          </Link>
        )}
      </nav>
    </main>
  );
}
