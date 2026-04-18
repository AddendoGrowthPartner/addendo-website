# ORGANIGRAMA ADDENDO — Fuente de Verdad del Flujo de Trabajo

**Sistema:** Addendo Agency OS
**Versión:** 1.0 — 18 de abril de 2026
**Cobertura:** 54 agentes organizados en 9 capas + 4 especiales
**Propósito:** Definir cómo fluye el trabajo entre agentes para entregar con calidad y velocidad world-class
**Relación con CLAUDE.md:** CLAUDE.md es el índice del sistema. Este documento es el manual operativo del flujo.

---

## SECCIÓN 1 — INTRODUCCIÓN

### 1.1 ¿Por qué existe este documento?

CLAUDE.md lista los 54 agentes del sistema, qué skill usa cada uno, y a quién reportan. Eso es necesario pero no suficiente. Listar agentes no es lo mismo que saber cómo trabajan juntos.

Una agencia con 54 especialistas brillantes pero sin flujo de trabajo definido produce ruido, no resultados. Los briefs llegan incompletos, los handoffs se pierden, los agentes improvisan porque no saben qué esperar del anterior, y los entregables al cliente reflejan esa falta de coordinación. El cliente percibe incoherencia — cada pieza suena a marca distinta porque cada agente partió de un input distinto.

Este organigrama existe para que eso no ocurra nunca en Addendo. Define con precisión:

- **Quién arranca cada flujo de trabajo.** Nunca hay ambigüedad sobre dónde empieza una tarea.
- **Qué input recibe cada agente.** Nunca un agente arranca sin tener lo que necesita.
- **Qué output entrega cada agente.** Nunca un agente termina sin saber a quién pasa la posta.
- **Dónde están los puntos de control.** Nunca se publica al cliente sin pasar por QA + legal + aprobador cuando corresponde.
- **Cuánto dura cada flujo.** Expectativa realista por tipo de trabajo.

### 1.2 Principio rector: **Proceso antes que talento individual**

La agencia mediocre confía en que su mejor diseñador, su mejor copywriter y su mejor media buyer se coordinen "sobre la marcha". Cuando los tres son buenos pero trabajan sin proceso, el resultado es mediocre porque la coordinación ad-hoc mata el 40% del valor. La agencia mediocre culpa entonces a los individuos — "falta atención al detalle", "falta comunicación", "falta proactividad" — sin darse cuenta de que el problema no es quién hace el trabajo sino cómo fluye entre quienes lo hacen.

La agencia world-class entiende lo opuesto: **el proceso define el output mucho más que el talento individual**. Un copywriter promedio operando dentro de un flujo disciplinado produce mejor resultado que un copywriter estrella operando sin flujo. Porque el flujo bien diseñado garantiza que el copywriter reciba el brief completo (strategy doc + brand brief + research + keywords), sepa exactamente qué entregar, tenga claro a quién pasa, y no pierda energía improvisando contexto.

Por eso este organigrama no es una sugerencia. Es la arquitectura operativa del sistema. Si un flujo no se sigue, no se entrega. Si un input falta, no se arranca. Si un output no pasa por control de calidad, no se publica. No hay atajos, no hay excepciones "porque es urgente", no hay improvisación. La disciplina del proceso es lo que permite que 54 agentes produzcan como un solo organismo — y esa es la única razón por la cual Addendo puede prometer calidad world-class a velocidad de agencia moderna.

### 1.3 Cómo usar este organigrama

**Al iniciar cualquier tarea nueva**, Claude Code debe:

1. Identificar qué flujo de trabajo aplica (Sección 3 de este documento)
2. Leer ese flujo completo antes de activar agentes
3. Validar que los inputs iniciales del primer agente del flujo estén disponibles
4. Si faltan inputs: pausar y obtenerlos antes de arrancar
5. Ejecutar el flujo paso a paso, respetando los puntos de control
6. Documentar la ejecución para que el siguiente responsable pueda retomar

**Al recibir una orden de José**, Claude Code debe:

1. Mapear la orden al flujo correspondiente usando la Matriz de Decisión Rápida (Sección 4)
2. Confirmar con José el flujo identificado si hay ambigüedad
3. Informar el tiempo estimado antes de arrancar
4. Reportar al final con los entregables del flujo

**Al introducir un agente o flujo nuevo**, Claude Code debe:

1. Seguir el proceso de actualización (Sección 6) antes de modificar este documento
2. Sincronizar CLAUDE.md y este organigrama en el mismo commit
3. Validar que no rompe ningún flujo existente

### 1.4 Relación con CLAUDE.md

| Documento | Función |
|-----------|---------|
| `CLAUDE.md` | Índice maestro. Lista los 54 agentes, sus skills, sus capas, las reglas de comportamiento del sistema. Es el "qué hay". |
| `ORGANIGRAMA-ADDENDO.md` | Manual operativo del flujo. Define cómo los 54 agentes trabajan juntos para entregar resultados. Es el "cómo se hace". |
| `.claude/agents/skills-globales/[agente].md` | Skill específico de cada agente. Detalla el método, herramientas y outputs de ese agente en particular. Es el "con qué rigor se hace cada parte". |

Los tres documentos son complementarios. Claude Code carga CLAUDE.md siempre (está en el root). Lee este organigrama al iniciar un flujo. Lee el skill del agente específico al activarlo. Los tres deben estar sincronizados — si hay conflicto entre documentos, se resuelve actualizando todos en el mismo commit.

### 1.5 Filosofía del flujo

> "Un sistema con 54 agentes coordinados por proceso es infinitamente más poderoso que un sistema con 54 agentes coordinados por improvisación. El proceso es la multiplicación del talento; la improvisación es la división."

Cada flujo en este documento fue diseñado con tres principios en mente:

1. **Mínimo handoff, máxima claridad.** Cada transición entre agentes lleva el contexto necesario para que el siguiente no tenga que pedir nada. Nunca un "¿me puedes pasar X?" después del handoff.
2. **Puntos de control antes de publicar.** Ninguna pieza sale al cliente sin pasar por los filtros de calidad (QA), legal (si aplica), y aprobador. Los tres son complementarios, no redundantes.
3. **Documentación como subproducto.** Cada paso deja un rastro escrito. El strategy doc, el brand brief, los tickets de deployment, los reportes — todos se guardan en la carpeta del cliente. Al terminar el flujo, existe un expediente completo de lo que se hizo y por qué.

### 1.6 Cómo leer este documento

Este documento tiene dos modos de lectura:

**Modo referencia** — se consulta cuando José da una orden y Claude Code necesita identificar el flujo correcto.
1. Ir a Sección 4.1 (matriz principal) y buscar la frase que más se parece a lo que dijo José.
2. Activar el flujo indicado.
3. Leer el paso a paso del flujo correspondiente en Sección 3.
4. Ejecutar siguiendo el orden.

**Modo estudio** — se lee completo cuando se quiere entender el sistema o cuando se va a actualizar el documento.
1. Leer en orden las 6 secciones.
2. Prestar atención a los puntos de control y riesgos comunes de cada flujo.
3. Entender las 12 reglas de oro como el contrato del sistema.
4. Usar la vista unificada (Sección 2 final) para visualizar el ciclo de vida completo del cliente.

Si este documento se contradice con un skill específico de agente, se actualiza en el commit siguiente. La verdad está en el sistema, no en el documento — este documento es la representación más fiel que tenemos del sistema.

---

## SECCIÓN 2 — LOS 54 AGENTES AGRUPADOS POR CAPA

Esta sección lista cada agente con su rol en una línea y su función clave. Para el detalle técnico completo, ver el skill de cada agente en `.claude/agents/skills-globales/`.

### CAPA 01 — ENTRADA (convierten prospecto en cliente pagado)

Los 4 agentes de esta capa son el punto de entrada del sistema. Sin ellos, no hay cliente. Con ellos bien ejecutados, cada cliente que firma llega con expectativas claras, datos completos y un plan inicial.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #1 | `agente-preventa` | Calificador de oportunidades | Convierte prospecto interesado en oportunidad calificada lista para cerrar. Filtra basura, cualifica fit, arma propuesta. |
| #2 | `onboarding-cliente` | Conductor del kickoff | Después de firmar contrato, recoge toda la información necesaria del cliente para que el sistema arranque: accesos, assets, contexto del negocio, objetivos, deadlines. |
| #3 | `director-cuenta` | Dueño de la relación | Único punto de contacto del cliente con Addendo. Traduce el lenguaje del cliente al lenguaje del sistema y viceversa. Defiende tiempos, presupuestos, expectativas. |
| #4 | `project-manager` | Coordinador maestro | Asigna tareas, rastrea avance, desbloquea bloqueos, mantiene el cliente dentro de timeline y presupuesto. Reporta a José sobre el estado de la cartera. |

### CAPA 02 — INTELIGENCIA (investigan antes de decidir)

Los 6 agentes de esta capa hacen la investigación sobre la cual se toman todas las decisiones estratégicas downstream. Sin inteligencia sólida, la estrategia es opinión y la ejecución es ruido.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #5 | `agente-scraping` | Extractor de datos web | Scrape masivo de sitios, SERPs, directorios, catálogos competidores. Alimenta al resto con data fresca. |
| #6 | `agente-spy-ads` | Análisis de ads competidores | Extrae ads activos de Meta Ad Library, Google Ads Transparency, TikTok Creative Center, LinkedIn Ad Library. Identifica ángulos, ofertas, targeting visible. |
| #7 | `agente-redes-organicas` | Análisis de contenido orgánico | Extrae el contenido orgánico de competidores en IG, FB, TikTok, LinkedIn, YouTube. Identifica qué funciona por engagement. |
| #8 | `agente-investigacion` | Consolidador estratégico | Recibe outputs de #5, #6, #7 + research primaria del cliente. Produce el Reporte de Inteligencia Competitiva que alimenta al director-estrategia. |
| #9 | `director-estrategia` | Arquitecto del plan macro | Convierte inteligencia en Plan Estratégico de alto nivel: presupuesto, canales prioritarios, hipótesis iniciales, KPIs a medir. |
| #10 | `agente-auditoria` | Auditor digital forense | Hace auditoría 360° del estado digital actual del cliente: sitio, SEO, ads activos, CRM, analytics, reviews. Identifica quick wins y problemas estructurales. |

### CAPA 03 — PUBLICIDAD (traen leads por canales pagos)

Los 5 agentes de esta capa son los trafikeros del sistema. Traen leads a costo predecible por canal. Sin ellos, el cliente depende 100% del orgánico y eso es lento.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #11 | `meta-ads` | Trafikero Meta | Campañas en Facebook e Instagram. Volumen, Advantage+, Lookalikes, retargeting. Costo por lead bajo, alta escala. |
| #12 | `google-ads` | Trafikero Google | Search, Performance Max, YouTube, Display. Captura intención. Costo por lead más alto pero mayor calidad. |
| #13 | `tiktok-ads` | Trafikero TikTok | Campañas TikTok Ads. Audiencias jóvenes, formatos UGC, bajo CPM. |
| #14 | `linkedin-ads` | Trafikero B2B | LinkedIn Campaign Manager, Sales Navigator, Lead Gen Forms. El único canal con targeting profesional quirúrgico. |
| #48 | `youtube-ads` | Trafikero YouTube | TrueView, Bumpers, YouTube Shorts ads. Brand + conversion. Costo por vista bajo, alcance masivo. |

