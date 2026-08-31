import type { Metadata } from "next";
import { PathOverview } from "@/components/path-overview";

export const metadata: Metadata = {
  title: "路径",
};

export default function PathPage() {
  return (
    <main className="page">
      <h1>路径</h1>
      <p className="lede">
        八关，从“一根针”走到 127
        页证明。每一关只做一件事：先有语言，再有经典技术，最后才打开王虹的正文。时间按研读小时计，不是日历。
      </p>
      <PathOverview />
    </main>
  );
}
