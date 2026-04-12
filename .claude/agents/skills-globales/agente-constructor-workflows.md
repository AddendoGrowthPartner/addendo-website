# SKILL: Constructor de Workflows — Despliegue Automático del Sistema Nervioso del Cliente

**Nivel:** Experto absoluto — convierte el Brief Maestro de un cliente en workflows N8N listos y activos en menos de 30 minutos
**Agente principal:** #50 agente-constructor-workflows
**Recibe de:** #3 director-cuenta (Brief Maestro completo), #4 project-manager (inicio del flujo cliente nuevo)
**Entrega a:** #4 project-manager (reporte de workflows creados y activados), #24 n8n-automatizacion (workflows complejos que requieren coordinación adicional)
**Coordina con:** Todos los agentes del sistema — los workflows que construye son la infraestructura que los conecta
**Infraestructura:** N8N API + Claude API + GitHub API + plantillas JSON parametrizadas
**URL API N8N:** `https://n8n.addendo.io/api/v1`
**Autenticación N8N:** Header `X-N8N-API-KEY: {{N8N_API_KEY}}`

---

## PRINCIPIO MAESTRO

**Un cliente que completa su Brief Maestro merece tener todos sus workflows activos antes de que termine el día.**

Los workflows de N8N son el sistema nervioso del cliente — sin ellos, nada funciona de forma automática. Un lead llega y nadie responde. Un artículo de blog no se publica. Un competidor no se monitorea. El reporte semanal no existe. Todo lo que Addendo prometió al cliente está durmiendo en documentos de Google Drive hasta que alguien lo configure manualmente.

El agente-constructor-workflows elimina ese gap por completo. Lee el Brief Maestro, identifica qué workflows corresponden al plan contratado, toma las plantillas probadas, las personaliza con los datos reales del cliente, y las despliega en N8N via API — todo en menos de 30 minutos. Sin que José tenga que tocar un solo nodo.

---

## FASE 1 — ACTIVACIÓN Y CONTEXTO

### 1.1 Cuándo se activa este agente

```
ACTIVACIONES AUTOMÁTICAS:

  1. director-cuenta (#3) marca Brief Maestro como COMPLETO
     → Trigger: nota en GHL + email automático a project-manager (#4)
     → project-manager activa este agente con el Brief Maestro como input

  2. project-manager (#4) inicia flujo CLIENTE_NUEVO
     → Activa constructor-workflows en paralelo con otros agentes
     → Junto con: onboarding-cliente (#2), agente-auditoria (#10)

  3. José da la orden explícita:
     "Construye los workflows de [cliente]"
     → Activación directa, saltar a Fase 2

ACTIVACIONES MANUALES (no automáticas pero permitidas):
  - "Agrega el workflow de blog a [cliente]"
  - "Activa el nurturing de [cliente]"
  - "Reconstruye todos los workflows de [cliente]"
```

### 1.2 Inputs requeridos — del Brief Maestro

```
VARIABLES OBLIGATORIAS (sin estas no se puede construir nada):

  cliente_nombre:      Nombre completo del cliente (ej: "Don Jacinto Nahual")
  cliente_slug:        Identificador corto (ej: "don-jacinto")
  negocio_nombre:      Nombre del negocio (ej: "Don Jacinto Nahual — Servicios Espirituales")
  negocio_nicho:       Categoría del negocio (ver Fase 1.3)
  negocio_url:         URL del sitio web (ej: "https://donjacintonahual.com")
  github_repo:         Repo del cliente (ej: "AddendoGrowthPartner/don-jacinto-nahual")
  plan_contratado:     starter / growth / scale
  email_negocio:       Email principal del cliente
  whatsapp_negocio:    Número con código de país (ej: "+15551234567")
  zona_horaria:        Ej: "America/New_York", "America/Chicago"
  idioma_principal:    es / en
  servicios_lista:     Lista de servicios que ofrece el negocio
  keywords_nicho:      5-10 keywords principales
  ghl_subcuenta_id:    ID de la sub-cuenta en GHL

VARIABLES CONDICIONALES (necesarias según el plan):

  redes_activas:       [instagram, facebook, tiktok, youtube, whatsapp]
  presupuesto_ads:     { google: 0, meta: 0, tiktok: 0 }
  competidores:        Lista de URLs competidoras (para inteligencia semanal)
  google_review_link:  Link de Google Maps del negocio
  email_cliente:       Email al que se le envía el reporte semanal
  manychat_webhook:    URL del webhook de ManyChat configurado
  ga4_property_id:     ID de la propiedad en Google Analytics 4
```

### 1.3 Clasificación de nicho para personalizar los prompts

