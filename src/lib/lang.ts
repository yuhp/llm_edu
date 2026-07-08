import { Lang } from '../types';

export function getInitialLang(): Lang {
  const lang = new URLSearchParams(window.location.search).get('lang');
  if (lang === 'zh' || lang === 'en') {
    console.log('[lang]', { source: 'url', lang });
    return lang;
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const primaryLanguage = browserLanguages[0]?.toLowerCase() ?? '';
  const prefersSimplifiedChinese =
    primaryLanguage === 'zh-cn' ||
    primaryLanguage === 'zh-hans' ||
    primaryLanguage.startsWith('zh-hans-') ||
    primaryLanguage === 'zh-sg';

  const detectedLang = prefersSimplifiedChinese ? 'zh' : 'en';
  console.log('[lang]', { source: 'browser', browserLanguages, primaryLanguage, lang: detectedLang });
  return detectedLang;
}

export function setUrlLang(lang: Lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url.toString());
}

export function withLang(href: string, lang: Lang) {
  return `${href}?lang=${lang}`;
}
