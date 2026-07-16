import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeAlert,
  Binary,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Scale,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Lang } from "../types";

type Strategy = "answer" | "clarify" | "ground" | "verify" | "review";

const copy = {
  zh: {
    badge: "课程 03",
    title: "模型、生成与能力边界",
    subtitle:
      "从下一个 Token 预测到 Tool Call，建立对模型能力、可靠性与行动边界的正确判断。",
    outcomes: [
      "模型（LLM）是什么？",
      "模型是怎样工作的？",
      "如何理解模型的能力？",
      "模型的输出是文字，为何可以调用工具？",
      "模型的短板是什么？",
      "应用中如何扬长避短？",
    ],
    modelTitle: "LLM 到底是什么？",
    modelText:
      "用四张卡片，从神经网络、训练参数到下一 Token 推理，建立一个足够准确的心智模型。",
    formula: "P(next token | current context)",
    modelPoints: [
      "训练知识被压缩进参数，不等于逐条检索原始资料。",
      "模型不天然拥有事实保证、实时信息或外部执行权限。",
    ],
    unitTitle: "模型参数与处理单元",
    unitText: "区分模型如何切分文字，以及系统如何从候选中选择下一个 Token。",
    tokenTitle: "Token：模型处理文字的基本单元",
    tokenText:
      "Token 不是固定等于一个汉字或一个单词。它可能是一个字符、词的一部分、标点，或带有前导空格的英文词片段。模型每轮预测并追加一个 Token。",
    temperatureTitle: "Temperature：推理时的生成参数",
    temperatureText:
      "Temperature 不改变训练好的权重，也不是模型记住了多少知识的指标。它只影响从候选概率分布中选取下一个 Token 时的随机性：低温度更偏向最高概率候选；高温度让其他合理候选更有机会被选中。",
    generationTitle: "LLM 生成内容示例",
    generationText:
      "一次完整回答来自反复的“看当前上下文 -> 预测下一个 Token -> 追加回完整上下文”。点击按钮，观察每一轮输入如何变成下一轮的上下文。",
    contextLabel: "当前上下文",
    candidates: "下一 token 候选（教学示意）",
    chosen: "本轮选中",
    generate: "继续生成",
    reset: "重新开始",
    output: "生成输出",
    note: "候选与概率为预设教学示意，并非实时模型推理。本示例每轮选择最高概率候选。",
    hallucinationTitle: "为什么会有幻觉？",
    hallucinationText:
      "模型的目标是生成“最像合理续写”的 token，不是在每一句话生成前完成事实验证。缺少证据、知识陈旧、任务歧义或约束不足时，它可能补出看似合理却不可靠的细节。",
    dreamTitle: "从梦境回到现实",
    dreamQuote: "注入背景上下文，其实等于把“大脑”从梦境拉回现实。",
    dreamText:
      "没有当前证据时，模型主要依据训练中学到的语言模式续写；提供当前、相关、可靠的材料后，它才能以真实任务的事实为锚点进行提取、归纳和组织。",
    evidence: "证据材料",
    role: "角色边界",
    rules: "输出规范",
    noEvidence: "无制度材料",
    withEvidence: "提供制度原文",
    generalRole: "泛用助手",
    analystRole: "制度分析助手",
    freeRules: "自由回答",
    strictRules: "引用条款并标记未知",
    dreamMode: "梦境模式",
    realityMode: "现实锚定模式",
    source: "事实锚点",
    noSource: "无当前来源",
    sourceValue: "《2026 差旅与报销制度》第 4.2 条",
    task: "用户问题",
    taskValue: "北京地区住宿报销上限是多少？",
    lesson: "课程结论",
    capabilityTitle: "能力不是“会”或“不会”",
    capabilityText:
      "应同时判断表达能力、证据边界和可靠性边界。可用结果取决于模型能力、任务表述、可用证据、输出约束与验证机制。",
    selectTask: "选择一个任务，判断产品应如何响应",
    shortfallsTitle: "除了幻觉，还有哪些突出短板？",
    shortfallsText:
      "模型可以写出有条理的答案，却不天然保证它读得全、理解得准、推得稳、找得到依据或承担得起后果。",
    checksTitle: "四个可靠性检查",
    checksText: "在交付模型结果前，用这四个问题决定需要补充什么能力。",
    strategies: {
      answer: "直接回答",
      clarify: "追问澄清",
      ground: "依据材料回答",
      verify: "工具验证",
      review: "人工复核",
    },
    protocolTitle: "文字为何可以调用工具？",
    protocolText:
      "Tool Call 不是模型突然获得执行权限，而是模型在工具定义和输出约束下生成的结构化调用意图。真正解析、校验、授权和执行的是 Client。",
    protocolSteps: [
      "工具定义进入上下文",
      "模型生成结构化意图",
      "Client 校验权限与参数",
      "工具结果回填并组织回答",
    ],
    nextStep: "下一步",
    client: "CLIENT",
    model: "LLM",
    quizTitle: "情境判断",
    quizText: "先选择最合适的产品策略，再查看解释。",
    choose: "选择策略",
    correct: "推荐策略",
    explanation: "为什么",
  },
  en: {
    badge: "Course 03",
    title: "Models, Generation, and Capability Boundaries",
    subtitle:
      "From next-token prediction to Tool Calls: learn to judge model capability, reliability, and action boundaries.",
    outcomes: [
      "What is an LLM?",
      "How does a model work?",
      "How should we understand a model's capabilities?",
      "If its output is text, how can a model call tools?",
      "What are a model's limitations?",
      "How do we use its strengths while managing its limits?",
    ],
    modelTitle: "What is an LLM?",
    modelText:
      "Use four cards to build an accurate mental model: neural network, trained parameters, and next-token inference.",
    formula: "P(next token | current context)",
    modelPoints: [
      "Training knowledge is compressed into parameters, not retrieved record by record.",
      "A model does not inherently guarantee facts, possess live information, or hold execution permissions.",
    ],
    unitTitle: "Model parameters and processing units",
    unitText:
      "Separate how a model breaks text into units from how a system selects the next token from candidates.",
    tokenTitle: "Token: the basic unit used to process text",
    tokenText:
      "A token is not fixed to one word or one character. It can be a character, part of a word, punctuation, or an English word fragment with a leading space. The model predicts and appends one token at a time.",
    temperatureTitle: "Temperature: an inference-time generation parameter",
    temperatureText:
      "Temperature does not change trained weights and does not measure how much knowledge a model retains. It only affects randomness when choosing the next token from a probability distribution: lower temperature favors the highest-probability candidate; higher temperature gives other plausible candidates more opportunity to be selected.",
    generationTitle: "LLM content generation example",
    generationText:
      "A complete response repeats a loop: read current context, predict the next token, append it to the full context, and continue. Click through the steps to see each output become the next round’s input.",
    contextLabel: "Current context",
    candidates: "Next-token candidates (teaching illustration)",
    chosen: "Chosen this round",
    generate: "Generate next",
    reset: "Start over",
    output: "Generated output",
    note: "Candidates and probabilities are preset teaching illustrations, not live model reasoning. This example selects the highest-probability candidate each round.",
    hallucinationTitle: "Why do models hallucinate?",
    hallucinationText:
      "The model is optimized to produce the most plausible continuation, not to fact-check every sentence before generating it. Missing evidence, stale knowledge, ambiguous tasks, and weak constraints can produce plausible but unsupported details.",
    dreamTitle: "From dream to grounded reality",
    dreamQuote:
      "Injecting background context brings the “brain” back from a dream into reality.",
    dreamText:
      "Without current evidence, the model continues from patterns learned in training. Supplying current, relevant, and reliable material gives it facts to extract, compare, and organize for the real task.",
    evidence: "Evidence",
    role: "Role boundary",
    rules: "Output rules",
    noEvidence: "No policy material",
    withEvidence: "Provide policy text",
    generalRole: "General assistant",
    analystRole: "Policy analyst",
    freeRules: "Free response",
    strictRules: "Cite clause and flag unknowns",
    dreamMode: "Dream mode",
    realityMode: "Grounded reality",
    source: "Fact anchor",
    noSource: "No current source",
    sourceValue: "2026 Travel and Expense Policy, clause 4.2",
    task: "User question",
    taskValue: "What is the Beijing lodging reimbursement limit?",
    lesson: "Lesson",
    capabilityTitle: "Capability is not simply “can” or “cannot”",
    capabilityText:
      "Judge expression ability, evidence boundaries, and reliability together. Useful results depend on the model, task framing, available evidence, output constraints, and verification.",
    selectTask: "Choose a task to decide the right product response",
    shortfallsTitle: "What stands out besides hallucination?",
    shortfallsText:
      "A model can produce a well-organized answer without guaranteeing that it read everything, understood the task, reasoned reliably, retained evidence, or can bear the consequences.",
    checksTitle: "Four reliability checks",
    checksText:
      "Before delivering a model result, use these questions to decide which capability must be added.",
    strategies: {
      answer: "Answer directly",
      clarify: "Clarify",
      ground: "Answer from material",
      verify: "Verify with tools",
      review: "Human review",
    },
    protocolTitle: "Why can text call tools?",
    protocolText:
      "A Tool Call does not grant the model execution power. It is structured call intent generated under tool definitions and output constraints. The Client parses, validates, authorizes, and executes it.",
    protocolSteps: [
      "Tool definition enters context",
      "Model generates structured intent",
      "Client validates permission and arguments",
      "Tool result returns for a user-facing answer",
    ],
    nextStep: "Next step",
    client: "CLIENT",
    model: "LLM",
    quizTitle: "Scenario judgment",
    quizText:
      "Select the most appropriate product strategy, then reveal the explanation.",
    choose: "Choose a strategy",
    correct: "Recommended strategy",
    explanation: "Why",
  },
} satisfies Record<Lang, any>;

