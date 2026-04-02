import { useI18n } from '../i18n/context';

const icons = ['🔍', '🎯', '⚡', '📈'];

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="como-funciona" className="section-pad" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-16">
          {t.howItWorks.title1}<span className="gold-gradient-text">{t.howItWorks.titleGold}</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.howItWorks.steps.map((step: { num: string; title: string; text: string }, i: number) => (
            <div key={i} className="relative glass-card p-8 text-center group">
              <span className="absolute top-4 right-4 text-6xl font-display font-bold text-gold/[0.07] leading-none select-none">{step.num}</span>
              <div className="text-4xl mb-4 icon-elegant">{icons[i]}</div>
              <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
