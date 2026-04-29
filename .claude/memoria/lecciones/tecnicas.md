---
documento: "Lecciones Técnicas — Addendo Agency OS"
version: "v1.0"
creado: "2026-04-29"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Lecciones específicas del stack tecnológico — bugs encontrados, fixes verificados, gotchas a evitar, patrones canónicos de implementación"
---

# 🔧 Lecciones Técnicas

Stack tecnológico: Astro 6.1.5 + Tailwind v4.2.2 + TypeScript + Vercel Pro. Estas son lecciones del trabajo real con clientes (Bebé Genial, Don Jacinto Nahual, etc.), no documentación teórica.

---

## TC1 — Tailwind v4: regla `@layer base` obligatoria para estilos globales

**Origen:** Cliente Bebé Genial v2.1, abril 2026.
**Confianza:** ALTA — bug cascade real reproducido y resuelto.
**Aplicabilidad:** TODOS los sitios cliente con stack Astro 6 + Tailwind v4.

**Lección:**
En Tailwind v4, las reglas CSS unlayered (sin `@layer`) sobre selectores como `h1-h5`, `.editorial-emphasis`, `.kicker` **ganan especificidad** sobre las utility classes de Tailwind. Esto produce cascade caótico donde modificadores Tailwind son ignorados por reglas globales del `global.css`.

**Fix canónico:**

Envolver TODOS los estilos base globales en `@layer base { ... }` en `global.css`:

```css
/* ❌ MAL — gana sobre Tailwind utilities */
h1 {
  font-family: 'Fraunces', serif;
  font-size: 2.5rem;
}

/* ✅ BIEN — respeta cascade Tailwind */
@layer base {
  h1 {
    font-family: 'Fraunces', serif;
    font-size: 2.5rem;
  }
}
```

**Aplicación operativa:**

1. Aplicar DESDE EL DÍA 1 en sitios nuevos: CreditBridge, Ciudad Maderas, Neurokids, Créditos Experto, Real Estate, los 2 esotéricos pendientes.
2. Auditar sitios existentes (Don Jacinto, Addendo, Bebé Políglota) — si tienen estilos h1-h5 unlayered, migrar a `@layer base`.
3. Documentar en skill #21 frontend-dev como mandamiento canónico (ya está).

---

## TC2 — Helper `responsiveSrcset()` con `existsSync` para evitar recuadros vacíos

**Origen:** Cliente Bebé Genial v2.1, abril 2026.
**Confianza:** ALTA — fix verificado.
**Aplicabilidad:** Sitios con imágenes responsive servidas por Sharp en build time.

**Lección:**
Cuando Astro genera variantes responsive de imágenes con Sharp y la imagen fuente es pequeña, Sharp omite ciertas variantes (ej: variante 2x cuando original es de 800px). Si el `<img srcset>` referencia variantes que no existen, el navegador renderiza recuadro vacío.

**Fix:** helper `responsiveSrcset()` con `existsSync` que verifica existencia de cada variante antes de incluirla:

```typescript
import { existsSync } from 'fs';
import { resolve } from 'path';

function responsiveSrcset(basePath: string, variants: string[]): string {
  return variants
    .filter(variant => {
      const fullPath = resolve(`./public${basePath}-${variant}.webp`);
      return existsSync(fullPath);
    })
    .map(variant => `${basePath}-${variant}.webp ${variant}`)
    .join(', ');
}
```

**Aplicación operativa:**

1. Implementar en sitios con imágenes responsive multi-variante.
2. Documentar en skill #21 frontend-dev.
3. Validación QA: revisar que ninguna imagen renderice recuadro vacío en build production.

---

## TC3 — Stack hosting canónico: Vercel Pro $20/mes activo desde 28 marzo 2026

**Origen:** Decisión arquitectónica CEO, 28 marzo 2026.
**Confianza:** ALTA.
**Aplicabilidad:** TODOS los sitios cliente del Addendo Agency OS.

**Configuración canónica:**

- **Vercel Pro** ($20/mes, admin@addendo.io) — hosting de TODOS los sitios
- **Cloudflare** — solo DNS/CDN, NO hosting
- **Adapter Astro:** `@astrojs/vercel` (no `@astrojs/cloudflare`)
- **Patrón deploy:**
  ```bash
  npx vercel build --prod --yes
  npx vercel deploy --prebuilt --prod --yes
  ```

**Sitios LIVE bajo este stack al 29 abril 2026:**
- addendo.io
- donjacintonahual.com
- bebe-poliglota.vercel.app
- bebe-genial-mvp.vercel.app
- creditbridge-one.vercel.app

**Aplicación operativa:**

1. Sitios nuevos: configurar `@astrojs/vercel` desde día 1 (NO `@astrojs/cloudflare`)
2. Cloudflare: solo gestión DNS y CDN, no hosting
3. Cualquier desviación del stack debe escalarse a CEO

---

## TC4 — Catálogo de validaciones Lighthouse mobile target

**Origen:** Cliente Bebé Genial v2.1, métricas reales medidas.
**Confianza:** ALTA — métricas reales en producción.
**Aplicabilidad:** TODOS los sitios cliente.

**Targets canónicos Lighthouse mobile:**

| Métrica | Target |
|---|---|
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Performance | >65 (target stretch >85) |
| LCP | <1.8s |
| CLS | <0.1 |

**Resultado real Bebé Genial v2.1 (validación pública):**
- A11y/BP/SEO: 100 ✅
- Perf: 70 ✅
- LCP: 1.56s ✅
- CLS: <0.1 ✅

**Aplicación operativa:**

1. Pre-deploy: ejecutar Lighthouse mobile en /index y al menos 3 páginas adicionales del sitio.
2. Si Performance <65, NO deploy a producción — escalar fix al skill #21.
3. Documentar resultado real en archivo del cliente (`clientes/{slug}.md`).

---

## 📋 Pendientes por documentar

- **TC.X (pendiente):** Configuración canónica de fonts (Fraunces display + Inter body) — woff2 self-hosted vs Google Fonts
- **TC.X (pendiente):** Patrón Schema.org JSON-LD por tipo de pieza (LocalBusiness, Article, BreadcrumbList, FAQPage)
- **TC.X (pendiente):** Configuración canónica de hreflang para multi-idioma
- **TC.X (pendiente):** Patrón de fetch de imágenes Pexels API + Freepik manual
