# SKILL: Copywriting SEO de Alto Impacto

**Nivel:** Experto absoluto — combina psicologia de conversion, SEO tecnico y redaccion persuasiva
**Agentes que usan este skill:** #16 copywriting-seo, #27 seo, #47 Growth Content Specialist
**Flujos:** Blog Automatico, Cliente Nuevo (landing pages), Crecimiento
**APIs requeridas:** DataForSEO (SERP + People Also Ask), Apify (Reddit/Quora scraping), Claude API
**Output:** Articulo completo en markdown + metadata SEO + schema JSON-LD listo para publicar

---

## PROTOCOLO DE EJECUCION

Este skill se ejecuta en 6 fases. Saltarse la Fase 1 es la causa #1 de articulos que no rankean. La investigacion no es opcional.

**Datos de entrada requeridos:**

```
keyword_principal: La keyword objetivo (ej: "plomero emergencia Houston")
tipo_contenido: blog / landing / pilar / servicio
cliente_nombre: Nombre del negocio
cliente_url: Dominio del cliente
industria: Nicho o industria
ciudad: Ubicacion objetivo (si es local)
pais: Pais objetivo
idioma: es / en
tono: profesional / cercano / tecnico / conversacional
servicio_a_promover: Que servicio/producto debe guiar la conversion
```

---

## FASE 1 — INVESTIGACION ANTES DE ESCRIBIR

**REGLA DE ORO:** No se escribe ni una palabra hasta completar esta fase. Escribir sin investigar es escribir para uno mismo, no para Google ni para el usuario.

### 1.1 Analisis de las 3 primeras paginas de Google

**API:** DataForSEO — SERP Organic Live Advanced
**Endpoint:** `POST https://api.dataforseo.com/v3/serp/google/organic/live/advanced`

```json
[
  {
    "keyword": "{{keyword_principal}}",
    "language_code": "{{idioma}}",
    "location_name": "{{ciudad}}, {{pais}}",
    "depth": 30,
    "calculate_rectangles": false,
    "people_also_ask_click_depth": 2
  }
]
```

**Para las primeras 10 URLs, crawlear con Apify:**

```json
{
  "startUrls": [
    { "url": "URL_top_1" },
    { "url": "URL_top_2" },
    "...hasta top_10"
  ],
  "maxCrawlPages": 1,
  "crawlerType": "playwright",
  "saveHtml": true,
  "saveMarkdown": true
}
```

**Datos a extraer de cada URL del top 10:**

| Campo | Que buscar | Para que sirve |
|-------|-----------|----------------|
| title_tag | Texto exacto del `<title>` | Detectar patrones que funcionan |
| meta_description | Contenido de meta description | Ver que CTA usan |
| h1 | Texto del H1 | Ver como formulan la promesa principal |
| h2s | Todos los H2 en orden | Detectar subtopicos obligatorios |
| h3s | Todos los H3 en orden | Detectar profundidad del contenido |
| word_count | Total de palabras del articulo | Calcular longitud objetivo |
| images_count | Cantidad de imagenes | Detectar densidad visual |
| internal_links | Enlaces internos | Ver estructura de silos |
| external_links | Enlaces externos | Ver fuentes autoritativas que citan |
| schema_types | Tipos de schema implementados | Replicar schemas que ganan SERP |
| first_paragraph | Primer parrafo completo | Detectar patron de apertura |
| last_paragraph | Ultimo parrafo completo | Detectar patron de cierre |
| ctas | CTAs del articulo | Ver que accion piden |
| tables_count | Tablas en el articulo | Detectar si Google premia tablas en esta keyword |
| lists_count | Listas numeradas/bulleted | Detectar si Google premia listas |

### 1.2 Identificacion de intencion de busqueda

**Clasificar la keyword en una de 4 intenciones:**

| Intencion | Indicadores en SERP | Tipo de contenido que rankea | Que escribir |
|-----------|--------------------|-----------------------------|--------------|
| **Informacional** | People Also Ask dominante, featured snippet, articulos de blog, Wikipedia | Guias, tutoriales, definiciones, how-to | Articulo educativo profundo (1,500-3,000 palabras) |
| **Navegacional** | Knowledge panel, sitemap links, resultado de marca | Homepage, about, contact | NO atacar — el usuario busca una marca especifica |
| **Transaccional** | Ads arriba y abajo, Google Shopping, resultados locales con telefono | Landing pages, product pages, service pages | Landing page de venta (800-1,500 palabras) |
| **Comercial (investigacion)** | "mejor", "vs", "comparacion", reviews, listicles | Comparativas, listas, reviews | Articulo comparativo con tabla (1,200-2,500 palabras) |

**Indicadores de SERP para cada intencion:**

```
INFORMACIONAL:
  - featured_snippet presente
  - people_also_ask con 4+ preguntas
  - dominios como wikipedia, healthline, investopedia
  - ningun ad o 1 solo ad
  
NAVEGACIONAL:
  - knowledge panel del lado derecho
  - sitemap links bajo el resultado #1
  - resultado #1 es homepage de marca
  
TRANSACCIONAL:
  - 4+ ads (arriba + abajo)
  - google shopping carousel
  - local pack con telefonos
  - dominios de tiendas, servicios locales
  
COMERCIAL:
  - listicles ("top 10", "best", "mejor")
  - reviews y star ratings en snippets
  - dominios de comparativas (g2, capterra, trustpilot)
```

### 1.3 Extraccion del vocabulario real de la audiencia

**Fuente 1: People Also Ask de DataForSEO**

Las preguntas devueltas en `people_also_ask_click_depth: 2` son el vocabulario EXACTO que usa la audiencia. Extraer:

