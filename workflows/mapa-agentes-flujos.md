# MAPA COMPLETO DE AGENTES Y FLUJOS DE TRABAJO — ADDENDO GROWTH PARTNER

**Generado:** 10 de abril de 2026
**Fuentes:** `agentes-addendo.md`, `workflows/*.json`, `.claude/settings.local.json`
**Total de agentes:** 47 (46 en sistema de capas + 1 especial)

---

## PARTE 1 — INVENTARIO COMPLETO DE AGENTES

### CAPA 01 — ENTRADA (4 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 1 | **agente-preventa** | Consultor de ventas. Diagnostico rapido, propuesta TAM/SAM/SOM, proyeccion ROI, cierre | Gamma.app MCP, Qwilr, PageSpeed Insights, GTmetrix, SSL Labs, W3C Validator, Mobile-Friendly Test, Google Search, Ubersuggest, Google Trends, AnswerThePublic, Ahrefs Free, Social Blade, Facebook Ad Library, TikTok Creative Center, Google Ads Transparency, SpyFu, Google Maps/GBP, Yelp, BBB, Statista, IBISWorld, Apollo.io, Instantly.ai, Cal.com, N8N | Cliente Nuevo, Leads |
| 2 | **onboarding-cliente** | Post-firma. Captura datos, accesos, crea sub-cuenta GHL automaticamente | GHL API, Google Drive, N8N, CRMs (HubSpot/Salesforce/Zoho/Pipedrive/Monday/Airtable/Sheets), Slack, WhatsApp | Cliente Nuevo |
| 3 | **director-cuenta** | Relacion con cliente. Intake estrategico, Client Brief Master, handoff a agentes | Google Drive, GHL-CRM, N8N | Cliente Nuevo |
| 4 | **project-manager** | Coordinador de ejecucion. Descompone plan en tareas, asigna agentes, controla dependencias, monitorea, activa QA | Google Drive, coordina todas las herramientas | Cliente Nuevo |

### CAPA 02 — INTELIGENCIA (6 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 5 | **agente-scraping** | Extractor de datos web + SEO + mercado de competidores | Apify, SEMrush API, DataForSEO, SpyFu, SimilarWeb, Google Trends, Google Search, BuiltWith/Wappalyzer, Minea, Google Drive, N8N | Cliente Nuevo, Inteligencia Semanal |
| 6 | **agente-spy-ads** | Extractor de anuncios pagados activos de competidores | Facebook Ad Library, AdSpy, BigSpy, Google Ads Transparency, SpyFu, SEMrush Advertising, TikTok Creative Center, Minea, Google Drive, N8N | Inteligencia Semanal |
| 7 | **agente-redes-organicas** | Extractor de contenido organico en redes de competidores (9 plataformas) | Instagram Graph API, Apify scrapers (IG/TikTok/FB/YT/LinkedIn/Pinterest/X), Phantombuster, Social Blade, Metricool, Socialinsider, NotJustAnalytics, TikTok Creative Center, Meta Business Suite, Google Drive, N8N | Inteligencia Semanal |
| 8 | **agente-investigacion** | Analista. Consolida datos de scraping/spy-ads/redes, cruza datos, produce insights con niveles de confianza | Google Drive (lectura/escritura de reportes) | Cliente Nuevo, Inteligencia Semanal |
| 9 | **director-estrategia** | Convierte inteligencia en plan estrategico ejecutable con briefings por agente | Google Drive | Cliente Nuevo |
| 10 | **agente-auditoria** | Auditor forense digital con 9 skills: web tecnica, SEO, redes, GHL/embudos, campanas pagas, analytics, reputacion, email, velocidad comercial | PageSpeed API, GTmetrix, Screaming Frog/Apify, Search Console, SEMrush, Ahrefs, Schema Validator, W3C, SSL Labs, Social Blade, GHL API, Meta Ads API, Google Ads API, GA4 API, GTM API, Meta Pixel, GBP API, Apify Review scrapers, Brand24/Mention, Mailchimp/Klaviyo API, N8N | Cliente Nuevo |

