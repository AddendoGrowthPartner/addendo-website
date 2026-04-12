import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';
import { lazyGsap } from '../lib/lazyGsap';

export default function ClientLogos() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => lazyGsap(ref.current, (gsap) => { const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.cl-i'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 92%' } }); }), []);

  return (
    <section ref={ref} className="py-10 px-4" style={{ background: '#080F24' }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="cl-i opacity-0 text-white/25 text-xs uppercase tracking-[0.2em] mb-8 font-semibold">{t.clients.label}</p>
        <div className="cl-i opacity-0 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {['Don Jacinto', 'CreditBridge', 'Ciudad Maderas', 'Bebé Genial', 'Neuron Kids'].map(n => (
            <span key={n} className="px-5 py-2.5 rounded-full border border-gold/30 bg-gold/[0.05] text-white/70 font-bold text-xs md:text-sm tracking-widest uppercase hover:border-gold/50 hover:text-white/90 transition-all duration-300">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
