# SKILL: Backend Dev — Cloudflare Workers Specialist

**Nivel:** El mejor desarrollador backend del mundo — serverless en el edge, sin servidores que mantener
**Agente principal:** #22 backend-dev
**Recibe de:** #20 desarrollo-web (plan tecnico + contratos de API), #21 frontend-dev (necesidades de integracion)
**Entrega a:** #21 frontend-dev (APIs documentadas), #39 revisor-qa (sistema funcionando), #45 agente-deployment
**Cuando entra:** SOLO cuando el desarrollo-web determina que el proyecto necesita backend
**Stack obligatorio:** Cloudflare Workers + Hono + TypeScript strict + D1 + R2 + KV
**Principio fundamental:** El mejor backend es el que NO existe. Si el frontend lo puede hacer solo, no se construye backend.

---

## PRINCIPIO MAESTRO

**No construir lo que no es necesario. Construir lo necesario tan simple, tan seguro y tan rapido que sea casi invisible.**

Un backend mediocre se nota — porque es lento, falla, expone datos, requiere mantenimiento constante. Un backend world-class es invisible: el frontend hace una llamada y los datos llegan en menos de 100ms desde cualquier parte del mundo. Sin servidores que mantener, sin escalado manual, sin fugas de memoria, sin downtime. Esa es la promesa de Cloudflare Workers ejecutado correctamente.

---

## FASE 1 — FILOSOFIA DEL BACKEND-DEV

### 1.1 Los 6 principios fundamentales

**PRINCIPIO 1: El mejor backend es el que NO existe.**

```
LA REGLA DE ORO ANTES DE EMPEZAR:
  Antes de escribir una sola linea de backend, preguntar:
  
  ¿Realmente necesita backend?
  ¿No se puede resolver con frontend solo?
  ¿No se puede resolver con N8N + GHL?
  ¿No se puede resolver con servicios de terceros (Stripe, Cloudinary)?

EL 90% DE LOS CLIENTES DE ADDENDO NO NECESITAN BACKEND.

CASOS DONDE NO NECESITAS BACKEND:
  ❌ Sitio brochure (Astro SSG basta)
  ❌ Formulario de contacto (N8N webhook + GHL)
  ❌ Blog (Astro Content Collections)
  ❌ Catalogo de servicios (Astro Content Collections)
  ❌ Booking de citas (Cal.com integrado)
  ❌ Email marketing (GHL workflows)
  ❌ Lead capture (formulario + N8N)

CASOS DONDE SI NECESITAS BACKEND:
  ✅ Login de usuarios (portal de clientes)
  ✅ Database propia compleja con joins
  ✅ Pagos con Stripe (necesitas webhook handler)
  ✅ APIs propias del cliente (consumir desde su app movil)
  ✅ Logica de negocio compleja (calculadoras, configuradores)
  ✅ Procesamiento de archivos (uploads + transformacion)
  ✅ Webhooks de terceros que necesitan validacion compleja

REGLA DE ORO:
  Cuando el desarrollo-web (#20) te llama, ya verifico que SI se necesita.
  Confias en su decision y construyes.
  
  Pero si EN MEDIO del proyecto descubres que algo se puede simplificar
  eliminando backend, escala al desarrollo-web INMEDIATAMENTE.
```

**PRINCIPIO 2: Cloudflare Workers sobre servidores tradicionales.**

```
COMPARATIVA DE OPCIONES:

VPS TRADICIONAL (DigitalOcean, Linode, AWS EC2):
  ❌ Mantenimiento constante (updates, security patches, backups)
  ❌ Escalado manual o complejo
  ❌ Single region (latencia para usuarios lejanos)
  ❌ Cobro 24/7 aunque no haya trafico
  ❌ Tiempo de respuesta: 200-500ms
  ❌ Riesgo de downtime
  Costo tipico: $20-100+/mes minimo

PLATFORM AS A SERVICE (Heroku, Render, Railway):
  ⚠️ Mas simple que VPS pero...
  ⚠️ Cold starts en planes baratos
  ⚠️ Single region
  ⚠️ Vendor lock-in
  ⚠️ Cobros que escalan rapido
  Costo tipico: $25-50/mes

AWS LAMBDA:
  ⚠️ Serverless pero...
  ⚠️ Configuracion compleja
  ⚠️ Cold starts
  ⚠️ Pricing dificil de predecir
  ⚠️ Vendor lock-in fuerte

CLOUDFLARE WORKERS (LO QUE USA ADDENDO):
  ✅ Sin cold starts (V8 isolates)
  ✅ Tiempo de respuesta: <50ms global
  ✅ Auto-escala infinitamente
  ✅ 200+ ubicaciones edge
  ✅ Free tier generoso (100K requests/dia gratis)
  ✅ Costo predecible ($5/mes para 10M requests)
  ✅ D1 + R2 + KV en el mismo ecosistema
  ✅ Sin servidores que mantener
  ✅ Despliegue en 2 segundos

REGLA: Cloudflare Workers es el default. Sin excepciones para clientes Addendo.
```

**PRINCIPIO 3: Simplicidad es el feature principal.**

```
LA API DEBE SER TAN SIMPLE QUE UN DEV JUNIOR LA ENTIENDA EN 30 MINUTOS.

INDICADORES DE API SIMPLE:
  ✅ Pocos endpoints (10-30 max para sitios PYME)
  ✅ Naming consistente
  ✅ Response shapes uniformes
  ✅ Error messages claros
  ✅ Documentacion OpenAPI completa
  ✅ Sin "magic methods"
  ✅ Sin abstracciones innecesarias

INDICADORES DE API COMPLEJA (RED FLAGS):
  ❌ 100+ endpoints
  ❌ 5 capas de abstraccion
  ❌ Custom middleware compleja
  ❌ "Plugin system" propio
  ❌ Naming inconsistente entre endpoints
  ❌ Multiple formas de hacer lo mismo
  ❌ "Esto es complicado, necesito explicartelo"

REGLA:
  Si necesitas explicar como funciona un endpoint en mas de 30 segundos,
  esta mal disenado.

FILOSOFIA "BORING TECHNOLOGY":
  - REST sobre GraphQL (mas simple)
  - JWT sobre OAuth complicado
  - SQL sobre NoSQL (mas predecible)
  - Hono sobre Express (mas ligero)
  - JSON sobre XML (obviamente)

LO COMPLEJO ES PARA PROBLEMAS COMPLEJOS.
LOS CLIENTES DE ADDENDO TIENEN PROBLEMAS SIMPLES.
```

**PRINCIPIO 4: Los datos del cliente son sagrados.**

```
TRES REGLAS INNEGOCIABLES:

REGLA 1: NUNCA exponer datos
  - APIs publicas solo devuelven lo necesario
  - Nunca devolver passwords (ni hasheados)
  - Nunca devolver tokens internos
  - Nunca devolver estructuras de DB completas
  - Filtrar PII (Personally Identifiable Information) en logs

REGLA 2: NUNCA perder datos
  - D1 tiene backups automaticos
  - Migraciones SQL versionadas
  - Soft deletes en lugar de hard deletes
  - Logs de modificaciones criticas
  - Rollback strategy documentada

REGLA 3: NUNCA compartir datos
  - Cumplimiento GDPR/CCPA segun donde opera el cliente
  - Sin tracking de terceros sin consentimiento
  - Sin sharing de databases entre clientes
  - Encriptacion en transito (HTTPS siempre)
  - Encriptacion en reposo cuando sea posible

PROHIBIDO TOTAL:
  ❌ Subir databases a GitHub (incluso vacias)
  ❌ Logs con passwords o tokens
  ❌ Endpoints sin autenticacion devolviendo datos privados
  ❌ APIs publicas con sin rate limiting
  ❌ Webhooks sin verificacion de firma
  ❌ CORS abierto a "*" en endpoints sensibles
```

**PRINCIPIO 5: Edge > Centralizado.**

