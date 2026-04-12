# SKILL: Scraping e Inteligencia Competitiva Digital

**Nivel:** Experto absoluto
**Agentes que usan este skill:** #5 agente-scraping, #6 agente-spy-ads, #8 agente-investigacion, #10 agente-auditoria
**Orquestacion:** N8N (hub central)
**APIs requeridas:** DataForSEO, Apify, Google PageSpeed Insights API
**Output:** Reporte markdown estructurado con datos reales, tablas comparativas y acciones priorizadas

---

## PROTOCOLO DE EJECUCION

Este skill se ejecuta en 5 fases secuenciales. Cada fase produce datos que alimentan la siguiente. No se puede saltar ninguna fase. El resultado final es un reporte unico consolidado.

**Datos de entrada requeridos:**

```
competidor_url: URL del sitio web del competidor
competidor_nombre: Nombre del negocio competidor
cliente_url: URL del sitio web de nuestro cliente
cliente_nombre: Nombre del negocio de nuestro cliente
industria: Industria o nicho del negocio
ciudad: Ciudad o region geografica objetivo
pais: Pais objetivo (default: United States)
idioma: Idioma objetivo (default: en)
```

---

## FASE 1 — ANALISIS DE PALABRAS CLAVE COMPETIDORAS

### 1.1 Extraccion de keywords organicas del competidor

**API:** DataForSEO — `ranked_keywords`
**Endpoint:** `POST https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live`

```json
[
  {
    "target": "{{competidor_url}}",
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}",
    "limit": 200,
    "order_by": ["keyword_data.keyword_info.search_volume,desc"],
    "filters": [
      ["ranked_serp_element.serp_item.rank_group", "<=", 20]
    ]
  }
]
```

**Datos a extraer por cada keyword:**

| Campo | Descripcion |
|-------|-------------|
| keyword | La keyword exacta |
| search_volume | Volumen de busqueda mensual |
| cpc | Costo por clic estimado |
| competition_level | low / medium / high |
| rank_group | Posicion actual en Google |
| rank_absolute | Posicion absoluta incluyendo features |
| url | URL que rankea para esa keyword |
| serp_features | Features presentes: featured snippet, local pack, people also ask, etc. |

**Procesamiento obligatorio:**

1. Ordenar por search_volume descendente
2. Filtrar keywords con search_volume >= 50
3. Calcular traffic_share estimado: `search_volume * CTR_por_posicion`
   - Posicion 1: CTR 31.7%
   - Posicion 2: CTR 24.7%
   - Posicion 3: CTR 18.6%
   - Posicion 4: CTR 13.6%
   - Posicion 5: CTR 9.5%
   - Posicion 6-10: CTR 3.5%
   - Posicion 11-20: CTR 1.0%

### 1.2 Identificacion de keywords de buyer intent

**Filtro de intencion de compra — buscar keywords que contengan:**

| Categoria | Terminos a detectar |
|-----------|---------------------|
| Transaccional directa | precio, contratar, comprar, cotizar, reservar, agendar, pedir, ordenar, price, buy, hire, book, quote, order |
| Comparativa | mejor, mejores, top, vs, comparar, comparativa, cual es mejor, best, top, compare, which is better |
| Local | cerca de mi, en [ciudad], near me, in [city], nearby, close to me |
| Servicio | servicio de, servicios de, service, services, company, empresa de |
| Urgencia | urgente, hoy, ahora, emergencia, rapido, urgent, today, now, emergency, fast, 24 hours |
| Investigacion pre-compra | cuanto cuesta, como elegir, que incluye, how much, how to choose, what includes, reviews, opiniones |

**Clasificar cada keyword con un score de buyer intent:**

```
BUYER_INTENT_SCORE:
  - 5 (MAXIMO): Contiene terminos transaccionales directos + locales
    Ejemplo: "contratar plomero cerca de mi", "hire plumber near me"
  - 4 (ALTO): Contiene terminos transaccionales directos
    Ejemplo: "precio servicio de plomeria", "plumbing service price"
  - 3 (MEDIO-ALTO): Contiene terminos comparativos o de servicio
    Ejemplo: "mejor plomero en Houston", "best plumber Houston"
  - 2 (MEDIO): Contiene terminos de investigacion pre-compra
    Ejemplo: "cuanto cuesta un plomero", "how much does a plumber cost"
  - 1 (BAJO): Keyword informacional pura
    Ejemplo: "como destapar una tuberia", "how to unclog a pipe"
```

### 1.3 Separacion organicas vs pagadas

**API:** DataForSEO — `keywords_for_site`
**Endpoint:** `POST https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_site/live`

```json
[
  {
    "target": "{{competidor_url}}",
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}",
    "sort_by": "search_volume",
    "limit": 100
  }
]
```

**Cruzar con keywords organicas y clasificar:**

