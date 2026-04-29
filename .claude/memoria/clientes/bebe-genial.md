---
cliente_kebab: "bebe-genial"
cliente_nombre: "Bebé Genial"
estado: "LIVE"
fecha_alta: "2026-04-22"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Memoria operacional del cliente Bebé Genial — MVP v2.1 FINAL LIVE en producción"
---

# 📁 Cliente: Bebé Genial

## Datos básicos

| Campo | Valor |
|---|---|
| **NIT** | 900.814.605-4 |
| **Ubicación** | Bogotá, Colombia |
| **Sitio web** | https://bebe-genial-mvp.vercel.app (MVP v2.1 LIVE) |
| **Industria/vertical** | EduTech Neurodesarrollo Multilingüe (infantil) |
| **Idioma target** | es-CO (español Colombia) — confirmar con CEO si requiere multi-variante |
| **Mercados target** | Colombia (Bogotá inicial, expansión nacional pendiente) |
| **Repo GitHub** | `AddendoGrowthPartner/bebe-genial-mvp` |
| **Hosting** | Vercel Pro ($20/mes, admin@addendo.io) |
| **Adapter Astro** | `@astrojs/vercel` |

## Estructura del sitio (8 páginas)

| Tipo | Páginas |
|---|---|
| **B2C** | 3 páginas |
| **B2B (Preescolares/Jardines)** | 1 página School (segmento institucional) |
| **Home** | 1 con cerebro Freepik (asset 400424996) como hero unificado |
| **Aval** | 1 página de credibilidad/aval |
| **Contacto** | 1 |
| **Aula (mascarilla)** | 1 (`/aula` — formulario backend legacy) |

## Stack tech

- Astro 6.1.5 + Tailwind v4.2.2 + TypeScript
- Adapter `@astrojs/vercel` (output static)
- Fonts: Fraunces (display) + Inter (body)
- Imágenes: Pexels API + Freepik manual (cerebro 400424996)

## Branding

| Campo | Valor |
|---|---|
| **Voice/tono** | EduTech Neurodesarrollo Multilingüe — autoridad cálida educativa |
| **Asset clave** | Cerebro Freepik 400424996 — unificador visual del sitio |
| **CTAs principales** | WhatsApp + Asesoría (NO formulario web tradicional como CTA principal) |

## Reglas y restricciones del cliente (⚠️ críticas)

🚫 **NO precios** — v1 NO debe mostrar precios públicos. Conversión va vía WA/asesoría donde se cotiza personalizado.
🚫 **NO testimonios v1** — v1 NO incluye testimonios todavía (probablemente por timing de recolección o consentimientos). Reemplazar con prueba social alternativa (números agregados, certificaciones, aval profesional).
✅ **Copy con principios Cialdini** — disciplina canónica de copy persuasivo: reciprocidad, compromiso, prueba social agregada (no individual), autoridad, simpatía, escasez razonable.
✅ **Cerebro animado pendiente v2.2** — agregar cerebro con sinapsis moviéndose en tiempo real (BL post-launch). Restricción: NO afectar Performance.

## Compliance / Legal

- Vertical infantil — COPPA (US, no aplicable directo Colombia) + LGPD-K equivalente Colombia (Habeas Data Niños)
- NO claims médicos directos (es educativo, no terapéutico)
- Avales profesionales: documentar quién avala (médicos, terapeutas, especialistas en neurodesarrollo)

## Performance Lighthouse mobile (validación real)

| Métrica | Valor real | Target | Estado |
|---|---|---|---|
| Accessibility | 100 | 100 | ✅ |
| Best Practices | 100 | 100 | ✅ |
| SEO | 100 | 100 | ✅ |
| Performance | 70 | >65 | ✅ |
| LCP | 1.56s | <1.8s | ✅ |
| CLS | <0.1 | <0.1 | ✅ |

**Status:** todas las métricas en target o por encima.

## Lecciones aprendidas

### 2026-04-22 — Bug cascade CSS Tailwind v4 con @layer

**Origen:** Construcción de Bebé Genial v2.1.
**Lección:** Reglas unlayered sobre h1-h5/.editorial-emphasis/.kicker ganaban sobre utilities Tailwind v4. Solución: envolver todos los estilos base globales en `@layer base { ... }` en `global.css`.
**Aplicación:** Documentado en `lecciones/tecnicas.md` como TC1. Aplicar DESDE EL DÍA 1 en próximos sitios cliente (CreditBridge, Ciudad Maderas, Neurokids, Créditos Experto, Real Estate, esotéricos pendientes).

### 2026-04-22 — Helper responsiveSrcset con existsSync

**Origen:** Construcción de Bebé Genial v2.1.
**Lección:** Sharp omite variantes responsive cuando imagen fuente es pequeña → recuadros vacíos en producción. Helper `responsiveSrcset()` con `existsSync` filtra variantes no generadas.
**Aplicación:** Documentado en `lecciones/tecnicas.md` como TC2.

### 2026-04-22 — CTAs WhatsApp + Asesoría > formulario web tradicional para EduTech infantil Colombia

**Origen:** Decisión arquitectónica del cliente, validada en MVP v2.1.
**Lección:** Para vertical infantil EduTech en Colombia, padres prefieren conversación directa por WhatsApp para evaluar servicio antes de inscribirse. Formulario web tradicional convierte menos. CTA principal: "Cotizar por WhatsApp" + "Agendar asesoría".
**Aplicación:** Patrón candidato para promover a `verticales/neurodesarrollo-infantil.md` cuando haya 2+ clientes confirmando.

## Backlog post-launch v2.2

- [ ] **BL-1:** Cerebro animado con sinapsis (opciones evaluadas: A) SVG+JS 2-3h, B) tsparticles 1-2h, C) Three.js 3D alto riesgo, D) Video MP4/WebM premium 3-4h)
- [ ] **BL-2:** Agregar testimonios cuando estén disponibles
- [ ] **BL-3:** Workflow N8N stock-photos-fetch con skill #50 para auto-descarga Pexels
- [ ] **BL-4:** Métricas detalladas conversion (cuando Capa 2 telemetría activa)

**Decisión recomendada para BL-1:** Opción D (video premium) — comprar Pexels/Videezy o generar IA Runway/Sora ($0-80, 3-4h). Razón: bajo riesgo Performance + alto impacto visual.

## Próximos pasos

- [ ] Cerrar BL-1 (cerebro animado) post-launch
- [ ] Activar tracking GA4 + eventos conversión WA + Asesoría
- [ ] Documentar restricciones específicas del cliente que falten
- [ ] Recolectar testimonios para v2.2

## Notas operativas

- Cliente paga el primer trimestre — relación productiva activa
- Vertical neurodesarrollo infantil es nuevo en el catálogo Addendo — Bebé Genial es caso de estudio para construir patrón de vertical
- Stack Tailwind v4 + Astro 6 + adapter Vercel funcionando en producción real
