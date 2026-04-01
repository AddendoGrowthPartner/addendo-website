import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

const allies = [
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Cloudflare', logo: 'https://cf-assets.www.cloudflare.com/slt3lc6tev37/7bIgBqfKvDwWyM7rjbHB3N/06e8df2d8dbfba6d9d7e4d86a78f8cf6/cloudflare-logo.png' },
  { name: 'Google Analytics', logo: null },
  { name: 'DataForSEO', logo: 'https://dataforseo.com/wp-content/themes/dataforseo/assets/img/logo.svg' },
  { name: 'TikTok', logo: null },
  { name: 'WhatsApp Business', logo: null },
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/800px-Stripe_Logo%2C_revised_2016.svg.png' },
];

function TikTokLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="currentColor">
      <path d="M38.4 10.2c-2.6-1.7-4.3-4.5-4.6-7.7h-7.1v26.3c0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8c.6 0 1.2.1 1.8.3v-7.3c-.6-.1-1.2-.1-1.8-.1-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13V19.5c2.8 2 6.2 3.2 9.8 3.2v-7.1c-2 0-3.9-.5-5.3-1.4v-4z" />
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function TechAllies() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth >= 768) return;
    let pos = 0;
    let raf: number;
    const scroll = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(scroll);
    };
    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  const renderLogo = (ally: typeof allies[0], i: number) => {
    const base = 'flex items-center justify-center h-16 md:h-20 px-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500';
    if (ally.name === 'TikTok') return <div key={i} className={base}><TikTokLogo /></div>;
    if (ally.name === 'WhatsApp Business') return <div key={i} className={base}><WhatsAppLogo /><span className="ml-2 text-sm font-semibold whitespace-nowrap">WhatsApp Business</span></div>;
    if (ally.name === 'Google Analytics') return <div key={i} className={base}><span className="text-sm md:text-base font-semibold whitespace-nowrap">Google Analytics</span></div>;
    return (
      <div key={i} className={base}>
        <img src={ally.logo!} alt={ally.name} className="h-6 md:h-8 w-auto max-w-[140px] object-contain" loading="lazy" />
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 relative" style={{ background: '#080F24' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            <span className="gold-gradient-text">{t.allies.title}</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">{t.allies.subtitle}</p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 gap-6 max-w-4xl mx-auto">
          {allies.map((ally, i) => renderLogo(ally, i))}
        </div>

        {/* Mobile auto-scroll carousel */}
        <div ref={scrollRef} className="md:hidden flex overflow-x-hidden gap-8" style={{ width: '100%' }}>
          {[...allies, ...allies].map((ally, i) => renderLogo(ally, i))}
        </div>
      </div>
    </section>
  );
}