### CAPA 04 — DISEÑO Y CONTENIDO (producción creativa)

Los 5 agentes de esta capa producen los creativos, copy y diseño que los agentes de publicidad y los sitios web necesitan.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #15 | `director-creativo` | Puente entre estrategia y ejecución | Convierte el plan estratégico en briefs creativos ejecutables. Cada brief que sale de aquí debe ser tan completo que el ejecutor no pregunte. |
| #16 | `copywriting-seo` | Redactor world-class | Copy persuasivo + SEO técnico. Headlines, body copy, ads, emails, landing pages, artículos SEO. |
| #17 | `diseno-imagen` | Productor visual con IA | Imágenes estáticas y video generadas con Midjourney, Fal.ai, Freepik AI, Canva. Post-procesamiento en Adobe. |
| #18 | `diseno-web` | Arquitecto UI/UX de sitios | Wireframes, mockups, flujo de usuario, sistema de componentes. Entrega Figma listo para frontend. |
| #19 | `gestor-assets` | Catalogador de assets | Organiza todos los assets del cliente en Cloudinary/Drive con nomenclatura consistente. Nadie vuelve a perder un asset. |

### CAPA 05 — SISTEMAS (construyen infraestructura técnica)

Los 7 agentes de esta capa construyen y mantienen la infraestructura técnica del cliente: sitios, CRM, automatizaciones, servidores.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #20 | `desarrollo-web` | Full-stack senior | Backend + frontend completo. Decide stack, arquitectura, deploys. Astro + Vercel por defecto. |
| #21 | `frontend-dev` | Especialista UI | Componentes, animaciones, performance, SEO técnico del front. Tailwind + shadcn/ui. |
| #22 | `backend-dev` | Especialista APIs | APIs, integraciones, webhooks, bases de datos. Node, Python, serverless. |
| #23 | `ghl-crm` | Operador GHL | Configura y mantiene Go High Level como CRM del cliente. Pipelines, automatizaciones, campañas. |
| #24 | `n8n-automatizacion` | Orquestador de workflows | N8N self-hosted en AWS. Conecta todo: forms, webhooks, CRM, Slack, Gmail, Claude API. |
| #25 | `servidor-cloud` | DevOps AWS | EC2, PM2, Cloudflare, certificados, monitoring, backups. Mantiene la infraestructura viva. |
| #26 | `agentes-voz` | Agentes de voz | Sistemas de llamadas automatizadas con Vapi/Retell. Calificación, agendamiento, follow-up por voz. |

### CAPA 06 — CRECIMIENTO (SEO, contenido, conversión)

Los 9 agentes de esta capa construyen el growth orgánico del cliente y optimizan la conversión del tráfico pagado.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #27 | `seo` | Posicionador Google + AI search | Domina Google, Perplexity, ChatGPT Search, Bing Copilot. SEO técnico + AEO. |
| #28 | `contenido-redes` | Gestor de orgánico en redes | Calendario + publicación + community management en IG, FB, TikTok, LinkedIn, X. |
| #29 | `youtube-organico` | Cultivador de canales YouTube | Estrategia de canal, guiones, thumbnails, optimización. Paciente y sistemático. |
| #30 | `ventas-atencion` | Cerrador humano+IA | Atiende los leads calificados que traen los agentes de ads y DMs. Cierra. |
| #31 | `agente-email-marketing` | Especialista email | Secuencias de nurturing, broadcasts, cold outreach. ROI $36 por $1. |
| #32 | `agente-gbp` | SEO Local (Google Maps) | Google Business Profile. Domina el Maps Pack que genera 44% de clics locales. |
| #33 | `agente-cro` | Optimizador de conversión | A/B tests, quick wins, fricciones del funnel. Cierra el bucle con el tráfico pagado. |
| #34 | `agente-reputacion` | Gestor de reviews | Solicita reviews, responde reviews buenas y malas, protege la reputación online. |
| #35 | `agente-prospector` | Cazador de leads B2B | Identifica, contacta y califica prospects B2B para Addendo y clientes que vendan B2B. |

### CAPA 07 — FINANZAS Y DATOS

Los 3 agentes de esta capa miden, reportan y controlan la salud financiera y operativa.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #36 | `reportes` | Consolidador de reportes | Formatea visualmente los reportes mensuales y los entregables de data para el cliente. |
| #37 | `finanzas` | Control financiero | Facturación, cuentas por cobrar, control de presupuesto por cliente, P&L de Addendo. |
| #38 | `analisis-datos` | Analista de data | Toma data cruda (GA4, Ads, CRM) y genera insights accionables. Alimenta a #36 y #3. |

### CAPA 08 — CONTROL (validan antes de publicar)

Los 8 agentes de esta capa son los filtros de calidad del sistema. Nada sale al cliente sin pasar por aquí.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #39 | `revisor-qa` | QA transversal | Revisa calidad técnica, gramatical, visual, funcional de todo lo producido antes de publicar. |
| #40 | `seguridad` | Auditor de seguridad | Revisa código, accesos, dependencias, secretos. Hardening continuo. |
| #41 | `aprobador` | Filtro final | Última firma antes del cliente. Integra outputs de #39 + #40 + #52 y decide si publica. |
| #42 | `agente-analytics` | Configurador de tracking | GA4, GTM, Meta Pixel, conversiones. Sin él, nada se puede medir. |
| #43 | `agente-monitor` | Vigilante 24/7 | Monitorea uptime, campañas, webhooks, servidores, reviews. Alerta al responsable correspondiente. |
| #44 | `agente-pqr` | Manejador de quejas | Recibe quejas/problemas del cliente. Clasifica, escala, resuelve, documenta. |
| #45 | `agente-deployment` | Publicador técnico | GitHub + Vercel + servidores. Publica sitios, actualizaciones, blog posts. |
| #46 | `agente-rp` | Relaciones públicas | Guest posts, backlinks de calidad, menciones en medios. Construye autoridad del dominio. |

### AGENTES ESPECIALES

Los 4 agentes transversales que no pertenecen a una capa específica pero se activan cuando el flujo los requiere.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #47 | `growth-content-specialist` | Motor de contenido SEO | Ejecuta blogs automáticos con investigación real + redacción + deploy. Activa cuando el cliente compró "motor de contenido". |
| #49 | `agente-manychat` | Automatizador de DMs | Respuesta automática en IG/FB/WhatsApp DMs. Califica, agenda, integra con CRM. |
| #50 | `agente-constructor-workflows` | Builder de workflows N8N | Construye y mantiene los workflows N8N complejos del sistema. |
| #51 | `agente-video-director` | Director de video con IA | Diseña estrategia + guion técnico para videos. Coordina con #17 para producción y #28 para publicación. |

### CAPA 09 — GOBERNANZA Y ESTRATEGIA DE CLIENTE (transversales por cliente)

Los 3 agentes de esta capa nueva son el puente entre la estrategia macro y la producción. Se activan al INICIO de cada cliente nuevo y vuelven a activarse cada vez que hay un cambio estratégico relevante. Sus outputs viven en `/brand-briefs/[cliente].md` y `/strategy-docs/[cliente].md` y son la fuente de verdad para todos los agentes de producción.

| # | Agente | Rol | Función clave |
|---|--------|-----|--------------|
| #52 | `agente-legal` | Guardián regulatorio | Revisa todo el marketing contra marcos CROA, FDUTPA, CSO Florida, FTC, TSR, TILA, UDAAP, GLBA y leyes aplicables. Puede BLOQUEAR publicación. |
| #53 | `agente-branding` | Arquitecto de identidad visual | Define paleta, tipografía, sistema de diseño del cliente. Su brand brief alimenta a #18, #17, #21, #16. |
| #54 | `agente-estrategia-comercial` | Arquitecto GTM operativo | Convierte el Plan Estratégico macro en strategy doc operativo: posicionamiento, buyer persona, journey, funnel, sitemap, plan 90 días. |

**Total: 54 agentes activos.** Si se añade uno nuevo, este organigrama y CLAUDE.md deben actualizarse en el mismo commit.

### Vista unificada — agentes por responsabilidad primaria

Para navegación rápida, los 54 agentes ordenados por el momento en que típicamente se activan en la vida de un cliente:

**Fase 0 — Preventa y cierre:** #1, #35
**Fase 1 — Onboarding (primeros 14 días):** #2, #3, #4, #5, #6, #7, #8, #9, #10, #54, #53, #52
**Fase 2 — Construcción inicial (días 14-45):** #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #42
**Fase 3 — Lanzamiento y tráfico (días 30-60):** #11, #12, #13, #14, #48, #49, #26
**Fase 4 — Crecimiento y optimización (días 60+):** #27, #28, #29, #30, #31, #32, #33, #34, #47, #46, #51
**Fase 5 — Control continuo (siempre):** #39, #40, #41, #43, #44, #45, #52
**Fase 6 — Reporte y cierre:** #36, #37, #38