| Tipo | Descripcion | Accion |
|------|-------------|--------|
| Solo organica | Rankea en organico pero no paga ads | Oportunidad SEO directa — competir con contenido |
| Solo pagada | Paga ads pero no rankea organicamente | Keyword rentable — si paga es porque convierte. Atacar con SEO para ganar gratis lo que el paga |
| Ambas | Rankea organicamente Y paga ads | Keyword de maximo valor — el competidor la defiende con todo. Prioridad absoluta |
| Ninguna (gap) | Keywords de la industria donde el competidor no aparece | Territorio libre — posicionarse antes que el competidor |

### 1.4 Keywords de cola larga — oportunidades de bajo costo

**API:** DataForSEO — `keyword_suggestions`
**Endpoint:** `POST https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live`

```json
[
  {
    "target": "{{competidor_url}}",
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}",
    "limit": 100,
    "filters": [
      ["keyword_info.search_volume", ">=", 30],
      ["keyword_info.search_volume", "<=", 500],
      ["keyword_info.cpc", "<=", 3.00],
      ["keyword_info.competition_level", "in", ["low", "medium"]]
    ],
    "order_by": ["keyword_info.search_volume,desc"]
  }
]
```

**Criterios de oportunidad real (todas deben cumplirse):**

```
OPORTUNIDAD_COLA_LARGA = true SI:
  - search_volume >= 30 Y <= 500
  - cpc <= $3.00
  - competition_level = "low" O "medium"
  - keyword contiene 3+ palabras
  - buyer_intent_score >= 2
```

### 1.5 Calculo de dificultad vs oportunidad

**API:** DataForSEO — `keyword_difficulty`
**Endpoint:** `POST https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live`

Enviar las top 50 keywords del competidor:

```json
[
  {
    "keywords": ["keyword1", "keyword2", "...hasta 50"],
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}"
  }
]
```

**Matriz de decision:**

| Dificultad (KD) | Volumen | Veredicto | Accion |
|------------------|---------|-----------|--------|
| KD 0-20 | Cualquier volumen | ATACAR YA | Crear contenido optimizado, rankear en 1-3 meses |
| KD 21-40 | >= 100 | OPORTUNIDAD FUERTE | Contenido profundo + backlinks internos, rankear en 3-6 meses |
| KD 41-60 | >= 300 | OPORTUNIDAD MEDIA | Requiere estrategia de link building + contenido superior |
| KD 61-80 | >= 500 | LARGO PLAZO | Solo si el keyword tiene alto buyer intent. Plan 6-12 meses |
| KD 81-100 | Cualquier volumen | NO ATACAR CON SEO | Usar Google Ads. Demasiado competido para organico |

**Formula de priorizacion:**

```
PRIORITY_SCORE = (search_volume * buyer_intent_score) / (keyword_difficulty + 1)

Ordenar keywords por PRIORITY_SCORE descendente.
Las top 10 son las que se atacan primero.
```

### OUTPUT FASE 1 — Tabla de keywords

```markdown
## KEYWORDS COMPETIDORAS — {{competidor_nombre}}

### Top 20 keywords por trafico estimado

| # | Keyword | Vol. | CPC | KD | Pos. | Intent | Traffic Est. | Tipo | Priority |
|---|---------|------|-----|-----|------|--------|-------------|------|----------|
| 1 | [keyword] | [vol] | $[cpc] | [kd] | [pos] | [1-5] | [traffic] | ORG/PAG/AMBAS | [score] |

### Keywords de buyer intent alto (score 4-5)
[Tabla con las mismas columnas, filtrada por intent >= 4]

### Oportunidades de cola larga
[Tabla con keywords que cumplen criterios de oportunidad]

### Keywords donde el competidor paga ads pero NO rankea organicamente
[Tabla — estas son las keywords mas valiosas para atacar con SEO]
```

---

## FASE 2 — ANALISIS DE ANUNCIOS Y COSTOS

### 2.1 Extraccion de anuncios activos

**API:** Apify — Google Ads Transparency Scraper
**Endpoint:** `POST https://api.apify.com/v2/acts/apify~google-ads-transparency-scraper/runs?token={{APIFY_TOKEN}}&waitForFinish=180`

```json
{
  "queries": [
    "{{competidor_nombre}}",
    "{{competidor_url}}"
  ],
  "maxResults": 50,
  "language": "{{idioma}}",
  "country": "{{pais}}"
}
```

**Datos a extraer por cada anuncio:**

| Campo | Que buscar |
|-------|------------|
| advertiser_name | Nombre del anunciante verificado |
| ad_format | Texto / imagen / video |
| first_shown | Fecha primera vez mostrado |
| last_shown | Fecha ultima vez mostrado |
| platforms | Google Search, YouTube, Display, etc. |
| regions | Regiones donde se muestra |
| ad_text | Texto completo del anuncio |
| landing_url | URL de destino del anuncio |

