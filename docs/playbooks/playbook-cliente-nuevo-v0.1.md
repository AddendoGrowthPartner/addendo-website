# PLAYBOOK: Cliente Nuevo → Web Nueva
## Addendo Agency OS — Fase de Onboarding y Construcción de Sitio

**Versión:** v0.1 (en construcción durante proyecto Bebé Genial)
**Creado:** 21 abril 2026
**Objetivo final:** convertir este documento en workflow N8N + orquestación de agentes por #50 constructor-workflows, para que el siguiente cliente nuevo se procese sin intervención manual del CEO.
**Primer caso de uso documentado:** Bebé Genial (Editorial Bebé Genial S.A.S — Bogotá)

---

## SECCIÓN 1 — DISPARADOR DEL WORKFLOW

### Estado actual (manual)
El CEO inicia la sesión de trabajo escribiendo "necesito hacer web para cliente X" en chat de Claude.

### Estado deseado (automatizado)
Formulario web público en `addendo.io/solicitar-web` que captura:
- Nombre empresa cliente
- Contacto y email
- URL web actual (si existe)
- Descripción del negocio (texto libre, 1 párrafo)
- Tipo de sitio esperado (ecommerce / contenido / landing / híbrido)
- Ticket promedio de producto/servicio (USD)
- Mercado objetivo (país/ciudad)
- Objetivos principales (ventas / leads / marca / SEO)
- Presupuesto aproximado (rangos)
- Urgencia (inmediato / 2 semanas / mes / flexible)

**Disparador técnico:** webhook N8N conectado al formulario. Al recibir submission → dispara workflow `cliente-nuevo-onboarding`.

---

## SECCIÓN 2 — PREGUNTAS INICIALES DE DISCOVERY

Estas preguntas surgieron en la conversación de Bebé Genial y **todas deberían estar en el formulario inicial** para que el sistema no tenga que volver a preguntarlas:

| # | Pregunta | Responsable actual (manual) | Automatizable con |
|---|----------|----------------------------|-------------------|
| 1 | ¿Quién es el comprador real? (adulto vs usuario final) | CEO + intuición | Campo formulario + inferencia IA sobre producto |
| 2 | ¿Mercado principal? | CEO | Campo formulario directo |
| 3 | ¿Tiene Google Ads / Meta Ads activos? | CEO | Pregunta formulario |
| 4 | ¿Qué es "alto perfil" para este cliente? | CEO (ambiguo) | Opciones predefinidas: contenido / visual / performance / las 3 |
| 5 | ¿Arquitectura de marcas? (1 dominio / subdominio / etc) | Delegar a agente SEO | Derivada automática post-research |
| 6 | ¿Tiene CRM funcionando? ¿Cuál? | CEO | Campo formulario con dropdown |
| 7 | ¿Quién opera contenido post-launch? | CEO (decisión operativa) | Dropdown: Addendo / híbrido / cliente |
| 8 | Stack preferido | CEO (delegar a agente) | Derivada automática post-arquitectura |
| 9 | ¿Es e-commerce o sitio de contenido? | CEO | Campo formulario directo |
| 10 | ¿Reemplazo total o coexistencia con web actual? | CEO | Campo formulario directo |
| 11 | ¿Tienen brand guidelines / logo? | CEO | Upload en formulario |

**Insight crítico de Bebé Genial:** las preguntas #9, #10 y #2 aparecieron TARDE en la conversación (turno 11+) y causaron refactor de plan. Deben estar al inicio del formulario.

---

## SECCIÓN 3 — FASES DEL WORKFLOW

### Fase 1 — Investigación 7 Maletas
**Agente responsable:** `investigacion` (número por confirmar — probablemente tiene agente dedicado en los 53) o delegación a Claude Code con skill `7-maletas`
**Inputs necesarios:** URL web actual del cliente + descripción del negocio + país
**Outputs esperados:**
- Documento 7 Maletas en HTML (formato estándar Felipe Vergara)
- Dolores principales (top 3)
- Diferenciales competitivos únicos
- Objeciones principales
- Precio relativo vs competencia
- Audit de testimonios existentes (gap si hay 0)

