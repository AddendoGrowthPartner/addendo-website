import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/context';

const LOGO = 'https://res.cloudinary.com/dokzw376u/image/upload/v1775016113/VECTOR_ADDENDO_FINAL-removebg-preview_w97pwl.png';

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.servicios, href: '#servicios' },
    { label: t.nav.proceso, href: '#proceso' },
    { label: t.nav.nosotros, href: '#por-que' },
    { label: t.nav.contacto, href: '#contacto' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-300 h-16 md:h-20 ${scrolled ? 'bg-[#080F24]/95 backdrop-blur-xl shadow-2xl shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        <a href="#" className="flex items-center">
          <img
            src={LOGO}
            alt="Addendo Growth Partner"
            className="max-w-[150px] max-h-[48px] md:max-w-[160px] md:max-h-[52px] w-auto h-auto object-contain"
            loading="eager"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white transition-colors text-base font-medium tracking-[0.05em] uppercase">{l.label}</a>
          ))}
          <div className="flex items-center border border-white/10 rounded-full px-1 py-0.5 ml-1">
            <button onClick={() => setLang('es')} className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${lang === 'es' ? 'bg-gold text-[#080F24]' : 'text-white/40 hover:text-white'}`}>ES</button>
            <button onClick={() => setLang('en')} className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-[#080F24]' : 'text-white/40 hover:text-white'}`}>EN</button>
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
            <button onClick={() => setLang('es')} className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${lang === 'es' ? 'bg-gold text-[#080F24]' : 'border border-white/20 text-white/50'}`}>ES</button>
            <button onClick={() => setLang('en')} className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${lang === 'en' ? 'bg-gold text-[#080F24]' : 'border border-white/20 text-white/50'}`}>EN</button>
          </div>
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-gold !text-sm block text-center mt-4">{t.nav.cta}</a>
        </div>
      </div>
    </nav>
  );
}