const tokenRuns = [
  [
    { token: "，", chance: 61 },
    { token: "了", chance: 22 },
    { token: "：", chance: 17 },
  ],
  [
    { token: "模", chance: 55 },
    { token: "其", chance: 26 },
    { token: "这", chance: 19 },
  ],
  [
    { token: "型", chance: 74 },
    { token: "块", chance: 15 },
    { token: "些", chance: 11 },
  ],
  [
    { token: "会", chance: 58 },
    { token: "能", chance: 31 },
    { token: "正", chance: 11 },
  ],
  [
    { token: "根", chance: 67 },
    { token: "从", chance: 21 },
    { token: "在", chance: 12 },
  ],
  [
    { token: "据", chance: 80 },
    { token: "据", chance: 12 },
    { token: "着", chance: 8 },
  ],
  [
    { token: "上", chance: 76 },
    { token: "下", chance: 16 },
    { token: "不", chance: 8 },
  ],
  [
    { token: "下", chance: 83 },
    { token: "文", chance: 11 },
    { token: "这", chance: 6 },
  ],
  [
    { token: "文", chance: 89 },
    { token: "一", chance: 7 },
    { token: "关", chance: 4 },
  ],
  [
    { token: "预", chance: 71 },
    { token: "推", chance: 19 },
    { token: "组", chance: 10 },
  ],
  [
    { token: "测", chance: 84 },
    { token: "断", chance: 10 },
    { token: "理", chance: 6 },
  ],
  [
    { token: "下", chance: 79 },
    { token: "每", chance: 14 },
    { token: "回", chance: 7 },
  ],
  [
    { token: "一", chance: 86 },
    { token: "个", chance: 9 },
    { token: "面", chance: 5 },
  ],
  [
    { token: "个", chance: 91 },
    { token: "段", chance: 6 },
    { token: "类", chance: 3 },
  ],
  [
    { token: " ", chance: 94 },
    { token: "字", chance: 4 },
    { token: "。", chance: 2 },
  ],
  [
    { token: "T", chance: 95 },
    { token: "词", chance: 3 },
    { token: "。", chance: 2 },
  ],
  [
    { token: "o", chance: 97 },
    { token: "O", chance: 2 },
    { token: "。", chance: 1 },
  ],
  [
    { token: "k", chance: 98 },
    { token: "c", chance: 1 },
    { token: "。", chance: 1 },
  ],
  [
    { token: "e", chance: 98 },
    { token: "n", chance: 1 },
    { token: "。", chance: 1 },
  ],
  [
    { token: "n", chance: 99 },
    { token: "。", chance: 1 },
    { token: "s", chance: 0 },
  ],
  [
    { token: "。", chance: 99 },
    { token: "！", chance: 1 },
    { token: "？", chance: 0 },
  ],
];

