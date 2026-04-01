import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

const icons = [
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export default function Infrastructure() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.inf-i'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 80%' } }); }); }); }, []);

  return (
    <section ref={ref} className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="max-w-6xl mx-auto">
        <div className="inf-i opacity-0 text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">{t.infra.title1}<span className="gold-gradient-text">{t.infra.titleGold}</span></h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{t.infra.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {t.infra.items.map((f, i) => (
            <div key={i} className="inf-i opacity-0 glass-card p-8 flex gap-5 items-start">
              <div className="text-gold shrink-0">{icons[i]}</div>
              <div><h3 className="text-lg font-bold text-white mb-2">{f.title}</h3><p className="text-white/45 text-sm leading-relaxed">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
