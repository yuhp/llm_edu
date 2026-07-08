import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PageChrome from '../components/PageChrome';
import { getInitialLang, setUrlLang, withLang } from '../lib/lang';
import ClientToolGuide from '../modules/ClientToolGuide';
import { Lang } from '../types';

const copy = {
  zh: {
    eyebrow: 'HCLife Education',
    title: '课程 02：客户端与工具驱动原理',
    subtitle: '以课程演示方式解释 Client、Agent、Skill 与 Tool Call 之间的协作机制。',
    footer: '© 2026 HCLife Education / 大模型应用课程. All rights reserved.',
    backHome: '返回首页',
  },
  en: {
    eyebrow: 'HCLife Education',
    title: 'Course 02: Client and Tool Driving Fundamentals',
    subtitle: 'This course explains how Client, Agent, Skill, and Tool Calls cooperate in a wide-screen presentation layout.',
    footer: '© 2026 HCLife Education / Applied LLM Academy. All rights reserved.',
    backHome: 'Back Home',
  },
};

export default function ClientToolsPage() {
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
      <ClientToolGuide lang={lang} />
    </PageChrome>
  );
}
