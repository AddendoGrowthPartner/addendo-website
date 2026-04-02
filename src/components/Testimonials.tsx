import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

const imgs = [
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
];

export default function Testimonials() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.te-t'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); el.querySelectorAll('.te-c').forEach((c, i) => { gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, scrollTrigger: { trigger: el, start: 'top 70%' } }); }); }); }); }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" style={{ background: '#0A1228' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="te-t opacity-0 text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-4">{t.testimonials.title1}<span className="gold-gradient-text">{t.testimonials.titleGold}</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((te, i) => (
            <div key={i} className="te-c opacity-0 glass-card p-8 text-center">
              <img src={imgs[i]} alt={te.name} width={64} height={64} className="w-16 h-16 rounded-full mx-auto mb-5 object-cover border-2 border-gold/30" loading="lazy" />
              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{te.quote}"</p>
              <p className="text-white font-bold text-sm">{te.name}</p>
              <p className="text-gold/60 text-xs mt-1">{te.business}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