const englishTokenRuns = [
  [
    { token: ",", chance: 61 },
    { token: ";", chance: 22 },
    { token: ".", chance: 17 },
  ],
  [
    { token: " this", chance: 55 },
    { token: " how", chance: 26 },
    { token: " why", chance: 19 },
  ],
  [
    { token: " example", chance: 74 },
    { token: " text", chance: 15 },
    { token: " system", chance: 11 },
  ],
  [
    { token: " shows", chance: 58 },
    { token: " explains", chance: 31 },
    { token: " uses", chance: 11 },
  ],
  [
    { token: " how", chance: 67 },
    { token: " why", chance: 21 },
    { token: " when", chance: 12 },
  ],
  [
    { token: " a", chance: 80 },
    { token: " the", chance: 12 },
    { token: " an", chance: 8 },
  ],
  [
    { token: " model", chance: 76 },
    { token: " system", chance: 16 },
    { token: " network", chance: 8 },
  ],
  [
    { token: " predicts", chance: 83 },
    { token: " selects", chance: 11 },
    { token: " generates", chance: 6 },
  ],
  [
    { token: " the", chance: 89 },
    { token: " a", chance: 7 },
    { token: " each", chance: 4 },
  ],
  [
    { token: " next", chance: 71 },
    { token: " following", chance: 19 },
    { token: " likely", chance: 10 },
  ],
  [
    { token: " token", chance: 84 },
    { token: " word", chance: 10 },
    { token: " response", chance: 6 },
  ],
  [
    { token: " from", chance: 79 },
    { token: " using", chance: 14 },
    { token: " based", chance: 7 },
  ],
  [
    { token: " current", chance: 86 },
    { token: " the", chance: 9 },
    { token: " its", chance: 5 },
  ],
  [
    { token: " context", chance: 91 },
    { token: " input", chance: 6 },
    { token: " prompt", chance: 3 },
  ],
  [
    { token: ".", chance: 99 },
    { token: "!", chance: 1 },
    { token: "?", chance: 0 },
  ],
];

const modelSlides = {
  zh: [
    {
      label: "01 / 神经网络",
      title: "LLM 是一个巨大的神经网络",
      text: "可以把它理解为许多计算节点和连接组成的网络。每个节点做简单的数值变换；大量连接叠加后，网络能把输入文字转换为对下一段文字的判断。",
    },
    {
      label: "02 / 训练",
      title: "海量语料让连接权重逐步成形",
      text: "训练时，模型反复阅读文本并预测下一个 Token。预测偏差会反向调整连接权重。Transformer 会用多个注意力头，从不同关系中判断哪些词彼此相关。",
    },
    {
      label: "03 / 参数",
      title: "训练完成后，模型是一组静态参数",
      text: "训练好的模型可看作一个巨型的节点连接矩阵，也就是参数或权重。它不是一份逐条存放的资料库；一次对话通常不会改写这些权重。",
    },
    {
      label: "04 / 推理",
      title: "输入上下文，计算下一个 Token 的概率",
      text: "推理时，当前 context 穿过这组固定权重，输出候选 Token 的概率分布。系统按解码规则选出一个 Token，将它追加回上下文，然后重复这个过程。",
    },
  ],
  en: [
    {
      label: "01 / NETWORK",
      title: "An LLM is a very large neural network",
      text: "Think of it as a network of computational nodes and connections. Each node makes a simple numerical transformation; together, many connections turn input text into a judgment about what text comes next.",
    },
    {
      label: "02 / TRAINING",
      title: "Large-scale text shapes connection weights",
      text: "During training, the model repeatedly reads text and predicts the next token. Prediction error adjusts connection weights. A Transformer uses multiple attention heads to judge different relationships among tokens.",
    },
    {
      label: "03 / PARAMETERS",
      title: "After training, the model is static parameters",
      text: "A trained model can be viewed as a giant matrix of node connections: parameters or weights. It is not a record-by-record document store, and an ordinary conversation does not usually rewrite these weights.",
    },
    {
      label: "04 / INFERENCE",
      title: "Context in, next-token probabilities out",
      text: "At inference, current context passes through these fixed weights and produces a probability distribution over candidate tokens. A decoding rule picks one, appends it to context, and repeats.",
    },
  ],
};

