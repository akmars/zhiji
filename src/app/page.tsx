import Link from "next/link";
import { NeedleField } from "@/components/needle-field";

export default function Home() {
  return (
    <main className="hero">
      <NeedleField />
      <div className="hero-copy">
        <h1 className="hero-brand">针迹</h1>
        <p className="hero-title">王虹证明的路</p>
        <p className="hero-lead">
          三维空间里，包含所有方向单位线段的集合，维数必须是三。从一根针转到这篇证明，论文按可读顺序排成一条路。
        </p>
        <div className="hero-actions">
          <Link href="/path">进入学习路径</Link>
          <Link href="/papers">先看她证明了什么</Link>
        </div>
      </div>
      <span className="seal">挂谷</span>
    </main>
  );
}