```json
{
  "preguntas_directas": ["pregunta 1", "pregunta 2", "..."],
  "preguntas_expandidas_nivel_2": ["sub-pregunta 1", "..."]
}
```

**Fuente 2: Reddit via Apify**

```json
{
  "actor": "trudax/reddit-scraper",
  "input": {
    "searches": ["{{keyword_principal}}"],
    "type": "posts",
    "sort": "relevance",
    "time": "year",
    "maxItems": 30,
    "includeComments": true,
    "maxComments": 20
  }
}
```

**Extraer de Reddit:**

- Titulo del post (como formula la pregunta un humano real)
- Cuerpo del post (contexto completo del problema)
- Comentarios con mas upvotes (las mejores respuestas)
- Palabras y frases repetidas (vocabulario del nicho)

**Fuente 3: Quora via Apify**

```json
{
  "actor": "apify/website-content-crawler",
  "input": {
    "startUrls": [
      { "url": "https://www.quora.com/search?q={{encoded_keyword}}" }
    ],
    "maxCrawlPages": 10,
    "crawlerType": "playwright"
  }
}
```

**Glosario de la audiencia — construir tabla:**

| Termino tecnico (lo que creemos que dicen) | Termino real (lo que dicen en Reddit/Quora) | Frecuencia |
|-------------------------------------------|---------------------------------------------|------------|
| "Obstruccion en tuberia" | "se me tapo el drenaje" | 47 menciones |
| "Fuga de agua" | "goteo en el bano" | 32 menciones |
| "Instalacion de fontaneria" | "poner las tuberias" | 18 menciones |

**REGLA:** Usar SIEMPRE el termino real en el contenido principal. El termino tecnico va solo en metadata SEO si aplica.

### 1.4 Mineria de preguntas frecuentes

**Consolidar en un banco de preguntas:**

```
BANCO DE PREGUNTAS OBLIGATORIO (minimo 15):

De People Also Ask (DataForSEO):
  1. [pregunta 1]
  2. [pregunta 2]
  ...

De Reddit (titulos de posts relevantes):
  1. [pregunta estilo Reddit]
  2. [pregunta estilo Reddit]
  ...

De Quora (preguntas con mas respuestas):
  1. [pregunta 1]
  ...
```

**De estas 15+ preguntas, elegir:**
- Las 5 mas relevantes a la keyword -> se responden EN EL CUERPO del articulo como H2
- Las 8-10 restantes -> se agrupan en una seccion FAQ al final con schema FAQPage

### 1.5 Calculo de longitud objetivo

**Formula obligatoria:**

```
word_count_top10 = [wordcount_pos1, wordcount_pos2, ..., wordcount_pos10]
promedio_top10 = SUM(word_count_top10) / 10
mediana_top10 = MEDIAN(word_count_top10)

LONGITUD_OBJETIVO = MAX(promedio_top10, mediana_top10) * 1.20

AJUSTES:
  - Si tipo_contenido = "blog" Y LONGITUD_OBJETIVO < 1200 -> usar 1200
  - Si tipo_contenido = "landing" Y LONGITUD_OBJETIVO < 800 -> usar 800
  - Si tipo_contenido = "pilar" Y LONGITUD_OBJETIVO < 2500 -> usar 2500
  - Si LONGITUD_OBJETIVO > 5000 -> cap en 5000 (nadie lee mas)
```

**La regla del 20%:** Si el top 10 promedia 1,500 palabras, el articulo debe tener 1,800 minimo. No por rellenar — por profundidad real.

### OUTPUT FASE 1 — Brief de investigacion

```markdown
## BRIEF DE INVESTIGACION — {{keyword_principal}}

### Intencion de busqueda
Tipo: [INFORMACIONAL / TRANSACCIONAL / COMERCIAL / NAVEGACIONAL]
Indicadores: [lista de indicadores encontrados en SERP]

### Top 10 competidores
[Tabla con url, title, h1, word_count, schema, patterns]

### Longitud objetivo
Promedio top 10: [n] palabras
Mediana top 10: [n] palabras
Longitud objetivo: [n] palabras (+20%)

### Vocabulario de la audiencia
[Tabla con termino tecnico vs termino real vs frecuencia]

### Banco de preguntas (15 minimo)
[Lista categorizada por fuente]

### Angulo unico
[Que dice el top 10 que podemos decir MEJOR o DIFERENTE]
```

---

## FASE 2 — ESTRUCTURA DEL ARTICULO SEO PERFECTO

### 2.1 Title tag

**Reglas absolutas:**

```
REGLAS DEL TITLE TAG:
  1. Longitud: 50-60 caracteres (incluyendo espacios)
  2. Keyword principal: en las PRIMERAS palabras
  3. Generar curiosidad o urgencia
  4. Incluir numero, ano o bracket si aplica: [2026], (Guia), (Paso a Paso)
  5. Pipe o dash para separar: "Keyword | Beneficio" o "Keyword: Beneficio"
  6. NO usar: palabras vacias al inicio, mayusculas gritonas, clickbait vacio
```

**Plantillas probadas (usar la que mas encaje):**

```
INFORMACIONAL:
  - "[Keyword]: Guia Completa [Ano]"
  - "Como [hacer accion con keyword] en [tiempo especifico]"
  - "[Numero] [Tipos de keyword] que [beneficio]"
  
TRANSACCIONAL / LOCAL:
  - "[Servicio] en [Ciudad] | [Diferenciador]"
  - "[Keyword] — [Beneficio] desde $[precio]"
  - "Mejor [Keyword] en [Ciudad] | [Trust signal]"
  
COMERCIAL:
  - "Mejor [Keyword] [Ano]: [Numero] Opciones Comparadas"
  - "[Opcion A] vs [Opcion B]: Cual Elegir en [Ano]"
  - "Top [Numero] [Keyword] (Review [Ano])"
```