const taskCards = {
  zh: [
    {
      title: "总结会议记录",
      desc: "将提供的记录整理为三条结论。",
      strategy: "answer" as Strategy,
      evidence: "以完整会议记录为事实边界。",
      risk: "遗漏、错误归因或将推断说成事实。",
      action: "直接回答，并标明结论来自会议记录。",
    },
    {
      title: "查询今天的天气",
      desc: "上海今天下午是否下雨？",
      strategy: "verify" as Strategy,
      evidence: "需要当前天气服务或可靠实时数据。",
      risk: "训练知识无法保证今天的状态。",
      action: "调用实时天气工具后再回答。",
    },
    {
      title: "分析两份制度",
      desc: "比较新旧报销制度的变化。",
      strategy: "ground" as Strategy,
      evidence: "需要两份完整、明确版本的原文。",
      risk: "遗漏条款、版本混淆或补充常识。",
      action: "依据材料回答，引用条款并标记待确认项。",
    },
    {
      title: "处理客户问题",
      desc: "“帮我处理一下这个客户问题”。",
      strategy: "clarify" as Strategy,
      evidence: "需要客户、目标、权限和期望结果。",
      risk: "模型擅自假定范围并采取错误方向。",
      action: "先追问目标、背景和约束。",
    },
    {
      title: "精确金额计算",
      desc: "三笔订单九折后，含 6% 税费的总金额是多少？",
      strategy: "verify" as Strategy,
      evidence: "需要完整金额、币种、税率、适用顺序和舍入规则。",
      risk: "漏项、顺序错误、小数精度或舍入不一致会让数值不可审计。",
      action: "由计算器、代码、表格或财务系统计算，再由模型解释口径。",
    },
    {
      title: "200 页制度检索",
      desc: "找出所有审批例外及其适用条件。",
      strategy: "ground" as Strategy,
      evidence: "需要完整、版本明确的制度与附件。",
      risk: "长上下文可能遗漏条件、混淆版本或错误关联条款。",
      action: "检索筛选、引用原文，并回查关键结论。",
    },
    {
      title: "医疗结论",
      desc: "根据症状判断应该服用什么药。",
      strategy: "review" as Strategy,
      evidence: "需要完整临床信息和合格专业判断。",
      risk: "高风险错误会直接伤害用户。",
      action: "只可整理一般信息，应转交专业审核。",
    },
  ],
  en: [
    {
      title: "Summarize meeting notes",
      desc: "Turn supplied notes into three conclusions.",
      strategy: "answer" as Strategy,
      evidence: "Use the complete meeting notes as the factual boundary.",
      risk: "Omission, wrong attribution, or presenting inference as fact.",
      action: "Answer directly and identify the notes as the source.",
    },
    {
      title: "Check today’s weather",
      desc: "Will it rain in Shanghai this afternoon?",
      strategy: "verify" as Strategy,
      evidence: "Current weather service or reliable live data is required.",
      risk: "Training knowledge cannot guarantee today’s conditions.",
      action: "Use a live weather tool before answering.",
    },
    {
      title: "Compare two policies",
      desc: "Compare changes in old and new expense policies.",
      strategy: "ground" as Strategy,
      evidence: "Both complete, clearly versioned policy texts are required.",
      risk: "Missing clauses, version confusion, or added assumptions.",
      action: "Answer from material, cite clauses, and flag open questions.",
    },
    {
      title: "Handle a client issue",
      desc: "“Help me handle this client issue.”",
      strategy: "clarify" as Strategy,
      evidence: "Client, goal, authority, and desired outcome are needed.",
      risk: "The model may assume scope and move in the wrong direction.",
      action: "Clarify the goal, background, and constraints first.",
    },
    {
      title: "Precise amount calculation",
      desc: "What is the total for three orders after 10% discount and 6% tax?",
      strategy: "verify" as Strategy,
      evidence:
        "Complete amounts, currency, tax rate, order of operations, and rounding rules are required.",
      risk: "Missing inputs, wrong ordering, decimal precision, or inconsistent rounding makes the number unauditable.",
      action:
        "Calculate with a calculator, code, spreadsheet, or finance system; let the model explain the method.",
    },
    {
      title: "Search a 200-page policy",
      desc: "Find every approval exception and its conditions.",
      strategy: "ground" as Strategy,
      evidence:
        "Complete, clearly versioned policy and attachments are required.",
      risk: "Long context can omit conditions, confuse versions, or link clauses incorrectly.",
      action:
        "Retrieve and filter, cite source text, then check key conclusions.",
    },
    {
      title: "Medical conclusion",
      desc: "Recommend medicine from symptoms.",
      strategy: "review" as Strategy,
      evidence:
        "Complete clinical facts and qualified professional judgment are needed.",
      risk: "High-risk errors can directly harm a user.",
      action:
        "At most organize general information; route to professional review.",
    },
  ],
};

const quiz = {
  zh: [
    {
      prompt: "“公司最新报销政策是什么？”",
      strategy: "verify" as Strategy,
      answer:
        "最新制度属于当前、可变的组织事实。应检索或读取现行制度后再回答，并保留来源。",
    },
    {
      prompt: "“请把下面这段会议记录改写得更清晰。”",
      strategy: "answer" as Strategy,
      answer:
        "任务的事实材料已经给出，重点是表达转换。仍应避免补充记录中没有的信息。",
    },
    {
      prompt: "“帮我处理这个投诉。”",
      strategy: "clarify" as Strategy,
      answer:
        "对象、目标、授权范围和期望动作都不明确，先澄清比擅自行动更可靠。",
    },
    {
      prompt:
        "“计算 12 笔订单在不同折扣、税率和四舍五入规则下的最终应收金额。”",
      strategy: "verify" as Strategy,
      answer:
        "模型可帮助读取规则、整理字段和解释结果；最终金额应由计算器、表格、代码或财务系统计算，并保留可复核的公式、输入和舍入口径。",
    },
  ],
  en: [
    {
      prompt: "“What is our company’s latest expense policy?”",
      strategy: "verify" as Strategy,
      answer:
        "The current policy is changing organizational fact. Retrieve or read the active policy before answering and retain its source.",
    },
    {
      prompt: "“Rewrite these meeting notes more clearly.”",
      strategy: "answer" as Strategy,
      answer:
        "The factual material is already supplied, so this is primarily a transformation task. Do not add information absent from the notes.",
    },
    {
      prompt: "“Handle this complaint for me.”",
      strategy: "clarify" as Strategy,
      answer:
        "The object, goal, authority, and desired action are unclear. Clarify before assuming and acting.",
    },
    {
      prompt:
        "“Calculate the final receivable for 12 orders with different discounts, tax rates, and rounding rules.”",
      strategy: "verify" as Strategy,
      answer:
        "The model can read rules, organize fields, and explain results, but a calculator, spreadsheet, code, or finance system must calculate the final amount and retain auditable formulas, inputs, and rounding rules.",
    },
  ],
};

