import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Layers3,
  Workflow,
} from "lucide-react";
import PageChrome from "../components/PageChrome";
import { getInitialLang, setUrlLang, withLang } from "../lib/lang";
import { Lang } from "../types";

const copy = {
  zh: {
    eyebrow: "HCLife Education",
    title: "大模型应用课程",
    subtitle: "从原理到工程实践",
    tagline: "从提示词到生产力 · Prompt to Product",
    enterCourse: "进入课程",
    courseIntroTitle: "课程导览",
    navigationTitle: "内容导航",
    footer: "© 2026 HCLife Education / 大模型应用课程. All rights reserved.",
    homeLead:
      "这是一个围绕 LLM 与 Agent 的知识课程演示网站。首页用于整站介绍与课程分发，进入课程后提供更宽的沉浸式阅读和演示空间。",
    moduleCards: {
      evolution: {
        title: "LLM 应用架构演进",
        desc: "从单轮调用到多智能体协作，理解 LLM 应用如何一步步走向更完整的工程系统。",
        level: "课程 01",
        outcomes: [
          "单轮文本生成",
          "工具调用与执行分离",
          "记忆、状态与连续决策",
          "多智能体分工与审查",
        ],
        href: "./evolution.html",
      },
      "client-tools": {
        title: "客户端与工具驱动原理",
        desc: "以课程演示方式解释 Client、Agent、Skill 与 Tool Call 之间的协作机制。",
        level: "课程 02",
        outcomes: [
          "LLM 与 Client 的边界",
          "标准 Agentic Loop",
          "Agent 与 Skill 解耦",
          "Skill 按需注入",
          "三类常见 Tool Call",
        ],
        href: "./client-tools.html",
      },
      "model-boundaries": {
        title: "大模型：生成与能力边界",
        desc: "大模型的本质是什么？理解模型如何生成文字、为何出现幻觉，以及了解如何通过上下文工程将模型从“梦境”拉回现实。",
        level: "课程 03",
        outcomes: [
          "模型（LLM）是什么？",
          "模型是怎样工作的？",
          "如何理解模型的能力？",
          "模型的短板是什么？",
          "应用中如何扬长避短？",
          "模型的输出是文字，为何可以调用工具？",
        ],
        href: "./model-boundaries.html",
      },
    },
  },
  en: {
    eyebrow: "HCLife Education",
    title: "Applied LLM Academy",
    subtitle: "From Principles to Engineering Practice",
    tagline: "Prompt to Product",
    enterCourse: "Open Course",
    courseIntroTitle: "Course Overview",
    navigationTitle: "Contents",
    footer:
      "© 2026 HCLife Education / Applied LLM Academy. All rights reserved.",
    homeLead:
      "This is a course-style knowledge site for LLM and Agent education. The homepage introduces the academy and routes readers into individual courses with wider, presentation-friendly layouts.",
    moduleCards: {
      evolution: {
        title: "LLM Application Architecture Evolution",
        desc: "From single-call inference to multi-agent collaboration, this course explains how LLM applications evolve into fuller engineering systems.",
        level: "Course 01",
        outcomes: [
          "Single-call text generation",
          "Tool calls and execution separation",
          "Memory, state, and iterative decisions",
          "Multi-agent roles and review",
        ],
        href: "./evolution.html",
      },
      "client-tools": {
        title: "Client and Tool Driving Fundamentals",
        desc: "This course explains how Client, Agent, Skill, and Tool Calls cooperate in a wide-screen presentation layout.",
        level: "Course 02",
        outcomes: [
          "The LLM and Client boundary",
          "The standard Agentic Loop",
          "Agent and Skill decoupling",
          "On-demand Skill injection",
          "Three common Tool Call classes",
        ],
        href: "./client-tools.html",
      },
      "model-boundaries": {
        title: "Large Language Models: Generation and Capability Boundaries",
        desc: 'What is the essence of an LLM? Understand how models generate text, why hallucinations occur, and how context engineering brings a model back from its "dream" to reality.',
        level: "Course 03",
        outcomes: [
          "What is an LLM?",
          "How does a model work?",
          "How should we understand a model's capabilities?",
          "What are a model's limitations?",
          "How do we use its strengths while managing its limits?",
          "If its output is text, how can a model call tools?",
        ],
        href: "./model-boundaries.html",
      },
    },
  },
};

