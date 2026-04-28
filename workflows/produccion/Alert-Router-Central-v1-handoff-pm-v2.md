# Handoff a #4 Project Manager — Alert Router Central v1 — **v2 enriquecido**

**Generado por:** sesion Y.3 27-abril-2026 (refactor skill #4 v1.0 → v1.1)  
**Supersedes:** `Alert-Router-Central-v1-handoff-pm.md` v1 generado en sesion Y.6 (seed)  
**Por que v2:** v1 era seed minimo; v2 incorpora los 6 sub-protocolos canonicos de M.19 (skill #4 v1.1 commit pendiente) con detalle operacional pleno

---

## 0. Contexto de la version

El handoff v1 (Y.6) se escribio inmediatamente despues de construir el Alert Router como guia minima para que `#4 PM` consumiera la bandeja Redis. Esta v2 lo enriquece sustancialmente integrando los 6 sub-protocolos canonicos definidos en la seccion **M.19 del skill #4 project-manager v1.1** (refactor sesion Y.3 27-abr-2026, commit pendiente).

**Diferencias clave v1 → v2:**
- v1 explicaba COMO leer la bandeja (comandos KEYS/GET/DEL) — v2 lo preserva + agrega los 5 sub-protocolos restantes (M.19.2 a M.19.6)
- v1 listaba patrones canonicos por `alert_type` — v2 formaliza esto como tabla M.19.2 con accion primaria + skill experto + criterio escalacion CEO + regla de re-evaluacion severity
- v1 mencionaba "escalar al CEO si flag presente" — v2 documenta los 3 pasos canonicos de re-emision al router (M.19.3) con payload `[ESCALACION PM]`
- v1 indicaba SLAs P0-P3 generales — v2 los formaliza con definiciones operacionales de "primera respuesta" vs "resolucion" (M.19.6)
- v2 agrega 4 anti-patrones canonicos (M.19.5) que v1 no documentaba
- v2 agrega protocolo de cierre con incident report estructurado (M.19.4) que v1 solo menciono brevemente

**Quien lo aplica:** mientras no exista Daemon Sesion 3, `#4 PM` lo aplica el CEO Jose o cualquier sesion humana que ejecute el rol de #4. Cuando exista Daemon, este sera su instructivo operacional autonomo.

---

## 1. M.19.1 — Lectura de la bandeja Redis (provisional manual)

### Listado de pendientes
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning KEYS \"agent:4:inbox:*\""'
```

### Leer una alerta especifica
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning GET \"agent:4:inbox:<trace_id>\""'
```

El valor es JSON serializado. Parsealo con `python3 -m json.tool` o `jq` (si esta instalado).

### Schema canonico (identico a M.19.1 del skill)

```json
{
  "trace_id": "uuid o caller-defined string unico",
  "alert_type": "credential_exposed | infra_critical | cost_warning | cost_blocked | workflow_failed | analytics_anomaly | system_health",
  "severity": "P0 | P1 | P2 | P3",
  "source_skill": "#40 | #25 | #50 | #42 | otro",
  "timestamp": "<ISO 8601 UTC del skill emisor>",
  "received_at": "<ISO 8601 UTC del router>",
  "ceo_escalated": true,
  "deduplicated": false,
  "masked_count": 4,
  "masked_breakdown": { "aws_access_key": 1, "anthropic_api": 1, "bearer_jwt": 1 },
  "payload": {
    "title": "string corto descriptivo",
    "description": "string completo (credenciales ya enmascaradas)",
    "context": { "...": "datos relevantes per alert_type, deep-masked" }
  },
  "self_heal_attempted": true,
  "self_heal_recovered": false,
  "inbox_path_redis": "agent:4:inbox:{trace_id}"
}
```

**Garantia del router:** las 10 regex canonicas de enmascaramiento (skill #40 L.4) ya se aplicaron sobre `payload.title`, `payload.description` y deep-walk en `payload.context`. Si `#4` ve credenciales reales en algun campo, eso es bug del router → escalar a #40 inmediatamente como nuevo `credential_exposed` con `requires_ceo_escalation:true` y documentar el patron que escapo.

### TTL automatico
Cada alerta expira en **7 dias** (`EX 604800`). #4 NO tiene que limpiar nada manualmente, pero **debe borrar las procesadas con `DEL`** para mantener bandeja limpia (paso 2 de M.19.4).

### NOTA DECLARATIVA — BACKLOG-LECTURA-AUTONOMA
Este flujo de lectura via SSH+redis-cli es **provisional**. Cuando se construya Daemon Claude Code 24/7 (Sesion 3 oficial pendiente), #4 leera la bandeja autonomamente cada X min. La estructura Redis ya esta lista para Daemon — el contrato no cambia, solo el modo de lectura.

---

## 2. M.19.2 — Protocolo de respuesta por `alert_type` (mapa Y.1)

**Regla maestra:** #4 SIEMPRE re-evalua severity declarada por skill emisor. Puede subir P2→P0 si detecta criticidad mayor o bajar P0→P1 si analisis muestra sobre-estimacion. Documentar la decision en handoff M.19.4 con `severity_changed_by_pm` y `severity_original`.

| `alert_type` | Accion primaria de #4 | Skill experto a invocar | Criterio escalacion CEO |
|---|---|---|---|
| **`credential_exposed`** | Validar criticidad real (revisar repo + commit + alcance), coordinar rotacion con #40 | #40 seguridad | Si `payload.context.requires_ceo_escalation=true` (#40 ya marco) o si #4 detecta breach activo |
| **`infra_critical`** (post self-heal failed) | Coordinar con #25 diagnostico profundo, decidir si afecta clientes activos, comunicar a #3 si aplica | #25 servidor-cloud | **SIEMPRE** — el self-heal de #25 ya fallo (mapa Y.1 sub-decision 2); el router siempre marca `ceo_escalated:true` para `infra_critical` hasta que exista Self-Heal Validator Y.6.1 |
| **`cost_warning`** (80% cap horario) | Identificar workflow que sobreconsume via Cost Guard logs (#42), ajustar parametros con #50 | #50 constructor-workflows | Si llega a 95% sin haberse resuelto en ventana de 30 min |
| **`cost_blocked`** (100% cap excedido) | Diagnosticar workflow problematico, decidir reset cap o pausar workflows hasta proxima hora | #50 constructor-workflows | **SIEMPRE** — bloqueo activo afecta operacion productiva |
| **`workflow_failed`** | Verificar si cliente activo esta afectado, coordinar reintento con #50, comunicar a #3 si cliente afectado | #50 constructor-workflows | Si `payload.context.client_affected_days >= 1` (cliente sintio impacto >= 1 dia) |
| **`analytics_anomaly`** | Coordinar con #27 SEO + #21 frontend-dev + #25 segun naturaleza | #42 analytics + skill experto del dominio detectado | Si #4 confirma impacto severo (40%+ caida sostenida en KPI critico) |
| **`system_health`** | Resolver con skill apropiado del dominio (`payload.context.subtype` indica subtipo) | Variable segun subtipo (#25, #45, etc.) | Solo si #4 NO puede resolver con skills disponibles |

---

## 3. M.19.3 — Decision de escalacion al CEO (re-emision al router)

Cuando #4 decide escalar, **NO se salta el router** — re-emite por el mismo canal:

### Paso 1 — Marcar bandeja con `ceo_escalated:true` (preservar TTL)
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning SET \"agent:4:inbox:<trace_id>\" \"<JSON-actualizado>\" KEEPTTL"'
```

### Paso 2 — POST de re-emision al router

```json
{
  "alert_type": "{tipo original o system_health si #4 lo reclasifica}",
  "severity": "{severidad re-evaluada por #4}",
  "source_skill": "#4",
  "trace_id": "{trace_id original — preservar para correlacion end-to-end}",
  "payload": {
    "title": "[ESCALACION PM] {titulo original}",
    "description": "{analisis de #4 + recomendacion de accion para el CEO}",
    "context": {
      "requires_ceo_escalation": true,
      "pm_analysis_summary": "string corto con conclusion #4 (1-2 frases)",
      "pm_recommended_action": "string con que necesita #4 que el CEO decida",
      "original_alert_in_inbox": "agent:4:inbox:{trace_id_original}",
      "severity_changed_by_pm": "true|false",
      "severity_original": "{severity original del skill emisor si #4 cambio}"
    }
  },
  "timestamp": "<ISO 8601 UTC actual>"
}
```

```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '<payload-arriba>' \
  --max-time 15 \
  https://n8n.addendo.io/webhook/alert-router-v1
```

### Paso 3 — Router dispara despacho dual
- Telegram: placeholder hoy (BL-1 router pendiente Bot creation)
- Email: a `admin@addendo.io` con asunto `🚨 [ADDENDO] {severity} — {alert_type} — trace {trace_id}`

### Excepcion explicita del mapa Y.1 (uso <1% de los casos)
Para incidentes P0 catastroficos con compromiso operacional inmediato (ej: credenciales productivas filtradas con uso adversarial activo), #4 puede llamar/WhatsApp directo al CEO sin pasar por router. **Documentar en handoff M.19.4 con razon explicita.**

---

## 4. M.19.4 — Cierre de incidente (handoff post-resolucion)

### Paso 1 — Generar incident report

Path: `/Users/Mac/addendo-website/.claude/agents/inbox/pm-04/closed/{YYYY-MM-DD-HH-MM}-{trace_id}-CLOSED.md`

Schema:
```markdown
---
trace_id: {trace_id original}
alert_type: {tipo}
severity_declared: {severity del skill emisor}
severity_evaluated_by_pm: {severity tras re-evaluacion #4}
severity_changed: {true|false}
opened_at: {timestamp router}
first_response_at: {timestamp #4 leyo bandeja y decidio accion}
closed_at: {timestamp resolucion}
time_to_first_response: {minutos}
time_to_resolution: {minutos u horas}
sla_p0_p3: {P0|P1|P2|P3}
sla_status: {MET | BREACHED}
expert_skill_invoked: {#NN o "ninguno — resuelto por #4"}
ceo_escalated: {true|false}
ceo_escalation_path: {router | excepcion_directa | none}
---

# Incident report — {alert_type} {severity}

## Resumen
{1-3 frases}

## Cronologia
- {timestamp} — Alert Router recibe POST de {source_skill} con trace_id
- {timestamp} — #4 lee bandeja, clasifica
- {timestamp} — #4 invoca {expert_skill} con contexto
- {timestamp} — {expert_skill} aplica {accion}
- {timestamp} — Resolucion confirmada
- {timestamp} — #4 cierra (este reporte + DEL bandeja)

## Acciones tomadas
1. ...
2. ...

## Lecciones aprendidas
- {lessons learned}

## Cambios sugeridos en skill emisor (si aplica)
- {ej: "#40 detecto falso positivo X — ajustar regex Y"}
- {ej: "#25 self-heal nivel N3 nunca dispara — revisar logica"}

## Gap arquitectonico identificado (si aplica)
- {ej: "M.19 no contempla caso de alerta concurrente con dedup parcial — agregar a anti-patrones M.19.5 v1.2"}
```

### Paso 2 — DELETE bandeja
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning DEL \"agent:4:inbox:<trace_id>\""'
```

### Paso 3 — Backlog si gap arquitectonico
Si el incidente revelo gap real, agregar al backlog del skill responsable. Ej: skill #40 v1.1.2 BL-X, skill #50 v1.1.3 BL-Y, o skill #4 v1.2 BL-Z.

### NOTA DECLARATIVA — BACKLOG-CARPETA-CLOSED
La carpeta `inbox/pm-04/closed/` aun no existe. Se crea la primera vez que #4 cierre un incidente real. Cuando exista Daemon Sesion 3, esta carpeta puede migrar a Redis `agent:4:archive:{trace_id}` con TTL 90d para dashboards historicos.

---

## 5. M.19.5 — 4 anti-patrones canonicos (que NO hacer)

### 1. NO procesar alertas saltando #4 directo a CEO sin pasar por la bandeja
Viola disciplina de hub central. Unico caso permitido: excepcion explicita del mapa Y.1 (P0 catastrofico, <1% de los casos).

### 2. NO consultar credenciales sensibles como texto normal
El router enmascaro credenciales con 10 patrones canonicos antes de la bandeja. **Si #4 ve credenciales reales en `payload`, eso es bug del enmascaramiento del router** → escalar a #40 inmediatamente como `credential_exposed` con `requires_ceo_escalation:true`. Documentar el patron que escapo para que el router lo agregue a sus regex.

### 3. NO duplicar emision de alerta si ya existe en bandeja
Si #4 detecta que un incidente ya tiene clave en `agent:4:inbox:*`, NO crear nueva — agregar nota al existente o esperar el cooldown de 30 min del router. El router deduplica por hash, pero #4 debe hacer su propio chequeo (defensa en profundidad).

### 4. NO escalar al CEO sin re-evaluar severity declarada
#4 debe consumir `payload.title + description + context` y decidir si la severidad es correcta. Puede subir P2→P0 si detecta criticidad mayor, o bajar P0→P1 si analisis muestra sobre-estimacion. Documentar la decision en handoff con `severity_changed_by_pm`.

---

## 6. M.19.6 — SLAs canonicos de respuesta

| Severidad | Primera respuesta de #4 (max) | Resolucion (max) |
|---|---|---|
| **P0** | 15 min | 2 horas |
| **P1** | 1 hora | 8 horas |
| **P2** | 4 horas | 48 horas |
| **P3** | 24 horas | 7 dias |

### Definiciones operacionales

- **Primera respuesta** = #4 leyo la bandeja, clasifico el incidente y decidio accion (invocar skill experto / escalar / esperar contexto adicional). NO requiere resolucion completa.
- **Resolucion** = incidente cerrado segun M.19.4 (incident report + DEL bandeja + accion correctiva aplicada).

### Como #4 mide y reporta

Dashboard semanal con:
- `time_first_response` por severidad
- `time_resolution` por severidad
- Tasa de cumplimiento SLA
- Tendencias trimestrales

Reporte va al CEO con propuesta de ajuste de capacidad/automatizacion si tasa cumplimiento <90%.

### NOTA DECLARATIVA — SLAs PROVISIONALES
Estos SLAs son operacionales mientras #4 se ejecuta manualmente (CEO consulta bandeja por lote). Cuando exista Daemon Sesion 3 (lectura autonoma cada X min), los SLAs deben re-validarse con datos reales — probablemente bajaran significativamente para P0/P1 y subiran ligeramente para P2/P3 si el daemon procesa por lote.

---

## 7. Diagnostico si la bandeja esta vacia pero crees que deberia tener algo

### Verificar router activo
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "curl -s -H \"X-N8N-API-KEY: \$N8N_API_KEY\" https://n8n.addendo.io/api/v1/workflows/cnN8ngQnoaoEnqAM | python3 -c \"import sys,json; d=json.load(sys.stdin); print(\\\"active:\\\", d[\\\"active\\\"])\""'
```

### Verificar webhook registrado
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'sqlite3 /home/ubuntu/.n8n/database.sqlite "SELECT webhookPath,method FROM webhook_entity WHERE workflowId=\"cnN8ngQnoaoEnqAM\""'
```
Esperado: `alert-router-v1|POST`

### Ver ultimas 10 invocaciones (incluye errores)
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "curl -s -H \"X-N8N-API-KEY: \$N8N_API_KEY\" \"https://n8n.addendo.io/api/v1/executions?workflowId=cnN8ngQnoaoEnqAM&limit=10\""'
```

### Test ping al webhook (con body invalido — debe responder HTTP 400 con validacion)
```bash
curl -s -X POST -H "Content-Type: application/json" -d '{}' --max-time 15 \
  https://n8n.addendo.io/webhook/alert-router-v1
```

---

## 8. Punto de contacto tecnico

Si algo del workflow falla y necesitas reparacion:
- Pide a #50 reparacion documentando el `trace_id` afectado y el output del execution con `includeData=true`
- Si #50 no esta disponible y es P0: escala al CEO con el ID de execution

---

## 9. Skills relacionadas con detalle de su rol post-D14

| Skill | Rol post-D14 | Donde lee/emite al router |
|---|---|---|
| **#25 servidor-cloud** v1.1.1 (commit `a056fd8`) | Detector tecnico de infra + auto-healing 7 niveles M.6 + emisor `infra_critical` y `system_health` post-failure | M.3.1 del skill #25 |
| **#40 seguridad** v1.1.1 (commit `d528f88`) | Detector de credential_exposed + recomendaciones de rotacion + revision regex de enmascaramiento del router | M.X del skill #40 (refactor previo Y, sesion noche 27-abr) |
| **#50 constructor-workflows** v1.1.2 (commit `d239760`) | Constructor del router mismo + emisor `workflow_failed` cuando un workflow productivo falla | M.18.1 del skill #50 (prohibido nodes) + Cost Guard v1 owner del rate limit |
| **#42 agente-analytics** | Detector de KPI cruzado + emisor `analytics_anomaly` + alimenta Cost Guard con metricas | refactor pendiente — BL-1 del skill #25 v1.1.2 + BL futuro del skill #4 |
| **#4 project-manager** v1.1 (esta sesion Y.3) | **HUB CENTRAL** — consume bandeja Redis + clasifica + invoca expertos + escala CEO segun mapa Y.1 | M.19 del skill #4 (esta seccion + handoff) |

---

*Handoff v2 generado por sesion Y.3 27-abril-2026 — supersedes v1 de Y.6. Cuando exista Daemon Sesion 3, este documento sera el instructivo operacional autonomo de #4.*
