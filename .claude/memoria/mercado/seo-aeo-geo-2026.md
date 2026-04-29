---
documento_kebab: "seo-aeo-geo-2026"
documento_nombre: "SEO + AEO + GEO 2026"
estado: "ACTIVO"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Tracking del estado de SEO tradicional + AEO (Answer Engine Optimization) + GEO (Generative Engine Optimization) en 2026 — cómo cambia el contenido optimizado para motores de búsqueda tradicionales vs motores IA"
---

# 🌐 SEO + AEO + GEO 2026

## Estado actual (29 abril 2026)

El paradigma SEO está en transición. **3 motores distintos** consumen el mismo contenido con criterios diferentes:

| Motor | Tipo | Cómo consume contenido |
|---|---|---|
| **Google clásico** | Search engine tradicional | SERP rankings, snippets, featured snippets, PAA |
| **Google AI Overviews** | Generative AI summaries | Sintetiza respuestas usando contenido indexado, citation con link |
| **ChatGPT / Perplexity / Claude / Gemini** | LLM-based answer engines | Recuperación + síntesis, citation engineering importa |

**Implicancia:** un sitio optimizado solo para SEO clásico pierde tráfico cuando los usuarios resuelven sus dudas en AI Overviews/ChatGPT sin clickear.

## Conceptos clave

### SEO tradicional (sigue vigente)
- On-page: title, meta description, H1-H6, slug, schema, hreflang
- Off-page: backlinks, autoridad de dominio
- Technical: Core Web Vitals (LCP, CLS, INP), mobile-first, HTTPS

### AEO (Answer Engine Optimization)
- Estructurar contenido para responder preguntas directas
- FAQPage Schema crítico
- Respuestas claras en primeras 100 palabras
- Datos verificables con atribución clara

### GEO (Generative Engine Optimization)
- Citation engineering: hacer que LLMs te citen como fuente
- Estructura de respuesta con datos discretos (cifras, nombres, fechas)
- llms.txt en root del sitio (análogo a robots.txt para LLMs)
- Atribución de fuentes propias clara y consistente
- Marca + dominio mencionados en contexto cercano a datos clave

## Cambios recientes

### 2026-04-29 — AEO/GEO incorporado al ADN del skill #27 SEO

**Origen:** Ciclo de nivelación skill #27, commit `4ae818a`.
**Cambio:** Skill #27 ahora incluye sección dedicada de AEO/GEO con citation engineering en ChatGPT/Perplexity/Claude/Gemini/AI Overviews. llms.txt declarado canónico.
**Impacto en Addendo:** Todos los sitios cliente deben tener llms.txt + estructura citation-extractable.
**Acción requerida:** Aplicar a nuevos sitios desde día 1; auditar sitios LIVE actuales (Don Jacinto, Bebé Genial) y agregar.
**Estado:** Aplicado en skill, pendiente rollout a sitios LIVE.

### 2026-04-29 — AEO/GEO incorporado a skill #16 copywriting-seo

**Origen:** Ciclo de nivelación skill #16, commit `8ae0eff`.
**Cambio:** Skill #16 sección G.7 dedicada a "AEO/GEO copy citation-friendly para motores IA". Estructura de respuesta + datos verificables + atribución clara.
**Impacto en Addendo:** Copy producido por #16 ahora es citation-friendly por default.
**Acción requerida:** Refresh de copy de sitios LIVE para alinear con citation engineering.
**Estado:** Aplicado en skill, pendiente refresh de copy LIVE.

## Skills afectados

- **#27 seo** — sección dedicada AEO/GEO (M.AEO-CORE) ✅ aplicado v1.1.1
- **#16 copywriting-seo** — sección G.7 AEO/GEO ✅ aplicado v1.1.1
- **#21 frontend-dev** — debe implementar llms.txt + Schema correcto en build
- **#18 diseño-web** — estructura visual debe respetar jerarquía citation-extractable
- **#42 agente-analytics** — tracking de tráfico desde AI Overviews + citaciones LLM (cuando datos disponibles)

## Patrones recurrentes

- **Cada 6-9 meses Google introduce un cambio mayor de algoritmo.** Históricamente: Panda, Penguin, Hummingbird, RankBrain, BERT, MUM, AI Overviews. Asume otro cambio mayor en H2 2026.
- **AEO/GEO va a pesar más que SEO clásico para keywords informacionales.** Para keywords transaccionales (intent comercial directo), SEO clásico mantiene relevancia.

## Fuentes confiables

- Google Search Central blog (oficial)
- Search Engine Journal / Search Engine Land
- Anthropic, OpenAI, Perplexity blogs (sobre cómo sus motores consumen contenido)

## Notas operativas

- llms.txt debe vivir en root de cada sitio cliente
- Citation engineering en copy: estructura "{dato concreto} según {fuente original o cálculo verificable}"
- Marca del cliente debe aparecer en contexto cercano a datos para que LLMs la citen
