# Addendo — Cost Guard v1

**Workflow N8N:** `Addendo — Cost Guard v1`
**ID:** `iCvHhSkTWiRNrlNe`
**Webhook productivo:** `POST https://n8n.addendo.io/webhook/cost-guard-v1`
**Estado:** `active=true` — desplegado 27 abril 2026
**Compilado por:** #50 agente-constructor-workflows v1.1.1
**Autoriza:** CEO José Raúl Ramírez (Sesión 3 plan 6 sesiones)

---

## Propósito

Cuarta capa del modelo de seguridad financiera Claude Code (CEO Mandate D6 fail-closed). Aplica un techo agregado de **$3.00 USD/hora** a todas las invocaciones de Claude (CLI vía SSH y API HTTP directa) antes de que se ejecuten. Es subworkflow reutilizable invocable por cualquier otro workflow vía HTTP POST.

Capas previas (no replica):
1. `--max-budget-usd 0.05` por invocación (techo nativo Claude Code)
2. Cap mensual $100 USD en consola Anthropic
3. Notificaciones email $50/$75/$90 a admin@addendo.io
4. Redis 7.0.15 vivo en AWS — esta capa lo consume

---

## Decisiones técnicas

### 1. Pivot arquitectónico: Redis nativo en lugar de Execute Command

**Plan inicial (descartado):** `n8n-nodes-base.executeCommand` + `bash -ic` + `redis-cli INCRBYFLOAT` para garantizar atomicidad.

**Bloqueo descubierto en deploy:** N8N v2 introduce `DisabledNodesRule` (en `/usr/lib/node_modules/n8n/dist/modules/breaking-changes/rules/v2/disabled-nodes.rule.js`) que deshabilita por defecto:
- `n8n-nodes-base.executeCommand`
- `n8n-nodes-base.localFileTrigger`

