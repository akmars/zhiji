import type { Metadata } from "next";
import { DailyLibrary, DailyToday } from "@/components/daily-planner";

export const metadata: Metadata = {
  title: "每日行动",
};

export default function DailyPage() {
  return (
    <main className="page page-wide">
      <h1>每日行动库</h1>
      <p className="lede">
        读懂王虹的证明需要多年训练。这里把实分析、几何测度论、调和分析与 Kakeya
        经典技术拆成 12 周、60 个可执行行动：每天一段知识、一道练习、一条完成标准。进度存在浏览器里，与
        <a href="/path"> 学习路径</a> 并行推进。
      </p>

      <DailyToday />

      <h2 className="section-head">按知识域浏览</h2>
      <p className="daily-library-lede">
        8 个知识域对应路径中的不同关卡。可随时跳做薄弱项，不必严格按周。
      </p>
      <DailyLibrary />
    </main>
  );
}
