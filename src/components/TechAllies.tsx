import { useState } from 'react';
import { useI18n } from '../i18n/context';

const allies = [
  // Publicidad
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Google Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/800px-Google_Ads_logo.svg.png' },
  { name: 'TikTok', logo: 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' },
  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png' },
  { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/800px-YouTube_Logo_2017.svg.png' },
  // Analytics
  { name: 'Google Analytics', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg' },
  { name: 'Google Tag Manager', logo: 'https://www.gstatic.com/tagmanager/tag-manager-logo.svg' },
  { name: 'Looker Studio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Looker_Logo_%282022%29.png/800px-Looker_Logo_%282022%29.png' },
  // Infraestructura
  { name: 'Cloudflare', logo: 'https://cf-assets.www.cloudflare.com/slt3lc6tev37/7bIgBqfKvDwWyM7rjbHB3N/06e8df2d8dbfba6d9d7e4d86a78f8cf6/cloudflare-logo.png' },
  { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/v1538361091/repositories/vercel/logo.png' },
  { name: 'GitHub', logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png' },
  { name: 'DigitalOcean', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/DigitalOcean_logo.svg/800px-DigitalOcean_logo.svg.png' },
  // SEO e Inteligencia
  { name: 'DataForSEO', logo: 'https://dataforseo.com/wp-content/themes/dataforseo/assets/img/logo.svg' },
  { name: 'Apify', logo: 'https://apify.com/img/logo.svg' },
  // IA y Contenido
  { name: 'Anthropic Claude', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/800px-Claude_AI_logo.svg.png' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/800px-OpenAI_Logo.svg.png' },
  { name: 'fal.ai', logo: 'https://fal.ai/favicon.ico' },
  // Diseño
  { name: 'Figma', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/400px-Figma-logo.svg.png' },
  { name: 'Cloudinary', logo: 'https://res.cloudinary.com/cloudinary-marketing/images/v1675020518/creative_source/Web_assets/Logo/cloudinary_logo_blue_0720_2x/cloudinary_logo_blue_0720_2x.png' },
  { name: 'Freepik', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Freepik_corporate_logo.svg/800px-Freepik_corporate_logo.svg.png' },
  // CRM y Ventas
  { name: 'GoHighLevel', logo: 'https://app.gohighlevel.com/images/logo.png' },
  { name: 'WhatsApp Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png' },
  // Pagos
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/800px-Stripe_Logo%2C_revised_2016.svg.png' },
  // Automatización
  { name: 'N8N', logo: 'https://n8n.io/favicon.ico' },
];

function AllyLogo({ ally }: { ally: typeof allies[0] }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-gold text-xs font-semibold whitespace-nowrap text-center leading-tight">{ally.name}</span>
    );
  }

  return (
    <img
      src={ally.logo}
      alt={ally.name}
      className="max-w-[120px] max-h-[40px] w-auto h-auto object-contain"
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
          {allies.map((ally, i) => (
            <div
              key={ally.name}
              className="flex items-center justify-center h-14 md:h-16 px-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <AllyLogo ally={ally} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