**Validacion:**

```
title_tag_final = "..."
caracteres = LENGTH(title_tag_final)
ASSERT: caracteres <= 60
ASSERT: keyword_principal IN title_tag_final
ASSERT: keyword_principal esta en posicion <= 15 caracteres
```

### 2.2 Meta description

**Reglas absolutas:**

```
REGLAS DE META DESCRIPTION:
  1. Longitud: 140-155 caracteres
  2. Keyword principal: al menos 1 vez (Google la pone en negrita)
  3. Estructura: [Gancho/Problema] + [Beneficio concreto] + [CTA]
  4. Incluir numero o dato especifico cuando sea posible
  5. Verbos de accion al final: "Llama ahora", "Descubre como", "Obten tu cotizacion"
  6. NO repetir el title tag — complementarlo
```

**Plantilla:**

```
[Gancho 1 frase corta]. [Beneficio con numero/dato]. [CTA imperativo].
```

**Ejemplos:**

```
keyword: "plomero emergencia Houston"
meta: "¿Fuga de agua? Plomeros disponibles 24/7 en Houston. Llegamos en menos de 45 min. Sin cargo extra por emergencia. Llama ahora."
chars: 145 ✓
```

### 2.3 URL slug

**Reglas absolutas:**

```
REGLAS DEL URL SLUG:
  1. Solo minusculas
  2. Guiones medios entre palabras (NO underscores)
  3. Solo keyword principal — sin stopwords
  4. Maximo 5 palabras
  5. Sin caracteres especiales, acentos, n, ni numeros (salvo ano si es relevante)
  6. Sin fecha en la URL (el articulo envejece mal)
```

**Stopwords a eliminar (es/en):**

```
ES: el, la, los, las, un, una, unos, unas, de, del, y, o, para, por, con, en, a
EN: the, a, an, of, and, or, for, by, with, in, to, on, at
```

**Ejemplos:**

```
keyword: "como elegir el mejor plomero en Houston"
URL incorrecta: /blog/como-elegir-el-mejor-plomero-en-houston
URL correcta: /blog/elegir-mejor-plomero-houston

keyword: "best emergency plumber houston tx 2026"
URL correcta: /blog/emergency-plumber-houston
(quitamos "best", "tx" y el ano)
```

### 2.4 H1

**Reglas absolutas:**

```
REGLAS DEL H1:
  1. SOLO UNO por pagina
  2. DIFERENTE al title tag (complementario, no identico)
  3. Contiene la keyword principal
  4. Mas largo que el title tag (60-80 caracteres OK)
  5. Mas emocional/descriptivo que el title tag
```

**Relacion title vs H1:**

```
title_tag: "Plomeros Houston 24/7 | Addendo" (para SEO y CTR en SERP)
H1: "Plomero de Emergencia en Houston: Respuesta en 45 Minutos, 24/7" (para el usuario cuando entra)
```

### 2.5 Estructura de H2s

**H2s obligatorios por tipo de contenido:**

**Para articulo informacional (blog):**

```
H2 1: [Que es {{keyword}} — responde la pregunta mas basica]
H2 2: [Por que importa — contexto y stakes]
H2 3: [Como funciona / Tipos de / Paso a paso]
H2 4: [Errores comunes o mitos — agitacion]
H2 5: [Como elegir bien / Criterios]
H2 6: [Casos reales o ejemplos]
H2 7: [Preguntas frecuentes — seccion FAQ]
H2 8: [Conclusion + CTA al servicio]
```

**Para landing page transaccional:**

```
H2 1: [Beneficio principal reformulado]
H2 2: [Para quien es este servicio]
H2 3: [Como funciona — proceso en 3-5 pasos]
H2 4: [Por que elegirnos — diferenciadores con numeros]
H2 5: [Testimonios / Casos de exito]
H2 6: [Precios / Paquetes]
H2 7: [Garantia]
H2 8: [FAQ]
H2 9: [CTA final]
```

**Para articulo comparativo:**

```
H2 1: [Resumen de la comparacion — tabla]
H2 2: [Criterios de comparacion]
H2 3: [Opcion 1: analisis detallado]
H2 4: [Opcion 2: analisis detallado]
H2 5: [Opcion N: analisis detallado]
H2 6: [Cual elegir segun tu caso]
H2 7: [FAQ]
```

**Reglas de los H2:**

```
REGLAS:
  1. Cada H2 debe contener una keyword secundaria o LSI keyword
  2. Al menos 3 H2 deben responder preguntas del People Also Ask
  3. Los H2 deben poder leerse solos y entenderse (tabla de contenidos legible)
  4. Longitud del H2: 40-70 caracteres
  5. Evitar H2s puramente estructurales como "Introduccion" o "Conclusion" — dales vida
```

### 2.6 H3s

```
REGLAS DE H3:
  1. Solo dentro de H2 (jerarquia correcta)
  2. Para desglosar listas, pasos o criterios
  3. Maximo 5 H3 por H2 (mas es sintoma de mala jerarquia)
  4. Longitud: 30-60 caracteres
  5. Pueden ser mas conversacionales que los H2
```

### 2.7 Parrafo de apertura

**Formula del hook perfecto (primeras 100 palabras):**

