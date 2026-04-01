import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/context';

const E1 = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200';
const E2 = 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200';

const icons = [
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
];

export default function WhyAddendo() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelector('.w-t'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }); el.querySelectorAll('.w-c').forEach((c, i) => { gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, scrollTrigger: { trigger: c, start: 'top 92%' } }); }); gsap.fromTo(el.querySelector('.w-pr'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el.querySelector('.w-pr'), start: 'top 90%' } }); }); }); }, []);

  return (
    <section ref={ref} id="por-que" className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[130px]" />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="w-t opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-16">{t.why.title1}<br /><span className="gold-gradient-text">{t.why.titleGold}</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {t.why.items.map((r, i) => (
            <div key={i} className={`w-c opacity-0 glass-card p-7 ${i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}>
              <div className="text-gold mb-4">{icons[i]}</div>
              <h3 className="text-lg font-bold text-white mb-3">{r.title}</h3>
              <p className="text-white/45 leading-relaxed text-sm">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="w-pr opacity-0 flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="flex -space-x-3">
            <img src={E1} alt="" className="w-11 h-11 rounded-full border-2 border-[#080F24] object-cover" loading="lazy" />
            <img src={E2} alt="" className="w-11 h-11 rounded-full border-2 border-[#080F24] object-cover" loading="lazy" />
            <div className="w-11 h-11 rounded-full border-2 border-[#080F24] bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">+50</div>
          </div>
          <p className="text-white/35 text-sm">{t.why.proof}</p>
        </div>
      </div>
    </section>
  );
}
