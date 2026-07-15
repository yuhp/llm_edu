import { useState } from 'react';
import { ArrowLeft, BadgeCheck, Building2, Copyright, ExternalLink, Globe2, ShieldCheck } from 'lucide-react';
import PageChrome from '../components/PageChrome';
import { getInitialLang, setUrlLang, withLang } from '../lib/lang';
import { Lang } from '../types';

const copy = {
  zh: {
    eyebrow: 'HCLife Education',
    title: '版权与授权说明',
    subtitle: '说明 HCLife Education / 大模型应用课程的品牌、源站、内容版权、授权展示范围与知识共享协议。',
    footer: '© 2026 HCLife Education / 大模型应用课程. All rights reserved.',
    backHome: '返回首页',
    cards: [
      {
        icon: Globe2,
        title: '教程源站',
        body: 'hclife.edu.pl 是 HCLife Education 原创课程与文档内容的统一教程源站。',
      },
      {
        icon: Building2,
        title: '品牌标识',
        body: '本站使用 HCLife Education 作为教育内容品牌标识。',
      },
      {
        icon: Copyright,
        title: '版权归属',
        body: '本站（hclife.edu.pl）所刊载之全部原创课程及文档内容，版权归属 HCLife 所有。',
      },
      {
        icon: BadgeCheck,
        title: '授权展示',
        body: '本站内容已独家授权于公司门户（hclife.cn）和个人博客（yuhp.dev、javayu.com）展示、引用与联播。',
      },
      {
        icon: ShieldCheck,
        title: '转载限制',
        body: '未经许可，禁止任何第三方以任何形式转载、搬运、镜像、改编或用于再分发。',
      },
    ],
    licenseTitle: '知识共享协议',
    licenseBody: '除另有说明外，本站开放教程内容采用 CC BY-NC-ND 4.0（署名-非商业性使用-禁止演绎）知识共享协议。该协议允许在署名、非商业、不得演绎的前提下分享内容，但不允许商业使用或改编发布。',
    licenseLink: '查看 CC BY-NC-ND 4.0 简体中文协议',
    licenseHref: 'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans',
    contactTitle: '授权与合作',
    contactBody: '如需转载、课程合作、企业内训或其他授权使用，请先联系版权方并取得书面许可。',
    contactLabel: '联系方式',
    contactEmail: 'yuhaipeng@hclife.cn',
  },
  en: {
    eyebrow: 'HCLife Education',
    title: 'Copyright & Licensing',
    subtitle: 'Brand, source domain, copyright ownership, authorized publication channels, and Creative Commons licensing for HCLife Education.',
    footer: '© 2026 HCLife Education / Applied LLM Academy. All rights reserved.',
    backHome: 'Back Home',
    cards: [
      {
        icon: Globe2,
        title: 'Tutorial Source',
        body: 'hclife.edu.pl is the unified tutorial source for original courses and documentation under HCLife Education.',
      },
      {
        icon: Building2,
        title: 'Brand Identity',
        body: 'The site uses HCLife Education as the education brand identity.',
      },
      {
        icon: Copyright,
        title: 'Copyright Ownership',
        body: 'All original courses and documentation published on hclife.edu.pl are copyrighted by HCLife.',
      },
      {
        icon: BadgeCheck,
        title: 'Authorized Publication',
        body: 'The company portal (hclife.cn) and personal blogs (yuhp.dev and javayu.com) hold an exclusive license to display, quote, and syndicate this content.',
      },
      {
        icon: ShieldCheck,
        title: 'Reproduction Restrictions',
        body: 'Third-party reproduction, mirroring, adaptation, redistribution, or republication in any form is prohibited without permission.',
      },
    ],
    licenseTitle: 'Creative Commons License',
    licenseBody: 'Unless otherwise noted, open tutorial content is licensed under CC BY-NC-ND 4.0: Attribution, NonCommercial, NoDerivatives. This permits sharing with attribution for non-commercial purposes, but does not allow commercial use or modified redistribution.',
    licenseLink: 'View CC BY-NC-ND 4.0 License',
    licenseHref: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    contactTitle: 'Permission & Collaboration',
    contactBody: 'For republication, course collaboration, enterprise training, or other licensed uses, please contact the copyright holder and obtain written permission first.',
    contactLabel: 'Contact',
    contactEmail: 'yuhaipeng@hclife.cn',
  },
};

export default function AboutPage() {
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
      <main className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {t.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="rounded-3xl border border-slate-800 bg-slate-950/50 p-5">
                  <div className="mb-4 inline-flex rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{card.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-white">{t.licenseTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{t.licenseBody}</p>
            <a
              href={t.licenseHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
              rel="license noopener noreferrer"
              target="_blank"
            >
              {t.licenseLink}
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-white">{t.contactTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">{t.contactBody}</p>
          </section>

          <section className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold text-white">{t.contactLabel}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              <a className="font-semibold text-blue-300 transition hover:text-blue-200" href={`mailto:${t.contactEmail}`}>
                {t.contactEmail}
              </a>
            </p>
          </section>
        </aside>
      </main>
    </PageChrome>
  );
}