```
ESTRUCTURA DEL HOOK:
  Linea 1 (8-15 palabras): Pregunta directa / Dato impactante / Afirmacion polemica
  Linea 2 (10-20 palabras): Amplifica el dolor o la curiosidad
  Linea 3 (15-25 palabras): Promete la solucion — aqui va la keyword principal
  Linea 4 (10-20 palabras): Credibilidad — por que confiar en este articulo
```

**Ejemplo:**

```
keyword: "plomero emergencia Houston"

Es 3am, el agua cubre tu cocina y no sabes a quien llamar. [Linea 1 - dolor]

Cada minuto que pasa, el dano estructural crece y el costo de reparacion se duplica. [Linea 2 - agitacion]

Encontrar un plomero de emergencia confiable en Houston no deberia ser una loteria. [Linea 3 - promesa con keyword]

En los ultimos 7 anos hemos respondido a mas de 12,000 emergencias en Houston y hoy compartimos exactamente que buscar. [Linea 4 - credibilidad con numeros]
```

**Checklist del hook:**

```
[ ] Captura atencion en menos de 2 segundos
[ ] Keyword principal aparece dentro de las primeras 100 palabras
[ ] Incluye un numero especifico
[ ] Crea curiosidad o promesa clara
[ ] NO empieza con "En este articulo vamos a hablar de..."
[ ] NO empieza con definicion de diccionario
```

### 2.8 Conclusion

**Estructura de cierre obligatoria:**

```
BLOQUE 1 — Resumen ejecutivo (2-3 frases):
  Recapitula los 3 puntos mas importantes del articulo

BLOQUE 2 — Puente al CTA (1-2 frases):
  Traduce el conocimiento en accion necesaria

BLOQUE 3 — CTA claro y especifico:
  Verbo de accion + beneficio + remover friccion
  Ejemplo: "Llama al 555-1234 y obten tu cotizacion gratis en 5 minutos"
```

**Prohibido:**

- "En conclusion..." (palabra muerta)
- "Esperamos que este articulo te haya sido util" (generico)
- CTAs vagos como "contactanos" o "aprende mas"

### 2.9 Longitudes minimas

```
POR TIPO DE CONTENIDO:
  Blog informacional: 1,200 palabras minimo
  Landing page: 800 palabras minimo
  Articulo pilar: 2,500 palabras minimo
  Comparativa: 1,500 palabras minimo
  Pagina de servicio: 1,000 palabras minimo
  
AJUSTE SEGUN TOP 10:
  Siempre superar el promedio del top 10 en 20% (ver Fase 1.5)
```

---

## FASE 3 — TECNICAS DE COPYWRITING QUE CONVIERTEN

### 3.1 AIDA en cada pieza

**Aplicacion practica en un articulo:**

```
A — ATENCION (hook + H1 + primer parrafo):
  Objetivo: Parar el scroll
  Tecnica: Dato impactante + pregunta directa + dolor reconocible

I — INTERES (primeros 2-3 H2):
  Objetivo: Que siga leyendo
  Tecnica: Prometer informacion que soluciona el dolor + storytelling + especificidad

D — DESEO (H2 del medio + testimonios + casos):
  Objetivo: Que visualice el resultado
  Tecnica: Social proof con numeros + transformacion antes/despues + beneficios

A — ACCION (ultimo H2 + CTA):
  Objetivo: Que tome la accion
  Tecnica: CTA claro + remover fricciones + urgencia real (no falsa)
```

### 3.2 PAS para articulos de blog

**Problema - Agitacion - Solucion:**

```
PROBLEMA (H2 1-2):
  Describir el problema del lector en SU lenguaje
  Validar que es un problema real y comun
  Ejemplo: "El 73% de los duenos de casa en Houston han tenido al menos una emergencia de plomeria en los ultimos 5 anos."

AGITACION (H2 3-4):
  Explicar las consecuencias de NO solucionarlo
  Costos reales, riesgos, perdidas
  Ejemplo: "Una fuga sin reparar durante 24 horas puede costar hasta $4,500 en dano estructural segun Insurance Information Institute."

SOLUCION (H2 5-8):
  Presentar la solucion con pasos concretos
  Mostrar como evitar el problema o solucionarlo
  Incluir prueba social y credibilidad
  CTA claro al final
```

### 3.3 Social proof obligatorio

**Cada articulo DEBE incluir al menos 3 elementos de prueba social:**

| Tipo | Ejemplo | Donde colocarlo |
|------|---------|-----------------|
| Numeros especificos | "12,847 clientes atendidos" | Parrafo de apertura o H2 1 |
| Testimonios con nombre | "'Llegaron en 30 min, salvaron mi piso' — Maria R." | Cerca del CTA principal |
| Casos con resultados | "Reparamos la fuga en 1 hora, ahorro estimado: $3,200" | Seccion media |
| Trust badges | BBB A+, Google 4.9/5 estrellas | Footer del articulo |
| Anos de experiencia | "Mas de 15 anos en Houston" | Hook o conclusion |
| Certificaciones | "Maestros plomeros certificados por Texas PHCCR" | Seccion "Por que elegirnos" |
| Media mentions | "Como se menciono en Houston Chronicle" | Cerca del hook |

**Regla:** Nunca usar social proof generica como "muchos clientes satisfechos". SIEMPRE con numero o fuente verificable.

### 3.4 Urgencia y escasez (solo cuando aplica)

**Tipos de urgencia ETICA:**

```
URGENCIA REAL (usar):
  - Oferta con fecha de expiracion verdadera
  - Servicio con disponibilidad limitada real
  - Precios que suben en fecha especifica anunciada
  - Temporada/estacionalidad real
  
URGENCIA FALSA (NO usar):
  - Contadores regresivos que se reinician
  - "Solo quedan 2 lugares" cuando hay 50
  - "Oferta termina hoy" que reaparece manana
```