### 2.2 Calculo de duracion y rentabilidad estimada

**Logica de analisis:**

```
dias_activo = last_shown - first_shown

CLASIFICACION POR DURACION:
  - >= 90 dias: ALTAMENTE RENTABLE — el competidor lo mantiene porque genera ROI positivo
  - 30-89 dias: PROBABLEMENTE RENTABLE — esta en fase de optimizacion o ya es estable
  - 7-29 dias: EN TESTING — podria ser nuevo o estar fallando
  - < 7 dias: RECIEN LANZADO — no hay datos suficientes para juzgar

REGLA: Los anuncios activos >= 90 dias son los que MAS hay que analizar.
Si un competidor paga por un anuncio durante 3+ meses, ese anuncio CONVIERTE.
```

### 2.3 Estimacion de CPC por keyword

**API:** DataForSEO — `keywords_for_keywords`
**Endpoint:** `POST https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live`

Extraer las keywords implicitamente usadas en los anuncios:

```json
[
  {
    "keywords": ["{{keywords_extraidas_de_anuncios}}"],
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}",
    "sort_by": "search_volume",
    "include_seed_keyword": true
  }
]
```

**Calcular gasto estimado mensual del competidor:**

```
gasto_estimado_mensual = SUM(cpc_keyword * clicks_estimados_keyword)

clicks_estimados_keyword = search_volume * CTR_ads_promedio
CTR_ads_promedio:
  - Posicion 1 ads: 2.1%
  - Posicion 2 ads: 1.4%
  - Posicion 3 ads: 1.3%
  - Posicion 4 ads: 1.2%
  - Promedio general: 1.5%
```

### 2.4 Analisis de estructura del anuncio

**Para cada anuncio activo >= 30 dias, diseccionar:**

| Elemento | Que analizar | Por que importa |
|----------|-------------|-----------------|
| Headline 1 | Keyword principal usada | Revela la keyword que el competidor considera mas valiosa |
| Headline 2 | Propuesta de valor o diferenciador | Revela como se posiciona vs la competencia |
| Headline 3 | CTA o refuerzo | Revela la accion que busca del usuario |
| Description 1 | Beneficios principales | Revela que argumentos de venta funcionan en la industria |
| Description 2 | Prueba social o urgencia | Revela la tactica emocional que usa |
| Display URL | Path personalizado | Revela como estructura la experiencia post-clic |
| Extensiones | Sitelinks, callouts, structured snippets, call, location | Revela que tan sofisticada es su cuenta de Google Ads |
| Landing URL | Pagina de destino real | Revela donde envia el trafico y que quiere que haga el usuario |

### 2.5 Analisis de oferta y emocion

**Clasificar cada anuncio en:**

**Tipo de oferta:**

| Tipo | Indicadores | Ejemplo |
|------|------------|---------|
| Descuento directo | %, off, descuento, ahorra, save | "20% Off First Service" |
| Gratis | free, gratis, sin costo, complimentary | "Free Consultation" |
| Garantia | guarantee, garantia, money back | "100% Satisfaction Guaranteed" |
| Urgencia | today, limited, expires, hoy, limitado | "Limited Time Offer" |
| Autoridad | #1, best, award, years, certificado | "Houston's #1 Rated" |
| Prueba social | reviews, clients, customers, resenas | "500+ 5-Star Reviews" |
| Conveniencia | fast, same day, 24/7, rapido, hoy mismo | "Same Day Service" |
| Sin oferta | Solo informacion del servicio | "Professional Plumbing Services" |

**Emocion dominante:**

| Emocion | Indicadores |
|---------|------------|
| Miedo/urgencia | "Don't wait", "before it's too late", "emergency" |
| Confianza | "Trusted", "licensed", "insured", "certified" |
| Ahorro | "Save", "affordable", "best price", "lowest" |
| Exclusividad | "Premium", "luxury", "exclusive", "VIP" |
| Comodidad | "Easy", "hassle-free", "we handle everything" |
| Resultados | "Guaranteed results", "proven", "track record" |

### OUTPUT FASE 2 — Tabla de anuncios

```markdown
## ANUNCIOS ACTIVOS — {{competidor_nombre}}

### Resumen de actividad publicitaria

| Metrica | Valor |
|---------|-------|
| Total anuncios activos | [n] |
| Anuncios >= 90 dias (rentables) | [n] |
| Plataformas usadas | [lista] |
| Gasto mensual estimado | $[cantidad] |
| CPC promedio | $[cantidad] |

### Anuncios de mayor duracion (mas rentables)

| # | Headline | Dias activo | Plataforma | Oferta | Emocion | Landing URL |
|---|----------|-------------|------------|--------|---------|-------------|

### Estructura de anuncios mas exitosos

[Para cada anuncio >= 90 dias, desglose completo de headlines, descriptions, extensiones, oferta y emocion]

### Estimacion de gasto por keyword

| Keyword | Vol. | CPC | Clicks est. | Gasto est./mes |
|---------|------|-----|-------------|----------------|
```

