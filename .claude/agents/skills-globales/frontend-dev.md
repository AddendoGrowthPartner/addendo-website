# SKILL: Frontend Dev — Astro.js World-Class

**Nivel:** El mejor desarrollador frontend del mundo — cada linea es limpia, semantica y optimizada
**Agente principal:** #21 frontend-dev
**Trabaja con:** #18 diseno-web (recibe Figma), #22 backend-dev, #45 agente-deployment, #39 revisor-qa
**Objetivo:** Sitios que cargan en < 1 segundo, PageSpeed 99+, convierten visitantes en clientes
**Stack obligatorio:** Astro.js 6 + Tailwind v4 + TypeScript + GSAP + Cloudflare Stream + Vercel

---

## PRINCIPIO MAESTRO

**Cada linea de codigo tiene un proposito. Si no mejora performance, SEO o conversion, no se escribe.**

El frontend-dev no construye sitios "bonitos" — construye maquinas de conversion de alta velocidad. Un sitio con PageSpeed 85 y diseno espectacular es un sitio ROTO. Un sitio con PageSpeed 99 y diseno simple es un sitio PROFESIONAL.

---

## FASE 1 — STACK TECNOLOGICO

### 1.1 Stack obligatorio (sin excepciones)

```
Framework:        Astro.js 6 (SSG con islas de interactividad)
Estilos:          Tailwind CSS v4
Tipado:           TypeScript (strict mode) cuando sea necesario
Animaciones:      GSAP + ScrollTrigger + SplitText
Imagenes:         Astro Image component + WebP/AVIF
Fuentes:          Auto-hosteadas locales (.woff2)
Videos:           Cloudflare Stream
Deploy:           Vercel Pro via GitHub
Runtime:          Node.js 22.x
Package manager:  npm
```

### 1.2 Stack PROHIBIDO

```
NUNCA USAR:
  - WordPress (lento, inseguro, mantenimiento alto)
  - Next.js (overkill para sitios estaticos, SSR innecesario)
  - React standalone (solo usar dentro de Astro como isla)
  - Gatsby (obsoleto)
  - HTML plano (sin build, sin optimizacion)
  - jQuery (2008 llamo)
  - Bootstrap (Tailwind es superior)
  - Google Fonts CDN (bloquea render — auto-hostear siempre)
  - YouTube embed directo (agrega 500KB de JS innecesario)
  - Vimeo embed directo (peor que YouTube)
  - CSS frameworks bloated: Material UI, Ant Design, Chakra
  - Imagenes JPG/PNG en produccion
  - Fuentes con > 3 variantes (cada variante = 30-50KB extra)
```

### 1.3 package.json base

```json
{
  "name": "{{cliente-slug}}-website",
  "type": "module",
  "version": "1.0.0",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write ."
  },
  "dependencies": {
    "astro": "^6.1.2",
    "@astrojs/sitemap": "^3.2.0",
    "@astrojs/partytown": "^2.1.0",
    "@astrojs/react": "^5.0.2",
    "@tailwindcss/vite": "^4.2.2",
    "tailwindcss": "^4.2.2",
    "typescript": "^5.6.0",
    "gsap": "^3.14.2",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "eslint": "^9.0.0",
    "eslint-plugin-astro": "^1.3.0",
    "prettier": "^3.3.0",
    "prettier-plugin-astro": "^0.14.0"
  }
}
```

### 1.4 astro.config.mjs base

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://{{dominio_cliente}}',
  output: 'static',
  trailingSlash: 'never',
  
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/admin/'),
      serialize(item) {
        if (item.url === `https://{{dominio_cliente}}/`) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        return item;
      }
    }),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'fbq']
      }
    }),
    react()
  ],
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap']
          }
        }
      }
    }
  },
  
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['res.cloudinary.com']
  },
  
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  
  compressHTML: true,
  
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  }
});
```

---

## FASE 2 — ARQUITECTURA DE ARCHIVOS

### 2.1 Estructura obligatoria

```
{{cliente-slug}}-website/
├── public/
│   ├── fonts/
│   │   ├── font-regular.woff2
│   │   ├── font-bold.woff2
│   │   └── font-display.woff2
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── testimonials/
│   │   └── og/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── CTASection.astro
│   │   │   └── ContactForm.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── WhatsAppFloat.astro
│   │   │   └── PhoneButton.astro
│   │   └── seo/
│   │       ├── BaseHead.astro
│   │       ├── SchemaLocalBusiness.astro
│   │       ├── SchemaFAQ.astro
│   │       └── SchemaArticle.astro
│   ├── layouts/
│   │   ├── Layout.astro          (base de todas las paginas)
│   │   ├── BlogLayout.astro      (para articulos)
│   │   └── ServiceLayout.astro   (para paginas de servicio)
│   ├── pages/
│   │   ├── index.astro           (homepage)
│   │   ├── contacto.astro
│   │   ├── about.astro
│   │   ├── gracias.astro         (thank you page)
│   │   ├── blog/
│   │   │   ├── index.astro       (indice de blog)
│   │   │   └── [slug].astro      (articulo individual)
│   │   ├── ciudad/
│   │   │   └── [slug].astro      (paginas por ciudad dinamicas)
│   │   └── servicio/
│   │       └── [slug].astro      (paginas por servicio)
│   ├── content/
│   │   ├── config.ts             (Content Collections config)
│   │   ├── blog/
│   │   │   └── *.md
│   │   ├── services/
│   │   │   └── *.md
│   │   └── cities/
│   │       └── *.md
│   ├── styles/
│   │   ├── global.css
│   │   └── tailwind.css
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── analytics.ts
│   │   └── utils.ts
│   └── env.d.ts
├── .env.example                   (sin valores reales)
├── .gitignore
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

### 2.2 Convenciones de nombres

