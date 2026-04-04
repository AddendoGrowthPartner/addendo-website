# ADDENDO AGENCY OS — Documento Maestro de Agentes

**Total de agentes:** 47 (46 en el sistema + 1 Growth Content Specialist)
**Última actualización:** 4 de abril de 2026
**Fuentes:** `.claude/agents/`, CLAUDE.md, BRIEFING-ADDENDO-OS.md, Arsenal Definitivo, Infraestructura-Herramientas, Contexto Completo Abril 2026, agente-deployment.md, PROMPT_AGENTE_GROWTH_CONTENT_SPECIALIST.md

---

## CAPA 01 — ENTRADA

### #1 — agente-preventa
- **Función:** Consultor de ventas que convierte prospectos en clientes. Diagnóstico rápido del negocio, propuesta con TAM/SAM/SOM, proyección de ROI y cierre.
- **Herramientas y APIs:**
  - Gamma.app (MCP) — borrador rápido de propuesta
  - Qwilr — propuesta final premium con tracking de apertura, firma digital y pago
  - Google PageSpeed Insights, GTmetrix, SSL Labs, W3C Validator, Mobile-Friendly Test
  - Google Search, Ubersuggest, Google Trends, AnswerThePublic, Ahrefs Webmaster Tools (free)
  - Social Blade, Facebook Ad Library, TikTok Creative Center
  - Google Ads Transparency Center, SpyFu (free tier)
  - Google Maps/Business Profile, Yelp, BBB
  - Statista, IBISWorld, Google Market Finder, US Census Bureau, SBA.gov, Google Keyword Planner, Bureau of Labor Statistics
  - Apollo.io — prospección B2B
  - Instantly.ai — secuencias de email frío con warming automático
  - Cal.com — agenda de reuniones
  - N8N — orquestación
- **Anti-ban:** Instantly.ai (warming automático de dominios para evitar spam)

### #2 — onboarding-cliente
- **Función:** Primer contacto post-firma. Captura datos factuales, accesos, servicios contratados. Crea sub-cuenta GHL automáticamente o integra CRM existente del cliente.
- **Herramientas y APIs:**
  - GHL API (creación automática de sub-cuenta vía N8N)
  - Google Drive (documentos de onboarding)
  - N8N (orquestación de creación de sub-cuenta, integración con CRM)
  - CRMs soportados vía N8N: HubSpot, Salesforce, Zoho CRM, Pipedrive, Monday.com, Airtable, Google Sheets
  - Slack / WhatsApp (notificaciones vía N8N)
- **Anti-ban:** Ninguna

### #3 — director-cuenta
- **Función:** Responsable de la relación con cada cliente. Conduce intake estratégico profundo, construye el Client Brief Master y coordina el handoff a agentes especializados.
- **Herramientas y APIs:**
  - Google Drive (Client Brief Master)
  - GHL-CRM (registro de cliente vía ghl-crm + n8n)
  - N8N (webhooks e integraciones)
- **Anti-ban:** Ninguna

### #4 — project-manager
- **Función:** Coordinador de ejecución. Recibe el Client Brief Master y plan estratégico, descompone en tareas, asigna agentes por capas, controla paralelismo/dependencias, monitorea estados, activa QA y cierra proyectos.
- **Herramientas y APIs:**
  - Google Drive (documentación de proyectos)
  - Coordina todas las herramientas del sistema (no ejecuta directamente)
- **Anti-ban:** Ninguna

---

## CAPA 02 — INTELIGENCIA

### #5 — agente-scraping
- **Función:** Extractor de datos de competidores, mercado y SEO. Cubre web + SEO + datos de mercado. Entrega datos estructurados al agente-investigación.
- **Herramientas y APIs:**
  - Apify (scraping completo de páginas web)
  - SEMrush API (keywords orgánicas, tráfico, autoridad, backlinks)
  - DataForSEO (posiciones en Google, SERP features, keywords locales)
  - SpyFu (historial de keywords, evolución de tráfico)
  - SimilarWeb (tráfico estimado, fuentes de tráfico)
  - Google Trends (tendencias de búsqueda, estacionalidad)
  - Google Search (verificación manual)
  - BuiltWith / Wappalyzer (tecnologías instaladas en sitios)
  - Minea (espionaje de ads e-commerce)
  - Google Drive + N8N
- **Anti-ban:** Apify maneja proxying internamente

