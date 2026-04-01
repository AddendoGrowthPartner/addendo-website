import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

const catIcons = [
  'https://cdn.simpleicons.org/googleads',
  'https://cdn.simpleicons.org/google',
  'https://cdn.simpleicons.org/instagram',
  'https://cdn.simpleicons.org/figma',
  'https://cdn.simpleicons.org/whatsapp',
  'https://cdn.simpleicons.org/googleanalytics',
  'https://cdn.simpleicons.org/google',
];

// Per-service icons mapped by category index → service index
const serviceIcons: Record<number, Record<number, string>> = {
  // Publicidad Digital
  0: {
    0: 'https://cdn.simpleicons.org/googleads',
    1: 'https://cdn.simpleicons.org/meta',
    2: 'https://cdn.simpleicons.org/tiktok',
    3: 'https://cdn.simpleicons.org/youtube',
    4: 'https://cdn.simpleicons.org/linkedin',
  },
  // Presencia Orgánica
  1: {
    0: 'https://cdn.simpleicons.org/google',
    1: 'https://cdn.simpleicons.org/google',
    2: 'https://cdn.simpleicons.org/googlemybusiness',
    3: 'https://cdn.simpleicons.org/googlesearchconsole',
  },
  // Redes Sociales
  2: {
    0: 'https://cdn.simpleicons.org/facebook',
    1: 'https://cdn.simpleicons.org/instagram',
    2: 'https://cdn.simpleicons.org/tiktok',
    3: 'https://cdn.simpleicons.org/youtube',
    4: 'https://cdn.simpleicons.org/linkedin',
  },
  // Contenido y Diseño
  3: {
    0: 'https://cdn.simpleicons.org/youtube',
    1: 'https://cdn.simpleicons.org/figma',
    2: 'https://cdn.simpleicons.org/figma',
    3: 'https://cdn.simpleicons.org/google',
    4: 'https://cdn.simpleicons.org/gmail',
  },
  // Ventas y CRM
  4: {
    0: 'https://cdn.simpleicons.org/hubspot',
    1: 'https://cdn.simpleicons.org/hubspot',
    2: 'https://cdn.simpleicons.org/hubspot',
    3: 'https://cdn.simpleicons.org/whatsapp',
    4: 'https://cdn.simpleicons.org/stripe',
  },
  // Estrategia y Analytics
  5: {
    0: 'https://cdn.simpleicons.org/googleanalytics',
    1: 'https://cdn.simpleicons.org/googleanalytics',
    2: 'https://cdn.simpleicons.org/looker',
    3: 'https://cdn.simpleicons.org/googletagmanager',
    4: 'https://cdn.simpleicons.org/googleanalytics',
  },
  // Reputación y PR
  6: {
    0: 'https://cdn.simpleicons.org/google',
    1: 'https://cdn.simpleicons.org/google',
    2: 'https://cdn.simpleicons.org/whatsapp',
  },
};

function ServiceIcon({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  return <img src={src} alt="" width={32} height={32} className="w-8 h-8 object-contain" onError={() => setFailed(true)} />;
}

export default function Services() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.svc-t'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); gsap.fromTo(el.querySelector('.svc-tabs'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } }); gsap.fromTo(el.querySelector('.svc-c'), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: el, start: 'top 70%' } }); }); }); }, []);

  const cats = t.services.categories;
  const cat = cats[active];

  return (
    <section ref={ref} id="servicios" className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto">
        <div className="svc-t opacity-0 text-center mb-14">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4">{t.services.title1}<span className="gold-gradient-text">{t.services.titleGold}</span></h2>
          <p className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
        <div className="svc-tabs opacity-0 flex flex-wrap justify-center gap-2 mb-12">
          {cats.map((c: any, i: number) => (
            <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${active === i ? 'bg-gold text-[#080F24] shadow-lg shadow-gold/20' : 'bg-white/[0.04] text-white/50 hover:text-white/80 hover:bg-white/[0.08] border border-white/[0.06]'}`}>
              <img src={catIcons[i]} alt="" className="w-4 h-4 md:w-5 md:h-5 object-contain" style={active === i ? { filter: 'brightness(0)' } : undefined} />
              <span className="hidden sm:inline">{c.name}</span>
            </button>
          ))}
        </div>
        <div className="svc-c opacity-0">
          <div className="text-center mb-8"><h3 className="text-xl md:text-3xl font-bold text-white">{cat.name}</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.services.map((s: any, i: number) => (
              <div key={i} className="glass-card p-5 md:p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="group-hover:scale-110 transition-transform">
                    <ServiceIcon src={serviceIcons[active]?.[i]} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.badge === 'Premium' ? 'bg-gold/15 text-gold' : 'bg-white/[0.06] text-white/40'}`}>{s.badge}</span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-white mb-2">{s.name}</h4>
                <p className="text-white/45 text-xs md:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