### CAPA 03 — PUBLICIDAD (4 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 11 | **meta-ads** | Especialista Facebook/Instagram Ads ($5-$10K/dia) | Meta Business Suite, Ads Manager, Events Manager (Pixel+CAPI), Advantage+, Lead Ads, Conversion Ads, Messages Ads, GHL via N8N, UTM tracking | Cliente Nuevo, Leads |
| 12 | **google-ads** | Especialista Google Ads: Search, Display, YouTube, PMax, Shopping, Discovery | Google Ads Manager, GA4, GTM, Merchant Center, Keyword Planner, Lead Form Extensions, MCC, GHL via N8N | Cliente Nuevo, Leads |
| 13 | **tiktok-ads** | Especialista TikTok Ads + TikTok Shop | TikTok Ads Manager, Business Center, Creative Center, TikTok Shop, Pixel+Events API, Smart+, Spark Ads, Lead Gen Forms, GHL via N8N | Cliente Nuevo, Leads |
| 14 | **agente-linkedin-ads** | Especialista LinkedIn Ads B2B. ABM, segmentacion por cargo/empresa/industria | LinkedIn Campaign Manager, Insight Tag, Lead Gen Forms, Sales Navigator, Matched Audiences, GHL via N8N | Cliente Nuevo, Leads |

### CAPA 04 — DISENO Y CONTENIDO (5 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 15 | **director-creativo** | Dirige produccion creativa. Produce briefs, NO ejecuta | Google Drive (assets via gestor-assets) | Cliente Nuevo |
| 16 | **copywriting** | Escribe TODO el copy: ads, landings, emails, scripts, posts, propuestas. ES/EN | Google Drive | Cliente Nuevo, Blog Automatico |
| 17 | **diseno-imagen** | Produce imagenes y videos. Regla: ningun creativo debe parecer generado por IA | Canva MCP, Figma, Adobe CC (Ps/Ai/Pr/Ae), Midjourney, DALL-E, Leonardo AI (API+N8N), Runway ML Gen-3, HeyGen, Descript, CapCut Pro, Mux, Google Drive | Cliente Nuevo |
| 18 | **diseno-web** | UX/UI en Figma. Wireframes, design system, prototipos. No codifica | Figma (Auto Layout, Components, Variables, Interactive, Smart Animate, Dev Mode, Branching, FigJam), Spline Team (3D), Google Drive | Cliente Nuevo |
| 19 | **gestor-assets** | Organiza y cataloga assets en Google Drive. Evita duplicacion | Google Drive, Google Sheets, Cloudinary, N8N | Cliente Nuevo |

### CAPA 05 — SISTEMAS (7 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 20 | **desarrollo-web** | Director Tecnico. Convierte disenos Figma en plan tecnico. No codifica | Figma (lectura) | Cliente Nuevo |
| 21 | **frontend-dev** | Desarrollador Astro.js + Tailwind + TypeScript | Astro.js, Tailwind, TS, Cloudflare Pages/Vercel, GSAP, Rive, Three.js, Lottie, Figma, N8N webhooks, GHL, Pixels (Meta/GA4/GTM/TikTok), Lighthouse | Cliente Nuevo |
| 22 | **backend-dev** | Desarrollador Node.js/TS, Cloudflare Workers, Hono | Node.js, TS, Hono, CF Workers/D1/R2, OpenAPI, Stripe, Postmark, Auth services | Cliente Nuevo |
| 23 | **ghl-crm** | Especialista GoHighLevel. CRM, pipelines, workflows, funnels, calendarios, pagos, omnicanal | GHL ($297/mes), Stripe, PayPal, Twilio (SMS/WhatsApp), Mailgun/SendGrid, N8N | Cliente Nuevo, Leads |
| 24 | **n8n-automatizacion** | Integrador central. TODOS los workflows de N8N | N8N (DigitalOcean), 20+ herramientas conectadas (ver lista abajo), Nginx+SSL | Todos los flujos |
| 25 | **servidor-cloud** | Administrador infraestructura cloud | Cloudflare (DNS/CDN/Pages/Workers/R2/D1/WAF/SSL/DNSSEC/Email Security), DigitalOcean (IP: 104.131.41.185, Ubuntu 24), Nginx, Let's Encrypt, PM2, ClamAV, UFW, UptimeRobot | Cliente Nuevo |
| 26 | **agentes-voz** | Agentes de voz AI: llamadas a leads, citas, reactivacion, encuestas | Vapi.ai (~$0.05/min), ElevenLabs ($22/mes), Retell AI, GHL, N8N | Leads |