### #6 — agente-spy-ads
- **Función:** Extractor de datos de anuncios pagados activos de competidores en Meta, Google y TikTok.
- **Herramientas y APIs:**
  - Facebook Ad Library (ads activos de Meta)
  - AdSpy (base de datos ampliada de ads Facebook)
  - BigSpy (ads en múltiples plataformas)
  - Google Ads Transparency Center
  - SpyFu (keywords pagadas, historial de ads, gasto estimado)
  - SEMrush Advertising (campañas de búsqueda pagada)
  - TikTok Creative Center (ads top-performing por nicho)
  - Minea (espionaje de ads en Meta, TikTok, Pinterest con datos de rendimiento)
  - Google Drive + N8N
- **Anti-ban:** Ninguna

### #7 — agente-redes-orgánicas
- **Función:** Extractor de datos de contenido orgánico en redes de competidores. Cubre Instagram, TikTok, Facebook, YouTube, LinkedIn, Pinterest, X, Threads y Snapchat.
- **Herramientas y APIs:**
  - Instagram Graph API + Apify Instagram Scraper
  - Apify TikTok Scraper + TikTok Research API
  - Facebook Graph API + Apify Facebook Scraper
  - YouTube Data API + Apify YouTube Scraper
  - Apify LinkedIn Scraper, Apify Pinterest Scraper, Apify Twitter/X Scraper
  - Phantombuster (extracción automatizada de perfiles)
  - Social Blade (historial de crecimiento)
  - Metricool Advanced (monitoreo diario de competidores)
  - Socialinsider (benchmarks de industria)
  - NotJustAnalytics (analytics avanzado de TikTok)
  - TikTok Creative Center, Meta Business Suite
  - Google Drive + N8N
- **Anti-ban:** Ninguna explícita (Apify y Phantombuster manejan proxying internamente)

### #8 — agente-investigación
- **Función:** Analista que consolida reportes de scraping, spy-ads y redes-orgánicas. Cruza datos, identifica patrones y produce insights accionables con niveles de confianza.
- **Herramientas y APIs:**
  - Google Drive (lectura y almacenamiento de reportes consolidados)
  - No usa herramientas externas; trabaja con reportes de los agentes de recolección
- **Anti-ban:** Ninguna

### #9 — director-estrategia
- **Función:** Convierte inteligencia consolidada en plan estratégico ejecutable con briefings específicos por agente.
- **Herramientas y APIs:**
  - Google Drive (lectura de reportes, almacenamiento de plan)
  - No usa herramientas externas directamente
- **Anti-ban:** Ninguna

### #10 — agente-auditoría
- **Función:** Auditor forense digital. 9 skills: web técnica, SEO forense, redes sociales, GHL/embudos, campañas pagas, analytics/tracking, reputación online, email marketing, velocidad comercial.
- **Herramientas y APIs:**
  - Google PageSpeed Insights API, GTmetrix API
  - Screaming Frog / Apify web crawler
  - Google Search Console API
  - SEMrush API, Ahrefs API
  - Schema Markup Validator, W3C Validator, SSL Labs API
  - Apify social media scrapers, Social Blade
  - GHL API (pipelines, workflows, contactos)
  - Meta Ads API (campañas, métricas, audiencias)
  - Google Ads API (campañas, quality scores, conversiones)
  - GA4 API (Google Analytics Data API)
  - Google Tag Manager API
  - Facebook Pixel Helper / Meta Pixel
  - Google Business Profile API
  - Apify Google Reviews Scraper, Apify Yelp Scraper
  - Brand24 / Mention API (menciones de marca)
  - BBB API/scraper
  - Mailchimp API, Klaviyo API
  - N8N
- **Anti-ban:** Ninguna

---

## CAPA 03 — PUBLICIDAD

### #11 — meta-ads
- **Función:** Especialista en Facebook e Instagram Ads. Campañas desde $5 hasta $10,000/día en cualquier mercado e idioma.
- **Herramientas y APIs:**
  - Meta Business Suite / Business Manager
  - Meta Ads Manager (campañas, ad sets, ads)
  - Meta Events Manager (Pixel, CAPI, custom conversions)
  - Advantage+ Creative, Advantage+ Audience
  - Lead Ads, Conversion Ads, Messages Ads (WhatsApp/Messenger)
  - Integración con GHL vía N8N (Lead Ads sync)
  - UTM tracking
- **Anti-ban:** Ninguna

### #12 — google-ads
- **Función:** Especialista en Google Ads: Search, Display, YouTube Ads, Performance Max, Shopping y Discovery. Campañas desde $5 hasta $10,000/día.
- **Herramientas y APIs:**
  - Google Ads Manager
  - Google Analytics 4 (vinculación)
  - Google Tag Manager
  - Google Merchant Center (Shopping)
  - Google Keyword Planner (operativo)
  - Lead Form Extensions
  - MCC (My Client Center) para agencia
  - Integración con GHL vía N8N
