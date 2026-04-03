import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';

export default function Contact() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', message: '' });

  useEffect(() => { if (window.innerWidth < 768) return; import('gsap').then(({ gsap }) => { import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => { gsap.registerPlugin(ScrollTrigger); const el = ref.current; if (!el) return; gsap.fromTo(el.querySelectorAll('.ct-a'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%' } }); }); }); }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); const isEn = lang === 'en'; const s = encodeURIComponent(isEn ? `Inquiry from ${form.name} — ${form.business}` : `Consulta de ${form.name} — ${form.business}`); const b = encodeURIComponent(isEn ? `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nBusiness: ${form.business}\n\nMessage:\n${form.message}` : `Nombre: ${form.name}\nTeléfono: ${form.phone}\nEmail: ${form.email}\nNegocio: ${form.business}\n\nMensaje:\n${form.message}`); window.location.href = `mailto:admin@addendo.io?subject=${s}&body=${b}`; };
  const ic = 'w-full px-5 py-4 bg-[#0F1629] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors text-sm';

  return (
    <section ref={ref} id="contacto" className="section-pad relative" style={{ background: '#0A1228' }}>
      <div className="relative max-w-2xl mx-auto">
        <h2 className="ct-a opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-4"><span className="gold-gradient-text">{t.contact.title}</span></h2>
        <p className="ct-a opacity-0 text-white/40 text-center mb-8 text-lg">{t.contact.subtitle}</p>
        <form onSubmit={submit} className="ct-a opacity-0 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label htmlFor="name" className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{t.contact.name}</label><input id="name" type="text" required value={form.name} onChange={set('name')} placeholder={t.contact.namePh} className={ic} /></div>
            <div><label htmlFor="phone" className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{t.contact.phone}</label><input id="phone" type="tel" required value={form.phone} onChange={set('phone')} placeholder={t.contact.phonePh} className={ic} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label htmlFor="email" className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{t.contact.email}</label><input id="email" type="email" required value={form.email} onChange={set('email')} placeholder={t.contact.emailPh} className={ic} /></div>
            <div><label htmlFor="biz" className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{t.contact.business}</label><input id="biz" type="text" value={form.business} onChange={set('business')} placeholder={t.contact.businessPh} className={ic} /></div>
          </div>
          <div><label htmlFor="msg" className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">{t.contact.message}</label><textarea id="msg" required rows={4} value={form.message} onChange={set('message')} placeholder={t.contact.messagePh} className={`${ic} resize-none`} /></div>
          <button type="submit" className="btn-gold w-full justify-center text-lg">{t.contact.button}<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
        </form>
      </div>
    </section>
  );
}