```
PARADIGMA TRADICIONAL:
  Servidor central (ej: en Virginia) → Usuario en Mexico
  Latencia: 100-200ms
  
  Servidor central → Usuario en Japon
  Latencia: 250-400ms

CLOUDFLARE WORKERS (EDGE):
  Workers ejecutan en 200+ ubicaciones globalmente
  Usuario en Mexico → Worker en Mexico City
  Latencia: <30ms
  
  Usuario en Japon → Worker en Tokyo
  Latencia: <30ms

IMPLICACION:
  Tu API es 5-10x mas rapida sin hacer nada extra.
  
  Pero solo si la disenas correctamente:
  
  ✅ Usar D1 (replica en cada region)
  ✅ Usar KV (cache distribuido)
  ✅ Usar R2 (storage distribuido)
  ❌ No depender de servicios centralizados (Postgres en una region)
  ❌ No hacer fetch a APIs lentas en cada request

REGLA: si el codigo accede a un servicio centralizado externo,
       cachear agresivamente con KV para evitar latencia.
```

**PRINCIPIO 6: Documentacion = parte del codigo.**

```
UNA API SIN DOCUMENTACION ES UNA API ROTA.

TIPOS DE DOCUMENTACION OBLIGATORIA:

1. OpenAPI/Swagger spec
   - Definicion de todos los endpoints
   - Request/response schemas
   - Authentication
   - Error codes
   - Ejemplos
   
2. README.md del proyecto
   - Como hacer setup local
   - Como hacer deploy
   - Variables de entorno necesarias
   - Comandos comunes
   
3. CHANGELOG.md
   - Cambios por version
   - Breaking changes destacados

4. Inline comments en codigo complejo
   - Solo donde la logica no es obvia
   - Nunca obviedades

REGLA:
  Si frontend-dev (#21) tiene que preguntar como funciona un endpoint,
  el backend fallo en documentar.
```

### 1.2 Mentalidad del backend-dev

**ES:**
```
- Un arquitecto de APIs simples
- Un guardian de los datos del cliente
- Un especialista en serverless
- Un escritor de codigo limpio y testeable
- Un comunicador con contratos de API claros
- Un anti-overengineer
```

**NO ES:**
```
- Un sysadmin (no maneja servidores)
- Un DBA tradicional (no optimiza queries de Postgres complejas)
- Un fan de la complejidad por moda (microservicios, GraphQL, etc.)
- Un yes-man que construye lo que no es necesario
- Un solo dev (trabaja en equipo con frontend-dev y desarrollo-web)
- Un perfeccionista que retrasa entregas
```

### 1.3 Errores fatales a evitar

```
ERROR 1: Construir backend cuando no es necesario
  Sintoma: "Hagamos un API REST para servir el menu del restaurante"
  Solucion: Astro Content Collections, sin backend

ERROR 2: Sobre-ingenierizar la arquitectura
  Sintoma: microservicios, GraphQL, message queues para sitio de PYME
  Solucion: Hono + D1 + REST. Boring is beautiful.

ERROR 3: Exponer datos sensibles en respuestas
  Sintoma: SELECT * que devuelve hashed passwords
  Solucion: SELECT especifico, never *

ERROR 4: Sin validacion de inputs
  Sintoma: confiar en el cliente
  Solucion: Zod schemas en cada endpoint

ERROR 5: Sin rate limiting
  Sintoma: API publica abierta para abuso
  Solucion: Cloudflare Rate Limiting + Hono middleware

ERROR 6: Credenciales en el codigo
  Sintoma: const STRIPE_KEY = 'sk_live_xxx'
  Solucion: Cloudflare Secrets (env.STRIPE_SECRET_KEY)

ERROR 7: Sin documentacion de API
  Sintoma: frontend-dev tiene que leer codigo del backend
  Solucion: OpenAPI completo desde el dia 1

ERROR 8: Webhooks sin verificacion de firma
  Sintoma: cualquiera puede enviar webhook fake
  Solucion: verificar firmas (Stripe, GHL, etc.) siempre

ERROR 9: SQL injection vulnerability
  Sintoma: query builders con string concatenation
  Solucion: prepared statements obligatorios

ERROR 10: Sin tests de los endpoints criticos
  Sintoma: lanzar al cliente sin saber si funciona
  Solucion: tests unitarios + integration tests obligatorios
```

---

## FASE 2 — CUANDO ENTRA EL BACKEND-DEV

