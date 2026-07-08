import { useState } from 'react';
import { ArrowRight, BookOpen, Layers3, Sparkles, Workflow } from 'lucide-react';
import PageChrome from '../components/PageChrome';
import { getInitialLang, setUrlLang, withLang } from '../lib/lang';
import { Lang } from '../types';

const copy = {
  zh: {
    eyebrow: 'HCLife Education',
    title: '大模型应用课程',
    subtitle: '从原理到工程实践',
    tagline: '从提示词到生产力 · Prompt to Product',
    coursesTitle: '精选课程',
    enterCourse: '进入课程',
    courseIntroTitle: '课程导览',
    footer: '© 2026 HCLife Education / 大模型应用课程. All rights reserved.',
    homeLead: '这是一个围绕 LLM 与 Agent 的知识课程演示网站。首页用于整站介绍与课程分发，进入课程后提供更宽的沉浸式阅读和演示空间。',
    moduleCards: {
      evolution: {
        title: '课程 01：LLM 应用架构演进',
        desc: '从单轮调用到多智能体协作的能力跃迁。',
        level: '课程 01',
        outcomes: ['理解 LLM 能力边界', '看懂 Tool Call 与 Agent 演进', '掌握多智能体协同全景'],
        href: './evolution.html',
      },
      'client-tools': {
        title: '课程 02：客户端与工具驱动原理',
        desc: '解释 Client、Agent、Skill、Tool Call 的协作机制。',
        level: '课程 02',
        outcomes: ['建立 Client 与 LLM 边界感', '理解 Agent / Skill 解耦', '看懂真实执行链路'],
        href: './client-tools.html',
      },
    },
  },
  en: {
    eyebrow: 'HCLife Education',
    title: 'Applied LLM Academy',
    subtitle: 'From Principles to Engineering Practice',
    tagline: 'Prompt to Product',
    coursesTitle: 'Featured Courses',
    enterCourse: 'Open Course',
    courseIntroTitle: 'Course Overview',
    footer: '© 2026 HCLife Education / Applied LLM Academy. All rights reserved.',
    homeLead: 'This is a course-style knowledge site for LLM and Agent education. The homepage introduces the academy and routes readers into individual courses with wider, presentation-friendly layouts.',
    moduleCards: {
      evolution: {
        title: 'Course 01: LLM Application Architecture Evolution',
        desc: 'The progression from single-call inference to multi-agent collaboration.',
        level: 'Course 01',
        outcomes: ['Understand LLM capability boundaries', 'Read the evolution from tool calls to agents', 'Build a full picture of multi-agent collaboration'],
        href: './evolution.html',
      },
      'client-tools': {
        title: 'Course 02: Client and Tool Driving Fundamentals',
        desc: 'How Client, Agent, Skill, and Tool Calls work together.',
        level: 'Course 02',
        outcomes: ['Build boundary awareness between client and model', 'Understand Agent / Skill decoupling', 'Follow the real execution chain'],
        href: './client-tools.html',
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
      accent: 'blue',
    },
    {
      icon: <Layers3 className="h-5 w-5" />,
      title: t.moduleCards['client-tools'].title,
      desc: t.moduleCards['client-tools'].desc,
      level: t.moduleCards['client-tools'].level,
      outcomes: t.moduleCards['client-tools'].outcomes,
      href: withLang(t.moduleCards['client-tools'].href, lang),
      accent: 'emerald',
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
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            <BookOpen className="h-4 w-4 text-blue-400" />
            {t.courseIntroTitle}
          </div>
          <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 shadow-[0_0_40px_rgba(59,130,246,0.12)]">
            {t.tagline}
          </div>
          <p className="mb-6 max-w-3xl text-sm leading-7 text-slate-500 md:text-base">{t.homeLead}</p>
          <div className="grid gap-5 xl:grid-cols-2">
            {modules.map((module) => (
              <article key={module.href} className="group overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/60">
                <div className={`relative p-6 md:p-7 ${module.accent === 'blue' ? 'bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_38%)]' : 'bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_38%)]'}`}>
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/10" />
                    <div className="absolute right-14 top-14 h-12 w-12 rounded-full border border-white/10" />
                  </div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${module.accent === 'blue' ? 'border-blue-500/30 bg-blue-500/10 text-blue-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                        {module.level}
                      </div>
                      <div className="mb-4 flex items-center gap-3 text-white">
                        <span className={`rounded-xl border border-white/10 bg-slate-900/60 p-3 ${module.accent === 'blue' ? 'text-blue-300' : 'text-emerald-300'}`}>{module.icon}</span>
                        <span className="text-2xl font-semibold">{module.title}</span>
                      </div>
                    </div>
                    <div className="hidden rounded-2xl border border-white/10 bg-slate-900/50 p-3 text-slate-500 lg:block">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="relative max-w-xl text-sm leading-7 text-slate-400 md:text-base">{module.desc}</p>

                  <div className="relative mt-6 grid gap-3 md:grid-cols-3">
                    {module.outcomes.map((outcome: string, index: number) => (
                      <div key={outcome} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                        <div className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${module.accent === 'blue' ? 'text-blue-400' : 'text-emerald-400'}`}>0{index + 1}</div>
                        <div className="text-sm leading-6 text-slate-300">{outcome}</div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Preview</div>
                      <div className="mt-2 text-sm text-slate-300">
                      {module.accent === 'blue'
                          ? (lang === 'zh' ? '阶段切换 + 动态拓扑可视化 + 演进讲解' : 'Stage switching, animated topology, and guided evolution walkthrough')
                          : (lang === 'zh' ? '宽屏执行台 + Tool Call 分类 + 编排流程' : 'Wide execution desk, tool-call taxonomy, and orchestration flow')}
                      </div>
                    </div>
                    <a
                      href={module.href}
                      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition group-hover:translate-x-0.5 ${module.accent === 'blue' ? 'border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'}`}
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

        <aside className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">{t.coursesTitle}</div>
          <div className="space-y-3">
            {modules.map((module) => (
              <a
                key={module.href}
                href={module.href}
                className="block rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-left transition hover:bg-slate-800/60"
              >
                <div className="mb-2 flex items-center gap-3 text-white">
                  <span className={`rounded-xl border border-white/10 bg-slate-900/60 p-2 ${module.accent === 'blue' ? 'text-blue-300' : 'text-emerald-300'}`}>{module.icon}</span>
                  <span className="font-semibold">{module.title}</span>
                </div>
                <p className="text-sm leading-6 text-slate-400">{module.desc}</p>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </PageChrome>
  );
}