```
NICHOS SOPORTADOS Y SU SLUG:
  espiritual          → brujos, curanderos, santeros, videntes
  salud               → médicos, dentistas, psicólogos, terapeutas
  estetica            → spas, barbería, nail salon, estética
  restaurante         → restaurantes, food trucks, catering
  legal               → abogados, notarios, consultores legales
  construccion        → contratistas, plomeros, electricistas, HVAC
  bienes_raices       → agentes inmobiliarios, property managers
  educacion           → tutores, academias, cursos online
  b2b                 → agencias, consultoras, servicios empresariales
  ecommerce           → tiendas online, dropshipping, retail

IMPACTO DEL NICHO:
  - Tono del system prompt de Claude
  - Keywords base para DataForSEO
  - Criterios de calificación de leads
  - CTA en artículos de blog
  - Mensajes de nurturing
  - Preguntas de calificación en ManyChat
```

### 1.4 Workflows por plan — qué construir

```
PLAN STARTER ($797/mes):
  ✅ WF-01: Blog Automático SEO
  ✅ WF-02: Respuesta Inmediata a Leads
  ✅ WF-03: Nurturing de 7 Días
  ✅ WF-06: Solicitud de Reseñas
  ❌ WF-04: DMs ManyChat
  ❌ WF-05: Reporte Semanal
  ❌ WF-07: Inteligencia Competitiva

PLAN GROWTH ($1,497/mes):
  ✅ WF-01: Blog Automático SEO
  ✅ WF-02: Respuesta Inmediata a Leads
  ✅ WF-03: Nurturing de 7 Días
  ✅ WF-04: DMs ManyChat
  ✅ WF-05: Reporte Semanal
  ✅ WF-06: Solicitud de Reseñas
  ❌ WF-07: Inteligencia Competitiva

PLAN SCALE ($2,997/mes):
  ✅ WF-01: Blog Automático SEO
  ✅ WF-02: Respuesta Inmediata a Leads
  ✅ WF-03: Nurturing de 7 Días
  ✅ WF-04: DMs ManyChat
  ✅ WF-05: Reporte Semanal
  ✅ WF-06: Solicitud de Reseñas
  ✅ WF-07: Inteligencia Competitiva

AGREGAR MANUALMENTE (a cualquier plan bajo solicitud de José):
  ✅ Cualquier workflow adicional que José apruebe
```

---

## FASE 2 — ARQUITECTURA ANTES DE CONSTRUIR

### 2.1 Gate de validación obligatorio

```
ANTES DE ESCRIBIR UN SOLO JSON, responder estas preguntas:

[ ] ¿Tengo el Brief Maestro completo con TODAS las variables obligatorias?
[ ] ¿Sé qué plan contrató el cliente y qué workflows corresponden?
[ ] ¿Las credenciales de N8N para este cliente ya están creadas?
    (DataForSEO, Anthropic, GitHub, GHL, Gmail, ManyChat si aplica)
[ ] ¿La sub-cuenta de GHL del cliente ya existe?
[ ] ¿El repositorio de GitHub ya existe?
[ ] ¿El dominio del cliente ya está configurado en Vercel?
[ ] ¿Ya verifiqué que no existen workflows duplicados en N8N?
    GET https://n8n.addendo.io/api/v1/workflows → buscar por nombre del cliente

Si CUALQUIERA de estas respuestas es NO:
  → DETENER y notificar al project-manager (#4) qué está faltando
  → NO improvisar ni asumir datos que no tienes
  → El Brief Maestro incompleto = workflows mal configurados = cliente frustrado
```

### 2.2 Verificar credenciales disponibles en N8N

```bash
# Verificar credenciales existentes antes de construir
curl -s -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/credentials" \
  | jq '.data[] | {id, name, type}'
```

```
CREDENCIALES REQUERIDAS POR WORKFLOW:

WF-01 Blog SEO:
  - DATA FOR SEO API (httpBasicAuth)
  - Anthropic API Key (httpHeaderAuth)
  - GitHub AddendoGrowthPartner (githubOAuth2Api)
  - Google Indexing API OAuth2 (oAuth2Api)
  - Gmail Addendo (gmailOAuth2)

WF-02 Respuesta Leads:
  - GHL API Addendo (httpHeaderAuth)
  - Anthropic API Key (httpHeaderAuth)
  - Gmail Addendo (gmailOAuth2)
  - Twilio o WhatsApp Business API (si aplica)

WF-03 Nurturing 7 Días:
  - GHL API Addendo (httpHeaderAuth)
  - Anthropic API Key (httpHeaderAuth)
  - Gmail Addendo (gmailOAuth2)

WF-04 DMs ManyChat:
  - ManyChat API [Cliente] (httpHeaderAuth)
  - Anthropic API Key (httpHeaderAuth)
  - GHL API Addendo (httpHeaderAuth)

WF-05 Reporte Semanal:
  - Google Analytics Data API (oAuth2Api)
  - Google Ads API (oAuth2Api)
  - Meta Ads API (httpHeaderAuth)
  - GHL API Addendo (httpHeaderAuth)
  - Anthropic API Key (httpHeaderAuth)
  - Gmail Addendo (gmailOAuth2)

WF-06 Reseñas:
  - GHL API Addendo (httpHeaderAuth)
  - Gmail Addendo (gmailOAuth2)

WF-07 Inteligencia Competitiva:
  - DATA FOR SEO API (httpBasicAuth)
  - Apify API (httpHeaderAuth)
  - Anthropic API Key (httpHeaderAuth)
  - Gmail Addendo (gmailOAuth2)
```