### CAPA 06 — CRECIMIENTO (9 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 27 | **seo** | SEO + AEO (AI Engine Optimization). Auditoria, keywords, on/off-page, local, AI Overviews | Search Console, GA4, Ahrefs, SEMrush, Screaming Frog, DataForSEO, GBP, Schema JSON-LD, Core Web Vitals, AI search engines | Cliente Nuevo, Blog Automatico |
| 28 | **contenido-redes** | Gestor contenido organico. Planifica, programa, publica, gestiona comunidad | Instagram, TikTok, Facebook, LinkedIn, YouTube, Metricool ($53/mes), Google Drive, N8N | Blog Automatico |
| 29 | **youtube-organico** | Gestor canales YouTube. SEO, publicacion, analisis. Videos largos + Shorts | YouTube Studio/API, SEO tools, Cards, end screens, playlists, Google Drive | Blog Automatico |
| 30 | **ventas-atencion** | Cierre de leads + retencion de clientes. Discovery calls, objeciones, post-venta | GHL (pipeline), N8N (alertas), WhatsApp, email, telefono | Leads |
| 31 | **agente-email-marketing** | Email marketing: 4 universos (nurturing, activos, riesgo, outbound B2B frio) | GHL (U1-3), Apollo.io ($49), Instantly.ai ($37), Lemlist ($59), Google Postmaster Tools, MXToolbox, N8N | Leads |
| 32 | **agente-gbp** | Google Business Profile para pymes locales | GBP, GBP API, N8N, GHL, Google Drive | Cliente Nuevo |
| 33 | **agente-cro** | Conversion Rate Optimization. A/B tests, mapas de calor, auditoria de funnels | Hotjar ($39), Microsoft Clarity, A/B testing tools, GHL, GA4 | Cliente Nuevo |
| 34 | **agente-reputacion** | Reputacion online. Resenas, menciones, campanas de generacion de reviews | Google Reviews (GBP), Facebook/Yelp/BBB Reviews, N8N, GHL, Google Drive | Cliente Nuevo |
| 35 | **agente-prospector** | Motor de adquisicion de CLIENTES de Addendo. Busca negocios, califica, diagnostica. Corre diario 6am | SerpAPI ($50), Bright Data ($50), DataForSEO, PageSpeed API, Meta Ad Library, Google Ads Transparency, Google Maps API, Apollo.io ($49), Phantombuster ($56), LinkedIn Sales Navigator ($99), Instantly.ai ($37), Cal.com ($12), GHL, HeyGen ($29), N8N | Leads (interno) |

### CAPA 07 — FINANZAS Y DATOS (3 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 36 | **reportes** | Consolida datos de ads/SEO/CRM/email/finanzas en dashboards | Google Looker Studio, Google Sheets, N8N, datos de GA4/Meta/Google/TikTok Ads/GHL/email | Todos |
| 37 | **finanzas** | Gestor financiero interno. Facturacion, MRR, flujo de caja | Stripe, PayPal, QuickBooks ($30), Wise, Deel ($49), N8N, Google Sheets | Interno |
| 38 | **analisis-datos** | Analista profundo. Patrones, predicciones, insights accionables | Meta/Google/TikTok Ads APIs, GA4 API, GHL via N8N, Search Console, modelado estadistico/ML | Inteligencia Semanal |

