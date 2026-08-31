export type PaperRole = "kakeya" | "sister" | "analysis" | "guide";

export type Paper = {
  id: string;
  title: string;
  titleZh: string;
  authors: string;
  year: string;
  venue: string;
  arxiv?: string;
  url: string;
  result: string;
  why: string;
  role: PaperRole;
};

export const papers: Paper[] = [
  {
    id: "sticky",
    title: "Sticky Kakeya sets and the sticky Kakeya conjecture",
    titleZh: "黏性挂谷集与黏性挂谷猜想",
    authors: "Hong Wang, Joshua Zahl",
    year: "2022 / 2025",
    venue: "Journal of the American Mathematical Society（已接收）",
    arxiv: "2210.09581",
    url: "https://arxiv.org/abs/2210.09581",
    result:
      "三维空间中每一个黏性 Kakeya 集的豪斯多夫维数都是 3。黏性意味着管族在许多尺度上近似自相似，是 Katz–Tao 纲领里最危险的极端构型。",
    why: "三部曲的第一篇。先关掉最像反例的那一类集合，后面才能把一般情形约化回来。",
    role: "kakeya",
  },
  {
    id: "assouad",
    title: "The Assouad dimension of Kakeya sets in R³",
    titleZh: "三维挂谷集的 Assouad 维数",
    authors: "Hong Wang, Joshua Zahl",
    year: "2024 / 2025",
    venue: "Inventiones mathematicae (2025)",
    arxiv: "2401.12337",
    url: "https://arxiv.org/abs/2401.12337",
    result:
      "每个三维 Kakeya 集的 Assouad 维数都是 3；Ahlfors–David 正则的 Kakeya 集豪斯多夫维数也是 3。同时把黏性定理推广到满足 Wolff 公理的管族。",
    why: "三部曲的第二篇。Assouad 维数比豪斯多夫维数更强、更“局部均匀”，是完整猜想的弱形式，也把黏性工具磨锋利。",
    role: "kakeya",
  },
  {
    id: "volume",
    title:
      "Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions",
    titleZh: "凸集并的体积估计与三维挂谷集合猜想",
    authors: "Hong Wang, Joshua Zahl",
    year: "2025",
    venue: "arXiv preprint（127 页）",
    arxiv: "2502.17655",
    url: "https://arxiv.org/abs/2502.17655",
    result:
      "三维 Kakeya 集合猜想：R³ 中每个 Kakeya 集的闵可夫斯基维数与豪斯多夫维数都是 3。定量版本是：满足凸 Wolff 公理的 δ-管并具有几乎最大体积。",
    why: "正篇。把一般管族约化到黏性情形，并因此证完三维集合猜想。高维 n ≥ 4 仍然开放。",
    role: "kakeya",
  },
  {
    id: "streamlined",
    title: "A streamlined proof of the Kakeya set conjecture in R³",
    titleZh: "三维挂谷集合猜想的精简证明",
    authors: "Larry Guth, Hong Wang, Joshua Zahl",
    year: "2026",
    venue: "arXiv preprint",
    arxiv: "2601.14411",
    url: "https://arxiv.org/abs/2601.14411",
    result:
      "在黏性定理已经成立的前提下，重新组织“一般情形 → 黏性”的约化，去掉若干技术（例如多项式剖分），把第三篇的主定理写短。",
    why: "读完 127 页之后的第二遍：同一条逻辑，更干净的线路。",
    role: "kakeya",
  },
  {
    id: "furstenberg",
    title: "Furstenberg sets estimate in the plane",
    titleZh: "平面 Furstenberg 集估计",
    authors: "Kevin Ren, Hong Wang",
    year: "2023",
    venue: "Inventiones mathematicae 一带的后续正式发表",
    arxiv: "2308.08819",
    url: "https://arxiv.org/abs/2308.08819",
    result:
      "二维 Furstenberg 集猜想：若平面集合在足够多方向上都含有维数为 s 的子集，则整体维数达到猜想中的下界。证明把一般情形拆成黏性与“半均匀间隔”两类。",
    why: "Wolff 所说的 Kakeya / Falconer / Furstenberg 三姊妹之一。黏性约化在这里先跑通，后来才用到三维挂谷。",
    role: "sister",
  },
  {
    id: "falconer-plane",
    title: "On Falconer's distance set problem in the plane",
    titleZh: "平面 Falconer 距离集问题",
    authors: "Larry Guth, Alex Iosevich, Yumeng Ou, Hong Wang",
    year: "2018 / 2020",
    venue: "Inventiones mathematicae (2020)",
    arxiv: "1808.09346",
    url: "https://arxiv.org/abs/1808.09346",
    result:
      "平面紧集若豪斯多夫维数大于 5/4，则距离集具有正 Lebesgue 测度（Wolff 的 4/3 被改进）。",
    why: "限制估计走进几何测度论的一条经典通道。读它是为了习惯“波包 + 关联几何”。",
    role: "sister",
  },
  {
    id: "local-smoothing",
    title: "A sharp square function estimate for the cone in R³",
    titleZh: "三维光锥的尖锐平方函数估计",
    authors: "Larry Guth, Hong Wang, Ruixiang Zhang",
    year: "2019 / 2020",
    venue: "Annals of Mathematics (2020)",
    arxiv: "1909.10693",
    url: "https://arxiv.org/abs/1909.10693",
    result:
      "证明光锥上的尖锐 L⁴ 平方函数估计，从而完全解决 2+1 维波动方程的局部平滑猜想。",
    why: "2026 菲尔兹奖引文里点名的结果。Decoupling、多尺度归纳与 Kakeya 型管估计在这里已经同时出现。",
    role: "analysis",
  },
  {
    id: "brooms",
    title: "A restriction estimate in R³ using brooms",
    titleZh: "用扫帚结构得到的三维限制估计",
    authors: "Hong Wang",
    year: "2018 / 2022",
    venue: "Duke Mathematical Journal (2022)",
    arxiv: "1802.04312",
    url: "https://arxiv.org/abs/1802.04312",
    result:
      "抛物面上的限制/延拓算子在 p > 3 + 3/13 时成立。关键几何物是“扫帚”：波包沿代数簇薄邻域聚集的方式。",
    why: "博士论文主线之一，也是她独立完成的限制理论突破。",
    role: "analysis",
  },
  {
    id: "restriction-wu",
    title:
      "Restriction estimates using decoupling theorems and two-ends Furstenberg inequalities",
    titleZh: "用 decoupling 与两端 Furstenberg 不等式做限制估计",
    authors: "Hong Wang, Shukun Wu",
    year: "2024",
    venue: "arXiv preprint",
    arxiv: "2411.08871",
    url: "https://arxiv.org/abs/2411.08871",
    result:
      "提出用 refined decoupling 加上两端 Furstenberg 不等式进攻限制猜想；在三维得到 p > 22/7 的限制估计，并蕴含 Wolff 的 5/2 发刷界。",
    why: "看清限制猜想、Kakeya 与 Furstenberg 怎样被写成同一套管–球关联语言。",
    role: "analysis",
  },
  {
    id: "decoupling-parabola",
    title: "Improved decoupling for the parabola",
    titleZh: "抛物线 decoupling 的改进",
    authors: "Larry Guth, Dominique Maldague, Hong Wang",
    year: "2024",
    venue: "Journal of the European Mathematical Society (2024)",
    arxiv: "2009.07953",
    url: "https://arxiv.org/abs/2009.07953",
    result: "改进抛物线的 decoupling 不等式，是后来许多限制与投影估计的黑盒工具。",
    why: "Bourgain–Demeter 理论的精细化。读 Kakeya 前不必整本啃完，但要知道它是振荡部分的标准武器。",
    role: "analysis",
  },
  {
    id: "guth-intro",
    title: "Introduction to the proof of the Kakeya conjecture",
    titleZh: "挂谷猜想证明导引",
    authors: "Larry Guth",
    year: "2025",
    venue: "arXiv 综述",
    arxiv: "2505.07695",
    url: "https://arxiv.org/abs/2505.07695",
    result:
      "用较少公式讲清：问题难在哪里、黏性为什么关键、Wang–Zahl 新贡献是把一般情形约化到黏性。",
    why: "读 127 页之前的第一份导读。Guth 是王虹的导师，也是证明的核验者之一。",
    role: "guide",
  },
  {
    id: "guth-outline",
    title: "Outline of the Wang–Zahl proof of the Kakeya conjecture in R³",
    titleZh: "Wang–Zahl 三维证明提纲",
    authors: "Larry Guth",
    year: "2025",
    venue: "arXiv 综述",
    arxiv: "2508.05475",
    url: "https://arxiv.org/abs/2508.05475",
    result: "专门展开“一般 → 黏性”那一段归纳，比导引更贴近原论文结构。",
    why: "第二份导读。和精简证明对照着读，会快很多。",
    role: "guide",
  },
  {
    id: "bourbaki",
    title: "The Kakeya conjecture, after Wang and Zahl",
    titleZh: "Wang 与 Zahl 之后的挂谷猜想",
    authors: "Larry Guth",
    year: "2026",
    venue: "Séminaire Bourbaki 报告",
    arxiv: "2604.03416",
    url: "https://arxiv.org/abs/2604.03416",
    result:
      "面向更广数学听众的系统综述，配图讲解黏性、颗粒（grains）与多尺度归纳。",
    why: "给非调和分析专业的数学家看的版本，也适合自己做完一遍后回头整理全局图。",
    role: "guide",
  },
];

export const roleLabel: Record<PaperRole, string> = {
  kakeya: "三维挂谷",
  sister: "姊妹问题",
  analysis: "调和分析",
  guide: "导读",
};

export function papersByRole(role: PaperRole) {
  return papers.filter((paper) => paper.role === role);
}