- **Anti-ban:** Ninguna

### #13 — tiktok-ads
- **Función:** Especialista en TikTok Ads: Ads Manager, Business Center, Creative Center y TikTok Shop. Campañas desde $5 hasta $10,000/día.
- **Herramientas y APIs:**
  - TikTok Ads Manager
  - TikTok Business Center
  - TikTok Creative Center
  - TikTok Shop (e-commerce)
  - TikTok Pixel + Events API
  - Smart+ Campaigns
  - Spark Ads, TopView, Collection Ads, Dynamic Showcase, Branded Hashtag Challenge, Branded Effects
  - Lead Generation forms nativos + integración con GHL vía N8N
- **Anti-ban:** Ninguna

### #14 — agente-linkedin-ads
- **Función:** Especialista en LinkedIn Ads B2B. Segmentación por cargo/empresa/industria/skills, ABM, Lead Gen Forms.
- **Herramientas y APIs:**
  - LinkedIn Campaign Manager
  - LinkedIn Insight Tag
  - LinkedIn Lead Gen Forms
  - LinkedIn Sales Navigator (segmentación)
  - Matched Audiences (Website Retargeting, Contact Targeting, Company Targeting, Lookalike)
  - Integración con GHL vía N8N
- **Anti-ban:** Ninguna

---

## CAPA 04 — DISEÑO Y CONTENIDO

### #15 — director-creativo
- **Función:** Dirige y aprueba toda la producción creativa. Produce briefs creativos por agente ejecutor. NO ejecuta, coordina y garantiza coherencia.
- **Herramientas y APIs:**
  - Google Drive (assets existentes vía gestor-assets)
  - No usa herramientas de diseño directamente; produce briefs
- **Anti-ban:** Ninguna

### #16 — copywriting
- **Función:** Escribe TODO el copy del sistema: ads, landing pages, emails, scripts de video, posts, propuestas, secuencias de nurturing. Opera en español e inglés.
- **Herramientas y APIs:**
  - Google Drive (entrega de documentos)
  - No usa herramientas externas; recibe briefs y produce textos
- **Anti-ban:** Ninguna

### #17 — diseño-imagen
- **Función:** Produce todas las imágenes y videos: ads, redes, thumbnails, banners, propuestas. Regla de oro: ningún creativo puede ser identificado como generado por IA.
- **Herramientas y APIs:**
  - Canva MCP (creativos rápidos)
  - Figma (diseño)
  - Adobe Creative Cloud (Photoshop, Illustrator, Premiere, After Effects)
  - Midjourney (generación de imágenes IA, refinadas extensamente)
  - DALL-E / herramientas de IA generativa
  - Leonardo AI (generación de imágenes + video IA vía API, conectado a N8N)
  - Runway ML Gen-3 (generación de video con IA)
  - HeyGen (avatares de IA para videos, español e inglés)
  - Descript (edición de video con IA, transcripción, corte por texto)
  - CapCut Pro (edición rápida TikTok/Reels, subtítulos automáticos)
  - Mux (streaming de video para páginas luxury)
  - Google Drive (entrega y catalogación vía gestor-assets)
- **Anti-ban:** Ninguna

### #18 — diseño-web
- **Función:** Especialista UX/UI. Diseña en Figma: landing pages, sitios web, páginas de captura. Entrega wireframes, design system y prototipos a frontend-dev. No codifica.
- **Herramientas y APIs:**
  - Figma (Auto Layout, Component Properties, Variables, Interactive Components, Smart Animate, Dev Mode, Branching, FigJam)
  - Spline Team (objetos 3D interactivos para páginas Nivel 3-4)
  - Google Drive (recepción de assets vía gestor-assets)
- **Anti-ban:** Ninguna

### #19 — gestor-assets
- **Función:** Organiza, cataloga y entrega todos los assets en Google Drive. Garantiza que ningún agente cree desde cero lo que ya existe.
- **Herramientas y APIs:**
  - Google Drive (organización y catalogación)
  - Google Sheets (catálogo de assets)
  - Cloudinary (gestión y optimización automática de imágenes y videos)
  - N8N (flujos automáticos de catalogación y alertas)
- **Anti-ban:** Ninguna

---

## CAPA 05 — SISTEMAS

### #20 — desarrollo-web
- **Función:** Director Técnico. Coordina frontend-dev, backend-dev y servidor-cloud. Convierte diseños Figma en plan técnico ejecutable. No codifica.
- **Herramientas y APIs:**
  - Figma (lectura de diseños)
  - No usa herramientas directamente; produce planes técnicos