const strategyTone: Record<Strategy, string> = {
  answer: "border-blue-500/40 bg-blue-500/10 text-blue-200",
  clarify: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  ground: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  verify: "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
  review: "border-rose-500/40 bg-rose-500/10 text-rose-200",
};

const reliabilityChecks = {
  zh: [
    {
      title: "模型是否有依据？",
      detail: "实时信息、当前制度和关键结论能否回到可靠来源？",
      remedy: "上下文、来源、实时工具",
      icon: <FileText className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "模型是否算得准、推得稳？",
      detail: "是否涉及精确数值、长推理链或复杂条件组合？",
      remedy: "计算工具、任务拆解、结果校验",
      icon: <Binary className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "模型是否理解真正的任务？",
      detail: "目标、对象、范围、时间和权限是否已经明确？",
      remedy: "澄清、结构化输入、约束",
      icon: <BrainCircuit className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "结果能承担后果吗？",
      detail: "这是否是医疗、法律、财务或合规等高风险结论？",
      remedy: "权限控制、人工复核、专业责任",
      icon: <ShieldCheck className="h-5 w-5" />,
      tone: "text-rose-300",
    },
  ],
  en: [
    {
      title: "Does the model have evidence?",
      detail:
        "Can live facts, current policies, and key conclusions return to reliable sources?",
      remedy: "Context, sources, and live tools",
      icon: <FileText className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "Can it calculate and reason reliably?",
      detail:
        "Does this involve exact numbers, long reasoning chains, or complex conditions?",
      remedy: "Calculation tools, decomposition, and checks",
      icon: <Binary className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "Does it understand the real task?",
      detail: "Are the goal, subject, scope, time, and authority explicit?",
      remedy: "Clarification, structured input, and constraints",
      icon: <BrainCircuit className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "Can the result bear the consequences?",
      detail:
        "Is this a high-risk medical, legal, financial, or compliance conclusion?",
      remedy:
        "Permission controls, human review, and professional responsibility",
      icon: <ShieldCheck className="h-5 w-5" />,
      tone: "text-rose-300",
    },
  ],
};

