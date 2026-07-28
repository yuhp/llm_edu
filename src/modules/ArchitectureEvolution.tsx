import { useState } from "react";
import StageVisualizer from "../components/StageVisualizer";
import { stagesEn, stagesZh } from "../data/architecture";
import { Lang } from "../types";

const copy = {
  en: {
    title: "From Single Calls to Multi-Agent Collaboration",
    subtitle:
      "Follow four architecture stages to see how LLM applications gain tools, loops, and collaboration.",
    stagePrefix: "Chapter",
    capabilities: "Learning goals",
    topology: "System topology",
    interactive: "Interactive course walkthrough",
    stageLabel: "Current chapter",
    trend: "Capability progression",
    trendLabels: ["Text", "Tools", "Loop", "Collaboration"],
  },
  zh: {
    title: "从单轮调用到多智能体协作",
    subtitle:
      "通过四个架构阶段，理解 LLM 应用如何逐步获得工具、循环与协作能力。",
    stagePrefix: "章节",
    capabilities: "学习重点",
    topology: "系统拓扑",
    interactive: "交互式课程讲解",
    stageLabel: "当前章节",
    trend: "能力演进",
    trendLabels: ["文本", "工具", "闭环", "协作"],
  },
};

export default function ArchitectureEvolution({ lang }: { lang: Lang }) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const t = copy[lang];
  const stages = lang === "zh" ? stagesZh : stagesEn;
  const currentStage = stages[currentStageIndex];

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{t.title}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
          {t.subtitle}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/55 p-5 md:p-6">
        <nav className="grid gap-3 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => setCurrentStageIndex(index)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                index === currentStageIndex
                  ? "border-blue-500/40 bg-blue-900/20 shadow-[0_0_20px_rgba(59,130,246,0.12)]"
                  : "border-slate-800 bg-slate-950/40 hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${index === currentStageIndex ? "bg-blue-500/20 text-blue-300" : "bg-slate-800 text-slate-400"}`}
                >
                  {t.stagePrefix} {index + 1}
                </span>
                <span
                  className={`font-semibold ${index === currentStageIndex ? "text-blue-100" : "text-slate-300"}`}
                >
                  {stage.title.split(": ")[1] || stage.title}
                </span>
              </div>
              <div className="mt-3 text-sm text-slate-400">
                {stage.subtitle}
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex min-h-[760px] flex-col rounded-3xl border border-slate-800 bg-slate-900/55 p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
              {t.topology}
            </span>
            <span className="text-xs text-blue-400">
              {t.stagePrefix} {currentStageIndex + 1}
            </span>
          </div>

          <div className="pattern-dots relative flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:p-6">
            <StageVisualizer stage={currentStage} />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
              {t.trend}
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-slate-800">
              {stages.map((_, index) => (
                <div
                  key={index}
                  className={`h-full transition-all duration-500 ${
                    index <= currentStageIndex
                      ? index === 0
                        ? "bg-slate-500"
                        : index === 1
                          ? "bg-emerald-500"
                          : index === 2
                            ? "bg-purple-500"
                            : "bg-amber-500"
                      : "bg-transparent"
                  }`}
                  style={{ width: `${100 / stages.length}%` }}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.trendLabels.map((label, index) => (
                <span
                  key={label}
                  className={
                    index <= currentStageIndex ? "text-blue-300" : undefined
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/55 p-5 md:p-6">
          <h3 className="text-lg font-semibold text-white">
            {currentStage.subtitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {currentStage.description}
          </p>
          <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {t.capabilities}
          </div>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {currentStage.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="pt-0.5 text-blue-400">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">
            <div className="font-semibold text-slate-200">{t.interactive}</div>
            <div className="mt-2">
              {t.stageLabel}: 0{currentStageIndex + 1}
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">
            <div className="mb-2 font-semibold text-slate-200">
              {stageNote(lang, currentStageIndex)}
            </div>
            <p>{stageTeachingHint(lang, currentStageIndex)}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function stageNote(lang: Lang, index: number) {
  if (lang === "zh") {
    return [
      "观察重点：模型是否只能回答",
      "观察重点：谁在调用工具",
      "观察重点：是否形成循环",
      "观察重点：是否出现协作分工",
    ][index];
  }

  return [
    "Chapter focus: can the model only answer?",
    "Chapter focus: who actually executes tools?",
    "Chapter focus: does a feedback loop appear?",
    "Chapter focus: do specialized roles collaborate?",
  ][index];
}

function stageTeachingHint(lang: Lang, index: number) {
  if (lang === "zh") {
    return [
      "这一阶段重点理解“模型本身不接触真实世界”，它只是生成文本。",
      "这一阶段关键在于把“推理意图”和“真实执行”彻底拆开。",
      "这一阶段开始出现记忆、状态、规则读取与连续决策。",
      "这一阶段强调多个智能体之间的分工、审查与闭环交付。多 Agent 不一定意味着多个不同模型，也可以是同一个模型在不同角色、上下文和工具权限下运行。",
    ][index];
  }

  return [
    "At this stage the key idea is that the model only generates text and does not touch the real world.",
    "This stage separates reasoning intent from real execution.",
    "This stage introduces memory, state, rule reading, and iterative decisions.",
    "This stage emphasizes division of labor, review, and closed-loop delivery across agents. Multi-agent does not always mean multiple different models; it can also mean the same model running under different roles, contexts, and tool permissions.",
  ][index];
}