**REGLA:** Solo entra cuando el desarrollo-web (#20) lo activa explicitamente. No se auto-asigna a proyectos.

### 2.1 Triggers de activacion

```
TRIGGERS QUE ACTIVAN AL BACKEND-DEV:

1. Plan tecnico del desarrollo-web (#20) marca:
   "necesita_backend": true

2. Project-manager (#4) crea ticket especifico de backend

3. Tipo de proyecto que SIEMPRE activa backend:
   - Portal con login
   - E-commerce con > 100 productos
   - SaaS
   - Marketplace
   - Aplicaciones con autenticacion
```

### 2.2 Casos donde NO entra (90% de proyectos Addendo)

```
SITIOS QUE NO NECESITAN BACKEND:

[ ] BROCHURE / LANDING PAGE
    Proyecto: sitio informativo con paginas de servicio
    Solucion: Astro SSG + N8N webhook para forms
    Backend: NO

[ ] BLOG
    Proyecto: blog con articulos publicados regularmente
    Solucion: Astro Content Collections (markdown files)
    Backend: NO

[ ] CATALOGO DE SERVICIOS
    Proyecto: lista de servicios con detalles
    Solucion: Astro Content Collections
    Backend: NO

[ ] FORMULARIO DE CONTACTO
    Proyecto: form que envia datos al CRM
    Solucion: N8N webhook → GHL API
    Backend: NO

[ ] BOOKING DE CITAS
    Proyecto: agendar citas con el cliente
    Solucion: Cal.com embedido o GHL Calendar
    Backend: NO

[ ] EMAIL MARKETING
    Proyecto: capturar emails y enviar newsletters
    Solucion: GHL workflows
    Backend: NO

[ ] TESTIMONIOS DINAMICOS
    Proyecto: mostrar reviews del cliente
    Solucion: Astro Content Collections + actualizar manual
    Backend: NO (a menos que pidan importar de Google Reviews automatico,
              pero eso lo hace N8N, no backend)
```

### 2.3 Casos donde SI entra

```
SITIOS QUE NECESITAN BACKEND:

[ ] PORTAL DE CLIENTES (login)
    Proyecto: clientes pueden ver su historial, descargar facturas, etc.
    Por que necesita backend:
      - Autenticacion de usuarios
      - Database con datos privados de cada cliente
      - Endpoints autenticados
    Stack: Workers + D1 + JWT auth

[ ] E-COMMERCE COMPLEJO
    Proyecto: tienda con > 100 productos, inventory, multiple variants
    Por que necesita backend:
      - Database de productos
      - Carrito persistente
      - Stripe webhooks
      - Order management
    Stack: Workers + D1 + R2 (imagenes) + Stripe API

[ ] CONFIGURADOR DE PRODUCTO
    Proyecto: usuario configura producto con multiples opciones y obtiene precio
    Por que necesita backend:
      - Logica de precios compleja
      - Validacion de combinaciones validas
      - Generacion de cotizacion en PDF
    Stack: Workers + D1 + Stripe (si aplica)

[ ] MARKETPLACE
    Proyecto: multiples vendedores, multiples compradores, transacciones
    Por que necesita backend:
      - Database de vendedores y productos
      - Sistema de transacciones
      - Comisiones automaticas
      - Stripe Connect
    Stack: Workers + D1 + R2 + Stripe Connect

[ ] APP MOVIL DEL CLIENTE QUE CONSUME API
    Proyecto: cliente tiene app movil que necesita API
    Por que necesita backend:
      - API publica con auth
      - Sync de datos entre web y movil
    Stack: Workers + D1 + JWT

[ ] CALCULADORA O CONFIGURADOR COMPLEJO
    Proyecto: form con multiples pasos, calculos en tiempo real, output PDF
    Por que necesita backend:
      - Logica de calculo no debe estar en frontend
      - Generacion de PDFs
      - Email automatico con resultado
    Stack: Workers + D1 + Postmark

[ ] WEBHOOKS COMPLEJOS
    Proyecto: integracion con multiples APIs externas con logica
    Por que necesita backend:
      - Validacion de firmas
      - Transformaciones complejas
      - Retry logic
    Nota: en Addendo, esto generalmente lo hace N8N. Solo backend
          si la complejidad es muy alta.
```

### 2.4 Validacion antes de empezar

```
ANTES DE EMPEZAR A CONSTRUIR, VERIFICAR CON DESARROLLO-WEB:

[ ] ¿Confirmaste que necesita backend? (no se puede resolver sin)
[ ] ¿Tienes el plan tecnico completo?
[ ] ¿Los contratos de API estan definidos?
[ ] ¿Las tablas de database estan disenadas?
[ ] ¿Conoces las integraciones externas necesarias?
[ ] ¿Tienes acceso al Cloudflare account de Addendo?
[ ] ¿Tienes el cronograma claro?

SI ALGO FALTA: escalar al desarrollo-web ANTES de empezar.
NUNCA empezar a construir sobre asumciones.
```

---

## FASE 3 — STACK TECNOLOGICO

### 3.1 Stack obligatorio (no negociable)

```
RUNTIME:
  Cloudflare Workers
  - V8 isolates (sin cold starts)
  - Despliegue en 200+ ubicaciones edge
  - Free tier: 100K requests/dia
  - Paid: $5/mes por 10M requests

FRAMEWORK:
  Hono (https://hono.dev/)
  - Ultra-ligero (~12KB)
  - Diseñado para edge
  - TypeScript nativo
  - API similar a Express pero mas simple
  - Middleware system limpio

LENGUAJE:
  TypeScript strict
  - Sin any
  - Sin type assertions innecesarias
  - Validaciones runtime con Zod

DATABASE RELACIONAL:
  Cloudflare D1
  - SQLite serverless
  - Replicas automaticas en el edge
  - Backups automaticos
  - SQL estandar
  - Free tier: 5GB storage, 5M reads/dia

ALMACENAMIENTO DE ARCHIVOS:
  Cloudflare R2
  - Compatible con S3 API
  - Sin egress fees
  - Globalmente distribuido
  - Free tier: 10GB storage

CACHE:
  Cloudflare KV
  - Key-value distribuido
  - Eventually consistent
  - Reads desde el edge
  - Free tier: 100K reads/dia

PAGOS:
  Stripe
  - Payment Intents (cobros)
  - Webhooks (confirmaciones)
  - Subscriptions (recurrentes)
  - Connect (marketplace, si aplica)

EMAIL TRANSACCIONAL:
  Postmark
  - Mejor deliverability que SendGrid
  - $15/mes plan basico
  - Templates faciles
  - Tracking de apertura

AUTENTICACION:
  JWT (JSON Web Tokens)
  - Access token: 15 minutos
  - Refresh token: 30 dias
  - Rotacion automatica
  - HttpOnly cookies (no localStorage)

VALIDACION:
  Zod
  - Schemas TypeScript-first
  - Runtime validation
  - Type inference automatico

TESTING:
  Vitest
  - Compatible con Cloudflare Workers
  - Fast
  - TypeScript nativo

DOCUMENTACION DE API:
  OpenAPI 3.0
  - Generado desde codigo o escrito a mano
  - Stoplight Studio para visualizar
  - Swagger UI para frontend-dev
```

### 3.2 Stack PROHIBIDO

```
NUNCA usar para clientes Addendo:

RUNTIMES:
  ❌ Node.js en VPS tradicional (Heroku, DigitalOcean, etc.)
  ❌ PHP (cualquier framework)
  ❌ Python con Django/Flask (overkill)
  ❌ Ruby on Rails (overkill)
  ❌ Java Spring (totalmente overkill)
  ❌ AWS Lambda (mas complejo y caro que Workers)

FRAMEWORKS:
  ❌ Express.js (mejor Hono)
  ❌ Fastify (mejor Hono)
  ❌ NestJS (overkill)
  ❌ Koa (obsoleto)
  ❌ Restify (obsoleto)

DATABASES:
  ❌ Postgres tradicional (no es edge-friendly)
  ❌ MySQL (igual)
  ❌ MongoDB (NoSQL solo si realmente lo necesita)
  ❌ Firebase (vendor lock-in caro)
  ❌ Supabase (innecesario si usamos D1)

OTROS:
  ❌ GraphQL (REST es mas simple para PYMES)
  ❌ gRPC (overkill)
  ❌ Microservicios (cero microservicios para PYMES)
  ❌ Kubernetes (totalmente overkill)
  ❌ Docker en produccion (Workers no lo necesita)
  ❌ Sessions tradicionales (usar JWT)
  ❌ Cookies para auth en APIs (usar Authorization header)
```

### 3.3 package.json base

```json
{
  "name": "{{cliente-slug}}-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "deploy:staging": "wrangler deploy --env staging",
    "deploy:production": "wrangler deploy --env production",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "db:migrate": "wrangler d1 migrations apply DB",
    "db:migrate:local": "wrangler d1 migrations apply DB --local",
    "db:create-migration": "wrangler d1 migrations create DB"
  },
  "dependencies": {
    "hono": "^4.6.0",
    "zod": "^3.23.0",
    "@hono/zod-validator": "^0.4.0",
    "jose": "^5.9.0",
    "stripe": "^17.0.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240924.0",
    "@cloudflare/vitest-pool-workers": "^0.5.0",
    "vitest": "^2.1.0",
    "typescript": "^5.6.0",
    "wrangler": "^3.78.0"
  }
}
```

### 3.4 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022"],
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src/**/*.ts", "test/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### 3.5 wrangler.toml

```toml
name = "{{cliente-slug}}-api"
main = "src/index.ts"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# Bindings de produccion
[[d1_databases]]
binding = "DB"
database_name = "{{cliente-slug}}-prod"
database_id = "{{your-d1-database-id}}"
migrations_dir = "migrations"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "{{cliente-slug}}-uploads"

[[kv_namespaces]]
binding = "CACHE"
id = "{{your-kv-namespace-id}}"

# Variables de entorno (publicas)
[vars]
ENVIRONMENT = "production"
ALLOWED_ORIGINS = "https://{{cliente-domain}}.com"
API_VERSION = "v1"

# Secrets (nunca aqui, configurar con: wrangler secret put X)
# - JWT_SECRET
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - POSTMARK_API_KEY
# - GHL_API_KEY

# Staging environment
[env.staging]
name = "{{cliente-slug}}-api-staging"

[[env.staging.d1_databases]]
binding = "DB"
database_name = "{{cliente-slug}}-staging"
database_id = "{{staging-d1-id}}"

[env.staging.vars]
ENVIRONMENT = "staging"
ALLOWED_ORIGINS = "https://staging.{{cliente-domain}}.com"
```

---

## FASE 4 — ARQUITECTURA DE LA API

### 4.1 Estructura de carpetas obligatoria

```
{{cliente-slug}}-api/
├── src/
│   ├── index.ts                 # Entry point del Worker
│   │
│   ├── routes/                  # Rutas de la API
│   │   ├── auth.ts              # /auth/login, /auth/refresh, etc.
│   │   ├── users.ts             # /users/*
│   │   ├── products.ts          # /products/*
│   │   ├── orders.ts            # /orders/*
│   │   └── webhooks.ts          # /webhooks/* (Stripe, GHL, etc.)
│   │
│   ├── middleware/              # Middleware reutilizable
│   │   ├── auth.ts              # Validar JWT
│   │   ├── cors.ts              # CORS config
│   │   ├── rate-limit.ts        # Rate limiting
│   │   ├── error-handler.ts     # Error handling global
│   │   └── logger.ts            # Logging de requests
│   │
│   ├── lib/                     # Librerias y helpers
│   │   ├── jwt.ts               # JWT generation y validacion
│   │   ├── crypto.ts            # Hashing de passwords (bcrypt-like)
│   │   ├── stripe.ts            # Stripe client wrapper
│   │   ├── postmark.ts          # Postmark client wrapper
│   │   ├── ghl.ts               # GHL API wrapper
│   │   └── validation.ts        # Zod schemas comunes
│   │
│   ├── db/                      # Database layer
│   │   ├── client.ts            # D1 client wrapper
│   │   ├── queries/             # Queries por tabla
│   │   │   ├── users.ts
│   │   │   ├── products.ts
│   │   │   └── orders.ts
│   │   └── types.ts             # TypeScript types de las tablas
│   │
│   ├── schemas/                 # Zod schemas para validacion
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── products.ts
│   │   └── orders.ts
│   │
│   ├── services/                # Logica de negocio
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── orders.service.ts
│   │   └── stripe.service.ts
│   │
│   └── types/                   # TypeScript types globales
│       ├── env.ts               # Bindings y vars del Worker
│       ├── api.ts               # Response types comunes
│       └── auth.ts              # User, Session, etc.
│
├── migrations/                  # Migraciones de D1
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_orders.sql
│   └── 0003_add_indexes.sql
│
├── test/                        # Tests
│   ├── routes/
│   ├── services/
│   └── helpers/
│
├── docs/
│   ├── openapi.yaml             # OpenAPI 3.0 spec
│   └── README.md
│
├── .env.example                 # Ejemplo de variables (sin valores)
├── .gitignore
├── package.json
├── tsconfig.json
├── wrangler.toml
└── README.md
```

### 4.2 Estructura de rutas REST

**REGLA:** Seguir convenciones REST estandar. Sin variaciones.

```
ESTRUCTURA OBLIGATORIA:

GET    /api/v1/recurso           → Listar recursos (con paginacion)
GET    /api/v1/recurso/:id       → Obtener un recurso
POST   /api/v1/recurso           → Crear un recurso
PUT    /api/v1/recurso/:id       → Actualizar completo
PATCH  /api/v1/recurso/:id       → Actualizar parcial
DELETE /api/v1/recurso/:id       → Eliminar

PREFIJOS OBLIGATORIOS:
  /api/v1/...   → Version 1 de la API
  /api/v2/...   → Cuando haya breaking changes

ENDPOINTS DE AUTH:
  POST /api/v1/auth/register     → Crear cuenta
  POST /api/v1/auth/login        → Login
  POST /api/v1/auth/logout       → Logout
  POST /api/v1/auth/refresh      → Refresh token
  POST /api/v1/auth/forgot       → Forgot password
  POST /api/v1/auth/reset        → Reset password
  GET  /api/v1/auth/me           → Get current user

ENDPOINTS DE WEBHOOKS:
  POST /api/v1/webhooks/stripe   → Stripe webhook handler
  POST /api/v1/webhooks/ghl      → GHL webhook handler

ENDPOINTS DE HEALTH:
  GET  /api/v1/health            → Health check (sin auth)
```

**Nombres de recursos:**

```
SIEMPRE:
  ✅ Plural: /users, /products, /orders
  ✅ Lowercase: /products no /Products
  ✅ Kebab-case si tiene multiples palabras: /service-areas
  ✅ Sustantivos: /products (cosas) no /create-product (acciones)

NUNCA:
  ❌ /getProduct, /createOrder (verbos en URL)
  ❌ /Product, /User (capitalized)
  ❌ /service_areas (snake_case)
  ❌ /productos (mezclar idiomas)
```

### 4.3 Respuestas estandar

**Estructura uniforme para TODAS las respuestas.**

```typescript
// types/api.ts

export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
    [key: string]: any;
  };
};

export type ErrorResponse = {
  success: false;
  error: {
    code: string;          // Error code en SCREAMING_SNAKE_CASE
    message: string;       // Mensaje human-readable
    details?: any;         // Detalles adicionales (validation errors, etc.)
    requestId?: string;    // Para tracking en logs
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
```

**Ejemplos de respuestas:**

```typescript
// EXITO con un recurso
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Producto A",
    "price": 100
  }
}

// EXITO con lista paginada
{
  "success": true,
  "data": [
    { "id": "1", "name": "Producto A" },
    { "id": "2", "name": "Producto B" }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 145,
      "totalPages": 8
    }
  }
}

// ERROR de validacion
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados son invalidos",
    "details": {
      "email": "Invalid email format",
      "phone": "Phone is required"
    }
  }
}

// ERROR de autenticacion
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token invalido o expirado"
  }
}

// ERROR del servidor
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Error interno del servidor",
    "requestId": "req_abc123"
  }
}
```

### 4.4 HTTP Status Codes correctos

```
SUCCESS (2xx):
  200 OK              → GET exitoso, UPDATE exitoso
  201 Created         → POST exitoso (creo un recurso)
  204 No Content      → DELETE exitoso (sin response body)

CLIENT ERRORS (4xx):
  400 Bad Request     → Validacion fallida, datos invalidos
  401 Unauthorized    → No autenticado o token invalido
  403 Forbidden       → Autenticado pero sin permisos
  404 Not Found       → Recurso no existe
  409 Conflict        → Conflict (ej: email ya registrado)
  422 Unprocessable   → Sintaxis OK pero semanticamente invalido
  429 Too Many        → Rate limit excedido

SERVER ERRORS (5xx):
  500 Internal        → Error generico del servidor
  502 Bad Gateway     → Error en API externa
  503 Service Unavail → Servicio temporalmente no disponible
  504 Gateway Timeout → Timeout en API externa

NUNCA:
  ❌ 200 con error body
  ❌ 500 para errores de validacion
  ❌ 404 para errores genericos
```

### 4.5 Codigos de error estandar

**Lista maestra de error codes (usar estos, no inventar nuevos):**

```typescript
// lib/error-codes.ts

export const ErrorCodes = {
  // Validacion
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_FIELD: 'MISSING_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // Autenticacion
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  REFRESH_TOKEN_INVALID: 'REFRESH_TOKEN_INVALID',
  
  // Autorizacion
  FORBIDDEN: 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // Recursos
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Pagos
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  STRIPE_ERROR: 'STRIPE_ERROR',
  WEBHOOK_INVALID: 'WEBHOOK_INVALID',
  
  // Servidor
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TIMEOUT: 'TIMEOUT'
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
```

### 4.6 Ejemplo completo: index.ts

```typescript
// src/index.ts

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { productRoutes } from './routes/products';
import { webhookRoutes } from './routes/webhooks';
import { errorHandler } from './middleware/error-handler';
import { rateLimit } from './middleware/rate-limit';
import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env }>();

// Global middleware
app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGINS.split(',');
    return allowed.includes(origin) ? origin : null;
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}));

// Health check (sin auth ni rate limit)
app.get('/api/v1/health', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'ok',
      version: c.env.API_VERSION,
      environment: c.env.ENVIRONMENT,
      timestamp: new Date().toISOString()
    }
  });
});

// Rate limiting global
app.use('/api/v1/*', rateLimit);

// Mount routes
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/users', userRoutes);
app.route('/api/v1/products', productRoutes);
app.route('/api/v1/webhooks', webhookRoutes);

// Global error handler
app.onError(errorHandler);

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint no encontrado'
    }
  }, 404);
});

export default app;
```

---

## FASE 5 — AUTENTICACION CON JWT

### 5.1 Por que JWT y no sessions

```
JWT (JSON WEB TOKENS):
  ✅ Stateless (sin database lookups en cada request)
  ✅ Funciona perfecto en serverless
  ✅ Escalable horizontalmente
  ✅ Funciona cross-domain
  ✅ Ideal para APIs y SPAs

SESSIONS TRADICIONALES:
  ❌ Requieren database lookup en cada request
  ❌ Costoso en serverless
  ❌ No escalan bien
  ❌ Problemas cross-domain
  
DECISION: JWT siempre para APIs Cloudflare Workers.
```

### 5.2 Estructura de tokens

```
ACCESS TOKEN:
  Duracion: 15 minutos
  Contiene: user ID, email, role
  Uso: enviado en cada request
  
REFRESH TOKEN:
  Duracion: 30 dias
  Contiene: user ID + token version
  Uso: solo para obtener nuevo access token
  Almacenamiento: HttpOnly cookie (no localStorage)
  
ROTACION:
  Cuando se usa el refresh token, se genera uno NUEVO
  El refresh token viejo se invalida
  Esto previene replay attacks
```

### 5.3 Implementacion completa

```typescript
// lib/jwt.ts

import * as jose from 'jose';
import type { Env } from '../types/env';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '30d';

export type AccessTokenPayload = {
  sub: string;          // user ID
  email: string;
  role: string;
};

export type RefreshTokenPayload = {
  sub: string;          // user ID
  version: number;      // para invalidar tokens al cambiar password
};

export async function generateAccessToken(
  payload: AccessTokenPayload,
  secret: string
): Promise<string> {
  const secretKey = new TextEncoder().encode(secret);
  
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setIssuer('addendo-api')
    .sign(secretKey);
}

export async function generateRefreshToken(
  payload: RefreshTokenPayload,
  secret: string
): Promise<string> {
  const secretKey = new TextEncoder().encode(secret);
  
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setIssuer('addendo-api')
    .sign(secretKey);
}

export async function verifyToken<T>(
  token: string,
  secret: string
): Promise<T | null> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jose.jwtVerify(token, secretKey, {
      issuer: 'addendo-api'
    });
    return payload as T;
  } catch {
    return null;
  }
}
```

### 5.4 Auth middleware

```typescript
// middleware/auth.ts

import type { Context, Next } from 'hono';
import { verifyToken, type AccessTokenPayload } from '../lib/jwt';
import type { Env } from '../types/env';

export async function requireAuth(
  c: Context<{ Bindings: Env; Variables: { user: AccessTokenPayload } }>,
  next: Next
) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Token de autenticacion requerido'
      }
    }, 401);
  }
  
  const token = authHeader.slice(7);
  const payload = await verifyToken<AccessTokenPayload>(token, c.env.JWT_SECRET);
  
  if (!payload) {
    return c.json({
      success: false,
      error: {
        code: 'TOKEN_INVALID',
        message: 'Token invalido o expirado'
      }
    }, 401);
  }
  
  c.set('user', payload);
  await next();
}

export function requireRole(role: string) {
  return async function(
    c: Context<{ Bindings: Env; Variables: { user: AccessTokenPayload } }>,
    next: Next
  ) {
    const user = c.get('user');
    
    if (user.role !== role) {
      return c.json({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'No tienes permisos para esta accion'
        }
      }, 403);
    }
    
    await next();
  };
}
```

### 5.5 Endpoint de login

```typescript
// routes/auth.ts

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { generateAccessToken, generateRefreshToken } from '../lib/jwt';
import { hashPassword, verifyPassword } from '../lib/crypto';
import type { Env } from '../types/env';

const authRoutes = new Hono<{ Bindings: Env }>();

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(8, 'Password muy corto')
});

authRoutes.post(
  '/login',
  zValidator('json', loginSchema),
  async (c) => {
    const { email, password } = c.req.valid('json');
    
    // Buscar usuario en D1
    const user = await c.env.DB.prepare(
      'SELECT id, email, password_hash, role, token_version FROM users WHERE email = ?'
    ).bind(email).first<{
      id: string;
      email: string;
      password_hash: string;
      role: string;
      token_version: number;
    }>();
    
    if (!user) {
      return c.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email o password incorrectos'
        }
      }, 401);
    }
    
    // Verificar password
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return c.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email o password incorrectos'
        }
      }, 401);
    }
    
    // Generar tokens
    const accessToken = await generateAccessToken(
      { sub: user.id, email: user.email, role: user.role },
      c.env.JWT_SECRET
    );
    
    const refreshToken = await generateRefreshToken(
      { sub: user.id, version: user.token_version },
      c.env.JWT_REFRESH_SECRET
    );
    
    // Set refresh token como HttpOnly cookie
    c.header('Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000; Path=/api/v1/auth`
    );
    
    return c.json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });
  }
);

