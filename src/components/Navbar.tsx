import { useState } from 'react';
import { useI18n } from '../i18n/context';

// Map a current pathname to its counterpart in the other language.
// Blog posts have no 1:1 homolog between languages (per editorial decision),
// so they fall back to the blog listing in the target language.
function alternatePathFor(path: string, target: 'es' | 'en'): string {
  const clean = path.replace(/\/$/, '') || '/';
  const isEn = clean === '/en' || clean.startsWith('/en/');
  if (target === 'en') {
    if (isEn) return path;
    if (clean === '/') return '/en/';
    if (clean === '/blog' || clean.startsWith('/blog/')) {
      // No per-post English counterpart → take user to the EN blog listing.
      return clean === '/blog' ? '/en/blog/' : '/en/blog/';
    }
    return '/en' + clean + '/';
  }
  // target === 'es'
  if (!isEn) return path;
  if (clean === '/en') return '/';
  const stripped = clean.replace(/^\/en/, '');
  if (stripped === '/blog' || stripped.startsWith('/blog/')) {
    return '/blog';
  }
  return stripped || '/';
}

export default function Navbar() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  const switchLang = (target: 'es' | 'en') => {
    if (target === lang) return;
    if (typeof window === 'undefined') return;
    const href = alternatePathFor(window.location.pathname, target);
    window.location.href = href;
  };

  const links = [
    { label: t.nav.servicios, href: '#servicios' },
    { label: t.nav.proceso, href: '#proceso' },
    { label: t.nav.nosotros, href: '#por-que' },
    { label: t.nav.blog, href: lang === 'en' ? '/en/blog/' : '/blog' },
    { label: t.nav.contacto, href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 bg-[#080F24]/90 backdrop-blur-md border-b border-[#C9A84C]/10 transition-all duration-300">
      <div className="flex items-center justify-between h-24 px-6 md:px-10 max-w-7xl mx-auto">
        <a href={lang === 'en' ? '/en/' : '/'} aria-label="Addendo Growth Partner" className="flex flex-col leading-none shrink-0">
          <span style={{ fontFamily: "'Teko', 'Teko Fallback', 'Impact', sans-serif", fontSize: '38px', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.14em', lineHeight: 1 }}>ADDENDO</span>
          <span style={{ fontFamily: "'Inter', 'Inter Fallback', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3em', marginTop: '2px' }}>GROWTH PARTNER</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white transition-colors text-base font-medium tracking-[0.05em] uppercase">{l.label}</a>
          ))}
          <div className="flex items-center border border-white/10 rounded-full px-1 py-0.5 ml-1">
            <button onClick={() => switchLang('es')} aria-label="Cambiar idioma a español" aria-pressed={lang === 'es'} className={`text-xs font-bold px-3 py-1.5 min-h-[36px] min-w-[36px] rounded-full transition-all ${lang === 'es' ? 'bg-gold text-[#080F24]' : 'text-white/40 hover:text-white'}`}>ES</button>
            <button onClick={() => switchLang('en')} aria-label="Switch language to English" aria-pressed={lang === 'en'} className={`text-xs font-bold px-3 py-1.5 min-h-[36px] min-w-[36px] rounded-full transition-all ${lang === 'en' ? 'bg-gold text-[#080F24]' : 'text-white/40 hover:text-white'}`}>EN</button>
          </div>
          <a href="#contacto" className="btn-gold !py-2.5 !px-7 !text-sm">{t.nav.cta}</a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#080F24]/98 backdrop-blur-xl px-6 py-6 space-y-4 border-t border-white/10">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-white/80 hover:text-gold transition-colors text-base font-medium">{l.label}</a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => switchLang('es')} aria-label="Cambiar idioma a español" aria-pressed={lang === 'es'} className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${lang === 'es' ? 'bg-gold text-[#080F24]' : 'border border-white/20 text-white/50'}`}>ES</button>
            <button onClick={() => switchLang('en')} aria-label="Switch language to English" aria-pressed={lang === 'en'} className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-[#080F24]' : 'border border-white/20 text-white/50'}`}>EN</button>
          </div>
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-gold !text-sm block text-center mt-4">{t.nav.cta}</a>
        </div>
      </div>
    </nav>
  );
}
