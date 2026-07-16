import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PageChrome from '../components/PageChrome';
import { getInitialLang, setUrlLang, withLang } from '../lib/lang';
import ModelBoundariesGuide from '../modules/ModelBoundariesGuide';
import { Lang } from '../types';

const copy = {
  zh: {
    eyebrow: 'HCLife Education',
    title: '课程 03：模型、生成与能力边界',
    subtitle: '理解模型如何生成文字、为何出现幻觉，以及上下文如何将模型从“梦境”拉回现实。',
    footer: '© 2026 HCLife Education / 大模型应用课程. All rights reserved.',
    backHome: '返回首页',
  },
  en: {
    eyebrow: 'HCLife Education',
    title: 'Course 03: Models, Generation, and Capability Boundaries',
    subtitle: 'Learn how models generate text, why hallucinations occur, and how context grounds a model in reality.',
    footer: '© 2026 HCLife Education / Applied LLM Academy. All rights reserved.',
    backHome: 'Back Home',
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
      <ModelBoundariesGuide lang={lang} />
    </PageChrome>
  );
}