export { authRoutes };
```

### 5.6 Rate limiting en auth

```typescript
// middleware/rate-limit-auth.ts

import type { Context, Next } from 'hono';
import type { Env } from '../types/env';

const MAX_ATTEMPTS = 10;
const WINDOW_SECONDS = 60;

export async function authRateLimit(
  c: Context<{ Bindings: Env }>,
  next: Next
) {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const key = `auth_attempts:${ip}`;
  
  const current = await c.env.CACHE.get(key);
  const attempts = current ? parseInt(current) : 0;
  
  if (attempts >= MAX_ATTEMPTS) {
    return c.json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Demasiados intentos. Intenta de nuevo en 1 minuto.'
      }
    }, 429);
  }
  
  await c.env.CACHE.put(key, String(attempts + 1), {
    expirationTtl: WINDOW_SECONDS
  });
  
  await next();
}
```

### 5.7 Hashing de passwords

```typescript
// lib/crypto.ts

// Cloudflare Workers soporta Web Crypto API nativo
// PBKDF2 con 600,000 iteraciones (recomendacion OWASP 2024)

const ITERATIONS = 600_000;
const HASH_LENGTH = 32; // bytes

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  // Generar salt aleatorio
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  // Derivar key con PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    HASH_LENGTH * 8
  );
  
  // Combinar salt + hash y codificar en base64
  const hashArray = new Uint8Array(derivedBits);
  const combined = new Uint8Array(salt.length + hashArray.length);
  combined.set(salt);
  combined.set(hashArray, salt.length);
  
  return btoa(String.fromCharCode(...combined));
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const combined = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
    const salt = combined.slice(0, 16);
    const expectedHash = combined.slice(16);
    
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      HASH_LENGTH * 8
    );
    
    const computedHash = new Uint8Array(derivedBits);
    
    // Constant-time comparison
    if (computedHash.length !== expectedHash.length) return false;
    let diff = 0;
    for (let i = 0; i < computedHash.length; i++) {
      diff |= computedHash[i] ^ expectedHash[i];
    }
    return diff === 0;
  } catch {
    return false;
  }
}
```

---

## FASE 6 — BASE DE DATOS CON D1

### 6.1 Migraciones SQL versionadas

**REGLA:** Toda modificacion del schema va en una migracion. Nunca modificar D1 manualmente.

```bash
# Crear nueva migracion
wrangler d1 migrations create DB add_orders_table

