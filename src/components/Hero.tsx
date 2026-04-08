import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

// LCP-critical image served via Cloudinary fetch (auto WebP/AVIF + resize to 1200w).
// Cloudinary descarga y cachea la imagen remota una sola vez.
// Para subirla de forma permanente: reemplazar por una URL /upload/ una vez cargada al MCC.
const HERO_BG = 'https://res.cloudinary.com/dokzw376u/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1460925895917-afdab827c52f';

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
    });

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [isMobile]);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8rem', paddingBottom: '4rem', background: '#080F24' }}>
      {/* Background image */}
      <img
        src={HERO_BG}
        alt=""
        width={1200}
        height={800}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(8,15,36,0.95) 0%, rgba(8,15,36,0.85) 50%, rgba(8,15,36,0.75) 100%)',
        zIndex: 1,
      }} />

      {/* Particle canvas */}
      {!isMobile && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />}

      {/* Tech background decorations */}
      <div className="hero-tech-bg" style={{ zIndex: 2 }} />
      <div className="hero-tech-dots" style={{ zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }} className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-4">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">{t.hero.badge}</span>
        </div>

        <h1 className="hero-h1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-tight">
          {t.hero.title1}
          <br className="hidden sm:block" />
          <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t.hero.titleGold}</span>
          {t.hero.title2 && <>{' '}<br className="hidden sm:block" /><span className="text-white/90">{t.hero.title2}</span></>}
        </h1>

        <p className="hero-p text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mt-4">{t.hero.subtitle}</p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <a href="#contacto" className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#D4B96A] text-[#080F24] font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-base md:text-lg">
            {t.hero.cta}
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <p className="text-white/30 text-sm max-w-xs">{t.hero.ctaSub}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 pt-12 border-t border-[#C9A84C]/20">
          <div className="text-center">
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', color: '#C9A84C' }}>500+</div>
            <div className="text-gray-400 text-sm">{t.stats.campaigns}</div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', color: '#C9A84C' }}>150+</div>
            <div className="text-gray-400 text-sm">{t.stats.businesses}</div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', color: '#C9A84C' }}>$100M+</div>
            <div className="text-gray-400 text-sm">{t.stats.revenue}</div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #080F24, transparent)', zIndex: 3 }} />
    </section>
  );
}
