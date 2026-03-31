import { useEffect, useRef } from 'react';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Presencia Digital Completa',
    subtitle: 'Tu negocio, visible en todos lados.',
    text: 'Sitio web profesional, perfiles optimizados, Google Business y cada plataforma donde tus clientes te buscan.',
    result: 'Mas visibilidad. Mas confianza. Mas llamadas.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: 'Campanas de Publicidad',
    subtitle: 'Cada dolar invertido trabaja para traerte clientes.',
    text: 'Campanas en Google, Facebook, Instagram y las plataformas que tu mercado usa. Analizamos, probamos y escalamos.',
    result: 'Leads calificados llegando a tu negocio cada dia.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Contenido y Redes Sociales',
    subtitle: 'Contenido que vende, no que solo decora.',
    text: 'Fotos, videos, textos, historias — todo disenado para conectar con tu audiencia y convertir seguidores en clientes.',
    result: 'Una marca que la gente reconoce, respeta y elige.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'SEO y Posicionamiento',
    subtitle: 'Aparece primero cuando te buscan.',
    text: 'Optimizamos tu presencia para que Google te ponga arriba con las palabras clave que tu mercado realmente usa.',
    result: 'Clientes que te encuentran sin pagar por cada clic.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'CRM y Seguimiento de Ventas',
    subtitle: 'Nunca mas pierdas un cliente por falta de seguimiento.',
    text: 'Cada lead registrado, cada seguimiento programado, cada oportunidad rastreada en un solo lugar.',
    result: 'Mas ventas cerradas con el mismo esfuerzo.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Reputacion y Relaciones Publicas',
    subtitle: 'Que hablen bien de ti y que todo el mundo lo vea.',
    text: 'Gestionamos resenas, menciones y estrategias para que tu marca sea la referencia en tu industria.',
    result: 'Una reputacion que vende por ti.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Reportes y Analytics',
    subtitle: 'Numeros claros. Decisiones inteligentes.',
    text: 'Reportes en tiempo real que te muestran leads, costos y retorno. Sin humo — solo los numeros que importan.',
    result: 'Control total sobre tu inversion y crecimiento.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelector('.services-title'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );

        el.querySelectorAll('.service-card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 90%' },
            }
          );
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="section-padding bg-navy relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="services-title opacity-0 text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Todo lo que tu negocio necesita para{' '}
            <span className="gold-gradient-text">dominar su mercado.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Cada pieza conectada. Cada accion con proposito. Un solo equipo que lo maneja todo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card opacity-0 glass-card p-8 group hover:border-gold/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
              <p className="text-gold/80 text-sm font-medium mb-3">{service.subtitle}</p>
              <p className="text-white/55 leading-relaxed mb-5 text-sm">{service.text}</p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-gold text-sm font-semibold italic">{service.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