**Lenguaje de urgencia:**

```
ETICA: "Las reservas para esta temporada se cierran el 15 de junio"
NO ETICA: "Compra ahora o te arrepentiras para siempre"
```

### 3.5 Especificidad — la regla del numero concreto

**PROHIBIDO escribir en generalidades:**

| Generico (PROHIBIDO) | Especifico (OBLIGATORIO) |
|---------------------|--------------------------|
| "Resultados rapidos" | "Primeros resultados visibles en 14 dias" |
| "Muchos clientes satisfechos" | "Mas de 2,400 clientes en 2025" |
| "Aumentamos ventas" | "Aumentamos ventas en 47% en 90 dias" |
| "Servicio rapido" | "Respuesta en menos de 45 minutos" |
| "Precios accesibles" | "Desde $89, sin cargos ocultos" |
| "Experiencia garantizada" | "15 anos operando en Houston" |
| "Mejor calidad" | "Materiales con garantia de 10 anos" |
| "Equipo profesional" | "12 tecnicos certificados por el estado" |

**Fuentes de numeros:**

1. Datos internos del cliente (preferido)
2. Estudios de la industria citables (BLS, Statista, IBISWorld)
3. Investigaciones academicas
4. Casos de estudio propios

**REGLA:** Si no tienes el numero real, no lo inventes — busca el dato o cambia la frase.

### 3.6 Beneficios sobre caracteristicas

**Formula de conversion:**

```
[CARACTERISTICA] + "lo que significa que" + [BENEFICIO] + "lo que te permite" + [TRANSFORMACION]
```

**Ejemplo:**

```
CARACTERISTICA SOLA (debil):
"Usamos camaras endoscopicas de alta definicion."

CON BENEFICIO (mejor):
"Usamos camaras endoscopicas de alta definicion, lo que significa que identificamos el problema exacto sin romper paredes."

CON BENEFICIO + TRANSFORMACION (mejor):
"Usamos camaras endoscopicas de alta definicion, lo que significa que identificamos el problema exacto sin romper paredes, lo que te permite ahorrar entre $800 y $2,000 en reparaciones innecesarias y recuperar tu casa el mismo dia."
```

### 3.7 Manejo de objeciones

**Las 3 objeciones universales + como responderlas:**

```
OBJECION 1: "Es muy caro"
RESPUESTA:
  - Mostrar el costo de NO actuar (perdidas, dano mayor, tiempo perdido)
  - Romper el precio en unidades mas pequenas ("$3/dia")
  - Comparar con alternativas mas caras (hospital, reemplazo completo)
  - Ofrecer financiamiento o cotizacion gratis

OBJECION 2: "No confio / no los conozco"
RESPUESTA:
  - Trust signals: anos, certificaciones, reviews con numero
  - Garantia explicita (devolucion, trabajo garantizado X anos)
  - Testimonios verificables con nombre completo
  - Caso de estudio con nombre del cliente (con permiso)

OBJECION 3: "No tengo tiempo / es complicado"
RESPUESTA:
  - Mostrar la simplicidad del proceso (3 pasos, 5 minutos)
  - Eliminar friccion: nosotros nos encargamos de X, Y, Z
  - Tiempo especifico: "Todo el proceso toma menos de 20 minutos"
  - "No necesitas ser experto — nosotros lo hacemos por ti"
```

**Donde colocar las respuestas a objeciones:**

- Objecion 1 (precio): Cerca del CTA principal
- Objecion 2 (confianza): En el parrafo de apertura + seccion "Por que elegirnos"
- Objecion 3 (complejidad): En el H2 "Como funciona"

---

## FASE 4 — SEO ON-PAGE PERFECTO

### 4.1 Keyword density

**Formula:**

```
densidad = (ocurrencias_keyword_principal / total_palabras) * 100

RANGO OPTIMO: 1.0% - 2.0%

EJEMPLOS:
  Articulo de 1,500 palabras -> keyword principal aparece 15-30 veces
  Articulo de 2,500 palabras -> keyword principal aparece 25-50 veces
  Landing de 800 palabras -> keyword principal aparece 8-16 veces
```

**Reglas contra el keyword stuffing:**

```
PROHIBIDO:
  - Repetir keyword en oraciones consecutivas
  - Usar keyword mas de 2 veces en un parrafo de 3 lineas
  - Forzar keyword donde rompa la naturalidad de la lectura
  
OBLIGATORIO:
  - Usar variaciones y sinonimos (LSI keywords)
  - La keyword debe sonar natural al leer en voz alta
  - Si el parrafo se siente forzado, reescribirlo
```

### 4.2 Ubicaciones obligatorias de la keyword

**Checklist — la keyword principal DEBE aparecer en:**

```
[ ] Title tag (en las primeras palabras)
[ ] Meta description (al menos 1 vez)
[ ] URL slug
[ ] H1 (1 vez)
[ ] Primer parrafo (dentro de las primeras 100 palabras)
[ ] Ultimo parrafo (en la conclusion)
[ ] Al menos 1 H2
[ ] Alt text de la imagen principal
[ ] Al menos 1 enlace interno con anchor text natural
[ ] Primera palabra de al menos 1 parrafo (opcional pero ayuda)
```

### 4.3 LSI keywords — minimo 5 terminos

**LSI (Latent Semantic Indexing) = palabras semanticamente relacionadas.**

**Como encontrarlas:**