```
COMPONENTES:    PascalCase.astro        (Hero.astro, ContactForm.astro)
PAGES:          kebab-case.astro        (contacto.astro, sobre-nosotros.astro)
CONTENT:        kebab-case.md           (plomero-emergencia-houston.md)
UTILS:          camelCase.ts            (formatPhone.ts, analytics.ts)
CONSTANTES:     SCREAMING_SNAKE_CASE    (SITE_URL, GHL_WEBHOOK)
CSS CLASSES:    kebab-case              (hero-section, cta-button)
IDs:            kebab-case              (#contact-form, #hero)
```

### 2.3 Content Collections (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(60),
    description: z.string().min(120).max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }),
    keyword: z.string(),
    lsiKeywords: z.array(z.string()).min(5),
    category: z.enum(['servicios', 'consejos', 'noticias', 'casos']),
    featured: z.boolean().default(false)
  })
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    price: z.string().optional(),
    duration: z.string().optional(),
    includes: z.array(z.string())
  })
});

const cities = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    state: z.string(),
    zipCodes: z.array(z.string()),
    neighborhoods: z.array(z.string()),
    keyword: z.string(),
    description: z.string().min(300)
  })
});

export const collections = { blog, services, cities };
```

---

## FASE 3 — LAYOUT BASE

### 3.1 src/layouts/Layout.astro (obligatorio)

```astro
---
import BaseHead from '../components/seo/BaseHead.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import WhatsAppFloat from '../components/ui/WhatsAppFloat.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
  schema?: object;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const {
  title,
  description,
  image = '/images/og/default.webp',
  canonicalURL = new URL(Astro.url.pathname, Astro.site).toString(),
  schema,
  type = 'website',
  noindex = false
} = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <BaseHead
      title={title}
      description={description}
      image={image}
      canonicalURL={canonicalURL}
      type={type}
      noindex={noindex}
    />
    
    <!-- Critical CSS inline para evitar FOUC -->
    <style is:inline>
      :root {
        --color-primary: #0066cc;
        --color-secondary: #ff6600;
        --color-text: #1a1a1a;
        --color-bg: #ffffff;
        --font-sans: 'FontSans', system-ui, -apple-system, sans-serif;
        --font-display: 'FontDisplay', Georgia, serif;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
      body { color: var(--color-text); background: var(--color-bg); line-height: 1.6; }
      img, picture, video { max-width: 100%; height: auto; display: block; }
      a { color: inherit; text-decoration: none; }
    </style>
    
    <!-- Preload fuentes criticas -->
    <link 
      rel="preload" 
      href="/fonts/font-regular.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin
    />
    <link 
      rel="preload" 
      href="/fonts/font-bold.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin
    />
    
    <!-- Preload imagen hero para LCP -->
    <link 
      rel="preload" 
      as="image" 
      href="/images/hero/hero-mobile.webp"
      media="(max-width: 768px)"
    />
    <link 
      rel="preload" 
      as="image" 
      href="/images/hero/hero-desktop.webp"
      media="(min-width: 769px)"
    />
    
    <!-- Schema JSON-LD -->
    {schema && (
      <script type="application/ld+json" set:html={JSON.stringify(schema)} />
    )}
    
    <!-- GA4 con defer via Partytown -->
    <script 
      type="text/partytown" 
      async 
      src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA4_ID}`}
    ></script>
    <script type="text/partytown" define:vars={{ ga4Id: import.meta.env.PUBLIC_GA4_ID }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ga4Id, { send_page_view: true });
    </script>
    
    <!-- GTM Head -->
    <script type="text/partytown" define:vars={{ gtmId: import.meta.env.PUBLIC_GTM_ID }}>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', gtmId);
    </script>
  </head>
  
  <body>
    <!-- GTM noscript body -->
    <noscript>
      <iframe 
        src={`https://www.googletagmanager.com/ns.html?id=${import.meta.env.PUBLIC_GTM_ID}`}
        height="0" 
        width="0" 
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>
    
    <Header />
    
    <main>
      <slot />
    </main>
    
    <Footer />
    
    <WhatsAppFloat />
  </body>
</html>
```

### 3.2 src/components/seo/BaseHead.astro

```astro
---
interface Props {
  title: string;
  description: string;
  image: string;
  canonicalURL: string;
  type: 'website' | 'article';
  noindex: boolean;
}

const { title, description, image, canonicalURL, type, noindex } = Astro.props;
const imageURL = new URL(image, Astro.site).toString();
---

<!-- Charset y viewport -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Primary meta tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Robots -->
{noindex ? (
  <meta name="robots" content="noindex, nofollow" />
) : (
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
)}

<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Theme color -->
<meta name="theme-color" content="#0066cc" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={imageURL} />

<!-- DNS prefetch para recursos externos criticos -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://res.cloudinary.com" />
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />

<!-- Alternate languages (si aplica) -->
<link rel="alternate" hreflang="es" href={canonicalURL} />
<link rel="alternate" hreflang="x-default" href={canonicalURL} />
```

### 3.3 src/styles/global.css

```css
@import 'tailwindcss';

