import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';
import { lazyGsap } from '../lib/lazyGsap';
import { FaGoogle, FaMeta, FaTiktok, FaLinkedin, FaYoutube, FaInstagram, FaFacebook, FaWhatsapp, FaStripe } from 'react-icons/fa6';
import { SiGoogleads, SiGoogleanalytics, SiGoogletagmanager, SiGooglemaps, SiGmail, SiFigma, SiLooker, SiHubspot } from 'react-icons/si';
import type { IconType } from 'react-icons';

// Category tab icons
const catIcons: { icon: IconType; color: string }[] = [
  { icon: SiGoogleads, color: '#4285F4' },
  { icon: FaGoogle, color: '#4285F4' },
  { icon: FaInstagram, color: '#E4405F' },
  { icon: SiFigma, color: '#F24E1E' },
  { icon: FaWhatsapp, color: '#25D366' },
  { icon: SiGoogleanalytics, color: '#E37400' },
  { icon: FaGoogle, color: '#4285F4' },
];

// Per-service icons: [catIndex][serviceIndex]
const serviceIcons: Record<number, { icon: IconType; color: string }[]> = {
  0: [ // Publicidad Digital
    { icon: SiGoogleads, color: '#4285F4' },
    { icon: FaMeta, color: '#0081FB' },
    { icon: FaTiktok, color: '#ffffff' },
    { icon: FaYoutube, color: '#FF0000' },
    { icon: FaLinkedin, color: '#0A66C2' },
    { icon: FaGoogle, color: '#4285F4' },
  ],
  1: [ // Presencia Orgánica
    { icon: FaGoogle, color: '#4285F4' },
    { icon: FaGoogle, color: '#34A853' },
    { icon: SiGooglemaps, color: '#4285F4' },
    { icon: FaGoogle, color: '#EA4335' },
  ],
  2: [ // Redes Sociales
    { icon: FaFacebook, color: '#1877F2' },
    { icon: FaInstagram, color: '#E4405F' },
    { icon: FaTiktok, color: '#ffffff' },
    { icon: FaYoutube, color: '#FF0000' },
    { icon: FaLinkedin, color: '#0A66C2' },
  ],
  3: [ // Contenido y Diseño
    { icon: FaYoutube, color: '#FF0000' },
    { icon: SiFigma, color: '#F24E1E' },
    { icon: SiFigma, color: '#A259FF' },
    { icon: FaGoogle, color: '#4285F4' },
    { icon: SiGmail, color: '#EA4335' },
  ],
  4: [ // Ventas y CRM
    { icon: SiHubspot, color: '#FF7A59' },
    { icon: SiHubspot, color: '#FF7A59' },
    { icon: SiHubspot, color: '#FF7A59' },
    { icon: FaWhatsapp, color: '#25D366' },
    { icon: FaStripe, color: '#635BFF' },
  ],
  5: [ // Estrategia y Analytics
    { icon: SiGoogleanalytics, color: '#E37400' },
    { icon: SiGoogleanalytics, color: '#E37400' },
    { icon: SiLooker, color: '#4285F4' },
    { icon: SiGoogletagmanager, color: '#246FDB' },
    { icon: SiGoogleanalytics, color: '#E37400' },
  ],
  6: [ // Reputación y PR
    { icon: FaGoogle, color: '#4285F4' },
    { icon: FaGoogle, color: '#4285F4' },
    { icon: FaGoogle, color: '#34A853' },
    { icon: FaWhatsapp, color: '#25D366' },
    { icon: FaGoogle, color: '#EA4335' },
  ],
};

export default function Services() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => lazyGsap(ref.current, (gsap) => { const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.svc-t'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); gsap.fromTo(el.querySelector('.svc-tabs'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } }); gsap.fromTo(el.querySelector('.svc-c'), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: el, start: 'top 70%' } }); }), []);

  const cats = t.services.categories;
  const cat = cats[active];

  return (
    <section ref={ref} id="servicios" className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto">
        <div className="svc-t opacity-0 text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-4">{t.services.title1}<span className="gold-gradient-text">{t.services.titleGold}</span></h2>
          <p className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
        <div className="svc-tabs opacity-0 flex flex-wrap justify-center gap-2 mb-8">
          {cats.map((c: any, i: number) => {
            const CatIcon = catIcons[i].icon;
            return (
              <button key={i} onClick={() => setActive(i)} aria-label={c.name} aria-pressed={active === i} className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${active === i ? 'bg-gold text-[#080F24] shadow-lg shadow-gold/20' : 'bg-white/[0.04] text-white/50 hover:text-white/80 hover:bg-white/[0.08] border border-white/[0.06]'}`}>
                <CatIcon size={18} color={active === i ? '#080F24' : catIcons[i].color} style={{ filter: active === i ? 'saturate(1) opacity(1)' : 'saturate(0.35) opacity(0.65)', transition: 'filter 0.3s ease' }} aria-hidden={true} focusable={false} />
                <span className="hidden sm:inline">{c.name}</span>
              </button>
            );
          })}
        </div>
        <div className="svc-c opacity-0">
          <div className="text-center mb-8"><h3 className="text-xl md:text-3xl font-bold text-white">{cat.name}</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.services.map((s: any, i: number) => {
              const svcIcon = serviceIcons[active]?.[i];
              const SvcIcon = svcIcon?.icon;
              return (
                <div key={i} className="glass-card p-5 md:p-6 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="icon-elegant group-hover:scale-110" aria-hidden="true">
                      {SvcIcon ? <SvcIcon size={32} color={svcIcon.color} aria-hidden={true} focusable={false} /> : (
                        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.badge === 'Premium' ? 'bg-gold/15 text-gold' : 'bg-white/[0.06] text-white/40'}`}>{s.badge}</span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-white mb-2">{s.name}</h4>
                  <p className="text-white/45 text-xs md:text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
