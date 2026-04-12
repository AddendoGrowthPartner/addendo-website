import { useState } from 'react';
import { useI18n } from '../i18n/context';

export default function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-pad" style={{ background: '#0A1230' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-14">
          {t.faq.title1}<span className="gold-gradient-text">{t.faq.titleGold}</span>
        </h2>

        <div className="space-y-3">
          {t.faq.items.map((item: { q: string; a: string }, i: number) => (
            <div key={i} className="rounded-xl border border-gold/15 bg-[#0F1629] overflow-hidden transition-colors hover:border-gold/30">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                aria-label={item.q}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-white pr-4">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  aria-hidden="true" focusable="false"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={open !== i}
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0', opacity: open === i ? 1 : 0 }}
              >
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/50 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
