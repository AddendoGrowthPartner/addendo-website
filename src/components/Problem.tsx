import { useEffect, useRef } from 'react';

const IMG = 'https://images.pexels.com/photos/5920775/pexels-photo-5920775.jpeg?auto=compress&cs=tinysrgb&w=800';

const problems = [
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, title: 'No te encuentran en internet', text: 'Cuando alguien busca lo que tu ofreces, aparece tu competencia — no tu.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, title: 'Publicas en redes y nadie responde', text: 'Horas creando contenido que no genera ni una llamada.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Pagas publicidad que no funciona', text: 'Tiraste dinero en anuncios que prometian resultados y no trajeron nada.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: 'Los leads se te escapan', text: 'Te contactan personas interesadas pero entre el dia a dia, los pierdes.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'No sabes que esta funcionando', text: 'Tomas decisiones a ciegas porque nadie te da numeros claros.' },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el.querySelector('.p-title'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } });
        gsap.fromTo(el.querySelector('.p-img'), { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 70%' } });
        el.querySelectorAll('.p-card').forEach((c, i) => { gsap.fromTo(c, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 70%' } }); });
        gsap.fromTo(el.querySelector('.p-close'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el.querySelector('.p-close'), start: 'top 88%' } });
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-pad relative" style={{ background: '#0A1228' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="p-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          Trabajas mas que nadie.<br /><span className="text-white/40">Pero tu negocio no crece como deberia.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-3">
            {problems.map((p, i) => (
              <div key={i} className="p-card opacity-0 glass-card p-5 flex items-start gap-4">
                <div className="text-gold shrink-0 mt-0.5">{p.icon}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-white/45 leading-relaxed text-sm">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-img opacity-0 hidden lg:block">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08]">
              <img src={IMG} alt="Dueno de negocio" className="w-full h-[460px] object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1228] via-[#0A1228]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/70 text-sm font-medium italic">"Trabajas duro, pero necesitas que ese esfuerzo se convierta en resultados reales."</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-close opacity-0 mt-16 text-center">
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            El problema no es tu negocio. El problema es que estas tratando de{' '}
            <span className="text-gold font-semibold">hacerlo todo solo</span> — o con gente que no entiende lo que realmente necesitas.
          </p>
        </div>
      </div>
    </section>
  );
}