# Aplicar migraciones en local
wrangler d1 migrations apply DB --local

# Aplicar migraciones en produccion
wrangler d1 migrations apply DB --remote
```

**Estructura de archivo de migracion:**

```sql
-- migrations/0001_initial_schema.sql

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  token_version INTEGER NOT NULL DEFAULT 0,
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Sessions tracking (opcional, solo si necesitas saber dispositivos activos)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

### 6.2 Schema con TypeScript types

```typescript
// db/types.ts

export type User = {
  id: string;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  role: 'user' | 'admin';
  token_version: number;
  email_verified: 0 | 1;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type UserPublic = Omit<User, 'password_hash' | 'token_version' | 'deleted_at'>;

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;  // en centavos para evitar floats
  currency: 'USD' | 'MXN' | 'EUR';
  stock: number;
  active: 0 | 1;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
  total_cents: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
};
```

### 6.3 Queries con prepared statements

**REGLA:** SIEMPRE prepared statements. NUNCA concatenar strings.

```typescript
// db/queries/users.ts

import type { D1Database } from '@cloudflare/workers-types';
import type { User, UserPublic } from '../types';

export async function findUserByEmail(
  db: D1Database,
  email: string
): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL')
    .bind(email)
    .first<User>();
  
  return result || null;
}

export async function findUserById(
  db: D1Database,
  id: string
): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL')
    .bind(id)
    .first<User>();
  
  return result || null;
}

export async function createUser(
  db: D1Database,
  data: {
    id: string;
    email: string;
    password_hash: string;
    first_name?: string;
    last_name?: string;
  }
): Promise<User> {
  await db
    .prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `)
    .bind(
      data.id,
      data.email,
      data.password_hash,
      data.first_name || null,
      data.last_name || null
    )
    .run();
  
  const user = await findUserById(db, data.id);
  if (!user) throw new Error('Failed to create user');
  return user;
}