1. **Google Autocomplete:** escribir la keyword y anotar sugerencias
2. **Related searches:** al final del SERP de Google
3. **People Also Ask:** terminos repetidos en las preguntas
4. **DataForSEO Keyword Suggestions:** endpoint `keyword_suggestions`
5. **Bold/negritas en el SERP:** palabras que Google resalta son LSI

**Ejemplo para keyword "plomero emergencia Houston":**

```
LSI keywords obligatorias:
  1. "fuga de agua"
  2. "reparacion de tuberias"
  3. "plomeria 24 horas"
  4. "servicio de emergencia"
  5. "plomero certificado"
  6. "deteccion de fugas"
  7. "drenaje tapado"
  8. "instalacion sanitaria"
```

**Distribucion en el articulo:**

```
- Cada LSI keyword debe aparecer al menos 2 veces
- Idealmente una LSI keyword en cada H2
- Distribuidas a lo largo del articulo, no concentradas
```

### 4.4 Enlaces internos

```
REGLAS DE ENLACES INTERNOS:
  1. Minimo 2, maximo 4 enlaces internos por articulo de 1,500 palabras
  2. Enlazar a paginas del mismo silo tematico (ej: articulos de plomeria entre si)
  3. Anchor text descriptivo y natural — NO "click aqui", NO "mas info"
  4. El anchor text debe ser la keyword secundaria de la pagina destino
  5. Enlazar a paginas de servicio cuando sea relevante para conversion
  6. No enlazar a la misma pagina destino 2 veces
  7. Los enlaces internos deben abrir en la misma pestana
```

**Ejemplo:**

```markdown
[MAL] Si quieres saber mas sobre plomeria, <a href="/servicios/plomeria">click aqui</a>.

[BIEN] Nuestro equipo de <a href="/servicios/plomeria">plomeros certificados en Houston</a> 
responde emergencias las 24 horas.
```

### 4.5 Enlaces externos

```
REGLAS DE ENLACES EXTERNOS:
  1. 1-2 enlaces a fuentes autoritativas por articulo
  2. Solo enlazar a sitios con DA 70+ (Wikipedia, gobierno, universidades, medios grandes)
  3. SIEMPRE con target="_blank" y rel="noopener noreferrer"
  4. Citar estudios, estadisticas, regulaciones
  5. NO enlazar a competidores directos
  6. NO enlazar a sitios de baja calidad aunque sean relevantes
```

**Ejemplo:**

```markdown
Segun el <a href="https://www.epa.gov/watersense/fix-leak-week" target="_blank" 
rel="noopener noreferrer">EPA (Environmental Protection Agency)</a>, las fugas domesticas 
desperdician mas de 1 billon de galones de agua al ano.
```

### 4.6 Schema markup (ver Fase 6)

### 4.7 URL optimizada (ver Fase 2.3)

---

## FASE 5 — REGLAS DE ESCRITURA NIVEL EXPERTO

### 5.1 Parrafos maximo 3 lineas

**REGLA:** En web, los parrafos largos NO se leen. El lector escanea.

```
[MAL]
La plomeria de emergencia en Houston es un servicio critico que miles de familias necesitan cada mes, especialmente durante las epocas de frio cuando las tuberias pueden congelarse y explotar causando danos significativos en los hogares, y tambien durante las temporadas de lluvia cuando los drenajes se saturan y el agua empieza a subir por los banos y las cocinas, lo cual puede resultar en perdidas economicas muy importantes si no se atiende a tiempo por un profesional calificado.

[BIEN]
La plomeria de emergencia en Houston es un servicio critico. Miles de familias lo necesitan cada mes.

En invierno, las tuberias se congelan y explotan. En lluvias, los drenajes se saturan.

Si no actuas a tiempo, las perdidas superan los $4,000 en promedio.
```

### 5.2 Frases maximo 20 palabras

**REGLA:** Cada frase debe caber en una respiracion. Si no, dividirla.

```
[MAL] (47 palabras)
Nuestros tecnicos certificados por el estado de Texas llegan a tu domicilio en menos de 45 minutos con equipos de deteccion de fugas de ultima generacion para diagnosticar el problema rapidamente sin necesidad de romper paredes ni hacer reparaciones adicionales que aumenten tu costo.

[BIEN] (3 frases, 11-15 palabras cada una)
Nuestros tecnicos certificados llegan a tu domicilio en menos de 45 minutos. Usamos equipos de deteccion de fugas de ultima generacion. Diagnosticamos el problema sin romper paredes ni subir el costo.
```

### 5.3 Voz activa siempre

```
PASIVA -> ACTIVA:

[MAL] "El problema fue resuelto por nuestro equipo."
[BIEN] "Nuestro equipo resolvio el problema."

[MAL] "Las tuberias pueden ser danadas por el congelamiento."
[BIEN] "El congelamiento puede danar las tuberias."

[MAL] "El servicio es ofrecido las 24 horas."
[BIEN] "Ofrecemos el servicio las 24 horas."
```

**Excepciones a la voz activa:**
- Cuando el agente es irrelevante o desconocido
- En textos legales o formales donde la pasiva es estandar

### 5.4 Listas con bullets para 3+ items

**REGLA:** Si tienes 3 o mas elementos, van en lista — NO en parrafo.

```
[MAL - parrafo]
Nuestro servicio incluye deteccion de fugas, reparacion de tuberias, instalacion de calentadores, destape de drenajes, remodelacion de banos, inspeccion con camara y mantenimiento preventivo.

[BIEN - lista]
Nuestro servicio incluye:

- Deteccion de fugas con camara endoscopica
- Reparacion de tuberias de cobre y PEX
- Instalacion de calentadores de agua
- Destape de drenajes sin quimicos agresivos
- Remodelacion completa de banos
- Inspeccion con video de todo el sistema
- Mantenimiento preventivo bi-anual
```