### 2.3 Verificar que no existen duplicados

```bash
# Buscar workflows existentes del cliente
curl -s -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows" \
  | jq --arg cliente "{{cliente_slug}}" \
    '.data[] | select(.name | ascii_downcase | contains($cliente)) | {id, name, active}'
```

```
SI EXISTEN WORKFLOWS DEL CLIENTE:
  OPCIÓN A: Actualizar el existente (si el cliente ya estaba antes)
    PATCH https://n8n.addendo.io/api/v1/workflows/{id}
    
  OPCIÓN B: Eliminar y recrear (solo si José lo aprueba explícitamente)
    DELETE https://n8n.addendo.io/api/v1/workflows/{id}
    
  NUNCA crear duplicados sin verificar primero.
```

---

## FASE 3 — PLANTILLAS DE WORKFLOWS

### 3.1 Convención de nombres

```
PATRÓN OBLIGATORIO:
  "Addendo — {{ClienteSlug}} — {{NombreWorkflow}}"

EJEMPLOS:
  "Addendo — don-jacinto — Blog SEO Diario"
  "Addendo — don-jacinto — Respuesta Inmediata Leads"
  "Addendo — don-jacinto — Nurturing 7 Dias"
  "Addendo — don-jacinto — DMs ManyChat"
  "Addendo — don-jacinto — Reporte Semanal"
  "Addendo — don-jacinto — Solicitud Resenas"
  "Addendo — don-jacinto — Inteligencia Competitiva"

NOMBRES DE NODOS (dentro de cada workflow):
  PATRÓN: "{{Verbo}} {{Qué}} {{Cliente/Detalle}}"
  
  "Trigger Diario 6am EST"
  "Buscar Keywords DataForSEO"
  "Seleccionar Mejor Keyword"
  "Escribir Articulo Claude — Don Jacinto"
  "Crear Archivo GitHub Don Jacinto"
  "Notificar Google Indexing"
  "Enviar Email Confirmacion Jose"
```

### 3.2 WF-01 — Blog Automático SEO

```
PARÁMETROS A PERSONALIZAR:
  {{cliente_slug}}        → identificador corto del cliente
  {{negocio_nombre}}      → nombre completo del negocio
  {{negocio_url}}         → URL del sitio (ej: donjacintonahual.com)
  {{github_repo}}         → AddendoGrowthPartner/don-jacinto-nahual
  {{keywords_semilla}}    → array de 8-10 keywords del nicho
  {{cron_schedule}}       → frecuencia según el plan (ver tabla abajo)
  {{system_prompt_blog}}  → generado por Claude según el nicho
  {{autor_articulo}}      → nombre del autor para el frontmatter
  {{idioma}}              → es / en
  {{zona_horaria}}        → America/New_York (u otra)

FRECUENCIAS POR PLAN:
  Starter:  "0 6 * * 1,3,5"   → lunes, miércoles, viernes
  Growth:   "0 6 * * *"        → todos los días
  Scale:    "0 6,14 * * *"     → dos veces al día (6am y 2pm)

SYSTEM PROMPT BASE PARA BLOG (personalizar por nicho):
  - Para nicho "espiritual": tono espiritual, ancestral, de confianza
  - Para nicho "salud": tono profesional, empático, basado en evidencia
  - Para nicho "restaurante": tono cálido, apetitoso, local
  - Para nicho "b2b": tono experto, datos y ROI, orientado a resultados

NODOS DEL WORKFLOW:
  1. Schedule Trigger (cron personalizado)
  2. HTTP Request — DataForSEO Keywords
  3. Code — Seleccionar Mejor Keyword (con staticData para no repetir)
  4. HTTP Request — Claude API (escribir artículo 1,500+ palabras)
  5. Code — Extraer y Preparar Artículo (base64 para GitHub)
  6. HTTP Request — GitHub API (crear archivo en repo del cliente)
  7. HTTP Request — Google Indexing API (notificar URL)
  8. Gmail — Notificar a admin@addendo.io
```