Un mismo agente puede activarse en múltiples fases (ej. #52 legal es transversal). Esta vista es para intuición rápida, no para reemplazar el detalle de los flujos en la Sección 3.

---

## SECCIÓN 3 — LOS 10 FLUJOS DE TRABAJO ESTÁNDAR

Cada flujo está documentado con: diagrama ASCII, paso a paso numerado con input/output por agente, puntos de control, tiempo estimado, entregables finales.

### FLUJO 1 — Onboarding de cliente nuevo

**Cuándo se activa:** cuando un prospecto firma el contrato con Addendo.
**Dispara:** `director-cuenta` (#3) al recibir la confirmación de firma.
**Objetivo:** convertir al nuevo cliente en cliente operativo del sistema, con strategy doc + brand brief + plan 90 días listos para producción.

```
┌─────────────────────────────────────────────────────────────────┐
│  CONTRATO FIRMADO                                                │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #1 agente-preventa              │
        │  Handoff del contrato firmado +  │
        │  contexto de preventa            │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #2 onboarding-cliente           │
        │  Recoge accesos, assets, brief   │
        │  de cliente                      │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #3 director-cuenta              │
        │  Recibe Brief Maestro, define    │
        │  comunicación con cliente         │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  PARALELO: #10 agente-auditoria  │
        │  + #5/#6/#7 + #8 investigación   │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #9 director-estrategia          │
        │  Plan Estratégico macro          │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #54 agente-estrategia-comercial │
        │  Strategy doc operativo          │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #53 agente-branding             │
        │  Brand brief                     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #52 agente-legal                │
        │  Revisión compliance de brand    │
        │  brief + strategy doc             │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #4 project-manager              │
        │  Plan 90 días + activación de    │
        │  capas de producción              │
        └──────────────────────────────────┘
                             │
                             ▼
                    CLIENTE OPERATIVO
```

**Paso a paso:**

1. **#1 agente-preventa** — Input: contrato firmado + notas de preventa. Output: paquete de handoff con contexto del cliente (qué compró, expectativas verbales, compromisos). Entrega a #2.

2. **#2 onboarding-cliente** — Input: paquete de #1. Output: Brief Maestro del cliente con accesos (GA4, Ads, CRM, GBP, redes), assets (logos, imágenes, videos previos), contexto del negocio (producto, oferta, precio, competidores conocidos), objetivos medibles (KPIs), restricciones (compliance, brand guidelines previas, idioma, tono), deadlines. Entrega a #3.

3. **#3 director-cuenta** — Input: Brief Maestro. Output: Kickoff call agendado con cliente + plan de comunicación definido (frecuencia, canal, formato de reportes) + expectativas reseteadas en palabras del cliente. Dispara el paso 4 (investigación) y paso 5 (auditoría) en paralelo.

4. **Paralelo A: #10 agente-auditoria** — Input: accesos del cliente. Output: Auditoría Digital Forense con estado actual del sitio, SEO, campañas activas, tracking, reviews, reputación. Identifica quick wins y problemas estructurales.

5. **Paralelo B: #5 + #6 + #7** — Input: lista de competidores identificados en Brief Maestro. Output: datasets de competidores (web/SEO de #5, ads de #6, orgánico de #7).

6. **#8 agente-investigacion** — Input: outputs de #5, #6, #7, #10. Output: Reporte de Inteligencia Competitiva consolidado con identificación de ventajas competitivas del cliente, gaps frente a competencia, oportunidades de posicionamiento.

7. **#9 director-estrategia** — Input: Brief Maestro + Reporte de #8 + Auditoría de #10. Output: Plan Estratégico macro con canales prioritarios, presupuesto inicial, hipótesis a testear, KPIs a medir en 90 días, riesgos identificados.

8. **#54 agente-estrategia-comercial** — Input: Plan Estratégico macro + Brief Maestro + Reporte de inteligencia. Output: strategy doc operativo en `/strategy-docs/[cliente].md` con positioning statement final, buyer persona en 12 dimensiones, customer journey 5 fases + 4 sub-fases, arquitectura de funnel, sitemap de sitio web, plan GTM 90 días con tareas semanales, KPIs por etapa.

9. **#53 agente-branding** — Input: strategy doc + Brief Maestro + referencias visuales del cliente. Output: brand brief en `/brand-briefs/[cliente].md` con paleta de color justificada, sistema tipográfico, sistema de espacio/forma/movimiento, mood board de referencia, design tokens en formato Figma + tailwind.config.js.

10. **#52 agente-legal** — Input: strategy doc + brand brief + industria/vertical del cliente. Output: revisión compliance con identificación de claims problemáticos, reescrituras sugeridas, marco regulatorio aplicable. Si hay bloqueos serios, devuelve para ajuste. Si aprueba, sigue.

11. **#4 project-manager** — Input: strategy doc + brand brief + plan 90 días aprobado por #52. Output: tickets asignados por semana, timeline visualizado, activación de capas de producción según el plan (qué flujos se disparan en qué orden).

**Puntos de control:** entre paso 10 y 11 (#52 puede bloquear). Entre paso 11 y activación (#4 valida que todos los inputs están).

**Tiempo estimado:** 10-14 días hábiles desde firma hasta cliente operativo.

**Entregables finales:**
- `/brand-briefs/[cliente].md` — brand brief completo
- `/strategy-docs/[cliente].md` — strategy doc operativo
- Plan 90 días visualizado en Airtable/Notion
- Kickoff call realizada con cliente
- Sistema de reportes acordado

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** el cliente no entrega accesos a tiempo y el flujo se estanca en paso 2. **Mitigación:** #2 onboarding tiene un checklist de accesos con deadline de 72h; si no se cumplen, #3 escala a Jose antes de arrancar producción.
- **Riesgo:** #54 genera strategy doc antes de que #8 haya consolidado la investigación, resultando en posicionamiento basado en asunciones. **Mitigación:** #54 no arranca hasta que `/strategy-docs/[cliente]-research.md` existe y está firmado por #8.
- **Riesgo:** #52 bloquea strategy doc completo al final del flujo por claims regulatorios que pudieron detectarse antes. **Mitigación:** #52 hace review temprano de la vertical del cliente al recibir el brief maestro, alertando sobre marcos aplicables ANTES de que #54 escriba el strategy doc.
- **Riesgo:** cliente tiene expectativas distintas al plan 90 días generado. **Mitigación:** #3 director-cuenta revisa el plan con el cliente en kickoff call ANTES de activar producción, obteniendo firma escrita del alcance.

### FLUJO 2 — Construcción de sitio web completo

**Cuándo se activa:** cuando el cliente tiene brand brief + strategy doc aprobados y el plan 90 días incluye sitio web.
**Dispara:** `project-manager` (#4) al activar el milestone "sitio web" del plan.
**Objetivo:** entregar un sitio web funcional, con copy, diseño, backend y tracking configurados, publicado en dominio del cliente.

```
┌─────────────────────────────────────────────────────────────────┐
│  PRE-PRODUCCIÓN: INPUTS EXISTEN                                  │
│  /brand-briefs/[cliente].md ✓                                    │
│  /strategy-docs/[cliente].md ✓                                   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #16 copywriting-seo             │
        │  Copy por página                 │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #18 diseno-web                  │
        │  Wireframes + Figma              │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #17 diseno-imagen               │
        │  Visuales (heroes, secciones)    │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #21 frontend-dev                │
        │  Implementación (Astro + Tailwind│
        │  + shadcn/ui)                    │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #22 backend-dev                 │
        │  APIs, forms, integraciones      │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #42 agente-analytics            │
        │  GA4 + GTM + Pixel configurados  │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  QA: #39 + #40 + #52             │
        │  Calidad + Seguridad + Legal     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #41 aprobador                   │
        │  Firma final                     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #45 agente-deployment           │
        │  Deploy a producción              │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #43 agente-monitor              │
        │  Monitoreo activado 24/7         │
        └──────────────────────────────────┘
                             │
                             ▼
                  SITIO LIVE + MONITOREADO
```

**Paso a paso:**

1. **Pre-check:** #4 project-manager valida que `/brand-briefs/[cliente].md` y `/strategy-docs/[cliente].md` existen y están aprobados por #52 legal. Si falta alguno, pausa y dispara el flujo correspondiente antes de arrancar este.

2. **#16 copywriting-seo** — Input: strategy doc (sitemap + buyer persona + positioning) + brand brief (tono de voz). Output: copy por página en Markdown, con headline, subheadline, body, CTAs, meta title y meta description SEO, keywords objetivo. Guardado en `/websites/[cliente]/copy/`.

3. **#18 diseno-web** — Input: copy de #16 + strategy doc (sitemap) + brand brief (design tokens). Output: wireframes + mockups Figma por página, con sistema de componentes reutilizables.

4. **#17 diseno-imagen** — Input: mockups Figma + brand brief (mood board). Output: visuales finales (hero images, ilustraciones, fotografías, íconos) optimizadas para web (WebP), subidas a Cloudinary con nomenclatura consistente.

5. **#21 frontend-dev** — Input: Figma + copy + visuales. Output: sitio implementado en Astro + Tailwind + shadcn/ui, con componentes, responsive, accesibilidad AA mínimo, performance Lighthouse 90+, SEO técnico (schema, meta, sitemap, robots.txt). Repo en GitHub.

6. **#22 backend-dev** — Input: requirements del sitio (forms, integraciones con CRM, webhooks). Output: endpoints API configurados, forms conectados al CRM del cliente (GHL vía N8N), webhooks activos, variables de entorno seteadas.

7. **#42 agente-analytics** — Input: sitio staging + KPIs del strategy doc. Output: GA4 configurado con conversiones, GTM con todos los tags, Meta Pixel + CAPI, Google Ads conversiones importadas, eventos custom del buyer journey definidos, Preview Mode validado.

8. **#39 revisor-qa** — Input: sitio en staging completo. Output: Reporte de QA con bugs visuales, gramaticales, funcionales, de performance. Si hay críticos, devuelve para corrección.

9. **#40 seguridad** — Input: sitio + repo + variables de entorno. Output: Reporte de seguridad con headers HTTP, CSP, rate limiting, secrets audit, dependencias audit. Si hay críticos, bloquea hasta corregir.

10. **#52 agente-legal** — Input: sitio completo (copy, imágenes, términos, privacidad). Output: revisión compliance del copy, términos y condiciones, política de privacidad, disclaimers aplicables a la industria. Si hay claims problemáticos, devuelve para reescritura.

11. **#41 aprobador** — Input: reportes de #39, #40, #52 + sitio staging. Output: firma de aprobación o bloqueo justificado. Si aprueba, sigue. Si bloquea, define qué se corrige y quién retoma.

12. **#45 agente-deployment** — Input: sitio aprobado + dominio del cliente + DNS. Output: deploy en Vercel con dominio del cliente apuntado vía Cloudflare, certificado SSL activo, redirects 301 de URLs antiguas si aplica, sitemap enviado a Search Console.

13. **#43 agente-monitor** — Input: dominio del cliente en producción. Output: monitores de uptime (UptimeRobot), alertas de errores JS (Sentry si aplica), health checks de forms, tracking de performance continuo. Activado 24/7.

**Puntos de control:** triple filtro en paso 8-10 (QA + Seguridad + Legal). Aprobador en paso 11. Sin los 4, no hay deploy.

**Tiempo estimado:** 10-18 días hábiles desde inputs validados hasta sitio live, dependiendo de complejidad (sitio de marca simple: 10 días; e-commerce o SaaS: 18-25 días).

**Entregables finales:**
- Sitio live en dominio del cliente
- Repo en GitHub con README de mantenimiento
- Tracking completo funcionando
- Monitoreo 24/7 activo
- Documentación en `/websites/[cliente]/README.md`

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** copy y diseño se producen en paralelo sin que copy termine primero, resultando en mockups con lorem ipsum que luego no encajan con el copy real. **Mitigación:** paso 2 (copy) termina ANTES de arrancar paso 3 (diseño). Sin excepción.
- **Riesgo:** tracking se configura al final y se descubre que el sitio no disparará eventos correctamente. **Mitigación:** #42 revisa el plan de tracking en paralelo con diseño (paso 3) para detectar estructuras del sitio que dificultan tracking antes de construir.
- **Riesgo:** DNS no apunta correctamente al momento del deploy. **Mitigación:** #45 valida DNS y certificados en staging 48h antes del go-live. Cloudflare proxy configurado con caché deshabilitada durante el primer deploy.
- **Riesgo:** #52 bloquea sitio por términos/privacidad ausentes o insuficientes. **Mitigación:** #52 entrega templates de términos/privacidad según vertical del cliente al inicio del flujo (pre-paso 2), no al final.
- **Riesgo:** Lighthouse score bajo por imágenes sin optimizar. **Mitigación:** #17 entrega imágenes en WebP con dimensiones exactas de uso; #21 valida Lighthouse 90+ en staging antes de pasar a #39.

### FLUJO 3 — Lanzamiento de campaña de paid media

**Cuándo se activa:** cuando el plan 90 días incluye campaña paga y el sitio + tracking ya están live (FLUJO 2 completado).
**Dispara:** `project-manager` (#4).
**Objetivo:** lanzar campañas pagas en los canales correctos con copy, creativos, targeting y tracking funcionando.

```
┌─────────────────────────────────────────────────────────────────┐
│  PRE-CHECK: Sitio live + GA4/Pixel funcionando                   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #15 director-creativo           │
        │  Briefs creativos por canal       │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  PARALELO: #16 copy + #17 imagen │
        │  Copy de ads + creativos         │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  PARALELO según canal del plan:  │
        │  #11 meta / #12 google /         │
        │  #13 tiktok / #14 linkedin /     │
        │  #48 youtube                     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #39 + #52 + #41                 │
        │  QA + Legal + Aprobador          │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  LANZAMIENTO                     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #43 monitor + #42 analytics +   │
        │  #33 cro (bucle de optimización) │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **Pre-check:** sitio live (FLUJO 2 ✓), GA4 + Meta Pixel + Google Ads conversions + server-side tagging funcionando, audiencias iniciales creadas en cada plataforma relevante.

2. **#15 director-creativo** — Input: strategy doc (ángulos por fase del funnel, buyer persona, positioning) + brand brief. Output: brief creativo por canal (qué ángulos, qué formatos, qué CTA, qué landing). Cada brief es ejecutable sin preguntas.

3. **Paralelo A: #16 copywriting-seo** — Input: brief creativo por canal. Output: copy de ads (headline, primary text, description, CTA) en 3-5 variantes por ángulo.

4. **Paralelo B: #17 diseno-imagen** — Input: brief creativo + copy (overlays). Output: creativos estáticos y video en formatos nativos por canal (1:1, 4:5, 9:16, 16:9 según aplique).

5. **Paralelo C según canales del plan:**
   - **#11 meta-ads** — Configura Advantage+ Shopping / Sales con audiencias (BAU, Lookalikes, Interés, Retargeting), presupuesto escalonado, pixel y CAPI funcionando.
   - **#12 google-ads** — Configura Search con match types + Performance Max + YouTube si aplica, conversiones importadas desde GA4.
   - **#13 tiktok-ads** — Configura Spark Ads + Video View Optimization + Web Conversions.
   - **#14 linkedin-ads** — Configura Sponsored Content + Lead Gen Forms con Sales Navigator audiences.
   - **#48 youtube-ads** — Configura TrueView for Action + Bumpers + Shorts ads.

6. **#39 revisor-qa** — Input: todos los ads configurados en preview. Output: validación visual, ortográfica, consistencia de marca, links correctos a landings.

7. **#52 agente-legal** — Input: copy y visuales de todos los ads. Output: revisión compliance. Si hay claims problemáticos (típico en clientes financieros/salud/inmobiliaria), devuelve para reescritura.

8. **#41 aprobador** — Input: aprobaciones de #39 y #52. Output: firma de lanzamiento.

9. **Lanzamiento** — Cada trafikero pone LIVE sus campañas en su canal con el presupuesto y horario definido en el plan.

10. **Bucle continuo: #43 monitor + #42 analytics + #33 cro** — #43 vigila spend, CPA, quality score, policy violations. #42 valida que el tracking sigue funcionando. #33 identifica fricciones en landing y optimiza. Reportes al director-cuenta semanales.

**Puntos de control:** #52 puede bloquear completo si detecta claims regulatorios problemáticos. En industrias reguladas (crédito, salud, financiera), este filtro es no-negociable.

**Tiempo estimado:** 7-10 días hábiles desde kickoff hasta lanzamiento + optimización continua posterior.

**Entregables finales:**
- Campañas live por canal
- Dashboard de reporte configurado en Looker Studio
- Monitoreo activo de métricas y violaciones
- Primera iteración de optimización programada a 7 días

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** se lanza sin server-side tagging en Meta, resultando en EMQ bajo y CPL inflado. **Mitigación:** #42 valida Conversions API funcionando con data match > 8.0 antes de autorizar lanzamiento.
- **Riesgo:** copy de ads contradice copy de landing, generando inconsistencia cognitiva y bajo conversion rate. **Mitigación:** #15 director-creativo valida que brief de ads y copy de landing arranquen del mismo strategy doc y del mismo ángulo.
- **Riesgo:** #52 detecta claim regulatorio tarde y obliga a rehacer 30 creativos. **Mitigación:** #52 revisa los 3 ángulos maestros del brief ANTES de producir los 30 creativos derivados.
- **Riesgo:** presupuesto insuficiente para salir de learning phase (Meta requiere ~50 conversiones en 7 días). **Mitigación:** #11/#12 calculan presupuesto mínimo de learning phase según CPA objetivo y lo defienden ante #3 si el cliente pide menos.
- **Riesgo:** ads rechazados por políticas antes de empezar, especialmente en crédito/salud/inmobiliaria. **Mitigación:** #52 pre-valida ejemplos de copy típicos de la vertical antes de producir masa.

### FLUJO 4 — Producción de blog automático

**Cuándo se activa:** cuando el cliente compró "motor de contenido" en su paquete, ejecutándose de forma recurrente (ej. semanal).
**Dispara:** `project-manager` (#4) vía workflow N8N programado.
**Objetivo:** publicar un artículo SEO de alta calidad en el blog del cliente, 100% automatizado desde research hasta deploy.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: N8N workflow programado (semanal)                      │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #27 seo                          │
        │  Keywords oportunidad del período│
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #8 agente-investigacion         │
        │  Research primaria del tema       │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #16 copywriting-seo             │
        │  Artículo completo + meta + schema│
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #17 diseno-imagen               │
        │  Hero + imágenes internas         │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #39 revisor-qa + #52 legal      │
        │  Revisión calidad + compliance    │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #21 frontend-dev / #45 deploy   │
        │  Publicación en blog              │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #42 analytics / #27 seo         │
        │  Tracking + indexación            │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **Trigger N8N:** workflow programado dispara con el slug del próximo artículo del calendario editorial del cliente.

2. **#27 seo** — Input: nicho del cliente + calendario editorial. Output: keyword objetivo + cluster SEO + SERP analysis + People Also Ask + Reddit/Quora insights + intent de búsqueda.

3. **#8 agente-investigacion** — Input: keyword objetivo. Output: research primaria del tema — datos, estadísticas, citas de fuentes autorizadas, casos concretos aplicables al cliente.

4. **#16 copywriting-seo** — Input: keyword + cluster + research. Output: artículo Markdown completo con estructura H1/H2/H3, 1500-2500 palabras según intent, meta title y description optimizados, schema JSON-LD Article, CTA interno alineado al funnel, links internos a otros artículos del blog.

5. **#17 diseno-imagen** — Input: brief visual del artículo. Output: hero image + 2-4 imágenes internas (diagramas, ilustraciones) generadas con Midjourney o Fal.ai, subidas a Cloudinary.

6. **#39 revisor-qa** — Input: artículo completo + imágenes. Output: revisión gramatical, factual, visual, SEO on-page. Si hay errores, devuelve para corrección automática.

7. **#52 agente-legal** — Input: artículo (especialmente en verticales regulados). Output: revisión compliance de claims. En clientes financieros/crédito/salud este filtro es obligatorio. En verticales no regulados (SaaS, e-commerce general) puede omitirse por regla del cliente.

8. **#21 frontend-dev / #45 agente-deployment** — Input: artículo aprobado. Output: artículo publicado en `/blog/[slug]` del sitio del cliente, commit + push + deploy a Vercel, URL viva.

9. **#42 agente-analytics / #27 seo** — Input: URL nueva. Output: URL enviada a Google Search Console para indexación, evento de publicación registrado, alerta al director-cuenta vía email.

**Puntos de control:** #52 en clientes regulados. #39 siempre.

**Tiempo estimado:** 35-60 minutos end-to-end (completamente automatizado).

**Entregables finales:**
- Artículo publicado y vivo
- Indexación solicitada
- Registro en log de publicaciones del cliente

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** artículo publicado con claims no validados que terminan siendo incorrectos (alucinación del LLM). **Mitigación:** #8 agente-investigacion cita fuente primaria para cada dato/estadística; #16 no escribe nada sin la fuente correspondiente en el borrador.
- **Riesgo:** artículos duplicados / canibalización interna. **Mitigación:** #27 valida contra el inventario existente de artículos del cliente antes de aprobar keyword.
- **Riesgo:** artículo con bajo EEAT (credibilidad) en verticales sensibles. **Mitigación:** en verticales YMYL (finanzas, salud, legal), #16 incluye bylines/expert review citados y #52 valida que la redacción cumple con pautas de Google Your Money Your Life.

### FLUJO 5 — Crisis / problema reportado

**Cuándo se activa:** cuando #43 agente-monitor detecta un problema crítico (uptime caído, spend anómalo, review 1 estrella, webhook caído) O cuando el cliente reporta un problema directamente.
**Dispara:** `agente-monitor` (#43) o `director-cuenta` (#3) según origen.
**Objetivo:** resolver el problema en el SLA correspondiente y comunicar al cliente con transparencia.

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENTO: #43 detecta O #3 recibe queja                           │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #44 agente-pqr                  │
        │  Clasifica severidad: P0/P1/P2/P3│
        └──────────────────────────────────┘
                             │
                             ▼
                ┌────────────┴────────────┐
                │                         │
         ┌──────▼──────┐            ┌────▼──────┐
         │   P0-P1     │            │   P2-P3    │
         │  Crítico    │            │  Normal    │
         └──────┬──────┘            └────┬──────┘
                │                         │
                ▼                         ▼
    ┌──────────────────┐        ┌────────────────┐
    │ Escala inmediato │        │ Queue normal   │
    │ a #3 + Jose       │        │ (24-48h SLA)  │
    └────────┬─────────┘        └────────┬───────┘
             │                            │
             ▼                            ▼
    ┌──────────────────┐        ┌────────────────┐
    │ Agente específico│        │Agente específico│
    │ (según sistema)  │        │ (según sistema) │
    └────────┬─────────┘        └────────┬───────┘
             │                            │
             ▼                            ▼
    ┌──────────────────────────────────┐
    │  Comunicación a cliente vía #3   │
    │  + documentación post-mortem      │
    └──────────────────────────────────┘
```

**Paso a paso:**

1. **Trigger:** #43 agente-monitor detecta evento crítico vía alertas automáticas O #3 director-cuenta recibe comunicación del cliente reportando un problema.

2. **#44 agente-pqr** — Input: descripción del problema + contexto. Output: clasificación de severidad:
   - **P0 — Crítico caído:** sitio down, CRM down, campañas con policy violation, pérdida de datos. SLA: resolución < 2 horas.
   - **P1 — Impacto directo:** tracking roto (pixel no dispara), form roto, workflow N8N caído. SLA: < 4 horas.
   - **P2 — Degradación:** performance lento, error esporádico, alerta no accionada. SLA: < 24 horas.
   - **P3 — Observación:** queja de usabilidad, sugerencia de mejora, duda menor. SLA: < 48 horas.

3. **Routing según severidad:**
   - P0/P1: escalación inmediata a #3 director-cuenta + notificación a Jose. #44 dispara el agente responsable del sistema afectado (ej. #25 servidor-cloud para infraestructura, #12 google-ads para policy violation, #22 backend-dev para form roto).
   - P2/P3: entra en queue normal. #4 project-manager asigna al agente correspondiente.

4. **Agente específico resuelve:**
   - Sitio down → #25 servidor-cloud investiga (AWS, DNS, certs) o #45 agente-deployment revierte deploy.
   - CRM down → #23 ghl-crm verifica GHL + #24 n8n-automatizacion workflows.
   - Policy violation → #11/#12/#13/#14 responsable ajusta + #52 legal revisa si hay tema regulatorio.
   - Form roto → #22 backend-dev debuggea + #42 analytics valida tracking post-fix.
   - Review 1 estrella → #34 agente-reputacion responde públicamente + intenta contacto privado.

5. **#3 director-cuenta** — comunica al cliente el incidente con: qué pasó, cuándo, por cuánto tiempo, qué se hizo, qué se cambió para que no vuelva a pasar. Comunicación honesta, sin defensivas.

6. **Documentación post-mortem:** #44 registra el incidente en `/incidents/[cliente]/[fecha]-[slug].md` con root cause, mitigation, action items para prevenir repetición.

**Puntos de control:** #3 valida que comunicación al cliente sea apropiada antes de enviar. Jose aprueba refunds/compensaciones si aplican.

**Tiempo estimado:** P0 en 2h, P1 en 4h, P2 en 24h, P3 en 48h.

**Entregables finales:**
- Problema resuelto y validado por #43
- Cliente comunicado por #3
- Post-mortem documentado
- Action items para prevención ingresados al backlog

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** se comunica al cliente antes de tener root cause confirmada, generando versiones contradictorias. **Mitigación:** #3 comunica con framework "sabemos X, estamos investigando Y, reportaremos en Z horas" en la primera comunicación; solo afirma causa cuando está confirmada por el agente técnico.
- **Riesgo:** misma crisis se repite porque no se implementaron los action items del post-mortem anterior. **Mitigación:** #44 audita mensualmente que los action items de post-mortems cerrados hayan sido ejecutados; los abiertos > 30 días escalan a Jose.
- **Riesgo:** agente técnico arregla rápido pero rompe otra cosa. **Mitigación:** #39 revisor-qa valida el fix en staging antes de aplicar a producción, especialmente en P1/P0.

### FLUJO 6 — Reporte mensual al cliente

**Cuándo se activa:** los primeros 3 días hábiles de cada mes.
**Dispara:** `project-manager` (#4) vía workflow N8N programado.
**Objetivo:** entregar al cliente un reporte con data + insights + plan del próximo mes.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: Primer día hábil del mes                               │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #42 agente-analytics            │
        │  Extrae data del mes              │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #38 analisis-datos              │
        │  Genera insights accionables      │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #36 reportes                    │
        │  Formatea visualmente             │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #3 director-cuenta              │
        │  Revisa + agrega narrativa        │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #41 aprobador                   │
        │  Aprueba antes de enviar          │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  Envío al cliente + reunión      │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **Trigger N8N:** primer día hábil del mes, workflow dispara por cliente.

2. **#42 agente-analytics** — Input: periodo del mes cerrado. Output: dataset consolidado con GA4 (sesiones, conversiones, embudo), Ads (spend, impresiones, clics, CPA, ROAS por canal), CRM (leads, oportunidades, cierres), redes (engagement, alcance, seguidores), SEO (impresiones, posición promedio, keywords en top 10).

3. **#38 analisis-datos** — Input: dataset de #42 + histórico del cliente + KPIs del strategy doc. Output: análisis con:
   - Qué funcionó (con evidencia cuantitativa).
   - Qué no funcionó (y por qué según la data).
   - Tendencias vs. mes anterior y vs. baseline.
   - 3-5 insights accionables para el siguiente mes.
   - Hipótesis a testear.

4. **#36 reportes** — Input: análisis de #38 + brand brief (visualidad). Output: reporte visual en Looker Studio o PDF, con gráficos limpios, narrativa ejecutiva, secciones por canal, sección de insights, sección de próximos pasos.

5. **#3 director-cuenta** — Input: reporte formateado + contexto de la relación con el cliente. Output: narrativa de presentación adaptada al lenguaje del cliente, anotaciones sobre qué enfatizar en la reunión, agenda de reunión de reporte.

6. **#41 aprobador** — Input: reporte completo. Output: firma antes de enviar al cliente (evita que algo mal presentado salga).

7. **Envío + reunión:** reporte enviado por email + reunión de 30-60 min agendada con cliente para discutir.

**Puntos de control:** #41 antes de envío. #3 asegura que narrativa sea apropiada para ese cliente específico.

**Tiempo estimado:** 2-3 días hábiles desde trigger hasta entrega al cliente.

**Entregables finales:**
- Reporte visual en PDF o link Looker Studio
- Reunión de reporte realizada
- Ajustes al plan 90 días documentados según insights

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** reporte focalizado en vanity metrics (impresiones, seguidores) en lugar de métricas de negocio. **Mitigación:** #38 prioriza en el reporte: revenue atribuido, leads calificados, CAC, ROAS. Vanity metrics solo en anexo.
- **Riesgo:** reporte generado sobre data con tracking roto. **Mitigación:** #42 agente-analytics hace health check del tracking del cliente al inicio de cada mes; si algo está roto, se arregla antes de generar el reporte.
- **Riesgo:** cliente recibe el reporte y no asiste a reunión, perdiéndose la narrativa del #3. **Mitigación:** #3 graba loom de 5-10 min explicando el reporte; si cliente no asiste reunión, recibe el loom y agenda reprogramada.

### FLUJO 7 — Auditoría de cliente existente

**Cuándo se activa:** cuando el cliente lleva 90 días activo y toca revisar si el plan inicial sigue vigente O cuando el director-cuenta detecta que los resultados no están alineados con expectativas.
**Dispara:** `director-cuenta` (#3) con aprobación de Jose.
**Objetivo:** auditar el desempeño y proponer ajustes estratégicos fundados.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: 90 días activos O gap de resultados                    │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #10 agente-auditoria            │
        │  Auditoría digital forense actual│
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #9 director-estrategia          │
        │  Compara con plan original       │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #54 agente-estrategia-comercial │
        │  Ajusta strategy doc              │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #52 agente-legal                │
        │  Revisa cambios si hay claims    │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #3 director-cuenta              │
        │  Presenta al cliente             │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **#10 agente-auditoria** — Input: accesos del cliente después de 90 días. Output: auditoría actualizada con estado actual de cada sistema, comparación con baseline inicial, identificación de gaps respecto al plan 90 días.

2. **#9 director-estrategia** — Input: auditoría + plan 90 días original + data del #38 del mes pasado. Output: análisis de desviación estratégica — qué hipótesis se confirmaron, cuáles se refutaron, qué nuevas oportunidades aparecieron, qué cambia para los próximos 90 días.

3. **#54 agente-estrategia-comercial** — Input: análisis de #9. Output: strategy doc actualizado en `/strategy-docs/[cliente].md` con cambios documentados (qué se mantiene, qué se pivota, qué se elimina, qué se agrega). Nueva versión marcada con fecha.

4. **#52 agente-legal** — Input: strategy doc actualizado. Output: revisión compliance de cambios si implican claims nuevos o cambios de canal.

5. **#3 director-cuenta** — Input: strategy doc nuevo + contexto de relación. Output: presentación ejecutiva al cliente con narrativa clara de "aprendimos X, cambiamos Y, esperamos Z". Reunión agendada.

**Puntos de control:** #52 revisa cambios con impacto regulatorio.

**Tiempo estimado:** 5-7 días hábiles.

**Entregables finales:**
- Strategy doc versionado
- Presentación de auditoría al cliente
- Plan 90 días siguiente aprobado

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** auditoría revela que KPIs iniciales eran irreales, generando conversación defensiva con cliente. **Mitigación:** #9 presenta los resultados junto con baseline histórico y comparables de industria; la conversación se centra en aprendizajes, no en excusas.
- **Riesgo:** cliente aprueba plan nuevo en reunión pero olvida detalles al operar día a día. **Mitigación:** #3 emite resumen escrito del nuevo plan 90 días dentro de 24h post-reunión y obtiene confirmación explícita.

### FLUJO 8 — Cambio estratégico del cliente

**Cuándo se activa:** cuando el cliente solicita un cambio de dirección (pivoteo de producto, cambio de target, cambio de canal prioritario, lanzamiento de nuevo producto).
**Dispara:** `director-cuenta` (#3) al recibir la solicitud.
**Objetivo:** reconfigurar el sistema para soportar el cambio sin perder coherencia.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: Cliente solicita pivoteo o cambio mayor                │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #3 director-cuenta              │
        │  Captura el cambio en detalle     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #9 director-estrategia          │
        │  Evalúa impacto estratégico       │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #54 estrategia-comercial        │
        │  Replantea strategy doc           │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #53 branding (si aplica)        │
        │  Replantea brand brief            │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #52 agente-legal                │
        │  Revisa claims en nuevo contexto │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #4 project-manager              │
        │  Replanificación 90 días          │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **#3 director-cuenta** — Input: solicitud del cliente. Output: brief del cambio capturado con contexto (por qué, qué, cuándo, presupuesto asignado, restricciones). Reunión 1:1 con Jose si el cambio implica renegociar alcance del contrato.

2. **#9 director-estrategia** — Input: brief del cambio + strategy doc actual. Output: evaluación de impacto — ¿cambia el buyer persona? ¿cambian los canales? ¿cambia el positioning? ¿cambia el funnel? Si los cambios son grandes, dispara replanteo completo.

3. **#54 agente-estrategia-comercial** — Input: evaluación de #9. Output: strategy doc nuevo o ajustado, dependiendo del tamaño del cambio. Pequeño = edición; grande = nueva versión mayor.

4. **#53 agente-branding** — Input: strategy doc nuevo + brand brief actual. Output: evaluación de si el branding sigue vigente o requiere evolución. Si requiere, produce brand brief nuevo.

5. **#52 agente-legal** — Input: strategy doc + brand brief nuevos. Output: revisión compliance en el nuevo contexto (nuevo producto puede caer en régimen regulatorio distinto, ej. agregar servicios financieros implica CROA/FDUTPA).

6. **#4 project-manager** — Input: strategy doc + brand brief aprobados. Output: replanificación de backlog — qué tareas en curso se pausan, qué se cancela, qué se arranca nuevo, nuevo timeline.

**Puntos de control:** #52 revisa SIEMPRE porque un cambio estratégico puede cambiar el régimen regulatorio aplicable.

**Tiempo estimado:** 7-14 días hábiles desde solicitud hasta replanificación completa.

**Entregables finales:**
- Strategy doc actualizado
- Brand brief actualizado (si aplica)
- Plan 90 días nuevo
- Comunicación al cliente confirmando ajustes

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** cambio estratégico se ejecuta sin parar producción en curso, generando mezcla de mensajes viejos y nuevos en el mismo canal. **Mitigación:** #4 project-manager pausa producción activa desde el momento en que entra FLUJO 8, reanuda solo con nuevos briefs alineados al strategy doc actualizado.
- **Riesgo:** el cliente cambia de opinión antes de que los sistemas se adapten, generando doble replanteo. **Mitigación:** #3 pide al cliente compromiso de 90 días con la nueva dirección antes de activar el flujo; cambios durante ese período requieren pausa de trabajo (no paid) antes de reactivar.

### FLUJO 9 — Escalamiento de paid media (cliente ganador)

**Cuándo se activa:** cuando una campaña de paid media está dando resultados sostenidos por 4+ semanas y el cliente quiere escalar presupuesto.
**Dispara:** agente de la capa 03 responsable (#11/#12/#13/#14/#48) con aprobación de #3.
**Objetivo:** escalar presupuesto sin romper el CPA.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: Campaña con CPA bajo sostenido + cliente quiere escalar│
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #42 agente-analytics            │
        │  Valida calidad de tracking      │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #33 agente-cro                  │
        │  Audita landing + identifica     │
        │  cuellos de botella               │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #15 director-creativo           │
        │  Briefs para creatives nuevos    │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  Agente ads responsable           │
        │  Escala con protocolo            │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #43 monitor vigila CPA          │
        │  durante escalamiento             │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **Pre-check:** CPA bajo el target por 4+ semanas, presupuesto actual saturado (no está habiendo oportunidades perdidas por falta de spend).

2. **#42 agente-analytics** — valida que el tracking está limpio (conversiones correctas, deduplicación OK, EMQ alto en Meta, conversiones importadas en Google). Si hay ruido en tracking, escalar sin limpiar es suicida.

3. **#33 agente-cro** — audita landing que recibe el tráfico. Identifica fricciones que a volumen bajo no dolían pero a volumen alto duelen. Prioriza quick wins.

4. **#15 director-creativo** — prepara briefs para nuevos creativos (tanda fresca de ads reduce fatiga y permite escalar sin CPM explosivo).

5. **Agente ads responsable** — escala con protocolo:
   - Incrementos graduales (20-30% cada 3 días, no saltos del 100%).
   - Separación de campañas por tipo de audiencia para no romper Advantage+.
   - Vigilancia diaria de CPA, no semanal.
   - Rollback inmediato si CPA se rompe +30%.

6. **#43 agente-monitor** — alerta si CPA sube fuera del rango permitido durante el escalamiento.

**Puntos de control:** #43 monitorea CPA. Si se rompe, agente ads frena inmediato.

**Tiempo estimado:** 14-30 días para escalar 3-5x presupuesto manteniendo CPA.

**Entregables finales:**
- Presupuesto escalado
- CPA bajo control
- Creatives nuevos en rotación
- Landing optimizada para volumen

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** saltar de $1k/día a $3k/día y perder performance porque el algoritmo de la plataforma exige relearning. **Mitigación:** incrementos del 20-30% cada 3 días para que el algoritmo estabilice.
- **Riesgo:** fatiga creativa al volumen alto (misma audiencia ve el mismo ad 15 veces). **Mitigación:** #17 diseno-imagen y #16 copywriting-seo tienen pipeline continuo de creatives frescos; rotación mínima semanal al escalar.
- **Riesgo:** el sitio cae porque el hosting no soporta el tráfico. **Mitigación:** #25 servidor-cloud valida capacidad y activa caching agresivo antes de escalar. Si el sitio está en Vercel serverless, no es problema; si está en EC2 propio, es crítico revisar.

### FLUJO 10 — Cierre / pausa de cliente

**Cuándo se activa:** cuando el cliente termina contrato, pausa servicios, o Addendo decide cerrar relación.
**Dispara:** `director-cuenta` (#3).
**Objetivo:** cerrar la relación ordenadamente, entregar lo que corresponde, archivar el expediente para posible retorno.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: Fin de contrato o pausa                                │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #3 director-cuenta              │
        │  Confirma y documenta razón       │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #37 finanzas                    │
        │  Cuadra facturación pendiente     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #45 agente-deployment           │
        │  Transfer de accesos y assets     │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  #4 project-manager              │
        │  Cancela tareas activas           │
        └──────────────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────┐
        │  Archivo del cliente             │
        └──────────────────────────────────┘
```

**Paso a paso:**

1. **#3 director-cuenta** — Input: notificación de cierre/pausa. Output: reunión de cierre con cliente, documentación de razón (feedback del cliente), acuerdo de alcance del offboarding (qué se entrega, qué se transfiere).

2. **#37 finanzas** — Input: contrato + facturación histórica. Output: conciliación de facturas pagadas vs. servicios entregados, facturación final si aplica, facturas pendientes comunicadas al cliente.

3. **#45 agente-deployment** — Input: accesos y assets del cliente en infraestructura de Addendo. Output: transferencia ordenada — código en GitHub traspasado o clonado a repo del cliente, sitios en Vercel transferidos (o archivo del proyecto), accesos a CRM/Analytics revocados de Addendo (clientes mantienen el suyo), assets en Cloudinary transferidos o exportados.

4. **#4 project-manager** — Input: offboarding en curso. Output: cancelación de workflows N8N programados del cliente, pausa de monitoreos de #43, cierre de tickets activos del cliente en backlog, comunicación al resto del sistema que el cliente está offboarded.

5. **Archivo:** el expediente completo del cliente (strategy doc, brand brief, reportes mensuales, post-mortems, comunicaciones) se mueve a `/archive/[cliente]/` con un README que explica la historia de la relación. Esto permite retomar con velocidad si el cliente vuelve.

**Puntos de control:** #37 no cierra mientras haya facturación pendiente. #45 no transfiere sin backup previo.

**Tiempo estimado:** 5-10 días hábiles.

**Entregables finales:**
- Accesos transferidos al cliente
- Facturación cerrada
- Expediente archivado con historia
- Comunicación final con cliente
- Monitoreos desactivados

**Riesgos comunes y cómo evitarlos:**

- **Riesgo:** cliente pide volver 3 meses después y la documentación es insuficiente para retomar con contexto. **Mitigación:** el archivo en `/archive/[cliente]/` incluye README con historia completa, últimos resultados, razones de salida, puntos que quedaron pendientes.
- **Riesgo:** accesos no revocados a tiempo, generando riesgo de seguridad. **Mitigación:** #40 seguridad audita revocación de accesos dentro de 7 días del offboarding y certifica por escrito.
- **Riesgo:** disputa de facturación post-cierre porque no hubo acuerdo escrito del alcance final. **Mitigación:** #37 finanzas emite "final invoice statement" firmado por cliente antes de cerrar la cuenta operativamente.

---

## SECCIÓN 4 — MATRIZ DE DECISIÓN RÁPIDA

Tabla para que Claude Code (o José) mapee una orden verbal al flujo correspondiente en segundos. Si la orden no aparece aquí, se agrega al documento en la próxima actualización.

### 4.1 Matriz principal

| José dice... | Activar flujo | Agente dispara | Prerequisitos |
|---|---|---|---|
| "Nuevo cliente firmó" | FLUJO 1 — Onboarding | #3 director-cuenta | Contrato firmado + handoff de preventa |
| "Tenemos un nuevo cliente" | FLUJO 1 — Onboarding | #3 director-cuenta | Igual que arriba |
| "Construye el sitio de [cliente]" | FLUJO 2 — Sitio web | #4 project-manager | Brand brief + strategy doc aprobados |
| "Lanza el sitio de [cliente]" | FLUJO 2 — Sitio web | #4 project-manager | Igual |
| "Cliente quiere lanzar ads" | FLUJO 3 — Paid media | #4 project-manager | Sitio live + tracking OK |
| "Activa campañas de [cliente]" | FLUJO 3 — Paid media | #4 project-manager | Igual |
| "Publica un artículo para [cliente]" | FLUJO 4 — Blog | #27 seo | Cliente tiene motor de contenido contratado |
| "Genera contenido SEO de [cliente]" | FLUJO 4 — Blog | #27 seo | Igual |
| "Hay un problema con [cliente]" | FLUJO 5 — Crisis | #44 agente-pqr | Ninguno |
| "Cliente reporta [error]" | FLUJO 5 — Crisis | #44 agente-pqr | Ninguno |
| "Alerta: sitio caído" | FLUJO 5 — Crisis (P0) | #43 agente-monitor | Ninguno |
| "Fin de mes, enviar reportes" | FLUJO 6 — Reportes | #4 project-manager | Mes cerrado |
| "Prepara reporte mensual de [cliente]" | FLUJO 6 — Reportes | #4 project-manager | Igual |
| "Cliente lleva 90 días, audita" | FLUJO 7 — Auditoría | #3 director-cuenta | 90 días activos |
| "Revisa si el plan de [cliente] sigue" | FLUJO 7 — Auditoría | #3 director-cuenta | Igual |
| "Cliente quiere cambiar dirección" | FLUJO 8 — Cambio estratégico | #3 director-cuenta | Solicitud formal del cliente |
| "Cliente pivota a [nuevo producto]" | FLUJO 8 — Cambio estratégico | #3 director-cuenta | Igual |
| "Campaña de [cliente] funciona, escala" | FLUJO 9 — Escalamiento | Agente de ads responsable | CPA bajo target 4+ semanas |
| "Duplica presupuesto de ads de [cliente]" | FLUJO 9 — Escalamiento | Agente de ads responsable | Igual |
| "Cliente se va / termina contrato" | FLUJO 10 — Cierre | #3 director-cuenta | Notificación formal |
| "Pausa todo lo de [cliente]" | FLUJO 10 — Cierre | #3 director-cuenta | Igual |

### 4.2 Matriz de casos específicos (tareas que son parte de flujos mayores)

| José dice... | Acción | Agente responsable | Notas |
|---|---|---|---|
| "Necesito el brand brief de [cliente]" | Ejecutar paso 9 del FLUJO 1 | #53 agente-branding | Strategy doc debe existir primero |
| "Genera el strategy doc de [cliente]" | Ejecutar paso 8 del FLUJO 1 | #54 agente-estrategia-comercial | Investigación completa |
| "Revisa este copy antes de publicar" | Revisión compliance | #52 agente-legal | Mencionar vertical del cliente |
| "¿Está OK este claim?" | Revisión compliance | #52 agente-legal | Igual |
| "Investiga la competencia de [cliente]" | Paso 5-6 del FLUJO 1 | #5 + #6 + #7 + #8 en paralelo | Lista de competidores conocida |
| "Audita el sitio de [cliente]" | Paso 4 del FLUJO 1 | #10 agente-auditoria | Accesos disponibles |
| "Optimiza la conversión del [cliente]" | CRO continuo | #33 agente-cro | Tracking OK + datos suficientes |
| "Reseña 1 estrella en [cliente]" | Crisis P1 específica | #34 agente-reputacion | Canal de review identificado |
| "Sube los assets de [cliente] al Drive" | Catalogación | #19 gestor-assets | Ninguno |
| "Configura tracking de [cliente]" | Paso 7 del FLUJO 2 | #42 agente-analytics | Sitio en staging |
| "Hay que lanzar un nuevo producto de [cliente]" | Probable FLUJO 8 | #3 director-cuenta | Evaluar si es cambio estratégico |
| "Implementa este workflow en N8N" | Construcción workflow | #50 agente-constructor-workflows | Especificación clara |
| "Configura los DMs automáticos de IG" | Activación ManyChat | #49 agente-manychat | Acceso a Meta Business |
| "Haz un video para [cliente]" | Producción video | #51 video-director + #17 + #28 | Guion aprobado |
| "Configura GBP de [cliente]" | SEO local | #32 agente-gbp | Verificación de negocio |
| "Email marketing mensual para [cliente]" | Campañas email | #31 agente-email-marketing | Lista + segmentación |
| "Consigue backlinks para [cliente]" | Link building | #46 agente-rp | Assets disponibles |

### 4.3 Reglas de desambiguación

Si José dice algo que cae en múltiples flujos, aplicar estas reglas:

1. **Si menciona "nuevo cliente" → siempre FLUJO 1**, aunque también mencione "sitio web". El sitio se construye después, no al mismo tiempo.
2. **Si menciona "problema"/"caído"/"alerta" → siempre FLUJO 5**, aunque también implique otros flujos (la crisis tiene prioridad).
3. **Si es ambiguo → preguntar** antes de activar. Peor hacer el flujo equivocado que pausar 2 minutos para clarificar.
4. **Si menciona un cliente que no existe en el sistema → activar FLUJO 1** (onboarding), no asumir que es error.

### 4.4 Escenarios no obvios (edge cases)

Casos donde la decisión de flujo no es evidente. Documentados aquí para evitar improvisación.

| Escenario | Decisión correcta | Justificación |
|---|---|---|
| Cliente existente pide un segundo sitio para una nueva línea de negocio | FLUJO 8 (cambio estratégico) + FLUJO 2 parcial | La nueva línea de negocio puede cambiar positioning/buyer persona; #54 valida si es extensión o pivote antes de construir sitio. |
| Cliente reporta bug menor en sitio live (no P0) | FLUJO 5 como P2 | Todo reporte del cliente entra por #44 para clasificación y tracking, aunque sea cosmético. |
| Jose pide "ver cómo va la campaña de [cliente]" | No es flujo — es consulta ad-hoc | #42 + #38 generan snapshot rápido, sin activar FLUJO 6 (reporte mensual). |
| Cliente quiere campaña en canal que Addendo nunca ha operado para él | FLUJO 3 con pre-paso de #9 director-estrategia | #9 evalúa fit del canal con buyer persona + estrategia antes de activar trafikero. |
| Cliente exige publicar ad que #52 ya bloqueó | Escalación a Jose | #52 no cede. Jose decide si se renegocia con cliente o se mantiene el bloqueo. |
| Agente técnico propone cambio de stack en mitad de construcción (FLUJO 2) | Pausar + re-evaluar en #20 desarrollo-web con #9 | Cambios de stack no se deciden ad-hoc; requieren evaluación de costo/beneficio documentada. |
| Cliente pide integrar herramienta nueva (ej. HubSpot en vez de GHL) | FLUJO 8 parcial con #9 + #23 | Integración nueva es cambio estratégico con implicaciones técnicas; no se "agrega rápido". |
| Nueva vertical aparece en pipeline comercial (ej. primer cliente de seguros) | Activar FLUJO 1 + reforzar #52 | #52 pre-investiga marco regulatorio de la vertical nueva antes de onboarding. |
| Competidor copia copy del cliente 1:1 | No es flujo Addendo — es tema legal del cliente | #3 informa al cliente y sugiere abogado externo; Addendo no representa legalmente. |
| Cliente quiere pausar 1-2 meses por razones de cash flow | FLUJO 10 con flag de "pausa reversible" | Archivo preserva todo; reactivar con FLUJO 1 abreviado cuando cliente reanude. |
| Jose pide experimento interno (ej. probar nuevo trafikero con cliente X) | Consultar con #3 y cliente antes | Clientes no son conejillos de indias sin consentimiento; experimentos requieren acuerdo. |

---

## SECCIÓN 5 — REGLAS DE ORO DEL SISTEMA

Principios no negociables que gobiernan toda ejecución en Addendo. Si una regla parece frenar una entrega, la regla gana.

### REGLA 1 — Ningún agente publica al cliente sin pasar por #41 aprobador

El aprobador es el último filtro antes de que cualquier output (sitio, ads, reporte, artículo, email, campaña, deploy) llegue al cliente o al público.

**Cómo aplica:**
- Cada flujo termina con un paso de #41 antes de publicar.
- #41 integra los resultados de #39 (QA), #40 (seguridad cuando aplica), #52 (legal cuando aplica).
- Si #41 bloquea, el flujo se pausa hasta que se corrija el motivo del bloqueo.
- #41 puede delegar aprobación a José en casos de duda mayor.

**Por qué existe:** sin un filtro final integrador, los outputs llegan al cliente con errores que alguien en el sistema vio pero no detuvo. El aprobador es el dueño de que eso no pase.

### REGLA 2 — Ningún copy financiero/legal/salud/crédito se publica sin revisión de #52 agente-legal

En verticales regulados, cada palabra es una promesa que puede tener implicaciones regulatorias. Un copy que reclasifique al cliente bajo otro régimen es un daño que el agente-legal evita.

**Cómo aplica:**
- En clientes de crédito/finanzas/seguros/salud/inmobiliaria: #52 revisa TODO el copy antes de publicar.
- En clientes de otros verticales: #52 revisa según criterio del director-cuenta (recomendado siempre, obligatorio si el copy menciona garantías, resultados, métricas de desempeño, beneficios de salud).
- #52 puede BLOQUEAR publicación. No es advisory — es decisión.

**Por qué existe:** el costo de reescribir un copy antes de publicar es trivial. El costo de ser clasificado funcionalmente como credit repair organization cuando el cliente vendía educación financiera es catastrófico. Prevenir > corregir.

### REGLA 3 — Los outputs por cliente van a su carpeta canónica

Cada cliente tiene una estructura de carpetas fija en el repo `addendo-website` o en sus repos de proyecto:

```
/brand-briefs/[cliente].md          — brand brief (output de #53)
/strategy-docs/[cliente].md         — strategy doc (output de #54)
/websites/[cliente]/                — código del sitio (outputs de #18-#22)
/incidents/[cliente]/               — post-mortems (outputs de #44)
/reports/[cliente]/[YYYY-MM].pdf    — reportes mensuales (outputs de #36)
/archive/[cliente]/                 — expediente al cerrar (output de FLUJO 10)
```

**Cómo aplica:**
- Cada agente que produce output por cliente debe guardar en la carpeta correspondiente.
- Nombres consistentes (slug del cliente en kebab-case).
- Nunca outputs sueltos en el root del repo.
- Archivos binarios (imágenes, videos) van a Cloudinary con tag `[cliente]`, no al repo.

**Por qué existe:** cuando Jose o cualquier agente necesita el contexto de un cliente, va directo a su carpeta y lo encuentra todo. Sin estructura canónica, cada cliente es una búsqueda en vano.

### REGLA 4 — Todos los agentes reportan actividad a #4 project-manager

El project-manager es el sistema nervioso central del sistema. Sin él, la cartera es invisible.

**Cómo aplica:**
- Cada agente al iniciar una tarea crea o actualiza un ticket en el board de PM.
- Al terminar, marca el ticket completed con output y enlaces.
- #4 agrega el estado a su reporte diario a Jose.

**Por qué existe:** sin observabilidad, José no puede tomar decisiones de prioridad. Con observabilidad, la agencia es gobernable.

### REGLA 5 — #43 agente-monitor vigila 24/7 todo lo en producción

Cualquier sistema que está live para el cliente está bajo monitoreo de #43.

**Cómo aplica:**
- Sitios → uptime + performance + errores JS.
- Campañas → spend + policy + conversion pixel funcionando.
- Workflows N8N → health de webhooks + error rate.
- Reviews → alertas de 1-2 estrellas nuevas.
- Servidores → CPU, RAM, disco, procesos PM2.

Toda alerta rutea por N8N a los canales apropiados. P0/P1 escalan inmediato a #3 + Jose.

**Por qué existe:** un problema que se detecta a los 5 minutos es incidente menor. Un problema que se detecta a las 5 horas es crisis.

### REGLA 6 — Los 3 agentes de Capa 09 (#52, #53, #54) se activan al INICIO de cada cliente nuevo

Antes de producir nada, el sistema necesita:
- `/strategy-docs/[cliente].md` del #54
- `/brand-briefs/[cliente].md` del #53
- Revisión de compliance del #52

**Cómo aplica:**
- En FLUJO 1, estos 3 agentes son los pasos 8, 9, 10. No hay producción antes de que existan sus outputs.
- Para clientes existentes que no los tienen, el sistema ejecuta un "FLUJO 1 parcial" para generarlos antes de aceptar tareas de producción.

**Por qué existe:** producir sin strategy doc es producir sobre la intuición del agente en turno. Producir con strategy doc es producir sobre decisiones documentadas y defendibles.

### REGLA 7 — CLAUDE.md y este ORGANIGRAMA deben sincronizarse cada vez que se añade/modifica un agente o flujo

**Cómo aplica:**
- Agente nuevo → entrada en CLAUDE.md (tabla) + mención en sección correspondiente de este organigrama + actualización de flujos si su rol cambia alguno.
- Flujo nuevo → sección en este organigrama + referencia en la matriz de decisión (4.1 o 4.2) + eventual ajuste en CLAUDE.md si cambia un mapa "José dice X".
- Un commit debe actualizar ambos documentos en la misma operación.

**Por qué existe:** documentos desincronizados crean ambigüedad. La ambigüedad crea improvisación. La improvisación mata la calidad.

### REGLA 8 — Evidencia antes de aserciones

Ningún agente reclama que algo está "hecho", "listo" o "funcionando" sin evidencia verificable.

**Cómo aplica:**
- Deploy hecho → URL viva + código en producción + screenshot o curl que confirma.
- Tracking funcionando → preview mode GTM + evento disparado + conversión registrada.
- Ad live → enlace directo al ad + screenshot de Ads Manager.
- Bug corregido → comando exacto que reproducía + ahora no reproduce.

**Por qué existe:** "está hecho" sin evidencia es el motor principal de bugs que vuelven y decisiones tomadas sobre data falsa.

### REGLA 9 — Los backups preceden a los cambios destructivos

Antes de modificar workflows N8N en producción, sitios live, configuración de ads, o bases de datos, se hace backup.

**Cómo aplica:**
- Workflow N8N → backup JSON en `/workflows/[nombre].json.bak-[timestamp]`.
- Sitio live → el deploy anterior siempre sigue reversible en Vercel.
- Configuración de ads → export del ads manager antes de cambios masivos.
- CLAUDE.md y organigrama → antes de consolidaciones grandes, rama de backup en git.

**Por qué existe:** los errores pasan. Un error sin backup es un error permanente. Un error con backup es un inconveniente temporal.

### REGLA 10 — Comunicación al cliente siempre pasa por #3 director-cuenta

Ningún otro agente habla directo con el cliente. #3 es el único punto de contacto.

**Cómo aplica:**
- Agentes técnicos (#22, #42, #45) NO escriben emails directos al cliente aunque tengan la info más fresca del issue.
- Agentes de estrategia (#9, #54) presentan outputs a #3, que los traduce al lenguaje del cliente.
- Excepciones: en P0 activo, #3 puede delegar a Jose la comunicación si está fuera de horario; Jose informa al cliente y luego #3 retoma.

**Por qué existe:** cuando múltiples agentes hablan al cliente, el cliente recibe mensajes contradictorios, aprende jerga técnica innecesaria, y pierde la sensación de tener un responsable único. El director-cuenta es la cara humana del sistema.

### REGLA 11 — Los agentes de Capa 02 (inteligencia) trabajan en paralelo pero consolidan antes de entregar

Los agentes de scraping, spy-ads y redes orgánicas extraen data en paralelo, pero el output hacia el resto del sistema es consolidado por #8 agente-investigacion.

**Cómo aplica:**
- #5, #6, #7 trabajan en paralelo desde el mismo dataset inicial (lista de competidores).
- Cada uno entrega su dataset crudo a #8, no al director-estrategia directamente.
- #8 consolida, identifica patrones, y entrega UN reporte único al #9.

**Por qué existe:** si #9 director-estrategia recibe 3 reportes separados, tiene que consolidar él mismo — perdiendo tiempo en trabajo que #8 puede hacer mejor. La consolidación previa es el handoff disciplinado.

### REGLA 12 — Idioma operativo: español interno, idioma del cliente para outputs

El sistema opera en español porque Jose es hispanohablante y porque los clientes iniciales son de LATAM/EE.UU. hispano. Pero los outputs al cliente final van en el idioma del cliente.

**Cómo aplica:**
- Comunicación interna (logs, reportes internos, documentación de agentes): español.
- Outputs al cliente (copy de web, ads, emails, reportes): idioma del mercado objetivo del cliente.
- Si el cliente es bilingüe, outputs en ambos idiomas con consistencia de tono.
- Agentes cuyo skill está escrito en español pueden generar output en inglés cuando el strategy doc lo especifica.

**Por qué existe:** mezclar idiomas en outputs al cliente es el camino más rápido a reducir calidad percibida. Mantener español internamente asegura que Jose siga en control del sistema sin fricción.

---

## SECCIÓN 6 — CÓMO EVOLUCIONAR ESTE ORGANIGRAMA

Este documento no es estático. Evoluciona con el sistema. Pero evoluciona con disciplina — no a modificaciones al vuelo.

### 6.1 Cuándo actualizar este documento

**Actualizar obligatoriamente cuando:**

- **Se añade un agente nuevo al sistema.** La sección 2 crece, las secciones 3-4 pueden necesitar ajustes si el agente participa en flujos existentes.
- **Se identifica un flujo de trabajo nuevo.** Nueva sección en la Sección 3 + entrada en la matriz (Sección 4).
- **Se detecta una referencia rota o inconsistencia entre este documento y la realidad.**
- **Una regla de oro deja de aplicar o aparece una nueva.**

**Actualizar recomendadamente cuando:**

- Después de un post-mortem de incidente que revela un gap en los flujos.
- Al cumplir trimestres del sistema (revisar si todo sigue vigente).
- Cuando se introduce una herramienta nueva que cambia cómo opera un agente.

### 6.2 Proceso para actualizar

1. **Crear rama de backup del estado actual** antes de tocar el documento:
   ```
   git checkout -b backup-organigrama-[YYYY-MM-DD]
   git push origin backup-organigrama-[YYYY-MM-DD]
   git checkout main
   ```

2. **Editar este documento** con los cambios necesarios. Respetar estructura de 6 secciones.

3. **Sincronizar con CLAUDE.md.** Si el cambio afecta agentes o mapas, CLAUDE.md se actualiza en el mismo commit.

4. **Validar consistencia:**
   - Referencias cruzadas (`#N agente-nombre`) coinciden con CLAUDE.md.
   - Cada flujo de la Sección 3 tiene entrada en la matriz de la Sección 4.
   - Cada agente listado en la Sección 2 existe en `.claude/agents/skills-globales/`.

5. **Commit con mensaje descriptivo:**
   ```
   docs(organigrama): [describe el cambio en 1 línea]

   [Detalle de qué cambió y por qué]
   ```

6. **Push a main.**

7. **Notificar a Jose** del cambio si es estructural (nuevo agente, nuevo flujo, cambio de regla de oro).

### 6.3 Quién puede actualizar

- **Claude Code** puede actualizar con aprobación explícita de Jose.
- **Jose** puede actualizar directamente (él es el CEO, el documento es su sistema).
- **Cualquier agente del sistema** NO puede actualizar autónomamente — solo sugerir cambios a Jose o Claude Code.

### 6.4 Validación post-cambio

Después de actualizar, ejecutar esta checklist:

- [ ] La sección modificada tiene contenido sustantivo, no placeholders.
- [ ] Las referencias cruzadas (`#N`) coinciden con CLAUDE.md y con los archivos en `.claude/agents/skills-globales/`.
- [ ] No hay agentes mencionados en flujos que no existan en la Sección 2.
- [ ] No hay contradicciones entre Sección 3 (flujos) y Sección 4 (matriz).
- [ ] La fecha de versión al inicio del documento fue actualizada.
- [ ] El commit incluyó los cambios correspondientes en CLAUDE.md si aplicaba.

### 6.5 Filosofía de la evolución

> "Un sistema que no evoluciona se vuelve folklore. Un sistema que evoluciona sin disciplina se vuelve caos. La evolución disciplinada es la única forma de que el sistema se fortalezca con el tiempo."

Este organigrama debe reflejar cómo opera Addendo hoy — no cómo operaba hace 3 meses, y no cómo va a operar en 3 meses. Mantenerlo vivo es responsabilidad compartida del CEO y de Claude Code.

### 6.6 Ejemplo real de evolución: la creación de Capa 09

Este organigrama se escribió en su versión 1.0 precisamente después de una evolución del sistema:

- **Antes:** el sistema tenía 51 agentes en 8 capas. No había un agente específico para gobernanza regulatoria, branding sistémico por cliente, o estrategia comercial operativa — esas funciones se distribuían entre #9, #15 y #52 era inexistente.
- **Evento:** al prepararse para onboarding de clientes en verticales regulados (crédito, seguros) y con estrategias comerciales complejas, el sistema detectó que necesitaba tres roles transversales por cliente que trabajaran ANTES de la producción.
- **Respuesta:** se crearon #52 (legal), #53 (branding), #54 (estrategia-comercial) como una nueva Capa 09 — Gobernanza y Estrategia de Cliente.
- **Impacto en este organigrama:** FLUJO 1 (onboarding) se reconfiguró para integrar los 3 agentes nuevos como pasos 8, 9, 10. Las reglas de oro 2 y 6 se reformularon. Se añadió vista unificada en Sección 2.
- **Impacto en CLAUDE.md:** contador 51 → 54, nueva capa en tablas, descripciones detalladas de los 3 agentes.

Este ejemplo documenta el caso típico de evolución: un gap identificado → agentes nuevos creados → organigrama actualizado para integrarlos → CLAUDE.md sincronizado.

### 6.7 Checklist para cada actualización

Antes de commitear una actualización de este organigrama, completar:

- [ ] Identifiqué qué cambió en el sistema real (agente, flujo, regla).
- [ ] Pregunté a Jose si el cambio está validado para ir a documento.
- [ ] Creé rama backup antes de editar.
- [ ] Edité la sección correspondiente con contenido sustantivo.
- [ ] Las referencias cruzadas a `#N agente-nombre` son correctas.
- [ ] CLAUDE.md se actualiza en el mismo commit si el cambio lo requiere.
- [ ] La fecha de versión al inicio del documento está actualizada.
- [ ] El mensaje de commit explica el porqué, no solo el qué.
- [ ] Verifiqué que la matriz de decisión (Sección 4) sigue coherente con los flujos.
- [ ] Notifiqué a Jose si el cambio es estructural.

---

## GLOSARIO OPERATIVO

Términos con significado preciso en este sistema:

- **Brand brief:** documento en `/brand-briefs/[cliente].md` producido por #53 agente-branding que define el sistema visual del cliente con razón estratégica.
- **Brief Maestro:** documento generado en onboarding (#2) con toda la información base del cliente.
- **Capa:** agrupación lógica de agentes por tipo de función. Sistema tiene 9 capas + 4 especiales.
- **CPA:** cost per acquisition. Métrica clave en paid media.
- **EMQ:** event match quality (Meta). Métrica clave de calidad de pixel + CAPI.
- **Go-live:** momento en que un sitio o campaña pasa de staging a producción.
- **Handoff:** transferencia disciplinada de trabajo entre dos agentes. Incluye contexto, output y expectativa de próximo paso.
- **P0/P1/P2/P3:** niveles de severidad de incidente en FLUJO 5.
- **Plan 90 días:** horizonte de planificación estándar del sistema. Sale del strategy doc.
- **Plan Estratégico macro:** output de #9 director-estrategia. Nivel alto, no operativo.
- **Skill:** archivo Markdown en `.claude/agents/skills-globales/[agente].md` que define cómo opera ese agente.
- **Staging:** entorno pre-producción donde se valida antes de ir live.
- **Strategy doc:** documento en `/strategy-docs/[cliente].md` producido por #54 con el plan operativo detallado por cliente.
- **YMYL:** Your Money Your Life. Categoría de Google que exige mayor rigor de EEAT.
- **ROAS:** return on ad spend. Revenue atribuido / spend.
- **CAC:** customer acquisition cost. Costo total de marketing + ventas / clientes nuevos.
- **LTV:** lifetime value. Revenue esperado por cliente a lo largo de la relación.
- **Lookalike:** audiencia generada por Meta/Google basada en similitud con una audiencia semilla.
- **Quick win:** cambio de bajo esfuerzo y alto impacto. Se ejecuta sin pasar por ciclo completo de testing.

---

*Fin del documento — versión 1.0, 18 de abril de 2026.*

*Próxima revisión programada: al completar onboarding de CreditBridge, para validar que los flujos 1 y 2 funcionaron como se documentan aquí.*
