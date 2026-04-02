import { useI18n } from '../i18n/context';

const icons = ['🛒', '💼', '🏠', '❤️', '🍽️', '📚'];

export default function ForWhom() {
  const { t } = useI18n();

  return (
    <section className="section-pad" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-4">
          {t.forWhom.title1}<span className="gold-gradient-text">{t.forWhom.titleGold}</span>
        </h2>
        <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-14">{t.forWhom.subtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
          {t.forWhom.items.map((item: string, i: number) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center gap-3 group">
              <span className="text-3xl icon-elegant">{icons[i]}</span>
              <span className="text-sm sm:text-base font-medium text-white/90">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-gold/70 text-sm sm:text-base italic">{t.forWhom.cta}</p>
      </div>
    </section>
  );
}