### 3.3 WF-02 — Respuesta Inmediata a Leads

```
PARÁMETROS A PERSONALIZAR:
  {{ghl_subcuenta_id}}    → ID de la sub-cuenta del cliente en GHL
  {{negocio_nombre}}      → nombre del negocio
  {{negocio_nicho}}       → para personalizar el tono de respuesta
  {{servicios_lista}}     → servicios ofrecidos (para Claude)
  {{whatsapp_negocio}}    → número de WhatsApp del negocio
  {{primer_mensaje}}      → primer mensaje generado por Claude (ver abajo)
  {{zona_horaria}}        → para respetar horarios de respuesta

TRIGGER:
  Webhook GHL: cuando llega lead nuevo a cualquier pipeline
  URL: https://n8n.addendo.io/webhook/ghl-lead-{{cliente_slug}}
  Configurar en GHL: Automation → Webhook → Trigger: Contact Created

PROCESS:
  Lead nuevo en GHL
  → Claude personaliza mensaje con nombre del lead y servicio de interés
  → Enviar WhatsApp en < 5 minutos
  → Enviar Email (si hay email del lead)
  → Notificar a vendedor del cliente por Gmail
  → Actualizar GHL: tag "Contactado - < 5min", etapa "En Seguimiento"

NODOS DEL WORKFLOW:
  1. Webhook GHL Lead Nuevo
  2. HTTP Request — Obtener Datos Completos del Contacto GHL
  3. HTTP Request — Claude API (personalizar primer mensaje)
  4. HTTP Request — WhatsApp Business API (enviar mensaje)
  5. Gmail — Enviar email al lead (si tiene email)
  6. Gmail — Notificar a vendedor del cliente
  7. HTTP Request — Actualizar Contacto GHL (tags + etapa)

PRIMER MENSAJE TEMPLATE (Claude lo personaliza):
  "Hola {{nombre}}! Soy el asistente de {{negocio_nombre}}.
  Recibimos tu consulta sobre {{servicio_interes}}.
  ¿Tienes un momento para contarnos un poco más sobre lo que necesitas?
  Queremos ayudarte de la mejor forma posible."
```

### 3.4 WF-03 — Nurturing de 7 Días

```
PARÁMETROS A PERSONALIZAR:
  {{ghl_subcuenta_id}}    → ID de la sub-cuenta del cliente en GHL
  {{negocio_nombre}}      → nombre del negocio
  {{servicios_lista}}     → para personalizar mensajes de nurturing
  {{caso_exito_1}}        → caso de éxito real del negocio (Día 3)
  {{cta_url}}             → URL del sitio para el CTA de cada mensaje

TRIGGER:
  Webhook GHL: lead sin respuesta después de 24h
  O Schedule: revisar cada 6 horas leads en etapa "Sin Respuesta"

SECUENCIA DE MENSAJES:
  Día 1 (24h sin respuesta):  WhatsApp recordatorio suave
  Día 2 (48h):                Email con información de valor
  Día 3 (72h):                WhatsApp con caso de éxito
  Día 5 (120h):               Email último intento
  Día 7 (168h):               WhatsApp cierre + reactivación futura
  Día 7+:                     Mover a pipeline "Nurturing Largo" en GHL

NODOS DEL WORKFLOW:
  1. Schedule Trigger — Cada 6 horas
  2. HTTP Request — Obtener Leads Sin Respuesta de GHL
  3. Code — Clasificar por días sin respuesta
  4. Switch — Enrutar según el día (1, 2, 3, 5, 7)
  [Rama Día 1] HTTP Request — Claude → WhatsApp
  [Rama Día 2] HTTP Request — Claude → Gmail
  [Rama Día 3] HTTP Request — Claude → WhatsApp (con caso de éxito)
  [Rama Día 5] HTTP Request — Claude → Gmail (último intento)
  [Rama Día 7] HTTP Request — Claude → WhatsApp + Actualizar GHL
  5. HTTP Request — Actualizar Etapa y Tags en GHL
```

### 3.5 WF-04 — DMs ManyChat

