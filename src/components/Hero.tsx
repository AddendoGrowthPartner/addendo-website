import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

const HERO_IMG_SM = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80';
const HERO_IMG_LG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';

export default function Hero() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const P: Array<{ x: number; y: number; vx: number; vy: number; s: number; a: number }> = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++) P.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, s: Math.random() * 2.5 + 0.5, a: Math.random() * 0.5 + 0.1 });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      P.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.a})`; ctx.fill(); });
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y); if (d < 140) { ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - d / 140)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }
      raf = requestAnimationFrame(draw);
    };
    draw();

    import('gsap').then(({ gsap }) => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
      gsap.fromTo('.hero-h1', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, delay: 0.5, ease: 'power3.out' });
      gsap.fromTo('.hero-p', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' });
      gsap.fromTo('.hero-img', { opacity: 0, scale: 0.88, x: 60 }, { opacity: 1, scale: 1, x: 0, duration: 1.3, delay: 0.5, ease: 'power3.out' });
    });

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center" style={{ background: '#080F24' }}>
      {!isMobile && <canvas ref={canvasRef} className="absolute inset-0 z-0" />}
      <div className="hero-tech-bg" />
      <div className="hero-tech-dots" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080F24] via-[#080F24]/85 to-[#080F24] z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[600px]">
          {/* Text column */}
          <div className="flex-1">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-semibold uppercase tracking-wider">{t.hero.badge}</span>
            </div>

            <h1 className="hero-h1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6 md:mb-8">
              {t.hero.title1}
              <br className="hidden sm:block" />
              <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t.hero.titleGold}</span>
              {t.hero.title2 && <>{' '}<br className="hidden sm:block" /><span className="text-white/90">{t.hero.title2}</span></>}
            </h1>

            <p className="hero-p text-base sm:text-xl text-white/55 max-w-xl mb-8 md:mb-10 leading-relaxed">{t.hero.subtitle}</p>

            <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a href="#contacto" className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#D4B96A] text-[#080F24] font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-base md:text-lg">
                {t.hero.cta}
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <p className="text-white/30 text-sm max-w-xs">{t.hero.ctaSub}</p>
            </div>
          </div>

          {/* Image column */}
          <div className="hero-img flex-1 w-full">
            <div className="rounded-2xl overflow-hidden border-2 border-gold/25 shadow-2xl shadow-gold/10">
              <picture>
                <source media="(max-width: 767px)" srcSet={HERO_IMG_SM} />
                <source media="(min-width: 768px)" srcSet={HERO_IMG_LG} />
                <img src={HERO_IMG_LG} alt={t.hero.imgAlt} width={800} height={500} className="w-full rounded-2xl object-cover object-center h-[300px] lg:h-[500px]" loading="eager" fetchPriority="high" decoding="async" />
              </picture>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080F24] to-transparent z-10" />
    </section>
  );
}
