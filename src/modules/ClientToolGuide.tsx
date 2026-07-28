import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  Layers,
  Monitor,
  PlayCircle,
  Shield,
  TerminalSquare,
  User,
  Wrench,
} from "lucide-react";
import { Lang } from "../types";

const copy = {
  zh: {
    title: "模型如何接入现实世界？",
    subtitle:
      "理解客户端如何组织上下文、注入角色与技能、校验工具调用，并将执行结果带回模型。",
    compareTitle: "LLM 与 Client 的边界",
    compareDesc:
      "大模型更像大脑，Client 更像身体与操作系统入口。二者协作，才会形成可执行的智能体产品。",
    llmTitle: "LLM（大模型）",
    llmIntro: "超大规模语言生成神经网络，是被海量语料训练出来的“语言大脑”。",
    llmPoints: [
      "训练时装载海量知识、语言模式与推理习惯",
      "通过自然语言理解、生成、归纳和规划",
      "训练结束后参数基本固定，知识与能力相对静态",
    ],
    clientTitle: "Client（客户端 / 引擎）",
    clientIntro: "连接用户与 LLM 的计算机程序，是模型对外交互的运行环境。",
    clientPoints: [
      "作为 LLM 的“感官与表达系统”，接收用户输入并呈现模型输出",
      "维护会话上下文，注入 Agent 人设、技能描述和历史记录",
      "在用户允许的前提下注入工具列表并执行工具调用，充当模型的“手脚”",
    ],
    loopTitle: "一个标准 Agentic Loop",
    loopIntro: "用户、Client 与 LLM 之间形成的任务推进闭环。",
    loopSteps: [
      "用户提出目标，Client 组装上下文并发送给 LLM",
      "LLM 判断下一步：继续对话、补充信息或提出工具调用",
      "Client 执行被允许的工具，并回填结果、日志与状态",
      "多轮循环后，LLM 汇总信息并交付最终结果",
    ],
    skillTitle: "Agent 与 Skill 解耦",
    skillDesc:
      "Agent 定义角色与行为方式，Skill 只在任务需要时按需加载，避免上下文污染。",
    skillCards: [
      { title: "Agent", desc: "岗位、人设、工作原则，决定“像谁一样工作”。" },
      {
        title: "Skill",
        desc: "领域知识、工具约束、执行规范，决定“如何正确做事”。",
      },
      {
        title: "Client",
        desc: "把 Agent 与 Skill 组装成一次具体的可执行请求。",
      },
    ],
    skillDemoTitle: "课程演示：Skill 如何按需注入",
    skillDemoSteps: [
      {
        title: "注入 Agent 人设",
        desc: "Client 先注入 Agent 的系统身份，让模型知道自己要以什么角色工作。",
        client: "注入 System Prompt: 资深前端工程师 Agent",
        llm: "收到角色设定，准备开始理解任务",
        action: "系统指令进入上下文",
      },
      {
        title: "提供技能列表与描述",
        desc: "为了避免上下文污染，Client 先提供 Skills 的名称与用途描述，让模型知道每个技能适合解决什么问题。",
        client: "可用 Skills: frontend-design, firebase, analytics...",
        llm: "根据技能描述判断任务需要哪项能力",
        action: "发送轻量技能索引",
      },
      {
        title: "模型主动请求 Skill",
        desc: "当模型判断任务需要某项能力时，才会触发读取 Skill 文档。",
        client: "拦截工具调用，准备读取 frontend-design/SKILL.md",
        llm: "Tool Call: read skill doc for frontend-design",
        action: "触发按需加载",
      },
      {
        title: "生成内容/指令",
        desc: "Client 将 Skill 细则返回给模型，模型再基于规范执行高质量输出。",
        client: "返回详细规范：设计原则、交互标准、响应式要求",
        llm: "按 Skill 定义的行为生成文字/工具调用",
        action: "完成技能注入并开始执行",
      },
    ],
    orchestrationTitle: "课程主线：驱动与编排流程",
    orchestrationSteps: [
      {
        title: "意图识别",
        desc: "从用户目标中判断任务边界、上下文需求与风险。",
      },
      {
        title: "角色激活",
        desc: "注入 Agent 人设，让模型以稳定身份思考和输出。",
      },
      {
        title: "技能检查",
        desc: "仅向模型暴露技能索引，必要时再读取完整 Skill 规范。",
      },
      { title: "工具执行", desc: "Client 负责 Shell、API、MCP 等真实调用。" },
      {
        title: "观测闭环",
        desc: "把结果、日志与状态再注回模型，推进下一步决策。",
      },
    ],
    toolTitle: "三类常见 Tool Call",
    toolCards: [
      {
        title: "Built-in Tools",
        desc: "读写工作区、搜索代码、提问澄清等内建能力，调用成本最低。",
        icon: "bot",
      },
      {
        title: "Shell / Runtime",
        desc: "运行命令、构建项目、执行测试，最贴近真实工程现场。",
        icon: "terminal",
      },
      {
        title: "MCP / Remote APIs",
        desc: "连接外部平台与服务，把模型能力延伸到团队系统。",
        icon: "network",
      },
    ],
    scenarioTitle: "课程案例：执行流演示",
    scenarioSteps: [
      "USER: 请通过地图工具，查询上海虹桥机场到和平饭店的路线。",
      "CLIENT: 注入 Agent 人设、skill list、tools list 与 user prompt，然后把完整上下文发送给 LLM。",
      "LLM: 判断任务需要地图查询能力，先输出读取 map-search Skill 的意图。",
      "CLIENT: 读取 map-search Skill 文档并返回给 LLM，补充路线查询规则、字段约束与参数格式。",
      "LLM: 基于 Skill 规范生成地图工具的 tool call 命令与参数。",
      "CLIENT: 使用参数执行地图工具，并把起点、终点、候选路线与结构化结果返回给 LLM。",
      "LLM: 判断返回数据足以完成用户请求，整理成面向用户的路线说明。",
      "CLIENT: 确认 LLM 已结束输出且没有下一步动作，将最终回答返回给用户；可观测中间步骤、工具调用记录与简要推理摘要可按产品策略选择性展示。",
    ],
    quizTitle: "课程测验",
    quizItems: [
      {
        q: "为什么说训练完成后的 LLM 是相对静态的“大脑”？",
        a: "因为模型训练结束后，参数通常不会在普通对话中自动更新。它已经内化了训练阶段获得的知识、语言模式和推理习惯，但不会天然知道训练后的最新信息，也不会自动获得新的执行能力。新的信息和能力通常需要由 Client 通过上下文、RAG、Skill 或 Tool Call 注入。",
      },
      {
        q: "为什么 Client 提供 Skills 时不能只给技能名称，还要给用途描述？",
        a: "因为模型需要根据技能描述判断某个 Skill 是否适合当前任务。如果只给名称，模型可能无法准确理解技能能力边界，容易选错技能或请求无关 Skill。简短描述可以在不污染上下文的前提下，帮助模型完成能力匹配。",
      },
      {
        q: "为什么说 Client 是 LLM 的“感官、表达系统和手脚”？",
        a: "因为 LLM 本身只处理上下文并生成输出，不直接接触用户界面、文件系统、网络或外部 API。Client 接收用户输入、组织上下文、呈现模型输出，并在用户授权和安全策略允许时执行工具调用，因此它同时承担输入、输出和行动能力。",
      },
      {
        q: "为什么 Tool Call 不能由 LLM 自己直接执行？",
        a: "因为 LLM 只产生意图，真正与文件、命令行、网络交互的是受控 Client。",
      },
      {
        q: "为什么要把 Agent 和 Skill 分开？",
        a: "因为角色设定与领域规则是两类不同资产，解耦后更容易复用、治理与按需加载。",
      },
      {
        q: "大模型是否能直接拥有 rm -rf 等毁灭性操作的能力？",
        a: "大模型本身无法执行命令。它只能生成调用意图，真正的执行能力由 Client 通过 Shell、文件操作或外部 API 等 Tool Call 授予。因此，沙箱隔离、权限控制和不可逆操作的二次确认应由 Client 负责。",
      },
    ],
    next: "下一步",
    done: "已完成",
    question: "问题",
    answer: "答案",
    flip: "点击翻面",
  },
  en: {
    title: "How does a model connect to the real world?",
    subtitle:
      "Learn how the Client organizes context, injects roles and skills, validates tool calls, and returns execution results to the model.",
    compareTitle: "Boundary Between LLM and Client",
    compareDesc:
      "The model behaves like the brain, while the client behaves like the body and the system interface. Only together do they become an executable agent product.",
    llmTitle: "LLM (Model)",
    llmIntro:
      "A massive language-generation neural network, trained as a “language brain” over large-scale data.",
    llmPoints: [
      "Training loads broad knowledge, language patterns, and reasoning habits",
      "Communicates through natural language for understanding, generation, summarization, and planning",
      "After training, parameters are mostly fixed, so knowledge and capabilities are relatively static",
    ],
    clientTitle: "Client (Runtime / Engine)",
    clientIntro:
      "A computer program that connects users with the LLM and provides the runtime for interaction.",
    clientPoints: [
      "Acts as the model’s “senses and expression system” by receiving user input and presenting model output",
      "Maintains context and injects Agent persona, skill descriptions, and history",
      "With user permission, provides tool lists and executes tool calls as the model’s “hands and feet”",
    ],
    loopTitle: "A Standard Agentic Loop",
    loopIntro:
      "A task-driving loop formed among the user, the client, and the LLM.",
    loopSteps: [
      "The user states a goal, and the client assembles context for the LLM",
      "The LLM decides whether to continue, ask for information, or propose a tool call",
      "The client executes permitted tools and feeds back results, logs, and state",
      "After multiple rounds, the LLM synthesizes the information and delivers the result",
    ],
    skillTitle: "Decoupling Agent and Skill",
    skillDesc:
      "An Agent defines role and behavior, while Skills are loaded only when needed so the context stays clean.",
    skillCards: [
      {
        title: "Agent",
        desc: "The role, persona, and working style that answer “who is doing the work.”",
      },
      {
        title: "Skill",
        desc: "Domain knowledge, tool constraints, and rules that answer “how to do it correctly.”",
      },
      {
        title: "Client",
        desc: "The runtime that assembles Agent and Skill into an executable request.",
      },
    ],
    skillDemoTitle: "Course Demo: How Skills Are Injected On Demand",
    skillDemoSteps: [
      {
        title: "Inject Agent persona",
        desc: "The client injects the Agent identity first so the model knows which role it should work as.",
        client: "Inject System Prompt: senior frontend engineer agent",
        llm: "Persona received, ready to interpret the task",
        action: "System instruction enters context",
      },
      {
        title: "Provide skill list and descriptions",
        desc: "To avoid context bloat, the client first provides Skill names and purpose descriptions so the model understands what each Skill is for.",
        client: "Available skills: frontend-design, firebase, analytics...",
        llm: "Use skill descriptions to decide which capability the task needs",
        action: "Send lightweight skill index",
      },
      {
        title: "Model requests a Skill",
        desc: "Only when the model decides a capability is needed does it request the actual Skill document.",
        client:
          "Intercept tool call and prepare to read frontend-design/SKILL.md",
        llm: "Tool Call: read skill doc for frontend-design",
        action: "Trigger on-demand loading",
      },
      {
        title: "Generate content / instructions",
        desc: "The client returns the full Skill guidance, and the model can then operate with higher quality.",
        client:
          "Return design rules: interaction principles, responsive standards, visual constraints",
        llm: "Generate text or tool calls according to the behavior defined by the Skill",
        action: "Skill injection complete, execution begins",
      },
    ],
    orchestrationTitle: "Course Spine: Driving and Orchestration Flow",
    orchestrationSteps: [
      {
        title: "Intent Detection",
        desc: "Infer task boundaries, required context, and risk from the user objective.",
      },
      {
        title: "Role Activation",
        desc: "Inject the Agent persona so the model reasons from a stable identity.",
      },
      {
        title: "Skill Check",
        desc: "Expose only the skill index first, then load full rules on demand.",
      },
      {
        title: "Tool Execution",
        desc: "The client performs real Shell, API, or MCP calls.",
      },
      {
        title: "Observation Loop",
        desc: "Feed results, logs, and state back into the model for the next decision.",
      },
    ],
    toolTitle: "Three Common Tool Call Classes",
    toolCards: [
      {
        title: "Built-in Tools",
        desc: "Workspace reads, code search, and clarification tools with the lowest call overhead.",
        icon: "bot",
      },
      {
        title: "Shell / Runtime",
        desc: "Commands, builds, and tests that map closely to real engineering execution.",
        icon: "terminal",
      },
      {
        title: "MCP / Remote APIs",
        desc: "External platforms and services that extend the model into team systems.",
        icon: "network",
      },
    ],
    scenarioTitle: "Course Case: Execution Trace Demo",
    scenarioSteps: [
      "USER: Use a map tool to find the route from Shanghai Hongqiao Airport to the Peace Hotel.",
      "CLIENT: Inject the Agent persona, skill list, tool list, and user prompt, then send the full context to the LLM.",
      "LLM: Determine that route search is needed and output an intent to load the map-search Skill first.",
      "CLIENT: Read the map-search Skill document and return it to the LLM, including route-query rules, field constraints, and parameter format.",
      "LLM: Generate the map tool-call command and arguments under the Skill rules.",
      "CLIENT: Execute the map tool with those arguments and return the origin, destination, candidate routes, and structured result to the LLM.",
      "LLM: Decide that the returned data is sufficient and compose a user-facing route answer.",
      "CLIENT: Confirm that the LLM has finished with no next action, then deliver the final answer to the user; observable intermediate steps, tool-call logs, and brief reasoning summaries may be selectively shown by product policy.",
    ],
    quizTitle: "Course Quiz",
    quizItems: [
      {
        q: "Why is a trained LLM described as a relatively static “brain”?",
        a: "Because after training, model parameters are usually not updated during normal conversations. It has internalized knowledge, language patterns, and reasoning habits from training, but it does not naturally know new information or gain new execution capabilities. New information and capabilities are usually provided by the client through context, RAG, Skills, or Tool Calls.",
      },
      {
        q: "Why should a skill list include descriptions instead of only names?",
        a: "Because the model needs descriptions to understand what each Skill is for and whether it matches the current task. Names alone may not reveal capability boundaries, leading the model to choose the wrong Skill or request irrelevant ones. Short descriptions help capability matching without loading the full Skill document into context.",
      },
      {
        q: "Why is the client described as the model’s “senses, expression system, and hands and feet”?",
        a: "Because the LLM itself only processes context and generates output. It does not directly access the user interface, file system, network, or external APIs. The client receives user input, assembles context, presents model output, and executes tool calls when permitted by the user and safety policy, giving it input, output, and action capabilities.",
      },
      {
        q: "Why can a Tool Call not be executed directly by the LLM?",
        a: "Because the LLM only produces intent. Controlled clients perform the real interaction with files, terminals, and networks.",
      },
      {
        q: "Why separate Agent and Skill?",
        a: "Because persona and domain rules are different assets. Decoupling makes them easier to reuse, govern, and load on demand.",
      },
      {
        q: "Can an LLM directly possess destructive capabilities such as rm -rf?",
        a: "No. The model itself cannot execute commands. It can only produce an intent to call a tool, while the client grants real execution through Shell, file-operation, or external-API tools. Sandboxing, permission control, and secondary confirmation for irreversible actions must be handled by the client.",
      },
    ],
    next: "Next",
    done: "Completed",
    question: "Question",
    answer: "Answer",
    flip: "Click to flip",
  },
} satisfies Record<Lang, any>;