```
PARÁMETROS A PERSONALIZAR:
  {{cliente_slug}}          → para el path del webhook
  {{system_prompt_dm}}      → ver Fase 3.7 — generación del system prompt
  {{ghl_subcuenta_id}}      → para registrar contactos
  {{manychat_page_id}}      → ID de la página en ManyChat

TRIGGER:
  Webhook ManyChat
  URL: https://n8n.addendo.io/webhook/manychat-{{cliente_slug}}

NODOS DEL WORKFLOW:
  1. Webhook ManyChat — Recibir Mensaje
  2. HTTP Request — Obtener/Crear Contacto en GHL
  3. Code — Preparar Contexto Claude (historial + mensaje actual)
  4. HTTP Request — Claude API (respuesta natural, max 500 tokens)
  5. Code — Clasificar Intención (calificado / seguir / humano)
  6. HTTP Request — Actualizar Contacto GHL
  7. Respond to Webhook — Devolver respuesta a ManyChat
  [Rama paralela si calificó]
  8. Gmail — Notificar a vendedor del cliente

PARA CONSTRUIR EL SYSTEM PROMPT DEL DM:
  Ver Fase 3.7 — Claude genera el system prompt a partir del Brief Maestro
```

### 3.6 WF-05 — Reporte Semanal al Cliente

```
PARÁMETROS A PERSONALIZAR:
  {{email_cliente}}         → a quién se envía el reporte
  {{ga4_property_id}}       → propiedad de Google Analytics 4
  {{ghl_subcuenta_id}}      → para métricas de leads/ventas
  {{canales_activos}}       → [google_ads, meta_ads, tiktok_ads, organic]
  {{objetivos_mes}}         → KPIs prometidos al cliente este mes
  {{nombre_cuenta_manager}} → quién firma el reporte

TRIGGER:
  Schedule: "0 9 * * 1" → Cada lunes a las 9am (zona horaria del cliente)

DATOS QUE RECOPILA:
  GA4:          Sesiones, usuarios nuevos, tasa de rebote, páginas/sesión
  Google Ads:   Impresiones, clics, CTR, conversiones, CPC, presupuesto gastado
  Meta Ads:     Alcance, impresiones, clics, CTR, conversiones, CPR
  GHL:          Leads nuevos, leads calificados, citas agendadas, ventas cerradas

NODOS DEL WORKFLOW:
  1. Schedule Trigger — Lunes 9am
  2. [Paralelo] HTTP Request — Datos GA4
  3. [Paralelo] HTTP Request — Datos Google Ads
  4. [Paralelo] HTTP Request — Datos Meta Ads
  5. [Paralelo] HTTP Request — Datos GHL
  6. Code — Consolidar todos los datos en una estructura
  7. HTTP Request — Claude API (redactar reporte ejecutivo en HTML)
  8. Gmail — Enviar reporte al cliente y a admin@addendo.io
```

### 3.7 WF-06 — Solicitud de Reseñas

```
PARÁMETROS A PERSONALIZAR:
  {{negocio_nombre}}        → nombre del negocio
  {{google_review_link}}    → link directo para dejar reseña
  {{ghl_subcuenta_id}}      → sub-cuenta del cliente

TRIGGER:
  Webhook GHL: lead movido a etapa "Cerrado Ganado"
  Configurar en GHL: Pipeline Automation → Stage Changed → "Cerrado Ganado"

SECUENCIA:
  Día 0 (servicio completado): Mover a "Cerrado Ganado" en GHL
  Día 3 (72h después):         WhatsApp: "¿Cómo fue tu experiencia? [link reseña]"
  Día 6 (si no dejó reseña):   Email: recordatorio gentil con link
  Día 6+ (si dejó reseña):     Tag "Reseña Dejada" en GHL — no seguir

NODOS DEL WORKFLOW:
  1. Webhook GHL — Cerrado Ganado
  2. Wait Node — 72 horas
  3. HTTP Request — Verificar si ya tiene tag "Reseña Dejada" en GHL
  4. IF — ¿Ya dejó reseña?
  [Si NO] HTTP Request — WhatsApp solicitud de reseña
  [Si NO] Wait Node — 72 horas más
  [Si NO] HTTP Request — Verificar de nuevo
  [Si NO] Gmail — Email de seguimiento
  5. HTTP Request — Actualizar GHL con tag correspondiente
```

### 3.8 WF-07 — Inteligencia Competitiva Semanal

```
PARÁMETROS A PERSONALIZAR:
  {{competidores_urls}}     → lista de URLs a monitorear
  {{keywords_monitoreo}}    → keywords a rastrear en posiciones
  {{ubicacion_geografica}}  → ciudad/estado objetivo del cliente
  {{negocio_nicho}}         → para contextualizar el análisis

TRIGGER:
  Schedule: "0 6 * * 1" → Cada lunes a las 6am

DATOS QUE RECOPILA:
  DataForSEO:   Posiciones del cliente vs competidores para keywords clave
  Apify:        Últimos posts/contenido de redes de competidores
  DataForSEO:   Nuevas keywords que rankean los competidores

NODOS DEL WORKFLOW:
  1. Schedule Trigger — Lunes 6am
  2. [Paralelo] HTTP Request — DataForSEO Rankings del Cliente
  3. [Paralelo] HTTP Request — DataForSEO Rankings Competidores
  4. [Paralelo] HTTP Request — Apify Scraping Redes Competidores
  5. Code — Consolidar y comparar datos
  6. HTTP Request — Claude API (analizar y redactar reporte de inteligencia)
  7. Gmail — Enviar reporte a admin@addendo.io

NOTA: Este reporte va a José, NO al cliente directamente.
El director-estrategia (#9) decide qué parte del reporte compartir con el cliente.
```

