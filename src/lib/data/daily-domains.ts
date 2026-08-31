export type DailyDomain = {
  id: string;
  name: string;
  subtitle: string;
  relatedStages: string[];
  prerequisite?: string;
};

export const dailyDomains: DailyDomain[] = [
  {
    id: "foundation",
    name: "基础",
    subtitle: "极限、线性代数、点集拓扑——后面所有估计的语言",
    relatedStages: ["needle", "measure"],
  },
  {
    id: "measure",
    name: "测度",
    subtitle: "Lebesgue 测度、积分、Lᵖ、覆盖引理",
    relatedStages: ["measure"],
    prerequisite: "foundation",
  },
  {
    id: "fourier",
    name: "傅里叶",
    subtitle: "变换、Plancherel、衰减与振荡",
    relatedStages: ["measure", "bridge"],
    prerequisite: "measure",
  },
  {
    id: "gmt",
    name: "几何测度论",
    subtitle: "豪斯多夫、盒维数、Assouad、Frostman",
    relatedStages: ["dimension"],
    prerequisite: "measure",
  },
  {
    id: "harmonic",
    name: "调和分析",
    subtitle: "限制猜想、波包、局部平滑、Kakeya 极大函数",
    relatedStages: ["bridge", "prelude"],
    prerequisite: "fourier",
  },
  {
    id: "kakeya",
    name: "Kakeya 技术",
    subtitle: "Davies、发刷、黏性、管重叠估计",
    relatedStages: ["classical", "trilogy"],
    prerequisite: "gmt",
  },
  {
    id: "incidence",
    name: "关联几何",
    subtitle: "Furstenberg、Falconer、两端论证、能量积分",
    relatedStages: ["prelude", "dimension"],
    prerequisite: "gmt",
  },
  {
    id: "reading",
    name: "论文研读",
    subtitle: "读引言、写卡片、闭卷复述——为王虹正文做准备",
    relatedStages: ["trilogy", "digest"],
    prerequisite: "kakeya",
  },
];

export function getDomain(id: string) {
  return dailyDomains.find((d) => d.id === id);
}