### CAPA 08 — CONTROL (8 agentes)

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 39 | **revisor-qa** | Guardian de calidad. Checklists por tipo de entregable | Checklists internos | Cliente Nuevo |
| 40 | **seguridad** | Auditor de seguridad. Codigo, accesos, credenciales, compliance | HTTPS/headers/SSL/CVE/SQLi/XSS checks, reCAPTCHA/Turnstile, CCPA/GDPR | Cliente Nuevo |
| 41 | **aprobador** | Ultima linea de aprobacion. Nada sale sin su visto bueno | Revisa outputs de QA + Seguridad | Cliente Nuevo |
| 42 | **agente-analytics** | Tracking: GA4, Meta Pixel, Google Ads conversions, TikTok Pixel, GTM, CAPI | GA4, Meta Pixel+CAPI, Google Ads Enhanced Conversions, TikTok Pixel+Events API, GTM, N8N, GHL | Cliente Nuevo |
| 43 | **agente-monitor** | Vigilante 24/7/365. Detecta problemas, auto-repara, pausa campanas sin aprobacion | N8N (cada 5 min), ping a servidor/N8N/APIs, verificacion de pixels, config.json por cliente, UptimeRobot | Monitoreo continuo |
| 44 | **agente-pqr** | Gestor de problemas. Tickets, severidad, resolucion, escalamiento a Jose | N8N, GHL, WhatsApp, email | Monitoreo continuo |
| 45 | **agente-deployment** | Deploy completo de sitios en <15 min sin intervencion manual | Vercel API, Cloudflare API, GitHub API, N8N, CF Pages/Workers, DigitalOcean, GHL, Meta/Google/TikTok Ads, snapshots/backups | Cliente Nuevo |
| 46 | **agente-rp** | Relaciones Publicas automatizado. Menciones, pitches, pipeline de cobertura mediatica | Brand24 ($79), Hunter.io ($49), Gmail API, Apify, GHL, ElevenLabs, Vapi, N8N | Crecimiento |

### AGENTE ESPECIAL

| # | Agente | Funcion | Herramientas y APIs | Flujos |
|---|--------|---------|---------------------|--------|
| 47 | **Growth Content Specialist** | Sistema autonomo: 1M views + conversion a ventas. Motor de contenido recurrente 90 dias | IG Reels, TikTok, YT Shorts, LinkedIn, YouTube largo, N8N, Notion/Canva/PDF (lead magnets), Beacons/Linktree, Google Sheets/Airtable | Blog Automatico, Crecimiento |

---

## PARTE 2 — FLUJOS DE TRABAJO COMPLETOS

---

### FLUJO 1: CLIENTE NUEVO (Desde investigacion hasta sitio publicado)

