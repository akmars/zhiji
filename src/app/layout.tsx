import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Noto_Serif_SC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const serif = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  variable: "--font-serif-sc",
  display: "swap",
  preload: true,
});

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "针迹 · 王虹证明的学习路径",
    template: "%s · 针迹",
  },
  description:
    "整理王虹证明的调和分析与几何测度论论文，并给出从挂谷针问题到三维 Kakeya 猜想的循序学习路径。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${serif.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
