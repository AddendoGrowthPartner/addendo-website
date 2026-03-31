import { useEffect, useRef } from 'react';

export default function CtaFinal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelectorAll('.cta-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-dark to-navy" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/8 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="cta-animate opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Tu competencia ya se esta moviendo.
          <br />
          <span className="gold-gradient-text">&iquest;Y tu?</span>
        </h2>

        <p className="cta-animate opacity-0 text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cada dia sin una estrategia real es un dia que pierdes clientes, pierdes dinero y
          pierdes terreno. No tienes que seguir haciendolo solo.
        </p>

        <div className="cta-animate opacity-0 mb-6">
          <a
            href="https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-lg md:text-xl inline-flex"
          >
            Quiero mi llamada estrategica gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        <p className="cta-animate opacity-0 text-white/40 text-sm">
          Cupos limitados por mes. Trabajamos con pocos negocios para darle a cada uno la atencion
          que merece.
        </p>
      </div>
    </section>
  );
}