**Tipos de listas:**

```
LISTA CON BULLETS:
  Cuando el orden no importa (caracteristicas, beneficios, opciones)

LISTA NUMERADA:
  Cuando el orden importa (pasos, secuencias, rankings)

TABLA:
  Cuando hay 2+ dimensiones a comparar
```

### 5.5 Numeros concretos siempre

Ver Fase 3.5 — es una regla tan critica que se repite aqui.

### 5.6 Test del escaneo de 30 segundos

**Prueba final del articulo:**

```
TEST DEL ESCANEO:
  1. Lee SOLO el title + H1 + H2s + primera linea de cada seccion + conclusion
  2. En 30 segundos, responde: entendiste el mensaje principal?
  3. En 30 segundos, sabes que accion se espera de ti?
  4. En 30 segundos, hay un numero especifico que recuerdas?
  
SI LA RESPUESTA A CUALQUIERA ES "NO" -> reestructurar el articulo
```

### 5.7 Prohibiciones absolutas

```
NUNCA USAR:
  - "En el mundo de hoy..."
  - "En la era digital..."
  - "Como sabras..."
  - "Sin lugar a dudas..."
  - "Es importante destacar que..."
  - "En este articulo vamos a..."
  - "Esperamos que este articulo..."
  - "En resumen, podemos concluir que..."
  - Adjetivos vacios: "increible", "asombroso", "espectacular"
  - Adverbios debilitantes: "quizas", "tal vez", "posiblemente", "probablemente"
  - "Etcetera" (lista lo importante o no lo listes)
  - Signos de exclamacion multiples (nunca mas de 1 por articulo)
  
SIEMPRE USAR:
  - Verbos fuertes en presente
  - Segunda persona ("tu", "tu") para crear conexion
  - Primera persona plural ("nosotros") para el equipo
  - Numeros especificos
  - Ejemplos concretos
  - Frases cortas
```

---

## FASE 6 — OUTPUT REQUERIDO

### 6.1 Estructura del output final

**Para cada articulo, entregar este bloque exacto:**

```markdown
# OUTPUT DEL SKILL — {{keyword_principal}}

---

## METADATA SEO

### Title Tag
**Texto:** [title tag final]
**Caracteres:** [n]/60
**Keyword en pos 1-15:** [SI/NO]

### Meta Description
**Texto:** [meta description final]
**Caracteres:** [n]/155
**Contiene keyword:** [SI/NO]
**Contiene CTA:** [SI/NO]

### URL Slug
**Slug:** /blog/[slug]
**Longitud:** [n] palabras
**Stopwords eliminadas:** [lista]

### Keywords objetivo
- **Principal:** [keyword]
- **Secundarias:** [lista de 3-5]
- **LSI:** [lista de 5-8]

### Intencion de busqueda
[INFORMACIONAL / TRANSACCIONAL / COMERCIAL / NAVEGACIONAL]

### Longitud objetivo
- Target: [n] palabras
- Promedio top 10: [n] palabras
- Superacion: +[n]%

---

## ARTICULO COMPLETO

# [H1 final]

[Parrafo de apertura — hook completo con 4 lineas]

## [H2 1]

[Contenido del H2 1 — multiples parrafos cortos]

### [H3 si aplica]

[...]

## [H2 2]

[...]

[...continuar hasta el final del articulo...]

## Preguntas Frecuentes

### [Pregunta 1 del People Also Ask]
[Respuesta corta y directa — 40-60 palabras]

### [Pregunta 2]
[Respuesta]

[...hasta 8-10 preguntas...]

## Conclusion

[Resumen ejecutivo 2-3 frases]

[Puente al CTA 1-2 frases]

[CTA final — verbo de accion + beneficio + remover friccion]

---

## SCHEMA MARKUP JSON-LD

`` `json
[schema completo]
`` `

---

## ENLACES INTERNOS SUGERIDOS (3)

1. **Anchor text:** [texto del enlace]
   **URL destino:** [/path]
   **Razon:** [por que es relevante]

2. [...]

3. [...]

---

## ENLACES EXTERNOS CITADOS (1-2)

1. **Fuente:** [nombre + URL]
   **Que se cita:** [dato o estudio]
   **Ubicacion en articulo:** [seccion]

---

## IDEAS DE ARTICULOS RELACIONADOS (para linking futuro)

1. **Titulo:** [titulo del articulo relacionado]
   **Keyword objetivo:** [kw]
   **Angulo:** [como se diferencia del articulo actual]
   **Linking potencial:** [desde que seccion del articulo actual enlazaria]

2. [...]

3. [...]

---

## CHECKLIST DE CALIDAD

- [ ] Title tag <= 60 caracteres con keyword en pos 1-15
- [ ] Meta description 140-155 caracteres con CTA
- [ ] URL slug limpio sin stopwords
- [ ] Un solo H1 diferente al title tag
- [ ] Minimo 5 H2 con keywords secundarias
- [ ] Hook en las primeras 100 palabras con keyword
- [ ] Longitud supera en 20% al promedio top 10
- [ ] Densidad de keyword principal 1-2%
- [ ] Minimo 5 LSI keywords distribuidas
- [ ] 2-4 enlaces internos con anchor descriptivo
- [ ] 1-2 enlaces externos a fuentes DA 70+
- [ ] Schema markup JSON-LD validado
- [ ] Minimo 3 elementos de social proof con numeros
- [ ] 3 objeciones principales respondidas en el cuerpo
- [ ] Seccion FAQ con 5-10 preguntas (3+ del People Also Ask)
- [ ] CTA final especifico con verbo de accion
- [ ] Parrafos <= 3 lineas
- [ ] Frases <= 20 palabras
- [ ] Voz activa en 95%+ del texto
- [ ] Listas con bullets cuando hay 3+ items
- [ ] Cero frases prohibidas ("en el mundo de hoy", etc.)
- [ ] Pasa el test del escaneo de 30 segundos
```