- **Anti-ban:** Ninguna

### #21 — frontend-dev
- **Función:** Desarrollador frontend: Astro.js + Tailwind CSS + TypeScript. Construye landing pages, sitios web y páginas de captura.
- **Herramientas y APIs:**
  - Astro.js, Tailwind CSS, TypeScript
  - Cloudflare Pages (deploy) / Vercel Pro (deploy alternativo)
  - GSAP Club GreenSock (animaciones avanzadas: ScrollTrigger, SplitText, MorphSVG)
  - Rive (microanimaciones interactivas)
  - Three.js (3D interactivo WebGL para Nivel 4)
  - Lottie Player (animaciones JSON ligeras)
  - Figma (recepción de diseños)
  - N8N webhooks (formularios y eventos)
  - GHL (formularios embed y widgets de chat)
  - Pixels: Meta Pixel, GA4, GTM, TikTok Pixel
  - Lighthouse (performance testing)
- **Anti-ban:** Ninguna

### #22 — backend-dev
- **Función:** Desarrollador backend: Node.js/TypeScript, Cloudflare Workers y Hono. Construye APIs, bases de datos, autenticación y lógica de servidor.
- **Herramientas y APIs:**
  - Node.js, TypeScript, Hono
  - Cloudflare Workers
  - Cloudflare D1 (bases de datos)
  - Cloudflare R2 (almacenamiento de objetos)
  - OpenAPI/Swagger (documentación de APIs)
  - Stripe (pagos)
  - Postmark (emails transaccionales)
  - Auth services con refresh tokens y rotación
- **Anti-ban:** Ninguna

### #23 — ghl-crm
- **Función:** Especialista en GoHighLevel. Configura CRM, pipelines, workflows, funnels, calendarios, pagos y comunicaciones omnicanal.
- **Herramientas y APIs:**
  - GoHighLevel ($297/mes plan agencia): pipelines, workflows, funnels, calendarios, pagos
  - Stripe, PayPal (pagos)
  - Twilio (SMS, WhatsApp)
  - Mailgun, SendGrid (email deliverability)
  - N8N (integraciones externas)
- **Anti-ban:** A2P 10DLC registration (deliverability SMS en USA); DKIM/SPF/DMARC (email deliverability)

