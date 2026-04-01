import { useI18n } from '../i18n/context';
import { FaGoogle, FaMeta, FaTiktok, FaLinkedin, FaYoutube, FaInstagram, FaFacebook, FaGithub, FaDigitalOcean, FaFigma, FaWhatsapp, FaStripe, FaCloudflare } from 'react-icons/fa6';
import { SiGoogleads, SiGoogleanalytics, SiGoogletagmanager, SiVercel, SiCloudinary, SiN8N, SiOpenai, SiAnthropic, SiFreepik } from 'react-icons/si';
import { FaRobot } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

const allies: { name: string; icon: IconType; color: string }[] = [
  { name: 'Google', icon: FaGoogle, color: '#4285F4' },
  { name: 'Meta', icon: FaMeta, color: '#0081FB' },
  { name: 'Google Ads', icon: SiGoogleads, color: '#4285F4' },
  { name: 'TikTok', icon: FaTiktok, color: '#ffffff' },
  { name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
  { name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
  { name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'Tag Manager', icon: SiGoogletagmanager, color: '#246FDB' },
  { name: 'Cloudflare', icon: FaCloudflare, color: '#F38020' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'DigitalOcean', icon: FaDigitalOcean, color: '#0080FF' },
  { name: 'Apify', icon: FaRobot, color: '#97D700' },
  { name: 'Anthropic', icon: SiAnthropic, color: '#ffffff' },
  { name: 'OpenAI', icon: SiOpenai, color: '#ffffff' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'Cloudinary', icon: SiCloudinary, color: '#3448C5' },
  { name: 'Freepik', icon: SiFreepik, color: '#1273EB' },
  { name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366' },
  { name: 'Stripe', icon: FaStripe, color: '#635BFF' },
  { name: 'N8N', icon: SiN8N, color: '#EA4B71' },
];

// Duplicate for infinite loop
const doubled = [...allies, ...allies];

export default function TechAllies() {
  const { t } = useI18n();

  return (
    <section className="py-12 md:py-16 relative" style={{ background: '#080F24' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-3">
            <span className="gold-gradient-text">{t.allies.title}</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">{t.allies.subtitle}</p>
        </div>

        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
          <div className="marquee-track flex w-max gap-10 py-4" style={{ animation: 'marquee 30s linear infinite' }}>
            {doubled.map((ally, i) => {
              const Icon = ally.icon;
              return (
                <div
                  key={`${ally.name}-${i}`}
                  className="flex flex-col items-center justify-center gap-2 px-3 shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Icon size={36} color={ally.color} style={{ height: 40, width: 'auto' }} />
                  <span className="text-white/30 text-[9px] leading-none whitespace-nowrap">{ally.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
