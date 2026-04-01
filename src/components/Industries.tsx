import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';
import { FaHospital, FaHouse, FaUtensils, FaGavel, FaCartShopping, FaGraduationCap, FaDollarSign, FaShirt } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

const industryIcons: IconType[] = [
  FaHospital,
  FaHouse,
  FaUtensils,
  FaGavel,
  FaCartShopping,
  FaGraduationCap,
  FaDollarSign,
  FaShirt,
];

export default function Industries() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.ind-t'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); el.querySelectorAll('.ind-c').forEach((c, i) => { gsap.fromTo(c, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: i * 0.06, scrollTrigger: { trigger: el, start: 'top 70%' } }); }); }); }); }, []);

  return (
    <section ref={ref} className="section-pad relative" style={{ background: '#0A1228' }}>
      <div className="max-w-6xl mx-auto">
        <div className="ind-t opacity-0 text-center mb-14">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4">{t.industries.title1}<span className="gold-gradient-text">{t.industries.titleGold}</span></h2>
          <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto">{t.industries.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.industries.items.map((name: string, i: number) => {
            const Icon = industryIcons[i];
            return (
              <div key={i} className="ind-c opacity-0 glass-card p-6 text-center group cursor-default">
                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={48} color="#C9A84C" />
                </div>
                <p className="text-white/60 group-hover:text-white text-sm font-semibold transition-colors">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