---

## FASE 3 — ANALISIS TECNICO DE LA PAGINA WEB

### 3.1 Extraccion de estructura completa

**API:** Apify — Website Content Crawler
**Endpoint:** `POST https://api.apify.com/v2/acts/apify~website-content-crawler/runs?token={{APIFY_TOKEN}}&waitForFinish=300`

```json
{
  "startUrls": [
    { "url": "{{competidor_url}}" }
  ],
  "maxCrawlPages": 15,
  "crawlerType": "playwright",
  "maxConcurrency": 3,
  "includeUrlGlobs": ["{{competidor_url}}/**"],
  "excludeUrlGlobs": [
    "*/blog/*",
    "*/tag/*",
    "*/category/*",
    "*/author/*",
    "*/page/*"
  ],
  "saveHtml": true,
  "saveMarkdown": true,
  "saveScreenshots": true,
  "additionalMimeTypes": ["application/json"],
  "removeCookieWarnings": true,
  "clickElementsCssSelector": "[class*='cookie'] button, [id*='cookie'] button"
}
```

**Datos a extraer de la pagina principal (homepage):**

| Elemento | Que buscar exactamente |
|----------|----------------------|
| H1 | Texto exacto del H1 principal — revela propuesta de valor |
| H2s | Todos los H2 en orden — revela estructura argumentativa |
| H3s | Todos los H3 — revela profundidad de contenido |
| Hero section | Texto principal + subtitulo + CTA del above-the-fold |
| CTAs (botones) | Texto exacto de CADA boton visible. Ejemplo: "Get Free Quote", "Call Now", "Book Online" |
| Formularios | Campos que pide cada formulario. Ejemplo: nombre, telefono, email, mensaje |
| Navegacion | Menu principal completo con todas las paginas |
| Footer | Links del footer, direccion, telefono, redes sociales |
| Testimonios | Textos de testimonios, nombres, calificaciones |
| Numeros/estadisticas | Cualquier cifra visible: anos de experiencia, clientes atendidos, proyectos completados |
| Imagenes hero | Descripcion de la imagen principal: foto real, stock, ilustracion, video |
| Above the fold | TODO lo visible sin hacer scroll — esto es lo que mas importa |
| Trust signals | Logos de certificaciones, premios, asociaciones, "As seen on" |
| Chat widget | Tiene chat en vivo? Cual? (Tawk.to, Intercom, Drift, GHL, WhatsApp) |

**Datos a extraer de paginas de servicios:**

| Elemento | Que buscar |
|----------|-----------|
| Nombre del servicio | H1 de la pagina |
| Descripcion | Primeros 2 parrafos |
| Precio | Si muestra precios, cuales son |
| Proceso | Si explica como funciona el servicio paso a paso |
| FAQ | Si tiene preguntas frecuentes |
| CTA | Que accion pide al final de la pagina |
| Schema | Si tiene schema markup de Service |

### 3.2 Analisis de velocidad

**API:** Google PageSpeed Insights
**Endpoint:** `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedTest`

```
?url={{competidor_url}}
&category=PERFORMANCE
&category=ACCESSIBILITY
&category=BEST_PRACTICES
&category=SEO
&strategy=MOBILE
```

**Ejecutar tambien con `&strategy=DESKTOP`**

**Metricas a extraer:**

| Metrica | Donde encontrar | Umbral bueno | Umbral malo |
|---------|----------------|--------------|-------------|
| Performance Score | lighthouseResult.categories.performance.score | >= 90 | < 50 |
| LCP (Largest Contentful Paint) | lighthouseResult.audits.largest-contentful-paint | <= 2.5s | > 4.0s |
| FID / INP (Interaction to Next Paint) | lighthouseResult.audits.interactive | <= 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | lighthouseResult.audits.cumulative-layout-shift | <= 0.1 | > 0.25 |
| FCP (First Contentful Paint) | lighthouseResult.audits.first-contentful-paint | <= 1.8s | > 3.0s |
| TTFB (Time to First Byte) | lighthouseResult.audits.server-response-time | <= 0.8s | > 1.8s |
| Total Blocking Time | lighthouseResult.audits.total-blocking-time | <= 200ms | > 600ms |
| Speed Index | lighthouseResult.audits.speed-index | <= 3.4s | > 5.8s |
| SEO Score | lighthouseResult.categories.seo.score | >= 90 | < 50 |
| Accessibility Score | lighthouseResult.categories.accessibility.score | >= 90 | < 50 |

**Oportunidades de mejora a extraer:**

