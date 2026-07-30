import { ReactNode, useEffect } from "react";
import { Globe2, Sparkles } from "lucide-react";
import { Lang } from "../types";

interface PageChromeProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
  children: ReactNode;
  headerAside?: ReactNode;
  chapterNav?: ReactNode;
}

const legalCopy = {
  zh: {
    sourceLabel: "教程源站",
    sourceDomain: "hclife.edu.pl",
    about: "版权与授权说明",
    ccLink: "CC BY-NC-ND 4.0",
    ccHref: "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans",
  },
  en: {
    sourceLabel: "Tutorial source",
    sourceDomain: "hclife.edu.pl",
    about: "Copyright & Licensing",
    ccLink: "CC BY-NC-ND 4.0",
    ccHref: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  },
};

export default function PageChrome({
  lang,
  setLang,
  eyebrow,
  title,
  subtitle,
  footer,
  children,
  headerAside,
  chapterNav,
}: PageChromeProps) {
  const legal = legalCopy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = `${title} | HCLife Education`;
  }, [lang, title]);

  return (
    <div className="min-h-screen px-4 py-6 text-slate-200 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1680px] space-y-6">
        <header className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-6 backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                <Sparkles className="h-4 w-4 text-blue-400" />
                {eyebrow}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4 xl:items-end">
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 p-1">
                <div className="rounded-full px-3 text-slate-500">
                  <Globe2 className="h-4 w-4" />
                </div>
                <button
                  onClick={() => setLang("zh")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${lang === "zh" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  中文
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${lang === "en" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  EN
                </button>
              </div>
              {headerAside}
            </div>
          </div>
        </header>

        {chapterNav}

        {children}

        <footer className="rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-5 text-sm text-slate-400">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="font-semibold text-slate-300">{footer}</div>
              <div>
                {legal.sourceLabel}:{" "}
                <span className="font-medium text-slate-300">
                  {legal.sourceDomain}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 leading-6 lg:justify-end lg:text-right">
              <a
                className="font-semibold text-slate-300 underline-offset-4 hover:underline"
                href={`./about.html?lang=${lang}`}
              >
                {legal.about}
              </a>
              <span className="hidden text-slate-700 sm:inline">/</span>
              <span>
                <a
                  href={legal.ccHref}
                  className="font-semibold text-blue-300 underline-offset-4 hover:underline"
                  rel="license noopener noreferrer"
                  target="_blank"
                >
                  {legal.ccLink}
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
