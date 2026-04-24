import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import es from './es';
import en from './en';

type Lang = 'es' | 'en';
type Translations = typeof es;

interface I18nCtx {
  t: Translations;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nCtx>({ t: es, lang: 'es', setLang: () => {} });

interface I18nProviderProps {
  children: ReactNode;
  initialLang?: Lang;
}

export function I18nProvider({ children, initialLang = 'es' }: I18nProviderProps) {
  // Initial state comes from the Astro-provided prop so SSR and first client
  // render agree (no hydration mismatch). The source of truth for language is
  // the URL path (/en/* vs everything else), which Astro resolves at build
  // time and passes down.
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Cross-island sync: if any I18nProvider dispatches a language change (e.g.
  // a widget that toggles inline without navigation), keep the others aligned.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'es' || detail === 'en') setLangState(detail);
    };
    window.addEventListener('addendo-lang-change', handler);
    return () => window.removeEventListener('addendo-lang-change', handler);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.dispatchEvent(new CustomEvent('addendo-lang-change', { detail: l }));
  };

  const t = lang === 'es' ? es : en;

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