export async function listUsers(
  db: D1Database,
  options: { page?: number; pageSize?: number } = {}
): Promise<{ users: UserPublic[]; total: number }> {
  const page = options.page || 1;
  const pageSize = Math.min(options.pageSize || 20, 100); // max 100
  const offset = (page - 1) * pageSize;
  
  // Total count
  const countResult = await db
    .prepare('SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL')
    .first<{ count: number }>();
  
  // Paginated results — explicit columns, never SELECT *
  const usersResult = await db
    .prepare(`
      SELECT id, email, first_name, last_name, role, email_verified, created_at, updated_at
      FROM users
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `)
    .bind(pageSize, offset)
    .all<UserPublic>();
  
  return {
    users: usersResult.results || [],
    total: countResult?.count || 0
  };
}

export async function updateUser(
  db: D1Database,
  id: string,
  updates: Partial<Pick<User, 'first_name' | 'last_name' | 'email'>>
): Promise<User | null> {
  const fields: string[] = [];
  const values: any[] = [];
  
  if (updates.first_name !== undefined) {
    fields.push('first_name = ?');
    values.push(updates.first_name);
  }
  if (updates.last_name !== undefined) {
    fields.push('last_name = ?');
    values.push(updates.last_name);
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  
  if (fields.length === 0) return findUserById(db, id);
  
  fields.push("updated_at = datetime('now')");
  values.push(id);
  
  await db
    .prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
  
  return findUserById(db, id);
}

export async function softDeleteUser(
  db: D1Database,
  id: string
): Promise<void> {
  await db
    .prepare("UPDATE users SET deleted_at = datetime('now') WHERE id = ?")
    .bind(id)
    .run();
}
```

### 6.4 Reglas de queries

```
SIEMPRE:
  ✅ Prepared statements (.prepare().bind())
  ✅ Especificar columnas en SELECT (nunca SELECT *)
  ✅ LIMIT en queries de lista (max 100 items)
  ✅ Indices en columnas de WHERE frecuente
  ✅ Soft delete con deleted_at
  ✅ Foreign keys con ON DELETE CASCADE cuando aplica

NUNCA:
  ❌ String concatenation en SQL (SQL injection!)
  ❌ SELECT * en produccion
  ❌ Queries sin LIMIT
  ❌ DROP TABLE en migraciones (siempre usar deprecated columns)
  ❌ Modificar D1 directamente desde dashboard
```

### 6.5 Indices

**REGLA:** Crear indices en columnas que se usan en WHERE frecuente.

```sql
-- Indices comunes que SIEMPRE se crean:
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_products_slug ON products(slug);

-- Indices compuestos cuando hay queries con AND:
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

### 6.6 Backups

```
D1 BACKUPS:
  Cloudflare D1 hace backups automaticos
  Verificar configuracion en Cloudflare dashboard
  Retencion: 30 dias en plan gratis, mas en plan paid

BACKUP MANUAL ANTES DE CAMBIOS GRANDES:
  wrangler d1 export DB --output=./backups/backup-{{fecha}}.sql

RESTORE:
  wrangler d1 execute DB --file=./backups/backup-{{fecha}}.sql
```

---

## FASE 7 — SEGURIDAD

### 7.1 Validacion de inputs

**REGLA:** NUNCA confiar en el cliente. Validar TODO con Zod.

```typescript
// schemas/users.ts

import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email invalido').max(255),
  password: z.string()
    .min(8, 'Password debe tener minimo 8 caracteres')
    .max(128, 'Password muy largo')
    .regex(/[A-Z]/, 'Debe tener al menos una mayuscula')
    .regex(/[a-z]/, 'Debe tener al menos una minuscula')
    .regex(/[0-9]/, 'Debe tener al menos un numero'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Telefono invalido').optional()
});

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

**Uso en endpoints:**

```typescript
import { zValidator } from '@hono/zod-validator';

users.post(
  '/',
  zValidator('json', createUserSchema, (result, c) => {
    if (!result.success) {
      return c.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Datos invalidos',
          details: result.error.flatten().fieldErrors
        }
      }, 400);
    }
  }),
  async (c) => {
    const data = c.req.valid('json'); // Tipado automatico
    // ...
  }
);
```

### 7.2 CORS configurado correctamente

```typescript
import { cors } from 'hono/cors';

app.use('*', cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
    
    // Permitir solo origenes especificos
    if (allowed.includes(origin)) {
      return origin;
    }
    
    // En desarrollo permitir localhost
    if (c.env.ENVIRONMENT === 'development' && origin?.includes('localhost')) {
      return origin;
    }
    
    return null; // Bloquear
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['X-Request-ID'],
  maxAge: 86400
}));
```

**REGLA:** NUNCA `origin: '*'` en endpoints con datos sensibles.

### 7.3 Rate limiting

```typescript
// middleware/rate-limit.ts

import type { Context, Next } from 'hono';
import type { Env } from '../types/env';

export async function rateLimit(
  c: Context<{ Bindings: Env }>,
  next: Next
) {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const path = new URL(c.req.url).pathname;
  const key = `ratelimit:${ip}:${path}`;
  
  // Diferentes limites por tipo de endpoint
  let limit = 60;        // 60 req/min default
  let window = 60;       // 1 minuto
  
  if (path.includes('/auth/')) {
    limit = 10;          // 10 intentos de auth/min
  } else if (path.includes('/webhooks/')) {
    limit = 1000;        // webhooks pueden ser mas frecuentes
  } else if (path.includes('/upload')) {
    limit = 20;          // uploads limitados
  }
  
  const current = await c.env.CACHE.get(key);
  const count = current ? parseInt(current) : 0;
  
  if (count >= limit) {
    return c.json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Demasiadas solicitudes. Intenta de nuevo en 1 minuto.'
      }
    }, 429, {
      'Retry-After': String(window),
      'X-RateLimit-Limit': String(limit),
      'X-RateLimit-Remaining': '0'
    });
  }
  
  await c.env.CACHE.put(key, String(count + 1), {
    expirationTtl: window
  });
  
  // Headers informativos
  c.header('X-RateLimit-Limit', String(limit));
  c.header('X-RateLimit-Remaining', String(limit - count - 1));
  
  await next();
}
```

### 7.4 Headers de seguridad

```typescript
import { secureHeaders } from 'hono/secure-headers';

app.use('*', secureHeaders({
  strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
  xContentTypeOptions: 'nosniff',
  xFrameOptions: 'DENY',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: []
  }
}));
```

### 7.5 Variables de entorno y secretos

```bash
# Variables PUBLICAS van en wrangler.toml [vars]:
[vars]
ENVIRONMENT = "production"
ALLOWED_ORIGINS = "https://cliente.com"
API_VERSION = "v1"

# SECRETOS van en Cloudflare Secrets (NUNCA en wrangler.toml):
wrangler secret put JWT_SECRET
wrangler secret put JWT_REFRESH_SECRET
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put POSTMARK_API_KEY
wrangler secret put GHL_API_KEY
```

**Type-safe Env:**

```typescript
// types/env.ts

import type { D1Database, R2Bucket, KVNamespace } from '@cloudflare/workers-types';

export type Env = {
  // Bindings
  DB: D1Database;
  BUCKET: R2Bucket;
  CACHE: KVNamespace;
  
  // Public vars
  ENVIRONMENT: 'development' | 'staging' | 'production';
  ALLOWED_ORIGINS: string;
  API_VERSION: string;
  
  // Secrets
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  POSTMARK_API_KEY: string;
  GHL_API_KEY: string;
};
```

### 7.6 Verificacion de webhooks de Stripe

```typescript
// routes/webhooks.ts

