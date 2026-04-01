import { useEffect, useRef } from 'react';

const ENTREPRENEUR_IMAGE = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600';
const WOMAN_IMAGE = 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=600';

const reasons = [
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    title: 'Sistema completo, no piezas sueltas',
    text: 'No necesitas contratar una agencia para el sitio web, otra para redes, otra para publicidad y otra para ventas. Addendo maneja todo bajo un mismo techo.',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
    title: 'Entendemos tu mercado',
    text: 'Hablamos tu idioma — literal y figurativamente. Sabemos como piensa, busca y compra el consumidor hispano en Estados Unidos.',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    title: 'Resultados, no excusas',
    text: 'Te mostramos leads, ventas cerradas y retorno de inversion. Si no funciona, lo arreglamos — asi de simple.',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Trabajamos 24/7',
    text: 'Tu negocio no duerme y nosotros tampoco. Tu presencia digital, tus campanas y tu seguimiento de clientes estan activos todo el dia, todos los dias.',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Tu exito es nuestro negocio',
    text: 'No ganamos si tu no ganas. Asi de directo. Nuestro modelo esta construido para que cuando tu creces, nosotros crecemos.',
  },
];

export default function WhyAddendo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelector('.why-title'), { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } });
        el.querySelectorAll('.why-card').forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: card, start: 'top 90%' } });
        });
        gsap.fromTo(el.querySelector('.why-proof'), { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el.querySelector('.why-proof'), start: 'top 90%' } });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="por-que" className="section-padding bg-navy relative">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="why-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          No somos una opcion mas.
          <br />
          <span className="gold-gradient-text">Somos la ultima que vas a necesitar.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {reasons.map((reason, i) => (
            <div key={i} className={`why-card opacity-0 glass-card p-7 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1 ${i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}>
              <div className="text-gold mb-4">{reason.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{reason.text}</p>
            </div>
          ))}
        </div>

        <div className="why-proof opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-3">
            <img src={ENTREPRENEUR_IMAGE} alt="" className="w-11 h-11 rounded-full border-2 border-navy object-cover" loading="lazy" />
            <img src={WOMAN_IMAGE} alt="" className="w-11 h-11 rounded-full border-2 border-navy object-cover" loading="lazy" />
            <div className="w-11 h-11 rounded-full border-2 border-navy bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">+50</div>
          </div>
          <p className="text-white/40 text-sm">Negocios hispanos que ya estan creciendo con Addendo</p>
        </div>
      </div>
    </section>
  );
}