function getToolIcon(icon: string) {
  if (icon === "terminal") return <TerminalSquare className="h-5 w-5" />;
  if (icon === "network") return <Shield className="h-5 w-5" />;
  return <Bot className="h-5 w-5" />;
}

function ConceptCard({
  icon,
  title,
  intro,
  points,
  tone,
}: {
  icon: ReactNode;
  title: string;
  intro: string;
  points: string[];
  tone: "blue" | "emerald" | "purple";
}) {
  const toneClass = {
    blue: "border-blue-500/20 bg-blue-950/20 text-blue-300 marker:text-blue-400",
    emerald:
      "border-emerald-500/20 bg-emerald-950/20 text-emerald-300 marker:text-emerald-400",
    purple:
      "border-purple-500/20 bg-purple-950/20 text-purple-300 marker:text-purple-400",
  }[tone];

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <div className="mb-3 flex items-center gap-2 font-semibold">
        {icon} {title}
      </div>
      <p className="text-sm leading-6 text-slate-300">{intro}</p>
      <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-400">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function QuizCard({
  prompt,
  answer,
  flipLabel,
  questionLabel,
  answerLabel,
}: {
  prompt: string;
  answer: string;
  flipLabel: string;
  questionLabel: string;
  answerLabel: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((value) => !value)}
      className="min-h-[96px] rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-left transition hover:border-blue-500/40 hover:bg-slate-900/70"
    >
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500 md:text-xs">
        <span>{flipped ? answerLabel : questionLabel}</span>
        <span>{flipLabel}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm font-semibold leading-6 text-white md:text-base">
            {flipped ? answer : prompt}
          </h3>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export default function ClientToolGuide({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [visibleScenarioCount, setVisibleScenarioCount] = useState(1);

  const revealNext = () => {
    setVisibleScenarioCount((count) =>
      Math.min(count + 1, t.scenarioSteps.length),
    );
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-slate-400 md:text-lg">
            {t.subtitle}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ConceptCard
              icon={<Brain className="h-5 w-5" />}
              title={t.llmTitle}
              intro={t.llmIntro}
              points={t.llmPoints}
              tone="blue"
            />
            <ConceptCard
              icon={<Monitor className="h-5 w-5" />}
              title={t.clientTitle}
              intro={t.clientIntro}
              points={t.clientPoints}
              tone="emerald"
            />
            <ConceptCard
              icon={<Activity className="h-5 w-5" />}
              title={t.loopTitle}
              intro={t.loopIntro}
              points={t.loopSteps}
              tone="purple"
            />
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Brain className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">
              {t.compareTitle}
            </h3>
          </div>
          <p className="text-sm leading-7 text-slate-400">{t.compareDesc}</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-blue-500/25 bg-slate-950/50 p-4">
              <div className="mb-2 text-sm font-semibold text-blue-300">
                {t.llmTitle}
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {t.llmPoints.map((point: string) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/50 p-4">
              <div className="mb-2 text-sm font-semibold text-emerald-300">
                {t.clientTitle}
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {t.clientPoints.map((point: string) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <AgenticLoopShowcase lang={lang} title={t.loopTitle} />

      <div className="space-y-6">
        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Layers className="h-6 w-6 text-amber-400" />
              <h3 className="text-xl font-semibold text-white">
                {t.skillTitle}
              </h3>
            </div>
            <p className="max-w-4xl text-sm leading-7 text-slate-400">
              {t.skillDesc}
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {t.skillCards.map((card: { title: string; desc: string }) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                >
                  <div className="mb-3 flex items-center gap-2 text-white">
                    {card.title === "Agent" ? (
                      <User className="h-5 w-5 text-purple-400" />
                    ) : card.title === "Skill" ? (
                      <BookOpen className="h-5 w-5 text-orange-400" />
                    ) : (
                      <TerminalSquare className="h-5 w-5 text-blue-400" />
                    )}
                    <span className="font-semibold">{card.title}</span>
                  </div>
                  <p className="text-sm leading-6 text-slate-400">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            <DynamicSkillShowcase
              lang={lang}
              title={t.skillDemoTitle}
              steps={t.skillDemoSteps}
            />
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-5 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Wrench className="h-6 w-6 text-rose-400" />
              <h3 className="text-xl font-semibold text-white">
                {t.toolTitle}
              </h3>
            </div>
            <div className="space-y-3">
              {t.toolCards.map(
                (card: { title: string; desc: string; icon: string }) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                  >
                    <div className="mb-2 flex items-center gap-3 text-white">
                      <span className="rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-rose-300">
                        {getToolIcon(card.icon)}
                      </span>
                      <span className="font-semibold">{card.title}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-400">
                      {card.desc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-white">
              {t.orchestrationTitle}
            </h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-5">
            {t.orchestrationSteps.map(
              (step: { title: string; desc: string }, index: number) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                    0{index + 1}
                  </div>
                  <div className="font-semibold text-white">{step.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.desc}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <PlayCircle className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">
              {t.scenarioTitle}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
                {lang === "zh" ? "课程执行台" : "Course Console"}
              </div>
              <button
                onClick={revealNext}
                disabled={visibleScenarioCount >= t.scenarioSteps.length}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {visibleScenarioCount >= t.scenarioSteps.length
                  ? t.done
                  : t.next}
              </button>
            </div>

            <div className="space-y-3">
              {t.scenarioSteps
                .slice(0, visibleScenarioCount)
                .map((step: string, index: number) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[110px_minmax(0,1fr)] md:items-start"
                  >
                    <div
                      className={`rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${getScenarioTone(step)}`}
                    >
                      {step.split(":")[0]}
                    </div>
                    <div className="font-mono text-sm leading-7 text-slate-300">
                      {step.slice(step.indexOf(":") + 1).trim()}
                    </div>
                    <div className="md:col-span-2 text-right text-xs text-slate-600">
                      {lang === "zh"
                        ? `步骤 0${index + 1}`
                        : `step 0${index + 1}`}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            {lang === "zh" ? "课程讲解视角" : "Course Lens"}
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-400">
            <p>
              {lang === "zh"
                ? "这个案例模拟一次真实地图查询任务，让用户从角色视角理解请求如何在用户、Client、LLM 与地图工具之间流动。"
                : "This case simulates a real route-search task so learners can follow how a request moves across the user, client, LLM, and map tool."}
            </p>
            <p>
              {lang === "zh"
                ? "对用户可见的内容不一定是全部内部细节。产品通常更适合展示可观测步骤、工具调用记录和简要推理摘要，而不是原始思维链。"
                : "The user-visible layer does not have to expose every internal detail. Products usually show observable steps, tool-call logs, and brief reasoning summaries rather than raw chain-of-thought."}
            </p>
            <p>
              {lang === "zh"
                ? "宽屏下左侧保留完整执行流，右侧保留教学解读，适合投屏讲解或课堂演示。"
                : "On wide screens, the left side keeps the full execution trace while the right side remains available for teaching commentary, making it better for presentations and classroom demos."}
            </p>
          </div>
        </aside>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-4 md:p-5">
        <div className="mb-4 flex items-center gap-3">
          <Brain className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">{t.quizTitle}</h3>
        </div>
        <div className="grid gap-4">
          {t.quizItems.map((item: { q: string; a: string }) => (
            <QuizCard
              key={item.q}
              prompt={item.q}
              answer={item.a}
              flipLabel={t.flip}
              questionLabel={t.question}
              answerLabel={t.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgenticLoopShowcase({ lang, title }: { lang: Lang; title: string }) {
  const [loopScale, setLoopScale] = useState(0.85);
  const copy =
    lang === "zh"
      ? {
          userInput: "用户发出需求指令",
          clientPrep: "1. Client 组装上下文",
          clientPrepDesc: "携带系统指令、日志、当前环境",
          sendToModel: "发送给大模型",
          llmReason: "2. LLM 推理节点",
          llmReasonDesc: "理解意图，评估是否需要借助工具",
          needTool: "是否需要调用工具？",
          yesBranch: "YES: 需要工具",
          noBranch: "NO: 任务完成",
          toolExec: "3A. Client 执行工具",
          toolExecDesc: "执行系统沙盒操作，提取文件、查状态或调用 API",
          loopback: "状态反馈与信息追加",
          deliver: "3B. 交付回复",
          deliverDesc: "目标已满足，生成面向用户的文本结果",
          exitLoop: "满足需求，跳出循环",
          streamed: "流式交互交付内容",
          userCheck: "用户判断是否发出新指令",
          userLoop: "用户掌控的新指令循环",
        }
      : {
          userInput: "User submits a goal",
          clientPrep: "1. Client assembles context",
          clientPrepDesc:
            "Carries system instructions, logs, and current environment",
          sendToModel: "Send to model",
          llmReason: "2. LLM reasoning node",
          llmReasonDesc:
            "Understands intent and evaluates whether tools are needed",
          needTool: "Does this require a tool?",
          yesBranch: "YES: use tools",
          noBranch: "NO: task complete",
          toolExec: "3A. Client executes tools",
          toolExecDesc:
            "Runs sandbox actions, reads files, checks state, or calls APIs",
          loopback: "State feedback and context append",
          deliver: "3B. Deliver response",
          deliverDesc:
            "The goal is satisfied, so a user-facing answer is generated",
          exitLoop: "Need satisfied, exit loop",
          streamed: "Stream the final answer",
          userCheck: "User decides whether to send a new instruction",
          userLoop: "User-controlled next-instruction loop",
        };

  const scaleOptions = [0.75, 0.85, 1];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-4 md:p-8 overflow-hidden">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 p-1 text-xs font-semibold text-slate-400">
          <span className="px-2 text-slate-500">
            {lang === "zh" ? "缩放" : "Zoom"}
          </span>
          {scaleOptions.map((scale) => (
            <button
              key={scale}
              onClick={() => setLoopScale(scale)}
              className={`rounded-full px-3 py-1.5 transition ${loopScale === scale ? "bg-purple-500/20 text-purple-200" : "hover:text-slate-200"}`}
            >
              {Math.round(scale * 100)}%
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center transition-transform duration-200"
        style={{
          transform: `scale(${loopScale})`,
          transformOrigin: "top center",
          marginBottom: `${-(1 - loopScale) * 760}px`,
        }}
      >
        <div className="pointer-events-none absolute -right-5 top-6 bottom-8 z-10 hidden w-[430px] rounded-r-[2rem] border-t-2 border-r-2 border-b-2 border-dashed border-blue-500/35 xl:block 2xl:-right-10 2xl:w-[500px]">
          <div className="absolute -top-[5px] left-0 h-[10px] w-[10px] -translate-x-1 rotate-[135deg] border-r-2 border-b-2 border-blue-500/45 bg-slate-900" />
          <div className="absolute top-1/2 right-0 z-30 translate-x-1/2 -translate-y-1/2 rounded-lg border border-blue-500/25 bg-slate-950 px-3 py-1.5 text-center text-[10px] font-semibold text-blue-300 shadow-lg">
            {copy.userLoop}
          </div>
        </div>

        <div className="z-20 flex items-center gap-2 rounded-full border border-blue-500 bg-blue-600/20 px-6 py-3 text-blue-300 shadow-lg">
          <User className="h-4 w-4" />
          <span className="text-sm font-semibold">{copy.userInput}</span>
        </div>

        <div className="relative z-10 flex h-10 w-[2px] flex-col items-center justify-end bg-blue-500">
          <div className="mb-[2px] h-[10px] w-[10px] rotate-45 border-r-2 border-b-2 border-blue-500" />
        </div>

        <div className="relative flex w-full max-w-5xl flex-col items-center rounded-[2rem] border-2 border-dashed border-slate-800 bg-slate-950/80 p-4 pt-8 pb-12 md:p-8">
          <div className="relative z-20 w-full max-w-[320px] rounded-xl border border-emerald-500/50 bg-emerald-900/30 px-6 py-4 text-center text-emerald-300 shadow-lg md:py-5">
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold md:text-base">
              <TerminalSquare className="h-4 w-4" />
              {copy.clientPrep}
            </div>
            <div className="text-[10px] opacity-70 md:text-xs">
              {copy.clientPrepDesc}
            </div>
          </div>

          <div className="relative z-10 flex h-12 w-[2px] flex-col items-center justify-center bg-slate-600 md:h-14">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-[10px] font-medium text-slate-400 shadow-md md:left-4 md:px-3 md:text-xs">
              {copy.sendToModel}
            </div>
            <div className="absolute bottom-[2px] h-[10px] w-[10px] rotate-45 border-r-2 border-b-2 border-slate-600" />
          </div>

          <div className="relative z-20 w-full max-w-[320px] rounded-xl border border-purple-500/50 bg-purple-900/30 px-6 py-4 text-center text-purple-300 shadow-lg md:py-5">
            <div className="mb-1 flex items-center justify-center gap-2 text-sm font-bold md:text-base">
              <Brain className="h-4 w-4" />
              {copy.llmReason}
            </div>
            <div className="text-[10px] opacity-70 md:text-xs">
              {copy.llmReasonDesc}
            </div>
          </div>

          <div className="relative z-10 flex h-12 w-[2px] items-center justify-center bg-slate-600 md:h-14">
            <div className="relative z-30 whitespace-nowrap rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-[10px] font-medium text-slate-300 shadow-lg md:text-xs">
              {copy.needTool}
            </div>
          </div>

          <div className="relative h-8 w-[84%] max-w-[520px] shrink-0 rounded-t-2xl border-t-2 border-l-2 border-r-2 border-slate-600 md:h-10">
            <div className="absolute -top-[12px] left-[20%] -translate-x-1/2 rounded-md bg-slate-950 px-2 text-[10px] font-bold tracking-wider text-yellow-500 md:text-xs">
              {copy.yesBranch}
            </div>
            <div className="absolute -top-[12px] right-[20%] translate-x-1/2 rounded-md bg-slate-950 px-2 text-[10px] font-bold tracking-wider text-blue-400 md:text-xs whitespace-nowrap">
              {copy.noBranch}
            </div>
            <div className="absolute -bottom-[2px] -left-[6px] h-[10px] w-[10px] rotate-45 border-r-2 border-b-2 border-slate-600 bg-slate-950" />
            <div className="absolute -bottom-[2px] -right-[6px] h-[10px] w-[10px] rotate-45 border-r-2 border-b-2 border-slate-600 bg-slate-950" />
          </div>

          <div className="relative mt-4 grid w-[84%] max-w-[520px] shrink-0 grid-cols-2 gap-6 md:gap-10">
            <div className="relative -ml-6 md:-ml-10">
              <div className="relative z-20 flex h-[110px] flex-col justify-center rounded-xl border border-yellow-500/50 bg-yellow-900/30 px-3 py-4 text-center text-yellow-300 shadow-lg md:h-[118px] md:px-4">
                <div className="mb-1 flex items-center justify-center gap-1.5 whitespace-nowrap text-[11px] font-bold md:text-[14px]">
                  <Wrench className="h-4 w-4 shrink-0" />
                  {copy.toolExec}
                </div>
                <div className="text-[10px] leading-tight opacity-70 md:text-xs md:leading-relaxed">
                  {copy.toolExecDesc}
                </div>
              </div>

              <div className="pointer-events-none absolute top-1/2 right-full z-10 h-[320px] w-[26px] -translate-y-full rounded-l-3xl border-l-2 border-t-2 border-b-2 border-dashed border-emerald-500/90 md:h-[380px] md:w-[52px]">
                <div className="pointer-events-none absolute -top-[2px] -right-[56px] h-[2px] w-[56px] border-t-2 border-dashed border-emerald-500/90 md:-right-[132px] md:w-[132px]">
                  <div className="absolute -top-[5px] -right-[2px] h-[10px] w-[10px] rotate-45 border-r-2 border-t-2 border-emerald-500/90" />
                </div>
                <div className="pointer-events-auto absolute top-1/2 left-0 -translate-x-[calc(50%+1px)] -translate-y-1/2 rounded-lg border border-emerald-500/30 bg-slate-950 px-2 py-1 text-[10px] font-medium text-emerald-400 shadow-lg md:px-3 md:text-xs whitespace-nowrap text-center">
                  {copy.loopback}
                </div>
              </div>
            </div>

            <div className="relative -mr-6 md:-mr-10">
              <div className="relative z-20 flex h-[110px] flex-col justify-center rounded-xl border border-blue-500/60 bg-blue-900/40 px-3 py-4 text-center text-blue-300 shadow-xl md:h-[118px] md:px-4">
                <div className="mb-1 flex items-center justify-center gap-1.5 whitespace-nowrap text-[11px] font-bold md:text-[14px]">
                  <ArrowRight className="h-4 w-4 shrink-0" />
                  {copy.deliver}
                </div>
                <div className="text-[10px] leading-tight opacity-70 md:text-xs md:leading-relaxed">
                  {copy.deliverDesc}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-[-2px] grid w-[84%] max-w-[520px] grid-cols-2 gap-6 md:gap-10">
          <div />
          <div className="-mr-6 flex justify-center md:-mr-10">
            <div className="relative flex h-[60px] w-[2px] flex-col items-center bg-blue-500 md:h-[80px]">
              <div className="absolute top-[26%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-blue-500/30 bg-slate-950 px-2 py-1.5 text-[10px] font-bold text-blue-400 shadow-lg md:top-[34%] md:px-3 md:text-xs">
                {copy.exitLoop}
              </div>
              <div className="absolute bottom-[2px] h-[10px] w-[10px] rotate-45 border-r-2 border-b-2 border-blue-500 bg-slate-950" />
            </div>
          </div>
        </div>

        <div className="relative z-20 grid w-[84%] max-w-[520px] grid-cols-2 gap-6 md:gap-10">
          <div />
          <div className="-mr-6 flex justify-center md:-mr-10">
            <div className="flex w-[170px] flex-col items-center md:w-[240px]">
              <div className="relative z-20 flex w-full items-center justify-center gap-1 rounded-xl bg-blue-600 px-2 py-3 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] md:py-4">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap text-[11px] font-bold md:text-sm">
                  {copy.streamed}
                </span>
              </div>
              <div className="relative -z-10 flex h-10 w-[2px] items-end justify-center border-l-2 border-dashed border-blue-500/40 pb-1">
                <div className="mb-[4px] h-[8px] w-[8px] rotate-45 border-r-2 border-b-2 border-blue-500/40" />
              </div>
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-950 px-2 py-3 text-center text-[10px] font-medium text-slate-500 shadow-xl md:px-4 md:py-4 md:text-xs">
                <User className="mb-1.5 h-4 w-4 opacity-50 md:mb-2" />
                {copy.userCheck}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getScenarioTone(step: string) {
  if (step.startsWith("USER"))
    return "border-blue-500/30 bg-blue-500/10 text-blue-300";
  if (step.startsWith("CLIENT"))
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (step.startsWith("LLM"))
    return "border-purple-500/30 bg-purple-500/10 text-purple-300";
  return "border-amber-500/30 bg-amber-500/10 text-amber-300";
}

function DynamicSkillShowcase({
  lang,
  title,
  steps,
}: {
  lang: Lang;
  title: string;
  steps: Array<{
    title: string;
    desc: string;
    client: string;
    llm: string;
    action: string;
  }>;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
            {title}
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            {step.desc}
          </p>
        </div>
        <button
          onClick={() => setCurrentStep((index) => (index + 1) % steps.length)}
          className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
        >
          {lang === "zh" ? "下一步演示" : "Next demo step"}
        </button>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-4">
        {steps.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setCurrentStep(index)}
            className={`rounded-2xl border p-4 text-left transition ${
              index === currentStep
                ? "border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                : "border-slate-800 bg-slate-900/70 hover:bg-slate-900"
            }`}
          >
            <div
              className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${index === currentStep ? "text-amber-300" : "text-slate-500"}`}
            >
              0{index + 1}
            </div>
            <div className="font-semibold text-white">{item.title}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_120px_1fr] xl:items-stretch">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <TerminalSquare className="h-4 w-4" /> CLIENT
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-sm leading-7 text-slate-300">
            {step.client}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="h-10 w-10 rounded-full border border-amber-500/30 bg-amber-500/10" />
          <div className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            {step.action}
          </div>
          <div className="h-16 w-[2px] bg-slate-700 xl:h-full xl:max-h-24" />
        </div>

        <div className="rounded-2xl border border-purple-500/25 bg-purple-950/20 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-purple-300">
            <Brain className="h-4 w-4" /> LLM
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-sm leading-7 text-slate-300">
            {step.llm}
          </div>
        </div>
      </div>
    </div>
  );
}