```
lighthouseResult.audits donde score < 0.9:
  - render-blocking-resources (CSS/JS que bloquean render)
  - unused-css-rules (CSS sin usar)
  - unused-javascript (JS sin usar)
  - modern-image-formats (imagenes no en WebP/AVIF)
  - offscreen-images (imagenes no lazy-loaded)
  - unminified-css / unminified-javascript
  - efficiently-encode-images (imagenes sin comprimir)
  - preconnect-to-required-origins
  - server-response-time
```

### 3.3 SEO tecnico

**Extraer del HTML crawleado por Apify:**

| Elemento | Que verificar | Status |
|----------|---------------|--------|
| meta title | Existe? Longitud? Contiene keyword principal? | OK / FALTA / SUBOPTIMO |
| meta description | Existe? Longitud 120-160 chars? Contiene keyword? CTA? | OK / FALTA / SUBOPTIMO |
| canonical | Existe tag canonical? Apunta a la URL correcta? | OK / FALTA / ERROR |
| robots | Hay meta robots noindex/nofollow? | INDEXABLE / BLOQUEADO |
| hreflang | Tiene tags hreflang para multiidioma? | SI / NO / N/A |
| Open Graph | og:title, og:description, og:image presentes? | COMPLETO / PARCIAL / FALTA |
| Twitter Card | twitter:card, twitter:title, twitter:image? | COMPLETO / PARCIAL / FALTA |
| favicon | Existe? Multiples tamanos? | OK / FALTA |
| sitemap.xml | GET {{competidor_url}}/sitemap.xml — existe? Cuantas URLs? | EXISTE ([n] URLs) / NO EXISTE |
| robots.txt | GET {{competidor_url}}/robots.txt — existe? Que bloquea? | EXISTE / NO EXISTE |

### 3.4 Analisis de imagenes

**Del crawl de Apify, para cada imagen encontrada:**

| Check | Que verificar | Impacto |
|-------|---------------|---------|
| Alt text | Tiene alt text descriptivo con keyword? | SEO de imagenes + accesibilidad |
| Formato | WebP/AVIF (optimo) vs PNG/JPG (suboptimo) vs BMP/TIFF (malo) | Velocidad de carga |
| Tamano | < 100KB (bueno), 100-500KB (aceptable), > 500KB (problema) | Velocidad de carga |
| Dimensiones | Dimensiones reales vs dimensiones mostradas (rescaling?) | CLS + velocidad |
| Lazy loading | Tiene loading="lazy" en imagenes below-the-fold? | Velocidad de carga |
| Responsive | Usa srcset para multiples resoluciones? | Mobile performance |

### 3.5 Arquitectura del sitio

**Del crawl de Apify, mapear:**

```
{{competidor_url}}/
  |- /about (o /nosotros, /about-us)
  |- /services (o /servicios)
  |    |- /services/servicio-1
  |    |- /services/servicio-2
  |- /blog (o /articulos, /recursos)
  |    |- /blog/articulo-1
  |- /contact (o /contacto)
  |- /testimonials (o /reviews, /resenas)
  |- /gallery (o /portfolio, /proyectos)
  |- /faq
  |- /pricing (o /precios)
  |- /areas-served (o /areas, /locations)
```

**Evaluar:**

| Criterio | Bueno | Malo |
|----------|-------|------|
| Profundidad maxima | <= 3 clics desde home | > 4 clics |
| URLs descriptivas | /services/plumbing-repair | /page?id=123 |
| Consistencia | Patron uniforme de URLs | Mezcla de patrones |
| Total paginas | Proporcion util (servicios, blog) vs relleno | Muchas paginas vacias o duplicadas |

### OUTPUT FASE 3 — Reporte tecnico

```markdown
## ANALISIS TECNICO — {{competidor_url}}

### Velocidad de carga

| Metrica | Mobile | Desktop | Veredicto |
|---------|--------|---------|-----------|
| Performance Score | [0-100] | [0-100] | [BUENO/MEDIO/MALO] |
| LCP | [seg] | [seg] | [BUENO/MEDIO/MALO] |
| FID/INP | [ms] | [ms] | [BUENO/MEDIO/MALO] |
| CLS | [valor] | [valor] | [BUENO/MEDIO/MALO] |
| TTFB | [seg] | [seg] | [BUENO/MEDIO/MALO] |

### SEO tecnico

| Elemento | Status | Detalle |
|----------|--------|---------|
| Meta title | [status] | "[texto exacto]" ([n] chars) |
| Meta description | [status] | "[texto exacto]" ([n] chars) |
[...todos los elementos]

### Estructura de contenido (homepage)

| Seccion | Orden | Contenido clave |
|---------|-------|-----------------|
| Hero | 1 | H1: "[texto]" / CTA: "[texto boton]" |
| Servicios | 2 | [lista de servicios mostrados] |
[...todas las secciones en orden]

### Imagenes

| Total imagenes | Con alt text | Formato optimo | Oversized (>500KB) |
|---------------|-------------|----------------|-------------------|
| [n] | [n] ([%]) | [n] ([%]) | [n] ([%]) |

### Mapa del sitio

[Arbol de URLs con profundidad]
```

