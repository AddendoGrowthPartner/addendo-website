import { useEffect, useRef } from 'react';

export default function CtaFinal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('.cta-a'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: el, start: 'top 80%' } });
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" style={{ background: '#080F24' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/[0.06] rounded-full blur-[160px]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="cta-a opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Tu competencia ya se esta moviendo.<br /><span className="gold-gradient-text">&iquest;Y tu?</span>
        </h2>
        <p className="cta-a opacity-0 text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cada dia sin una estrategia real es un dia que pierdes clientes, dinero y terreno.
        </p>
        <div className="cta-a opacity-0 mb-6">
          {/* PENDIENTE: reemplazar con Calendar link de GHL */}
          <a href="#contacto" className="btn-gold text-lg md:text-xl inline-flex">
            Quiero mi llamada estrategica gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        <p className="cta-a opacity-0 text-white/30 text-sm">Cupos limitados por mes.</p>
      </div>
    </section>
  );
}
