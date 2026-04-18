# SKILL: Deployment Automatizado de Sitios Web

**Nivel:** Ingeniero de deployment senior — automatizacion completa sin intervencion humana
**Objetivo:** Publicar un sitio web cliente en produccion en **menos de 15 minutos** con cero errores
**Agentes que usan este skill:** #45 agente-deployment, #21 frontend-dev, #25 servidor-cloud
**Flujo:** Cliente Nuevo (fase 10) + Blog Automatico (deploy de articulos)
**APIs requeridas:** GitHub API, Vercel API, Cloudflare API, Google Indexing API, Google PageSpeed Insights, Google Search Console API, Gmail API, Google Drive API

---

## PROTOCOLO DE EJECUCION

Este skill se ejecuta en **7 fases secuenciales**. Cada fase tiene gates de verificacion — si una verificacion falla, el proceso se DETIENE y se notifica. No se pasa a la siguiente fase sin completar la anterior.

**Datos de entrada requeridos:**

```
cliente_nombre: Nombre del cliente
cliente_slug: slug-del-cliente (lowercase, sin espacios, para nombrar repo y proyecto)
repo_nombre: {{cliente_slug}}-website
dominio_principal: dominio del cliente (ej: cliente.com)
dominio_www: www.cliente.com
subdominio_staging: staging.cliente.com (opcional)
contacto_cliente: email del cliente
ghl_subcuenta_id: ID de sub-cuenta GHL
ga4_measurement_id: G-XXXXXXXXXX
meta_pixel_id: (si aplica)
tipo_deploy: initial / update / blog-post / hotfix
```

**Variables de entorno del agente (NUNCA hardcodear):**

```
GITHUB_TOKEN
GITHUB_ORG=AddendoGrowthPartner
VERCEL_TOKEN
VERCEL_TEAM_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON
GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON
GMAIL_OAUTH_CREDENTIALS
GOOGLE_DRIVE_CREDENTIALS
```

**Regla maestra:** Si CUALQUIER paso falla, ejecutar rollback automatico (ver Fase 7.4) y notificar a Jose inmediatamente.

---

## FASE 1 — PRE-DEPLOYMENT: VERIFICACIONES OBLIGATORIAS

**Duracion objetivo:** 2-3 minutos
**Gate:** Ninguna verificacion puede fallar. Todo en VERDE o el proceso se detiene.

### 1.1 Verificar existencia del repositorio en GitHub

**API:** GitHub REST API
**Endpoint:** `GET https://api.github.com/repos/AddendoGrowthPartner/{{repo_nombre}}`

```bash
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/AddendoGrowthPartner/{{repo_nombre}}
```

**Posibles respuestas:**

| Status | Accion |
|--------|--------|
| 200 | Repo existe — continuar con 1.2 |
| 404 | Repo NO existe — saltar a Fase 2.1 (crear repo) |
| 401 | Token invalido — ABORTAR y notificar |
| 403 | Rate limit — esperar reset y reintentar |

### 1.2 Verificar compilacion del codigo

**Comando obligatorio:**

```bash
cd /tmp/deploys/{{repo_nombre}}
git clone https://github.com/AddendoGrowthPartner/{{repo_nombre}}.git .
git checkout develop
npm ci --prefer-offline --no-audit
npm run build 2>&1 | tee /tmp/deploys/{{repo_nombre}}/build.log
```

**Verificar:**

```
[ ] Exit code de npm run build === 0
[ ] Directorio ./dist existe
[ ] ./dist/index.html existe
[ ] No hay "Error" ni "FAILED" en build.log
[ ] Todas las paginas en src/pages/ generaron un HTML correspondiente en dist/
```

**Si falla:**

```
ACCION INMEDIATA:
  1. Capturar los ultimos 50 lineas de build.log
  2. NO continuar con el deploy
  3. Notificar a Jose con el error exacto
  4. Estado final: FAILED_BUILD
```

### 1.3 Auditoria de archivos sensibles

**Comando de busqueda obligatorio:**

```bash
cd /tmp/deploys/{{repo_nombre}}

# Patrones prohibidos en el codigo
PATRONES_PROHIBIDOS=(
  "sk_live_"           # Stripe live secret
  "sk_test_"           # Stripe test secret (no debe estar en main)
  "AIza[0-9A-Za-z\\-_]{35}"  # Google API keys
  "ghp_[0-9a-zA-Z]{36}"      # GitHub personal tokens
  "ghs_[0-9a-zA-Z]{36}"      # GitHub secret tokens
  "xoxb-"              # Slack bot tokens
  "AKIA[0-9A-Z]{16}"   # AWS access keys
  "password\\s*=\\s*[\"'][^\"']+[\"']"
  "api_key\\s*=\\s*[\"'][^\"']+[\"']"
  "secret\\s*=\\s*[\"'][^\"']+[\"']"
)

# Archivos prohibidos
ARCHIVOS_PROHIBIDOS=(
  ".env"
  ".env.local"
  ".env.production"
  "credentials.json"
  "secrets.json"
  "id_rsa"
  "*.pem"
  "*.key"
)
```

**Verificaciones obligatorias:**

```
[ ] Ningun archivo en ARCHIVOS_PROHIBIDOS esta trackeado por git
[ ] .gitignore contiene: .env, .env.*, node_modules, dist, .DS_Store, *.log
[ ] Ningun patron en PATRONES_PROHIBIDOS aparece en el codigo fuente (src/)
[ ] Ningun archivo .env fue committed en el historial (git log --all --full-history -- .env)
```

**Si encuentra algo:**

```
ACCION INMEDIATA:
  1. DETENER el deploy
  2. Notificar a Jose con el archivo/patron encontrado
  3. Si fue committed en el historial, recomendar git filter-branch
  4. Estado final: FAILED_SECURITY
```

### 1.4 PageSpeed score minimo 90 mobile

**API:** Google PageSpeed Insights
**Endpoint:** `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedTest`

**Importante:** Esta verificacion se hace sobre el preview deploy de Vercel (Fase 3.4), no sobre produccion. El proposito es NO apuntar el dominio hasta que el sitio cumpla el minimo.

```
?url={{preview_url}}
&strategy=MOBILE
&category=PERFORMANCE
&category=SEO
&category=BEST_PRACTICES
&category=ACCESSIBILITY
```