@theme {
  --color-primary: #0066cc;
  --color-primary-dark: #0052a3;
  --color-secondary: #ff6600;
  --color-text: #1a1a1a;
  --color-text-light: #4a4a4a;
  --color-bg: #ffffff;
  --color-bg-alt: #f5f5f5;
  
  --font-sans: 'FontSans', system-ui, sans-serif;
  --font-display: 'FontDisplay', Georgia, serif;
  
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Fuentes auto-hosteadas */
@font-face {
  font-family: 'FontSans';
  src: url('/fonts/font-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: optional;
}

@font-face {
  font-family: 'FontSans';
  src: url('/fonts/font-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: optional;
}

@font-face {
  font-family: 'FontDisplay';
  src: url('/fonts/font-display.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: optional;
}

/* Reset y base */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus visible (accesibilidad) */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Prevenir layout shift en imagenes */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 3.4 public/robots.txt

```
User-agent: *
Allow: /

# Bloquear areas privadas
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /*.json$
Disallow: /gracias

# Sitemap
Sitemap: https://{{dominio_cliente}}/sitemap-index.xml
```

---

## FASE 4 — RENDIMIENTO (reglas no negociables)

### 4.1 Metricas objetivo

```
OBJETIVOS MINIMOS:
  PageSpeed mobile:      >= 90 (objetivo: 99+)
  PageSpeed desktop:     >= 95 (objetivo: 100)
  LCP:                   < 2.5s  (objetivo: < 1.5s)
  CLS:                   = 0     (objetivo: exacto 0)
  INP:                   < 200ms (objetivo: < 100ms)
  FCP:                   < 1.8s  (objetivo: < 1.0s)
  TTFB:                  < 800ms (objetivo: < 400ms)
  TBT:                   < 200ms (objetivo: < 50ms)
  Speed Index:           < 3.4s  (objetivo: < 2.0s)
  Tamano total (gzipped): < 500KB (objetivo: < 300KB)
  JS total (gzipped):    < 200KB (objetivo: < 100KB)
  CSS total (gzipped):   < 50KB  (objetivo: < 20KB)
```

### 4.2 Reglas de imagenes

```astro
---
// Componente Image obligatorio — NUNCA usar <img> plano
import { Image, Picture } from 'astro:assets';
import heroMobile from '../assets/hero-mobile.jpg';
import heroDesktop from '../assets/hero-desktop.jpg';
---

<!-- HERO: siempre con Picture + responsive -->
<Picture
  src={heroDesktop}
  alt="Plomero de emergencia en Houston trabajando en una fuga"
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 768px) 100vw, 80vw"
  formats={['avif', 'webp']}
  fallbackFormat="webp"
  loading="eager"
  fetchpriority="high"
  decoding="sync"
  width={1200}
  height={600}
  quality={85}
  class="w-full h-auto"
/>

<!-- IMAGENES NO-HERO: lazy loading obligatorio -->
<Image
  src={serviceImage}
  alt="Deteccion de fugas con camara endoscopica"
  widths={[400, 800]}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
  loading="lazy"
  decoding="async"
  width={800}
  height={450}
  quality={80}
  class="rounded-lg"
/>
```

**Reglas absolutas de imagenes:**

```
[ ] Siempre usar Image o Picture de astro:assets (nunca <img> plano en produccion)
[ ] Width y height explicitos SIEMPRE (previene CLS)
[ ] loading="eager" + fetchpriority="high" SOLO para imagen hero LCP
[ ] loading="lazy" en TODAS las demas imagenes
[ ] Formato: AVIF con fallback a WebP
[ ] Quality: 85 para hero, 80 para resto
[ ] srcset con multiples resoluciones via widths
[ ] sizes apropiado para responsive
[ ] Alt text descriptivo con keyword cuando aplica
[ ] Hero mobile separado del hero desktop
[ ] Peso objetivo: hero < 50KB mobile, < 100KB desktop, resto < 30KB cada una
```

### 4.3 Reglas de JavaScript

```
[ ] Astro por default es cero-JS — aprovechar
[ ] Usar islands (client:load, client:idle, client:visible) SOLO cuando sea interactivo
[ ] GSAP: import solo los plugins usados, NO importar todo el paquete
[ ] Scripts de terceros via Partytown (tracking, analytics)
[ ] Scripts propios con defer o type="module"
[ ] NUNCA <script> sin async o defer en <head>
[ ] NUNCA console.log en produccion
[ ] NUNCA alert, confirm o prompt
```

**Import selectivo de GSAP:**

```javascript
// [MAL] Importa todo GSAP (180KB)
import gsap from 'gsap';
import { ScrollTrigger, SplitText, DrawSVG } from 'gsap/all';

// [BIEN] Importa solo lo necesario (60KB)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

**Client directives de Astro:**

```astro
<!-- Carga inmediata (usar solo si es critico) -->
<Counter client:load />

<!-- Carga cuando el navegador este idle -->
<Carousel client:idle />

<!-- Carga cuando entra al viewport (RECOMENDADO) -->
<Gallery client:visible />

<!-- Solo en media query -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Solo si el usuario lo activa -->
<ChatWidget client:only="react" />
```

### 4.4 Critical CSS inline

```
REGLA: Critical CSS <= 14KB inline en <head>
  - Reset basico
  - Variables CSS del tema
  - Layout del above-the-fold
  - Tipografia base
  - Hero section
  
CSS NO critico: cargar async (via Tailwind build)
```

### 4.5 Font loading strategy

```
ESTRATEGIA: font-display: optional
  - Si la fuente carga en < 100ms -> usar
  - Si no -> usar system font permanentemente (esta pagina)
  - CLS garantizado = 0

ALTERNATIVA: font-display: swap
  - Usa system font primero
  - Cambia a custom cuando cargue
  - Puede causar CLS si las metricas no coinciden

NUNCA USAR:
  font-display: block  (bloquea render)
  font-display: auto   (default del browser)
```

### 4.6 Resource hints

```html
<!-- Preload imagen hero (obligatorio) -->
<link rel="preload" as="image" href="/images/hero.webp" />

<!-- Preload fuentes criticas -->
<link rel="preload" href="/fonts/regular.woff2" as="font" type="font/woff2" crossorigin />

<!-- DNS prefetch para dominios externos -->
<link rel="dns-prefetch" href="https://res.cloudinary.com" />

<!-- Preconnect para recursos criticos (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />

<!-- Prefetch para paginas probables -->
<link rel="prefetch" href="/contacto" />
```

---

## FASE 5 — SEO TECNICO

### 5.1 Meta tags obligatorios por pagina

```astro
---
// En cada pagina individual, pasar al Layout:
import Layout from '../layouts/Layout.astro';

const title = "Plomero Emergencia Houston 24/7 | Addendo"; // <= 60 chars
const description = "Plomeros disponibles 24/7 en Houston. Llegamos en 45 min. Sin cargo extra por emergencia. Llama ahora: (555) 123-4567."; // 140-155 chars
---

<Layout
  title={title}
  description={description}
  image="/images/og/plomero-houston.webp"
  schema={localBusinessSchema}
  type="website"
>
  <!-- contenido -->
</Layout>
```

### 5.2 Schema LocalBusiness

```typescript
// src/lib/schemas.ts

export function localBusinessSchema(cliente: ClienteData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${cliente.url}#business`,
    "name": cliente.nombre,
    "image": `${cliente.url}/images/og/default.webp`,
    "logo": `${cliente.url}/images/logo.webp`,
    "url": cliente.url,
    "telephone": cliente.telefono,
    "email": cliente.email,
    "priceRange": cliente.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": cliente.direccion.calle,
      "addressLocality": cliente.direccion.ciudad,
      "addressRegion": cliente.direccion.estado,
      "postalCode": cliente.direccion.cp,
      "addressCountry": cliente.direccion.pais
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cliente.geo.lat,
      "longitude": cliente.geo.lng
    },
    "openingHoursSpecification": cliente.horarios.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.dias,
      "opens": h.abre,
      "closes": h.cierra
    })),
    "areaServed": cliente.ciudadesAtendidas.map(c => ({
      "@type": "City",
      "name": c
    })),
    "aggregateRating": cliente.rating ? {
      "@type": "AggregateRating",
      "ratingValue": cliente.rating.valor,
      "reviewCount": cliente.rating.cantidad
    } : undefined,
    "sameAs": [
      cliente.social.facebook,
      cliente.social.instagram,
      cliente.social.linkedin
    ].filter(Boolean)
  };
}
```

### 5.3 Schema FAQPage

```typescript
export function faqSchema(preguntas: Array<{pregunta: string, respuesta: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": preguntas.map(p => ({
      "@type": "Question",
      "name": p.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": p.respuesta
      }
    }))
  };
}
```

### 5.4 Schema BlogPosting

```typescript
export function articleSchema(post: BlogPost, cliente: ClienteData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": {
      "@type": "ImageObject",
      "url": `${cliente.url}${post.image.src}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${cliente.url}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": cliente.nombre,
      "logo": {
        "@type": "ImageObject",
        "url": `${cliente.url}/images/logo.webp`
      }
    },
    "datePublished": post.pubDate.toISOString(),
    "dateModified": (post.updatedDate || post.pubDate).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${cliente.url}/blog/${post.slug}`
    },
    "keywords": [post.keyword, ...post.lsiKeywords].join(", "),
    "wordCount": post.wordCount
  };
}
```

### 5.5 Schema Service

```typescript
export function serviceSchema(servicio: ServicioData, cliente: ClienteData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": servicio.nombre,
    "name": `${servicio.nombre} en ${cliente.direccion.ciudad}`,
    "description": servicio.descripcion,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${cliente.url}#business`,
      "name": cliente.nombre
    },
    "areaServed": {
      "@type": "City",
      "name": cliente.direccion.ciudad
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": servicio.nombre,
      "itemListElement": servicio.subServicios.map(sub => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": sub
        }
      }))
    }
  };
}
```

---

## FASE 6 — COMPONENTES OBLIGATORIOS

### 6.1 Header.astro

```astro
---
import { SITE } from '../../lib/constants';
---

