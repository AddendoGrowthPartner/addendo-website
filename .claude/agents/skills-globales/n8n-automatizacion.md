# SKILL: Integrador Senior de N8N — Construccion Autonoma de Workflows

**Nivel:** Experto absoluto — el mejor integrador de N8N del mundo
**Objetivo:** Cuando Jose dice "construye el workflow X", este skill lo disena, construye, prueba, publica y documenta SOLO, sin intervencion humana.
**Agentes que usan este skill:** #24 n8n-automatizacion, #45 agente-deployment, todos los agentes que necesitan conectar 2+ sistemas
**Infraestructura:** N8N self-hosted en DigitalOcean (IP: 104.131.41.185, Ubuntu 24, Nginx + Let's Encrypt)
**URL base de la API:** `https://n8n.addendo.io/api/v1`
**Autenticacion:** Header `X-N8N-API-KEY: {{N8N_API_KEY}}`

---

## PROTOCOLO DE EJECUCION

Este skill se ejecuta en **9 fases secuenciales**. Nunca se toca N8N a mano. Todo pasa por JSON + API.

**Datos de entrada requeridos:**

```
objetivo_workflow: Descripcion en una frase de lo que debe hacer el workflow
trigger_tipo: schedule / webhook / manual / mixto
cron_expression: (si schedule) ej "0 6 * * 1"
webhook_path: (si webhook) ej "investigacion-prospecto"
sistemas_involucrados: Lista de sistemas a conectar (GHL, Claude, Apify, etc.)
datos_entrada: Estructura de datos que recibe el workflow
datos_salida: Estructura de datos que produce el workflow
es_critico: true/false (si es critico, alertas mas estrictas)
```

---

## FASE 1 — ARQUITECTURA ANTES DE CONSTRUIR

**REGLA DE ORO:** Cero codigo JSON hasta que el diseno en texto este completo y aprobado (internamente validado).

### 1.1 Diseno del flujo en texto

**Formato obligatorio antes de construir:**

```markdown
## DISENO DEL WORKFLOW: {{nombre_workflow}}

### Proposito
{{una frase que explique que hace el workflow}}

### Trigger
Tipo: {{schedule / webhook / manual / mixto}}
Configuracion: {{cron expression o webhook path}}
Frecuencia estimada: {{ej "1 vez por dia a las 6am" o "10-30 veces por dia"}}

### Flujo de datos (narrativa)
1. El workflow se activa cuando...
2. Recibe los siguientes datos: {{estructura}}
3. Ejecuta {{accion 1}} usando {{herramienta 1}}
4. Con el resultado, ejecuta {{accion 2}} usando {{herramienta 2}}
5. Si {{condicion}}, entonces {{rama A}}, si no {{rama B}}
6. Finalmente, guarda en {{destino}} y notifica a {{destinatario}}

### Nodos identificados (orden de ejecucion)
| # | Nombre del nodo | Tipo | Funcion |
|---|-----------------|------|---------|
| 1 | [nombre descriptivo] | [n8n-nodes-base.X] | [que hace] |
| 2 | ... | ... | ... |

### Datos que pasan entre nodos
Nodo 1 -> Nodo 2: {{campos especificos}}
Nodo 2 -> Nodo 3: {{campos especificos}}
...

### Puntos de paralelismo
{{identificar si hay nodos que pueden correr en paralelo}}

### Output final
{{estructura exacta del output y donde va}}
```

### 1.2 Identificacion de credenciales necesarias

**Proceso:**

1. Listar cada sistema externo que el workflow tocara
2. Mapear cada sistema a la credencial correcta (ver Fase 3)
3. Verificar que la credencial YA existe en N8N via API:

```bash
curl -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/credentials"
```

4. Si una credencial falta, DETENER y notificar a Jose. Nunca asumir que se puede crear sola.

**Output de este paso:**

```markdown
### Credenciales requeridas
| Sistema | Tipo de credencial | Nombre en N8N | Existe? |
|---------|-------------------|---------------|---------|
| DataForSEO | httpBasicAuth | DATA FOR SEO API | SI |
| Claude | anthropicApi | Anthropic API Key | SI |
| Gmail | gmailOAuth2 | Gmail Addendo | SI |
```

### 1.3 Identificacion de puntos de falla

**Para cada nodo del flujo, responder 3 preguntas:**

```
1. QUE PUEDE FALLAR en este nodo?
   - Timeout de la API
   - Respuesta con formato inesperado
   - Rate limiting (429)
   - Autenticacion expirada
   - Datos de entrada invalidos

2. QUE HACER si falla?
   - Reintentar (retryOnFail)
   - Continuar con el siguiente nodo (continueOnFail)
   - Detener el workflow y notificar (Error Trigger)
   - Fallback a valor default

3. COMO DETECTAR que fallo?
   - Status code != 2xx
   - Respuesta vacia
   - Campo esperado no presente
   - Timeout excedido
```

### 1.4 Sub-workflows o lineal?

**Decision tree:**

```
ES LINEAL SI:
  - Menos de 15 nodos
  - Un solo trigger
  - No hay logica que se reutilice
  - El workflow corre de inicio a fin sin loops complejos

ES SUB-WORKFLOW SI:
  - Mas de 15 nodos (mantener el principal limpio)
  - Hay logica reutilizable (ej: "enviar notificacion" usada 3 veces)
  - Hay un proceso que se llama desde otros workflows
  - Hay iteracion sobre listas grandes (usar Execute Workflow + Split in Batches)

PATRON RECOMENDADO:
  Workflow principal = orquestador (20% del trabajo)
  Sub-workflows = trabajo especifico (80% del trabajo)
```

### 1.5 Estimacion de tiempo de ejecucion

**Formula:**

```
tiempo_total = SUM(tiempos_nodos_secuenciales) + MAX(tiempos_nodos_paralelos)

TIEMPOS TIPICOS POR NODO:
  HTTP Request (API rapida):        500ms - 2s
  HTTP Request (API lenta):         2s - 10s
  Apify run (sync):                 30s - 5min
  Claude API (max_tokens: 4096):    5s - 20s
  Claude API (max_tokens: 8192):    10s - 45s
  Gmail send:                        1s - 3s
  Google Drive upload:               2s - 10s
  DataForSEO live endpoint:          2s - 15s
  GHL operation:                     1s - 3s
  Code node (JavaScript simple):     <100ms
  Wait node:                         exacto al delay configurado

GATES DE TIEMPO:
  Workflow rapido:     <= 30 segundos
  Workflow normal:     30s - 2min
  Workflow largo:      2min - 10min
  Workflow batch:      > 10min (requiere sub-workflows + async)
```

**Si el tiempo estimado > 10 minutos:**
- Refactorizar a sub-workflows
- Usar Split in Batches
- Considerar processing async con Execute Workflow `continueOnFail: false`

### GATE FASE 1

```
[ ] Diseno textual completo del workflow
[ ] Todas las credenciales identificadas y verificadas en N8N
[ ] Puntos de falla listados con plan de manejo
[ ] Decision lineal vs sub-workflow tomada
[ ] Tiempo total estimado <= gate permitido

Sin este gate cerrado, no se construye NADA en JSON.
```

---

## FASE 2 — CONSTRUCCION VIA JSON — NUNCA MANUAL

**REGLA DE ORO:** Todo workflow se construye como JSON completo y se importa via API. Nunca se arrastra un nodo en la UI.

### 2.1 Estructura obligatoria del JSON

**Template base que TODO workflow debe seguir:**

```json
{
  "name": "Addendo — {{nombre_descriptivo}}",
  "nodes": [],
  "connections": {},
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner",
    "errorWorkflow": "{{id_del_workflow_de_errores_global}}",
    "saveExecutionProgress": true,
    "saveDataErrorExecution": "all",
    "saveDataSuccessExecution": "all",
    "timezone": "America/New_York"
  },
  "staticData": null,
  "tags": [
    { "name": "addendo" },
    { "name": "{{categoria}}" }
  ],
  "triggerCount": {{numero_de_triggers}},
  "active": false,
  "versionId": "1",
  "meta": {
    "templateCredsSetupCompleted": true
  }
}
```

**Convenciones de nombres de workflows:**

```
PATRON: "Addendo — {{Categoria}} {{Accion}}"

EJEMPLOS:
  "Addendo — Inteligencia Semanal Clientes"
  "Addendo — Blog Automatico Diario"
  "Addendo — Leads GHL a WhatsApp"
  "Addendo — Deploy Sitio Cliente Nuevo"
  "Addendo — Prospector Adquisicion Diario"
  "Addendo — Monitor 24/7"

CATEGORIAS VALIDAS:
  Inteligencia / Blog / Leads / Deploy / Prospector / Monitor / Reportes / RP
```

### 2.2 Estructura obligatoria de cada nodo

**Todo nodo debe tener:**

```json
{
  "parameters": { },
  "id": "uuid-v4-unico",
  "name": "Nombre descriptivo del nodo",
  "type": "n8n-nodes-base.{{tipo}}",
  "typeVersion": {{version}},
  "position": [x, y],
  "credentials": { },
  "notes": "Descripcion de que hace este nodo",
  "continueOnFail": false,
  "retryOnFail": false,
  "maxTries": 1,
  "waitBetweenTries": 1000
}
```

**Convenciones de nombres de nodos:**

```
PATRON: "{{Verbo}} {{Que}} [{{Detalle}}]"

EJEMPLOS BUENOS:
  "Recibir Webhook Prospecto"
  "Extraer Datos Prospecto"
  "Llamar DataForSEO Keywords"
  "Crawlear Competidor con Apify"
  "Analizar con Claude Sonnet 4"
  "Guardar Reporte en Drive"
  "Enviar Email Admin"

EJEMPLOS MALOS (prohibidos):
  "HTTP Request"        (generico)
  "HTTP Request1"       (autogenerado)
  "Code"                (generico)
  "Node 1"              (autogenerado)
  "Untitled"            (vergonzoso)
```

**IDs unicos:**

```javascript
// Usar uuid v4 para cada nodo
import { v4 as uuidv4 } from 'uuid';
const nodeId = uuidv4();

// O formato simplificado determinista para legibilidad
const nodeId = `${workflow_slug}-${node_type}-${sequence}`;
// ej: "inteligencia-semanal-claude-01"
```

**Posiciones en el canvas:**

```
CONVENCION DE LAYOUT:
  - Inicio: [240, 300]
  - Espacio horizontal entre nodos: 220px
  - Espacio vertical entre ramas paralelas: 200px
  - Ramas superiores: y - 150
  - Ramas inferiores: y + 150
  
EJEMPLO con 5 nodos lineales:
  Nodo 1: [240, 300]
  Nodo 2: [460, 300]
  Nodo 3: [680, 300]
  Nodo 4: [900, 300]
  Nodo 5: [1120, 300]

EJEMPLO con bifurcacion paralela (3 ramas):
  Trigger:  [240, 300]
  Proceso:  [460, 300]
  Rama A:   [680, 150]
  Rama B:   [680, 300]
  Rama C:   [680, 450]
  Merge:    [900, 300]
```

### 2.3 Estructura obligatoria de connections

**Formato exacto:**

```json
{
  "connections": {
    "Nombre Nodo Origen": {
      "main": [
        [
          {
            "node": "Nombre Nodo Destino",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

**Conexiones paralelas (1 origen -> N destinos):**

```json
"Datos Prospecto": {
  "main": [
    [
      { "node": "DataForSEO Keywords", "type": "main", "index": 0 },
      { "node": "Apify Scraping", "type": "main", "index": 0 },
      { "node": "Apify Ads Transparency", "type": "main", "index": 0 }
    ]
  ]
}
```

**Nodos con multiples outputs (IF, Switch):**

```json
"IF Lead Calificado": {
  "main": [
    [
      { "node": "Stage Propuesta", "type": "main", "index": 0 }
    ],
    [
      { "node": "Stage Nurturing Largo", "type": "main", "index": 0 }
    ]
  ]
}
```

El primer array es output `true`, el segundo es output `false`.

**REGLA:** El nombre usado en `connections` debe coincidir EXACTAMENTE con el `name` del nodo. Case-sensitive, espacios incluidos.

### 2.4 Importacion del workflow via API

**Endpoint:** `POST https://n8n.addendo.io/api/v1/workflows`

```bash
curl -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  -H "Content-Type: application/json" \
  "https://n8n.addendo.io/api/v1/workflows" \
  -d @workflow.json
```

**Respuesta esperada:**

```json
{
  "id": "abc123",
  "name": "Addendo — ...",
  "active": false,
  "createdAt": "2026-04-10T...",
  "updatedAt": "2026-04-10T..."
}
```

**Guardar el `id` devuelto** — se usa en Fases 7, 8 y 9.

### GATE FASE 2

```
[ ] JSON valido (pasa JSON.parse sin errores)
[ ] Nombre del workflow sigue convencion
[ ] Todos los nodos tienen id unico, name descriptivo, type correcto, parameters completos
[ ] connections referencia nombres exactos de nodos
[ ] Posiciones del canvas no se solapan
[ ] Import via API retorna 200 con id del workflow
[ ] Workflow aparece en UI de N8N como "inactive"
```

---

## FASE 3 — CREDENCIALES DISPONIBLES EN N8N

**REGLA:** Usar SIEMPRE el type correcto y el nombre EXACTO de la credencial existente. No inventar nombres.

### 3.1 Tabla maestra de credenciales

| Sistema | type en N8N | Nombre de la credencial | Uso tipico |
|---------|-------------|------------------------|------------|
| Anthropic Claude | `anthropicApi` | Anthropic API Key | Analisis, generacion de contenido |
| DataForSEO | `httpBasicAuth` | **DATA FOR SEO API** | Keywords, SERP, backlinks |
| Apify | `apifyApi` | Apify API Token | Scraping web, redes, ads |
| GitHub | `githubApi` | GitHub Addendo | Repos, commits, deploys |
| Vercel | `httpHeaderAuth` | Vercel API Token | Deploy de sitios |
| Gmail | `gmailOAuth2` | Gmail Addendo | Envio de emails |
| Google Drive | `googleDriveOAuth2` | Google Drive Addendo | Archivos y reportes |
| Google Analytics | `googleAnalyticsOAuth2` | GA4 Addendo | Metricas y reportes |
| Google Search Console | `googleSearchConsoleOAuth2` | Search Console Addendo | SEO, sitemaps, indexacion |
| Google Indexing API | `oAuth2Api` | **API DE INDEXACION DE GOOGLE** | Notificar URLs nuevas a Google |
| Cloudflare | `httpHeaderAuth` | Cloudflare API Token | DNS, cache, SSL |
| GHL GoHighLevel | `httpHeaderAuth` | GHL API Addendo | CRM, pipelines, workflows |
| Meta Business API | `httpHeaderAuth` | Meta Business API | Ads, paginas, insights |
| Freepik | `httpHeaderAuth` | Freepik API | Recursos graficos |
| Fal.ai | `httpHeaderAuth` | Fal.ai API | Generacion imagenes/video IA |
| Cloudinary | `httpHeaderAuth` | Cloudinary API | Optimizacion de imagenes |
| Pexels | `httpHeaderAuth` | Pexels API | Stock photos gratis |
| OpenAI | `openAiApi` | OpenAI API Key | IA complementaria |
| Figma | `httpHeaderAuth` | Figma API Token | Lectura de disenos |
| TikTok | `httpHeaderAuth` | TikTok API | Ads y contenido TikTok |
| LinkedIn | `httpHeaderAuth` | LinkedIn API | Ads y contenido B2B |
| Google Tag Manager | `googleTagManagerOAuth2` | GTM Addendo | Tags y triggers |
| Google My Business | `googleMyBusinessOAuth2` | GBP Addendo | Perfiles locales |
| YouTube | `youTubeOAuth2` | YouTube Addendo | Canales y videos |
| Facebook Graph | `facebookGraphApi` | Facebook Graph Addendo | Paginas y posts |

### 3.2 Referencia de credenciales en nodos

**Formato en el nodo:**

```json
"credentials": {
  "{{type}}": {
    "id": "{{id_de_la_credencial_en_n8n}}",
    "name": "{{nombre_exacto_de_la_credencial}}"
  }
}
```

**Ejemplos reales:**

**DataForSEO (httpBasicAuth):**

```json
"credentials": {
  "httpBasicAuth": {
    "id": "DATAFORSEO_CRED_ID",
    "name": "DATA FOR SEO API"
  }
}
```

**Claude Anthropic (anthropicApi):**

```json
"credentials": {
  "anthropicApi": {
    "id": "ANTHROPIC_CRED_ID",
    "name": "Anthropic API Key"
  }
}
```

**Google Indexing API (oAuth2Api):**

```json
"credentials": {
  "oAuth2Api": {
    "id": "GOOGLE_INDEXING_CRED_ID",
    "name": "API DE INDEXACION DE GOOGLE"
  }
}
```

**GHL (httpHeaderAuth):**

```json
"credentials": {
  "httpHeaderAuth": {
    "id": "GHL_CRED_ID",
    "name": "GHL API Addendo"
  }
}
```

**Gmail (gmailOAuth2):**

```json
"credentials": {
  "gmailOAuth2": {
    "id": "GMAIL_CRED_ID",
    "name": "Gmail Addendo"
  }
}
```

### 3.3 Obtener IDs reales de credenciales

Antes de construir el JSON, obtener los IDs reales:

```bash
curl -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/credentials" \
  | jq -r '.data[] | {id, name, type}'
```

**Output esperado:**

```json
{ "id": "abc123", "name": "DATA FOR SEO API", "type": "httpBasicAuth" }
{ "id": "def456", "name": "Anthropic API Key", "type": "anthropicApi" }
...
```

**Guardar mapeo en memoria:**

```javascript
const CREDENTIALS = {
  dataforseo: { id: "abc123", name: "DATA FOR SEO API", type: "httpBasicAuth" },
  claude: { id: "def456", name: "Anthropic API Key", type: "anthropicApi" },
  gmail: { id: "ghi789", name: "Gmail Addendo", type: "gmailOAuth2" },
  // ...
};
```

### GATE FASE 3

```
[ ] Todas las credenciales necesarias existen en N8N
[ ] Los IDs reales de las credenciales fueron obtenidos
[ ] Cada nodo que las necesita referencia el type y nombre correcto
[ ] Ninguna credencial fue inventada — todos los nombres coinciden con la lista real
```

---

## FASE 4 — TRIGGERS

**REGLA:** Un workflow puede tener multiples triggers. Deben ser PARALELOS, nunca en cadena.

### 4.1 Schedule Trigger (cron)

**Nodo:**

```json
{
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "cronExpression",
          "expression": "{{cron_expression}}"
        }
      ]
    }
  },
  "id": "schedule-trigger-001",
  "name": "Schedule Trigger",
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.2,
  "position": [240, 300]
}
```

**Cron expressions comunes:**

```
"0 6 * * 1"     -> Lunes a las 6:00 AM
"0 7 * * *"     -> Todos los dias a las 7:00 AM
"0 */4 * * *"   -> Cada 4 horas
"*/15 * * * *"  -> Cada 15 minutos
"0 9 * * 1-5"   -> Lunes a viernes a las 9:00 AM
"0 0 1 * *"     -> Primer dia de cada mes a medianoche
"*/5 * * * *"   -> Cada 5 minutos (para monitor)
```

**IMPORTANTE:** N8N interpreta el cron en la `timezone` del workflow. Verificar `settings.timezone`.

### 4.2 Webhook Trigger

**Nodo:**

```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "{{webhook_path}}",
    "responseMode": "lastNode",
    "options": {
      "rawBody": false,
      "responseHeaders": {
        "entries": [
          { "name": "Content-Type", "value": "application/json" }
        ]
      }
    }
  },
  "id": "webhook-trigger-001",
  "name": "Webhook Trigger",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 2,
  "position": [240, 300]
}
```

**Convencion de paths:**

```
PATRON: /{{categoria}}-{{accion}}

EJEMPLOS:
  /investigacion-prospecto
  /blog-generar-articulo
  /leads-nuevo-ghl
  /deploy-sitio-cliente
  /monitor-alerta

EVITAR:
  /webhook1
  /test
  /endpoint
```

**URL final del webhook:**

```
https://n8n.addendo.io/webhook/{{webhook_path}}
```

**Response modes:**

```
"lastNode"     -> Responde con el output del ultimo nodo (recomendado para APIs)
"responseNode" -> Responde con un nodo Respond to Webhook explicito
"onReceived"   -> Responde inmediatamente, procesa async (fire and forget)
```

### 4.3 Manual Trigger

**Para testing y activacion bajo demanda:**

```json
{
  "parameters": {},
  "id": "manual-trigger-001",
  "name": "Manual Trigger",
  "type": "n8n-nodes-base.manualTrigger",
  "typeVersion": 1,
  "position": [240, 500]
}
```

**REGLA:** Todo workflow tiene un Manual Trigger adicional para testing, paralelo al trigger principal.

### 4.4 Workflows con triggers mixtos

**REGLA CRITICA:** Schedule y Webhook se conectan al PRIMER nodo de procesamiento en PARALELO, nunca uno despues del otro.

**Ejemplo correcto:**

```
Schedule Trigger ─┐
                  ├─> Primer Nodo de Procesamiento
Webhook Trigger  ─┤
                  │
Manual Trigger   ─┘
```

**Connections:**

```json
{
  "Schedule Trigger": {
    "main": [[{ "node": "Primer Nodo", "type": "main", "index": 0 }]]
  },
  "Webhook Trigger": {
    "main": [[{ "node": "Primer Nodo", "type": "main", "index": 0 }]]
  },
  "Manual Trigger": {
    "main": [[{ "node": "Primer Nodo", "type": "main", "index": 0 }]]
  }
}
```

**Ejemplo INCORRECTO (prohibido):**

```
Schedule Trigger -> Webhook Trigger -> Nodo
```

Esto no tiene sentido — los triggers son puntos de entrada independientes.

### GATE FASE 4

```
[ ] Trigger principal configurado con cron valido o path valido
[ ] Manual Trigger agregado para testing
[ ] Si hay triggers mixtos, estan en paralelo (no en cadena)
[ ] Timezone del workflow coincide con la expectativa del cron
```

---

## FASE 5 — NODOS MAS USADOS — CONFIGURACION EXACTA

### 5.1 HTTP Request

**Configuracion estandar:**

```json
{
  "parameters": {
    "method": "POST",
    "url": "https://api.ejemplo.com/endpoint",
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "httpBasicAuth",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        { "name": "Content-Type", "value": "application/json" },
        { "name": "Accept", "value": "application/json" }
      ]
    },
    "sendBody": true,
    "specifyBody": "json",
    "jsonBody": "={{ JSON.stringify($json.payload) }}",
    "options": {
      "timeout": 30000,
      "response": {
        "response": {
          "fullResponse": false,
          "neverError": false,
          "responseFormat": "json"
        }
      },
      "redirect": {
        "redirect": {
          "followRedirects": true,
          "maxRedirects": 5
        }
      }
    }
  },
  "id": "http-request-001",
  "name": "Llamar API Ejemplo",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "position": [460, 300],
  "continueOnFail": false,
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
}
```

**Reglas obligatorias para HTTP Request:**

```
[ ] timeout: 30000 minimo (ajustar a 120000 para APIs lentas como Apify)
[ ] retryOnFail: true para APIs externas
[ ] maxTries: 3
[ ] waitBetweenTries: 5000 (5 segundos)
[ ] Headers Content-Type y Accept explicitos
[ ] authentication correctamente configurado via credential
```

### 5.2 Code (JavaScript)

**Modo runOnceForAllItems (por default):**

```json
{
  "parameters": {
    "mode": "runOnceForAllItems",
    "jsCode": "// Procesar todos los items de entrada\nconst items = $input.all();\n\nconst resultados = items.map(item => {\n  const datos = item.json;\n  return {\n    json: {\n      ...datos,\n      procesado: true,\n      timestamp: new Date().toISOString()\n    }\n  };\n});\n\nreturn resultados;"
  },
  "id": "code-001",
  "name": "Procesar Datos",
  "type": "n8n-nodes-base.code",
  "typeVersion": 2,
  "position": [680, 300]
}
```

**Modo runOnceForEachItem (un item a la vez):**

```json
{
  "parameters": {
    "mode": "runOnceForEachItem",
    "jsCode": "// Procesar solo el item actual\nconst datos = $input.item.json;\n\nreturn {\n  json: {\n    ...datos,\n    procesado: true\n  }\n};"
  }
}
```

**REGLA CRITICA del nodo Code:**

```javascript
// SIEMPRE retornar array de objetos { json: { ... } }
// NUNCA retornar objetos sueltos o arrays planos

// [BIEN]
return [
  { json: { dato: 1 } },
  { json: { dato: 2 } }
];

// [MAL]
return { dato: 1 };              // No es array
return [{ dato: 1 }];            // Falta la key json
return [{ json: {}, dato: 1 }];  // La key dato no deberia estar fuera de json
```

**Variables disponibles dentro del Code node:**

```javascript
$input.all()          // Array de todos los items de entrada
$input.item           // Item actual (solo en runOnceForEachItem)
$input.first()        // Primer item
$input.last()         // Ultimo item

$('Nombre Del Nodo').all()     // Items del nodo X
$('Nombre Del Nodo').item      // Item actual del nodo X
$('Nombre Del Nodo').first()   // Primer item del nodo X

$json                 // Shortcut a $input.item.json
$binary               // Shortcut a $input.item.binary

$workflow             // Info del workflow actual
$node                 // Info del nodo actual
$now                  // DateTime actual
$today                // Fecha de hoy

$env                  // Variables de entorno de N8N
```

### 5.3 IF

```json
{
  "parameters": {
    "conditions": {
      "options": {
        "caseSensitive": true,
        "leftValue": "",
        "typeValidation": "strict"
      },
      "conditions": [
        {
          "id": "cond-001",
          "leftValue": "={{ $json.score }}",
          "rightValue": 7,
          "operator": {
            "type": "number",
            "operation": "gte"
          }
        }
      ],
      "combinator": "and"
    },
    "options": {}
  },
  "id": "if-001",
  "name": "IF Lead Calificado",
  "type": "n8n-nodes-base.if",
  "typeVersion": 2.2,
  "position": [900, 300]
}
```

**Outputs del IF:**

```
Output 0 (index 0) = true   -> Si la condicion se cumple
Output 1 (index 1) = false  -> Si NO se cumple
```

**Connections de un IF:**

```json
"IF Lead Calificado": {
  "main": [
    [{ "node": "Rama SI", "type": "main", "index": 0 }],
    [{ "node": "Rama NO", "type": "main", "index": 0 }]
  ]
}
```

**Operadores comunes:**

```
number: equal, notEqual, gt, gte, lt, lte
string: equal, notEqual, contains, notContains, startsWith, endsWith, regex
boolean: true, false
dateTime: equal, before, after, between
array: contains, notContains, lengthEqual, lengthGt, lengthLt
```

### 5.4 Split in Batches

**Para procesar listas grandes sin saturar APIs:**

```json
{
  "parameters": {
    "batchSize": 10,
    "options": {
      "reset": false
    }
  },
  "id": "split-001",
  "name": "Procesar en Lotes de 10",
  "type": "n8n-nodes-base.splitInBatches",
  "typeVersion": 3,
  "position": [460, 300]
}
```

**Patron tipico de Split in Batches:**

```
Lista de 100 items -> Split in Batches (10) -> API externa -> Wait 2s -> Loop back to Split
                                                                                  |
                                                                                  v (cuando termina)
                                                                              Siguiente nodo
```

**Conexion de loop:**

```json
"Split in Batches": {
  "main": [
    [{ "node": "API Externa", "type": "main", "index": 0 }],  // Output 0 = batch actual
    [{ "node": "Nodo Final", "type": "main", "index": 0 }]    // Output 1 = terminado
  ]
},
"Wait": {
  "main": [[{ "node": "Split in Batches", "type": "main", "index": 0 }]]
}
```

### 5.5 Wait

**Para rate limiting entre llamadas a APIs:**

```json
{
  "parameters": {
    "amount": 5,
    "unit": "seconds"
  },
  "id": "wait-001",
  "name": "Esperar 5s Rate Limit",
  "type": "n8n-nodes-base.wait",
  "typeVersion": 1.1,
  "position": [680, 300]
}
```

**Unidades validas:** `seconds`, `minutes`, `hours`, `days`

**REGLAS DE USO:**

```
Despues de DataForSEO -> Wait 2s
Despues de Apify run -> Wait 5s
Despues de Google API (cualquiera) -> Wait 1s
Despues de Claude API -> Wait 2s
Despues de 100 requests HTTP en lote -> Wait 10s

NUNCA:
  - Wait > 60s (usar Schedule Trigger separado en su lugar)
  - Wait al inicio del workflow (usar cron expression)
```

### 5.6 Set

**Para transformar y limpiar datos entre nodos:**

```json
{
  "parameters": {
    "mode": "manual",
    "duplicateItem": false,
    "assignments": {
      "assignments": [
        {
          "id": "assign-001",
          "name": "nombre_limpio",
          "value": "={{ $json.nombre.trim().toLowerCase() }}",
          "type": "string"
        },
        {
          "id": "assign-002",
          "name": "email_valido",
          "value": "={{ $json.email.includes('@') }}",
          "type": "boolean"
        },
        {
          "id": "assign-003",
          "name": "timestamp",
          "value": "={{ $now.toISO() }}",
          "type": "string"
        }
      ]
    },
    "includeOtherFields": true,
    "options": {}
  },
  "id": "set-001",
  "name": "Limpiar Datos Prospecto",
  "type": "n8n-nodes-base.set",
  "typeVersion": 3.4,
  "position": [680, 300]
}
```

**REGLA:** Usar `Set` en vez de `Code` cuando la transformacion es simple (renombrar campos, formateo, tipos). Usar `Code` solo cuando hay logica real.

### 5.7 Merge

**Para combinar outputs de nodos paralelos:**

```json
{
  "parameters": {
    "mode": "combine",
    "combineBy": "combineByPosition",
    "options": {}
  },
  "id": "merge-001",
  "name": "Combinar Resultados",
  "type": "n8n-nodes-base.merge",
  "typeVersion": 3,
  "position": [1100, 300]
}
```

**Modos de Merge:**

```
"append"              -> Concatena items (suma listas)
"combine"             -> Combina items por posicion o por campo
  combineByPosition   -> Item 1 de rama A con item 1 de rama B
  combineByKey        -> Match por campo comun
  combineAll          -> Producto cartesiano
"multiplex"           -> Multiplica items (usar con cuidado)
"chooseBranch"        -> Solo toma una rama
```

**Connections de Merge (2 inputs):**

```json
"Rama A": {
  "main": [[{ "node": "Combinar Resultados", "type": "main", "index": 0 }]]
},
"Rama B": {
  "main": [[{ "node": "Combinar Resultados", "type": "main", "index": 1 }]]
}
```

El `index` especifica a cual input del Merge llega cada rama.

### 5.8 Error Trigger

**NODO OBLIGATORIO en todo workflow:**

```json
{
  "parameters": {},
  "id": "error-trigger-001",
  "name": "Error Trigger",
  "type": "n8n-nodes-base.errorTrigger",
  "typeVersion": 1,
  "position": [240, 700]
}
```

**Conectado a Gmail para notificar:**

```json
{
  "parameters": {
    "sendTo": "admin@addendo.io",
    "subject": "=[ERROR N8N] {{ $json.workflow.name }} fallo",
    "emailType": "html",
    "message": "={{ `<h2>Workflow fallo: ${$json.workflow.name}</h2><p><strong>Execution ID:</strong> ${$json.execution.id}</p><p><strong>Error:</strong> ${$json.execution.error.message}</p><p><strong>Nodo que fallo:</strong> ${$json.execution.lastNodeExecuted}</p><p><strong>Stack trace:</strong></p><pre>${JSON.stringify($json.execution.error.stack, null, 2)}</pre><p><strong>Timestamp:</strong> ${$json.execution.startedAt}</p>` }}",
    "options": {}
  },
  "id": "error-gmail-001",
  "name": "Notificar Error por Gmail",
  "type": "n8n-nodes-base.gmail",
  "typeVersion": 2.1,
  "position": [460, 700],
  "credentials": {
    "gmailOAuth2": {
      "id": "GMAIL_CRED_ID",
      "name": "Gmail Addendo"
    }
  }
}
```

**Connection:**

```json
"Error Trigger": {
  "main": [[{ "node": "Notificar Error por Gmail", "type": "main", "index": 0 }]]
}
```

---

## FASE 6 — MANEJO DE ERRORES — OBLIGATORIO

### 6.1 Error Trigger + Gmail (Fase 5.8 ya lo cubre)

### 6.2 continueOnFail en nodos no criticos

**Cuando un nodo no es bloqueante, permitir que el flujo continue:**

```json
{
  "parameters": { /* ... */ },
  "continueOnFail": true,
  "onError": "continueRegularOutput"
}
```

**USAR `continueOnFail: true` cuando:**

```
- Es un nodo de notificacion (Slack, telegram) que no afecta datos
- Es un nodo opcional (ej: enviar analytics)
- Es un enrichment de datos que si falla no invalida el flujo
- Es un log que si falla no rompe el workflow
```

**NO USAR cuando:**

```
- El nodo obtiene datos criticos para el siguiente paso
- El nodo escribe al CRM/DB (si falla, se pierde informacion)
- El nodo envia el output principal al cliente
```

### 6.3 Retry logic

**Configuracion estandar para nodos HTTP:**

```json
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
}
```

**Ajustes segun severidad:**

```
API rapida y estable (Google):       maxTries: 3, wait: 2000
API lenta o inestable (Apify):       maxTries: 5, wait: 10000
API con rate limiting agresivo:      maxTries: 3, wait: 30000
API interna propia:                  maxTries: 2, wait: 3000
```

### 6.4 Logging en Google Drive

**Nodo de log al final del workflow (exitoso o fallido):**

```json
{
  "parameters": {
    "operation": "create",
    "name": "={{ `log-${$workflow.name}-${$now.toFormat('yyyy-LL-dd-HH-mm-ss')}.json` }}",
    "driveId": { "mode": "list", "value": "DRIVE_ID_ADDENDO" },
    "folderId": { "mode": "list", "value": "LOGS_FOLDER_ID" },
    "options": {
      "content": "={{ JSON.stringify({ workflow: $workflow.name, execution_id: $execution.id, timestamp: $now.toISO(), status: 'success', data: $input.all() }, null, 2) }}"
    }
  },
  "id": "log-drive-001",
  "name": "Log a Google Drive",
  "type": "n8n-nodes-base.googleDrive",
  "typeVersion": 3,
  "position": [1320, 300],
  "credentials": {
    "googleDriveOAuth2": {
      "id": "GDRIVE_CRED_ID",
      "name": "Google Drive Addendo"
    }
  }
}
```

**Estructura de carpetas de logs:**

```
/Addendo/Logs N8N/
  |- 2026-04/
  |   |- log-inteligencia-semanal-2026-04-10-06-00-12.json
  |   |- log-blog-automatico-2026-04-10-07-00-05.json
  |   |- errors/
  |       |- error-deploy-sitio-2026-04-10-14-23-45.json
```

### 6.5 Auto-pausa despues de 3 fallas consecutivas

**REGLA:** Si un workflow falla 3 veces seguidas, pausarlo automaticamente y notificar a Jose.

**Implementacion via Error Workflow global:**

1. Crear un workflow dedicado llamado `"Addendo — Error Handler Global"`.
2. Este workflow recibe errores via Error Trigger.
3. Cuenta fallas consecutivas por workflow en un Google Sheet o staticData.
4. Si cuenta >= 3:
   - PATCH al workflow fallido para desactivarlo: `{ "active": false }`
   - Enviar email CRITICO a jose@addendo.io
   - Log en Drive en la carpeta `/errors/`

**Ejemplo de nodo que desactiva un workflow:**

```json
{
  "parameters": {
    "method": "PATCH",
    "url": "=https://n8n.addendo.io/api/v1/workflows/{{ $json.workflow.id }}",
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "httpHeaderAuth",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        { "name": "X-N8N-API-KEY", "value": "={{ $env.N8N_API_KEY }}" }
      ]
    },
    "sendBody": true,
    "specifyBody": "json",
    "jsonBody": "={\"active\": false}",
    "options": { "timeout": 10000 }
  },
  "id": "pausar-workflow-001",
  "name": "Auto-Pausar Workflow Fallido",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "position": [680, 700]
}
```

### GATE FASE 6

```
[ ] Error Trigger presente y conectado a Gmail
[ ] Nodos criticos con retryOnFail: true, maxTries: 3
[ ] Nodos no criticos con continueOnFail: true si aplica
[ ] Log final a Google Drive (exitoso y error)
[ ] Referencia al error workflow global en settings.errorWorkflow
```

---

## FASE 7 — TESTING ANTES DE PUBLICAR

**REGLA:** Ningun workflow se activa sin haber sido probado exitosamente al menos 1 vez.

### 7.1 Ejecucion manual con datos de prueba

**API:** `POST https://n8n.addendo.io/api/v1/workflows/{{id}}/execute`

```bash
curl -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  -H "Content-Type: application/json" \
  "https://n8n.addendo.io/api/v1/workflows/${WORKFLOW_ID}/execute" \
  -d '{
    "workflowData": {
      "nodes": [...],
      "connections": {...}
    },
    "runData": {
      "Manual Trigger": [
        {
          "startTime": 0,
          "executionTime": 0,
          "data": {
            "main": [[
              {
                "json": {
                  "nombre_negocio": "TEST Negocio",
                  "ciudad": "TEST City",
                  "industria": "plomeria",
                  "email_contacto": "test@addendo.io"
                }
              }
            ]]
          }
        }
      ]
    }
  }'
```

**Alternativa mas simple — llamar al webhook de test:**

```bash
curl -X POST \
  "https://n8n.addendo.io/webhook-test/{{webhook_path}}" \
  -H "Content-Type: application/json" \
  -d '{ "test": true, "nombre_negocio": "TEST" }'
```

**Nota:** `/webhook-test/` corre una sola vez y captura la ejecucion para debug. `/webhook/` es produccion.

### 7.2 Verificar output de cada nodo

**API:** `GET https://n8n.addendo.io/api/v1/executions/{{execution_id}}`

```bash
curl -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/executions/${EXECUTION_ID}?includeData=true"
```

**Verificar en la respuesta:**

```
[ ] data.resultData.runData contiene un entry por cada nodo ejecutado
[ ] Ningun nodo tiene data.error
[ ] El output de cada nodo tiene la estructura esperada
[ ] Los nodos criticos produjeron datos (no arrays vacios)
[ ] finished: true
[ ] status: "success"
```

**Si algun nodo fallo:**

```
1. Capturar el error exacto del nodo
2. Analizar la causa: credencial invalida, parametro mal, timeout, etc.
3. Corregir el JSON del workflow
4. PATCH el workflow con la correccion
5. Volver a ejecutar el test
6. NO activar hasta que el test pase 100%
```

### 7.3 Verificar credenciales

**Antes de ejecutar, validar cada credencial:**

```bash
# Test de credencial DataForSEO
curl -X POST \
  -u "${DATAFORSEO_USER}:${DATAFORSEO_PASS}" \
  "https://api.dataforseo.com/v3/appendix/user_data" \
  | jq '.status_code'

# Test de credencial Claude
curl -X POST \
  -H "x-api-key: ${ANTHROPIC_API_KEY}" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  "https://api.anthropic.com/v1/messages" \
  -d '{"model": "claude-sonnet-4-20250514", "max_tokens": 10, "messages": [{"role": "user", "content": "test"}]}' \
  | jq '.id'

# Test de credencial Gmail
# (mas complejo — OAuth2, verificar via endpoint de profile)
```

### 7.4 Verificar que el trigger funciona

**Schedule Trigger:**

```bash
# Forzar ejecucion del schedule con "run once"
curl -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows/${WORKFLOW_ID}/execute"
```

**Webhook Trigger:**

```bash
# POST al webhook de test
curl -X POST \
  "https://n8n.addendo.io/webhook-test/${WEBHOOK_PATH}" \
  -H "Content-Type: application/json" \
  -d '{"test_payload": "verificar trigger"}'
```

**Verificar:**

```
[ ] HTTP 200 en response
[ ] Execution aparece en la lista de executions
[ ] Todos los nodos se ejecutaron
[ ] Output final es el esperado
```

### 7.5 Checklist pre-activacion

```
[ ] Test manual ejecutado exitosamente con datos de prueba
[ ] Todos los nodos produjeron output esperado
[ ] Todas las credenciales conectaron correctamente
[ ] Trigger funciona (webhook responde, schedule ejecuta)
[ ] Error Trigger probado simulando una falla
[ ] Log en Google Drive verificado
[ ] Tiempo de ejecucion dentro del objetivo estimado en Fase 1
```

### GATE FASE 7

```
Todas las verificaciones deben pasar. No se activa el workflow hasta que:
[ ] Al menos 1 ejecucion exitosa con datos reales
[ ] Ningun nodo en error
[ ] Output final validado manualmente
```

---

## FASE 8 — PUBLICACION Y ACTIVACION

### 8.1 Activar workflow via API

**Endpoint:** `PATCH https://n8n.addendo.io/api/v1/workflows/{{id}}`

**Alternativa moderna:** `POST https://n8n.addendo.io/api/v1/workflows/{{id}}/activate`

```bash
curl -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows/${WORKFLOW_ID}/activate"
```

**Respuesta esperada:**

```json
{
  "id": "abc123",
  "name": "Addendo — ...",
  "active": true,
  "updatedAt": "2026-04-10T..."
}
```

### 8.2 Verificar activacion en la UI

```bash
# Verificar que el workflow esta activo
curl -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows/${WORKFLOW_ID}" \
  | jq '.active'

# Debe retornar: true
```

**En la UI de N8N, el workflow debe mostrar:**

```
[ ] Toggle de activacion: verde (ON)
[ ] Punto verde junto al nombre
[ ] Status: "Active"
[ ] Si tiene Schedule: muestra "Next execution: {{fecha}}"
[ ] Si tiene Webhook: muestra la URL del webhook
```

### 8.3 Confirmar proxima ejecucion de Schedule

```bash
# Obtener el schedule del workflow
curl -X GET \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows/${WORKFLOW_ID}" \
  | jq '.nodes[] | select(.type == "n8n-nodes-base.scheduleTrigger")'
```

**Calcular proxima ejecucion con la cron expression:**

```javascript
const cronParser = require('cron-parser');
const interval = cronParser.parseExpression('0 6 * * 1', { tz: 'America/New_York' });
const next = interval.next().toString();
console.log('Proxima ejecucion:', next);
```

### 8.4 Confirmar URL del webhook

**Para workflows con Webhook Trigger:**

```
URL PRODUCCION:
  https://n8n.addendo.io/webhook/{{webhook_path}}

URL TEST (solo cuando el workflow esta en modo test):
  https://n8n.addendo.io/webhook-test/{{webhook_path}}
```

**Test de la URL de produccion:**

```bash
curl -X POST \
  "https://n8n.addendo.io/webhook/${WEBHOOK_PATH}" \
  -H "Content-Type: application/json" \
  -d '{"test": "ping production"}'
```

### 8.5 Guardar URL y metadata en Google Drive

**Crear documento en:** `/Addendo/Workflows N8N/{{nombre_workflow}}.json`

```json
{
  "workflow_id": "abc123",
  "workflow_name": "Addendo — ...",
  "active": true,
  "trigger_type": "webhook",
  "webhook_url": "https://n8n.addendo.io/webhook/investigacion-prospecto",
  "schedule": null,
  "next_execution": null,
  "created_at": "2026-04-10T14:23:00Z",
  "activated_at": "2026-04-10T14:25:00Z",
  "credentials_used": ["DATA FOR SEO API", "Apify API Token", "Anthropic API Key", "Gmail Addendo"],
  "average_execution_time_seconds": 45,
  "documentation_url": "https://drive.google.com/file/d/..."
}
```

### GATE FASE 8

```
[ ] Workflow activado via API
[ ] Status active: true confirmado
[ ] Schedule: proxima ejecucion calculada y verificada
[ ] Webhook: URL de produccion responde
[ ] Metadata guardada en Google Drive
```

---

## FASE 9 — DOCUMENTACION OBLIGATORIA

**REGLA:** Ningun workflow queda activo sin documentacion. La documentacion es parte del trabajo.

### 9.1 Template de documentacion

**Crear en:** `/Addendo/Workflows N8N/docs/{{nombre_workflow}}.md`

```markdown
# WORKFLOW: {{nombre_workflow}}

**ID en N8N:** {{workflow_id}}
**Estado:** ACTIVO
**Ultima actualizacion:** {{fecha_ISO}}
**Responsable:** agente-n8n-automatizacion (#24)

---

## PROPOSITO

{{Una frase clara que explica que hace este workflow y por que existe.}}

**Contexto:** {{Por que se creo, que problema resuelve, quien lo pidio.}}

---

## TRIGGER

### Tipo de trigger
{{schedule / webhook / manual / mixto}}

### Configuracion
- **Cron expression:** `{{cron_expression}}` (si aplica)
- **Webhook URL:** `{{webhook_url}}` (si aplica)
- **Frecuencia real:** {{ej "1 vez por dia", "5-10 veces por hora"}}
- **Timezone:** America/New_York

### Como se activa manualmente
```bash
# Via webhook
curl -X POST \
  "{{webhook_url}}" \
  -H "Content-Type: application/json" \
  -d '{"campo1": "valor1"}'

# Via API de N8N (forzar ejecucion)
curl -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  "https://n8n.addendo.io/api/v1/workflows/{{workflow_id}}/execute"
```

---

## DATOS DE ENTRADA

### Estructura esperada
```json
{
  "campo1": "descripcion",
  "campo2": "descripcion",
  "campo3": { "nested": "objeto" }
}
```

### Campos obligatorios
- `campo1` — [tipo] — [que es]
- `campo2` — [tipo] — [que es]

### Campos opcionales
- `campo3` — [tipo] — [que es] — default: [valor]

---

## NODOS EN ORDEN

| # | Nombre del nodo | Tipo | Funcion | Credencial |
|---|-----------------|------|---------|-----------|
| 1 | [Trigger] | Webhook/Schedule | [funcion] | — |
| 2 | [Nodo 2] | HTTP Request | [funcion] | [credencial] |
| 3 | [Nodo 3] | Code | [funcion] | — |
| ... | ... | ... | ... | ... |
| N | [Nodo final] | Gmail | [funcion] | Gmail Addendo |

---

## CREDENCIALES UTILIZADAS

| Sistema | Credencial en N8N | Uso en el workflow |
|---------|------------------|-------------------|
| DataForSEO | DATA FOR SEO API | Obtener keywords de la industria |
| Apify | Apify API Token | Scraping del sitio competidor |
| Claude | Anthropic API Key | Analisis y generacion de reporte |
| Gmail | Gmail Addendo | Envio del reporte final |

---

## OUTPUT ESPERADO

### Estructura del output
```json
{
  "status": "success",
  "execution_id": "...",
  "data": { ... }
}
```

### Destino del output
- **Principal:** Email a admin@addendo.io
- **Secundario:** Log en `/Addendo/Logs N8N/`
- **Terciario:** {{si aplica — ej. Google Sheets, GHL, etc.}}

---

## COMO PROBAR MANUALMENTE

### Paso 1: Datos de prueba
```json
{
  "nombre_negocio": "TEST Negocio",
  "ciudad": "Houston",
  "industria": "plomeria",
  "email_contacto": "test@addendo.io"
}
```

### Paso 2: Ejecutar
```bash
curl -X POST \
  "{{webhook_url_test}}" \
  -H "Content-Type: application/json" \
  -d '{json de prueba}'
```

### Paso 3: Verificar
1. Revisar que retorno HTTP 200
2. Verificar en N8N UI -> Executions que aparece una nueva execution
3. Revisar el email en admin@addendo.io
4. Verificar el log en Google Drive

### Paso 4: Tiempo esperado
{{duracion_estimada}} segundos

---

## ERRORES COMUNES Y SOLUCIONES

### Error 1: "DataForSEO 401 Unauthorized"
**Causa:** Credencial DataForSEO expirada o mal configurada
**Solucion:** Verificar credencial en Settings -> Credentials -> DATA FOR SEO API

### Error 2: "Apify timeout"
**Causa:** El sitio competidor es muy grande o Apify esta saturado
**Solucion:**
1. Aumentar timeout del nodo Apify a 300000ms
2. Reducir maxCrawlPages
3. Si persiste, cambiar actor a uno mas rapido

### Error 3: "Claude rate limit"
**Causa:** Muchos workflows usando Claude en paralelo
**Solucion:** Agregar nodo Wait de 2s antes del nodo Claude

### Error 4: "Gmail authentication failed"
**Causa:** Token OAuth2 expirado
**Solucion:** Re-autenticar Gmail en Settings -> Credentials -> Gmail Addendo

### Error 5: "Node has no input data"
**Causa:** Un nodo upstream retorno array vacio
**Solucion:** Revisar el nodo upstream, verificar que los datos de entrada existen

---

## METRICAS Y MONITOREO

### Frecuencia de ejecucion
{{ej "1 vez por dia a las 6am"}}

### Tiempo promedio de ejecucion
{{N segundos}}

### Tasa de exito esperada
{{> 95%}}

### Alertas configuradas
- Email a admin@addendo.io si falla
- Auto-pausa despues de 3 fallas consecutivas
- Log a Google Drive de cada execution

---

## HISTORIAL DE CAMBIOS

| Fecha | Cambio | Autor |
|-------|--------|-------|
| {{fecha}} | Creacion inicial | agente-n8n |
| {{fecha}} | [cambio] | [autor] |

---

*Documentacion generada automaticamente por el skill n8n-automatizacion*
*Workflow ubicado en: https://n8n.addendo.io/workflow/{{workflow_id}}*
```

### 9.2 Guardar en Google Drive

**Via nodo Google Drive o API directa:**

```bash
# Usar Google Drive API v3
curl -X POST \
  -H "Authorization: Bearer ${GDRIVE_TOKEN}" \
  -H "Content-Type: multipart/related; boundary=boundary" \
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart" \
  -d @metadata_y_contenido.txt
```

**O usar el workflow "Addendo — Documentar Workflow" que ya tiene el nodo Google Drive configurado.**

### 9.3 Indexar en el catalogo maestro

**Archivo:** `/Addendo/Workflows N8N/catalogo-maestro.json`

**Append a la lista:**

```json
{
  "workflows": [
    {
      "id": "{{workflow_id}}",
      "nombre": "{{nombre_workflow}}",
      "categoria": "{{categoria}}",
      "trigger_type": "{{tipo}}",
      "activo": true,
      "doc_url": "https://drive.google.com/file/d/{{doc_id}}",
      "creado_en": "{{fecha}}",
      "tiempo_ejecucion_promedio_seg": {{segundos}}
    }
  ]
}
```

### GATE FASE 9

```
[ ] Documentacion creada en /Addendo/Workflows N8N/docs/
[ ] Todos los campos del template completados
[ ] Al menos 5 errores comunes documentados con soluciones
[ ] Indexado en catalogo-maestro.json
[ ] URL de la doc guardada en el metadata del workflow (Fase 8.5)
```

---

## REGLAS MAESTRAS DEL SKILL

1. **Cero construccion manual.** Todo workflow se construye como JSON y se importa via API. La UI de N8N es solo para inspeccion visual, no para construir.

2. **Arquitectura antes de codigo.** Fase 1 es obligatoria. Si no hay diseno textual completo, no se toca JSON.

3. **Nombres descriptivos en TODO.** Workflows, nodos, credenciales, webhooks. Cero "HTTP Request1" ni "Node 2".

4. **Credenciales por referencia, nunca inline.** Jamas hardcodear API keys en el JSON. Usar siempre credentials de N8N.

5. **Usar el nombre EXACTO de la credencial.** Si existe como "DATA FOR SEO API" (con mayusculas), asi se referencia — no "dataforseo" ni "DataForSEO".

6. **Error Trigger obligatorio en todo workflow.** Sin excepciones. Conectado a Gmail admin@addendo.io.

7. **Retry y timeouts explicitos en nodos HTTP.** Default: maxTries 3, wait 5000ms, timeout 30000ms.

8. **Rate limiting via Wait nodes.** Para APIs con limites agresivos, agregar Wait entre llamadas.

9. **Split in Batches para listas > 50 items.** Nunca iterar una lista grande en un solo nodo Code.

10. **Triggers en paralelo, nunca en cadena.** Schedule + Webhook + Manual son puntos de entrada independientes.

11. **Manual Trigger para testing en todos los workflows.** Paralelo al trigger principal.

12. **Testing obligatorio antes de activar.** Al menos 1 ejecucion exitosa con datos reales.

13. **Activacion via API, no via UI.** `POST /workflows/{id}/activate`.

14. **Logs en Google Drive para cada execution.** Carpeta dedicada con timestamp.

15. **Documentacion obligatoria antes de cerrar el ticket.** Sin doc en Drive, el workflow no se considera entregado.

16. **Auto-pausa despues de 3 fallas consecutivas.** Proteccion contra workflows rotos que siguen intentando.

17. **Nunca tocar workflows ajenos sin autorizacion.** Si existen workflows manuales creados por Jose u otro agente, no modificarlos.

18. **Siempre usar el error workflow global.** Referenciarlo en `settings.errorWorkflow` de cada workflow.

19. **Timezone explicita en settings.** `America/New_York` para todos los workflows de Addendo (USA).

20. **Catalogo maestro siempre actualizado.** Cada workflow nuevo se agrega a `catalogo-maestro.json`.
