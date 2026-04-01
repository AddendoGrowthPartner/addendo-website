import { useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Carlos M.',
    business: 'Restaurante La Esquina',
    quote: 'Desde que empezamos con Addendo, las reservaciones se triplicaron. Ahora tenemos lista de espera los fines de semana.',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Maria L.',
    business: 'MedSpa Belleza Latina',
    quote: 'Por fin tengo un equipo que entiende mi mercado. Mis redes generan citas reales, no solo likes.',
    img: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Roberto S.',
    business: 'RS Real Estate Group',
    quote: 'Addendo me trajo 47 leads calificados en el primer mes. Cerre 5 ventas. El ROI es increible.',
    img: 'https://images.pexels.com/photos/5920775/pexels-photo-5920775.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el.querySelector('.test-title'), { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } });
        el.querySelectorAll('.test-card').forEach((c, i) => {
          gsap.fromTo(c, { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, scrollTrigger: { trigger: el, start: 'top 70%' } });
        });
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-pad relative" style={{ background: '#0A1228' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="test-title opacity-0 text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Lo que dicen <span className="gold-gradient-text">nuestros clientes.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="test-card opacity-0 glass-card p-8 text-center">
              <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-5 object-cover border-2 border-gold/30" loading="lazy" />
              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <p className="text-white font-bold text-sm">{t.name}</p>
              <p className="text-gold/60 text-xs mt-1">{t.business}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