```
FASE 1 — PREVENTA Y CIERRE
============================
[TRIGGER: Prospecto contacta o es encontrado por agente-prospector]

  agente-preventa (#1)
  |  Herramientas: Gamma.app, Qwilr, PageSpeed, Apollo.io, Instantly.ai, Cal.com
  |  Accion: Diagnostico rapido, propuesta TAM/SAM/SOM, proyeccion ROI
  |  Output: Propuesta firmada + pago
  v

FASE 2 — ONBOARDING
====================
  onboarding-cliente (#2)
  |  Herramientas: GHL API, Google Drive, N8N
  |  Accion: Captura datos, accesos, crea sub-cuenta GHL automaticamente
  |  Output: Cuenta GHL activa + documentos de onboarding
  v
  director-cuenta (#3)
  |  Herramientas: Google Drive, GHL, N8N
  |  Accion: Intake estrategico profundo, construye Client Brief Master
  |  Output: Client Brief Master completo
  v

FASE 3 — INTELIGENCIA
======================
  [Estos 3 agentes corren EN PARALELO]
  
  agente-scraping (#5)          agente-spy-ads (#6)          agente-redes-organicas (#7)
  | Apify, SEMrush,             | FB Ad Library, AdSpy,      | IG/TikTok/FB/YT APIs,
  | DataForSEO, SpyFu,          | BigSpy, Google Ads          | Apify scrapers,
  | SimilarWeb, BuiltWith       | Transparency, Minea         | Phantombuster, Metricool
  |                              |                             |
  +------------------------------+-----------------------------+
                                 |
                                 v
  agente-investigacion (#8)
  |  Consolida datos, cruza patrones, produce insights con nivel de confianza
  v
  agente-auditoria (#10)
  |  Herramientas: 15+ APIs (PageSpeed, SEMrush, Ahrefs, GA4, Meta/Google Ads APIs, etc.)
  |  Accion: Auditoria forense completa (9 skills)
  v
  director-estrategia (#9)
  |  Accion: Convierte inteligencia en plan estrategico con briefings por agente
  |  Output: Plan estrategico ejecutable
  v

FASE 4 — PLANIFICACION Y COORDINACION
======================================
  project-manager (#4)
  |  Accion: Descompone plan en tareas, asigna agentes, define dependencias
  |  Output: Cronograma de ejecucion
  v

FASE 5 — DISENO Y CONTENIDO (PARALELO)
========================================
  director-creativo (#15)  -->  Produce briefs para cada agente ejecutor
  |
  +---> copywriting (#16)      Textos: ads, landing, emails, scripts
  +---> diseno-imagen (#17)    Creativos: Canva MCP, Midjourney, Leonardo AI, HeyGen
  +---> diseno-web (#18)       UX/UI en Figma: wireframes, design system, prototipos
  +---> gestor-assets (#19)    Cataloga todo en Google Drive + Cloudinary
  v

FASE 6 — DESARROLLO (SECUENCIAL)
==================================
  desarrollo-web (#20)
  |  Lee disenos Figma, produce plan tecnico
  v
  frontend-dev (#21)                    backend-dev (#22)
  | Astro.js + Tailwind + TS            | Node.js + CF Workers + Hono
  | GSAP, Rive, Three.js                | D1, R2, Stripe, Postmark
  | Deploy: Vercel/CF Pages             |
  |                                      |
  +--------------------------------------+
  v

FASE 7 — INTEGRACIONES
========================
  ghl-crm (#23)                 n8n-automatizacion (#24)
  | Pipelines, workflows,       | Conecta TODOS los sistemas
  | funnels, calendarios         | 20+ herramientas activas
  |                              |
  +---> agente-analytics (#42)
  |     Configura GA4, Meta Pixel, GTM, CAPI, TikTok Pixel
  v

FASE 8 — PUBLICIDAD (PARALELO segun paquete)
==============================================
  meta-ads (#11)      google-ads (#12)      tiktok-ads (#13)      linkedin-ads (#14)
  | FB/IG Ads          | Search/Display/     | TikTok Ads +         | B2B: ABM,
  | Lead Ads            | PMax/Shopping       | TikTok Shop          | Lead Gen Forms
  | Messages Ads        | YouTube Ads         | Spark Ads            |
  v                    v                     v                      v
  [Todos envian leads a GHL via N8N]

FASE 9 — CALIDAD Y SEGURIDAD
==============================
  revisor-qa (#39)  -->  seguridad (#40)  -->  aprobador (#41)
  | Checklists            | Codigo, accesos,    | Visto bueno final
  | por tipo               | CCPA/GDPR           | Nada sale sin esto
  v

FASE 10 — DEPLOY Y LANZAMIENTO
================================
  agente-deployment (#45)
  |  Herramientas: Vercel API, Cloudflare API, GitHub API, N8N
  |  Accion: Deploy completo en <15 min sin intervencion manual
  |  Output: Sitio publicado + campanas activas
  v

FASE 11 — POST-LANZAMIENTO (CONTINUO)
========================================
  agente-monitor (#43)    --si problema-->    agente-pqr (#44)
  | 24/7, cada 5 min                          | Clasifica, escala
  | Auto-repara                                | Notifica a Jose
  v
  agente-gbp (#32)       agente-reputacion (#34)      agente-cro (#33)
  | Optimiza GBP          | Genera resenas              | A/B tests, Hotjar
  v
  reportes (#36)
  | Looker Studio dashboards para el cliente
```

---

### FLUJO 2: BLOG AUTOMATICO (Generacion diaria de articulos)