---

## FASE 4 — GENERACIÓN DE SYSTEM PROMPTS

### 4.1 Cómo Claude genera el system prompt para cada cliente

```
PROCESO:
  1. Tomar los datos del Brief Maestro
  2. Llamar a Claude API con el meta-prompt de generación
  3. Claude genera el system prompt personalizado
  4. Usar ese system prompt en los workflows del cliente

META-PROMPT PARA GENERAR SYSTEM PROMPT DE BLOG:
  "Genera el system prompt para el agente de blog SEO de {{negocio_nombre}}.
   Negocio: {{descripcion_del_negocio}}
   Nicho: {{negocio_nicho}}
   Servicios: {{servicios_lista}}
   URL: {{negocio_url}}
   Tono deseado: {{tono}}
   Audiencia objetivo: {{audiencia}}
   CTA principal: {{cta}}
   
   El system prompt debe incluir:
   - Quién es el negocio en 2 oraciones
   - Tono de comunicación específico
   - Servicios a mencionar y cómo presentarlos
   - CTA final del artículo con texto exacto
   - Qué NUNCA decir en el contenido
   - Instrucción de longitud mínima (1,500 palabras)
   - Instrucción de frontmatter Astro.js
   
   Devuelve SOLO el system prompt, sin explicaciones."

META-PROMPT PARA GENERAR SYSTEM PROMPT DE DMs:
  "Genera el system prompt para el asistente de DMs de {{negocio_nombre}}.
   [mismos datos del Brief Maestro]
   
   El system prompt debe incluir:
   - Personalidad y tono del asistente
   - Servicios disponibles con descripción breve
   - Preguntas de calificación del nicho
   - Cuándo proponer la consulta/cita
   - Qué NUNCA decir
   - Cuándo pasar a humano
   - Cómo manejar preguntas sobre precios
   
   Devuelve SOLO el system prompt, sin explicaciones."
```

---

## FASE 5 — DESPLIEGUE VIA API N8N

### 5.1 Paso a paso del despliegue

```
PASO 1 — CREAR EL WORKFLOW (inactivo):

  POST https://n8n.addendo.io/api/v1/workflows
  Headers:
    X-N8N-API-KEY: {{N8N_API_KEY}}
    Content-Type: application/json
  Body: [JSON completo del workflow]

  RESPUESTA ESPERADA:
  {
    "id": "abc123",
    "name": "Addendo — don-jacinto — Blog SEO Diario",
    "active": false,
    ...
  }

  GUARDAR el ID retornado — se necesita para los siguientes pasos.

PASO 2 — VERIFICAR QUE SE CREÓ CORRECTAMENTE:

  GET https://n8n.addendo.io/api/v1/workflows/{{workflow_id}}
  Verificar:
  - name coincide con el esperado
  - nodes count es correcto
  - connections están bien formadas

PASO 3 — ACTIVAR EL WORKFLOW:

  PATCH https://n8n.addendo.io/api/v1/workflows/{{workflow_id}}
  Body: { "active": true }

  RESPUESTA ESPERADA:
  { "active": true, ... }

PASO 4 — EJECUTAR PRUEBA MANUAL:

  POST https://n8n.addendo.io/api/v1/workflows/{{workflow_id}}/run
  Body: { "runData": {} }

  ESPERAR respuesta y verificar:
  - Status: "success" en todos los nodos
  - No hay errores en ningún nodo
  - Los datos de salida tienen el formato esperado
```

### 5.2 Manejo de errores durante el despliegue

```
ERROR: JSON inválido al crear el workflow
  CAUSA: Error de sintaxis en el JSON construido
  SOLUCIÓN: Validar con JSON.parse() antes de enviar
  ACCIÓN: Identificar el nodo con error, corregir, reintentar

ERROR: Credencial no encontrada
  CAUSA: La credencial referenciada no existe en N8N
  SOLUCIÓN: Crear la credencial en N8N primero
  ACCIÓN: Notificar a José qué credencial falta y cómo crearla

ERROR: 401 Unauthorized
  CAUSA: N8N_API_KEY incorrecta o expirada
  SOLUCIÓN: Verificar la API key en N8N Settings
  ACCIÓN: Actualizar la credencial y reintentar

ERROR: Workflow activado pero falla al ejecutar
  CAUSA: Error en la lógica de un nodo (generalmente el Code node)
  SOLUCIÓN: Ver el log de ejecución en N8N
  ACCIÓN: Corregir el nodo problemático, actualizar el workflow
    PATCH https://n8n.addendo.io/api/v1/workflows/{{id}}
    Body: [JSON corregido]

REGLA:
  Si un workflow falla la prueba de ejecución, NO reportarlo como "activo".
  Mejor reportar "creado con error en nodo X — pendiente de corrección"
  que reportar como completo algo que no funciona.
```

