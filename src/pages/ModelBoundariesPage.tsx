import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import CourseBookmarks from "../components/CourseBookmarks";
import PageChrome from "../components/PageChrome";
import { getInitialLang, setUrlLang, withLang } from "../lib/lang";
import ModelBoundariesGuide from "../modules/ModelBoundariesGuide";
import { Lang } from "../types";

const copy = {
  zh: {
    eyebrow: "HCLife Education",
    title: "课程 03：大模型：生成与能力边界",
    subtitle:
      "大模型的本质是什么？理解模型如何生成文字、为何出现幻觉，以及了解如何通过上下文工程将模型从“梦境”拉回现实。",
    footer: "© 2026 HCLife Education / 大模型应用课程. All rights reserved.",
    backHome: "返回首页",
    bookmarks: "章节书签",
    chapters: [
      { id: "what-is-an-llm", label: "LLM 是什么" },
      { id: "tokens-temperature", label: "Token 与 Temperature" },
      { id: "generation-example", label: "逐 Token 生成" },
      { id: "dream-brain", label: "梦境大脑" },
      { id: "model-shortfalls", label: "模型短板" },
      { id: "model-strengths", label: "模型优势" },
      { id: "context-engineering", label: "梦境回到现实" },
      { id: "task-strategies", label: "任务使用方式" },
      { id: "tool-call-protocol", label: "Tool Call" },
      { id: "course-summary", label: "总结" },
    ],
  },
  en: {
    eyebrow: "HCLife Education",
    title:
      "Course 03: Large Language Models: Generation and Capability Boundaries",
    subtitle:
      'What is the essence of an LLM? Understand how models generate text, why hallucinations occur, and how context engineering brings a model back from its "dream" to reality.',
    footer:
      "© 2026 HCLife Education / Applied LLM Academy. All rights reserved.",
    backHome: "Back Home",
    bookmarks: "Chapters",
    chapters: [
      { id: "what-is-an-llm", label: "What is an LLM?" },
      { id: "tokens-temperature", label: "Tokens and Temperature" },
      { id: "generation-example", label: "Token generation" },
      { id: "dream-brain", label: "Dreaming brain" },
      { id: "model-shortfalls", label: "Limitations" },
      { id: "model-strengths", label: "Strengths" },
      { id: "context-engineering", label: "Back to reality" },
      { id: "task-strategies", label: "Task strategies" },
      { id: "tool-call-protocol", label: "Tool Call" },
      { id: "course-summary", label: "Summary" },
    ],
  },
};

export default function ModelBoundariesPage() {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());
  const t = copy[lang];

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    setUrlLang(nextLang);
  };

  return (
    <PageChrome
      lang={lang}
      setLang={setLang}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      footer={t.footer}
      chapterNav={<CourseBookmarks label={t.bookmarks} items={t.chapters} />}
      headerAside={
        <a
          href={withLang("./index.html", lang)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backHome}
        </a>
      }
    >
      <ModelBoundariesGuide lang={lang} />
    </PageChrome>
  );
}