<header class="sticky top-0 z-40 bg-white shadow-sm">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center" aria-label={`${SITE.nombre} home`}>
        <img 
          src="/images/logo.webp" 
          alt={SITE.nombre}
          width="150" 
          height="40"
          fetchpriority="high"
        />
      </a>
      
      <!-- Nav desktop -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Navegacion principal">
        <a href="/servicios" class="text-gray-700 hover:text-primary transition">Servicios</a>
        <a href="/sobre-nosotros" class="text-gray-700 hover:text-primary transition">Nosotros</a>
        <a href="/blog" class="text-gray-700 hover:text-primary transition">Blog</a>
        <a href="/contacto" class="text-gray-700 hover:text-primary transition">Contacto</a>
      </nav>
      
      <!-- CTA principal siempre visible -->
      <a 
        href={`tel:${SITE.telefono}`}
        class="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
        data-analytics="header-call"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span class="hidden sm:inline">{SITE.telefono}</span>
        <span class="sm:hidden">Llamar</span>
      </a>
    </div>
  </div>
</header>
```

### 6.2 Hero.astro

```astro
---
import { Picture } from 'astro:assets';
import heroImg from '../../assets/hero.jpg';

interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  ctaSecondary?: { text: string; href: string };
}

const { title, subtitle, ctaText, ctaHref, ctaSecondary } = Astro.props;
---

<section class="relative bg-gray-50 overflow-hidden">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 leading-tight">
          {title}
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl">
          {subtitle}
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <a 
            href={ctaHref}
            class="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition shadow-lg"
            data-analytics="hero-cta-primary"
          >
            {ctaText}
          </a>
          {ctaSecondary && (
            <a 
              href={ctaSecondary.href}
              class="inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition"
              data-analytics="hero-cta-secondary"
            >
              {ctaSecondary.text}
            </a>
          )}
        </div>
      </div>
      
      <div class="relative">
        <Picture
          src={heroImg}
          alt="Servicio profesional en Houston"
          widths={[400, 800, 1200]}
          sizes="(max-width: 1024px) 100vw, 50vw"
          formats={['avif', 'webp']}
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          width={1200}
          height={800}
          quality={85}
          class="rounded-2xl shadow-2xl w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>
```

### 6.3 WhatsAppFloat.astro

```astro
---
import { SITE } from '../../lib/constants';

const whatsappMessage = encodeURIComponent(
  `Hola! Vengo del sitio web de ${SITE.nombre} y quiero mas informacion.`
);
const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`;
---

<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener"
  aria-label="Contactar por WhatsApp"
  class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform"
  style="background-color: #25D366;"
  data-analytics="whatsapp-float-click"
>
  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

### 6.4 ContactForm.astro

```astro
---
// Formulario conectado a GHL via webhook de N8N
---

