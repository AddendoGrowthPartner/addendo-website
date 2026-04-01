import { useEffect, useRef, useState } from 'react';

const stats = [
  { end: 200, suffix: '+', label: 'Campanas lanzadas' },
  { end: 150, suffix: '+', label: 'Negocios transformados' },
  { end: 5, suffix: 'M+', prefix: '$', label: 'Revenue generado' },
  { end: 24, suffix: '/7', label: 'Operando sin parar' },
];

function Counter({ end, prefix, suffix }: { end: number; prefix?: string; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const dur = 2000;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          start = Math.round(ease * end);
          setVal(start);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return <div ref={ref} className="text-4xl md:text-5xl font-black gold-gradient-text">{prefix}{val}{suffix}</div>;
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('.stat-box'), { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 relative" style={{ background: '#080F24' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="stat-box opacity-0">
              <Counter end={s.end} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-white/35 text-sm mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
