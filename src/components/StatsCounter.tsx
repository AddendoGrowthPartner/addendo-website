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
  return <div ref={ref} className="text-3xl md:text-5xl font-black gold-gradient-text">{prefix}{val}{suffix}</div>;
}

const statIcons = [
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export default function StatsCounter() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.st-box'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%' } }); }); }); }, []);

  const items = [
    { end: 500, suffix: '+', label: t.stats.campaigns },
    { end: 150, suffix: '+', label: t.stats.businesses },
    { end: 100, suffix: 'M+', prefix: '$', label: t.stats.revenue },
    { end: 24, suffix: '/7', label: t.stats.operating },
  ];

  return (
    <section ref={ref} className="py-12 md:py-16 px-4" style={{ background: '#080F24' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mb-8">
          {items.map((s, i) => (
            <div key={i} className="st-box opacity-0">
              <div className="text-gold/60 flex justify-center mb-3">{statIcons[i]}</div>
              <Counter end={s.end} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-white/35 text-xs md:text-sm mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="st-box opacity-0 text-white/25 text-xs md:text-sm text-center max-w-xl mx-auto">{t.stats.proof}</p>
      </div>
    </section>
  );
}
