import { useEffect, useRef } from 'react';

const TEAM = 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260';
const MEET = 'https://images.pexels.com/photos/5324960/pexels-photo-5324960.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function Solution() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('.s-anim'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } });
        gsap.fromTo(el.querySelector('.s-imgs'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1, scrollTrigger: { trigger: el.querySelector('.s-imgs'), start: 'top 80%' } });
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" style={{ background: '#080F24' }}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="s-imgs opacity-0 relative hidden lg:block">
            <div className="rounded-xl overflow-hidden border-2 border-gold/20 shadow-2xl">
              <img src={TEAM} alt="Equipo de marketing" className="w-full h-[360px] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-xl overflow-hidden border-4 border-[#080F24] shadow-xl">
              <img src={MEET} alt="Reunion de negocios" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/25 rounded-xl" />
          </div>

          <div>
            <h2 className="s-anim opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Addendo no es una agencia.<br />
              <span className="gold-gradient-text">Es tu departamento completo de crecimiento.</span>
            </h2>
            <p className="s-anim opacity-0 text-lg md:text-xl text-white/50 mb-8 leading-relaxed">
              Imagina tener un equipo dedicado que se encarga de todo: que tu negocio aparezca primero cuando te buscan, que tus redes generen clientes reales, y que cada dolar invertido en publicidad regrese multiplicado.
            </p>
            <p className="s-anim opacity-0 text-2xl md:text-3xl font-bold text-white">Eso es Addendo.</p>
          </div>
        </div>

        <div className="s-anim opacity-0 glass-card p-8 md:p-12 max-w-3xl mx-auto text-center">
          <div className="space-y-4 text-lg md:text-xl text-white/60">
            <p>No vendemos <span className="line-through text-white/25">"likes"</span>. No vendemos <span className="line-through text-white/25">"seguidores"</span>. No vendemos <span className="line-through text-white/25">promesas bonitas</span>.</p>
            <p className="text-2xl md:text-3xl font-bold text-gold pt-4">Vendemos resultados que se ven en tu cuenta de banco.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
