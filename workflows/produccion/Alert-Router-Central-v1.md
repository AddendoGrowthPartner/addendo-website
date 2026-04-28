# Addendo — Alert Router Central v1

**Workflow ID:** `cnN8ngQnoaoEnqAM`  
**Webhook URL:** `https://n8n.addendo.io/webhook/alert-router-v1`  
**Estado:** `active=true`  
**Compilado por:** skill #50 agente-constructor-workflows v1.1.2  
**Fecha despliegue:** 2026-04-27 noche EDT, sesión Y.6  
**Cierra:** D14 (#43 archivado → workflow N8N centralizado) + deuda funcional Sesión 2.5  
**Decisión Y.1 CEO:** archivo `.md` PM provisional reemplazado por **Redis `agent:4:inbox:{trace_id}`** desde día 1 (Opción B confirmada por José Raúl 27-abr noche)

---

## 1. Resumen ejecutivo

Receptor central de alertas del Addendo Agency OS. Cualquier skill (`#40`, `#25`, `#42`, `#50`, etc.) emite vía `HTTP POST` con payload estandarizado; el router valida, enmascara credenciales (10 patrones), deduplica vía hash + Redis (cooldown 30 min), enruta por `alert_type` a 7 destinos canónicos, escribe la bandeja `#4 PM` en Redis con TTL 7 días, y escala al CEO vía Gmail solo cuando el flag de contexto del skill emisor lo solicite (o siempre para `infra_critical` hasta que exista el Self-Heal Validator Y.6.1).

## 2. Diagrama de los 7 alert_type y sus rutas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ POST /webhook/alert-router-v1   ←   skills emisores (#40, #25, #42, #50…)  │
└──────────────┬──────────────────────────────────────────────────────────────┘
               │
        ┌──────▼──────────────────┐
        │ Validate Mask Hash      │  ── valida body, enmascara, FNV-1a 64-bit
        └──────┬──────────────────┘
               │
       invalid?├── Respond 400  (terminal)
               │
       ┌───────▼───────────────┐
       │ Redis GET cooldown    │── error → Code Fail-Closed → Respond 200 (FC)
       └───────┬───────────────┘
        match? │
               ├── Respond 200 deduplicated:true  (terminal)
               │
       ┌───────▼───────────────┐
       │ Redis SET cooldown    │  TTL 1800s, keyType:string, .toString()
       └───────┬───────────────┘
               │
       ┌───────▼─────────────────┐
       │ Code Self-Heal Placeholder │  infra_critical → recovered:false (Y.6.1)
       └───────┬─────────────────┘
               │
       ┌───────▼───────────────┐
       │ Redis SET inbox PM4   │  agent:4:inbox:{trace_id} TTL 604800s
       └───────┬───────────────┘
               │
       ceo_escalated?
               │
       ┌───────┼─────────────┐
       │ true                │ false
       ▼                     ▼
  Gmail send                 │
  (admin@addendo.io) ────────┤
  Telegram (DISABLED)        │
       └───────┬─────────────┘
               │
       ┌───────▼───────────────┐
       │ Code Build Response   │  refetch desde Self-Heal node
       └───────┬───────────────┘
               │
        Respond 200 success  (terminal)
```

### Tabla de routing por `alert_type`

| `alert_type` | Bandeja PM (Redis) | Self-Heal | Escalación CEO (cuando) |
|---|---|---|---|
| `credential_exposed` | sí | no | sólo si `payload.context.requires_ceo_escalation === true` |
| `infra_critical` | sí | sí (placeholder Y.6.1) | siempre hoy (placeholder devuelve `recovered:false`) |
| `cost_warning` | sí | no | sólo si `payload.context.requires_ceo_escalation === true` |
| `cost_blocked` | sí | no | sólo si `payload.context.requires_ceo_escalation === true` |
| `workflow_failed` | sí | no | sólo si `payload.context.client_affected_days >= 1` |
| `analytics_anomaly` | sí | no | sólo si `payload.context.severe_impact === true` |
| `system_health` | sí | no | sólo si `payload.context.unresolvable_by_pm === true` |
| _otro_ | — | — | HTTP 400 `Unknown alert_type` |

## 3. Patrones de enmascaramiento (10 regex)

Aplicados en orden — más específicos primero, más amplios al final. Todos sobre `payload.title`, `payload.description` y deep-walk sobre `payload.context`.

| # | Patrón | Reemplazo |
|---|---|---|
| 1 | `/AKIA[0-9A-Z]{16}/g` | `AKIA****REDACTED****` |
| 2 | `/sk-ant-api03-[A-Za-z0-9_-]+/g` | `sk-ant-api03-****REDACTED****` |
| 3 | `/sk-(proj-)?[A-Za-z0-9_-]{40,}/g` | `sk-****REDACTED****` |
| 4 | `/gh[ps]_[A-Za-z0-9]{36,}/g` | `gh****REDACTED-GITHUB****` |
| 5 | `/github_pat_[A-Za-z0-9_]{82}/g` | `github_pat_****REDACTED****` |
| 6 | `/1\/\/[A-Za-z0-9_-]{40,}/g` | `1//****REDACTED-GOOGLE****` |
| 7 | `/Bearer\s+eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g` | `Bearer ****REDACTED-JWT****` |
| 8 | `/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?(\d{4})\b/g` | `****-****-****-$1` |
| 9 | `/[A-Za-z0-9\/+=]{40}/g` | `****REDACTED-AWS-SECRET****` |
| 10 | `/[A-Za-z0-9_-]{50,}/g` (contextual `token/key/secret/password/auth`) | `****REDACTED-TOKEN****` |

Si `masked_count > 0` → log estructurado pm2: `COST_GUARD_ALERT level:WARN type:CREDENTIAL_DETECTED_IN_ALERT trace_id:{trace_id} masked_count:{N} breakdown:{json}`.

## 4. Hash de deduplicación

`hash_trace = FNV-1a-64-bit-hex(alert_type + '|' + source_skill + '|' + payload.title + '|' + payload.description)` → 16 chars hex.

Rationale del cambio respecto al spec original (SHA-256 → FNV-1a 64-bit): el sandbox del Code node de N8N v2.8.4 bloquea `require('crypto')`. FNV-1a 64-bit es determinístico, mismo input → mismo output, y la propiedad requerida es resistencia a colisiones para dedup en ventana de 30 min — no cripto-fuerza. Documentado en backlog: si el Daemon Sesión 4 cambia a un sandbox que sí permite `crypto`, swap a SHA-256 16-hex es 1 línea.

Clave Redis: `alert:cooldown:{hash_trace}` con TTL 1800s + `keyType:"string"` + `.toString()` (M.20).

## 5. Bandeja `#4 PM` en Redis

Clave: `agent:4:inbox:{trace_id}`  
Tipo: `string`  
TTL: `604800s` (7 días)  
Valor: JSON serializado con esquema:

```json
{
  "trace_id": "<uuid o caller-defined>",
  "alert_type": "<uno de los 7>",
  "severity": "P0|P1|P2|P3",
  "source_skill": "#NN",
  "timestamp": "<ISO8601 del skill emisor>",
  "received_at": "<ISO8601 del router>",
  "ceo_escalated": true,
  "deduplicated": false,
  "masked_count": 4,
  "masked_breakdown": { "aws_access_key": 1, "anthropic_api": 1, "bearer_jwt": 1, "aws_secret_40": 1 },
  "payload": {
    "title": "...",
    "description": "... credenciales enmascaradas ...",
    "context": { "...": "deep masked" }
  },
  "inbox_path_redis": "agent:4:inbox:<trace_id>",
  "self_heal_attempted": true,
  "self_heal_recovered": false
}
```

Lectura por `#4 PM`: ver `Alert-Router-Central-v1-handoff-pm.md`.

## 6. Smoke tests (4 escenarios — 24/24 PASS)

Ejecutados contra `https://n8n.addendo.io/webhook/alert-router-v1` el **2026-04-28 00:40 UTC** post-deploy. Latencias 0.27s – 0.62s.

### A) `credential_exposed` con AWS Key sintética + escalation flag — **PASS 8/8**
- payload contenía `AKIAIOSFODNN7EXAMPLE`, `sk-ant-api03-syntheticKey…`, `Bearer eyJ…`
- HTTP 200 en 0.62s, `received:true`, `trace_id` matches
- `masked_count=4` (AKIA + sk-ant + Bearer + AWS-Secret 40-char), breakdown completo
- `ceo_escalated:true`, `email_sent:true`, `pm_inbox_key:"agent:4:inbox:smoketest-A-…"`, `deduplicated:false`

### B) `infra_critical` → Self-Heal placeholder false → escalate — **PASS 5/5**
- payload "n8n service down on AWS"
- HTTP 200 en 0.40s, `received:true`, `alert_type:infra_critical`
- Self-Heal placeholder devolvió `recovered:false` (esperado hasta Y.6.1)
- `ceo_escalated:true`, `email_sent:true`

### C) Misma alerta enviada 2 veces — **PASS 5/5**
- `system_health` payload idéntico, dos `trace_id` distintos enviados con 1s entre sí
- Primera: HTTP 200 `deduplicated:false`, escribe Redis cooldown + inbox
- Segunda: HTTP 200 `deduplicated:true`, `original_trace_id` apunta correctamente al primero, NO escribe inbox, NO escala CEO

### D) `cost_warning` sin escalation flag — **PASS 6/6**
- `payload.context.requires_ceo_escalation:false`
- HTTP 200 en 0.34s, `received:true`, `ceo_escalated:false`, `email_sent:false`
- `pm_inbox_key` set (bandeja sí), Gmail NO disparado

### Limpieza Redis post-test
```
KEYS alert:cooldown:* (after) → 0
KEYS agent:4:inbox:smoketest-* (after) → 0
```

## 7. Invariantes verificadas

| Invariante | Verificación |
|---|---|
| Enmascaramiento OBLIGATORIO en TODO payload | ✓ Code node `Validate Mask Hash` aplica los 10 patrones siempre antes del SET inbox |
| Redis fail-closed (no escalar al CEO descontrolado) | ✓ Rama `Code Fail-Closed` → `Respond 200 Fail-Closed` con `deduplicated:true, fail_closed:true` |
| Gmail no bloquea si falla | ✓ `onError:"continueRegularOutput"` en nodo Gmail |
| NUNCA escalar duplicados (ventana 30 min) | ✓ Redis SET con `EX 1800` antes de SET inbox o Gmail |
| 0 nodos prohibidos M.18.1 | ✓ Validador Nivel 1 PASS — sin `executeCommand`, `localFileTrigger`, `ssh allowAnyHost`, `eval`, `child_process` |
| `webhookId` M.19 | ✓ `alert-router-v1-webhook` — webhook_entity registrado limpio sin path scoped |
| Redis SET keyType+.toString() M.20 | ✓ ambos SETs (cooldown + inbox) con `keyType:"string"` + `.toString()` en value |

## 8. Backlog inmediato declarado

| # | Item | Prioridad | Quien |
|---|---|---|---|
| BL-1 | **Crear Bot Telegram** en BotFather, agregar credencial `telegramApi` en N8N, descomentar nodo `Telegram CEO (DISABLED placeholder)` y conectar desde rama `IF ceo_escalated? true` en paralelo a Gmail | alta | CEO + #50 |
| BL-2 | **Construir workflow auxiliar Self-Heal Validator (Y.6.1)** — webhook `/self-heal-validator`, recibe `{service, host, payload}`, ejecuta HTTP 200 check + smoke test workflow `blog-don-jacinto` (workflow id `NKyH6etI3cF8En7n`), devuelve `{recovered: bool, attempts, latency_ms}`. Reemplazar nodo placeholder por nodo HTTP Request real | alta | #50 sesión Y.6.1 |
| BL-3 | **Subir hash de SHA-256** cuando el Daemon Sesión 4 use sandbox con `crypto` permitido. Hoy FNV-1a 64-bit es suficiente para dedup, swap es 1 línea | baja | #50 sesión 4 |
| BL-4 | **Pre-validador del payload del skill emisor**: hoy si un skill envía `requires_ceo_escalation:true` en `cost_warning` no hay control. En v2 agregar tabla de campos válidos por `alert_type` (skill #40 ya enumera estos en sección L.4 spec D14) | media | #50 |

## 9. Configuración de despliegue

- **Workflow ID N8N:** `cnN8ngQnoaoEnqAM`
- **Caller-test workflow ID:** `UuqRvZoUXmWuzv2Y` (active:false, Manual Trigger only)
- **Path Mac:** `/Users/Mac/addendo-website/workflows/produccion/Alert-Router-Central-v1.json`
- **Path AWS:** `/home/ubuntu/addendo-website/workflows/produccion/Alert-Router-Central-v1.json` (post sync)
- **Webhook entity (sqlite verify):** `webhookPath=alert-router-v1, method=POST` ✓ limpio (sin scoping per-workflow id)
- **Credenciales N8N referenciadas (no embebidas):**
  - Redis: `ffoEKrHDBuMeDB0h` ("Addendo Redis Local")
  - Gmail: `rD8DDJhSiG1dpOwO` ("Gmail API")

## 10. 18 nodos del workflow

| # | Nombre | Tipo | Función |
|---|---|---|---|
| 1 | Webhook Alert Router | `webhook` v2.1 (webhookId) | Entry POST `/alert-router-v1` |
| 2 | Validate Mask Hash | `code` v2 | Valida + enmascara 10 regex + FNV-1a hash + ceo_escalated preliminar |
| 3 | IF invalid? | `if` v2.2 | Branch validación |
| 4 | Respond 400 | `respondToWebhook` v1.5 | Terminal validación falla |
| 5 | Redis GET cooldown | `redis` v1 (onError:continueErrorOutput) | Lookup hash dedup |
| 6 | Code Fail-Closed | `code` v2 | Handler Redis error |
| 7 | Respond 200 Fail-Closed | `respondToWebhook` v1.5 | Terminal Redis down |
| 8 | Code Check Dedup | `code` v2 | Parsea Redis GET output, decide fresh/dedup |
| 9 | IF deduplicated? | `if` v2.2 | Branch dedup |
| 10 | Respond 200 Dedup | `respondToWebhook` v1.5 | Terminal duplicada |
| 11 | Redis SET cooldown | `redis` v1 SET keyType+.toString() | TTL 1800s |
| 12 | Code Self-Heal Placeholder | `code` v2 | infra_critical → recovered:false (Y.6.1) |
| 13 | Redis SET inbox PM4 | `redis` v1 SET keyType+.toString() | TTL 604800s |
| 14 | IF ceo_escalated? | `if` v2.2 | Branch escalación |
| 15 | Gmail Escalate CEO | `gmail` v2.1 (onError:continueRegularOutput) | Email a admin@addendo.io |
| 16 | Code Build Response | `code` v2 (refetch upstream) | Construye response final |
| 17 | Respond 200 Success | `respondToWebhook` v1.5 | Terminal éxito |
| 18 | Telegram CEO (DISABLED placeholder) | `httpRequest` v4.2 disabled:true | TODO BotFather |

## 11. Nota declarativa — Migración Daemon Sesión 4

La bandeja `agent:4:inbox:{trace_id}` está **lista para Daemon** desde día 1 (decisión CEO Y.1 Opción B). Cuando el Daemon Claude Code 24/7 se construya en Sesión 3 oficial, su workflow lector será `KEYS agent:4:inbox:*` + `GET` + `DEL` (o `EXPIRE 0`). NO requiere cambio en este workflow — ya está alineado con el contrato del Daemon.

Esto cierra el TODO `BACKLOG-MIGRATION-DAEMON` que existía en spec original con bandeja `.md`. La spec del CEO Y.1 mejoró la decisión arquitectónica al saltarse el paso `.md` provisional.

## 12. Cómo invocar el router desde un skill emisor

```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '{
    "alert_type": "credential_exposed",
    "severity": "P0",
    "source_skill": "#40",
    "trace_id": "uuid-aqui-o-timestamp+hash",
    "payload": {
      "title": "Resumen 1 línea",
      "description": "Descripción completa...",
      "context": {
        "requires_ceo_escalation": true,
        "extra_context_relevant_per_alert_type": "..."
      }
    },
    "timestamp": "2026-04-28T00:40:00Z"
  }' \
  https://n8n.addendo.io/webhook/alert-router-v1
```

Respuesta esperada (200):
```json
{
  "received": true,
  "trace_id": "...",
  "alert_type": "credential_exposed",
  "deduplicated": false,
  "credential_masked_count": 0,
  "ceo_escalated": true,
  "pm_inbox_key": "agent:4:inbox:...",
  "telegram_sent": false,
  "email_sent": true
}
```

---

*Compilado por skill #50 v1.1.2 con disciplina máxima — cierra D14 (#43 archivado) per José Raúl Ramírez sesión Y.6 27-abr-2026.*