---

## FASE 4 — ANALISIS SEO ON-PAGE

### 4.1 Densidad y posicion de keywords

**Del contenido crawleado por Apify, para la pagina principal y las 3 paginas de servicio mas importantes:**

**Calcular para cada keyword principal:**

```
densidad = (ocurrencias_keyword / total_palabras_pagina) * 100

RANGOS OPTIMOS:
  - 0.5% - 1.5%: Densidad natural y optima
  - 1.5% - 2.5%: Aceptable pero cerca de sobre-optimizacion
  - > 2.5%: Sobre-optimizado — riesgo de penalizacion
  - < 0.5%: Sub-optimizado — no esta atacando la keyword
```

**Verificar posicion de la keyword en:**

| Ubicacion | Peso SEO | Presente? |
|-----------|----------|-----------|
| Meta title | CRITICO | SI/NO |
| Meta description | ALTO | SI/NO |
| H1 | CRITICO | SI/NO |
| Primer parrafo (primeras 100 palabras) | ALTO | SI/NO |
| Al menos un H2 | MEDIO | SI/NO |
| Alt text de imagen | MEDIO | SI/NO |
| URL slug | ALTO | SI/NO |
| Ultimo parrafo | BAJO | SI/NO |

### 4.2 Estructura de enlaces

**Del crawl de Apify, analizar:**

**Enlaces internos:**

| Metrica | Valor | Evaluacion |
|---------|-------|------------|
| Total enlaces internos en homepage | [n] | >= 20 bueno, < 10 pobre |
| Paginas huerfanas (sin enlaces internos entrantes) | [n] | 0 es ideal |
| Anchor texts descriptivos vs genericos ("click here", "read more") | [ratio] | > 80% descriptivos es bueno |
| Pagina con mas enlaces internos entrantes | [url] ([n] enlaces) | Esta es la pagina que el competidor considera mas importante |
| Estructura de silos (agrupacion tematica) | [descripcion] | Silos claros = SEO maduro |

**Enlaces externos (outbound):**

| Metrica | Valor |
|---------|-------|
| Total enlaces externos | [n] |
| Dominios unicos linkeados | [n] |
| Enlaces nofollow vs dofollow | [ratio] |
| Tipos de sitios linkeados | [categorias: redes sociales, directorios, partners, etc.] |

### 4.3 Longitud de contenido vs posicion

**Para las top 10 keywords del competidor, verificar:**

| Keyword | Pos. | URL | Palabras en pagina | Promedio top 10 | Diferencia |
|---------|------|-----|--------------------|-----------------|------------|
| [kw] | [pos] | [url] | [n] | [n] | +/- [n] |

**Regla general:**

```
Si la pagina del competidor tiene MENOS palabras que el promedio del top 10:
  -> Oportunidad: crear contenido mas largo y profundo para superarlo

Si tiene MAS palabras que el promedio:
  -> El competidor domina por profundidad de contenido
  -> Necesitamos igualar o superar + agregar elementos multimedia
```

### 4.4 Schema markup

**Verificar presencia de schema en el HTML:**

| Schema type | Presente | Datos | Impacto en SERP |
|-------------|----------|-------|-----------------|
| LocalBusiness | SI/NO | name, address, phone, hours, geo | Rich snippet con mapa, telefono, horarios |
| Organization | SI/NO | name, logo, contact, sameAs | Knowledge panel |
| Service | SI/NO | name, description, provider, area | Rich snippet de servicio |
| FAQ | SI/NO | questions, answers | Dropdown de preguntas en SERP — ocupa mas espacio |
| Review / AggregateRating | SI/NO | rating, count, best/worst | Estrellas en SERP — CTR +35% |
| BreadcrumbList | SI/NO | items | Breadcrumbs en SERP |
| Article | SI/NO | headline, datePublished, author | Para paginas de blog |
| HowTo | SI/NO | steps, tools, supply | Steps en SERP |
| Product | SI/NO | name, price, availability | Precio en SERP |
| Event | SI/NO | name, date, location | Evento en SERP |

**Validar schema encontrado:**

```
1. Copiar JSON-LD del source
2. Verificar contra schema.org: campos obligatorios presentes?
3. Verificar: datos reales o placeholder?
4. Verificar: errores de sintaxis JSON?
```

### 4.5 Core Web Vitals detallados

**Ya extraidos en Fase 3 (PageSpeed). Aqui se interpreta el impacto SEO:**