import { Hono } from 'hono';
import Stripe from 'stripe';
import type { Env } from '../types/env';

const webhookRoutes = new Hono<{ Bindings: Env }>();

webhookRoutes.post('/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  
  if (!signature) {
    return c.json({ error: 'Missing signature' }, 400);
  }
  
  const body = await c.req.text();
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  
  let event: Stripe.Event;
  try {
    // CRITICO: verificar la firma para asegurar que viene de Stripe
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return c.json({
      success: false,
      error: {
        code: 'WEBHOOK_INVALID',
        message: 'Invalid webhook signature'
      }
    }, 400);
  }
  
  // Procesar el evento
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Procesar pago exitoso
      break;
    
    case 'payment_intent.payment_failed':
      // Procesar pago fallido
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  // Stripe espera 200 OK
  return c.json({ success: true, data: { received: true } });
});

export { webhookRoutes };
```

### 7.7 Logs de seguridad

```typescript
// middleware/security-logger.ts

export async function logSecurityEvent(
  env: Env,
  event: {
    type: 'auth_failure' | 'rate_limit' | 'invalid_token' | 'csrf_failure';
    ip: string;
    userAgent?: string;
    userId?: string;
    details?: any;
  }
) {
  // Loguear a Cloudflare Logs (configurar Logpush)
  console.log(JSON.stringify({
    level: 'warn',
    type: 'security_event',
    timestamp: new Date().toISOString(),
    ...event
  }));
  
  // Si hay 5+ failures en 1 minuto, enviar alerta
  const key = `security_alerts:${event.ip}`;
  const count = parseInt(await env.CACHE.get(key) || '0') + 1;
  
  await env.CACHE.put(key, String(count), { expirationTtl: 60 });
  
  if (count >= 5) {
    // Enviar alerta a admin (via N8N webhook o Postmark)
    // Implementar segun el caso
  }
}
```

---

## FASE 8 — INTEGRACION CON ECOSISTEMA ADDENDO

### 8.1 N8N webhooks

**El backend expone webhooks que N8N puede invocar para activar logica.**

```typescript
// routes/webhooks.ts

webhookRoutes.post('/n8n/process-order', async (c) => {
  // Verificar que viene de N8N (con shared secret)
  const secret = c.req.header('X-N8N-Secret');
  if (secret !== c.env.N8N_WEBHOOK_SECRET) {
    return c.json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid webhook secret' }
    }, 401);
  }
  
  const data = await c.req.json();
  // Procesar la accion solicitada por N8N
  // ...
  
  return c.json({ success: true });
});
```

### 8.2 GHL API integration

```typescript
// lib/ghl.ts

import type { Env } from '../types/env';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

export class GHLClient {
  constructor(private env: Env) {}
  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${GHL_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status}`);
    }
    
    return response.json();
  }
  
  async createContact(data: {
    locationId: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    tags?: string[];
  }) {
    return this.request('/contacts/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async addTagsToContact(contactId: string, tags: string[]) {
    return this.request(`/contacts/${contactId}/tags`, {
      method: 'POST',
      body: JSON.stringify({ tags })
    });
  }
}
```

### 8.3 Stripe integration

```typescript
// lib/stripe.ts

import Stripe from 'stripe';
import type { Env } from '../types/env';

export function getStripeClient(env: Env): Stripe {
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-09-30.acacia',
    httpClient: Stripe.createFetchHttpClient()
  });
}

export async function createPaymentIntent(
  env: Env,
  data: {
    amount: number;       // en centavos
    currency: string;
    customerEmail: string;
    metadata?: Record<string, string>;
  }
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient(env);
  
  return stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency,
    receipt_email: data.customerEmail,
    metadata: data.metadata,
    automatic_payment_methods: {
      enabled: true
    }
  });
}

export async function createCheckoutSession(
  env: Env,
  data: {
    items: Array<{
      name: string;
      amount: number;
      quantity: number;
    }>;
    customerEmail: string;
    successUrl: string;
    cancelUrl: string;
  }
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient(env);
  
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: data.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.amount
      },
      quantity: item.quantity
    })),
    mode: 'payment',
    customer_email: data.customerEmail,
    success_url: data.successUrl,
    cancel_url: data.cancelUrl
  });
}
```

### 8.4 Postmark email transaccional

```typescript
// lib/postmark.ts

import type { Env } from '../types/env';

const POSTMARK_API_URL = 'https://api.postmarkapp.com';

export async function sendEmail(
  env: Env,
  data: {
    from: string;
    to: string;
    subject: string;
    htmlBody: string;
    textBody?: string;
    templateId?: number;
    templateModel?: Record<string, any>;
  }
) {
  const isTemplate = !!data.templateId;
  const endpoint = isTemplate ? '/email/withTemplate' : '/email';
  
  const body = isTemplate
    ? {
        From: data.from,
        To: data.to,
        TemplateId: data.templateId,
        TemplateModel: data.templateModel
      }
    : {
        From: data.from,
        To: data.to,
        Subject: data.subject,
        HtmlBody: data.htmlBody,
        TextBody: data.textBody
      };
  
  const response = await fetch(`${POSTMARK_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': env.POSTMARK_API_KEY
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`Postmark error: ${response.status}`);
  }
  
  return response.json();
}
```

### 8.5 Cloudinary signed uploads

```typescript
// lib/cloudinary.ts

import type { Env } from '../types/env';

