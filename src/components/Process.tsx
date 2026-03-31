import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Escuchamos',
    text: 'Nos sentamos contigo. Entendemos tu negocio, tu mercado, tus metas y tus frustraciones. No hay plantillas genericas — todo empieza por conocerte a fondo.',
  },
  {
    num: '02',
    title: 'Disenamos tu estrategia',
    text: 'Creamos un plan de crecimiento a tu medida. Cada accion tiene un proposito, cada canal tiene una razon, y cada peso invertido tiene un destino claro.',
  },
  {
    num: '03',
    title: 'Ejecutamos sin parar',
    text: 'Ponemos todo en marcha — sitio web, campanas, contenido, seguimiento de leads, reputacion — todo al mismo tiempo, todo coordinado.',
  },
  {
    num: '04',
    title: 'Medimos, optimizamos, escalamos',
    text: 'Cada semana revisamos los resultados. Lo que funciona, lo potenciamos. Lo que no, lo ajustamos. Tu negocio crece mes tras mes.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelector('.process-title'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );

        el.querySelectorAll('.process-step').forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              scrollTrigger: { trigger: step, start: 'top 85%' },
            }
          );
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="proceso" className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-dark to-navy" />

      <div className="relative max-w-5xl mx-auto">
        <h2 className="process-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20">
          De donde estas a donde quieres llegar.
          <br />
          <span className="gold-gradient-text">En 4 pasos.</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`process-step opacity-0 flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Number badge */}
                <div className="md:w-1/2 flex items-start gap-5 md:justify-end">
                  <div
                    className={`flex flex-col ${
                      i % 2 === 1 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'
                    }`}
                  >
                    <span className="text-gold font-display text-5xl md:text-6xl font-black opacity-30 leading-none">
                      {step.num}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                      {step.title}
                    </h3>
                    <p className="text-white/55 mt-3 leading-relaxed max-w-md">{step.text}</p>
                  </div>
                </div>

                {/* Dot on the timeline */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <div className="w-4 h-4 bg-gold rounded-full ring-4 ring-dark" />
                </div>

                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
