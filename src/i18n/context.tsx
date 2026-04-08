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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    // Resolve initial language — storage wins, otherwise navigator lang.
    const stored = localStorage.getItem('addendo-lang') as Lang | null;
    let detected: Lang;
    if (stored && (stored === 'es' || stored === 'en')) {
      detected = stored;
    } else {
      const browserLang = (navigator.language || '').toLowerCase();
      detected = browserLang.startsWith('es') ? 'es' : 'en';
      localStorage.setItem('addendo-lang', detected);
    }
    setLangState(detected);
    // Propagate to static .astro islands that listen for this event.
    document.documentElement.setAttribute('data-lang', detected);
    window.dispatchEvent(new CustomEvent('addendo-lang-change', { detail: detected }));
  }, []);

  // Keep multiple I18nProvider instances (one per React island) in sync: when
  // one island triggers a language change, the others update their state too.
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
    localStorage.setItem('addendo-lang', l);
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