<section class="py-16 bg-white">
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-center text-gray-900">
      Contactanos
    </h2>
    <p class="mt-4 text-center text-gray-600">
      Respondemos en menos de 15 minutos durante horario laboral.
    </p>
    
    <form 
      id="contact-form"
      class="mt-10 space-y-6"
      data-webhook={import.meta.env.PUBLIC_GHL_WEBHOOK}
    >
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-700">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autocomplete="name"
          class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>
      
      <div>
        <label for="phone" class="block text-sm font-semibold text-gray-700">
          Telefono *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          autocomplete="tel"
          inputmode="tel"
          pattern="[0-9+\s()\-]+"
          class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autocomplete="email"
          inputmode="email"
          class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>
      
      <div>
        <label for="message" class="block text-sm font-semibold text-gray-700">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        ></textarea>
      </div>
      
      <button
        type="submit"
        class="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="submit-text">Enviar mensaje</span>
        <span class="loading-text hidden">Enviando...</span>
      </button>
      
      <p id="form-message" class="hidden text-center" aria-live="polite"></p>
    </form>
  </div>
</section>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const messageEl = document.getElementById('form-message') as HTMLElement;
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const submitText = submitBtn.querySelector('.submit-text') as HTMLElement;
  const loadingText = submitBtn.querySelector('.loading-text') as HTMLElement;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    loadingText.classList.remove('hidden');
    
    const webhook = form.dataset.webhook;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch(webhook!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'website-contact-form',
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) throw new Error('Submit failed');
      
      // Tracking eventos de conversion
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form'
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
      
      // Redirigir a thank you
      window.location.href = '/gracias';
    } catch (error) {
      messageEl.textContent = 'Hubo un error. Por favor llama al telefono o intenta de nuevo.';
      messageEl.className = 'mt-4 text-center text-red-600';
      messageEl.classList.remove('hidden');
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      loadingText.classList.add('hidden');
    }
  });
</script>
```

### 6.5 FAQ.astro (con schema)

```astro
---
interface Props {
  preguntas: Array<{ pregunta: string; respuesta: string }>;
}

const { preguntas } = Astro.props;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": preguntas.map(p => ({
    "@type": "Question",
    "name": p.pregunta,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": p.respuesta
    }
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />

