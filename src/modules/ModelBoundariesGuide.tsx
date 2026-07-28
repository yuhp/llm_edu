import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Binary,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileSearch,
  FileText,
  Languages,
  Clock3,
  MapPinOff,
  MessageCircle,
  MonitorCog,
  Moon,
  Pause,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
  Wrench,
} from "lucide-react";
import { Lang } from "../types";

type Strategy = "answer" | "clarify" | "ground" | "verify" | "review";

const copy = {
  zh: {
    badge: "课程 03",
    title: "本课将回答六个问题",
    subtitle:
      "从下一个 Token 预测到 Tool Call，沿着这六个问题建立对模型能力、可靠性与行动边界的正确判断。",
    outcomes: [
      "模型（LLM）是什么？",
      "模型是怎样工作的？",
      "如何理解模型的能力？",
      "模型的短板是什么？",
      "应用中如何扬长避短？",
      "模型的输出是文字，为何可以调用工具？",
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
    dreamExampleTitle: "一个训练完成的 LLM，是什么状态",
    dreamExampleSubtitle: "一个没有身份、只有知识的梦境大脑",
    dreamExampleSteps: [
      "一个训练完成的 LLM，就如同一个处于梦境时刻的大脑。",
      "训练得到的知识以静态权重的形式停留在梦境的一个时刻点。",
      "把文字发给 LLM，就如同与梦境中的大脑对话；此时上下文不断追加，才有了对话中的时间流动。",
      "但这个 LLM / 大脑并不知道具体的现实世界背景，除非我们把当前材料、工具结果或其他上下文带进对话。",
    ],
    dreamTitle: "从梦境回到现实",
    dreamQuote: "注入背景上下文，其实等于把“大脑”从梦境拉回现实。",
    dreamText:
      "没有当前证据时，模型主要依据训练中学到的语言模式续写；提供当前、相关、可靠的材料后，它才能以真实任务的事实为锚点进行提取、归纳和组织。",
    dreamInteract: "尝试注入不同背景内容，观察回答如何变化。",
    dreamNote:
      "这是一个预设教学示例；不同大模型、提示词和生成参数可能产生不同输出结果。",
    evidence: "证据材料",
    role: "角色边界",
    rules: "输出规范",
    noEvidence: "无制度材料",
    withEvidence: "提供制度原文",
    generalRole: "泛用助手",
    analystRole: "制度分析助手",
    freeRules: "自由回答",
    strictRules: "仅依据材料；引用条款；未知明确不可确认；不得自行补全",
    dreamMode: "梦境模式",
    partialMode: "部分锚定模式",
    realityMode: "现实锚定模式",
    source: "事实锚点",
    noSource: "无当前来源",
    sourceValue: "《2026 全球差旅政策》第 4.2 条",
    task: "用户问题",
    taskValue: "伦敦出差的酒店报销上限是多少？",
    lesson: "课程结论",
    capabilityTitle: "不同任务，需要不同的使用方式",
    capabilityText:
      "应同时判断表达能力、证据边界和可靠性边界。可用结果取决于模型能力、任务表述、可用证据、输出约束与验证机制。",
    selectTask: "选择一个任务，判断产品应如何响应",
    shortfallsTitle: "大模型先天短板有哪些？",
    shortfallsText:
      "幻觉只是其中一种表现：模型的目标是生成“最像合理续写”的 Token，而不是在每句话前完成事实验证。因此，它可以写出有条理的答案，却不天然保证有依据、读得全、理解得准、推得稳，或承担得起后果。",
    hallucinationSummaryTitle: "为什么模型会有幻觉输出？",
    hallucinationSummaryText:
      "幻觉不是模型故意“编造”，而是在缺少可靠约束时，仍要继续预测下一个 Token 的自然结果。四个短板会共同放大这种风险：没有当前依据时，它会用训练中的模式补全；计算或长推理不稳时，错误会被组织成连贯结论；任务含糊时，它可能先补错前提再继续回答；高风险场景中，即使答案看似专业，也没有责任机制阻止错误被直接采用。",
    hallucinationFormula:
      "缺少依据 / 约束 + 必须继续生成 = 看似合理但未被验证的输出",
    strengthsTitle: "大模型的独特优势",
    strengthsText:
      "LLM 没有人的经历、感官和现实位置，因此需要外部事实锚定；但参数化知识、数字化运行与可复制部署，也让它在某些任务上拥有远超个人工作方式的优势。以下是能力方向，不是对准确性、完整性或安全性的保证。",
    humanLimit: "人类的局限",
    modelAdvantage: "LLM 的优势",
    strengthBoundary: "使用边界",
    strengthsSummaryTitle: "大模型的优势",
    strengthsSummaryText:
      "LLM 是无我的（stripped of ego）：它没有固定的个人经历、欲望或情绪负担，因此能突破人类大脑的部分生理极限。系统可以为不同任务赋予不同身份（identity）和职责，使同一类智能以可复制、可并发且不知疲倦的方式参与工作。身份是系统设定的工作边界，不是模型真实拥有的自我。",
    strengthsMetaphor:
      "人类大脑是现实中的探险家，靠五感开荒；大模型是云端的知识沙盘：它没有体感、缺少现实锚点，也会产生幻觉；但在算力支持下，能以远超个人的速度完成跨学科重组，并复制为大量并发的智能协作者。",
    checksTitle: "四个可靠性检查",
    checksText: "在交付模型结果前，用这四个问题决定需要补充什么能力。",
    strategies: {
      answer: "直接回答",
      clarify: "追问澄清",
      ground: "依据材料回答",
      verify: "工具验证",
      review: "人工复核",
    },
    protocolTitle: "大模型如何调用工具？",
    protocolSubtitle:
      "指令也是一种语言；大模型会生成语言，就能产生调用工具的指令。",
    protocolText:
      "Tool Call 不代表模型可以直接使用工具，而是模型在工具定义和输出约束下生成的结构化调用意图，也就是生成一条指令：告知客户端该用什么参数调用什么工具。客户端负责解析指令、校验参数与当前会话权限；只有具备相关权限时，客户端才调用工具，并将工具输出回传给大模型。",
    protocolSteps: [
      "在对话上下文注入可用工具列表",
      "模型根据上下文，产生需要使用工具的意图，生成工具调用指令输出",
      "客户端校验权限与参数",
      "客户端回传工具结果并注入上下文",
      "LLM 根据工具输出，组织语言回答用户",
    ],
    nextStep: "下一步",
    client: "客户端",
    summaryTitle: "总结：如何正确理解和使用大模型？",
    summaryItems: [
      {
        title: "大模型是参数化的语言模型",
        text: "它不是实时知识库，也不是具备自我的大脑。",
      },
      {
        title: "大模型通过预测下一个 Token 生成内容",
        text: "流畅来自连续预测，不代表已经核验事实。",
      },
      {
        title: "它擅长语言、模式重组与规模化处理",
        text: "可跨领域、多语言、快速整理和并发服务。",
      },
      {
        title: "它天然缺少现实锚点与责任能力",
        text: "可能无依据补全，也不保证计算、推理和高风险判断可靠。",
      },
      {
        title: "应用要补足证据、规则、工具和人工责任",
        text: "不同任务应选择直接回答、澄清、依据材料、工具验证或人工复核。",
      },
      {
        title: "Tool Call 是语言生成的结构化指令",
        text: "模型提出调用意图；客户端负责解析、校验、授权、执行和回传结果。",
      },
    ],
    summaryPrinciple:
      "不要把大模型当作无所不知、能够自行行动的主体；把它视为强大的语言与模式引擎，并用上下文、工具、权限与人工责任把它接入现实。",
    model: "LLM",
  },
  en: {
    badge: "Course 03",
    title: "Six questions this course answers",
    subtitle:
      "From next-token prediction to Tool Calls, use these six questions to judge model capability, reliability, and action boundaries.",
    outcomes: [
      "What is an LLM?",
      "How does a model work?",
      "How should we understand a model's capabilities?",
      "What are a model's limitations?",
      "How do we use its strengths while managing its limits?",
      "If its output is text, how can a model call tools?",
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
    dreamExampleTitle: "What is the state of a trained LLM?",
    dreamExampleSubtitle:
      "A mind in a dream state: stripped of ego, possessing nothing but pure knowledge.",
    dreamExampleSteps: [
      "A trained LLM is like a brain at a moment inside a dream.",
      "What it learned in training remains as static weights, fixed at a moment in that dream.",
      "Sending text to an LLM is like talking with that dreaming brain: as context is appended, time begins to flow within the conversation.",
      "But the LLM / brain does not know the specific real-world background unless we bring current material, tool results, or other context into the conversation.",
    ],
    dreamTitle: "From dream to grounded reality",
    dreamQuote:
      "Injecting background context brings the “brain” back from a dream into reality.",
    dreamText:
      "Without current evidence, the model continues from patterns learned in training. Supplying current, relevant, and reliable material gives it facts to extract, compare, and organize for the real task.",
    dreamInteract:
      "Try adding different background context and observe how the answer changes.",
    dreamNote:
      "This is a preset teaching example. Different models, prompts, and generation parameters can produce different outputs.",
    evidence: "Evidence",
    role: "Role boundary",
    rules: "Output rules",
    noEvidence: "No policy material",
    withEvidence: "Provide policy text",
    generalRole: "General assistant",
    analystRole: "Policy analyst",
    freeRules: "Free response",
    strictRules:
      "Use supplied material only; cite clauses; mark unknowns unconfirmed; do not fill gaps",
    dreamMode: "Dream mode",
    partialMode: "Partially grounded mode",
    realityMode: "Grounded reality",
    source: "Fact anchor",
    noSource: "No current source",
    sourceValue: "2026 Global Travel Policy, clause 4.2",
    task: "User question",
    taskValue:
      "What is the hotel reimbursement limit for a business trip to London?",
    lesson: "Lesson",
    capabilityTitle: "Different tasks need different ways of using a model",
    capabilityText:
      "Judge expression ability, evidence boundaries, and reliability together. Useful results depend on the model, task framing, available evidence, output constraints, and verification.",
    selectTask: "Choose a task to decide the right product response",
    shortfallsTitle: "What are the inherent limits of LLMs?",
    shortfallsText:
      "Hallucination is only one expression of the problem: a model is optimized for the most plausible token continuation, not for fact-checking every sentence. It can produce a well-organized answer without guaranteeing evidence, complete reading, correct understanding, reliable reasoning, or responsibility for consequences.",
    hallucinationSummaryTitle: "Why do models produce hallucinations?",
    hallucinationSummaryText:
      "Hallucination is not the model deliberately “making things up.” When reliable constraints are missing, it is the natural result of still having to predict the next token. The four limits amplify the risk together: without current evidence, it fills gaps with learned patterns; unstable calculation or long reasoning can turn errors into coherent conclusions; an ambiguous task can lead it to fill in the wrong assumptions first; and in high-risk settings, no accountability mechanism prevents a plausible answer from being adopted directly.",
    hallucinationFormula:
      "Missing evidence / constraints + required continuation = plausible but unverified output",
    strengthsTitle: "Distinct advantages of LLMs",
    strengthsText:
      "An LLM has none of a person's lived experience, senses, or real-world position, so it needs external factual grounding. But parameterized knowledge, digital operation, and reproducible deployment also give it advantages far beyond an individual's way of working on some tasks. These are capability directions, not guarantees of accuracy, completeness, or safety.",
    humanLimit: "Human limit",
    modelAdvantage: "LLM advantage",
    strengthBoundary: "Use boundary",
    strengthsSummaryTitle: "The advantage of large models",
    strengthsSummaryText:
      "An LLM is stripped of ego: it has no fixed personal history, desires, or emotional burden, which lets it exceed some biological limits of the human brain. A system can assign different identities and responsibilities to the same kind of intelligence for different tasks, allowing it to work in replicable, concurrent, and tireless ways. An identity is a system-defined work boundary, not a self the model truly possesses.",
    strengthsMetaphor:
      "The human brain is an explorer in reality, opening paths through the senses; an LLM is a cloud-based knowledge sandbox. It has no bodily sensation, lacks a real-world anchor, and can hallucinate. Yet with sufficient compute, it can reorganize knowledge across disciplines far faster than an individual and be replicated into many concurrent intelligent collaborators.",
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
    protocolTitle: "How do LLMs call tools?",
    protocolSubtitle:
      "An instruction is also language. Because an LLM generates language, it can generate instructions for calling tools.",
    protocolText:
      "A Tool Call does not mean the model can use a tool directly. Under tool definitions and output constraints, the model generates structured call intent: an instruction telling the Client which tool to call with which arguments. The Client parses that instruction and validates its arguments and the current session's permissions. Only when authorized does the Client call the tool and return its output to the model.",
    protocolSteps: [
      "Inject the available tool list into the conversation context",
      "From context, the model forms an intent to use a tool and generates a tool-call instruction",
      "Client validates permission and arguments",
      "Client returns the tool result and injects it into context",
      "The LLM turns the tool output into a user-facing answer",
    ],
    nextStep: "Next step",
    client: "CLIENT",
    summaryTitle: "Summary: how should we understand and use LLMs?",
    summaryItems: [
      {
        title: "An LLM is a parameterized language model",
        text: "It is neither a live knowledge base nor a brain with a self.",
      },
      {
        title: "An LLM generates content by predicting the next token",
        text: "Fluency comes from repeated prediction, not from verified facts.",
      },
      {
        title: "It excels at language, pattern recombination, and scale",
        text: "It can work across domains and languages, organize text quickly, and serve concurrently.",
      },
      {
        title: "It lacks a real-world anchor and accountable responsibility",
        text: "It can fill gaps without evidence and cannot guarantee reliable calculation, reasoning, or high-risk judgment.",
      },
      {
        title:
          "Applications must add evidence, rules, tools, and human responsibility",
        text: "Choose direct answers, clarification, grounded answers, tool verification, or human review for each task.",
      },
      {
        title: "A Tool Call is a structured instruction generated as language",
        text: "The model proposes the call; the Client parses, validates, authorizes, executes, and returns the result.",
      },
    ],
    summaryPrinciple:
      "Do not treat an LLM as an all-knowing agent that can act on its own. Treat it as a powerful language and pattern engine, then connect it to reality through context, tools, permissions, and human responsibility.",
    model: "LLM",
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
      injected: "《会议记录》全文，或会议记录电子文件的路径地址。",
      strategy: "answer" as Strategy,
      evidence: "以完整会议记录为事实边界。",
      risk: "遗漏、错误归因或将推断说成事实。",
      action: "直接回答，并标明结论来自会议记录。",
    },
    {
      title: "查询今天的天气",
      desc: "上海今天下午是否下雨？",
      injected:
        "工具：weather.lookup\n查询参数：city=Shanghai；date=today；time=afternoon",
      strategy: "verify" as Strategy,
      evidence: "需要当前天气服务或可靠实时数据。",
      risk: "训练知识无法保证今天的状态。",
      action: "调用实时天气工具后再回答。",
    },
    {
      title: "分析两份制度",
      desc: "比较新旧报销制度的变化。",
      injected:
        "《旧版报销制度》全文与《新版报销制度》全文，或两个制度电子文件的路径地址。",
      strategy: "ground" as Strategy,
      evidence: "需要两份完整、明确版本的原文。",
      risk: "遗漏条款、版本混淆或补充常识。",
      action: "依据材料回答，引用条款并标记待确认项。",
    },
    {
      title: "处理客户问题",
      desc: "“帮我处理一下这个客户问题”。",
      injected:
        "人设：客服经理\n问答规范：先澄清目标、背景、权限与期望动作；不得擅自承诺。\n相关制度：客服处理规范电子文件的路径地址。",
      strategy: "clarify" as Strategy,
      evidence: "需要客户、目标、权限和期望结果。",
      risk: "模型擅自假定范围并采取错误方向。",
      action: "先追问目标、背景和约束。",
    },
    {
      title: "精确金额计算",
      desc: "三笔订单九折后，含 6% 税费的总金额是多少？",
      injected:
        "人设：数据分析师\n可用工具：calculator、spreadsheet、python.execute\n要求：最终数值须由工具计算，并保留公式、输入与舍入规则。",
      strategy: "verify" as Strategy,
      evidence: "需要完整金额、币种、税率、适用顺序和舍入规则。",
      risk: "漏项、顺序错误、小数精度或舍入不一致会让数值不可审计。",
      action: "由计算器、代码、表格或财务系统计算，再由模型解释口径。",
    },
    {
      title: "医疗结论",
      desc: "根据症状判断应该服用什么药。",
      injected:
        "人设：严谨的问诊人员\n问答策略：收集年龄、病史、过敏、正在用药、症状与检查结果；不得提供处方结论。\n转人工机制：出现紧急症状、诊断或用药建议时，立即转交合格医疗人员。",
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
      injected:
        "The complete Meeting Notes document, or the path to its electronic file.",
      strategy: "answer" as Strategy,
      evidence: "Use the complete meeting notes as the factual boundary.",
      risk: "Omission, wrong attribution, or presenting inference as fact.",
      action: "Answer directly and identify the notes as the source.",
    },
    {
      title: "Check today’s weather",
      desc: "Will it rain in Shanghai this afternoon?",
      injected:
        "Tool: weather.lookup\nQuery parameters: city=Shanghai; date=today; time=afternoon",
      strategy: "verify" as Strategy,
      evidence: "Current weather service or reliable live data is required.",
      risk: "Training knowledge cannot guarantee today’s conditions.",
      action: "Use a live weather tool before answering.",
    },
    {
      title: "Compare two policies",
      desc: "Compare changes in old and new expense policies.",
      injected:
        "The complete old and new expense policy documents, or paths to both electronic files.",
      strategy: "ground" as Strategy,
      evidence: "Both complete, clearly versioned policy texts are required.",
      risk: "Missing clauses, version confusion, or added assumptions.",
      action: "Answer from material, cite clauses, and flag open questions.",
    },
    {
      title: "Handle a client issue",
      desc: "“Help me handle this client issue.”",
      injected:
        "Persona: customer service manager\nResponse rules: clarify the goal, background, authority, and desired action first; do not make unauthorized commitments.\nRelated policy: path to the customer-service handling policy file.",
      strategy: "clarify" as Strategy,
      evidence: "Client, goal, authority, and desired outcome are needed.",
      risk: "The model may assume scope and move in the wrong direction.",
      action: "Clarify the goal, background, and constraints first.",
    },
    {
      title: "Precise amount calculation",
      desc: "What is the total for three orders after 10% discount and 6% tax?",
      injected:
        "Persona: data analyst\nAvailable tools: calculator, spreadsheet, python.execute\nRequirement: a tool must calculate the final number and retain formulas, inputs, and rounding rules.",
      strategy: "verify" as Strategy,
      evidence:
        "Complete amounts, currency, tax rate, order of operations, and rounding rules are required.",
      risk: "Missing inputs, wrong ordering, decimal precision, or inconsistent rounding makes the number unauditable.",
      action:
        "Calculate with a calculator, code, spreadsheet, or finance system; let the model explain the method.",
    },
    {
      title: "Medical conclusion",
      desc: "Recommend medicine from symptoms.",
      injected:
        "Persona: rigorous intake specialist\nResponse strategy: collect age, history, allergies, current medication, symptoms, and test results; do not give prescription conclusions.\nHuman-handoff trigger: immediately route urgent symptoms, diagnosis, or medication recommendations to qualified medical staff.",
      strategy: "review" as Strategy,
      evidence:
        "Complete clinical facts and qualified professional judgment are needed.",
      risk: "High-risk errors can directly harm a user.",
      action:
        "At most organize general information; route to professional review.",
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
      title: "无法保证事实依据",
      detail:
        "模型优化的是合理续写，不会在生成前自动检索当前来源或逐句核验事实；训练知识也可能陈旧、不完整。",
      remedy: "上下文、来源、实时工具",
      icon: <FileText className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "精确计算与复杂推理不稳定",
      detail:
        "多步计算、长推理链和复杂条件组合容易累积错误；语言上流畅的推导不等于数值或逻辑正确。",
      remedy: "计算工具、任务拆解、结果校验",
      icon: <Binary className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "容易误解模糊任务",
      detail:
        "模型只能依据输入的文字推断目标、对象、范围、时间和权限；信息缺失时，它可能自行补全错误的任务前提。",
      remedy: "澄清、结构化输入、约束",
      icon: <BrainCircuit className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "不能承担高风险后果",
      detail:
        "模型没有专业执照、业务权限或责任主体；医疗、法律、财务与合规等结论一旦出错，影响可能直接落到用户身上。",
      remedy: "权限控制、人工复核、专业责任",
      icon: <ShieldCheck className="h-5 w-5" />,
      tone: "text-rose-300",
    },
  ],
  en: [
    {
      title: "Cannot guarantee factual grounding",
      detail:
        "A model is optimized for plausible continuation, not for retrieving current sources or fact-checking every sentence before it generates. Training knowledge can also be stale or incomplete.",
      remedy: "Context, sources, and live tools",
      icon: <FileText className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "Exact calculation and complex reasoning are unstable",
      detail:
        "Multi-step calculations, long reasoning chains, and complex conditions can accumulate errors. Fluent reasoning does not guarantee correct numbers or logic.",
      remedy: "Calculation tools, decomposition, and checks",
      icon: <Binary className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "Can misread ambiguous tasks",
      detail:
        "The model can only infer the goal, subject, scope, timing, and authority from supplied text. When information is missing, it may fill in the wrong task assumptions.",
      remedy: "Clarification, structured input, and constraints",
      icon: <BrainCircuit className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "Cannot bear high-risk consequences",
      detail:
        "A model has no professional license, business authority, or accountable responsibility. Errors in medical, legal, financial, or compliance conclusions can directly affect people.",
      remedy:
        "Permission controls, human review, and professional responsibility",
      icon: <ShieldCheck className="h-5 w-5" />,
      tone: "text-rose-300",
    },
  ],
};

const modelStrengths = {
  zh: [
    {
      title: "跨领域与多语言的知识广度",
      human: "人的时间、记忆和专业化程度有限，通常只能长期深耕少数领域与语言。",
      advantage:
        "同一个模型可在一次对话中切换学科、语言与表达风格，快速调取训练中形成的广泛语言模式。",
      note: "广度不等于事实最新或每一处都正确。",
      icon: <Languages className="h-5 w-5" />,
      tone: "text-violet-300",
    },
    {
      title: "不受疲劳影响的稳定处理",
      human: "人的注意力、情绪、睡眠和生理状态会影响连续工作的质量与速度。",
      advantage:
        "在同样的输入与系统条件下，模型可以持续处理重复、高频的文本任务，保持一致的交互形式。",
      note: "稳定输出不等于稳定正确，仍需质量控制。",
      icon: <Clock3 className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "跨界联想与模式重组",
      human: "跨越相距很远的知识领域，往往依赖长期经验、协作或偶然的灵感。",
      advantage:
        "模型能快速重组不同领域的语言与结构模式，适合发散、改写、类比、头脑风暴和多种方案探索。",
      note: "关联是生成的假设，不是已被验证的发现。",
      icon: <Sparkles className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "可复制的并发服务能力",
      human: "个人的时间与注意力不可复制，一次只能服务有限对象。",
      advantage:
        "在算力和系统允许时，同一模型可被部署为大量并发会话，为不同用户提供个性化语言交互。",
      note: "规模化服务仍受成本、延迟、权限与安全边界约束。",
      icon: <Copy className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "高速阅读、压缩与比较文本",
      human: "阅读长文、提炼重点和横向比较多份材料需要较长时间与持续注意力。",
      advantage:
        "配合合适的上下文窗口、检索与分块流程，模型可快速整理、摘要、分类和比较大批文本材料。",
      note: "长文本仍可能遗漏、混淆版本或错误归因。",
      icon: <FileSearch className="h-5 w-5" />,
      tone: "text-blue-300",
    },
  ],
  en: [
    {
      title: "Cross-domain and multilingual breadth",
      human:
        "Human time, memory, and specialization are limited; most people can sustain deep expertise in only a few fields and languages.",
      advantage:
        "One model can switch disciplines, languages, and writing styles within a conversation, quickly drawing on broad language patterns formed in training.",
      note: "Breadth does not mean every fact is current or correct.",
      icon: <Languages className="h-5 w-5" />,
      tone: "text-violet-300",
    },
    {
      title: "Processing without biological fatigue",
      human:
        "Attention, emotion, sleep, and physical condition affect the speed and quality of sustained human work.",
      advantage:
        "Under the same inputs and system conditions, a model can continuously handle repetitive, high-volume text tasks with a consistent interaction format.",
      note: "Consistent output does not mean consistently correct output.",
      icon: <Clock3 className="h-5 w-5" />,
      tone: "text-cyan-300",
    },
    {
      title: "Cross-domain association and pattern recombination",
      human:
        "Connecting distant fields often depends on long experience, collaboration, or rare moments of insight.",
      advantage:
        "A model can rapidly recombine language and structural patterns from different fields, which helps with ideation, rewriting, analogy, brainstorming, and exploring alternatives.",
      note: "Generated associations are hypotheses, not verified discoveries.",
      icon: <Sparkles className="h-5 w-5" />,
      tone: "text-amber-300",
    },
    {
      title: "Replicable, concurrent service",
      human:
        "A person's time and attention cannot be copied, so one person can serve only a limited number of people at once.",
      advantage:
        "When compute and systems allow, the same model can run in many concurrent sessions and provide personalized language interaction for different users.",
      note: "Scale remains bounded by cost, latency, permissions, and safety controls.",
      icon: <Copy className="h-5 w-5" />,
      tone: "text-emerald-300",
    },
    {
      title: "Fast text reading, compression, and comparison",
      human:
        "Reading long documents, extracting key points, and comparing many sources requires time and sustained attention.",
      advantage:
        "With an appropriate context window, retrieval, and chunking workflow, a model can rapidly organize, summarize, classify, and compare large collections of text.",
      note: "Long text can still be omitted, version-confused, or misattributed.",
      icon: <FileSearch className="h-5 w-5" />,
      tone: "text-blue-300",
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
  const groundingKey = `${evidence}-${role}-${rules}`;
  const groundingMode = grounded
    ? t.realityMode
    : evidence || role || rules
      ? t.partialMode
      : t.dreamMode;
  const groundingResponse =
    lang === "zh"
      ? evidence
        ? `${role ? "作为制度分析助手，" : ""}根据《2026 全球差旅政策》第 4.2 条，伦敦出差的酒店报销上限为 250 英镑/晚。${rules ? "此结论来自提供的当前政策；材料未说明的例外情形需另行确认。" : "建议再确认例外情形与适用条件。"}`
        : `${role ? "作为制度分析助手，" : ""}${rules ? "当前没有可核验的制度原文；按输出规范，应明确标记为无法确认。" : "伦敦市中心酒店通常可全额报销，建议按 500–1,000 英镑/晚预算，并优先选择五星级商务酒店。"}${role && !rules ? "需要提供现行政策后才能给出正式结论。" : ""}`
      : evidence
        ? `${role ? "As a policy analyst, " : ""}under clause 4.2 of the 2026 Global Travel Policy, the London hotel reimbursement limit is GBP 250 per night. ${rules ? "This conclusion is grounded in the supplied current policy; exceptions not stated in the material require confirmation." : "Confirm applicable exceptions and conditions."}`
        : `${role ? "As a policy analyst, " : ""}${rules ? "there is no verifiable policy text available; under the output rules, this must be marked as unconfirmed." : "Hotels in central London are usually fully reimbursable; budget GBP 500–1,000 per night and prioritize five-star business hotels."}${role && !rules ? " The current policy is required before giving a formal conclusion." : ""}`;

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

      <div className="overflow-hidden rounded-3xl border border-indigo-500/20 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_38%)] bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <BrainCircuit className="mt-1 h-6 w-6 shrink-0 text-indigo-300" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.dreamExampleTitle}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              {t.dreamExampleSubtitle}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.dreamExampleSteps.map((step: string, index: number) => (
            <div
              key={step}
              className={`relative overflow-hidden rounded-2xl border p-5 ${index === 3 ? "border-cyan-500/30 bg-cyan-950/15" : "border-indigo-500/20 bg-slate-950/45"}`}
            >
              <div
                className={`text-xs font-bold tracking-[0.2em] ${index === 3 ? "text-cyan-300" : "text-indigo-300"}`}
              >
                0{index + 1}
              </div>
              <DreamStepGraphic index={index} lang={lang} />
              <p className="mt-4 text-sm leading-7 text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.shortfallsTitle}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
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
              <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {lang === "zh" ? "为何如此" : "Why"}
              </div>
              <p className="mt-1 min-h-20 text-sm leading-6 text-slate-400">
                {check.detail}
              </p>
              <div
                className={`mt-4 border-t border-slate-800 pt-3 text-sm font-semibold ${check.tone}`}
              >
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {lang === "zh" ? "解决方案" : "Solution"}
                </div>
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
        <div className="mt-5 rounded-2xl border border-rose-500/25 bg-rose-950/15 p-5">
          <h4 className="font-semibold text-rose-100">
            {t.hallucinationSummaryTitle}
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {t.hallucinationSummaryText}
          </p>
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-slate-950/45 px-4 py-3 text-center font-mono text-sm text-rose-200">
            {t.hallucinationFormula}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-violet-500/20 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_38%)] bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Sparkles className="mt-1 h-6 w-6 shrink-0 text-violet-300" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.strengthsTitle}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              {t.strengthsText}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {modelStrengths[lang].map((strength) => (
            <div
              key={strength.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              <div className={`mb-3 ${strength.tone}`}>{strength.icon}</div>
              <h4 className="font-semibold leading-6 text-white">
                {strength.title}
              </h4>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {t.humanLimit}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {strength.human}
              </p>
              <div
                className={`mt-4 text-[10px] font-bold uppercase tracking-[0.18em] ${strength.tone}`}
              >
                {t.modelAdvantage}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-200">
                {strength.advantage}
              </p>
              <div className="mt-4 border-t border-slate-800 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {t.strengthBoundary}
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {strength.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-violet-500/25 bg-violet-950/15 p-5">
          <h4 className="font-semibold text-violet-100">
            {t.strengthsSummaryTitle}
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {t.strengthsSummaryText}
          </p>
          <div className="mt-4 border-t border-violet-500/20 pt-4 text-sm leading-7 text-slate-400">
            {t.strengthsMetaphor}
          </div>
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
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
          {t.dreamInteract}
          <ChevronRight className="h-4 w-4" />
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
                className={`mt-2 text-sm font-semibold leading-6 ${control.active ? "text-cyan-200" : "text-slate-300"}`}
              >
                {control.active ? control.on : control.off}
              </div>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={groundingKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-5 grid gap-4 rounded-3xl border p-5 md:grid-cols-[190px_minmax(0,1fr)] ${grounded ? "border-cyan-500/30 bg-cyan-950/20" : "border-rose-500/20 bg-rose-950/15"}`}
          >
            <div>
              <div
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${grounded ? "border-cyan-500/30 text-cyan-200" : "border-rose-500/30 text-rose-200"}`}
              >
                {groundingMode}
              </div>
              <div className="mt-4 text-sm text-slate-400">{t.source}</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {evidence ? t.sourceValue : t.noSource}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {t.task}
              </div>
              <p className="mt-2 text-sm text-slate-200">{t.taskValue}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {groundingResponse}{" "}
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
        <p className="mt-3 text-xs leading-5 text-slate-500">{t.dreamNote}</p>
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
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {taskCards[lang].map((item, index) => (
              <button
                key={item.title}
                onClick={() => setTaskIndex(index)}
                className={`min-h-32 rounded-2xl border p-4 text-left transition ${index === taskIndex ? "border-amber-500/40 bg-amber-500/10" : "border-slate-800 bg-slate-950/50 hover:bg-slate-800/70"}`}
              >
                <div
                  className={`text-xs font-bold tracking-[0.18em] ${index === taskIndex ? "text-amber-300" : "text-slate-500"}`}
                >
                  0{index + 1}
                </div>
                <div className="mt-2 font-semibold text-white">
                  {item.title}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {lang === "zh" ? "要求：" : "Requirement: "}
                  </span>
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTask.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl border border-amber-500/25 bg-amber-950/10 p-5"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                {lang === "zh" ? "结论：" : "Conclusion:"}
              </div>
              <h4 className="mt-3 text-lg font-semibold text-white">
                {activeTask.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                <span className="font-semibold text-slate-300">
                  {lang === "zh" ? "要求：" : "Requirement: "}
                </span>
                {activeTask.desc}
              </p>
              <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  {lang === "zh" ? "注入内容" : "Injected content"}
                </div>
                <p className="mt-2 whitespace-pre-wrap font-mono text-xs leading-6 text-cyan-100/85">
                  {activeTask.injected}
                </p>
              </div>
              <div className="mt-5 border-t border-slate-800 pt-4">
                <InfoBlock
                  label={lang === "zh" ? "需要的依据" : "Evidence needed"}
                  value={activeTask.evidence}
                />
              </div>
              <div className="mt-4">
                <InfoBlock
                  label={lang === "zh" ? "主要风险" : "Primary risk"}
                  value={activeTask.risk}
                />
              </div>
              <div className="mt-4 border-t border-slate-800 pt-4">
                <InfoBlock
                  label={
                    lang === "zh" ? "推荐使用方式" : "Recommended approach"
                  }
                  value={activeTask.action}
                  tone={strategyTone[activeTask.strategy]}
                  badge={t.strategies[activeTask.strategy]}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-500/20 bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <Wrench className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {t.protocolTitle}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-7 text-amber-100">
              {t.protocolSubtitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {t.protocolText}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-5">
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

      <div className="rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_42%)] bg-slate-900/55 p-6 md:p-8">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-purple-300" />
          <h3 className="text-xl font-semibold text-white">{t.summaryTitle}</h3>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.summaryItems.map(
            (item: { title: string; text: string }, index: number) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="text-xs font-bold tracking-[0.18em] text-purple-300">
                  0{index + 1}
                </div>
                <h4 className="mt-2 font-semibold leading-6 text-white">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ),
          )}
        </div>
        <div className="mt-6 rounded-2xl border border-purple-500/25 bg-purple-950/15 p-5 text-sm leading-7 text-purple-100">
          {t.summaryPrinciple}
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

function DreamStepGraphic({ index, lang }: { index: number; lang: Lang }) {
  if (index === 0) {
    return (
      <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-950/20">
        <div className="absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center">
          <div className="rounded-full border border-indigo-300/40 bg-indigo-400/10 p-3 text-indigo-100 shadow-[0_0_24px_rgba(129,140,248,0.25)]">
            <BrainCircuit className="h-8 w-8" />
          </div>
          <span className="mt-1 font-mono text-[10px] tracking-[0.18em] text-indigo-200">
            DREAM STATE
          </span>
        </div>
        <Moon className="absolute right-5 top-3 h-6 w-6 text-indigo-300/80" />
        <span className="absolute left-6 top-5 h-1.5 w-1.5 rounded-full bg-indigo-200/60" />
        <span className="absolute bottom-5 right-12 h-1 w-1 rounded-full bg-indigo-200/50" />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-indigo-500/20 bg-slate-950/60 p-4">
        <div className="grid grid-cols-8 gap-1 opacity-55">
          {Array.from({ length: 32 }, (_, itemIndex) => (
            <span
              key={itemIndex}
              className={`h-3 rounded-sm ${itemIndex % 7 === 0 ? "bg-indigo-300" : itemIndex % 4 === 0 ? "bg-indigo-600" : "bg-indigo-900"}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-300/50 bg-slate-950/90 text-indigo-100 shadow-[0_0_18px_rgba(129,140,248,0.25)]">
            <Pause className="h-5 w-5" />
          </div>
        </div>
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-indigo-200">
          <span>t = 0</span>
          <span>
            {lang === "zh"
              ? "权重冻结在训练终点"
              : "WEIGHTS FROZEN AT TRAINING END"}
          </span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-cyan-500/25 bg-slate-950/60">
        <div className="absolute left-4 top-5 rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-2 text-indigo-100">
          <MessageCircle className="h-6 w-6" />
        </div>
        <div className="absolute left-[39%] top-7 flex items-center gap-1 text-cyan-200">
          <span className="h-2 w-2 animate-ping rounded-full bg-cyan-300" />
          <Zap className="h-5 w-5 fill-cyan-300/20" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
        </div>
        <div className="absolute right-4 top-5 rounded-full border border-cyan-300/40 bg-cyan-400/10 p-2 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.3)]">
          <Clock3 className="h-6 w-6" />
        </div>
        <div className="absolute bottom-3 left-4 right-4 h-1 rounded-full bg-indigo-950">
          <div className="h-full w-full animate-pulse rounded-full bg-cyan-400/80" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-cyan-500/25 bg-slate-950/75">
      <div className="absolute left-4 top-4 h-16 w-16 rounded-full border border-dashed border-cyan-400/35" />
      <div className="absolute left-[27px] top-[27px] rounded-full border border-cyan-400/30 bg-cyan-950/60 p-2 text-cyan-200">
        <MapPinOff className="h-6 w-6" />
      </div>
      <div className="absolute left-24 right-4 top-1/2 border-t border-dashed border-slate-600" />
      <span className="absolute left-[46%] top-[38%] bg-slate-950 px-1 font-mono text-xs text-rose-300">
        ×
      </span>
      <div className="absolute right-4 top-5 text-right font-mono text-[10px] leading-5 text-slate-500">
        REAL WORLD
        <br />
        {lang === "zh" ? "信号未接入" : "SIGNAL UNREACHABLE"}
      </div>
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
            "客户端",
            `{
  "name": "weather.lookup",
  "description": "查询指定城市与日期的天气",
  "parameters": {
    "city": { "type": "string", "description": "城市名称" },
    "date": { "type": "string", "format": "date", "description": "查询日期" }
  },
  "required": ["city", "date"],
  "permission": "weather:read"
}`,
            "客户端将工具元数据注入上下文：名称告诉模型能调用什么，描述说明何时使用，参数 schema 约束字段与格式；权限提示不授予模型权限，而是供客户端后续校验。",
          ],
          [
            "LLM",
            '{ "name": "weather.lookup", "arguments": { "city": "Shanghai", "date": "2026-07-16" } }',
            "模型生成的是符合结构约束的 token 序列，也就是调用意图。",
          ],
          [
            "客户端",
            "校验：工具许可 ✓  参数格式 ✓  用户确认：无需",
            "客户端决定是否接受、授权并执行。模型没有绕过这些边界的能力。",
          ],
          [
            "客户端",
            `{
  "city": "Shanghai",
  "date": "2026-07-16",
  "forecast": "brief_showers",
  "precipitation_probability": 70,
  "temperature_celsius": { "min": 25, "max": 28 }
}`,
            "客户端接收 weather.lookup 的结构化输出，并将它作为新的上下文回传给模型。",
          ],
          [
            "LLM",
            "上海今天下午有短时阵雨，气温 25–28°C，建议携带雨具。",
            "模型依据工具返回的外部事实组织自然语言回答；它没有自行查询天气或绕过客户端执行工具。",
          ],
        ]
      : [
          [
            "CLIENT",
            `{
  "name": "weather.lookup",
  "description": "Look up weather for a city and date",
  "parameters": {
    "city": { "type": "string", "description": "City name" },
    "date": { "type": "string", "format": "date", "description": "Date to query" }
  },
  "required": ["city", "date"],
  "permission": "weather:read"
}`,
            "The Client injects tool metadata into context: the name tells the model what it can call, the description explains when to use it, and the parameter schema constrains fields and formats. A permission hint does not grant the model permission; the Client validates it later.",
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
            "CLIENT",
            `{
  "city": "Shanghai",
  "date": "2026-07-16",
  "forecast": "brief_showers",
  "precipitation_probability": 70,
  "temperature_celsius": { "min": 25, "max": 28 }
}`,
            "The Client receives weather.lookup's structured output and returns it to the model as new context.",
          ],
          [
            "LLM",
            "Brief showers are expected in Shanghai this afternoon, with temperatures of 25–28°C. Bring an umbrella.",
            "The model turns external facts from the tool output into a natural-language reply. It did not look up weather itself or bypass the Client to execute the tool.",
          ],
        ];
  const [actor, content, explanation] = lines[index];
  return (
    <div className="mt-5 grid gap-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 lg:grid-cols-[160px_minmax(0,1fr)]">
      <div
        aria-label={actor === "LLM" ? t.model : t.client}
        title={actor === "LLM" ? t.model : t.client}
        className={`flex min-h-20 items-center justify-center rounded-2xl border p-4 ${actor === "LLM" ? "border-purple-500/30 bg-purple-500/10 text-purple-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}
      >
        {actor === "LLM" ? (
          <BrainCircuit className="h-9 w-9" aria-hidden="true" />
        ) : (
          <MonitorCog className="h-9 w-9" aria-hidden="true" />
        )}
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