export default function HomePage() {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());
  const t = copy[lang];

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    setUrlLang(nextLang);
  };

  const modules = [
    {
      icon: <Workflow className="h-5 w-5" />,
      title: t.moduleCards.evolution.title,
      desc: t.moduleCards.evolution.desc,
      level: t.moduleCards.evolution.level,
      outcomes: t.moduleCards.evolution.outcomes,
      href: withLang(t.moduleCards.evolution.href, lang),
      accent: "blue",
    },
    {
      icon: <Layers3 className="h-5 w-5" />,
      title: t.moduleCards["client-tools"].title,
      desc: t.moduleCards["client-tools"].desc,
      level: t.moduleCards["client-tools"].level,
      outcomes: t.moduleCards["client-tools"].outcomes,
      href: withLang(t.moduleCards["client-tools"].href, lang),
      accent: "emerald",
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: t.moduleCards["model-boundaries"].title,
      desc: t.moduleCards["model-boundaries"].desc,
      level: t.moduleCards["model-boundaries"].level,
      outcomes: t.moduleCards["model-boundaries"].outcomes,
      href: withLang(t.moduleCards["model-boundaries"].href, lang),
      accent: "purple",
    },
  ];

  return (
    <PageChrome
      lang={lang}
      setLang={setLang}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      footer={t.footer}
    >
      <section className="grid gap-6 xl:grid-cols-[180px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <nav className="sticky top-6 border-l border-slate-800 pl-4">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t.navigationTitle}
            </div>
            <div className="space-y-1">
              {modules.map((module, index) => (
                <a
                  key={module.href}
                  href={`#course-${index + 1}`}
                  className="group relative block py-2 text-sm leading-5 text-slate-500 transition hover:text-slate-200"
                >
                  <span className="absolute -left-[18px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-slate-700 transition group-hover:bg-blue-400" />
                  <span className="mr-2 font-mono text-xs text-slate-600">
                    0{index + 1}
                  </span>
                  {module.title}
                </a>
              ))}
            </div>
          </nav>
        </aside>
        <main className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            <BookOpen className="h-4 w-4 text-blue-400" />
            {t.courseIntroTitle}
          </div>
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-200 shadow-[0_0_40px_rgba(59,130,246,0.12)]">
            {t.tagline}
          </div>
          <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-500">
            {t.homeLead}
          </p>
          <div className="grid gap-3">
            {modules.map((module, index) => (
              <article
                key={module.href}
                id={`course-${index + 1}`}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60"
              >
                <div
                  className={`relative p-4 md:p-5 ${module.accent === "blue" ? "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_38%)]" : module.accent === "emerald" ? "bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_38%)]" : "bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_38%)]"}`}
                >
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute right-5 top-5 h-16 w-16 rounded-full border border-white/10" />
                    <div className="absolute right-10 top-10 h-8 w-8 rounded-full border border-white/10" />
                  </div>

                  <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
                    <div className="min-w-0">
                      <div
                        className={`mb-2 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${module.accent === "blue" ? "border-blue-500/30 bg-blue-500/10 text-blue-300" : module.accent === "emerald" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-purple-500/30 bg-purple-500/10 text-purple-300"}`}
                      >
                        {module.level}
                      </div>
                      <div className="flex items-center gap-2.5 text-white">
                        <span
                          className={`rounded-lg border border-white/10 bg-slate-900/60 p-2 ${module.accent === "blue" ? "text-blue-300" : module.accent === "emerald" ? "text-emerald-300" : "text-purple-300"}`}
                        >
                          {module.icon}
                        </span>
                        <span className="text-lg font-semibold md:text-xl">
                          {module.title}
                        </span>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        {module.desc}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-800 pt-3 text-sm leading-5 text-slate-300 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                      {module.outcomes.map(
                        (outcome: string, outcomeIndex: number) => (
                          <div key={outcome} className="flex items-start gap-2">
                            <span
                              className={`shrink-0 font-mono text-xs font-bold leading-5 ${module.accent === "blue" ? "text-blue-400" : module.accent === "emerald" ? "text-emerald-400" : "text-purple-400"}`}
                            >
                              0{outcomeIndex + 1}
                            </span>
                            <span>{outcome}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="relative mt-3 flex items-center justify-between gap-4 border-t border-slate-800 pt-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Preview
                      </div>
                      <div className="mt-1 text-xs leading-5 text-slate-400 md:text-sm">
                        {module.accent === "blue"
                          ? lang === "zh"
                            ? "阶段切换 + 动态拓扑可视化 + 演进讲解"
                            : "Stage switching, animated topology, and guided evolution walkthrough"
                          : module.accent === "emerald"
                            ? lang === "zh"
                              ? "宽屏执行台 + Tool Call 分类 + 编排流程"
                              : "Wide execution desk, tool-call taxonomy, and orchestration flow"
                            : lang === "zh"
                              ? "Token 生成演示 + 梦境与现实切换 + 边界判断"
                              : "Token-generation demo, dream-to-reality switchboard, and boundary judgment"}
                      </div>
                    </div>
                    <a
                      href={module.href}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition group-hover:translate-x-0.5 ${module.accent === "blue" ? "border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20" : module.accent === "emerald" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20" : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"}`}
                    >
                      {t.enterCourse}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </section>
    </PageChrome>
  );
}
