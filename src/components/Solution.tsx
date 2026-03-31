import { useEffect, useRef } from 'react';

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelectorAll('.sol-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: { trigger: el, start: 'top 75%' },
          }
        );
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-navy relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto">
        <h2 className="sol-animate opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
          Addendo no es una agencia.
          <br />
          <span className="gold-gradient-text">Es tu departamento completo de crecimiento.</span>
        </h2>

        <p className="sol-animate opacity-0 text-lg md:text-xl text-white/60 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Imagina tener un equipo dedicado que se encarga de todo: que tu negocio aparezca primero
          cuando te buscan, que tus redes generen clientes reales, que cada persona interesada
          reciba seguimiento inmediato, y que cada dolar invertido en publicidad regrese
          multiplicado.
        </p>

        <div className="sol-animate opacity-0 text-center mb-12">
          <p className="text-2xl md:text-3xl font-bold text-white">Eso es Addendo.</p>
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
