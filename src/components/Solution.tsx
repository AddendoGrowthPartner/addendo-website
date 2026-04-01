import { useEffect, useRef } from 'react';

const TEAM_IMAGE = 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260';
const MEETING_IMAGE = 'https://images.pexels.com/photos/5324960/pexels-photo-5324960.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('.sol-animate'), { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } });
        gsap.fromTo(el.querySelector('.sol-images'), { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, scrollTrigger: { trigger: el.querySelector('.sol-images'), start: 'top 80%' } });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="sol-images opacity-0 relative hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
                <img src={TEAM_IMAGE} alt="Equipo de marketing digital trabajando" className="w-full h-[350px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-xl overflow-hidden border-4 border-navy shadow-xl">
                <img src={MEETING_IMAGE} alt="Reunion de negocios" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -top-3 -left-3 w-20 h-20 border-2 border-gold/30 rounded-xl" />
            </div>
          </div>

          <div>
            <h2 className="sol-animate opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Addendo no es una agencia.
              <br />
              <span className="gold-gradient-text">Es tu departamento completo de crecimiento.</span>
            </h2>
            <p className="sol-animate opacity-0 text-lg md:text-xl text-white/60 mb-8 leading-relaxed">
              Imagina tener un equipo dedicado que se encarga de todo: que tu negocio aparezca primero
              cuando te buscan, que tus redes generen clientes reales, que cada persona interesada
              reciba seguimiento inmediato, y que cada dolar invertido en publicidad regrese multiplicado.
            </p>
            <p className="sol-animate opacity-0 text-2xl md:text-3xl font-bold text-white">Eso es Addendo.</p>
          </div>
        </div>

        <div className="sol-animate opacity-0 glass-card p-8 md:p-12 max-w-3xl mx-auto text-center">
          <div className="space-y-4 text-lg md:text-xl text-white/70">
            <p>
              No vendemos <span className="line-through text-white/30">"likes"</span>.{' '}
              No vendemos <span className="line-through text-white/30">"seguidores"</span>.{' '}
              No vendemos <span className="line-through text-white/30">promesas bonitas</span>.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gold pt-4">
              Vendemos resultados que se ven en tu cuenta de banco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
