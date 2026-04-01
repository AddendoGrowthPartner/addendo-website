import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

const TEAM = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200';
const MEET = 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600';

export default function Solution() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.s-a'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } }); gsap.fromTo(el.querySelector('.s-imgs'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1, scrollTrigger: { trigger: el.querySelector('.s-imgs'), start: 'top 80%' } }); }); }); }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" style={{ background: '#080F24' }}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="s-imgs opacity-0 relative order-2 lg:order-none max-w-[400px] mx-auto lg:max-w-none">
            <div className="rounded-xl overflow-hidden border-2 border-gold/20 shadow-2xl"><img src={TEAM} alt={t.solution.imgAlt1} className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover" loading="lazy" decoding="async" /></div>
            <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-xl overflow-hidden border-4 border-[#080F24] shadow-xl hidden lg:block"><img src={MEET} alt={t.solution.imgAlt2} className="w-full h-full object-cover" loading="lazy" /></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/25 rounded-xl hidden lg:block" />
          </div>
          <div>
            <h2 className="s-a opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight">{t.solution.title1}<br /><span className="gold-gradient-text">{t.solution.titleGold}</span></h2>
            <p className="s-a opacity-0 text-lg md:text-xl text-white/50 mb-8 leading-relaxed">{t.solution.text}</p>
            <p className="s-a opacity-0 text-2xl md:text-3xl font-bold text-white">{t.solution.thatis}</p>
          </div>
        </div>
        <div className="s-a opacity-0 glass-card p-8 md:p-12 max-w-3xl mx-auto text-center">
          <div className="space-y-4 text-lg md:text-xl text-white/60">
            <p>{t.solution.noPrefix}<span className="line-through text-white/25">{t.solution.no1}</span>. {t.solution.noPrefix}<span className="line-through text-white/25">{t.solution.no2}</span>. {t.solution.noPrefix}<span className="line-through text-white/25">{t.solution.no3}</span>.</p>
            <p className="text-2xl md:text-3xl font-bold text-gold pt-4">{t.solution.result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