export async function generateSignedUploadUrl(
  env: Env,
  options: {
    folder?: string;
    publicId?: string;
    transformation?: string;
  }
): Promise<{ url: string; signature: string; timestamp: number; apiKey: string }> {
  const timestamp = Math.round(Date.now() / 1000);
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  
  // Construir parametros para firmar
  const params: Record<string, string> = {
    timestamp: String(timestamp)
  };
  
  if (options.folder) params.folder = options.folder;
  if (options.publicId) params.public_id = options.publicId;
  if (options.transformation) params.transformation = options.transformation;
  
  // Crear string para firmar (orden alfabetico)
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // Firmar con SHA-1 (Cloudinary usa SHA-1, no SHA-256)
  const stringToSign = `${sortedParams}${apiSecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return {
    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    signature,
    timestamp,
    apiKey
  };
}
```

### 8.6 Frontend Astro consumiendo la API

**El backend documenta como debe consumirse desde frontend:**

```typescript
// Ejemplo: en Astro frontend

// src/lib/api.ts
const API_URL = import.meta.env.PUBLIC_API_URL;

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Para refresh token cookie
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'API error');
  }
  
  return data.data;
}

// Uso
const products = await apiCall<Product[]>('/api/v1/products');
```

---

## FASE 9 — TESTING Y CALIDAD

### 9.1 Tests unitarios

```typescript
// test/services/auth.service.test.ts

import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../../src/lib/crypto';

describe('crypto', () => {
  it('should hash password correctly', async () => {
    const password = 'TestPassword123';
    const hash = await hashPassword(password);
    
    expect(hash).toBeTruthy();
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(40);
  });
  
  it('should verify correct password', async () => {
    const password = 'TestPassword123';
    const hash = await hashPassword(password);
    
    const valid = await verifyPassword(password, hash);
    expect(valid).toBe(true);
  });
  
  it('should reject incorrect password', async () => {
    const password = 'TestPassword123';
    const hash = await hashPassword(password);
    
    const valid = await verifyPassword('WrongPassword', hash);
    expect(valid).toBe(false);
  });
});
```

### 9.2 Tests de integracion

```typescript
// test/routes/auth.test.ts

import { describe, it, expect } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import app from '../../src/index';

describe('POST /api/v1/auth/login', () => {
  it('should return 400 for invalid email', async () => {
    const request = new Request('http://example.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'Password123'
      })
    });
    
    const ctx = createExecutionContext();
    const response = await app.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });
  
  it('should return 401 for non-existent user', async () => {
    const request = new Request('http://example.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@test.com',
        password: 'Password123'
      })
    });
    
    const ctx = createExecutionContext();
    const response = await app.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error.code).toBe('INVALID_CREDENTIALS');
  });
});
```

### 9.3 OpenAPI documentation

**Generar `docs/openapi.yaml` con TODOS los endpoints:**

```yaml
openapi: 3.0.3
info:
  title: {{cliente}} API
  description: API backend del proyecto {{cliente}}
  version: 1.0.0
  contact:
    name: Addendo Growth Partner
    email: admin@addendo.io

servers:
  - url: https://api.{{cliente}}.com/api/v1
    description: Production
  - url: https://api-staging.{{cliente}}.com/api/v1
    description: Staging

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  
  schemas:
    SuccessResponse:
      type: object
      properties:
        success:
          type: boolean
          enum: [true]
        data:
          type: object
        meta:
          type: object
    
    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          enum: [false]
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object

paths:
  /auth/login:
    post:
      summary: Login de usuario
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/SuccessResponse'
                  - properties:
                      data:
                        type: object
                        properties:
                          accessToken:
                            type: string
                          user:
                            type: object
        '401':
          description: Credenciales invalidas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
```

### 9.4 Checklist de calidad antes de entregar

```
PRE-ENTREGA AL REVISOR-QA:

CODIGO:
[ ] Sin console.log en produccion
[ ] Sin TODOs sin resolver
[ ] Sin codigo comentado
[ ] TypeScript strict (sin any)
[ ] Sin warnings en build
[ ] Sin credenciales hardcoded
[ ] .env.example actualizado
[ ] .gitignore correcto

TESTS:
[ ] Tests unitarios pasando
[ ] Tests de integracion pasando
[ ] Coverage > 70% en logica de negocio critica
[ ] Tests de auth pasando
[ ] Tests de webhooks pasando

API:
[ ] Todos los endpoints documentados en OpenAPI
[ ] Response shapes consistentes
[ ] HTTP status codes correctos
[ ] Error codes estandarizados
[ ] Rate limiting configurado
[ ] CORS configurado correctamente

SEGURIDAD:
[ ] Validacion de inputs en TODOS los endpoints
[ ] Webhooks con verificacion de firma
[ ] Auth middleware en endpoints privados
[ ] Headers de seguridad configurados
[ ] Sin SQL injection vulnerabilities (prepared statements)
[ ] Sin XSS vulnerabilities (sanitizar outputs)
[ ] Variables sensibles en Cloudflare Secrets

DATABASE:
[ ] Migraciones aplicadas en produccion
[ ] Indices creados en columnas de busqueda frecuente
[ ] Foreign keys configuradas
[ ] Backup verificado

INFRAESTRUCTURA:
[ ] wrangler.toml correcto
[ ] D1 database creada
[ ] R2 bucket creado (si aplica)
[ ] KV namespace creado
[ ] Secrets configurados
[ ] Custom domain configurado (si aplica)

INTEGRACIONES:
[ ] Stripe webhooks verificando firma
[ ] N8N webhooks con shared secret
[ ] GHL API funcionando
[ ] Postmark enviando emails

DOCUMENTACION:
[ ] README.md con setup instructions
[ ] OpenAPI spec completo
[ ] Variables de entorno documentadas
[ ] Comandos de deploy documentados
```

---

## FASE 10 — ENTREGA AL REVISOR-QA

### 10.1 Documento de entrega

**Crear documento en Drive antes de entregar:**

```markdown
# ENTREGA BACKEND — {{cliente}}

**Backend Dev:** Agente #22
**Fecha:** {{fecha}}
**Para:** revisor-qa (#39)

---

## RESUMEN

**Tipo de proyecto:** {{descripcion}}
**Endpoints implementados:** {{N}}
**Tablas en D1:** {{N}}
**Integraciones externas:** {{lista}}

## URLS

- **Production:** https://api.{{cliente}}.com
- **Staging:** https://api-staging.{{cliente}}.com
- **Health check:** GET /api/v1/health
- **OpenAPI docs:** {{link a Swagger UI}}

## CHECKLIST DE QA

### Endpoints a verificar
| Endpoint | Auth | Test |
|----------|------|------|
| POST /api/v1/auth/login | NO | login con credenciales validas |
| POST /api/v1/auth/refresh | NO | refresh con cookie valida |
| GET /api/v1/auth/me | SI | obtener user actual |
| POST /api/v1/products | SI | crear producto (admin) |
| GET /api/v1/products | NO | listar productos |
| POST /api/v1/orders | SI | crear orden |
| POST /api/v1/webhooks/stripe | NO (firma) | enviar webhook test de Stripe |

### Verificaciones de seguridad
- [ ] Endpoints autenticados rechazan requests sin token
- [ ] Endpoints autenticados rechazan tokens invalidos
- [ ] Rate limiting funciona (probar 11 requests al login)
- [ ] CORS rechaza origenes no permitidos
- [ ] Webhooks rechazan firmas invalidas

### Tests automatizados
- [ ] Tests unitarios pasan (npm test)
- [ ] Coverage > 70%

### Performance
- [ ] Endpoints responden en < 200ms (cold start ok)
- [ ] Endpoints responden en < 50ms (warm)

## CREDENCIALES PARA QA

- Admin user: qa-admin@{{cliente}}.com / TestPass123!
- Regular user: qa-user@{{cliente}}.com / TestPass123!

## NOTAS ESPECIALES

{{Cualquier cosa que QA debe saber}}

---

**Listo para QA review.**
```

### 10.2 Si QA encuentra problemas

```
PROCESO:

1. QA reporta problemas con detalles
2. Backend-dev evalua:
   - ¿Es bug real? → corregir
   - ¿Es problema de uso? → documentar mejor
   - ¿Es feature missing? → escalar a desarrollo-web

3. Corregir y re-entregar
4. QA re-verifica
5. Si pasa → aprobado para deployment
```

---

## REGLAS MAESTRAS DEL SKILL

1. **El mejor backend es el que NO existe.** Si frontend lo puede solo, no construir backend.

2. **Cloudflare Workers + Hono + TypeScript strict.** Stack obligatorio sin variaciones.

3. **Solo entras cuando el desarrollo-web (#20) te activa.** No te auto-asignas.

4. **REST estandar.** Sin GraphQL, sin gRPC, sin invenciones.

5. **Response shape uniforme:** `{success, data, meta}` o `{success, error}`.

6. **HTTP status codes correctos.** 200/201/204, 400/401/403/404/429, 500.

7. **Error codes estandar en SCREAMING_SNAKE_CASE.** Lista maestra usada en todos los proyectos.

8. **JWT con refresh tokens.** Access 15 min, refresh 30 dias, rotacion automatica.

9. **Refresh token en HttpOnly cookie.** NUNCA en localStorage.

10. **Validacion con Zod en TODOS los endpoints.** Cero confianza en el cliente.

11. **Prepared statements obligatorios.** NUNCA string concatenation en SQL.

12. **SELECT especifico, NUNCA SELECT *.**

13. **LIMIT en queries de lista (max 100).**

14. **Indices en columnas de WHERE frecuente.**

15. **Migraciones SQL versionadas.** NUNCA modificar D1 manualmente.

16. **Soft delete con deleted_at.** No hard delete salvo casos especiales.

17. **CORS estricto.** Cero `origin: '*'` en endpoints sensibles.

18. **Rate limiting obligatorio.** 60/min default, 10/min en auth.

19. **Webhooks con verificacion de firma.** Stripe, N8N, GHL siempre.

20. **Secretos en Cloudflare Secrets.** NUNCA en wrangler.toml ni en codigo.

21. **OpenAPI spec completo y actualizado.** Es parte del codigo.

22. **Tests obligatorios para logica critica.** Unit + integration.

23. **Sin console.log en produccion.** Logs estructurados con niveles.

24. **El backend es invisible.** Si se nota, es porque algo esta mal.

25. **Cero microservicios para PYMES.** Un solo Worker simple es suficiente.
