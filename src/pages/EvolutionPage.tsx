import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PageChrome from '../components/PageChrome';
import { getInitialLang, setUrlLang, withLang } from '../lib/lang';
import ArchitectureEvolution from '../modules/ArchitectureEvolution';
import { Lang } from '../types';

const copy = {
  zh: {
    eyebrow: 'HCLife Education',
    title: '课程 01：LLM 应用架构演进',
    subtitle: '从单轮调用到多智能体协作，理解 LLM 应用如何一步步走向更完整的工程系统。',
    footer: '© 2026 HCLife Education / 大模型应用课程. All rights reserved.',
    backHome: '返回首页',
  },
  en: {
    eyebrow: 'HCLife Education',
    title: 'Course 01: LLM Application Architecture Evolution',
    subtitle: 'From single-call inference to multi-agent collaboration, this course explains how LLM applications evolve into fuller engineering systems.',
    footer: '© 2026 HCLife Education / Applied LLM Academy. All rights reserved.',
    backHome: 'Back Home',
  },
};

export default function EvolutionPage() {
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
      headerAside={
        <a
          href={withLang('./index.html', lang)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backHome}
        </a>
      }
    >
      <ArchitectureEvolution lang={lang} />
    </PageChrome>
  );
}
