import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

function Counter({ end, prefix, suffix }: { end: number; prefix?: string; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { const t0 = performance.now(); const tick = (now: number) => { const p = Math.min((now - t0) / 2000, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [end]);
  return <div ref={ref} className="text-4xl md:text-5xl font-black gold-gradient-text">{prefix}{val}{suffix}</div>;
}

export default function StatsCounter() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.st-box'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%' } }); }); }); }, []);

  const items = [
    { end: 200, suffix: '+', label: t.stats.campaigns },
    { end: 150, suffix: '+', label: t.stats.businesses },
    { end: 5, suffix: 'M+', prefix: '$', label: t.stats.revenue },
    { end: 24, suffix: '/7', label: t.stats.operating },
  ];

  return (
    <section ref={ref} className="py-16 px-4" style={{ background: '#080F24' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((s, i) => <div key={i} className="st-box opacity-0"><Counter end={s.end} prefix={s.prefix} suffix={s.suffix} /><p className="text-white/35 text-sm mt-2 font-medium">{s.label}</p></div>)}
        </div>
      </div>
    </section>
  );
}