### 6.2 Schema markup JSON-LD — plantillas

**Para articulo de blog (tipo BlogPosting):**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{title_tag}}",
  "description": "{{meta_description}}",
  "image": {
    "@type": "ImageObject",
    "url": "{{url_imagen_principal}}",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Person",
    "name": "{{autor_nombre}}",
    "url": "{{autor_url}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{cliente_nombre}}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{url_logo}}"
    }
  },
  "datePublished": "{{fecha_publicacion_ISO}}",
  "dateModified": "{{fecha_modificacion_ISO}}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{url_articulo}}"
  },
  "keywords": "{{keyword_principal}}, {{lsi_keywords_separadas_por_coma}}",
  "articleBody": "{{primeros_500_caracteres_del_articulo}}",
  "wordCount": {{total_palabras}}
}
```

**Para pagina de servicio (tipo Service + LocalBusiness):**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "{{nombre_servicio}}",
  "name": "{{nombre_servicio}} en {{ciudad}}",
  "description": "{{meta_description}}",
  "provider": {
    "@type": "LocalBusiness",
    "name": "{{cliente_nombre}}",
    "image": "{{url_imagen_negocio}}",
    "telephone": "{{telefono}}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "{{direccion}}",
      "addressLocality": "{{ciudad}}",
      "addressRegion": "{{estado}}",
      "postalCode": "{{cp}}",
      "addressCountry": "{{pais_ISO}}"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "{{lat}}",
      "longitude": "{{lng}}"
    },
    "url": "{{cliente_url}}",
    "priceRange": "{{rango_precios}}",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "{{rating}}",
      "reviewCount": "{{num_reviews}}"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "{{ciudad}}"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "{{sub_servicio_1}}"
        }
      }
    ]
  }
}
```

**Para seccion FAQ (tipo FAQPage) — siempre incluir:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{pregunta_1}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{respuesta_1_texto_completo}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{pregunta_2}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{respuesta_2}}"
      }
    }
  ]
}
```

**Validacion del schema:**

```
1. Copiar el JSON-LD
2. Pegar en: https://validator.schema.org/
3. Confirmar: 0 errores, 0 warnings
4. Confirmar: Google Rich Results Test pasa verde
5. Solo entregar cuando ambas validaciones pasen
```

### 6.3 Ideas de articulos relacionados

**Formato obligatorio para las 3 ideas:**

```markdown
### Idea 1
**Titulo:** [Titulo del articulo]
**Keyword principal:** [kw con volumen y dificultad]
**Tipo de contenido:** [blog / landing / pilar / comparativa]
**Angulo unico:** [que lo diferencia]
**Relacion con articulo actual:** [como se conecta tematicamente]
**Oportunidad de linking:** [desde que H2 del articulo actual se puede enlazar]
**Call to action principal:** [que accion busca]

### Idea 2
[misma estructura]

### Idea 3
[misma estructura]
```

**Criterios de seleccion de ideas:**

```
Las 3 ideas deben:
  1. Pertenecer al mismo silo tematico (mismo cluster de contenido)
  2. Complementar el articulo actual sin canibalizarlo
  3. Tener keyword principal diferente pero relacionada
  4. Moverse hacia el funnel de conversion (al menos 1 debe ser transaccional)
  5. Tener volumen de busqueda >= 50/mes
```

---

## REGLAS MAESTRAS DEL SKILL

1. **La investigacion (Fase 1) NO es opcional.** Escribir sin investigar es la causa #1 de articulos que no rankean.

2. **Escribir para el LECTOR primero, para Google segundo.** Si el texto suena forzado al leerlo en voz alta, reescribirlo.

3. **Cada articulo debe responder a UNA sola intencion de busqueda.** Mezclar intenciones = no rankear para ninguna.

4. **Los numeros concretos son obligatorios.** Un articulo sin numeros especificos es un articulo generico.

5. **La keyword principal aparece en las primeras 100 palabras. Sin excepcion.**

6. **El hook decide si el lector se queda o se va.** Invertir mas tiempo en las primeras 4 lineas que en cualquier otra parte del articulo.

7. **Los parrafos cortos ganan en web.** Maximo 3 lineas — nunca mas.

8. **Las listas con bullets superan a los parrafos** cuando hay 3+ elementos. Siempre.

9. **El schema markup es obligatorio, no opcional.** Cada articulo sale con schema JSON-LD validado.

10. **La seccion FAQ con schema FAQPage es obligatoria** en articulos de blog — ocupa mas espacio en SERP y aumenta CTR.

11. **Cada articulo debe tener un CTA especifico al final.** "Contactanos" no es un CTA — "Llama al 555-1234 para cotizacion gratis en 5 minutos" si lo es.

12. **Usar el vocabulario del lector, no el nuestro.** Si la audiencia dice "se me tapo el bano", eso escribimos — no "obstruccion en sistema sanitario".

13. **Superar al top 10 en longitud no basta.** Hay que superarlos en profundidad, originalidad y especificidad.

14. **NUNCA inventar datos o estadisticas.** Si no hay fuente, cambiar la frase.

15. **El test del escaneo de 30 segundos es el ultimo filtro.** Si el articulo no pasa este test, no se entrega.
