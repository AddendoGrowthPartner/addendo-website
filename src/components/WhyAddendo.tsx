import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';
import { FiLayers, FiGlobe, FiCheckCircle, FiClock, FiZap, FiUsers } from 'react-icons/fi';
import type { IconType } from 'react-icons';

const E1 = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200';
const E2 = 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200';

const icons: IconType[] = [FiLayers, FiGlobe, FiCheckCircle, FiClock, FiZap, FiUsers];

export default function WhyAddendo() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.w-t'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); el.querySelectorAll('.w-c').forEach((c, i) => { gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, scrollTrigger: { trigger: c, start: 'top 92%' } }); }); gsap.fromTo(el.querySelector('.w-pr'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el.querySelector('.w-pr'), start: 'top 90%' } }); }); }); }, []);

  return (
    <section ref={ref} id="por-que" className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[130px]" />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="w-t opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-10">{t.why.title1}<br /><span className="gold-gradient-text">{t.why.titleGold}</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {t.why.items.map((r, i) => {
            const Icon = icons[i];
            return (
            <div key={i} className="w-c opacity-0 glass-card p-7">
              <div className="text-gold mb-4"><Icon size={32} color="#C9A84C" /></div>
              <h3 className="text-lg font-bold text-white mb-3">{r.title}</h3>
              <p className="text-white/45 leading-relaxed text-sm">{r.text}</p>
            </div>
            );
          })}
        </div>
        <div className="w-pr opacity-0 flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="flex -space-x-3">
            <img src={E1} alt="" className="w-11 h-11 rounded-full border-2 border-[#080F24] object-cover" loading="lazy" />
            <img src={E2} alt="" className="w-11 h-11 rounded-full border-2 border-[#080F24] object-cover" loading="lazy" />
            <div className="w-11 h-11 rounded-full border-2 border-[#080F24] bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">+50</div>
          </div>
          <p className="text-white/35 text-sm">{t.why.proof}</p>
        </div>
      </div>
    </section>
  );
}
