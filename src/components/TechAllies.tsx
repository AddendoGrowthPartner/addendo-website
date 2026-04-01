import { useState } from 'react';
import { useI18n } from '../i18n/context';

const allies = [
  // Publicidad
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta' },
  { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads' },
  { name: 'TikTok', logo: 'https://cdn.simpleicons.org/tiktok' },
  { name: 'LinkedIn', logo: 'https://cdn.simpleicons.org/linkedin' },
  { name: 'YouTube', logo: 'https://cdn.simpleicons.org/youtube' },
  { name: 'Instagram', logo: 'https://cdn.simpleicons.org/instagram' },
  { name: 'Facebook', logo: 'https://cdn.simpleicons.org/facebook' },
  // Analytics
  { name: 'Google Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics' },
  { name: 'Google Tag Manager', logo: 'https://cdn.simpleicons.org/googletagmanager' },
  // Infraestructura
  { name: 'Cloudflare', logo: 'https://cdn.simpleicons.org/cloudflare' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/white' },
  { name: 'DigitalOcean', logo: 'https://cdn.simpleicons.org/digitalocean' },
  // SEO
  { name: 'DataForSEO', logo: 'https://dataforseo.com/favicon.ico' },
  { name: 'Apify', logo: 'https://cdn.simpleicons.org/apify' },
  // IA
  { name: 'Anthropic', logo: 'https://cdn.simpleicons.org/anthropic/white' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/white' },
  // Diseño
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma' },
  { name: 'Cloudinary', logo: 'https://cdn.simpleicons.org/cloudinary' },
  { name: 'Freepik', logo: 'https://cdn.simpleicons.org/freepik' },
  // CRM y Pagos
  { name: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe' },
  // Automatización
  { name: 'N8N', logo: 'https://cdn.simpleicons.org/n8n' },
];

function AllyLogo({ ally }: { ally: typeof allies[0] }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-gold text-[10px] font-semibold text-center leading-tight">{ally.name}</span>
    );
  }

  return (
    <img
      src={ally.logo}
      alt={ally.name}
      width={36}
      height={36}
      className="w-9 h-9 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function TechAllies() {
  const { t } = useI18n();

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

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {allies.map((ally) => (
            <div
              key={ally.name}
              className="flex flex-col items-center justify-center gap-1.5 h-16 md:h-20 px-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <AllyLogo ally={ally} />
              <span className="text-white/30 text-[9px] leading-none truncate max-w-full">{ally.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