```
IMPACTO EN RANKING:

LCP > 4.0s:
  -> Google penaliza en mobile-first indexing
  -> Cada segundo extra = -7% conversiones
  -> Accion: esto es una DEBILIDAD EXPLOTABLE del competidor

CLS > 0.25:
  -> Elementos se mueven — UX terrible en mobile
  -> Accion: si nuestro CLS es < 0.1, ventaja directa

INP > 300ms:
  -> Pagina no responde rapido a clics
  -> Accion: nuestra pagina con INP < 100ms se siente instantanea
```

### OUTPUT FASE 4 — Analisis SEO

```markdown
## ANALISIS SEO ON-PAGE — {{competidor_url}}

### Densidad de keywords

| Keyword | Densidad | Title | H1 | 1er parrafo | H2 | URL | Alt img |
|---------|----------|-------|-----|-------------|-----|------|---------|
| [kw] | [%] | [si/no] | [si/no] | [si/no] | [si/no] | [si/no] | [si/no] |

### Contenido vs competencia

| Pagina | Palabras | Promedio top 10 | Veredicto |
|--------|----------|-----------------|-----------|
| Homepage | [n] | [n] | [CORTO/ADECUADO/EXTENSO] |
| Servicio principal | [n] | [n] | [CORTO/ADECUADO/EXTENSO] |

### Schema markup implementado

| Tipo | Status | Impacto potencial en SERP |
|------|--------|--------------------------|
| LocalBusiness | [SI/NO] | [descripcion del rich snippet] |

### Core Web Vitals — oportunidades

[Listar cada metrica donde el competidor esta en rojo/amarillo — son debilidades explotables]
```

---

## FASE 5 — SINTESIS Y OPORTUNIDADES

### 5.1 Tabla comparativa competidor vs cliente

**Consolidar TODOS los datos de las fases anteriores en una tabla unica:**

```markdown
## TABLA COMPARATIVA

| Dimension | {{competidor_nombre}} | {{cliente_nombre}} | Ventaja |
|-----------|----------------------|-------------------|---------|
| **SEO** | | | |
| Keywords organicas top 20 | [n] | [n] | [quien] |
| Posicion promedio top keywords | [n] | [n] | [quien] |
| Trafico organico estimado/mes | [n] | [n] | [quien] |
| Schema markup implementado | [lista] | [lista] | [quien] |
| **PUBLICIDAD** | | | |
| Anuncios activos | [n] | [n] | [quien] |
| Gasto estimado/mes | $[n] | $[n] | [quien] |
| Keywords pagadas | [n] | [n] | [quien] |
| **TECNICO** | | | |
| Performance mobile | [score] | [score] | [quien] |
| LCP | [seg] | [seg] | [quien] |
| CLS | [valor] | [valor] | [quien] |
| **CONTENIDO** | | | |
| Palabras en homepage | [n] | [n] | [quien] |
| Paginas de servicio | [n] | [n] | [quien] |
| Blog activo | [SI/NO] | [SI/NO] | [quien] |
| **CONVERSION** | | | |
| CTAs visibles above-the-fold | [n] | [n] | [quien] |
| Formulario de contacto | [SI/NO] | [SI/NO] | [quien] |
| Chat en vivo | [SI/NO] | [SI/NO] | [quien] |
| Click-to-call mobile | [SI/NO] | [SI/NO] | [quien] |
| Trust signals | [lista] | [lista] | [quien] |
```

### 5.2 Gaps identificados

**Estructura obligatoria:**

```markdown
### GAPS — Lo que el competidor hace y nosotros NO

| # | Gap | Impacto estimado | Dificultad | Prioridad |
|---|-----|-----------------|------------|-----------|
| 1 | [descripcion especifica] | [trafico/leads potenciales] | [FACIL/MEDIO/DIFICIL] | [P1/P2/P3] |

Criterios de prioridad:
  P1: Implementable en < 1 semana, impacto alto
  P2: Implementable en 1-4 semanas, impacto medio-alto
  P3: Implementable en 1-3 meses, impacto medio
```

### 5.3 Debilidades explotables del competidor

**Estructura obligatoria:**

```markdown
### DEBILIDADES DEL COMPETIDOR — Donde podemos superarlo

| # | Debilidad | Como explotarla | Resultado esperado |
|---|-----------|----------------|-------------------|
| 1 | [debilidad especifica con dato] | [accion concreta] | [resultado medible] |

Ejemplos de debilidades reales:
  - LCP > 4s en mobile -> Nuestra pagina carga en < 2s = mejor UX y ranking
  - No tiene schema FAQ -> Implementar FAQ schema = mas espacio en SERP
  - No tiene blog -> Crear blog con 10 articulos/mes = dominar long tail
  - Anuncios sin extensiones -> Nuestros ads con todas las extensiones = mayor CTR
  - No tiene reviews en Google -> Campana de reviews = trust signals superiores
  - Homepage de 200 palabras -> Nuestra homepage de 1500+ palabras = mejor ranking
```

### 5.4 Plan de accion priorizado

