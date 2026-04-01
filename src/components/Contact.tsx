import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelectorAll('.contact-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nTeléfono: ${phone}\n\nMensaje:\n${message}`
    );
    window.location.href = `mailto:admin@addendo.io?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="section-padding bg-navy relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-2xl mx-auto">
        <h2 className="contact-animate opacity-0 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="gold-gradient-text">Hablemos.</span>
        </h2>
        <p className="contact-animate opacity-0 text-white/50 text-center mb-12 text-lg">
          Dejanos tus datos y nos ponemos en contacto contigo.
        </p>

        <form onSubmit={handleSubmit} className="contact-animate opacity-0 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full px-5 py-4 bg-dark/80 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
              Telefono
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-5 py-4 bg-dark/80 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cuentanos sobre tu negocio y como podemos ayudarte..."
              className="w-full px-5 py-4 bg-dark/80 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-gold w-full justify-center text-lg"
          >
            Enviar mensaje
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