### #24 — n8n-automatización
- **Función:** Integrador central. Diseña y construye TODOS los workflows de N8N que conectan sistemas. Todo lo que necesite conectar dos sistemas pasa por este agente.
- **Herramientas y APIs:**
  - N8N self-hosted en DigitalOcean (hub central)
  - Conecta: GHL, Meta Ads API, Google Ads API, TikTok API, Google Sheets, Slack, WhatsApp, Apify, ElevenLabs, Vapi, Stripe, PayPal, Google Drive, Gmail, Cloudflare, Figma, Vercel, Freepik, DataForSEO, GitHub, Anthropic (Claude), OpenAI, Fal.ai, Cloudinary, Pexels, Google Analytics, Google Tag Manager, Google Search Console, Google My Business, Meta Business API
  - DigitalOcean (hosting de N8N)
  - Nginx reverse proxy + SSL (Let's Encrypt)
- **Anti-ban:** Ninguna

### #25 — servidor-cloud
- **Función:** Administrador de infraestructura cloud. Gestiona servidores, deploys, seguridad, backups y monitoreo.
- **Herramientas y APIs:**
  - Cloudflare (DNS, CDN, Pages, Workers, R2, D1, WAF, SSL, DNSSEC, Email Security SPF/DKIM/DMARC)
  - DigitalOcean (Droplets, backups) — IP: 104.131.41.185, Ubuntu 24
  - Nginx (reverse proxy, SSL termination, WebSocket proxying)
  - Let's Encrypt / Cloudflare SSL
  - PM2 (gestión de procesos Node.js)
  - ClamAV (antivirus)
  - UFW Firewall
  - Herramientas de monitoreo: uptime, CPU, memoria, disco
- **Anti-ban:** Cloudflare WAF, DDoS protection, rate limiting (protección de infraestructura propia)

### #26 — agentes-voz
- **Función:** Especialista en agentes de voz AI. Construye agentes conversacionales que llaman leads, confirman citas, reactivan contactos fríos y hacen encuestas post-servicio.
- **Herramientas y APIs:**
  - Vapi.ai (~$0.05/min) — orquestación de llamadas con voz AI
  - ElevenLabs ($22/mes) — síntesis de voz hiperrealista, voice cloning (con consentimiento)
  - Retell AI (alternativa para agentes de voz)
  - GHL (datos de leads, pipeline)
  - N8N (triggers de llamadas, logs)
- **Anti-ban:** TCPA compliance obligatorio para USA (opt-in requerido, horarios 8am-9pm hora local)

---

## CAPA 06 — CRECIMIENTO

### #27 — seo
- **Función:** Posicionamiento orgánico en Google y motores AI (AEO). Auditoría técnica, keyword research, on-page, off-page, local SEO y optimización para AI Overviews, ChatGPT Search, Perplexity.
- **Herramientas y APIs:**
  - Google Search Console
  - GA4
  - Ahrefs ($99-$199/mes)
  - SEMrush Pro ($129/mes)
  - Screaming Frog ($259/año)
  - DataForSEO ($50/mes)
  - Google Business Profile
  - Schema markup (JSON-LD)
  - Core Web Vitals tools
  - AI search engines: Google AI Overviews, ChatGPT Search, Perplexity, Bing Copilot, Claude
- **Anti-ban:** Ninguna

### #28 — contenido-redes
- **Función:** Gestor de contenido orgánico para redes sociales. Planifica, programa, publica y gestiona comunidad en Instagram, TikTok, Facebook, LinkedIn, YouTube.
- **Herramientas y APIs:**
  - Instagram, TikTok, Facebook, LinkedIn, YouTube (publicación directa)
  - Metricool ($53/mes) — gestión, análisis y reportes de redes
  - Google Drive (assets)
  - N8N (alertas de comunidad, DMs de leads a GHL)
- **Anti-ban:** Ninguna

### #29 — youtube-orgánico
- **Función:** Gestor de canales de YouTube orgánico. Gestiona, optimiza SEO, publica y analiza. Estrategia separada para videos largos y Shorts.
- **Herramientas y APIs:**
  - YouTube Studio / YouTube API
  - YouTube SEO tools (títulos, descripciones, tags, chapters)
  - Cards, end screens, playlists
  - Google Drive (assets)
- **Anti-ban:** Ninguna

### #30 — ventas-atención
- **Función:** Convierte leads calificados en clientes cerrados y retiene clientes activos. Gestiona seguimiento, discovery calls, cierre, objeciones y atención post-venta.
- **Herramientas y APIs:**
  - GHL (pipeline, contactos, interacciones)
  - N8N (alertas: nuevo lead, lead sin respuesta, NPS bajo, cita no-show)
  - WhatsApp, email, teléfono (canales de comunicación)
- **Anti-ban:** Ninguna

### #31 — agente-email-marketing
- **Función:** Estratega de email marketing. 4 universos: nurturing de prospectos, clientes activos, clientes en riesgo y outbound B2B frío.
- **Herramientas y APIs:**
  - GHL (universos 1-3: nurturing, clientes activos, clientes en riesgo)
  - Apollo.io ($49/mes) — universo 4: outbound B2B
  - Instantly.ai ($37/mes) — envío masivo cold email con warming y rotación de buzones
  - Lemlist ($59/mes) — outreach personalizado
  - Google Postmaster Tools (monitorear deliverability y reputación)
  - MXToolbox (verificar DKIM, SPF, DMARC, blacklists)
  - N8N (conecta Apollo/Instantly con GHL, automatiza triggers)
- **Anti-ban:** DKIM/SPF/DMARC configuración obligatoria; domain warming; Google Postmaster Tools; Instantly warming automático + rotación de buzones; MXToolbox para verificar blacklists

### #32 — agente-gbp
- **Función:** Especialista en Google Business Profile para pymes locales. Optimiza perfiles para generar llamadas, rutas y visitas al negocio.
- **Herramientas y APIs:**
  - Google Business Profile (posts, reseñas, Q&A, productos/servicios)
  - Google Business Profile API
  - N8N (alertas de reseñas y mensajes de GBP)
  - GHL (leads de GBP entran al pipeline)
  - Google Drive (fotos y creativos)
- **Anti-ban:** Ninguna

### #33 — agente-cro
- **Función:** Conversion Rate Optimization. Audita funnels, optimiza landing pages, ejecuta A/B tests y analiza mapas de calor. Más ventas sin más ads.
- **Herramientas y APIs:**
  - Hotjar Business ($39/mes) — mapas de calor, grabaciones de sesión, scroll maps
  - Microsoft Clarity (gratis) — complementa Hotjar
  - A/B testing tools
  - GHL (datos de pipeline para medir impacto en ventas)
  - GA4 (datos de funnel)
- **Anti-ban:** Ninguna

### #34 — agente-reputación
- **Función:** Reputación online. Gestiona plataformas de reseñas, monitorea menciones y ejecuta campañas de generación de reseñas.
- **Herramientas y APIs:**
  - Google Reviews (vía GBP)
  - Facebook Reviews, Yelp, BBB
  - N8N (alertas de reseñas, menciones, solicitudes automáticas)
  - GHL (secuencias de solicitud de reseña post-servicio)
  - Google Drive
- **Anti-ban:** Ninguna

### #35 — agente-prospector
- **Función:** Motor de adquisición de clientes de Addendo. Busca negocios, los califica automáticamente, genera diagnósticos y los envía a secuencias de contacto. Corre todos los días a las 6am vía N8N.
- **Herramientas y APIs:**
  - SerpAPI ($50/mes) — búsquedas en Google sin bloqueo, IPs rotativas
  - Bright Data ($50/mes) — scraping sin bloqueo, resuelve CAPTCHAs, simula humano
  - DataForSEO — análisis de posicionamiento SEO
  - PageSpeed Insights API
  - Meta Ad Library API
  - Google Ads Transparency
  - Google Maps API
  - Apollo.io ($49/mes) — datos del dueño: email verificado, LinkedIn, cargo
  - Phantombuster ($56/mes) — automatización segura de LinkedIn
  - LinkedIn Sales Navigator ($99/mes) — búsqueda avanzada B2B
  - Instantly.ai ($37/mes) — secuencias de email frío con warming automático
  - Cal.com Pro ($12/mes) — agenda de calls
  - GHL (CRM pipeline)
  - HeyGen API ($29/mes) — video diagnóstico personalizado con avatar IA
  - N8N — orquesta TODO el flujo
- **Anti-ban (ARQUITECTURA COMPLETA):**
  - **SerpAPI:** IPs rotativas, parsing automático. Reemplaza Google Search directo. Máx 200 búsquedas/día en bloques de 50 cada 4 horas
  - **Bright Data Scraping Browser:** IPs rotativas, resuelve CAPTCHAs automáticamente, simula comportamiento humano. Máx 100 sitios/día con delay 30-60s entre requests
  - **Phantombuster:** Automatización segura de LinkedIn, simula comportamiento humano, respeta límites de plataforma
  - **Instantly.ai:** Warming automático de dominios, IPs rotativas, deliverability monitoring. Máx 500 emails/día con warming activo 8am-6pm timezone del prospecto. Auto-pausa si deliverability < 80%
  - **Protocolo de rotación:** Límites diarios y delays entre acciones para todas las herramientas

---

## CAPA 07 — FINANZAS Y DATOS

### #36 — reportes
- **Función:** Consolida datos de ads, SEO, CRM, email y finanzas en reportes claros, visuales y accionables para el cliente.
- **Herramientas y APIs:**
  - Google Looker Studio (dashboards interactivos)
  - Google Sheets (datos históricos y automatizados)
  - N8N (datos automatizados vía workflows a Sheets)
  - Recibe datos de: GA4, Meta Ads, Google Ads, TikTok Ads, GHL, email marketing
- **Anti-ban:** Ninguna

### #37 — finanzas
- **Función:** Gestor financiero interno. Facturación, gastos, márgenes por cliente, MRR, flujo de caja y rentabilidad.
- **Herramientas y APIs:**
  - Stripe, PayPal (pagos recibidos)
  - QuickBooks ($30/mes) — contabilidad interna
  - Wise (pagos internacionales USA/Colombia)
  - Deel ($49/mes) — pagos al equipo en Colombia
  - N8N (automatizaciones de facturación y alertas)
  - Google Sheets (tracking financiero)
- **Anti-ban:** Ninguna

### #38 — análisis-datos
- **Función:** Analista profundo. Encuentra patrones, oportunidades y predicciones en datos crudos. Diferente de reportes (que presenta); análisis-datos DESCUBRE insights accionables.
- **Herramientas y APIs:**
  - APIs de Meta Ads, Google Ads, TikTok Ads (datos crudos)
  - GA4 API (eventos, conversiones, comportamiento)
  - GHL vía N8N (datos de pipeline)
  - Google Search Console (datos SEO)
  - N8N (extracción automatizada)
  - Modelado estadístico y machine learning
- **Anti-ban:** Ninguna

---

## CAPA 08 — CONTROL

### #39 — revisor-qa
- **Función:** Guardián de calidad. Revisa cada entregable con checklists por tipo (ads, páginas, contenido, automatizaciones, reportes, código). Aprueba o rechaza con feedback específico.
- **Herramientas y APIs:**
  - Checklists internos por tipo de entregable
  - No usa herramientas externas; revisa outputs de todos los agentes
- **Anti-ban:** Ninguna

### #40 — seguridad
- **Función:** Auditor de seguridad. Revisa código, accesos, credenciales, configuraciones y datos antes de producción. Segundo filtro después de QA.
- **Herramientas y APIs:**
  - Auditorías de: HTTPS, headers (CSP, X-Frame-Options), SSL, credenciales, SQL injection, XSS
  - CVE checking (dependencias vulnerables)
  - Rate limiting verification
  - reCAPTCHA / Cloudflare Turnstile verification
  - Compliance: CCPA, GDPR, políticas de plataformas
- **Anti-ban:** Ninguna (es quien VERIFICA las protecciones)

### #41 — aprobador
- **Función:** Última línea de aprobación. Nada sale al cliente sin su visto bueno. Verifica objetivos de negocio + estándares + QA + Seguridad completados.
- **Herramientas y APIs:**
  - No usa herramientas externas; revisa outputs aprobados por QA y Seguridad
- **Anti-ban:** Ninguna

### #42 — agente-analytics
- **Función:** Especialista en tracking. Configura y mantiene GA4, Meta Pixel, Google Ads conversions, TikTok Pixel, GTM y Conversions API.
- **Herramientas y APIs:**
  - GA4 (property, streams, events, conversions)
  - Meta Pixel + Conversions API (CAPI)
  - Google Ads conversion tracking + Enhanced Conversions
  - TikTok Pixel + Events API
  - Google Tag Manager (containers, tags, triggers, variables)
  - Cross-domain tracking
  - N8N (server-side tracking, CAPI, offline conversions)
  - GHL (tracking de eventos en funnels y formularios)
- **Anti-ban:** Ninguna

### #43 — agente-monitor
- **Función:** Vigilante permanente 24/7/365. Detecta problemas y auto-repara. Lo que no puede resolver lo pasa al agente-pqr. Tiene autoridad para pausar campañas sin esperar aprobación.
- **Herramientas y APIs:**
  - N8N (activado cada 5 minutos automáticamente)
  - Ping a: servidor DigitalOcean, N8N, APIs de Meta, Google, TikTok, GHL, WhatsApp
  - Verificación de workflows N8N activos
  - Verificación de pixels: Meta Pixel, Google Tag, TikTok Pixel
  - Config.json por cliente (fuente de verdad)
  - Monitoreo de dominios, tokens y API keys por vencer
  - UptimeRobot / Better Uptime (monitoreo de uptime)
- **Anti-ban:** Ninguna

### #44 — agente-pqr
- **Función:** Gestor de problemas. Recibe tickets del monitor, clasifica por severidad (MÁXIMO/CRÍTICO/IMPORTANTE/INFORMATIVO), coordina resolución, notifica al cliente y escala a José.
- **Herramientas y APIs:**
  - N8N (captura reportes vía WhatsApp y email)
  - GHL (tracking de tickets)
  - WhatsApp, email (notificaciones al cliente y a José)
  - Coordina con: frontend-dev, n8n, servidor-cloud, meta-ads, google-ads, tiktok-ads, linkedin-ads
- **Anti-ban:** Ninguna

### #45 — agente-deployment
- **Función:** Automatización de infraestructura. Deploy completo de sitios para clientes nuevos en menos de 15 minutos sin intervención manual.
- **Herramientas y APIs:**
  - Vercel API (crear proyectos, agregar dominios, hacer deploy)
  - Cloudflare API (configurar DNS automáticamente)
  - GitHub API (verificar/crear repositorios)
  - N8N (webhook interno, recibe trigger del PM)
  - Cloudflare Pages (deploy de frontend)
  - Cloudflare Workers (deploy de backend)
  - DigitalOcean (deploy de backend/servicios)
  - GHL (activación de pipelines, workflows, funnels)
  - Meta Ads, Google Ads, TikTok Ads (publicación de campañas)
  - Snapshots/backups para rollback
- **Anti-ban:** Ninguna

### #46 — agente-rp
- **Función:** Relaciones Públicas automatizado. Monitorea menciones, identifica oportunidades de PR, contacta periodistas, genera pitches y gestiona pipeline de cobertura mediática. Capacidad de llamadas con voz AI.
- **Herramientas y APIs:**
  - Brand24 ($79/mes) — monitoreo de menciones en tiempo real: medios, blogs, foros, redes
  - Hunter.io ($49/mes) — extracción de emails verificados de periodistas y editores
  - Gmail API — envío de pitches y seguimiento automatizado
  - Apify — scraping de medios relevantes, directorios de prensa, listas de periodistas
  - GHL (pipeline de medios: periodista = contacto, pitch = oportunidad)
  - ElevenLabs — voz humana en español e inglés para llamadas
  - Vapi — llamadas telefónicas con voz AI a periodistas
  - N8N (integrador central)
- **Anti-ban:** Ninguna

---

## AGENTE ESPECIAL — FUERA DEL SISTEMA DE CAPAS

### #47 — Growth Content Specialist
- **Función:** Sistema autónomo para generar 1 millón de views y convertir en ventas. Construye motor de contenido recurrente con investigación de nicho, generación de ideas/guiones, estructura de videos, distribución multi-plataforma, análisis de KPIs y plan de ejecución de 90 días.
- **Herramientas y APIs:**
  - Plataformas de distribución: Instagram Reels, TikTok, YouTube Shorts, LinkedIn, YouTube (largo)
  - N8N (automatización de email, WhatsApp, seguimiento)
  - Lead magnet tools: Notion, Canva, PDF
  - Landing page: Beacons, Linktree o custom
  - CRM: Google Sheets, Airtable o plataforma dedicada
  - Calendario automático de follow-ups
- **Anti-ban:** Ninguna

---

## RESUMEN — HERRAMIENTAS ANTI-BAN POR AGENTE

| Agente | Herramienta Anti-ban | Función |
|--------|---------------------|---------|
| **agente-prospector** | SerpAPI | IPs rotativas, búsquedas Google sin bloqueo. Máx 200/día |
| **agente-prospector** | Bright Data | IPs rotativas, CAPTCHAs automáticos, simula humano. Máx 100 sitios/día |
| **agente-prospector** | Phantombuster | Automatización segura LinkedIn, simula humano, respeta límites |
| **agente-prospector** | Instantly.ai | Warming automático, IPs rotativas, auto-pausa si deliverability < 80% |
| **agente-email-marketing** | DKIM/SPF/DMARC | Configuración obligatoria de email authentication |
| **agente-email-marketing** | Instantly.ai | Warming integrado + rotación de buzones |
| **agente-email-marketing** | Google Postmaster Tools | Monitoreo de deliverability y reputación |
| **agente-email-marketing** | MXToolbox | Verificación de blacklists |
| **agente-preventa** | Instantly.ai | Warming automático de dominios |
| **ghl-crm** | A2P 10DLC | Registro para SMS deliverability en USA |
| **ghl-crm** | DKIM/SPF/DMARC | Email deliverability |
| **servidor-cloud** | Cloudflare WAF | Protección DDoS, rate limiting, firewall |
| **agentes-voz** | TCPA compliance | Opt-in requerido, horarios 8am-9pm hora local USA |

---

## RESUMEN — HERRAMIENTAS CONECTADAS EN N8N (20 activas)

| Herramienta | Herramienta | Herramienta | Herramienta |
|-------------|-------------|-------------|-------------|
| Google Drive | Cloudflare | Figma | Vercel |
| GHL (GoHighLevel) | Freepik | DataForSEO | GitHub |
| Anthropic (Claude) | OpenAI | Fal.ai | Cloudinary |
| Pexels | Apify | Gmail | Google Analytics |
| Google Tag Manager | Google Search Console | Google My Business | Meta Business API |

### Pendientes por conectar (gratuitas)
Meta Ad Library API, TikTok Ads API, LinkedIn Ads API, YouTube API, Microsoft Clarity, Looker Studio, UptimeRobot

### Pendientes por conectar (de pago)
Metricool ($53), HeyGen ($29), ElevenLabs ($22), Vapi (~$20), Brand24 ($79), Hunter.io ($49), Stripe (pay per use)

---

## PRESUPUESTO MENSUAL ESTIMADO — TODAS LAS HERRAMIENTAS

| Categoría | Costo/mes |
|-----------|-----------|
| Infraestructura y hosting | $74 |
| Prospección y anti-bloqueo | $353 |
| Inteligencia competitiva | $414 |
| CRM y ventas | $347 |
| Diseño UX/UI y recursos visuales | $221 |
| Animaciones y experiencias luxury | $23 |
| Video e IA generativa | $174 |
| SEO, analytics y tracking | $39 |
| Automatización y agentes de voz | ~$30 |
| **TOTAL ESTIMADO** | **~$1,675/mes** |

---

*Documento generado automáticamente desde los archivos del Addendo Agency OS.*
*Fuentes: `.claude/agents/`, CLAUDE.md, BRIEFING-ADDENDO-OS.md, Arsenal Definitivo 2026, Infraestructura-Herramientas, Contexto Completo Abril 2026.*