### 5.3 Registro de workflows creados

```
REGISTRO A MANTENER EN GHL (nota en el contacto del cliente):
  Fecha: {{ISO timestamp}}
  Plan: {{starter/growth/scale}}
  Workflows creados:
    ✅ WF-01 Blog SEO — ID: abc123 — Activo
    ✅ WF-02 Respuesta Leads — ID: def456 — Activo
    ✅ WF-03 Nurturing 7 Días — ID: ghi789 — Activo
    ❌ WF-04 ManyChat — ERROR: credencial ManyChat no configurada
    ✅ WF-06 Reseñas — ID: mno234 — Activo
  Pendientes: WF-04 requiere configuración de ManyChat del cliente

REGISTRO A MANTENER EN EL PROYECTO GIT:
  Crear archivo: /workflows/{{cliente_slug}}/index.json
  Contenido:
  {
    "cliente": "{{cliente_slug}}",
    "plan": "{{plan}}",
    "created_at": "{{ISO timestamp}}",
    "workflows": [
      { "name": "WF-01 Blog SEO", "n8n_id": "abc123", "active": true },
      ...
    ]
  }
```

---

## FASE 6 — PROCESO COMPLETO PASO A PASO

```
ORDEN DE EJECUCIÓN PARA CLIENTE NUEVO:

[00:00] Recibir Brief Maestro del director-cuenta (#3) o project-manager (#4)
        Verificar que todos los campos obligatorios están completos

[00:02] Verificar credenciales disponibles en N8N
        GET https://n8n.addendo.io/api/v1/credentials
        Si falta alguna → notificar a José y esperar resolución

[00:05] Verificar que no hay workflows duplicados
        GET https://n8n.addendo.io/api/v1/workflows → buscar por slug del cliente

[00:07] Generar system prompts con Claude
        - System prompt de blog (si aplica WF-01)
        - System prompt de DMs (si aplica WF-04)

[00:10] Construir JSON de WF-01 (Blog SEO)
        Personalizar todas las variables del Brief Maestro
        Validar JSON con JSON.parse()
        Desplegar via API → Guardar ID
        Activar → Ejecutar prueba

[00:15] Construir JSON de WF-02 (Respuesta Leads)
        Personalizar → Desplegar → Activar → Probar

[00:18] Construir JSON de WF-03 (Nurturing 7 Días)
        Personalizar → Desplegar → Activar → Probar

[00:21] Construir JSON de WF-04 (ManyChat) — si aplica
        Personalizar → Desplegar → Activar → Probar

[00:24] Construir JSON de WF-05 (Reporte Semanal) — si aplica
        Personalizar → Desplegar → Activar → Probar

[00:26] Construir JSON de WF-06 (Reseñas)
        Personalizar → Desplegar → Activar → Probar

[00:28] Construir JSON de WF-07 (Inteligencia) — si aplica
        Personalizar → Desplegar → Activar → Probar

[00:30] Subir registro al repositorio GitHub del cliente
        Guardar nota en GHL con todos los IDs y estados
        Notificar a project-manager (#4) con el reporte final

TIEMPO OBJETIVO TOTAL: < 30 minutos
TIEMPO MÁXIMO ACEPTABLE: 60 minutos
```

---

## FASE 7 — REPORTE AL PROJECT-MANAGER

### 7.1 Formato del reporte de entrega

```markdown
## REPORTE DE CONSTRUCCIÓN DE WORKFLOWS
**Cliente:** {{cliente_nombre}} ({{cliente_slug}})
**Plan:** {{plan_contratado}}
**Fecha:** {{ISO timestamp}}
**Tiempo total:** {{X}} minutos

### Workflows Creados y Activos ✅
| Workflow | ID N8N | Estado | Prueba |
|----------|--------|--------|--------|
| Blog SEO Diario | abc123 | ✅ Activo | ✅ OK |
| Respuesta Leads | def456 | ✅ Activo | ✅ OK |
| Nurturing 7 Días | ghi789 | ✅ Activo | ✅ OK |
| Solicitud Reseñas | mno234 | ✅ Activo | ✅ OK |

### Workflows con Errores ❌
| Workflow | Error | Acción Requerida |
|----------|-------|-----------------|
| DMs ManyChat | Credencial "ManyChat API Don Jacinto" no existe | José debe crear la credencial en N8N |

### Pendientes (requieren acción de José o del cliente)
- [ ] Configurar credencial ManyChat en N8N para activar WF-04
- [ ] Cliente debe conectar Instagram a ManyChat

### Links de referencia
- N8N Dashboard: https://n8n.addendo.io
- GHL Sub-cuenta: https://app.gohighlevel.com/location/{{ghl_subcuenta_id}}
- GitHub repo: https://github.com/{{github_repo}}
```

