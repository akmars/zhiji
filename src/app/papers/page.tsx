import type { Metadata } from "next";
import { papersByRole, roleLabel, type PaperRole } from "@/lib/data/papers";

export const metadata: Metadata = {
  title: "证明",
};

const order: PaperRole[] = ["kakeya", "sister", "analysis", "guide"];

export default function PapersPage() {
  return (
    <main className="page">
      <h1>证明</h1>
      <p className="lede">
        王虹的工作集中在调和分析与几何测度论。2026 年菲尔兹奖引文点名的，是平面波动方程的局部平滑，以及傅里叶限制、Falconer
        距离集、平面 Furstenberg 集和三维 Kakeya 问题。下面按这条线索列出论文，并始终写上合作者。
      </p>

      <h2 className="section-head">三部曲怎么接上</h2>
      <div className="chain">
        <div className="chain-step">
          <strong>2022</strong>
          <p>黏性 Kakeya 集在 R³ 中维数必为 3。Katz–Tao 纲领的第二步完成。</p>
        </div>
        <div className="chain-step">
          <strong>2024</strong>
          <p>所有三维 Kakeya 集的 Assouad 维数为 3。弱形式，并推广黏性工具。</p>
        </div>
        <div className="chain-step">
          <strong>2025</strong>
          <p>一般管族约化到黏性，得到闵可夫斯基与豪斯多夫维数都是 3。</p>
        </div>
        <div className="chain-step">
          <strong>2026</strong>
          <p>与 Guth 一起重写约化，得到精简证明。n ≥ 4 仍开放。</p>
        </div>
      </div>

      {order.map((role) => (
        <section key={role}>
          <h2 className="section-head">{roleLabel[role]}</h2>
          <div className="paper-list">
            {papersByRole(role).map((paper) => (
              <article key={paper.id} className="paper">
                <h3>
                  {paper.titleZh}
                  <span className="en">{paper.title}</span>
                </h3>
                <p className="meta">
                  {paper.authors} · {paper.year} · {paper.venue}
                  {paper.arxiv ? ` · arXiv:${paper.arxiv}` : ""}
                </p>
                <p>{paper.result}</p>
                <p>{paper.why}</p>
                <a href={paper.url} target="_blank" rel="noreferrer">
                  打开 arXiv
                </a>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