<section class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
      Preguntas Frecuentes
    </h2>
    
    <div class="space-y-4">
      {preguntas.map((item) => (
        <details class="group bg-white rounded-lg shadow-sm">
          <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
            <h3 class="text-lg font-semibold text-gray-900 pr-4">
              {item.pregunta}
            </h3>
            <svg 
              class="w-5 h-5 text-primary transform group-open:rotate-180 transition-transform flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div class="px-6 pb-6 text-gray-600 leading-relaxed">
            {item.respuesta}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

### 6.6 Footer.astro

```astro
---
import { SITE } from '../../lib/constants';
const currentYear = new Date().getFullYear();
---

<footer class="bg-gray-900 text-gray-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-white font-bold text-lg mb-4">{SITE.nombre}</h3>
        <p class="text-sm">{SITE.tagline}</p>
      </div>
      
      <div>
        <h4 class="text-white font-semibold mb-4">Contacto</h4>
        <address class="not-italic text-sm space-y-2">
          <p>{SITE.direccion}</p>
          <p>
            <a href={`tel:${SITE.telefono}`} class="hover:text-white">
              {SITE.telefono}
            </a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`} class="hover:text-white">
              {SITE.email}
            </a>
          </p>
        </address>
      </div>
      
      <div>
        <h4 class="text-white font-semibold mb-4">Servicios</h4>
        <ul class="text-sm space-y-2">
          <li><a href="/servicios" class="hover:text-white">Todos los servicios</a></li>
          <li><a href="/contacto" class="hover:text-white">Contactanos</a></li>
          <li><a href="/blog" class="hover:text-white">Blog</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="text-white font-semibold mb-4">Legal</h4>
        <ul class="text-sm space-y-2">
          <li><a href="/privacidad" class="hover:text-white">Privacidad</a></li>
          <li><a href="/terminos" class="hover:text-white">Terminos</a></li>
        </ul>
      </div>
    </div>
    
    <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
      <p>&copy; {currentYear} {SITE.nombre}. Todos los derechos reservados.</p>
      <p class="mt-2 text-xs">
        Sitio por <a href="https://addendo.io" class="hover:text-white">Addendo Growth Partner</a>
      </p>
    </div>
  </div>
</footer>
```

---

## FASE 7 — PAGINAS DINAMICAS

### 7.1 src/pages/ciudad/[slug].astro

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import Hero from '../../components/sections/Hero.astro';
import Services from '../../components/sections/Services.astro';
import FAQ from '../../components/sections/FAQ.astro';
import ContactForm from '../../components/sections/ContactForm.astro';
import { localBusinessSchema } from '../../lib/schemas';
import { SITE } from '../../lib/constants';

export async function getStaticPaths() {
  const cities = await getCollection('cities');
  return cities.map(city => ({
    params: { slug: city.data.slug },
    props: { city }
  }));
}

interface Props {
  city: CollectionEntry<'cities'>;
}

const { city } = Astro.props;
const { Content } = await city.render();

const title = `${SITE.servicioPrincipal} en ${city.data.name} | ${SITE.nombre}`;
const description = `${SITE.servicioPrincipal} profesional en ${city.data.name}, ${city.data.state}. Disponibles 24/7. Llegamos en 45 min. Llama: ${SITE.telefono}`;

const schema = {
  ...localBusinessSchema({ ...SITE, direccion: { ...SITE.direccion, ciudad: city.data.name }}),
  "areaServed": {
    "@type": "City",
    "name": city.data.name,
    "containedInPlace": {
      "@type": "State",
      "name": city.data.state
    }
  }
};
---

<Layout 
  title={title}
  description={description}
  schema={schema}
>
  <Hero
    title={`${SITE.servicioPrincipal} en ${city.data.name}`}
    subtitle={`Servicio profesional 24/7 en ${city.data.name}, ${city.data.state}. Respuesta en 45 minutos.`}
    ctaText="Llama Ahora"
    ctaHref={`tel:${SITE.telefono}`}
    ctaSecondary={{ text: "Cotizacion Gratis", href: "#contacto" }}
  />
  
  <section class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
      <Content />
    </div>
  </section>
  
  <Services />
  
  <!-- Areas atendidas en esta ciudad -->
  {city.data.neighborhoods.length > 0 && (
    <section class="py-12 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6">
          Atendemos en {city.data.name} y areas cercanas
        </h2>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {city.data.neighborhoods.map(n => (
            <li>📍 {n}</li>
          ))}
        </ul>
      </div>
    </section>
  )}
  
  <FAQ preguntas={SITE.faqGenerales} />
  <ContactForm />
</Layout>
```

### 7.2 Reglas de contenido unico por pagina dinamica

```
REGLA: cada pagina ciudad o servicio debe tener MINIMO 300 palabras de contenido unico.

PROHIBIDO:
  - Duplicar el mismo parrafo cambiando solo la ciudad
  - Usar templates identicos con solo {{variable}} cambiada
  - Contenido generado por IA sin edicion humana
  - Meta description identica entre paginas

OBLIGATORIO por pagina de ciudad:
  - H1 con nombre de ciudad y keyword
  - 2+ parrafos de contenido especifico a esa ciudad
  - Mencion de barrios o areas especificas
  - ZIP codes servidos
  - Al menos 1 dato local (clima, eventos, distancias)
  - Testimonios de clientes de esa ciudad (si hay)
  - FAQ con preguntas locales

OBLIGATORIO por pagina de servicio + ciudad:
  - H1: "{servicio} en {ciudad}"
  - Descripcion del servicio especifica para esa ciudad
  - Precio o rango de precios si aplica
  - Proceso especifico
  - Tiempo de respuesta local
```

### 7.3 Paginas de blog [slug].astro

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import { articleSchema } from '../../lib/schemas';
import { SITE } from '../../lib/constants';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content, headings } = await post.render();

const schema = articleSchema(post, SITE);
---

<BlogLayout
  title={post.data.title}
  description={post.data.description}
  image={post.data.image.src}
  schema={schema}
  type="article"
  pubDate={post.data.pubDate}
  author={post.data.author}
>
  <article class="prose prose-lg max-w-3xl mx-auto px-4 py-12">
    <h1>{post.data.title}</h1>
    <div class="text-gray-500 mb-8">
      Por {post.data.author} • {post.data.pubDate.toLocaleDateString('es-ES')}
    </div>
    <Content />
  </article>
</BlogLayout>
```

---

## FASE 8 — OPTIMIZACION DE IMAGENES

### 8.1 Protocolo obligatorio por cada imagen

```
PASO 1 — Recibir imagen original del disenador
  Formato: PNG o JPG de alta resolucion (2400px+ ancho)
  Guardar en: /src/assets/{categoria}/{nombre}.jpg

PASO 2 — Usar componente Image o Picture de Astro
  NUNCA colocar imagenes en /public/ salvo:
    - favicons
    - og images compartidas
    - imagenes externas que no necesitan optimizacion

PASO 3 — Definir widths segun uso
  Hero:            [400, 800, 1200, 1600]
  Card service:    [400, 800]
  Testimonio avatar: [100, 200]
  Blog hero:       [600, 1200]
  Logo:            [150, 300]

PASO 4 — Definir sizes atribute para responsive
  Hero full-width:     "(max-width: 768px) 100vw, 80vw"
  2 cols mobile/3 desktop: "(max-width: 768px) 50vw, 33vw"
  Full width cualquier viewport: "100vw"
  Content width: "(max-width: 768px) 100vw, 800px"

PASO 5 — Formato y calidad
  formats={['avif', 'webp']}
  fallbackFormat="webp"
  quality={85}  // hero
  quality={80}  // contenido
  quality={70}  // decorativos

PASO 6 — Loading strategy
  hero / above-the-fold:
    loading="eager"
    fetchpriority="high"
    decoding="sync"
  
  below-the-fold:
    loading="lazy"
    decoding="async"

PASO 7 — Dimensiones explicitas (PREVIENE CLS)
  width={X}
  height={Y}
  (Astro las calcula si uso Image, pero mejor explicitas)

PASO 8 — Alt text descriptivo
  MAL: alt="imagen"
  BIEN: alt="Plomero trabajando en una fuga de agua en Houston"

PASO 9 — Verificar peso final
  Hero mobile: < 50KB
  Hero desktop: < 100KB
  Imagenes de contenido: < 30KB cada una
  Avatares: < 10KB cada uno
```

### 8.2 Picture component para responsive hero

```astro
---
import { Picture } from 'astro:assets';
import heroDesktop from '../assets/hero-desktop.jpg';
import heroMobile from '../assets/hero-mobile.jpg';
---

<!-- Picture HTML nativo con art direction diferente por viewport -->
<picture>
  <source 
    media="(max-width: 768px)" 
    srcset="/images/hero-mobile-400.avif 400w, /images/hero-mobile-800.avif 800w"
    type="image/avif"
    sizes="100vw"
  />
  <source 
    media="(max-width: 768px)" 
    srcset="/images/hero-mobile-400.webp 400w, /images/hero-mobile-800.webp 800w"
    type="image/webp"
    sizes="100vw"
  />
  <source 
    srcset="/images/hero-desktop-800.avif 800w, /images/hero-desktop-1600.avif 1600w"
    type="image/avif"
    sizes="100vw"
  />
  <source 
    srcset="/images/hero-desktop-800.webp 800w, /images/hero-desktop-1600.webp 1600w"
    type="image/webp"
    sizes="100vw"
  />
  <img 
    src="/images/hero-desktop-800.webp"
    alt="Servicio profesional en Houston"
    width="1600"
    height="900"
    loading="eager"
    fetchpriority="high"
    decoding="sync"
    class="w-full h-auto"
  />
</picture>
```

### 8.3 Cloudinary para almacenamiento remoto

```typescript
// src/lib/cloudinary.ts

const CLOUDINARY_CLOUD = import.meta.env.PUBLIC_CLOUDINARY_CLOUD;

export function cld(publicId: string, options: {
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
} = {}) {
  const { width, quality = 'auto', format = 'auto' } = options;
  const params = [
    'f_' + format,
    'q_' + quality,
    width ? 'w_' + width : null,
    'c_limit'
  ].filter(Boolean).join(',');
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${params}/${publicId}`;
}
```

---

## FASE 9 — CONECTAR CON ECOSISTEMA ADDENDO

### 9.1 Formularios -> N8N -> GHL

**Variables de entorno:**

```
PUBLIC_GHL_WEBHOOK=https://n8n.addendo.io/webhook/form-submit-{cliente-slug}
```

**Estructura del payload enviado a N8N:**

```json
{
  "name": "Juan Perez",
  "phone": "+1-555-123-4567",
  "email": "juan@example.com",
  "message": "Necesito plomero urgente",
  "source": "website-contact-form",
  "page": "/contacto",
  "cliente_slug": "plomero-houston",
  "timestamp": "2026-04-10T15:30:00Z",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "emergency",
  "referrer": "https://google.com"
}
```

### 9.2 WhatsApp link builder

```typescript
// src/lib/whatsapp.ts

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const defaultMessage = `Hola! Vengo del sitio web y quiero mas informacion.`;
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
```

### 9.3 src/lib/analytics.ts

```typescript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  
  // GTM dataLayer
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({ event: eventName, ...params });
  }
  
  // Meta Pixel standard events
  if (typeof window.fbq === 'function') {
    const metaEvents: Record<string, string> = {
      'form_submit': 'Lead',
      'whatsapp_click': 'Contact',
      'call_click': 'Contact',
      'page_view': 'PageView'
    };
    
    const fbEvent = metaEvents[eventName];
    if (fbEvent) {
      window.fbq('track', fbEvent, params);
    }
  }
}

// Auto-track clicks con data-analytics
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const trackable = target.closest('[data-analytics]') as HTMLElement;
    
    if (trackable) {
      const eventName = trackable.dataset.analytics!;
      const params = {
        element: trackable.tagName.toLowerCase(),
        text: trackable.innerText?.slice(0, 50),
        href: (trackable as HTMLAnchorElement).href
      };
      trackEvent(eventName, params);
    }
  });
}
```

### 9.4 Conversion events obligatorios

```typescript
// Eventos que SIEMPRE deben dispararse en sitios de Addendo:

EVENTOS DE PAGINA:
  - page_view (automatico via GA4)

EVENTOS DE INTERACCION:
  - scroll_50 (usuario llego a la mitad)
  - scroll_90 (usuario llego al 90%)
  - engagement_30s (30 segundos en pagina)

EVENTOS DE CONVERSION:
  - form_submit (envio de formulario)  → tambien fbq('Lead')
  - whatsapp_click (click en WhatsApp)  → tambien fbq('Contact')
  - call_click (click en tel:)          → tambien fbq('Contact')
  - email_click (click en mailto:)      → tambien fbq('Contact')
  - cta_click_hero (click en CTA hero)
  - cta_click_footer (click en CTA footer)
```

---

## FASE 10 — CALIDAD DEL CODIGO

### 10.1 Comentarios en espanol

```astro
---
// Componente Hero — above the fold de la homepage
// Incluye imagen hero con LCP optimizado (preload + fetchpriority high)
// Dos CTAs: primario al telefono, secundario al formulario

import { Picture } from 'astro:assets';
---

<!-- 
  Seccion hero con grid responsive.
  Mobile: columna unica, imagen debajo del texto.
  Desktop: 2 columnas, imagen a la derecha.
-->
<section class="hero">
  ...
</section>
```

### 10.2 Componentes reutilizables

```
REGLA: Si voy a escribir el mismo bloque de codigo 2 veces -> crear componente.

EJEMPLO MALO: Repetir el mismo boton en 10 paginas
EJEMPLO BIEN: <Button variant="primary" href="/contacto">Contactar</Button>

COMPONENTES UI base:
  - Button.astro (con variants: primary, secondary, outline)
  - Card.astro (con variants: service, testimonial, feature)
  - Section.astro (wrapper con padding y max-width consistente)
  - Heading.astro (H1, H2, H3 con estilos consistentes)
  - Badge.astro (pills pequenos)
  - IconBox.astro (icono + texto)
```

### 10.3 Variables CSS para tema del cliente

```css
/* Cada cliente tiene su propio tema */
:root {
  --color-primary: #0066cc;        /* color principal del cliente */
  --color-primary-dark: #0052a3;   /* version mas oscura para hover */
  --color-secondary: #ff6600;      /* color de acento */
  --color-text: #1a1a1a;
  --color-text-light: #6b7280;
  --color-bg: #ffffff;
  --color-bg-alt: #f9fafb;
  --color-border: #e5e7eb;
  --color-success: #10b981;
  --color-error: #ef4444;
  
  --font-sans: 'FontSans', system-ui, sans-serif;
  --font-display: 'FontDisplay', Georgia, serif;
  
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### 10.4 Mobile-first siempre

```css
/* Mobile-first: escribir estilos base para mobile, anadir breakpoints para desktop */

/* BIEN */
.hero {
  padding: 2rem 1rem;
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  .hero {
    padding: 4rem 2rem;
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding: 6rem 3rem;
    font-size: 3rem;
  }
}

/* MAL (desktop-first) */
.hero {
  padding: 6rem 3rem;
  font-size: 3rem;
}

@media (max-width: 1024px) {
  .hero {
    padding: 4rem 2rem;
    font-size: 2rem;
  }
}
```

**En Tailwind equivalente:**

```html
<!-- Mobile-first con Tailwind -->
<section class="py-8 px-4 text-2xl md:py-16 md:px-8 md:text-3xl lg:py-24 lg:px-12 lg:text-5xl">
  ...
</section>
```

### 10.5 Testing cross-browser

```
ANTES DE HACER COMMIT, probar en:

DESKTOP:
  [ ] Chrome ultima version
  [ ] Firefox ultima version
  [ ] Safari (si Mac disponible)
  [ ] Edge ultima version

MOBILE:
  [ ] iPhone 15 Safari (real o BrowserStack)
  [ ] iPhone SE 2020 Safari (pantalla pequena)
  [ ] Samsung Galaxy S23 Chrome
  [ ] Pixel 7 Chrome

TESTS:
  [ ] Carga visual correcta (sin layout breaks)
  [ ] Formularios funcionan
  [ ] Animaciones corren suavemente
  [ ] Navegacion mobile abre/cierra
  [ ] Videos reproducen
  [ ] CTAs tocables en mobile (> 44x44px)
  [ ] Fuentes cargan correctamente
  [ ] Imagenes no se deforman
```

### 10.6 Reglas prohibidas en produccion

```
NUNCA EN PRODUCCION:
  [ ] console.log / console.error / console.warn
  [ ] debugger
  [ ] alert / confirm / prompt
  [ ] TODO / FIXME / XXX en codigo
  [ ] Texto placeholder (Lorem ipsum)
  [ ] Links con href="#" o href="javascript:void(0)"
  [ ] Imagenes de stock sin atribucion (si aplica)
  [ ] API keys o credenciales hardcoded
  [ ] Variables sin usar
  [ ] Imports sin usar
  [ ] Comentarios "hackeados" o groseros
  [ ] CSS con !important (salvo casos extremos justificados)
  [ ] IDs duplicados en HTML
  [ ] Atributos alt vacios (salvo imagenes puramente decorativas)
  [ ] <div> cuando deberia ser <button>, <a>, <section>, etc.
```

### 10.7 Variables de entorno

```bash
# .env.example (se commitea al repo, SIN valores)

# Public (accesibles en el cliente)
PUBLIC_GA4_ID=
PUBLIC_GTM_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_CLOUDINARY_CLOUD=
PUBLIC_GHL_WEBHOOK=
PUBLIC_SITE_URL=

# Private (solo servidor)
GHL_API_KEY=
CLOUDINARY_API_SECRET=
```

**Uso en el codigo:**

```typescript
// Variables PUBLIC_ son accesibles en el cliente
const ga4Id = import.meta.env.PUBLIC_GA4_ID;

// Variables sin PUBLIC_ solo en build o server-side
const apiKey = import.meta.env.GHL_API_KEY; // undefined en client
```

**En Vercel Environment Variables:**

```
Configurar todas las variables en Vercel Dashboard.
Nunca commitear .env al repo.
.env esta en .gitignore siempre.
```

### 10.8 Accesibilidad (WCAG AA minimo)

```
CHECKLIST ACCESIBILIDAD:
  [ ] Contraste de texto >= 4.5:1 (WCAG AA)
  [ ] Botones con aria-label si solo tienen icono
  [ ] Imagenes con alt descriptivo (o alt="" si son decorativas)
  [ ] Formularios con labels asociados
  [ ] Focus visible en elementos interactivos
  [ ] Navegacion por teclado funciona
  [ ] Estructura semantica: header, nav, main, section, article, footer
  [ ] Headings jerarquicos (H1 > H2 > H3 sin saltos)
  [ ] Lang attribute en <html>
  [ ] prefers-reduced-motion respetado
  [ ] Color no es el unico indicador (ej: iconos + color en errores)
  [ ] Titulos de pagina unicos y descriptivos
  [ ] Skip to main content link (opcional pero recomendado)
```

---

## REGLAS MAESTRAS DEL SKILL

1. **Astro.js + Tailwind v4 + TypeScript es el unico stack.** No negociable.

2. **PageSpeed mobile >= 90 es el minimo.** El objetivo siempre es 99+.

3. **Cero JavaScript innecesario.** Astro es SSG por defecto — aprovechar.

4. **Imagenes: WebP/AVIF o no existe.** Cero JPG/PNG sin comprimir en produccion.

5. **Fuentes auto-hosteadas siempre.** Google Fonts CDN bloquea el render.

6. **Critical CSS inline <= 14KB.** Todo lo demas va async.

7. **Width y height explicitos en todas las imagenes.** CLS = 0 es el objetivo.

8. **Preload + fetchpriority=high SOLO para imagen hero.** Resto lazy.

9. **Meta tags completos en cada pagina.** Title, description, OG, Twitter, canonical, schema.

10. **Schema markup JSON-LD obligatorio.** LocalBusiness / Article / FAQ / Service segun el tipo.

11. **Mobile-first siempre.** Disenar para mobile y escalar a desktop.

12. **Cross-browser testing antes de commit.** Chrome, Safari, Firefox, Edge.

13. **GTM + GA4 + Meta Pixel via Partytown.** Nunca blocking en el main thread.

14. **Formularios van a N8N webhook → GHL.** Nunca directo al backend del sitio.

15. **WhatsApp flotante obligatorio** en sitios de negocios locales. Verde #25D366.

16. **Paginas dinamicas con contenido UNICO.** Minimo 300 palabras por pagina.

17. **Variables de entorno para todo lo configurable.** Nunca hardcodear.

18. **Cero console.log en produccion.** Cero placeholders. Cero TODOs.

19. **Codigo comentado en espanol.** Funciones con proposito claro.

20. **Semantica HTML correcta.** `<button>` para botones, `<a>` para enlaces, no `<div onclick>`.

21. **Accesibilidad WCAG AA minimo.** Contraste 4.5:1, aria-labels, navegacion por teclado.

22. **Vercel Pro via GitHub main branch.** Deploy automatico en merge.

23. **Cada linea de codigo tiene un proposito.** Si no mejora performance, SEO o conversion, no se escribe.

24. **El frontend no construye sitios bonitos — construye maquinas de conversion de alta velocidad.**