**Gap detectado en Bebé Genial:** el skill `7-maletas` requiere Claude Chrome para resultado completo. Sin Chrome, se obtiene ~60% del análisis. **Acción para automatización:** decisión arquitectónica — ¿el workflow corre siempre en AWS/Claude Code con Chrome instalado, o acepta modo degradado?

**Checkpoint CEO:** aprobar los 3 dolores principales antes de pasar a Fase 2.

---

### Fase 2 — Arquitectura Técnica
**Agente responsable:** `desarrollo-web` (Director Técnico)
**Inputs necesarios:** respuestas del formulario + output de Fase 1
**Preguntas que el agente hace (automatizables vía formulario inicial):**
- ¿Plataforma existente se mantiene o se reemplaza? (pregunta #10)
- ¿Tipo de sitio? (pregunta #9)
- ¿Quién opera post-launch? (pregunta #7)
- ¿CRM integration? (pregunta #6)

**Outputs esperados:**
- Recomendación de stack con argumentos
- Diagrama de arquitectura (markdown o mermaid)
- Lista de otros agentes a activar
- Identificación de restricciones técnicas (ej: /aula de Bebé Genial)

**Aprendizajes de Bebé Genial:**
- Detectó independientemente el problema `/aula` (plataforma PHP independiente con suscriptores). **El workflow debe incluir step de "escanear URL actual para detectar subcarpetas activas con lógica propia"**.
- Preguntas sobre volumen operativo, DIAN, financiamiento son válidas pero solo si el sitio es e-commerce. **El workflow debe ramificar: si e-commerce → esas preguntas; si contenido → saltarlas**.

---

### Fase 3 — SEO + Arquitectura de Información
**Agente responsable:** `seo`
**Inputs necesarios:** output Fase 1 + Fase 2 + país + decisión de arquitectura de marcas
**Outputs esperados:**
- Keyword research por intención (commercial, informational, transactional)
- Sitemap final con URLs slugs
- Jerarquía de páginas (home, landings, blog categorías, legal)
- Meta titles y descriptions por página
- Schema markup plan
- Estrategia de clusters de contenido (pilar + cluster)

**Aprendizajes de Bebé Genial (pendiente ejecutar):** documentar cuando llegue Fase 3.

---

### Fase 4 — Copywriting por Página
**Agente responsable:** `copywriting-seo` (o similar — número por confirmar)
**Inputs necesarios:** output Fase 1 + Fase 3 + tono del cliente (de brand guidelines si existen)
**Outputs esperados:** documento con copy por página: hero, secciones, CTAs, objeciones, FAQ

---

### Fase 5 — Diseño Visual
**Agente responsable:** `frontend-design`
**Inputs necesarios:** referencias visuales del cliente (2-3 sitios) + logo + imágenes de producto + copy de Fase 4
**Outputs esperados:** design system (colores, tipografía, componentes, spacing) + mockups de páginas clave

**Aprendizaje Bebé Genial:** si el cliente no tiene referencias visuales, el workflow debe tener **un set de referencias propuestas por industria** (Lovevery/Lingokids/Tonies para EduTech infantil, por ejemplo) y el CEO o cliente elige 2-3. **Esto es automatizable vía base de conocimiento de referencias por industria**.

---

### Fase 6 — Build Frontend
**Agente responsable:** `frontend-dev`
**Inputs necesarios:** todo lo anterior
**Stack estándar Addendo:** Astro + Tailwind + TypeScript en Cloudflare Pages
**Outputs esperados:** repositorio GitHub funcional + preview URL

---

### Fase 7 — Integraciones
**Agente responsable:** `n8n-automatizacion` + `ghl-crm` (si aplica)
**Outputs esperados:**
- Formularios del sitio → CRM del cliente (GHL u otro)
- Tracking GA4 + Meta Pixel
- Schema BlogPosting si hay blog
- Canonical + robots.txt + sitemap.xml

---

### Fase 8 — Deployment
**Agente responsable:** `servidor-cloud`
**Outputs esperados:** sitio live en dominio del cliente + DNS configurado + SSL + verificaciones Search Console

---

## SECCIÓN 4 — CHECKPOINTS CEO

En un workflow automatizado, estos son los puntos donde el sistema PAUSA y espera aprobación humana explícita antes de continuar:

1. **Post Fase 1:** CEO aprueba hallazgos de 7 Maletas
2. **Post Fase 2:** CEO aprueba recomendación de arquitectura del `desarrollo-web`
3. **Post Fase 3:** CEO aprueba sitemap y jerarquía
4. **Post Fase 4:** CEO aprueba copy general
5. **Post Fase 5:** CEO aprueba design system
6. **Pre Fase 8:** CEO aprueba deploy a producción

Entre checkpoints, el sistema opera autónomo.

---

## SECCIÓN 5 — ANTI-PATTERNS DETECTADOS EN BEBÉ GENIAL

Estas son decisiones o flujos que **se equivocaron en la ejecución manual** y que el workflow debe evitar:

### Anti-pattern #1: Asumir e-commerce sin confirmar
**Qué pasó:** Durante varios turnos asumimos que Bebé Genial sería e-commerce con carrito, cuando en realidad el CEO quería sitio de contenido + WhatsApp. Causó que el agente `desarrollo-web` hiciera preguntas irrelevantes (DIAN, Shopify, Estudio de Crédito online).
**Lección:** el formulario inicial debe tener pregunta explícita "¿Es e-commerce o sitio de contenido?" con ramificación clara.

### Anti-pattern #2: Abrir frentes nuevos antes de cerrar los actuales
**Qué pasó:** A mitad de discovery, se abrieron 3 temas nuevos (logo, carpeta de imágenes, herramientas de diseño) mientras 2 preguntas anteriores seguían pendientes. Pérdida de foco.
**Lección:** el workflow debe ser secuencial con bloqueo fuerte entre fases. No se avanza si falta input.

### Anti-pattern #3: CEO haciendo trabajo de investigación manual
**Qué pasó:** se pidió al CEO copiar y pegar contenido de extensiones, cargar agentes manualmente, subir archivos `.md`. Eso es bypass funcional del Agency OS.
**Lección:** el workflow debe ejecutar agentes directamente desde el repo GitHub/AWS sin intervención manual. Si un agente necesita herramienta que no tiene (ej: Claude Chrome), el workflow debe tener fallback automático — no preguntar al CEO.

### Anti-pattern #4: Proponer logo/imágenes sin mandato del cliente
**Qué pasó:** se planteó rediseñar logo cuando el cliente NO lo había pedido.
**Lección:** el workflow debe respetar estrictamente el alcance del brief inicial. Si el cliente no mandó brand guidelines ni pidió logo nuevo, mantener el logo existente.

### Anti-pattern #5: Preguntas que podían resolverse con web_fetch
**Qué pasó:** pregunté al CEO sobre `/aula` cuando pude haber hecho web_fetch directo y extraer la info técnica yo solo.
**Lección:** el workflow debe intentar respuestas automáticas (web_fetch, análisis público) antes de pedirle al CEO que intermedie con el cliente.

---

## SECCIÓN 6 — AUTOMATIZACIONES RECUPERABLES POST-BEBÉ GENIAL

Cuando terminemos Bebé Genial, estos componentes quedarán como reutilizables:

- [ ] Template 7 Maletas HTML (ya existe) → convertir en plantilla parametrizable
- [ ] Sitemap/jerarquía por tipo de cliente (EduTech, Fintech, Real Estate, etc.) → biblioteca
- [ ] Set de referencias visuales por industria → base de conocimiento
- [ ] Prompts tipo para cada agente en cada fase → library de prompts versionada
- [ ] Checkpoints con aprobación vía email/WhatsApp → integración GHL
- [ ] Template repo Astro con Layout + BlogPostLayout + schema + GA4 (patrón Don Jacinto) → ya existe, solo formalizar

---

## SECCIÓN 7 — BITÁCORA DE DECISIONES

Cada decisión importante tomada durante el proyecto Bebé Genial se registra aquí para que #50 tenga el historial completo.

### Decisión 1 — 21 abril 2026
**Pregunta:** ¿Camino A, B o C para investigación 7 Maletas?
**Decisión CEO:** Camino C (híbrido: Camino B aquí + Camino A en Mac)
**Rationale:** aprovechar tiempo paralelo + máxima fidelidad
**Gap:** Claude Chrome no instalado → Camino A no pudo ejecutar

### Decisión 2 — 21 abril 2026
**Pregunta:** Mercado objetivo
**Decisión CEO:** Colombia solo, corto plazo

### Decisión 3 — 21 abril 2026
**Pregunta:** Arquitectura de marcas (1 dominio vs subdominio)
**Decisión CEO:** delegar al agente `seo` con keyword research

### Decisión 4 — 21 abril 2026
**Pregunta:** ¿E-commerce o sitio contenido?
**Decisión CEO:** Sitio de contenido + landings producto + WhatsApp. NO e-commerce.

### Decisión 5 — 21 abril 2026
**Pregunta:** ¿Reemplazo o coexistencia con WordPress?
**Decisión CEO:** Reemplazo total en bebegenial.com, excepto `/aula` que se mantiene intacto.

### Decisión 6 — 21 abril 2026
**Pregunta:** ¿Dónde vive el sitio nuevo?
**Decisión CEO:** Mismo dominio bebegenial.com (implica reemplazo total con excepción `/aula`).

### Decisión 7 — 21 abril 2026
**Pregunta:** ¿CRM?
**Decisión CEO:** GHL ya configurado por Addendo, se usa.

### Decisión 8 — 21 abril 2026
**Pregunta:** ¿Quién opera contenido post-launch?
**Decisión CEO:** Addendo 100% (Git + agentes IA), sin CMS visual.

### Decisión 9 — 21 abril 2026
**Pregunta:** ¿Logo nuevo?
**Decisión CEO:** Postponed. Usar logo actual de Bebé Genial.

### Decisión 10 — 21 abril 2026
**Pregunta:** ¿Qué significa "alto perfil"?
**Decisión CEO:** Las 3 juntas (contenido + visual + performance), no negociable.

### Decisión 11 — 21 abril 2026
**Pregunta:** ¿Automatizar ahora o después?
**Decisión CEO:** Camino 3 — avanzar Bebé Genial manual + documentar para workflow futuro (este documento).

---

## SECCIÓN 8 — PRÓXIMAS ACTUALIZACIONES DE ESTE PLAYBOOK

A medida que avanza Bebé Genial, se actualiza:
- Fase 3 (SEO): cuando se ejecute
- Fase 4 (Copywriting): cuando se ejecute
- Fase 5 (Diseño): cuando se ejecute
- Fase 6 (Build): cuando se ejecute
- Fase 7 (Integraciones): cuando se ejecute
- Fase 8 (Deploy): cuando se ejecute
- Bitácora de decisiones: cada turno con decisión nueva
- Anti-patterns: cada vez que detectemos algo que no debería repetirse
- Automatizaciones recuperables: cada vez que un componente se demuestre reutilizable

---

**FIN DEL DOCUMENTO v0.1**
**Responsable de mantener vivo este documento:** Claude en claude.ai durante el proyecto Bebé Genial
**Destinatario final:** agente #50 constructor-workflows, cuando se active para convertir esto en N8N
