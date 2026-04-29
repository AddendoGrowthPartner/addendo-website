---
documento_kebab: "tailwind-v4-stack"
documento_nombre: "Tailwind v4 + Stack Frontend Canónico"
estado: "ACTIVO"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Tracking del stack frontend canónico Addendo y cambios relevantes en sus dependencias"
---

# 🌐 Tailwind v4 + Stack Frontend Canónico

## Stack canónico al 29 abril 2026

| Componente | Versión | Notas |
|---|---|---|
| **Astro** | 6.1.5 | Framework principal |
| **Tailwind CSS** | 4.2.2 | CSS framework |
| **TypeScript** | latest stable | Strict mode |
| **Adapter Astro** | `@astrojs/vercel` | NO `@astrojs/cloudflare` |
| **Hosting** | Vercel Pro $20/mes | admin@addendo.io |
| **DNS/CDN** | Cloudflare | Solo DNS, NO hosting |
| **Fonts** | Fraunces (display) + Inter (body) | self-hosted preferido |

## Cambios recientes

### 2026-04-22 — Tailwind v4 cascade fix (`@layer base` obligatorio)

**Origen:** Bug detectado durante construcción de Bebé Genial v2.1.
**Cambio:** Reglas unlayered sobre h1-h5/.editorial-emphasis/.kicker ganan especificidad sobre Tailwind v4 utilities → cascade caótico.
**Impacto en Addendo:** Todos los sitios cliente con stack Astro 6 + Tailwind v4.
**Acción requerida:** Envolver TODOS los estilos base globales en `@layer base { ... }` en `global.css`. Aplicar desde día 1 en sitios nuevos. Auditar sitios LIVE actuales.
**Estado:** Documentado en `lecciones/tecnicas.md` como TC1. Aplicado en Bebé Genial. Pendiente auditar otros sitios LIVE.

### 2026-04-22 — Helper `responsiveSrcset` con `existsSync`

**Origen:** Bug detectado en Bebé Genial.
**Cambio:** Sharp omite variantes responsive cuando imagen fuente es pequeña → recuadros vacíos.
**Acción requerida:** Implementar helper `responsiveSrcset()` con `existsSync` en sitios con imágenes responsive multi-variante.
**Estado:** Documentado en `lecciones/tecnicas.md` como TC2. Aplicado en Bebé Genial.

### 2026-03-28 — Migración a Vercel Pro

**Origen:** Decisión arquitectónica del CEO.
**Cambio:** Stack hosting cambia de DigitalOcean / Cloudflare hosting → Vercel Pro $20/mes.
**Impacto:** Adapter Astro cambia a `@astrojs/vercel`. Patrón deploy: `npx vercel build --prod --yes && npx vercel deploy --prebuilt --prod --yes`.
**Estado:** Aplicado en addendo.io, donjacintonahual.com, bebe-poliglota.vercel.app, bebe-genial-mvp.vercel.app, creditbridge-one.vercel.app.

## Skills afectados

- **#21 frontend-dev** — implementación de componentes con stack canónico
- **#18 diseño-web** — design tokens + handoff a #21
- **#45 agente-deployment** — deploy patterns Vercel
- **#25 servidor-cloud** — DNS Cloudflare

## Patrones recurrentes

- Tailwind major versions cambian cascade rules cada upgrade — auditar cada vez que se haga upgrade de major.
- Astro releases mensuales con breaking changes ocasionales — leer release notes antes de upgrade.

## Fuentes confiables

- https://tailwindcss.com/blog (Tailwind oficial)
- https://astro.build/blog (Astro oficial)
- https://vercel.com/changelog (Vercel oficial)

## Notas operativas

- NO mezclar `@astrojs/vercel` con `@astrojs/cloudflare` — incompatibles
- Cloudflare en DNS-only mode para sitios Vercel (proxied:false en CF dashboard)
- Vercel build time típicamente <2 min para sitios cliente Addendo (Astro static)
