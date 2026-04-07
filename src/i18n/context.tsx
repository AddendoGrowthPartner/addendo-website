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
    const stored = localStorage.getItem('addendo-lang') as Lang | null;
    if (stored && (stored === 'es' || stored === 'en')) {
      setLangState(stored);
      return;
    }
    const browserLang = navigator.language || '';
    if (browserLang.startsWith('es')) {
      setLangState('es');
    } else {
      setLangState('en');
    }
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
