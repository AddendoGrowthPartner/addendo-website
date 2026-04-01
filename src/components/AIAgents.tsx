import { useI18n } from '../i18n/context';

const icons = ['📊', '📢', '✍️', '🔎', '🤖', '⭐', '📈', '🎙️'];

export default function AIAgents() {
  const { t } = useI18n();

  return (
    <section className="section-pad" style={{ background: '#0A1230' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-4">
            {t.aiAgents.title1}<span className="gold-gradient-text">{t.aiAgents.titleGold}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">{t.aiAgents.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.aiAgents.items.map((item: { title: string; text: string }, i: number) => (
            <div key={i} className="rounded-xl border border-gold/15 bg-[#0F1629] p-5 sm:p-6 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl mb-3">{icons[i]}</div>
              <h3 className="text-sm sm:text-base font-medium text-white mb-2">{item.title}</h3>
              <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
