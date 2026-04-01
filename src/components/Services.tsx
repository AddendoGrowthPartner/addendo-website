import { useEffect, useRef, useState } from 'react';

const categories = [
  {
    id: 'ads',
    name: 'Publicidad Digital',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /></svg>,
    services: [
      { name: 'Google Ads (SEM)', desc: 'Campanas de busqueda, display y shopping que convierten clics en clientes.', badge: 'Incluido' },
      { name: 'Meta Ads', desc: 'Facebook e Instagram ads segmentados para tu mercado exacto.', badge: 'Incluido' },
      { name: 'TikTok Ads', desc: 'Contenido patrocinado viral que llega a audiencias nuevas.', badge: 'Incluido' },
      { name: 'YouTube Ads', desc: 'Video advertising que posiciona tu marca ante millones.', badge: 'Premium' },
      { name: 'LinkedIn Ads', desc: 'Campanas B2B para llegar a tomadores de decision.', badge: 'Premium' },
      { name: 'Retargeting', desc: 'Recupera clientes que visitaron tu sitio sin comprar.', badge: 'Incluido' },
    ],
  },
  {
    id: 'seo',
    name: 'Presencia Organica',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    services: [
      { name: 'SEO Tecnico', desc: 'Optimizacion de sitio para posicionar en Google organicamente.', badge: 'Incluido' },
      { name: 'SEO Local', desc: 'Domina las busquedas en tu ciudad y region.', badge: 'Incluido' },
      { name: 'Google Business Profile', desc: 'Tu ficha de Google optimizada al maximo para visibilidad local.', badge: 'Incluido' },
      { name: 'Link Building', desc: 'Construccion de autoridad con backlinks premium de alto valor.', badge: 'Premium' },
    ],
  },
  {
    id: 'social',
    name: 'Redes Sociales',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>,
    services: [
      { name: 'Facebook', desc: 'Comunidad, engagement y contenido que genera conversaciones.', badge: 'Incluido' },
      { name: 'Instagram', desc: 'Contenido visual, Reels y Stories que conectan con tu audiencia.', badge: 'Incluido' },
      { name: 'TikTok', desc: 'Videos virales y tendencias que disparan tu alcance.', badge: 'Incluido' },
      { name: 'YouTube', desc: 'Canal optimizado y video marketing para autoridad de marca.', badge: 'Premium' },
      { name: 'LinkedIn', desc: 'Marca profesional B2B y thought leadership.', badge: 'Premium' },
    ],
  },
  {
    id: 'content',
    name: 'Contenido y Diseno',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    services: [
      { name: 'Produccion de Videos', desc: 'Videos profesionales con tecnologia avanzada de produccion.', badge: 'Incluido' },
      { name: 'Fotografia y Diseno', desc: 'Creativos visuales que elevan la percepcion de tu marca.', badge: 'Incluido' },
      { name: 'Copywriting Persuasivo', desc: 'Textos que venden — ads, landing pages, emails, guiones.', badge: 'Incluido' },
      { name: 'Blog y Contenido SEO', desc: 'Articulos optimizados que atraen trafico organico.', badge: 'Incluido' },
      { name: 'Email Marketing', desc: 'Secuencias automatizadas que nutren y convierten leads.', badge: 'Incluido' },
    ],
  },
  {
    id: 'sales',
    name: 'Ventas y CRM',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    services: [
      { name: 'Sistema CRM Completo', desc: 'Toda tu gestion de clientes en un solo lugar.', badge: 'Incluido' },
      { name: 'Seguimiento de Leads 24/7', desc: 'Ningun prospecto se pierde — respuesta inmediata siempre.', badge: 'Incluido' },
      { name: 'Pipeline Automatizado', desc: 'Flujo de ventas que mueve leads a cierre sin friccion.', badge: 'Incluido' },
      { name: 'WhatsApp y SMS Marketing', desc: 'Comunicacion directa con tus clientes donde estan.', badge: 'Incluido' },
      { name: 'Agentes de Ventas', desc: 'Equipo de seguimiento y cierre dedicado a tu negocio.', badge: 'Premium' },
    ],
  },
  {
    id: 'analytics',
    name: 'Estrategia y Analytics',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    services: [
      { name: 'Auditoria Digital Completa', desc: 'Diagnostico profundo de tu presencia y oportunidades.', badge: 'Incluido' },
      { name: 'Estrategia de Crecimiento', desc: 'Plan personalizado con metas medibles mes a mes.', badge: 'Incluido' },
      { name: 'Reportes en Tiempo Real', desc: 'Numeros claros que muestran exactamente que funciona.', badge: 'Incluido' },
      { name: 'Dashboard del Cliente', desc: 'Acceso exclusivo a tus metricas cuando quieras.', badge: 'Incluido' },
      { name: 'Consultoria Estrategica', desc: 'Sesiones mensuales con tu estratega dedicado.', badge: 'Incluido' },
    ],
  },
  {
    id: 'reputation',
    name: 'Reputacion y PR',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    services: [
      { name: 'Gestion de Resenas', desc: 'Mas resenas positivas, respuestas profesionales a cada una.', badge: 'Incluido' },
      { name: 'Relaciones Publicas', desc: 'Cobertura mediatica y menciones en publicaciones clave.', badge: 'Premium' },
      { name: 'Monitoreo de Marca 24/7', desc: 'Sabemos que dicen de ti en todo internet, siempre.', badge: 'Incluido' },
      { name: 'Manejo de Crisis', desc: 'Respuesta rapida ante cualquier situacion reputacional.', badge: 'Premium' },
      { name: 'Posicionamiento de Autoridad', desc: 'Te convertimos en la referencia de tu industria.', badge: 'Premium' },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(el.querySelector('.svc-title'), { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } });
        gsap.fromTo(el.querySelector('.svc-tabs'), { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: el, start: 'top 75%' } });
        gsap.fromTo(el.querySelector('.svc-content'), { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: el, start: 'top 70%' } });
      });
    });
  }, []);

  const cat = categories[active];

  return (
    <section ref={sectionRef} id="servicios" className="section-pad relative" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto">
        <div className="svc-title opacity-0 text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Todo lo que tu negocio necesita para{' '}
            <span className="gold-gradient-text">dominar su mercado.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">7 areas de servicio. Un solo equipo. Resultados reales.</p>
        </div>

        {/* Tabs */}
        <div className="svc-tabs opacity-0 flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? 'bg-gold text-[#080F24] shadow-lg shadow-gold/20'
                  : 'bg-white/[0.04] text-white/50 hover:text-white/80 hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              <span className={active === i ? 'text-[#080F24]' : 'text-gold/60'}>{c.icon}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="svc-content opacity-0">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{cat.name}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.services.map((s, i) => (
              <div key={i} className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-gold group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    s.badge === 'Premium' ? 'bg-gold/15 text-gold' : 'bg-white/[0.06] text-white/40'
                  }`}>{s.badge}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{s.name}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