**Estructura obligatoria — maximo 15 acciones, ordenadas por impacto/esfuerzo:**

```markdown
### PLAN DE ACCION — Top 15 acciones para superar a {{competidor_nombre}}

#### INMEDIATO (esta semana)
| # | Accion | Agente responsable | Herramienta | KPI |
|---|--------|-------------------|-------------|-----|
| 1 | [accion concreta y especifica] | [agente #] | [herramienta] | [metrica medible] |

#### CORTO PLAZO (proximas 2-4 semanas)
| # | Accion | Agente responsable | Herramienta | KPI |
|---|--------|-------------------|-------------|-----|

#### MEDIO PLAZO (1-3 meses)
| # | Accion | Agente responsable | Herramienta | KPI |
|---|--------|-------------------|-------------|-----|
```

### 5.5 Potencial de trafico

**Calcular para las top 20 keywords del competidor:**

```markdown
### POTENCIAL DE TRAFICO

Si tomamos las keywords principales de {{competidor_nombre}}:

| Keyword | Vol. | Pos. actual competidor | Pos. objetivo nuestra | Trafico actual comp. | Trafico potencial nuestro |
|---------|------|----------------------|----------------------|---------------------|--------------------------|
| [kw] | [vol] | [pos] | [pos objetivo] | [vol * CTR_pos_actual] | [vol * CTR_pos_objetivo] |

**TOTAL:**
- Trafico organico actual del competidor (top 20 kw): [n] visitas/mes
- Trafico potencial nuestro si alcanzamos posiciones objetivo: [n] visitas/mes
- Incremento potencial: +[n]% ([n] visitas adicionales/mes)
- Valor economico del trafico (basado en CPC): $[n]/mes (lo que costaria en Google Ads)
```

---

## FORMATO DEL REPORTE FINAL

El reporte completo se entrega como un unico documento markdown con esta estructura exacta:

```markdown
# REPORTE DE INTELIGENCIA COMPETITIVA
## {{competidor_nombre}} vs {{cliente_nombre}}

**Fecha:** {{fecha}}
**Analista:** Agente de Inteligencia Competitiva — Addendo Growth Partner
**Industria:** {{industria}}
**Region:** {{ciudad}}, {{pais}}

---

### RESUMEN EJECUTIVO (5 bullets maximo)
- [Hallazgo clave 1 con dato numerico]
- [Hallazgo clave 2 con dato numerico]
- [Hallazgo clave 3 con dato numerico]
- [Oportunidad principal con potencial estimado]
- [Accion mas urgente con timeline]

---

### 1. KEYWORDS COMPETIDORAS
[Output completo de Fase 1]

### 2. ANUNCIOS Y COSTOS
[Output completo de Fase 2]

### 3. ANALISIS TECNICO
[Output completo de Fase 3]

### 4. SEO ON-PAGE
[Output completo de Fase 4]

### 5. SINTESIS Y PLAN DE ACCION
[Output completo de Fase 5]

---

### PROXIMOS PASOS
1. [Accion inmediata con responsable]
2. [Accion inmediata con responsable]
3. [Accion inmediata con responsable]

---
*Reporte generado por Addendo Agency OS — Capa de Inteligencia*
*APIs utilizadas: DataForSEO, Apify, Google PageSpeed Insights*
*Datos actualizados a: {{fecha}}*
```

---

## REGLAS DE CALIDAD DEL REPORTE

1. **CERO opiniones sin datos.** Cada afirmacion debe tener un numero, porcentaje o dato especifico que la respalde.
2. **CERO recomendaciones genericas.** "Mejorar el SEO" NO es una recomendacion. "Agregar schema LocalBusiness con NAP consistente al homepage para obtener rich snippet en SERP local" SI lo es.
3. **CERO tablas vacias.** Si una API no devuelve datos para una seccion, indicar "DATOS NO DISPONIBLES — [razon]" y sugerir fuente alternativa.
4. **Todo dato extraido debe incluir su fuente.** Ejemplo: "Volumen: 1,200/mes (DataForSEO, abril 2026)"
5. **Las acciones del plan deben ser ejecutables por un agente especifico del sistema.** Cada accion indica que agente (#) la ejecuta y con que herramienta.
6. **El reporte completo no debe exceder 3,000 palabras** excluyendo tablas. Si hay demasiados datos, priorizar los mas relevantes y mover el resto a un apendice.
7. **Buyer intent score y priority score deben calcularse para CADA keyword.** No se omiten.
8. **Los anuncios se ordenan SIEMPRE por dias activos descendente.** Los mas longevos primero.
9. **La tabla comparativa de Fase 5 es OBLIGATORIA.** Es lo primero que el director de estrategia lee.
10. **Si el competidor NO tiene algo (blog, schema, reviews), eso es una OPORTUNIDAD, no solo una observacion.** Siempre traducir ausencias en acciones concretas.