---

## FASE 8 — MÉTRICAS Y KPIs

```
MÉTRICAS OPERATIVAS:

  Velocidad:
    Tiempo desde Brief Maestro completo hasta todos los workflows activos:
    Objetivo: < 30 minutos
    Máximo aceptable: 60 minutos

  Calidad:
    Tasa de workflows activados sin error en primer intento:
    Objetivo: > 90%
    Señal de alerta: < 75% → revisar calidad de las plantillas

    Tasa de workflows que pasan la prueba de ejecución:
    Objetivo: 100% antes de reportar como completo
    Sin excepciones: no reportar como "activo" lo que falla en prueba

  Cobertura:
    Workflows creados vs workflows requeridos por el plan:
    Objetivo: 100% (todos los del plan activos o con razón documentada)

SEÑALES DE QUE ALGO FALLA:
  🔴 Tiempo > 60 minutos → Brief Maestro incompleto o credenciales faltantes
  🔴 > 3 errores en la misma ejecución → revisar la plantilla base
  🔴 Workflow activo pero nunca ejecuta → verificar el trigger
  🔴 Workflows duplicados en N8N → el gate de verificación no se ejecutó
```

---

## FASE 9 — CHECKLIST DE ENTREGA

```
ANTES DE REPORTAR COMO COMPLETO:

[ ] Todos los workflows del plan contratado están creados en N8N
[ ] Todos los workflows tienen el nombre correcto (patrón "Addendo — slug — Nombre")
[ ] Todos los nodos tienen nombres descriptivos (no "HTTP Request", "Code", etc.)
[ ] Todos los workflows están activos (active: true) o tienen razón documentada
[ ] Todos los workflows pasaron la prueba de ejecución sin errores críticos
[ ] Los IDs de N8N están registrados en GHL y en GitHub
[ ] El system prompt de Claude está personalizado con datos reales del cliente
[ ] Las variables del Brief Maestro reemplazaron todos los placeholders
[ ] No hay placeholders como "{{variable}}" sin reemplazar en ningún workflow
[ ] El reporte fue enviado al project-manager (#4)
[ ] El CLAUDE.md o el agentes-addendo.md fue actualizado si es necesario

SEÑAL DE COMPLETADO EXITOSO:
  project-manager (#4) recibe el reporte
  José puede ver los workflows en https://n8n.addendo.io
  El primer workflow del cliente ejecuta correctamente en las próximas 24h
```

---

## FASE 10 — INTEGRACIÓN CON EL ECOSISTEMA

```
POSICIÓN EN EL FLUJO DE CLIENTE NUEVO:

  director-cuenta (#3)
    → Brief Maestro completo
    → activa project-manager (#4)

  project-manager (#4)
    → activa EN PARALELO:
      - onboarding-cliente (#2)    → configurar GHL sub-cuenta
      - agente-auditoria (#10)     → auditar el negocio del cliente
      - agente-constructor-workflows (#50) ← ESTE AGENTE

  agente-constructor-workflows (#50)
    → construye todos los workflows del plan
    → los workflows conectan:
        - DataForSEO → Claude → GitHub (blog)
        - GHL → Claude → WhatsApp (leads)
        - ManyChat → Claude → GHL (DMs)
        - GA4/Ads/GHL → Claude → Gmail (reporte)
    → notifica a project-manager (#4) cuando termina

  project-manager (#4)
    → consolida que onboarding + auditoría + workflows están completos
    → notifica a José: "Cliente {{nombre}} está 100% operativo"

RELACIÓN CON n8n-automatizacion (#24):
  - constructor-workflows crea los workflows estándar de cada cliente
  - n8n-automatizacion maneja workflows custom o excepcionalmente complejos
  - Si un workflow supera 15 nodos o requiere sub-workflows,
    constructor-workflows lo diseña y n8n-automatizacion lo refina
```

---

*Agente #50 del Sistema Operativo de Addendo Growth Partner — Cada cliente nuevo merece tener su sistema nervioso activo en menos de 30 minutos. Eso es lo que este agente garantiza.*