Reactivar requiere setear `NODES_EXCLUDE=[]` como variable de entorno del proceso N8N (modificación de configuración del servidor que viola **D9 inviolable** — #50 NO modifica config sin autorización CEO).

**Decisión:** pivotar a Redis nativo (`n8n-nodes-base.redis` v1, credencial `Addendo Redis Local` id `ffoEKrHDBuMeDB0h`) usando patrón GET → calc → SET con TTL fijo 3600s.

**Caveat documentado:** la operación `record` no es atómica (race condition posible si ≥2 calls concurrentes). Para v1 piloto Sesión 3 con un solo daemon Claude Code (single-threaded), la pérdida de atomicidad es teórica. Para v1.1 se requerirá:
- Opción A: escalar a CEO autorización para `NODES_EXCLUDE=[]` y volver al patrón Execute Command + INCRBYFLOAT atómico
- Opción B: crear credencial SSH a localhost (también requiere D9 autorización CEO) y usar `n8n-nodes-base.ssh` con `bash -ic` + `redis-cli INCRBYFLOAT`
- Opción C: deployar Lua script a Redis via `EVAL` (requiere acceso CLI inicial al servidor)

### 2. Webhook ID explícito requerido

Bug encontrado en deploy inicial: webhook se registró como `iCvHhSkTWiRNrlNe/webhook/cost-guard-v1` (con prefijo workflow ID) en lugar de `cost-guard-v1`. Causa: campo `webhookId` ausente en el JSON del nodo Webhook → N8N v2 fallback al patrón scoped.

**Patrón canónico Addendo establecido:** todo nodo `n8n-nodes-base.webhook` en JSON deployado vía API debe incluir el campo `webhookId` con un slug determinístico (no UUID generado), para que el webhook se registre en `/webhook/<path>` directo.

```json
{
  "type": "n8n-nodes-base.webhook",
  "parameters": { "path": "cost-guard-v1", ... },
  "webhookId": "cost-guard-v1-webhook"
}
```

### 3. Tipado explícito en Redis SET con valor numérico

Bug encontrado en smoke tests: error "Could not identify the type to set. Please set it manually!" cuando el `value` viene de una expresión que retorna número (no string literal).

**Solución canónica:** explicitar `keyType: "string"` y coercer el valor con `.toString()`:

```json
{
  "operation": "set",
  "key": "={{ $json.key }}",
  "value": "={{ $json.new_total_usd.toString() }}",
  "keyType": "string",
  "expire": true,
  "ttl": 3600
}
```

### 4. TTL fijo 3600s en cada SET

Cada `record` reescribe la clave con TTL=3600s (resetea TTL en cada incremento dentro de la misma hora). Comportamiento aceptable: la clave persiste hasta 1 hora después del último record. La clave de la hora siguiente es distinta (`sec:cost:hourly:YYYY-MM-DD-HH+1`), por lo que no hay contaminación entre horas.

Consecuencia operacional: claves Redis caducan ~1 hora después de la última actividad de su hora UTC. Memoria Redis usada: minúscula (~50 bytes por hora activa).

### 5. Fail-closed via `onError: continueErrorOutput`

Cada nodo Redis tiene `onError: "continueErrorOutput"` (configuración a nivel nodo, no parámetro). Si Redis falla o timeout:
- En MODE check: ruta a `Fail-Closed CHECK` → response `{allow: false, reason: "redis_unavailable_failclosed"}`
- En MODE record: ruta a `Fail-Closed RECORD` → response `{recorded: false, reason: "redis_unavailable", cost_usd_pendiente, alert_sent: true}` + `console.log('COST_GUARD_ALERT ' + JSON.stringify(...))` para captura por logs PM2

Caveat de timeout: el spec pidió 5s timeout. El nodo Redis nativo de N8N usa ioredis con `connectTimeout` por defecto 10000ms; no hay timeout per-command exacto. En la práctica, latencia N8N↔Redis es 285ms (validado en skill #50 sección M.6.1). Para hacer cumplir el techo de 5s estricto, se requiere migración a Execute Command (ver Caveat sección 1).

### 6. Validación defensiva al límite

El nodo `Validate & Build Key` valida:
- `mode` ∈ `{"check", "record"}` — strict equality
- `workflow_id` string no-vacío (trim ≠ "")
- `cost_usd` (solo si mode=record) finito, positivo, ≤ 100 USD (sanity check anti-bug del caller)

Si validación falla: HTTP 400 con `{error: "validation_failed", details: [...]}`. NO se consulta Redis.

### 7. `alert_sent: true` honesto: log estructurado, no email

El campo `alert_sent: true` en respuesta de fallo refiere al log estructurado (`console.log('COST_GUARD_ALERT ' + JSON.stringify(...))`) que queda en `pm2 logs n8n` y es capturable por `#43 agente-monitor`. **NO** se envía email Gmail en v1 (requeriría agregar credencial Gmail OAuth + nodo adicional, fuera del scope Sesión 3). Email integration → backlog v1.1.

---

## Diagrama de nodos (15 nodos)

```
[Webhook POST /cost-guard-v1]
        │
        ▼
[Validate & Build Key]  ← genera _route ∈ {invalid, check, record} + key UTC
        │
        ▼
   [IF invalid?]
        │
        ├─ TRUE  → [Respond 400]
        │
        └─ FALSE → [IF check?]
                       │
                       ├─ TRUE (check) → [Redis GET (check)] ────┬─ success → [Parse CHECK]      → [Respond CHECK]
                       │                                          └─ error   → [Fail-Closed CHECK] → [Respond CHECK]
                       │
                       └─ FALSE (record) → [Redis GET (record)] ─┬─ success → [Compute New Total]
                                                                  │                │
                                                                  │                ▼
                                                                  │           [Redis SET (record)] ─┬─ success → [Build RECORD success] → [Respond RECORD]
                                                                  │                                  └─ error   → [Fail-Closed RECORD] ───→ [Respond RECORD]
                                                                  │
                                                                  └─ error → [Fail-Closed RECORD] ─→ [Respond RECORD]
```

---

## Smoke tests ejecutados (Validación Nivel 2)

Webhook productivo: `https://n8n.addendo.io/webhook/cost-guard-v1`
Hour key del test: `sec:cost:hourly:2026-04-27-21` (UTC)

### Test A — check con clave inexistente

**Request:** `{"mode":"check","workflow_id":"smoke-test-cost-guard-v1"}`
**Response:**
```json
{"allow": true, "current_usd": 0, "cap_usd": 3, "key": "sec:cost:hourly:2026-04-27-21"}
```
**Status:** ✅ PASS — clave no existe → tratada como 0.00, allow:true.

### Test B — record +0.50

**Request:** `{"mode":"record","workflow_id":"smoke-test-cost-guard-v1","cost_usd":0.50}`
**Response:**
```json
{"recorded": true, "new_total_usd": 0.5, "key": "sec:cost:hourly:2026-04-27-21", "ttl_seconds": 3600}
```
**Status:** ✅ PASS — Redis GET (vacío→0) + Compute (0+0.5=0.5) + Redis SET (0.5 con TTL 3600).

### Test C — check después de record

**Request:** `{"mode":"check","workflow_id":"smoke-test-cost-guard-v1"}`
**Response:**
```json
{"allow": true, "current_usd": 0.5, "cap_usd": 3, "key": "sec:cost:hourly:2026-04-27-21"}
```
**Status:** ✅ PASS — Redis GET retorna 0.5, < cap 3.0, allow:true.

### Test D-pre — record +2.60 (total $3.10 > cap $3.00)

**Request:** `{"mode":"record","workflow_id":"smoke-test-cost-guard-v1","cost_usd":2.60}`
**Response:**
```json
{"recorded": true, "new_total_usd": 3.1, "key": "sec:cost:hourly:2026-04-27-21", "ttl_seconds": 3600}
```
**Status:** ✅ PASS — record sí registra el cargo (no bloquea por cap; el cap se aplica solo en check).

### Test D — check siguiente

**Request:** `{"mode":"check","workflow_id":"smoke-test-cost-guard-v1"}`
**Response:**
```json
{"allow": false, "reason": "hourly_cap_exceeded", "current_usd": 3.1, "cap_usd": 3, "key": "sec:cost:hourly:2026-04-27-21"}
```
**Status:** ✅ PASS — current 3.1 ≥ cap 3.0, allow:false con reason claro.

### Test bonus E — invalid mode

**Request:** `{"mode":"foo"}`
**Response:** HTTP 400
```json
{"error":"validation_failed","details":["mode must be 'check' or 'record'","workflow_id required (non-empty string)"]}
```
**Status:** ✅ PASS — validación estricta, HTTP 400, no consulta Redis.

### Test bonus F — missing workflow_id

**Request:** `{"mode":"check"}`
**Response:** HTTP 400
```json
{"error":"validation_failed","details":["workflow_id required (non-empty string)"]}
```
**Status:** ✅ PASS — validación rechaza workflow_id vacío.

### Verificación Redis post-tests

```
VAL=3.1
TTL=3599
```

### Cleanup

`DEL sec:cost:hourly:2026-04-27-21` → `1` (clave eliminada). Estado Redis post-cleanup: limpio.

---

## Validación Nivel 3 — Cross-workflow integration

**Caller workflow:** `TEST-Cost-Guard-v1-caller` (id `WiBPuisvNw2DFhrk`)
**Estructura:** 2 nodos — `Caller Webhook` (POST /cost-guard-caller-test) → `Call Cost Guard` (HTTP Request POST a /cost-guard-v1)

**Invocación:**
```bash
curl -X POST https://n8n.addendo.io/webhook/cost-guard-caller-test -H "Content-Type: application/json" -d '{}'
```

**Response (del caller, que es la response del Cost Guard que recibió):**
```json
{"allow": true, "current_usd": 0, "cap_usd": 3, "key": "sec:cost:hourly:2026-04-27-21"}
```

**Inspección de ejecución 98 (caller):**
- `[Caller Webhook]` → ok, recibe POST {}
- `[Call Cost Guard]` → ok, retorna `{allow:true, current_usd:0, cap_usd:3, key:...}`

**Status:** ✅ PASS — un workflow N8N puede invocar Cost Guard como subworkflow vía HTTP. El caller queda desactivado tras la prueba (sigue presente como referencia, JSON en `Cost-Guard-v1-caller-test.json`).

---

## Validación Nivel 1 — Sintaxis + Zero secrets

- `python3 -m json.tool` parsea OK
- 15 nodos
- 0 patrones de secret detectados (`sk-*`, `ghp_*`, `eyJ*`, `xoxb-*`, `AKIA*`)
- 0 nodos `executeCommand` (bloqueados por DisabledNodesRule v2)
- 1 sola credencial referenciada: `redis` id `ffoEKrHDBuMeDB0h` (existe en N8N — descubierta via inspección del workflow `EJEMPLO-n8n-redis-end-to-end`)
- Tipos de nodo usados: `webhook`, `code`, `if`, `redis`, `respondToWebhook`

---

## Comportamiento en producción esperado

### Llamada típica desde daemon Claude Code

**Pre-invocación (check):**
```bash
RESP=$(curl -s -X POST https://n8n.addendo.io/webhook/cost-guard-v1 \
  -H "Content-Type: application/json" \
  -d '{"mode":"check","workflow_id":"daemon-claude-prod"}')
ALLOW=$(echo "$RESP" | jq -r '.allow')
if [ "$ALLOW" != "true" ]; then
  echo "BLOCKED by Cost Guard: $RESP"
  exit 1
fi
```

**Post-invocación (record):**
```bash
COST=$(claude -p "..." --output-format json | jq -r '.cost_usd')
curl -s -X POST https://n8n.addendo.io/webhook/cost-guard-v1 \
  -H "Content-Type: application/json" \
  -d "{\"mode\":\"record\",\"workflow_id\":\"daemon-claude-prod\",\"cost_usd\":$COST}"
```

### Latencia esperada
- check: ~300-400ms (webhook + 1 Redis GET)
- record: ~400-500ms (webhook + Redis GET + Compute + Redis SET)

Total overhead por invocación Claude (check + record): ~700-900ms. Aceptable para daemon no-interactivo 24/7.

### Memoria Redis
- 1 clave por hora UTC con datos activos
- ~50 bytes por clave (key + valor float)
- Caducan automáticamente 1 hora tras última actividad
- Footprint estimado: <1 KB en cualquier ventana de 1 hora

---

## Backlog v1.1 (post-piloto Sesión 3)

Cuando el daemon Claude Code productivo madure y se justifique migrar a atomicidad estricta, escalar al CEO una de estas opciones:

| Opción | Trade-off |
|---|---|
| Habilitar `executeCommand` vía `NODES_EXCLUDE=[]` en N8N service | Recupera INCRBYFLOAT atómico + timeout 5s estricto vía `timeout 5 redis-cli`. Costo: requiere `pm2 restart n8n` con downtime ~30s. |
| Crear credencial SSH a localhost en N8N | Permite usar `n8n-nodes-base.ssh` con `bash -ic` + `redis-cli INCRBYFLOAT`. Costo: 1 credencial nueva (D9 escalación CEO). |
| Deploy Lua script a Redis via SSH manual | Permite usar `EVAL` desde nodo Redis nativo si N8N lo expone. Requiere validación de operación `eval` disponible. |
| Email Gmail en `Fail-Closed RECORD` | Reemplaza el log estructurado por email real. Requiere credencial Gmail OAuth + nodo Gmail. Mejora `alert_sent` semánticamente. |

---

## Sincronización 3 capas

| Capa | Path | Estado |
|---|---|---|
| Mac local | `/Users/Mac/addendo-website/workflows/subworkflows/Cost-Guard-v1.json` | ✅ |
| GitHub | `AddendoGrowthPartner/addendo-website` branch `main` | (pendiente commit + push) |
| AWS | `/home/ubuntu/addendo-website/workflows/subworkflows/Cost-Guard-v1.json` | (pendiente git pull) |
| N8N runtime | `https://n8n.addendo.io` workflow id `iCvHhSkTWiRNrlNe` active=true | ✅ |

---

## Resumen ejecutivo para CEO

- **Workflow ID:** `iCvHhSkTWiRNrlNe`
- **Webhook:** `POST https://n8n.addendo.io/webhook/cost-guard-v1`
- **Estado:** activo, 15 nodos, 0 secretos en JSON, 1 credencial nativa Redis
- **Smoke tests:** 4/4 PASS + 2 bonus PASS
- **Cross-workflow:** PASS
- **Costo del trabajo:** $0 (no se invocó Claude API en estas pruebas; solo Redis + N8N)
- **Caveat principal:** v1 NO es atómico (race condition teórica si daemon escala a >1 thread); aceptable para piloto Sesión 3 single-threaded
- **Conclusión Gate CEO:** ✅ FASE L pre-requisito skill #40 completado. Cost Guard v1 listo para integrar en daemon Claude Code productivo (Sesión 4).
