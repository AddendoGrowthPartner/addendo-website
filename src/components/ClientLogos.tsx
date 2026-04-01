import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

export default function ClientLogos() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.cl-i'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 92%' } }); }); }); }, []);

  return (
    <section ref={ref} className="py-10 px-4" style={{ background: '#080F24' }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="cl-i opacity-0 text-white/25 text-xs uppercase tracking-[0.2em] mb-8 font-semibold">{t.clients.label}</p>
        <div className="cl-i opacity-0 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {['Don Jacinto', 'CreditBridge', 'Ciudad Maderas', 'Bebé Genial', 'Neuron Kids'].map(n => (
            <span key={n} className="text-white/[0.12] font-bold text-base md:text-lg tracking-widest uppercase hover:text-white/25 transition-colors duration-500">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
