import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

export default function Process() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.pr-t'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); el.querySelectorAll('.pr-s').forEach((s, i) => { gsap.fromTo(s, { opacity: 0, x: i % 2 === 0 ? -40 : 40 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: s, start: 'top 85%' } }); }); }); }); }, []);

  return (
    <section ref={ref} id="proceso" className="section-pad relative" style={{ background: '#0A1228' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="pr-t opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20">{t.process.title1}<br /><span className="gold-gradient-text">{t.process.titleGold}</span></h2>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/15 to-transparent hidden sm:block" />
          <div className="space-y-16 md:space-y-24">
            {t.process.steps.map((s, i) => (
              <div key={i} className={`pr-s opacity-0 relative flex flex-col md:flex-row gap-6 md:gap-14 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`md:w-1/2 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-gold font-display text-6xl md:text-7xl font-black opacity-20 leading-none block">{s.num}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{s.title}</h3>
                  <p className="text-white/45 mt-3 leading-relaxed max-w-md inline-block">{s.text}</p>
                </div>
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5 bg-gold rounded-full ring-4 ring-[#0A1228] z-10" />
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