**Gate:**

```
performance_score = lighthouseResult.categories.performance.score * 100

ASSERT: performance_score >= 90

Si performance_score < 90:
  1. Extraer lista de audits con score < 0.9
  2. Notificar a frontend-dev con las oportunidades de mejora
  3. Estado: FAILED_PERFORMANCE
  4. NO apuntar dominio
```

**Tambien verificar:**

```
ASSERT: seo_score >= 95
ASSERT: accessibility_score >= 90
ASSERT: best_practices_score >= 90
ASSERT: LCP <= 2.5s
ASSERT: CLS <= 0.1
ASSERT: INP <= 200ms
```

### 1.5 Meta tags SEO completos

**Parsear el HTML de cada pagina en ./dist/ y verificar:**

```javascript
// Pseudocodigo — el agente debe implementar con cheerio o similar
for (const htmlFile of glob('./dist/**/*.html')) {
  const $ = cheerio.load(readFile(htmlFile));
  
  ASSERT($('title').text().length >= 30 && $('title').text().length <= 60);
  ASSERT($('meta[name="description"]').attr('content').length >= 120);
  ASSERT($('meta[name="description"]').attr('content').length <= 160);
  ASSERT($('link[rel="canonical"]').attr('href'));
  ASSERT($('meta[property="og:title"]').attr('content'));
  ASSERT($('meta[property="og:description"]').attr('content'));
  ASSERT($('meta[property="og:image"]').attr('content'));
  ASSERT($('meta[property="og:url"]').attr('content'));
  ASSERT($('meta[name="twitter:card"]').attr('content'));
  ASSERT($('meta[name="viewport"]').attr('content').includes('width=device-width'));
  ASSERT($('html').attr('lang'));
  ASSERT($('script[type="application/ld+json"]').length >= 1);
}
```

**Checklist por pagina:**

```
[ ] <title> presente, 30-60 chars
[ ] <meta name="description"> 120-160 chars
[ ] <link rel="canonical"> apunta a la URL correcta
[ ] <meta property="og:title">
[ ] <meta property="og:description">
[ ] <meta property="og:image"> (URL absoluta, no relativa)
[ ] <meta property="og:url">
[ ] <meta name="twitter:card">
[ ] <meta name="viewport">
[ ] <html lang="es"> o <html lang="en">
[ ] Al menos 1 script JSON-LD con schema markup
[ ] Un solo <h1> por pagina
[ ] Favicon multiples tamanos
```

**Si falla:**

```
ACCION INMEDIATA:
  1. Listar paginas con meta tags faltantes o incorrectos
  2. Notificar a copywriting-seo (#16) + frontend-dev (#21)
  3. Estado: FAILED_SEO
```

### 1.6 Verificar sitemap.xml

**Checks obligatorios:**

```
[ ] ./dist/sitemap.xml existe (o sitemap-index.xml para sitios grandes)
[ ] sitemap.xml es XML valido (pasa validador XML)
[ ] Todas las paginas en ./dist/**/*.html tienen una entrada en sitemap.xml
[ ] Cada URL tiene <lastmod> con fecha ISO 8601
[ ] Cada URL usa dominio de produccion, NO localhost ni preview URL
[ ] sitemap.xml no supera 50,000 URLs (si supera, usar sitemap index)
```

**Si falta o esta incompleto:**

```
ACCION AUTOMATICA:
  - Si usa @astrojs/sitemap, el sitemap se genera en build
  - Si falta, generar manualmente desde la lista de paginas en dist/
  - Si tiene URLs con localhost, ERROR — notificar a frontend-dev
```

### 1.7 Verificar robots.txt

**Contenido minimo requerido en ./dist/robots.txt:**

```
User-agent: *
Allow: /

# Bloquear areas privadas
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /private/

# Sitemap
Sitemap: https://{{dominio_principal}}/sitemap.xml
```

**Verificaciones:**

```
[ ] robots.txt existe en ./dist/
[ ] Contiene "User-agent: *"
[ ] Contiene "Sitemap:" con URL absoluta
[ ] NO contiene "Disallow: /" a secas (bloquearia todo el sitio)
[ ] No tiene sintaxis invalida
```

### GATE FASE 1

```
Todas las verificaciones 1.1 a 1.7 deben pasar.
Si cualquiera falla -> STOP y notificar.
Si todas pasan -> continuar a FASE 2.

Tiempo acumulado objetivo: <= 3 minutos
```

---

## FASE 2 — GITHUB: GESTION DEL REPOSITORIO

**Duracion objetivo:** 1-2 minutos

### 2.1 Crear repositorio si no existe

**API:** GitHub REST API
**Endpoint:** `POST https://api.github.com/orgs/AddendoGrowthPartner/repos`

```json
{
  "name": "{{repo_nombre}}",
  "description": "Website for {{cliente_nombre}} — built by Addendo Growth Partner",
  "private": true,
  "has_issues": true,
  "has_projects": false,
  "has_wiki": false,
  "auto_init": false,
  "gitignore_template": "Node",
  "license_template": null
}
```

**Despues de crear:**

```bash
# Crear estructura de ramas
git init
git branch -M main
git remote add origin https://github.com/AddendoGrowthPartner/{{repo_nombre}}.git
git add .
git commit -m "feat: initial commit"
git push -u origin main

# Crear rama develop
git checkout -b develop
git push -u origin develop
```

### 2.2 Configurar proteccion de ramas