```
ESTADO ACTUAL: Parcialmente implementado en N8N
ESTADO OBJETIVO: Generacion diaria automatica

TRIGGER: Cron diario via N8N (hora configurable)

  Paso 1 — INTELIGENCIA DE KEYWORDS
  ===================================
  seo (#27) + agente-scraping (#5)
  |  Herramientas: DataForSEO, SEMrush, Ahrefs, Search Console, Google Trends
  |  Accion: Identifica keywords de alto volumen y baja competencia
  |  Accion: Analiza content gaps vs competidores
  |  Output: Lista priorizada de temas con metricas
  v

  Paso 2 — GENERACION DE CONTENIDO
  ==================================
  copywriting (#16)
  |  Herramientas: Claude API (via N8N)
  |  Accion: Genera articulo SEO-optimizado
  |  - Titulo con keyword principal
  |  - Meta description
  |  - Headers H2/H3 con keywords secundarias
  |  - Schema markup (Article, FAQ, HowTo)
  |  - Internal linking
  |  Output: Articulo completo en Markdown
  v

  Paso 3 — ASSETS VISUALES
  ==========================
  diseno-imagen (#17)
  |  Herramientas: Leonardo AI (API via N8N), Cloudinary, Pexels
  |  Accion: Genera/selecciona imagenes para el articulo
  |  Output: Imagenes optimizadas con alt text
  v

  Paso 4 — PUBLICACION
  ======================
  frontend-dev (#21) / n8n-automatizacion (#24)
  |  Herramientas: GitHub API, Vercel/CF Pages
  |  Accion: Commit del articulo al repo, trigger de deploy automatico
  |  Output: Articulo publicado en el sitio
  v

  Paso 5 — DISTRIBUCION
  =======================
  contenido-redes (#28) + youtube-organico (#29)
  |  Herramientas: Metricool, APIs de redes sociales
  |  Accion: Crea posts derivados del articulo para cada red
  |  Output: Contenido publicado en IG, TikTok, FB, LinkedIn, YT
  v

  Paso 6 — INDEXACION Y TRACKING
  ================================
  seo (#27)
  |  Herramientas: Google Search Console, Schema markup
  |  Accion: Solicita indexacion, verifica schema, monitorea posicion
  v

  Growth Content Specialist (#47)
  |  Supervisa KPIs del motor de contenido
  |  Plan de ejecucion de 90 dias
  |  Meta: 1M views acumuladas
```

---

### FLUJO 3: INTELIGENCIA SEMANAL (Spy competidores)

```
ESTADO: IMPLEMENTADO en N8N (workflows/inteligencia-mercado.json)

HAY 2 SUB-FLUJOS:

═══════════════════════════════════════════════════════════════
SUB-FLUJO A: INVESTIGACION MANUAL DE PROSPECTO
═══════════════════════════════════════════════════════════════

TRIGGER: Webhook POST a /investigacion-prospecto
DATOS DE ENTRADA: nombre_negocio, ciudad, industria, sitio_web, email_contacto, notas

  Paso 1 — RECEPCION
  ====================
  Webhook N8N recibe datos del prospecto
  |
  v
  Paso 2 — PROCESAMIENTO
  ========================
  Code Node: Extrae datos + genera keywords de busqueda:
    - "{industria} {ciudad}"
    - "best {industria} {ciudad}"
    - "{industria} near me {ciudad}"
  |
  v
  Paso 3 — RECOLECCION EN PARALELO (3 nodos simultaneos)
  ========================================================
  
  DataForSEO API                 Apify Web Scraper            Apify Google Ads Transparency
  | POST keywords_for_           | Website Content Crawler     | Google Ads Transparency
  | keywords/live                | maxCrawlPages: 3            | Scraper, max 20 results
  | US, English                  | cheerio crawler             |
  |                              |                             |
  +------------------------------+-----------------------------+
                                 |
                                 v
  Paso 4 — ANALISIS CON IA
  ==========================
  Claude API (claude-sonnet-4-20250514)
  |  Rol: Analista de inteligencia comercial de Addendo
  |  Genera propuesta comercial con 7 secciones:
  |    1. RESUMEN EJECUTIVO
  |    2. ANALISIS DE COMPETENCIA
  |    3. OPORTUNIDADES DE KEYWORDS
  |    4. ANALISIS DE ANUNCIOS
  |    5. ESTRATEGIA RECOMENDADA
  |    6. PAQUETE SUGERIDO
  |    7. PROYECCION DE RESULTADOS
  |  Output: HTML profesional
  v
  
  Paso 5 — ENTREGA
  ==================
  Gmail: Envia propuesta HTML a admin@addendo.io
  Asunto: "Propuesta Comercial — {nombre_negocio} ({ciudad})"


═══════════════════════════════════════════════════════════════
SUB-FLUJO B: INTELIGENCIA DE MERCADO SEMANAL (AUTOMATICO)
═══════════════════════════════════════════════════════════════

TRIGGER PRINCIPAL: Cron — Lunes a las 6:00 AM ("0 6 * * 1")
TRIGGER MANUAL: Webhook POST a /inteligencia-mercado-manual

  Paso 1 — LISTA DE CLIENTES ACTIVOS
  =====================================
  Code Node genera lista de clientes activos:
    - Don Jacinto Nahual (industria: brujo)
    - Addendo (industria: marketing agency)
  |
  v
  Paso 2 — POR CADA CLIENTE, EN PARALELO:
  ==========================================
  
  DataForSEO (limit 50)         Apify Google Ads              Apify Web Scraper
  | Keywords por industria       | Transparency (max 30)       | Crawl sitio (max 5 pags)
  |                              |                             |
  +------------------------------+-----------------------------+
                                 |
                                 v
  Paso 3 — ANALISIS CON IA
  ==========================
  Claude API (claude-sonnet-4-20250514)
  |  Genera reporte semanal con 6 secciones:
  |    1. RESUMEN EJECUTIVO
  |    2. IDEAS DE BLOGS (5 ideas con keyword, volumen, angulo unico)
  |    3. OPORTUNIDADES DE KEYWORDS (tabla con nuevas/cambiadas)
  |    4. MEJORAS AL SITIO WEB
  |    5. ANALISIS DE ANUNCIOS COMPETIDORES
  |    6. ACCIONES RECOMENDADAS ESTA SEMANA (top 3 priorizadas)
  v
  
  Paso 4 — ENTREGA
  ==================
  Gmail: Envia reporte HTML a admin@addendo.io
  Header y footer con branding Addendo
```