export default function ModelBoundariesGuide({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [tokenIndex, setTokenIndex] = useState(0);
  const [modelSlide, setModelSlide] = useState(0);
  const [evidence, setEvidence] = useState(false);
  const [role, setRole] = useState(false);
  const [rules, setRules] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);
  const [protocolIndex, setProtocolIndex] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState<Record<number, Strategy>>(
    {},
  );
  const activeTokenRuns = lang === "zh" ? tokenRuns : englishTokenRuns;
  const generatedTokens = activeTokenRuns
    .slice(0, tokenIndex)
    .map((run) => run[0].token);
  const tokens = generatedTokens.join("");
  const latestToken = generatedTokens.at(-1);
  const previousTokens = generatedTokens.slice(0, -1).join("");
  const currentRun =
    activeTokenRuns[Math.min(tokenIndex, activeTokenRuns.length - 1)];
  const activeTask = taskCards[lang][taskIndex];
  const grounded = evidence && role && rules;

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[32px] border border-purple-500/25 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_38%)] bg-slate-900/60 p-6 md:p-8">
        <div className="mb-3 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          {t.badge}
        </div>
        <h2 className="max-w-5xl text-3xl font-bold text-white md:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-lg">
          {t.subtitle}
        </p>
        <div className="mt-5 grid gap-2 md:grid-cols-3">
          {t.outcomes.map((outcome: string, index: number) => (
            <div
              key={outcome}
              className="rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5"
            >
              <div className="mb-1 text-[10px] font-bold tracking-[0.2em] text-purple-300">
                0{index + 1}
              </div>
              <p className="text-sm leading-5 text-slate-300">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      <ModelExplainer
        lang={lang}
        t={t}
        slide={modelSlide}
        setSlide={setModelSlide}
      />

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Binary className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">{t.unitTitle}</h3>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
              {t.unitText}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-5">
            <div className="font-mono text-sm font-bold text-cyan-300">
              TOKEN
            </div>
            <h4 className="mt-3 font-semibold text-white">{t.tokenTitle}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t.tokenText}
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/15 p-5">
            <div className="font-mono text-sm font-bold text-purple-300">
              TEMPERATURE
            </div>
            <h4 className="mt-3 font-semibold text-white">
              {t.temperatureTitle}
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t.temperatureText}
            </p>
          </div>
        </div>
      </div>

      <div
        id="generation-example"
        className="rounded-3xl border border-slate-800 bg-slate-900/55 p-5 md:p-7"
      >
        <div className="mb-6 flex items-start gap-3">
          <Binary className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.generationTitle}
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
              {t.generationText}
            </p>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {t.candidates}
            </div>
            <div className="mt-4 space-y-3">
              {currentRun.map((candidate) => (
                <div
                  key={candidate.token}
                  className="grid grid-cols-[minmax(96px,max-content)_minmax(0,1fr)_36px] items-center gap-3 font-mono text-sm"
                >
                  <span className="whitespace-pre text-purple-200">
                    {candidate.token}
                  </span>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-500 transition-all"
                      style={{ width: `${candidate.chance}%` }}
                    />
                  </div>
                  <span className="text-right text-slate-500">
                    {candidate.chance}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-500/25 bg-cyan-950/10 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              {t.contextLabel}
            </div>
            <p className="mt-4 min-h-14 whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
              {lang === "zh"
                ? "用户：请总结这段内容。\n模型：这段内容主要说明"
                : "User: Summarize this material.\nModel: This material mainly explains"}
              {tokens || "..."}
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/25 bg-purple-950/15 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-purple-300">
                {t.output}
              </div>
              <div className="animate-pulse text-[11px] font-semibold text-purple-200">
                {lang === "zh"
                  ? "点击生成下一 Token"
                  : "Click to generate next token"}
                <ChevronRight className="inline h-3.5 w-3.5" />
              </div>
            </div>
            <p className="mt-4 min-h-14 whitespace-pre-wrap font-mono text-lg font-semibold leading-7 text-white">
              {lang === "zh"
                ? "用户：请总结这段内容。\n模型：这段内容主要说明"
                : "User: Summarize this material.\nModel: This material mainly explains"}
              {previousTokens}
              {latestToken ? (
                <span className="rounded bg-purple-400/25 px-1 text-purple-100">
                  {latestToken}
                </span>
              ) : (
                <span className="rounded bg-purple-500/20 px-1 text-purple-200">
                  ...
                </span>
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setTokenIndex((value) =>
                    Math.min(value + 1, activeTokenRuns.length),
                  )
                }
                disabled={tokenIndex >= activeTokenRuns.length}
                className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-200 disabled:opacity-40"
              >
                {t.generate}
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTokenIndex(0)}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
              >
                {t.reset}
              </button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">{t.note}</p>
      </div>

      <div className="rounded-3xl border border-rose-500/20 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.11),transparent_30%)] bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <BadgeAlert className="mt-1 h-6 w-6 shrink-0 text-rose-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.hallucinationTitle}
            </h3>
            <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-400">
              {t.hallucinationText}
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-rose-500/20 bg-slate-950/50 p-5 text-center font-mono text-sm text-rose-200 md:text-base">
          {lang === "zh"
            ? "预测“最像合理续写”  ≠  保证“已被事实验证”"
            : "Predict “the most plausible continuation”  !=  Guarantee “factually verified”"}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.shortfallsTitle}
            </h3>
            <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-400">
              {t.shortfallsText}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reliabilityChecks[lang].map((check) => (
            <div
              key={check.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              <div className={`mb-3 ${check.tone}`}>{check.icon}</div>
              <h4 className="font-semibold text-white">{check.title}</h4>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                {check.detail}
              </p>
              <div
                className={`mt-4 border-t border-slate-800 pt-3 text-sm font-semibold ${check.tone}`}
              >
                {check.remedy}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-slate-800 pt-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t.checksTitle}
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            {t.checksText}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/55 p-6 md:p-8">
        <div className="mb-6 flex gap-3">
          <Sparkles className="mt-1 h-6 w-6 shrink-0 text-cyan-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">{t.dreamTitle}</h3>
            <p className="mt-2 text-lg font-semibold text-cyan-100">
              {t.dreamQuote}
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-400">
              {t.dreamText}
            </p>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            {
              label: t.evidence,
              active: evidence,
              set: setEvidence,
              off: t.noEvidence,
              on: t.withEvidence,
            },
            {
              label: t.role,
              active: role,
              set: setRole,
              off: t.generalRole,
              on: t.analystRole,
            },
            {
              label: t.rules,
              active: rules,
              set: setRules,
              off: t.freeRules,
              on: t.strictRules,
            },
          ].map((control) => (
            <button
              key={control.label}
              onClick={() => control.set(!control.active)}
              className={`rounded-2xl border p-4 text-left transition ${control.active ? "border-cyan-500/40 bg-cyan-500/10" : "border-slate-800 bg-slate-950/50 hover:bg-slate-800/70"}`}
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {control.label}
              </div>
              <div
                className={`mt-2 font-semibold ${control.active ? "text-cyan-200" : "text-slate-300"}`}
              >
                {control.active ? control.on : control.off}
              </div>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={grounded ? "reality" : "dream"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-5 grid gap-4 rounded-3xl border p-5 md:grid-cols-[190px_minmax(0,1fr)] ${grounded ? "border-cyan-500/30 bg-cyan-950/20" : "border-rose-500/20 bg-rose-950/15"}`}
          >
            <div>
              <div
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${grounded ? "border-cyan-500/30 text-cyan-200" : "border-rose-500/30 text-rose-200"}`}
              >
                {grounded ? t.realityMode : t.dreamMode}
              </div>
              <div className="mt-4 text-sm text-slate-400">{t.source}</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {grounded ? t.sourceValue : t.noSource}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {t.task}
              </div>
              <p className="mt-2 text-sm text-slate-200">{t.taskValue}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {grounded
                  ? lang === "zh"
                    ? "根据第 4.2 条，北京地区住宿报销上限为 800 元/晚。此结论来自当前制度；材料未说明的例外情形需另行确认。"
                    : "Under clause 4.2, the Beijing lodging limit is RMB 800 per night. This conclusion is grounded in the current policy; exceptions not stated in the material require confirmation."
                  : lang === "zh"
                    ? "一般而言，北京出差住宿通常可以报销 800 元/晚左右。"
                    : "In general, lodging in Beijing can usually be reimbursed at around RMB 800 per night."}{" "}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-7 text-slate-400">
          <span className="font-semibold text-slate-200">{t.lesson}: </span>
          {lang === "zh"
            ? "上下文提供证据，人设限定职责，规范约束行为。它们降低无依据补全，但不替代检索、计算、工具校验与人工复核。"
            : "Context provides evidence, role limits responsibility, and rules constrain behavior. They reduce unsupported completion but do not replace retrieval, calculation, tool checks, or human review."}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <div className="mb-6 flex gap-3">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.capabilityTitle}
            </h3>
            <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-400">
              {t.capabilityText}
            </p>
          </div>
        </div>
        <div className="mb-4 text-sm font-semibold text-slate-300">
          {t.selectTask}
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {taskCards[lang].map((item, index) => (
            <button
              key={item.title}
              onClick={() => setTaskIndex(index)}
              className={`rounded-2xl border p-4 text-left transition ${index === taskIndex ? "border-amber-500/40 bg-amber-500/10" : "border-slate-800 bg-slate-950/50 hover:bg-slate-800/70"}`}
            >
              <div className="font-semibold text-white">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-400">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 rounded-3xl border border-slate-800 bg-slate-950/50 p-5 md:grid-cols-3">
          <InfoBlock
            label={lang === "zh" ? "需要的依据" : "Evidence needed"}
            value={activeTask.evidence}
          />
          <InfoBlock
            label={lang === "zh" ? "主要风险" : "Primary risk"}
            value={activeTask.risk}
          />
          <InfoBlock
            label={lang === "zh" ? "产品动作" : "Product action"}
            value={activeTask.action}
            tone={strategyTone[activeTask.strategy]}
            badge={t.strategies[activeTask.strategy]}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-amber-500/20 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Wrench className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.protocolTitle}
            </h3>
            <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-400">
              {t.protocolText}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {t.protocolSteps.map((step: string, index: number) => (
            <button
              key={step}
              onClick={() => setProtocolIndex(index)}
              className={`rounded-2xl border p-4 text-left ${protocolIndex === index ? "border-amber-500/40 bg-amber-500/10" : "border-slate-800 bg-slate-950/50"}`}
            >
              <div className="text-xs font-bold tracking-[0.18em] text-amber-300">
                0{index + 1}
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                {step}
              </div>
            </button>
          ))}
        </div>
        <ProtocolPanel lang={lang} t={t} index={protocolIndex} />
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-purple-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">{t.quizTitle}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.quizText}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {quiz[lang].map((item, index) => (
            <div
              key={item.prompt}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              <p className="min-h-12 font-semibold leading-6 text-white">
                {item.prompt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(t.strategies) as Strategy[]).map((strategy) => (
                  <button
                    key={strategy}
                    onClick={() =>
                      setSelectedQuiz((value) => ({
                        ...value,
                        [index]: strategy,
                      }))
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${selectedQuiz[index] === strategy ? strategyTone[strategy] : "border-slate-700 text-slate-400 hover:text-slate-200"}`}
                  >
                    {t.strategies[strategy]}
                  </button>
                ))}
              </div>
              {selectedQuiz[index] && (
                <div className="mt-5 border-t border-slate-800 pt-4 text-sm leading-7 text-slate-400">
                  <div className="font-semibold text-emerald-300">
                    {t.correct}: {t.strategies[item.strategy]}
                  </div>
                  <p className="mt-2">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  value,
  tone,
  badge,
}: {
  label: string;
  value: string;
  tone?: string;
  badge?: string;
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      {badge && (
        <span
          className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${tone}`}
        >
          {badge}
        </span>
      )}
      <p className="mt-3 text-sm leading-7 text-slate-300">{value}</p>
    </div>
  );
}

function ModelExplainer({
  lang,
  t,
  slide,
  setSlide,
}: {
  lang: Lang;
  t: any;
  slide: number;
  setSlide: (slide: number) => void;
}) {
  const slides = modelSlides[lang];
  const active = slides[slide];
  const previous = () => setSlide((slide + slides.length - 1) % slides.length);
  const next = () => setSlide((slide + 1) % slides.length);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
      <div className="flex gap-3">
        <BrainCircuit className="h-6 w-6 shrink-0 text-purple-400" />
        <div>
          <h3 className="text-xl font-semibold text-white">{t.modelTitle}</h3>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
            {t.modelText}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-h-[290px] overflow-hidden rounded-3xl border border-purple-500/20 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_45%)] bg-slate-950/55 p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22 }}
            >
              <div className="text-xs font-bold tracking-[0.2em] text-purple-300">
                {active.label}
              </div>
              <h4 className="mt-3 text-xl font-semibold text-white">
                {active.title}
              </h4>
              <p className="mt-3 w-full text-sm leading-7 text-slate-300">
                {active.text}
              </p>
              <ModelSlideGraphic
                slide={slide}
                lang={lang}
                formula={t.formula}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <aside className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              {lang === "zh" ? "四步心智模型" : "Four-step mental model"}
            </div>
            <div className="animate-pulse text-xs font-semibold text-purple-300">
              {lang === "zh" ? "点击步骤探索" : "Click to explore"}{" "}
              <ChevronRight className="inline h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {slides.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setSlide(index)}
                className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${index === slide ? "border-purple-500/40 bg-purple-500/10 text-purple-100" : "border-slate-800 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"}`}
              >
                <span className="mr-2 font-mono text-xs text-purple-300">
                  0{index + 1}
                </span>
                {item.title}
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={previous}
              aria-label={lang === "zh" ? "上一张卡片" : "Previous card"}
              className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-purple-500/40 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {slides.map((item, index) => (
                <span
                  key={item.label}
                  className={`h-1.5 rounded-full transition-all ${index === slide ? "w-6 bg-purple-400" : "w-1.5 bg-slate-700"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label={lang === "zh" ? "下一张卡片" : "Next card"}
              className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-purple-500/40 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {t.modelPoints.map((point: string) => (
          <div
            key={point}
            className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelSlideGraphic({
  slide,
  lang,
  formula,
}: {
  slide: number;
  lang: Lang;
  formula: string;
}) {
  const columns = [
    [14, 32, 50, 68, 86],
    [8, 20, 32, 44, 56, 68, 80, 92],
    [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
    [8, 20, 32, 44, 56, 68, 80, 92],
    [14, 32, 50, 68, 86],
  ];
  if (slide === 0)
    return (
      <div className="relative mt-5 h-40 overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-900/70">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {columns
            .slice(0, -1)
            .flatMap((column, index) =>
              column.flatMap((y) =>
                columns[index + 1].map((target) => (
                  <line
                    key={`${index}-${y}-${target}`}
                    x1={[8, 28, 50, 72][index]}
                    y1={y}
                    x2={[28, 50, 72, 92][index]}
                    y2={target}
                    stroke="#a855f7"
                    strokeOpacity={index === 1 ? "0.18" : "0.12"}
                    strokeWidth="0.25"
                  />
                )),
              ),
            )}
          {columns.flatMap((column, index) =>
            column.map((y) => (
              <circle
                key={`${index}-${y}`}
                cx={[8, 28, 50, 72, 92][index]}
                cy={y}
                r={index === 2 ? "1.45" : "1.8"}
                fill={index === 2 ? "#d8b4fe" : "#8b5cf6"}
              />
            )),
          )}
        </svg>
        <div className="absolute bottom-2 left-[5%] text-[10px] font-mono text-purple-200">
          INPUT
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-purple-200">
          MANY HIDDEN LAYERS
        </div>
        <div className="absolute bottom-2 right-[4%] text-[10px] font-mono text-purple-200">
          OUTPUT
        </div>
      </div>
    );
  if (slide === 1)
    return (
      <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-950/15 p-4">
        <div className="grid gap-2 text-center text-xs font-semibold md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl bg-slate-900/70 p-3 text-slate-200">
            {lang === "zh" ? "给定原文" : "Show text"}
          </div>
          <span className="self-center text-amber-300">-&gt;</span>
          <div className="rounded-xl bg-slate-900/70 p-3 text-slate-200">
            {lang === "zh" ? "预测下一个 Token" : "Predict next token"}
          </div>
          <span className="self-center text-amber-300">-&gt;</span>
          <div className="rounded-xl bg-rose-500/10 p-3 text-rose-200">
            {lang === "zh" ? "和正确答案比较" : "Compare with target"}
          </div>
          <span className="self-center text-amber-300">-&gt;</span>
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-100">
            {lang === "zh" ? "微调全部连接权重" : "Adjust all weights"}
          </div>
        </div>
        <p className="mt-4 text-center text-xs leading-6 text-amber-100/80">
          {lang === "zh"
            ? "重复数十亿次：预测越接近正确答案，网络的连接权重就越合适。多头注意力是网络内部用于同时捕捉不同词语关系的一种机制。"
            : "Repeated billions of times: as predictions get closer to targets, the connection weights improve. Multi-head attention is one internal mechanism for capturing different token relationships at once."}
        </p>
      </div>
    );
  if (slide === 2)
    return (
      <div className="mt-5 rounded-2xl border border-purple-500/20 bg-slate-900/70 p-4">
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: 40 }, (_, index) => (
            <span
              key={index}
              className={`h-5 rounded-sm ${index % 7 === 0 ? "bg-purple-200" : index % 5 === 0 ? "bg-purple-400" : index % 3 === 0 ? "bg-purple-600" : "bg-purple-900"}`}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-purple-200">
          <span>W[12.4B x 12.4B]</span>
          <span>
            {lang === "zh"
              ? "格子颜色深浅 = 每个连接的权重不同"
              : "Color intensity = different connection weights"}
          </span>
          <span>{lang === "zh" ? "固定权重" : "FIXED WEIGHTS"}</span>
        </div>
      </div>
    );
  const context = lang === "zh" ? "巴黎是法国的" : "Paris is the";
  const chosen = lang === "zh" ? "首都" : "capital";
  const alternate = lang === "zh" ? "城市" : "city";
  return (
    <div className="mt-5">
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="text-xs font-bold tracking-[0.16em] text-slate-400">
            CONTEXT
          </div>
          <div className="mt-2 font-mono text-sm text-slate-200">
            “{context}”
          </div>
        </div>
        <div className="font-mono text-purple-300">-&gt; W -&gt;</div>
        <div className="rounded-2xl border border-purple-500/25 bg-purple-950/20 p-4">
          <div className="font-mono text-sm text-purple-100">{formula}</div>
          <div className="mt-2 space-y-1 font-mono text-xs">
            <div className="text-purple-100">
              P("{chosen}" | "{context}") = 82%
            </div>
            <div className="text-slate-400">
              P("{alternate}" | "{context}") = 11%
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-950/15 px-4 py-3 font-mono text-sm text-emerald-100">
        “{context}” + “{chosen}” = “{context}
        {chosen}”
      </div>
      <a
        href="#generation-example"
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
      >
        {lang === "zh" ? "见下方生成演示" : "See the generation example below"}
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function ProtocolPanel({
  lang,
  t,
  index,
}: {
  lang: Lang;
  t: any;
  index: number;
}) {
  const lines =
    lang === "zh"
      ? [
          [
            "CLIENT",
            "工具：weather.lookup；参数：city（字符串）、date（日期）",
            "Client 将可用工具和参数结构作为上下文提供给模型。",
          ],
          [
            "LLM",
            '{ "name": "weather.lookup", "arguments": { "city": "Shanghai", "date": "2026-07-16" } }',
            "模型生成的是符合结构约束的 token 序列，也就是调用意图。",
          ],
          [
            "CLIENT",
            "校验：工具许可 ✓  参数格式 ✓  用户确认：无需",
            "Client 决定是否接受、授权并执行。模型没有绕过这些边界的能力。",
          ],
          [
            "LLM",
            "根据工具返回，上海今天下午有短时阵雨，建议携带雨具。",
            "工具结果进入上下文后，模型才将外部事实组织成用户可读回复。",
          ],
        ]
      : [
          [
            "CLIENT",
            "Tool: weather.lookup; arguments: city (string), date (date)",
            "The Client provides available tools and their argument structures as context.",
          ],
          [
            "LLM",
            '{ "name": "weather.lookup", "arguments": { "city": "Shanghai", "date": "2026-07-16" } }',
            "The model produces a token sequence constrained into structured call intent.",
          ],
          [
            "CLIENT",
            "Validate: tool allowed ✓  arguments valid ✓  user confirmation: not required",
            "The Client decides whether to accept, authorize, and execute. The model cannot bypass these boundaries.",
          ],
          [
            "LLM",
            "The tool result indicates brief showers in Shanghai this afternoon. Bring an umbrella.",
            "Only after the tool result enters context does the model organize external facts into a user-facing answer.",
          ],
        ];
  const [actor, content, explanation] = lines[index];
  return (
    <div className="mt-5 grid gap-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 lg:grid-cols-[160px_minmax(0,1fr)]">
      <div
        className={`rounded-2xl border p-4 text-sm font-bold tracking-[0.18em] ${actor === "LLM" ? "border-purple-500/30 bg-purple-500/10 text-purple-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}
      >
        {actor === "LLM" ? t.model : t.client}
      </div>
      <div>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900/60 p-4 font-mono text-sm leading-7 text-slate-200">
          {content}
        </pre>
        <p className="mt-4 text-sm leading-7 text-slate-400">{explanation}</p>
      </div>
    </div>
  );
}
