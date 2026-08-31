export type Reading = {
  title: string;
  detail: string;
  href?: string;
};

export type QuizItem = {
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Stage = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  hours: string;
  level: string;
  summary: string;
  already: string[];
  ideas: { name: string; text: string }[];
  steps: { title: string; body: string }[];
  readings: Reading[];
  pitfalls: string[];
  quiz: QuizItem[];
};

export const stages: Stage[] = [
  {
    slug: "needle",
    index: "00",
    title: "针",
    kicker: "问题本身",
    hours: "6–10 小时",
    level: "科普到本科",
    summary:
      "先把故事讲对：挂谷宗一问的是旋转一根针要多大的面积；Besicovitch 证明面积可以任意小；真正剩下的，是维数。三维情形由王虹与 Joshua Zahl 在 2025 年证完。",
    already: [
      "高中解析几何：直线、方向、面积",
      "一点集合论语言：开集、紧集、覆盖",
    ],
    ideas: [
      {
        name: "Kakeya 针问题",
        text: "平面上把一根长度为 1 的针连续转过 180°，扫过的区域面积最小能有多小？Pál 证明等边三角形可以，Kakeya 的三尖内摆线面积是 π/8。",
      },
      {
        name: "Besicovitch 集",
        text: "紧集 K ⊂ Rⁿ 若在每个方向都含有一条单位线段，就叫做 Kakeya 集（也常称 Besicovitch 集）。Besicovitch 构造出平面上测度任意小、甚至测度零的 Kakeya 集。",
      },
      {
        name: "测度与维数",
        text: "测度零并不等于“细得像曲线”。康托集测度零但维数可以很大。Kakeya 集合猜想问的是：这种集合的豪斯多夫维数和闵可夫斯基维数是不是必须等于 n。",
      },
    ],
    steps: [
      {
        title: "用自己的话复述两个问题",
        body: "把“旋转针的面积”和“包含所有方向线段的集合有多厚”写成两句话，并标出它们不是同一个问题。前者允许针连续运动，后者只要求每个方向有一根静止的线段。",
      },
      {
        title: "看一遍 Besicovitch 的 Perron 树直觉",
        body: "不要求写出严格构造。要看到：把许多细长三角形的底边叠在一起，方向可以铺满，面积却因重叠而变小。这就是“方向很多、体积很小”的原型。",
      },
      {
        title: "记住二维已经解决、三维刚刚解决、高维仍开放",
        body: "Davies（1970s）证明平面 Kakeya 集维数是 2，证明很短。n ≥ 3 长期开放。2025 年 Wang–Zahl 解决 n = 3。n ≥ 4 的集合猜想、以及更强的 Kakeya 极大函数猜想，仍未解决。",
      },
      {
        title: "读两篇面向公众的报道，再对照维基条目",
        body: "Quanta 2025 年 3 月的报道讲清了“针”和“维数”的差别；IAS 的短文说明这是他们系列论文的第三篇。读完应能向非数学朋友讲五分钟。",
      },
    ],
    readings: [
      {
        title: "Quanta: Once-in-a-Century Proof Settles Math’s Kakeya Conjecture",
        detail: "2025-03-14。公众向综述，适合作为第零篇。",
        href: "https://www.quantamagazine.org/once-in-a-century-proof-settles-maths-kakeya-conjecture-20250314/",
      },
      {
        title: "IAS: A Three-Dimensional Breakthrough",
        detail: "说明 sticky → Assouad → 完整猜想这三步。",
        href: "https://www.ias.edu/ideas/three-dimensional-breakthrough",
      },
      {
        title: "Wolff, Recent work connected with the Kakeya problem (1999)",
        detail: "把 Kakeya、限制猜想、局部平滑放在同一张地图上。后面每一关都会回到这篇。",
        href: "https://arxiv.org/abs/math/0304146",
      },
    ],
    pitfalls: [
      "不要把“测度可以是零”听成“猜想已经被推翻”。猜想从来不是关于测度，而是关于维数。",
      "不要一上来下载 127 页。没有维数语言和管估计，读了也只是在翻页。",
    ],
    quiz: [
      {
        prompt: "Rⁿ 中的 Kakeya 集指的是什么？",
        choices: [
          "一个包含单位球面的紧集",
          "一个在每个方向都含有单位线段的紧集",
          "一个能让单位针连续转 360° 的最小区域",
        ],
        answer: 1,
        explain:
          "集合猜想关心的是“每个方向有一根线段”，不要求针连续扫过。连续旋转是更早的针问题。",
      },
      {
        prompt: "Besicovitch 的例子说明了什么？",
        choices: [
          "Kakeya 集必须有正测度",
          "平面 Kakeya 集的维数可以小于 2",
          "存在测度任意小（甚至为零）的 Kakeya 集",
        ],
        answer: 2,
        explain: "测度可以很小；二维的维数后来由 Davies 证明仍必须是 2。",
      },
    ],
  },
  {
    slug: "measure",
    index: "01",
    title: "尺",
    kicker: "分析的尺子",
    hours: "40–80 小时",
    level: "本科分析",
    summary:
      "后面所有定理都在量“有多厚”。你需要 Lebesgue 测度、积分、覆盖引理，以及最粗糙的傅里叶语言。这一关不是调和分析，只是把尺子校准。",
    already: ["ε–δ 极限", "线性代数里的 Rⁿ", "一点度量空间"],
    ideas: [
      {
        name: "外测度与零测集",
        text: "会用可数个矩形覆盖来定义面积，并能证明 Qⁿ 测度为零。Kakeya 集可以是零测集，正是因为线段可以高度重叠。",
      },
      {
        name: "Lᵖ 空间与 Hölder",
        text: "管的特征函数求和、体积估计、后来的限制不等式，全部写在 Lᵖ 里。至少要对 1、2、∞ 三个指数有肌肉记忆。",
      },
      {
        name: "傅里叶作为“方向的探针”",
        text: "还不需要 Stein 全书。要知道傅里叶变换把平移变成相位，把直线变成垂直的振荡。Fefferman 盘乘子反例，就是用 Besicovitch 集打进傅里叶的。",
      },
    ],
    steps: [
      {
        title: "用一本实变把测度学完，而不是同时开三本",
        body: "Stein–Shakarchi《Real Analysis》前四章，或周民强/张恭庆实变对应章节。目标：Lebesgue 积分、Fubini、Lᵖ、控制收敛。习题要做覆盖引理和 Cantor 集计算。",
      },
      {
        title: "自己证明：单位正方形里可放进测度小于 ε 的“很多方向的短线段”并不矛盾",
        body: "先在离散模型里做：N 个长度为 1、宽度 1/N 的细长矩形，若完全重叠则面积约 1/N，若完全分开则面积约 1。后面的管估计就是在给“重叠能有多严重”一个上界。",
      },
      {
        title: "傅里叶只读到 Plancherel 和 Schwarz 空间",
        body: "Stein–Shakarchi《Fourier Analysis》前三章足够。记下：光滑函数衰减快，特征函数的傅里叶变换衰减慢——这已经能解释为什么 Kakeya 会限制傅里叶乘子。",
      },
    ],
    readings: [
      {
        title: "Stein & Shakarchi, Real Analysis",
        detail: "Ch. 1–4。覆盖引理、微分、Lᵖ。",
      },
      {
        title: "Stein & Shakarchi, Fourier Analysis",
        detail: "Ch. 1–3。级数、变换、高斯函数。",
      },
      {
        title: "Tao, An epsilon of room, Vol. I（选读）",
        detail: "把“分析学家怎么写估计”练成条件反射。",
        href: "https://terrytao.wordpress.com/books/an-epsilon-of-room-pages-from-year-three-of-a-mathematical-blog/",
      },
    ],
    pitfalls: [
      "不要用“看懂定义”代替“会算覆盖”。后面每页都在数管子。",
      "先别碰拟微分算子或 Calderón–Zygmund 全书，那是旁路。",
    ],
    quiz: [
      {
        prompt: "为什么 Kakeya 集可以测度零，却仍然可能“占满维数”？",
        choices: [
          "因为测度与维数是同一件事的两种写法",
          "因为豪斯多夫维数看的是用小球覆盖的指数，不要求正测度",
          "因为所有零测集维数都是 n",
        ],
        answer: 1,
        explain:
          "维数 n 的集合仍可以是零测集，例如 Rⁿ 中的有理扰动或某些分形。Kakeya 猜想要的是维数，不是正测度。",
      },
      {
        prompt: "把 δ-管的特征函数加起来，最常用的第一估计是什么？",
        choices: [
          "Cauchy–Schwarz / Hölder，把重叠次数变成体积",
          "最大模原理",
          " Stokes 公式",
        ],
        answer: 0,
        explain: "L² 或 Lᵖ 的平方几乎是所有 Kakeya 体积估计的第一行。",
      },
    ],
  },
  {
    slug: "dimension",
    index: "02",
    title: "维",
    kicker: "几何测度论",
    hours: "30–50 小时",
    level: "本科高年级 / 研一",
    summary:
      "王虹证明的结论用三种维数写成。你必须能在纸上写出豪斯多夫、闵可夫斯基、Assouad 的定义，并知道为什么 Assouad 更强。",
    already: ["Lebesgue 测度", "开覆盖与紧性", "一点度量空间"],
    ideas: [
      {
        name: "豪斯多夫维数 dim_H",
        text: "用直径 ≤ δ 的集合覆盖，看 δ^s 的无穷小代价。它是最常用、也最“容许不均匀”的维数。",
      },
      {
        name: "闵可夫斯基（盒）维数",
        text: "看 δ-邻域的体积如何随 δ → 0 缩放，或用边长 δ 的格子点数。Kakeya 集合猜想要求两种维数都是 n。",
      },
      {
        name: "Assouad 维数",
        text: "要求在每一个位置、每一个尺度，局部都有均匀的盒维数下界。Wang–Zahl 2024 年先证明三维 Kakeya 集的 Assouad 维数是 3。",
      },
      {
        name: "Frostman 引理",
        text: "dim_H E ≥ s 当且仅当 E 上能放下一种 s-能量有限的概率测度。这是 Falconer、Furstenberg 的日常语言。",
      },
    ],
    steps: [
      {
        title: "手算三个例子",
        body: "三分康托集、单位正方形的边界、Besicovitch 不可微函数图像（或 Weierstrass 函数的维数直觉）。写出 dim_H 与盒维数何时相等、何时不等。",
      },
      {
        title: "把 Kakeya 猜想翻译成覆盖语言",
        body: "若 K 含有每个方向的单位线段，则对任意 δ，K 的 δ-邻域包含约 δ⁻² 根三维 δ-管（方向 δ-分离）。猜想说这些管的并不能比 δ^ε 更小。",
      },
      {
        title: "读 Mattila 或 Falconer 的一章，停在投影定理之前",
        body: "目标不是成为 GMT 专家，而是以后看到 “δ-网、能量积分、Frostman 测度” 不慌。Marstrand 投影定理可以读陈述，证明放到 Furstenberg 那一关。",
      },
    ],
    readings: [
      {
        title: "Falconer, Fractal Geometry",
        detail: "Ch. 2–3：豪斯多夫测度与盒维数。",
      },
      {
        title: "Mattila, Geometry of Sets and Measures in Euclidean Spaces",
        detail: "Ch. 4–5，外加 Frostman。不必通读全书。",
      },
      {
        title: "Wang–Zahl, The Assouad dimension of Kakeya sets in R³ 的引言",
        detail: "先只读定义 1.1–1.3 和定理 1.2，当作维数词典的应用题。",
        href: "https://arxiv.org/abs/2401.12337",
      },
    ],
    pitfalls: [
      "Assouad ≥ 闵可夫斯基 ≥ 豪斯多夫。只证明 Assouad = 3，还不能自动得到豪斯多夫 = 3，所以才需要第三篇。",
      "“方向 δ-分离的 δ-管约有 δ⁻² 根”要自己画一次，否则后面所有指数都会漂。",
    ],
    quiz: [
      {
        prompt: "三种维数通常的大小关系是？",
        choices: [
          "豪斯多夫 ≥ 闵可夫斯基 ≥ Assouad",
          "Assouad ≥ 闵可夫斯基 ≥ 豪斯多夫",
          "三者永远相等",
        ],
        answer: 1,
        explain: "Assouad 最强（最大），豪斯多夫最弱。完整 Kakeya 集合猜想要后两者都等于 3。",
      },
      {
        prompt: "Frostman 引理把维数下界转换成什么？",
        choices: [
          "集合上存在衰减足够好的测度",
          "集合必须是流形",
          "集合必须有正 Lebesgue 测度",
        ],
        answer: 0,
        explain: "有 s-能量有限的概率测度，当且仅当豪斯多夫维数至少是 s。",
      },
    ],
  },
  {
    slug: "bridge",
    index: "03",
    title: "波",
    kicker: "傅里叶为什么在乎一根针",
    hours: "25–40 小时",
    level: "研一调和分析",
    summary:
      "Fefferman 用 Besicovitch 集打穿盘乘子；Stein 限制猜想又反过来蕴含 Kakeya 维数猜想。这一关建立地图，不要求你证明限制猜想。",
    already: ["Plancherel", "豪斯多夫维数", "能接受“估计”而不是“等式”"],
    ideas: [
      {
        name: "限制猜想",
        text: "若 ˆf 支撑在曲面上（球面、抛物面、光锥），f 比普通函数更可积。王虹的扫帚论文、与 Wu 的限制论文，都是这条线上的定量结果。",
      },
      {
        name: "Kakeya 极大函数",
        text: "沿所有方向的 1×δ 管取平均。它的有界性比集合维数更强，至今在三维仍未完全解决——Wang–Zahl 解决的是集合猜想。",
      },
      {
        name: "局部平滑",
        text: "波动方程的解比椭圆方程“多 1/2 阶”正则。Guth–Wang–Zhang 用光锥平方函数估计，在 2+1 维把它证完。",
      },
    ],
    steps: [
      {
        title: "读 Wolff 1999 综述的前半，画出问题图",
        body: "纸上写下四个节点：Kakeya 集合、Kakeya 极大函数、限制猜想、局部平滑，并标出已知的蕴含方向。限制 ⇒ Kakeya 维数；局部平滑与光锥限制/平方函数相关。",
      },
      {
        title: "搞懂 Fefferman 盘乘子反例的一句话版本",
        body: "若 Kakeya 集可以很薄，则把傅里叶乘子做成“许多方向的薄扇区”时，Lᵖ 有界性会坏掉。细节可看 Stein《Harmonic Analysis》或 Tao 的笔记，第一遍只需要因果链。",
      },
      {
        title: "知道波包（wave packet）长什么样",
        body: "频率落在曲面上的一小块，空间上就是一根指向法向的管。Kakeya 估计管的重叠，限制估计波包的叠加——同一几何，不同振荡。",
      },
    ],
    readings: [
      {
        title: "Wolff 讲义 / Lecture notes on harmonic analysis",
        detail: "Łaba 整理本。不预设调和分析背景，是这一关的主教材。",
        href: "https://www.math.ubc.ca/~ilaba/wolff/",
      },
      {
        title: "Tao, Restriction and Kakeya phenomena（讲义或博客）",
        detail: "把蕴含关系写清楚。",
        href: "https://arxiv.org/abs/math/0311181",
      },
      {
        title: "Guth–Wang–Zhang, 光锥平方函数，只读引言",
        detail: "看定理 1.1 如何推出局部平滑，证明留到第 05 关。",
        href: "https://arxiv.org/abs/1909.10693",
      },
    ],
    pitfalls: [
      "集合猜想 ≠ 极大函数猜想。新闻里说“挂谷猜想被证明”，精确地说是三维集合猜想。",
      "不要在这一关开始读 Bourgain–Demeter 的 decoupling 全文。知道它存在即可。",
    ],
    quiz: [
      {
        prompt: "Stein 限制猜想与 Kakeya 集合猜想的关系，下列哪句最准确？",
        choices: [
          "两者互相独立",
          "限制猜想蕴含 Kakeya 集合维数猜想",
          "Kakeya 集合猜想蕴含限制猜想",
        ],
        answer: 1,
        explain:
          "限制更强：它控制的是带振荡的波包，而不只是管的特征函数。所以限制 ⇒ Kakeya 维数，反过来不成立。",
      },
      {
        prompt: "Guth–Wang–Zhang (Annals 2020) 直接证完的是？",
        choices: [
          "三维 Kakeya 集合猜想",
          "2+1 维波动方程的局部平滑猜想",
          "全维数的限制猜想",
        ],
        answer: 1,
        explain: "他们证明光锥尖锐平方函数估计，从而得到平面波动方程的局部平滑。",
      },
    ],
  },
  {
    slug: "classical",
    index: "04",
    title: "梳",
    kicker: "经典 Kakeya 技术",
    hours: "40–70 小时",
    level: "研究生课题",
    summary:
      "在王虹之前，三维最好的下界来自 Wolff 的发刷：维数至少 5/2。这一关要把 bush、hairbrush、黏性、平面性、颗粒这些词变成你可以画出来的图。",
    already: ["δ-管与方向分离", "豪斯多夫维数的覆盖定义", "L² 双计数"],
    ideas: [
      {
        name: "Davies 的二维证明",
        text: "平面上两两相交的管子，用双计数立刻得到几乎满维数。证明只有几页，必须自己写一遍。",
      },
      {
        name: "Bush 与 Hairbrush",
        text: "Bush：许多管穿过同一点。Hairbrush（发刷）：许多管沿一根中心管的法向散开。Wolff 用发刷在 R³ 得到 5/2。",
      },
      {
        name: "有限域 Kakeya（Dvir）",
        text: "多项式方法给出 F_qⁿ 上的最优估计。欧氏情形不能直接搬，但它让你相信“问题的难度在几何，不在计数技巧的堆叠”。",
      },
      {
        name: "黏性、平面性、颗粒",
        text: "Katz–Łaba–Tao 分析接近 Wolff 指数的假想极端构型：管在多尺度上自相似（黏性），局部躺在平面里（平面性），并聚成扁平的颗粒。Katz–Tao 后来画出一个证明黏性情形的纲领。",
      },
    ],
    steps: [
      {
        title: "自己写出 Davies 的二维证明",
        body: "不看书，用 Cauchy–Schwarz 对特征函数做双计数。如果写不出来，说明第 01 关的尺子还没拿稳。",
      },
      {
        title: "用图解释 Wolff 发刷为什么给出 5/2",
        body: "一根中心管，周围的管像刷毛。每根刷毛与中心管相交一小段，刷毛之间在远离中心处分开。把体积加起来，指数停在 5/2。Guth 的导读里有现代语言的复述。",
      },
      {
        title: "读 Dvir 的有限域证明（短）",
        body: "Zhao 的《Polynomial Method》讲义或 Guth 的多项式方法课。目的是换胃口：欧氏 Kakeya 需要的是另一套多尺度结构，不是更高次的多项式。",
      },
      {
        title: "精读 Katz–Tao 纲领的非技术描述",
        body: "Tao 博客上的 outline，加上 Guth 2025 导读里“Katz–Tao program”那一节。记下三步：识别黏性、证明黏性满维数、把一般情形约化到黏性。前两步王虹与 Zahl 在 2022 年做完，第三步直到 2025 年才打通。",
      },
    ],
    readings: [
      {
        title: "Davies, Some remarks on the Kakeya problem (1971)",
        detail: "二维满维数。必须手写。",
      },
      {
        title: "Wolff, An improved bound for Kakeya type maximal functions",
        detail: "发刷论证。可对照 Guth 导读的现代转述。",
      },
      {
        title: "Dvir, On the size of Kakeya sets in finite fields",
        detail: "多项式方法的展示课。",
        href: "https://arxiv.org/abs/0803.2336",
      },
      {
        title: "Katz–Łaba–Tao (1999) 与 Tao 博客中的 sticky outline",
        detail: "黏性纲领。读懂“要做什么”，不要在这一关追所有估计。",
        href: "https://terrytao.wordpress.com/2014/05/07/the-kakeya-conjecture-and-the-multilinear-kakeya-conjecture/",
      },
    ],
    pitfalls: [
      "有限域的胜利容易让人误以为欧氏情形也应该用多项式一锤定音。Wang–Zahl 走的是多尺度结构分析。",
      "黏性不是“管子黏在一起”的口语。它是跨尺度的自相似：粗管里的细管，看起来像把整张图缩小。",
    ],
    quiz: [
      {
        prompt: "Wolff 发刷论证在 R³ 给出的豪斯多夫维数下界是？",
        choices: ["2", "5/2", "3"],
        answer: 1,
        explain: "5/2 是发刷的自然指数，也是后来几十年改进的起点。",
      },
      {
        prompt: "Katz–Tao 纲领的第三步是什么？",
        choices: [
          "用多项式剖分直接得到维数 3",
          "把一般 Kakeya 构型约化到黏性构型",
          "先证明限制猜想",
        ],
        answer: 1,
        explain: "Sticky 定理是第二步；2025 年论文的核心新意是完成约化。",
      },
    ],
  },
  {
    slug: "prelude",
    index: "05",
    title: "虹",
    kicker: "王虹的前期定理",
    hours: "60–100 小时",
    level: "研究论文",
    summary:
      "三维挂谷不是从天而降。局部平滑、Falconer、Furstenberg、扫帚限制，是同一双眼睛在不同问题上练出来的多尺度与关联几何。这一关选读，不求篇篇证完。",
    already: ["发刷与黏性的定义", "限制猜想的陈述", "Frostman 测度"],
    ideas: [
      {
        name: "扫帚（broom）",
        text: "波包沿代数簇的薄邻域聚成扫帚状。王虹用它把多项式剖分里最难的“细胞部分”切开，得到 p > 3+3/13 的三维限制估计。",
      },
      {
        name: "两端论证（two ends）",
        text: "Wolff 的技术：一根管若在两端都与集合有大量相交，则中间的行为受约束。后来的 Furstenberg 不等式把它定量成关联几何。",
      },
      {
        name: "Furstenberg 的黏性约化",
        text: "Orponen–Shmerkin 证明黏性 Furstenberg；Ren–Wang 把一般情形拆成黏性与半均匀间隔，再用傅里叶处理后者。Guth 明确说：这给了 Kakeya 一个提示——一般问题也许真能回到黏性。",
      },
    ],
    steps: [
      {
        title: "读 Guth–Wang–Zhang 引言 + 定理链条，不读完所有引理",
        body: "目标：看到“两个物理尺度的归纳”是怎么设的。局部平滑是菲尔兹奖引文的第一句，值得知道它的形状。",
      },
      {
        title: "读 Guth–Iosevich–Ou–Wang 的 Falconer 引言",
        body: "维数 5/4 从哪里来？refined decoupling 或波包如何变成距离。不必复现全部数值。",
      },
      {
        title: "精读 Ren–Wang Furstenberg 的第一节",
        body: "这是本关最重要的一篇。画出他们的二分：sticky / semi-well-spaced，以及为什么二分之后可以分别击破。把这张图留到下一关对照 Kakeya。",
      },
      {
        title: "可选：扫帚论文的几何段落",
        body: "若你更关心限制而非 GMT，读 Duke 论文中定义 broom 的那一节。若你的目标只是 Kakeya，可以只记结论。",
      },
    ],
    readings: [
      {
        title: "Guth, Wang, Zhang — 光锥平方函数",
        detail: "Annals 2020。局部平滑。",
        href: "https://arxiv.org/abs/1909.10693",
      },
      {
        title: "Guth, Iosevich, Ou, Wang — 平面 Falconer",
        detail: "Invent. Math. 距离集 5/4。",
        href: "https://arxiv.org/abs/1808.09346",
      },
      {
        title: "Ren, Wang — Furstenberg sets estimate in the plane",
        detail: "二维 Furstenberg 集猜想。黏性约化的样板。",
        href: "https://arxiv.org/abs/2308.08819",
      },
      {
        title: "Wang — A restriction estimate in R³ using brooms",
        detail: "独立完成的限制突破。选读。",
        href: "https://arxiv.org/abs/1802.04312",
      },
    ],
    pitfalls: [
      "不要试图在进 Kakeya 三部曲之前把每篇预印本逐行核对。这一关的产出是一张方法地图，不是一篇读书报告。",
      "Furstenberg 的黏性约化与 Kakeya 的黏性约化“神似而术不同”。能说出差别，比能背两篇摘要更有用。",
    ],
    quiz: [
      {
        prompt: "Ren–Wang 对平面 Furstenberg 猜想的关键结构是？",
        choices: [
          "直接对所有集合使用多项式剖分",
          "约化到黏性情形与半均匀间隔情形",
          "先证明三维 Kakeya 再推论",
        ],
        answer: 1,
        explain:
          "黏性由 Orponen–Shmerkin 处理，半均匀间隔用傅里叶，中间用多尺度把一般集合送进这两类。",
      },
      {
        prompt: "扫帚论文改进的是哪一类不等式？",
        choices: ["三维抛物面限制/延拓", "素数定理", "Atiyah–Singer 指标"],
        answer: 0,
        explain: "它是限制理论论文，几何物“扫帚”描述波包沿簇的聚集。",
      },
    ],
  },
  {
    slug: "trilogy",
    index: "06",
    title: "三部曲",
    kicker: "三维挂谷的证明",
    hours: "120–200 小时",
    level: "前沿研究",
    summary:
      "现在才打开王虹与 Zahl 的三篇正文。阅读顺序是固定的：黏性 → Assouad → 体积估计。每一篇先读引言和主定理，再读结构引理，最后才追 ε。",
    already: [
      "能陈述 sticky Kakeya 猜想",
      "知道 Wolff 公理 / 凸 Wolff 公理在说什么",
      "读过 Guth 2025 导读至少一遍",
    ],
    ideas: [
      {
        name: "黏性定理（2210.09581）",
        text: "自相似的三维 Kakeya 集必须满维数。证明大体沿 Katz–Tao 纲领，但要把“几乎自相似”里的误差在所有尺度上钉死，技术量很大。现已接收于 JAMS。",
      },
      {
        name: "Assouad 定理（2401.12337）",
        text: "若 Assouad 维数 < 3，则集合在许多尺度上被迫黏性；再用推广的黏性定理排除。于是所有三维 Kakeya 集 Assouad 维数 = 3。Invent. Math. 2025。",
      },
      {
        name: "体积估计（2502.17655）",
        text: "对满足凸 Wolff 公理的 δ-管，并的体积几乎最大。若某个 (σ, ω) 的 Doubling / 体积断言被取紧，则管族在许多尺度上可被粗管覆盖且近似黏性，从而 σ = ω = 0。这推出闵可夫斯基与豪斯多夫维数都是 3。",
      },
    ],
    steps: [
      {
        title: "第零遍：只读三篇的第一页和定理编号",
        body: "写出一张卡片：每篇假设是什么、结论是什么、下一篇用了上一篇的哪一条。没有这张卡片不要往第 20 页走。",
      },
      {
        title: "黏性篇：跟着 Katz–Tao 的三步走，标出“他们多做了什么”",
        body: "Guth 说他们大致按大纲走，但处理了严重的技术问题。你的笔记应区分：哪一段是纲领里已有的和积结构，哪一段是误差累积、粒状结构或最大函数。",
      },
      {
        title: "Assouad 篇：搞清“两个分离尺度 δ < ρ”",
        body: "定理说 Kakeya 集的 δ-邻域几乎和 ρ-邻域一样大。这意味着集合不能在所有尺度上都突然变稀——而这正是豪斯多夫维数仍可能作假的方式。把这一点和第三篇要对付的“稀疏尺度”对照。",
      },
      {
        title: "正篇：先读结构定理，再读归纳",
        body: "127 页的主干是：取紧的管族必须在许多尺度上可被满足凸 Wolff 公理的粗管覆盖（近似黏性），再用推广的黏性定理把损失打到 0。Guth 的 Outline（2508.05475）就是为这一段写的，请对照着读。",
      },
      {
        title: "把主定理翻译成集合语言，检查你是否真懂",
        body: "闭卷写出：为什么方向分离的管自动满足凸 Wolff 公理；为什么体积下界 |∪T| ≳ δ^ε |T| |T| 能推出 dim = 3。写不出来就还在读引言。",
      },
    ],
    readings: [
      {
        title: "Wang–Zahl, Sticky Kakeya",
        detail: "arXiv:2210.09581。第一篇，必须先读。",
        href: "https://arxiv.org/abs/2210.09581",
      },
      {
        title: "Wang–Zahl, Assouad dimension",
        detail: "arXiv:2401.12337。Invent. Math. 2025。",
        href: "https://arxiv.org/abs/2401.12337",
      },
      {
        title: "Wang–Zahl, Volume estimates… Kakeya in three dimensions",
        detail: "arXiv:2502.17655。正篇。",
        href: "https://arxiv.org/abs/2502.17655",
      },
      {
        title: "Guth, Outline of the Wang–Zahl proof",
        detail: "arXiv:2508.05475。读正篇时的伴读。",
        href: "https://arxiv.org/abs/2508.05475",
      },
    ],
    pitfalls: [
      "不要从第三篇读起。没有黏性定理，约化无处安放。",
      "多项式剖分在原 127 页里出现，精简证明里被拿掉。第一遍按原论文走，第二遍再用精简版对照，避免版本混乱。",
      "凸 Wolff 公理比“方向分离”更弱。主定理实际上强于古典 Kakeya 陈述。",
    ],
    quiz: [
      {
        prompt: "Wang–Zahl 2025 年正篇的新核心是？",
        choices: [
          "首次定义 Kakeya 集",
          "把一般三维 Kakeya 约化到已证明的黏性情形",
          "证明 n = 4 的集合猜想",
        ],
        answer: 1,
        explain: "黏性本身在 2022 年已证；正篇完成约化并得到 dim = 3。",
      },
      {
        prompt: "为什么 Assouad 维数 = 3 还不够？",
        choices: [
          "Assouad 维数总是比豪斯多夫维数小",
          "Assouad 可以严格大于豪斯多夫维数，集合仍可能在某些尺度上很稀",
          "因为期刊要求再写一篇",
        ],
        answer: 1,
        explain: "第二篇是弱形式。完整的闵可夫斯基/豪斯多夫结论在第三篇。",
      },
    ],
  },
  {
    slug: "digest",
    index: "07",
    title: "消化",
    kicker: "精简证明、综述与未完成的事",
    hours: "40–80 小时",
    level: "研究消化",
    summary:
      "用 Guth–Wang–Zahl 的精简证明和 Bourbaki 综述把逻辑压成一条线，然后看清楚：极大函数、限制猜想、以及 n ≥ 4，都还在。",
    already: ["能不看笔记陈述三部曲的逻辑链", "知道凸 Wolff 公理"],
    ideas: [
      {
        name: "精简约化（2601.14411）",
        text: "Guth、王虹与 Zahl 重写第三篇的约化，主线相同，长度下降，多项式剖分不再需要。适合作为“第二遍证明”。",
      },
      {
        name: "Bourbaki 综述（2604.03416）",
        text: "给广大数学听众的配图讲解，适合用来给讨论班做报告。",
      },
      {
        name: "仍然开放",
        text: "Rⁿ、n ≥ 4 的集合猜想；三维 Kakeya 极大函数；Stein 限制猜想（即使 n = 3）；更高维局部平滑。王虹与 Wu 的限制工作说明集合猜想并不会自动结束限制。",
      },
    ],
    steps: [
      {
        title: "用精简证明把约化再写一遍",
        body: "对着 2601.14411，尝试在 10 页以内写出“从黏性定理推出体积估计”的骨架（允许引用黏性定理当黑盒）。这是检验真懂的方法。",
      },
      {
        title: "准备一个 50 分钟报告",
        body: "听众假设只懂 Davies 和发刷。材料：Bourbaki + 你的骨架。如果讲不下来，说明还在依赖论文的章节标题。",
      },
      {
        title: "列一张“证明没有覆盖什么”的清单",
        body: "集合 vs 极大函数；R³ vs Rⁿ；特征函数 vs 波包振荡。这张清单决定你下一步读限制还是读高维 GMT。",
      },
    ],
    readings: [
      {
        title: "Guth–Wang–Zahl, Streamlined proof",
        detail: "arXiv:2601.14411。",
        href: "https://arxiv.org/abs/2601.14411",
      },
      {
        title: "Guth, The Kakeya conjecture, after Wang and Zahl",
        detail: "Bourbaki，arXiv:2604.03416。",
        href: "https://arxiv.org/abs/2604.03416",
      },
      {
        title: "Guth, Introduction to the proof of the Kakeya conjecture",
        detail: "若第一遍没读，现在补。arXiv:2505.07695。",
        href: "https://arxiv.org/abs/2505.07695",
      },
      {
        title: "Wang–Wu, Restriction estimates using decoupling…",
        detail: "看集合猜想之后限制还差什么。",
        href: "https://arxiv.org/abs/2411.08871",
      },
    ],
    pitfalls: [
      "把菲尔兹奖当成终点。引文里并列的是局部平滑、限制、Falconer、Furstenberg 与 Kakeya，不是单一定理。",
      "高维 Kakeya 不能靠“把 δ 换成 δⁿ”蒙过去。反例与复数类比说明，结构可能本质不同。",
    ],
    quiz: [
      {
        prompt: "精简证明（2026）主要简化的是哪一部分？",
        choices: [
          "二维 Davies 定理",
          "从黏性定理推出一般三维集合猜想的约化",
          "有限域 Dvir 定理",
        ],
        answer: 1,
        explain: "黏性定理仍作为输入；被重写的是第三篇里的约化。",
      },
      {
        prompt: "三维 Kakeya 集合猜想被证明后，下列哪项仍然开放？",
        choices: [
          "平面 Kakeya 集的维数是否为 2",
          "R⁴ 中 Kakeya 集是否必须维数为 4，以及三维 Kakeya 极大函数",
          "Besicovitch 集是否可以测度为零",
        ],
        answer: 1,
        explain: "二维早已解决；测度零也早已知道。开放的是高维集合猜想和更强的极大函数。",
      },
    ],
  },
];

export function getStage(slug: string) {
  return stages.find((stage) => stage.slug === slug);
}

export function neighbors(slug: string) {
  const index = stages.findIndex((stage) => stage.slug === slug);
  return {
    prev: index > 0 ? stages[index - 1] : undefined,
    next: index >= 0 && index < stages.length - 1 ? stages[index + 1] : undefined,
  };
}
