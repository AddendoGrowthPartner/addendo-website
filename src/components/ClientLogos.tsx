import { useEffect, useRef } from 'react';

export default function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(
          el.querySelectorAll('.logo-animate'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 90%' } }
        );
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 bg-navy relative">
      <div className="max-w-5xl mx-auto text-center">
        <p className="logo-animate opacity-0 text-white/30 text-sm uppercase tracking-widest mb-8">
          Negocios que ya crecen con Addendo
        </p>
        <div className="logo-animate opacity-0 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {['Don Jacinto', 'Bebe Genial', 'CreditBridge', 'Neuron Kids', 'Ciudad Maderas'].map(
            (name) => (
              <div
                key={name}
                className="text-white/15 font-bold text-lg tracking-wider uppercase hover:text-white/30 transition-colors"
              >
                {name}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
