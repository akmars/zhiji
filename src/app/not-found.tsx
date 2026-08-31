import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <h1>没有这一关</h1>
      <p className="empty-state">路径上只有八个关卡。回到列表另选一处下脚。 </p>
      <p className="lede">
        <Link href="/path">返回学习路径</Link>
      </p>
    </main>
  );
}