---

### FLUJO 4: LEADS (GHL a WhatsApp)

```
ESTADO: Disenado, implementacion via GHL + N8N

TRIGGER: Lead capturado en cualquier fuente

  FUENTES DE LEADS (entradas multiples):
  ========================================
  
  meta-ads (#11)        google-ads (#12)       tiktok-ads (#13)       linkedin-ads (#14)
  | Lead Ads             | Lead Form             | Lead Gen Forms        | Lead Gen Forms
  | Messages Ads          | Extensions            |                      |
  |                      |                       |                      |
  +----------------------+-----------------------+----------------------+
                         |
                         v
  Paso 1 — CAPTURA EN GHL
  =========================
  ghl-crm (#23) via n8n-automatizacion (#24)
  |  Herramientas: GHL API, N8N
  |  Accion: Lead entra al pipeline automaticamente
  |  - Se crea contacto en GHL
  |  - Se asigna a pipeline y stage correspondiente
  |  - Se tagea con fuente (Meta/Google/TikTok/LinkedIn)
  v

  Paso 2 — NOTIFICACION INMEDIATA
  ==================================
  n8n-automatizacion (#24)
  |  Herramientas: Twilio (WhatsApp), N8N
  |  Accion: Notificacion instantanea al equipo via WhatsApp
  |  Output: "Nuevo lead: {nombre} - {fuente} - {servicio}"
  v

  Paso 3 — RESPUESTA AUTOMATICA AL LEAD
  ========================================
  ghl-crm (#23)
  |  Herramientas: GHL workflows, Twilio WhatsApp
  |  Accion: Mensaje automatico de bienvenida al lead via WhatsApp
  |  - Saludo personalizado
  |  - Confirmacion de recepcion
  |  - Pregunta calificadora o link a Cal.com
  v

  Paso 4 — SEGUIMIENTO AUTOMATIZADO
  ====================================
  agente-email-marketing (#31) + ventas-atencion (#30)
  |  Herramientas: GHL (nurturing), Instantly.ai, N8N
  |  Accion: Secuencia de nurturing multi-canal
  |  - WhatsApp: seguimientos a 1h, 24h, 72h
  |  - Email: secuencia de 5 emails
  |  - SMS: recordatorio de cita
  v

  Paso 5 — LLAMADA CON VOZ AI (OPCIONAL)
  =========================================
  agentes-voz (#26)
  |  Herramientas: Vapi.ai, ElevenLabs
  |  Accion: Llamada automatica al lead para:
  |  - Confirmar cita agendada
  |  - Reactivar lead frio (sin respuesta en 48h)
  |  - Encuesta post-servicio
  |  Cumplimiento: TCPA (opt-in, horarios 8am-9pm)
  v

  Paso 6 — CALIFICACION Y CIERRE
  ==================================
  ventas-atencion (#30)
  |  Herramientas: GHL, WhatsApp, email, telefono
  |  Accion: Discovery call, manejo de objeciones, cierre
  |  
  |  Si lead califica --> Mueve a stage "Propuesta"
  |  Si no califica --> Mueve a stage "Nurturing largo"
  v

  Paso 7 — MONITOREO DE PIPELINE
  =================================
  n8n-automatizacion (#24)
  |  Herramientas: N8N (alertas automaticas)
  |  Alertas activas:
  |  - Nuevo lead sin respuesta en 30 min
  |  - Lead en pipeline > 7 dias sin avance
  |  - NPS bajo de cliente
  |  - Cita no-show
  v
  
  reportes (#36) + analisis-datos (#38)
  |  Looker Studio: Dashboard de conversion por fuente
  |  Analisis: CAC, LTV, tasa de conversion por canal
```