**API:** `PUT https://api.github.com/repos/AddendoGrowthPartner/{{repo_nombre}}/branches/main/protection`

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["vercel"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

**Resultado:** Nadie puede pushear directo a main. Todo pasa por PR desde develop.

### 2.3 Formato de commits

**Estructura obligatoria:**

```
[tipo]: descripcion breve en minusculas

Tipos permitidos:
  feat    -> Nueva funcionalidad o pagina
  fix     -> Correccion de bug
  content -> Cambio de contenido/texto/imagenes
  seo     -> Cambios de meta tags, schema, sitemap, robots.txt
  perf    -> Mejoras de performance (imagenes, CSS, JS)
  refactor-> Refactor de codigo sin cambio de funcionalidad
  chore   -> Dependencias, configuracion, tareas mantenimiento
  docs    -> Documentacion
```

**Ejemplos validos:**

```
feat: agregar pagina de servicios de plomeria
fix: corregir formulario de contacto en mobile
content: actualizar testimonios en homepage
seo: anadir schema LocalBusiness al footer
perf: convertir imagenes hero a WebP
```

**Ejemplos invalidos:**

```
[MAL] "updates"
[MAL] "WIP"
[MAL] "stuff"
[MAL] "Actualizacion del sitio"
[MAL] "Fix bug"
```

**Validador de commit messages:**

```regex
^(feat|fix|content|seo|perf|refactor|chore|docs):\s.{10,72}$
```

### 2.4 Verificar .gitignore

**Contenido minimo obligatorio:**

```gitignore
# Dependencies
node_modules/
.pnp.*

# Build output
dist/
.astro/
.vercel/
.next/
.cache/

# Environment variables
.env
.env.local
.env.*.local
.env.production
.env.development

# IDE
.vscode/*
!.vscode/extensions.json
!.vscode/launch.json
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Secrets
credentials.json
secrets.json
*.pem
*.key
id_rsa
```

**Verificacion:**

```bash
grep -E "^(node_modules|\.env|dist|\.DS_Store)" .gitignore
# Deben aparecer los 4 patrones minimo
```

### 2.5 Crear Pull Request: develop -> main

**API:** `POST https://api.github.com/repos/AddendoGrowthPartner/{{repo_nombre}}/pulls`

```json
{
  "title": "Deploy: {{tipo_deploy}} — {{fecha_ISO}}",
  "body": "## Deploy automatico generado por agente-deployment\n\n**Tipo:** {{tipo_deploy}}\n**Cliente:** {{cliente_nombre}}\n**Fecha:** {{fecha_ISO}}\n\n### Verificaciones pre-deploy\n- Build: OK\n- Security scan: OK\n- PageSpeed mobile: {{score}}\n- Meta tags SEO: OK\n- Sitemap: OK\n- Robots.txt: OK\n\n### Cambios incluidos\n{{lista_commits}}\n\n---\n*PR generado automaticamente. Auto-merge habilitado despues de checks verdes.*",
  "head": "develop",
  "base": "main"
}
```

**Auto-merge cuando los checks pasen:**

```json
{
  "merge_method": "squash",
  "commit_title": "Deploy: {{tipo_deploy}} {{fecha_ISO}}",
  "commit_message": "Auto-merged by agente-deployment"
}
```

### 2.6 Tagging de versiones

**Regla de versionado (SemVer adaptado):**

```
v{MAJOR}.{MINOR}.{PATCH}

MAJOR: Lanzamiento inicial del sitio o rediseno completo (v1.0.0, v2.0.0)
MINOR: Nueva pagina, nueva seccion, nueva funcionalidad (v1.1.0, v1.2.0)
PATCH: Fix, cambio de contenido, ajuste SEO (v1.1.1, v1.1.2)
```

**Crear tag despues del merge a main:**

```bash
git checkout main
git pull origin main
git tag -a v{{version}} -m "Deploy {{tipo_deploy}} — {{fecha}}"
git push origin v{{version}}
```

**API alternativa:** `POST https://api.github.com/repos/AddendoGrowthPartner/{{repo_nombre}}/git/refs`

```json
{
  "ref": "refs/tags/v{{version}}",
  "sha": "{{commit_sha}}"
}
```

### GATE FASE 2

```
[ ] Repo existe en GitHub org AddendoGrowthPartner
[ ] Ramas main y develop configuradas
[ ] Proteccion de rama main activa
[ ] .gitignore completo y validado
[ ] PR creado y merged a main
[ ] Tag de version creado
[ ] Commit de deploy presente en main

Tiempo acumulado objetivo: <= 5 minutos
```

---

## FASE 3 — VERCEL: DEPLOY AUTOMATICO

**Duracion objetivo:** 3-5 minutos

### 3.1 Crear proyecto en Vercel (si no existe)

**API:** `POST https://api.vercel.com/v10/projects?teamId={{VERCEL_TEAM_ID}}`

```json
{
  "name": "{{cliente_slug}}",
  "framework": "astro",
  "gitRepository": {
    "type": "github",
    "repo": "AddendoGrowthPartner/{{repo_nombre}}",
    "productionBranch": "main"
  },
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci --prefer-offline --no-audit",
  "devCommand": "npm run dev",
  "rootDirectory": null,
  "nodeVersion": "22.x"
}
```

**Respuesta esperada:** `id`, `name`, `accountId`

### 3.2 Configurar variables de entorno

**Regla absoluta:** NUNCA hardcodear variables en el codigo. Siempre en Vercel Environment Variables.

**API:** `POST https://api.vercel.com/v10/projects/{{project_id}}/env?teamId={{VERCEL_TEAM_ID}}`

**Variables tipicas a configurar:**

```json
[
  {
    "key": "PUBLIC_GA4_ID",
    "value": "{{ga4_measurement_id}}",
    "type": "plain",
    "target": ["production", "preview", "development"]
  },
  {
    "key": "PUBLIC_META_PIXEL_ID",
    "value": "{{meta_pixel_id}}",
    "type": "plain",
    "target": ["production", "preview"]
  },
  {
    "key": "PUBLIC_GHL_FORM_ENDPOINT",
    "value": "{{ghl_form_webhook_url}}",
    "type": "encrypted",
    "target": ["production", "preview"]
  },
  {
    "key": "GHL_API_KEY",
    "value": "{{ghl_api_key}}",
    "type": "encrypted",
    "target": ["production"]
  },
  {
    "key": "RESEND_API_KEY",
    "value": "{{resend_key}}",
    "type": "encrypted",
    "target": ["production"]
  }
]
```

**Convenciones de naming:**

```
PUBLIC_*    -> Variables expuestas al cliente (cliente puede verlas en el JS)
(sin PUBLIC) -> Variables solo del servidor (encrypted)

Las variables con datos sensibles DEBEN ser type: "encrypted"
```

### 3.3 Trigger de deploy

**API:** `POST https://api.vercel.com/v13/deployments?teamId={{VERCEL_TEAM_ID}}`

```json
{
  "name": "{{cliente_slug}}",
  "project": "{{project_id}}",
  "target": "production",
  "gitSource": {
    "type": "github",
    "repoId": "{{github_repo_id}}",
    "ref": "main"
  }
}
```

**Polling de estado hasta que complete:**

```
GET https://api.vercel.com/v13/deployments/{{deployment_id}}?teamId={{VERCEL_TEAM_ID}}

Estados posibles:
  - QUEUED: Esperando en cola
  - BUILDING: Compilando
  - INITIALIZING: Inicializando
  - READY: Deploy exitoso (gate pasado)
  - ERROR: Deploy fallo (gate fallado)
  - CANCELED: Cancelado

Timeout maximo: 10 minutos
Frecuencia de polling: cada 10 segundos
```

**Si estado = ERROR:**

```
ACCION:
  1. GET deployment logs
  2. Capturar error exacto
  3. Notificar a frontend-dev
  4. Estado final: FAILED_DEPLOY
```

### 3.4 URL de preview para revision

**Cuando deployment_status = READY:**

```
preview_url = deployment.url  (ejemplo: cliente-slug-abc123.vercel.app)
```

**Correr PageSpeed sobre preview_url (Fase 1.4):**

```
Si score mobile >= 90 -> continuar a 3.5
Si score mobile < 90 -> detener, notificar, NO apuntar dominio
```

### 3.5 Configurar dominio personalizado

**API:** `POST https://api.vercel.com/v10/projects/{{project_id}}/domains?teamId={{VERCEL_TEAM_ID}}`

**Agregar dominio apex:**

```json
{
  "name": "{{dominio_principal}}"
}
```

**Agregar www:**

```json
{
  "name": "www.{{dominio_principal}}",
  "redirect": "{{dominio_principal}}",
  "redirectStatusCode": 308
}
```

**Respuesta incluye:**

```
verification: [
  { type: "A", name: "@", value: "76.76.21.21" },
  { type: "CNAME", name: "www", value: "cname.vercel-dns.com" }
]
```

**Estos valores se usan en Fase 5 (Cloudflare).**

### 3.6 Configurar redirects

**Via archivo `vercel.json` en el repo:**

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Redirects clave que siempre van:**

```
http -> https      (Vercel lo hace por default)
www -> no-www      (configurado en 3.5)
/index.html -> /   (configurado arriba)
```

### GATE FASE 3

```
[ ] Proyecto Vercel creado y conectado a GitHub
[ ] Variables de entorno configuradas (ninguna en el codigo)
[ ] Deploy status = READY
[ ] Preview URL accesible (HTTP 200)
[ ] PageSpeed mobile >= 90 en preview
[ ] Dominio principal agregado
[ ] Redirects configurados (www, https, index.html)

Tiempo acumulado objetivo: <= 10 minutos
```

---

## FASE 4 — GOOGLE INDEXING API: INDEXACION INMEDIATA

**Duracion objetivo:** 1 minuto

### 4.1 Preparar lista de URLs a indexar

**Reglas de priorizacion:**

```
DEPLOY INICIAL (tipo_deploy = "initial"):
  Orden de indexacion:
  1. Homepage (prioridad MAXIMA)
  2. Paginas de servicio principales
  3. Paginas de ciudades/ubicaciones
  4. About / Contact
  5. Resto de paginas

DEPLOY DE ACTUALIZACION (tipo_deploy = "update"):
  Indexar SOLO las URLs modificadas
  Detectar cambios via git diff main..HEAD --name-only

DEPLOY DE BLOG POST (tipo_deploy = "blog-post"):
  1. URL del nuevo articulo
  2. Pagina indice del blog (/blog)
  3. Homepage (porque cambia el "latest posts")
  4. sitemap.xml

DEPLOY HOTFIX (tipo_deploy = "hotfix"):
  Solo URLs afectadas por el fix
```

**Limite diario:**

```
MAX_URLS_PER_DAY = 200
(limite impuesto por Google Indexing API)

Si lista > 200:
  1. Priorizar por las reglas de arriba
  2. Tomar las primeras 200
  3. Programar el resto para el dia siguiente
```

### 4.2 Autenticacion con Service Account

**Requisito previo:** Service Account de Google Cloud con permisos `Owner` en Google Search Console para el dominio.

```bash
# Obtener access token con service account
ACCESS_TOKEN=$(gcloud auth application-default print-access-token)

# O via library (Node.js)
const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON,
  scopes: ['https://www.googleapis.com/auth/indexing']
});
const client = await auth.getClient();
const token = await client.getAccessToken();
```

### 4.3 Notificar URLs a Google

**API:** Google Indexing API
**Endpoint:** `POST https://indexing.googleapis.com/v3/urlNotifications:publish`

**Para cada URL en la lista:**

```bash
curl -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://indexing.googleapis.com/v3/urlNotifications:publish" \
  -d '{
    "url": "https://{{dominio_principal}}/{{path}}",
    "type": "URL_UPDATED"
  }'
```

**Tipos validos:**

```
URL_UPDATED  -> Pagina nueva o modificada (USAR EN 99% DE CASOS)
URL_DELETED  -> Pagina eliminada (solo si realmente se borro)
```

**Batch mode (mas eficiente para muchas URLs):**

```bash
curl -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/http" \
  "https://indexing.googleapis.com/batch" \
  --data-binary @batch_request.txt
```

**Rate limiting:**

```
Delay entre requests: 1 segundo minimo
Maximo concurrencia: 5 requests simultaneos
Si recibe 429 (rate limit): exponential backoff (2s, 4s, 8s, 16s)
```

### 4.4 Verificar recepcion en Search Console

**API:** Google Search Console API
**Endpoint:** `POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`

```json
{
  "inspectionUrl": "https://{{dominio_principal}}/{{path}}",
  "siteUrl": "https://{{dominio_principal}}/"
}
```

**Verificar en la respuesta:**

```
inspectionResult.indexStatusResult.verdict:
  - PASS: URL elegible para indexacion
  - NEUTRAL: Indeterminado
  - FAIL: No elegible (investigar)

inspectionResult.indexStatusResult.coverageState:
  - "Submitted and indexed": Ya indexada
  - "Discovered - currently not indexed": Descubierta pero no indexada todavia
  - "Crawled - currently not indexed": Crawleada pero aun no indexada
```

### 4.5 Enviar sitemap a Google Search Console

**API:** `PUT https://searchconsole.googleapis.com/webmasters/v3/sites/{{encoded_site_url}}/sitemaps/{{encoded_sitemap_url}}`

```bash
SITE_URL_ENCODED=$(python -c "import urllib.parse; print(urllib.parse.quote('https://{{dominio_principal}}/', safe=''))")
SITEMAP_URL_ENCODED=$(python -c "import urllib.parse; print(urllib.parse.quote('https://{{dominio_principal}}/sitemap.xml', safe=''))")

curl -X PUT \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE_URL_ENCODED}/sitemaps/${SITEMAP_URL_ENCODED}"
```

### GATE FASE 4

```
[ ] Lista de URLs priorizada y dentro de limite 200/dia
[ ] Access token obtenido correctamente
[ ] Cada URL retorno 200 en Indexing API
[ ] Sitemap.xml enviado a Search Console
[ ] Al menos homepage confirmada en inspectionResult

Tiempo acumulado objetivo: <= 11 minutos
```

---

## FASE 5 — CLOUDFLARE: DNS Y CDN

**Duracion objetivo:** 2-3 minutos

### 5.1 Obtener Zone ID del dominio

**API:** `GET https://api.cloudflare.com/client/v4/zones?name={{dominio_principal}}`

```bash
curl -X GET \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones?name={{dominio_principal}}"
```

**Si la zona no existe** -> notificar y detener. El cliente debe tener su dominio configurado en Cloudflare previamente (parte del onboarding).

### 5.2 Crear registro A para el dominio apex

**API:** `POST https://api.cloudflare.com/client/v4/zones/{{zone_id}}/dns_records`

```json
{
  "type": "A",
  "name": "{{dominio_principal}}",
  "content": "76.76.21.21",
  "ttl": 1,
  "proxied": true,
  "comment": "Vercel apex — created by agente-deployment"
}
```

**Nota:** `ttl: 1` significa "automatic" en Cloudflare (respeta el TTL de la zona).
**Nota:** `proxied: true` activa el proxy naranja (CDN + proteccion).

### 5.3 Crear registro CNAME para www

```json
{
  "type": "CNAME",
  "name": "www",
  "content": "cname.vercel-dns.com",
  "ttl": 1,
  "proxied": true,
  "comment": "Vercel www — created by agente-deployment"
}
```

### 5.4 Manejar registros existentes

**Si ya existe un registro A o CNAME:**

```
1. GET https://api.cloudflare.com/client/v4/zones/{{zone_id}}/dns_records?name={{dominio}}
2. Si el valor es el mismo -> OK, continuar
3. Si el valor es diferente:
   - Guardar el valor anterior en el log (para rollback)
   - PATCH el registro con el nuevo valor
4. Nunca DELETE un registro existente sin confirmacion
```

### 5.5 Configurar SSL/TLS a Full (Strict)

**API:** `PATCH https://api.cloudflare.com/client/v4/zones/{{zone_id}}/settings/ssl`

```json
{
  "value": "strict"
}
```

**Niveles posibles:**

```
off      -> NO usar nunca
flexible -> NO usar (cliente HTTPS, origen HTTP, riesgo MITM)
full     -> Aceptable si el certificado origen es self-signed
strict   -> OBLIGATORIO en produccion (Vercel tiene cert valido)
```

### 5.6 Activar Always Use HTTPS

```bash
curl -X PATCH \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/{{zone_id}}/settings/always_use_https" \
  -d '{"value":"on"}'
```

### 5.7 Activar HSTS

```bash
curl -X PATCH \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/{{zone_id}}/settings/security_header" \
  -d '{
    "value": {
      "strict_transport_security": {
        "enabled": true,
        "max_age": 31536000,
        "include_subdomains": true,
        "preload": true,
        "nosniff": true
      }
    }
  }'
```

### 5.8 Configurar cache rules

**API:** `POST https://api.cloudflare.com/client/v4/zones/{{zone_id}}/rulesets/phases/http_request_cache_settings/entrypoint`

```json
{
  "rules": [
    {
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true,
        "edge_ttl": {
          "mode": "override_origin",
          "default": 31536000
        },
        "browser_ttl": {
          "mode": "override_origin",
          "default": 31536000
        }
      },
      "expression": "(http.request.uri.path matches \"\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot|css|js|mp4|webm)$\")",
      "description": "Cache assets estaticos por 1 ano"
    },
    {
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true,
        "edge_ttl": {
          "mode": "override_origin",
          "default": 3600
        }
      },
      "expression": "(http.request.uri.path matches \"\\.html$\" or http.request.uri.path eq \"/\")",
      "description": "Cache HTML por 1 hora"
    }
  ]
}
```

### 5.9 Page Rules criticos

**Forzar HTTPS (redundante con Always Use HTTPS pero explicito):**

```json
{
  "targets": [
    {
      "target": "url",
      "constraint": {
        "operator": "matches",
        "value": "http://*{{dominio_principal}}/*"
      }
    }
  ],
  "actions": [
    {
      "id": "always_use_https"
    }
  ],
  "priority": 1,
  "status": "active"
}
```

### 5.10 Activar optimizaciones adicionales

```bash
# Brotli compression
curl -X PATCH -H "Authorization: Bearer ${CF_TOKEN}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/brotli" \
  -d '{"value":"on"}'

# Auto Minify (CSS, JS, HTML)
curl -X PATCH -H "Authorization: Bearer ${CF_TOKEN}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/minify" \
  -d '{"value":{"css":"on","html":"on","js":"on"}}'

# Rocket Loader (JS async)
curl -X PATCH -H "Authorization: Bearer ${CF_TOKEN}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/rocket_loader" \
  -d '{"value":"on"}'

# Early Hints
curl -X PATCH -H "Authorization: Bearer ${CF_TOKEN}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/early_hints" \
  -d '{"value":"on"}'
```

### 5.11 Esperar propagacion DNS

```bash
# Verificar propagacion cada 15 segundos hasta que resuelva a Cloudflare
MAX_WAIT=300  # 5 minutos max
ELAPSED=0
while [ $ELAPSED -lt $MAX_WAIT ]; do
  RESOLVED=$(dig +short {{dominio_principal}} @1.1.1.1)
  if [ -n "$RESOLVED" ]; then
    break
  fi
  sleep 15
  ELAPSED=$((ELAPSED+15))
done
```

### GATE FASE 5

```
[ ] Registro A apex apuntando a 76.76.21.21
[ ] Registro CNAME www apuntando a cname.vercel-dns.com
[ ] SSL/TLS = strict
[ ] Always Use HTTPS = on
[ ] HSTS activo con max-age >= 1 ano
[ ] Cache rules para assets estaticos
[ ] Brotli + Minify + Rocket Loader activos
[ ] DNS propagado (dig responde)

Tiempo acumulado objetivo: <= 13 minutos
```

---

## FASE 6 — POST-DEPLOYMENT: VERIFICACIONES FINALES

**Duracion objetivo:** 1-2 minutos

### 6.1 Confirmar que el sitio carga en mobile y desktop

**Playwright/headless browser check:**

```javascript
// Pseudocodigo
const browser = await playwright.chromium.launch();

// Test mobile
const mobileContext = await browser.newContext({
  viewport: { width: 375, height: 667 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)...'
});
const mobilePage = await mobileContext.newPage();
const mobileResponse = await mobilePage.goto('https://{{dominio_principal}}');

ASSERT(mobileResponse.status() === 200);
ASSERT(await mobilePage.title() !== '');
const mobileScreenshot = await mobilePage.screenshot({ fullPage: true });

// Test desktop
const desktopContext = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});
const desktopPage = await desktopContext.newPage();
const desktopResponse = await desktopPage.goto('https://{{dominio_principal}}');

ASSERT(desktopResponse.status() === 200);
const desktopScreenshot = await desktopPage.screenshot({ fullPage: true });

await browser.close();
```

**Guardar ambos screenshots en Google Drive (ver Fase 7.1).**

### 6.2 Confirmar formularios conectados a GHL

**Para cada formulario detectado en la pagina:**

```javascript
// Detectar formularios
const forms = await page.$$eval('form', forms => forms.map(f => ({
  action: f.action,
  method: f.method,
  id: f.id,
  name: f.name,
  fields: Array.from(f.elements).map(e => ({ name: e.name, type: e.type }))
})));

// Cada formulario debe cumplir:
for (const form of forms) {
  ASSERT(
    form.action.includes('ghl') ||
    form.action.includes('gohighlevel') ||
    form.action.includes('/api/forms') ||
    form.action.startsWith('https://services.leadconnectorhq.com')
  );
}
```

**Test de envio con dato falso (ambiente de test):**

```javascript
// Solo en modo "initial" deploy — evitar spamear el pipeline con data de test
if (tipo_deploy === 'initial') {
  await page.fill('input[name="name"]', 'TEST - Agente Deployment');
  await page.fill('input[name="email"]', 'test-deploy@addendo.io');
  await page.fill('input[name="phone"]', '+10000000000');
  await page.fill('textarea[name="message"]', 'Test automatico de deployment');
  await page.click('button[type="submit"]');
  
  // Esperar respuesta exitosa
  await page.waitForSelector('.success, .thank-you, [data-success]', { timeout: 10000 });
}
```

**Nota:** En GHL, esos leads deben ser taggeados con "test-deploy" y filtrados automaticamente del pipeline real.

### 6.3 Confirmar GA4 disparando eventos

**Interceptar requests a Google Analytics:**

```javascript
const analyticsRequests = [];
page.on('request', req => {
  const url = req.url();
  if (url.includes('google-analytics.com') || url.includes('analytics.google.com')) {
    analyticsRequests.push(url);
  }
});

await page.goto('https://{{dominio_principal}}');
await page.waitForTimeout(3000);

ASSERT(analyticsRequests.length > 0);
ASSERT(analyticsRequests.some(url => url.includes('collect') || url.includes('g/collect')));
ASSERT(analyticsRequests.some(url => url.includes('{{ga4_measurement_id}}')));
```

**Validacion adicional via GA4 Realtime API (si esta disponible):**

```
GET https://analyticsdata.googleapis.com/v1beta/properties/{{property_id}}:runRealtimeReport

Verificar: al menos 1 activeUser en los ultimos 5 minutos
```

### 6.4 Confirmar Meta Pixel activo (si aplica)

```javascript
if (meta_pixel_id) {
  const pixelRequests = [];
  page.on('request', req => {
    const url = req.url();
    if (url.includes('facebook.com/tr') || url.includes('connect.facebook.net')) {
      pixelRequests.push(url);
    }
  });
  
  await page.goto('https://{{dominio_principal}}');
  await page.waitForTimeout(3000);
  
  ASSERT(pixelRequests.some(url => url.includes(meta_pixel_id)));
  ASSERT(pixelRequests.some(url => url.includes('PageView')));
}
```

### 6.5 PageSpeed final en produccion

**Correr PageSpeed sobre la URL de produccion (no preview):**

```
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeedTest
  ?url=https://{{dominio_principal}}
  &strategy=MOBILE
  &category=PERFORMANCE
  &category=SEO
  &category=BEST_PRACTICES
  &category=ACCESSIBILITY
```

**Gate final:**

```
ASSERT: performance_mobile >= 90
ASSERT: seo_mobile >= 95
ASSERT: accessibility_mobile >= 90
ASSERT: best_practices_mobile >= 90
```

**Correr tambien desktop:**

```
&strategy=DESKTOP

ASSERT: performance_desktop >= 95
```

### 6.6 Screenshots de confirmacion

**Capturas obligatorias:**

```
1. Homepage mobile (375x667)
2. Homepage desktop (1920x1080)
3. Pagina de servicio principal (mobile + desktop)
4. Formulario de contacto (mobile)
5. Screenshot del PageSpeed dashboard
```

**Guardar en `/deploys/{{cliente_slug}}/{{fecha_ISO}}/` en Google Drive.**

### GATE FASE 6

```
[ ] Sitio carga HTTP 200 en mobile y desktop
[ ] Al menos 1 formulario conectado a GHL y funciona
[ ] GA4 disparando pageview y event collect
[ ] Meta Pixel activo (si aplica)
[ ] PageSpeed mobile >= 90 en produccion
[ ] 5 screenshots capturados

Tiempo acumulado objetivo: <= 14 minutos
```

---

## FASE 7 — REGISTRO Y NOTIFICACION

**Duracion objetivo:** 1 minuto

### 7.1 Guardar registro en Google Drive

**API:** Google Drive API v3
**Estructura de carpetas:**

```
/Addendo/Clientes/{{cliente_nombre}}/deploys/
  |- {{fecha_ISO}}_{{tipo_deploy}}/
      |- deploy-report.json
      |- pagespeed-mobile.json
      |- pagespeed-desktop.json
      |- screenshot-home-mobile.png
      |- screenshot-home-desktop.png
      |- screenshot-service-mobile.png
      |- screenshot-contact-mobile.png
      |- screenshot-pagespeed.png
      |- build.log
      |- indexed-urls.txt
```

**Contenido de `deploy-report.json`:**

```json
{
  "cliente": "{{cliente_nombre}}",
  "cliente_slug": "{{cliente_slug}}",
  "tipo_deploy": "{{tipo_deploy}}",
  "version": "v{{version}}",
  "fecha_inicio_ISO": "{{fecha_inicio}}",
  "fecha_fin_ISO": "{{fecha_fin}}",
  "duracion_segundos": {{duracion}},
  "estado": "SUCCESS",
  "url_produccion": "https://{{dominio_principal}}",
  "url_preview": "{{preview_url}}",
  "github": {
    "repo": "AddendoGrowthPartner/{{repo_nombre}}",
    "commit_sha": "{{sha}}",
    "branch": "main",
    "tag": "v{{version}}",
    "pr_url": "{{pr_url}}"
  },
  "vercel": {
    "project_id": "{{vercel_project_id}}",
    "deployment_id": "{{deployment_id}}",
    "deployment_url": "{{deployment_url}}",
    "domains": ["{{dominio_principal}}", "www.{{dominio_principal}}"]
  },
  "cloudflare": {
    "zone_id": "{{zone_id}}",
    "dns_records_created": [
      { "type": "A", "name": "@", "value": "76.76.21.21" },
      { "type": "CNAME", "name": "www", "value": "cname.vercel-dns.com" }
    ],
    "ssl_mode": "strict",
    "optimizations": ["brotli", "minify", "rocket_loader", "early_hints"]
  },
  "google_indexing": {
    "urls_submitted": {{num_urls}},
    "urls_accepted": {{num_accepted}},
    "sitemap_submitted": true
  },
  "pagespeed": {
    "mobile": {
      "performance": {{score_mobile_perf}},
      "seo": {{score_mobile_seo}},
      "accessibility": {{score_mobile_a11y}},
      "best_practices": {{score_mobile_bp}},
      "lcp_seconds": {{lcp}},
      "cls": {{cls}},
      "inp_ms": {{inp}}
    },
    "desktop": {
      "performance": {{score_desktop_perf}}
    }
  },
  "verificaciones_finales": {
    "sitio_carga_mobile": true,
    "sitio_carga_desktop": true,
    "formularios_ghl": true,
    "ga4_activo": true,
    "meta_pixel_activo": {{true_o_false}}
  }
}
```

### 7.2 Actualizar config.json del cliente

**Ubicacion:** `/Addendo/Clientes/{{cliente_nombre}}/config.json` en Google Drive

**Lectura + merge + escritura:**

```json
{
  "cliente_nombre": "{{cliente_nombre}}",
  "cliente_slug": "{{cliente_slug}}",
  "dominio": "{{dominio_principal}}",
  "fecha_primer_deploy_ISO": "{{fecha_primer_deploy}}",
  "fecha_ultimo_deploy_ISO": "{{fecha_ahora}}",
  "version_actual": "v{{version}}",
  "vercel_project_id": "{{vercel_project_id}}",
  "github_repo": "AddendoGrowthPartner/{{repo_nombre}}",
  "cloudflare_zone_id": "{{zone_id}}",
  "ghl_subcuenta_id": "{{ghl_subcuenta_id}}",
  "ga4_id": "{{ga4_measurement_id}}",
  "meta_pixel_id": "{{meta_pixel_id}}",
  "historial_deploys": [
    {
      "fecha_ISO": "{{fecha_ahora}}",
      "tipo": "{{tipo_deploy}}",
      "version": "v{{version}}",
      "pagespeed_mobile": {{score}}
    }
  ]
}
```

**Importante:** `historial_deploys` es un array que crece con cada deploy. Nunca sobreescribir, siempre hacer append.

### 7.3 Notificar a Jose via Gmail

**API:** Gmail API
**Endpoint:** `POST https://gmail.googleapis.com/gmail/v1/users/me/messages/send`

**Email estructurado:**

```
Para: jose@addendo.io
De: agente-deployment@addendo.io
Asunto: [DEPLOY OK] {{cliente_nombre}} — v{{version}} — {{tipo_deploy}}

---

Deploy completado exitosamente.

CLIENTE: {{cliente_nombre}}
TIPO: {{tipo_deploy}}
VERSION: v{{version}}
DURACION: {{duracion_minutos}} minutos

URL LIVE: https://{{dominio_principal}}

SCORES PAGESPEED (mobile):
  Performance: {{score}}/100
  SEO: {{score}}/100
  Accessibility: {{score}}/100
  Best Practices: {{score}}/100

URLS INDEXADAS: {{num_urls}}
SITEMAP ENVIADO: SI

VERIFICACIONES FINALES:
  [OK] Sitio carga mobile + desktop
  [OK] Formularios conectados a GHL
  [OK] GA4 disparando eventos
  [{{OK/N/A}}] Meta Pixel activo

ENLACES:
  Preview: {{preview_url}}
  GitHub PR: {{pr_url}}
  Vercel dashboard: https://vercel.com/addendo-growth-partner/{{cliente_slug}}
  Search Console: https://search.google.com/search-console?resource_id=sc-domain:{{dominio_principal}}
  Reporte completo: {{drive_folder_url}}

---
Generado automaticamente por agente-deployment (#45)
```

**Si tipo_deploy = "blog-post", enviar email adicional a copywriting-seo (#16):**

```
Asunto: [BLOG PUBLICADO] {{titulo_articulo}}
```

### 7.4 Rollback automatico si algo falla

**Trigger de rollback:**

```
CONDICIONES PARA ROLLBACK AUTOMATICO:
  1. Deploy status = ERROR
  2. PageSpeed final < 90 mobile
  3. Sitio retorna HTTP 5xx en Fase 6.1
  4. Formularios no responden en Fase 6.2
  5. GA4 no dispara en Fase 6.3
  6. Cualquier excepcion no manejada en Fases 3-6
```

**Comando de rollback — Vercel:**

**API:** `POST https://api.vercel.com/v13/deployments/{{previous_deployment_id}}/promote?teamId={{team_id}}`

```bash
# 1. Obtener la lista de deployments previos
PREVIOUS_DEPLOYMENT_ID=$(curl -s \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&target=production&state=READY&limit=2" \
  | jq -r '.deployments[1].uid')

# 2. Promover el deployment anterior a produccion
curl -X POST \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v13/deployments/${PREVIOUS_DEPLOYMENT_ID}/promote?teamId=${VERCEL_TEAM_ID}"
```

**Comando de rollback — GitHub (revert del merge):**

```bash
git checkout main
git pull origin main
git revert --no-edit HEAD  # revert del ultimo commit (squash merge)
git push origin main
```

**Comando de rollback — DNS (solo si fue cambio de DNS):**

```
1. Leer config.json del cliente
2. Recuperar valores previos guardados en el log
3. PATCH los registros DNS a los valores anteriores
```

**Notificacion de rollback:**

```
Asunto: [ROLLBACK EJECUTADO] {{cliente_nombre}} — {{fecha}}

Deploy fallo y se ejecuto rollback automatico.

CLIENTE: {{cliente_nombre}}
DEPLOY FALLIDO: v{{version_fallida}}
REVERTIDO A: v{{version_previa}}

RAZON DE FALLO:
{{descripcion_error}}

EVIDENCIA:
- Log completo: {{drive_log_url}}
- Screenshots del error: {{drive_screenshots_url}}
- Build log: {{build_log_url}}

ESTADO ACTUAL:
- URL live: https://{{dominio_principal}} (version {{version_previa}} activa)
- Servicio restaurado en {{segundos}} segundos
- Cliente NO fue afectado

PROXIMOS PASOS:
1. Revisar el error
2. Corregir en rama develop
3. Reintentar deploy cuando este listo

---
agente-deployment (#45)
```

### GATE FASE 7

```
[ ] Reporte guardado en Google Drive
[ ] config.json del cliente actualizado
[ ] Email de confirmacion enviado a Jose
[ ] Historial de deploys actualizado
[ ] (Si aplica) Rollback ejecutado exitosamente

Tiempo total objetivo: <= 15 minutos
```

---

## MATRIZ DE ERRORES Y ACCIONES

| Fase | Error | Severidad | Accion |
|------|-------|-----------|--------|
| 1.2 | npm run build falla | CRITICA | STOP + notificar frontend-dev |
| 1.3 | Credencial expuesta en codigo | CRITICA | STOP + notificar seguridad + git filter-branch |
| 1.4 | PageSpeed < 90 en preview | ALTA | STOP + notificar frontend-dev + NO apuntar dominio |
| 1.5 | Meta tags SEO incompletos | ALTA | STOP + notificar copywriting |
| 1.6 | sitemap.xml faltante | ALTA | STOP + generar o notificar |
| 1.7 | robots.txt mal configurado | ALTA | STOP + notificar |
| 2.1 | No se puede crear repo | CRITICA | STOP + verificar permisos GitHub |
| 2.5 | PR checks rojos | ALTA | STOP + investigar |
| 3.3 | Deploy Vercel = ERROR | CRITICA | STOP + capturar logs + notificar |
| 3.5 | Dominio ya usado en otro proyecto | ALTA | Verificar con Jose antes de forzar |
| 4.3 | Indexing API 429 | MEDIA | Backoff exponencial + reintentar |
| 4.3 | Indexing API 403 | ALTA | Verificar service account permisos en Search Console |
| 5.1 | Zona no existe en Cloudflare | CRITICA | STOP + cliente debe agregar dominio a Cloudflare |
| 5.4 | Registro DNS conflictivo | ALTA | Confirmar con Jose antes de sobreescribir |
| 6.1 | Sitio no carga en mobile | CRITICA | ROLLBACK automatico |
| 6.2 | Formulario no responde | ALTA | ROLLBACK automatico |
| 6.3 | GA4 no dispara | MEDIA | Notificar pero no rollback |
| 6.5 | PageSpeed final < 90 | ALTA | ROLLBACK automatico |
| 7.3 | Gmail API falla | BAJA | Reintentar + log a Drive |

---

## REGLAS MAESTRAS DEL SKILL

1. **Nunca exceder 15 minutos desde inicio hasta fin del deploy exitoso.** Si una fase tarda mas de su objetivo, investigar el cuello de botella.

2. **Nunca hacer push directo a main.** Siempre via PR desde develop, incluso en casos urgentes.

3. **Nunca hardcodear credenciales en el codigo.** Todas las variables sensibles van en Vercel Environment Variables con tipo "encrypted".

4. **Nunca apuntar el dominio principal si el preview no pasa PageSpeed >= 90 mobile.**

5. **Siempre ejecutar rollback automatico** si Fase 6 detecta que el sitio no funciona correctamente en produccion.

6. **Siempre guardar evidencia (screenshots, logs, reportes)** en Google Drive despues de cada deploy, exitoso o fallido.

7. **Siempre notificar a Jose** al finalizar (exitoso) o al fallar (con contexto completo).

8. **Nunca borrar un DNS existente sin confirmacion.** Usar PATCH, no DELETE.

9. **Nunca saltar las verificaciones de seguridad de Fase 1.3.** El escaneo de credenciales es no-negociable.

10. **Respetar el limite de 200 URLs/dia de Google Indexing API.** Si hay mas, priorizar y programar el resto para el dia siguiente.

11. **Usar siempre SSL/TLS Full (Strict) en Cloudflare.** Nunca Flexible — expone a MITM.

12. **Todo cambio debe quedar versionado con tag SemVer.** Para poder revertir a versiones exactas.

13. **El rollback debe poder ejecutarse en un solo comando** (Vercel promote previous deployment).

14. **El agente no toma decisiones ambiguas.** Si hay duda, STOP y notificar a Jose — nunca "improvisar".

15. **Tiempo = calidad de servicio.** Un deploy rapido sin verificaciones es un deploy malo. Las verificaciones no son opcionales.