---

## PARTE 3 — HERRAMIENTAS CONECTADAS EN N8N (20 activas)

| # | Herramienta | Uso principal |
|---|-------------|---------------|
| 1 | Google Drive | Documentos, assets, reportes |
| 2 | Cloudflare | DNS, CDN, Pages, Workers |
| 3 | Figma | Disenos |
| 4 | Vercel | Deploy de sitios |
| 5 | GHL (GoHighLevel) | CRM, pipelines, funnels |
| 6 | Freepik | Recursos graficos |
| 7 | DataForSEO | Keywords, SERP, posiciones |
| 8 | GitHub | Repositorios, deploy |
| 9 | Anthropic (Claude) | Analisis IA, generacion de contenido |
| 10 | OpenAI | IA complementaria |
| 11 | Fal.ai | Generacion de imagenes/video IA |
| 12 | Cloudinary | Optimizacion de imagenes/videos |
| 13 | Pexels | Stock de fotos gratis |
| 14 | Apify | Scraping web, ads, redes |
| 15 | Gmail | Envio de reportes y propuestas |
| 16 | Google Analytics | Tracking |
| 17 | Google Tag Manager | Tags de conversion |
| 18 | Google Search Console | SEO |
| 19 | Google My Business | Perfiles locales |
| 20 | Meta Business API | Ads y datos de Meta |

### Pendientes por conectar

**Gratuitas:** Meta Ad Library API, TikTok Ads API, LinkedIn Ads API, YouTube API, Microsoft Clarity, Looker Studio, UptimeRobot

**De pago:** Metricool ($53), HeyGen ($29), ElevenLabs ($22), Vapi (~$20), Brand24 ($79), Hunter.io ($49), Stripe (pay per use)

---

## PARTE 4 — PRESUPUESTO MENSUAL

| Categoria | Costo/mes |
|-----------|-----------|
| Infraestructura y hosting | $74 |
| Prospeccion y anti-bloqueo | $353 |
| Inteligencia competitiva | $414 |
| CRM y ventas | $347 |
| Diseno UX/UI y recursos visuales | $221 |
| Animaciones y experiencias luxury | $23 |
| Video e IA generativa | $174 |
| SEO, analytics y tracking | $39 |
| Automatizacion y agentes de voz | ~$30 |
| **TOTAL ESTIMADO** | **~$1,675/mes** |

---

## NOTAS IMPORTANTES

1. **No existe directorio `.claude/agents/`** — El documento `agentes-addendo.md` referencia esta ruta pero el directorio no ha sido creado. Los agentes estan definidos conceptualmente en `agentes-addendo.md`, no como archivos individuales de agente.

2. **No existen archivos `CLAUDE.md` ni `BRIEFING-ADDENDO-OS.md`** en el proyecto actual. Son referenciados como fuentes en `agentes-addendo.md` pero no estan presentes en el repositorio.

3. **Workflows N8N implementados:** Solo 2 workflows estan implementados como JSON en `/workflows/`:
   - Investigacion Manual de Prospecto (webhook)
   - Inteligencia de Mercado Semanal (cron lunes 6am)

4. **Modelo de IA en produccion:** `claude-sonnet-4-20250514` (usado en ambos workflows de N8N)

5. **Servidor N8N:** Self-hosted en DigitalOcean (IP: 104.131.41.185, Ubuntu 24)

6. **Stack del sitio web:** Astro.js + React + TypeScript + Tailwind CSS + GSAP, desplegado en Vercel

---

*Documento generado por Claude Code desde el analisis completo del repositorio addendo-website.*
