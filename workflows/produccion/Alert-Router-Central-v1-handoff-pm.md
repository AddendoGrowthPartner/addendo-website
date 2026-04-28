# Handoff a #4 Project Manager — Alert Router Central v1

**Generado por:** skill #50 v1.1.2  
**Fecha:** 2026-04-27 sesión Y.6  
**Contexto:** D14 cerrado — #43 archivado, función migrada al workflow N8N centralizado `Addendo — Alert Router Central v1` (id `cnN8ngQnoaoEnqAM`)

---

## Tu rol como #4 PM en este flujo

El Alert Router Central v1 es tu **bandeja de entrada operativa**. Cualquier alerta que cualquier skill del sistema produzca aterriza en Redis bajo la clave `agent:4:inbox:{trace_id}`. Tu trabajo:

1. **Leer la bandeja** cada vez que arranque tu sesión (o continuamente si eres Daemon Sesión 4+)
2. **Triage por `alert_type` + `severity`**
3. **Actuar según el patrón canónico de cada tipo** (tabla abajo)
4. **Marcar como procesado** vía `DEL` de la clave Redis (o `EXPIRE 0` para conservar histórico breve)
5. **Escalar al CEO solo cuando el flag `ceo_escalated:true` ya esté presente** en el payload — el router ya tomó la decisión por ti según los flags de contexto del skill emisor

## Cómo leer la bandeja

### Listado de pendientes
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning KEYS \"agent:4:inbox:*\""'
```

### Leer un alert específico
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning GET \"agent:4:inbox:<trace_id>\""'
```

El valor es JSON serializado. Parséalo con `jq` o `python3 -m json.tool`.

### Marcar procesado
```bash
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
  'bash -ic "redis-cli -a \$REDIS_PASSWORD --no-auth-warning DEL \"agent:4:inbox:<trace_id>\""'
```

### TTL automático
Cada alert expira en **7 días** (`EX 604800`). No tienes que limpiar nada manualmente — pero borra los procesados para mantener la bandeja limpia.

## Schema del payload que recibes

```json
{
  "trace_id": "...",
  "alert_type": "credential_exposed | infra_critical | cost_warning | cost_blocked | workflow_failed | analytics_anomaly | system_health",
  "severity": "P0 | P1 | P2 | P3",
  "source_skill": "#NN",
  "timestamp": "<ISO8601 del skill emisor>",
  "received_at": "<ISO8601 del router>",
  "ceo_escalated": true,
  "deduplicated": false,
  "masked_count": 4,
  "masked_breakdown": { "aws_access_key": 1, "anthropic_api": 1, "bearer_jwt": 1, "aws_secret_40": 1 },
  "payload": {
    "title": "Línea breve",
    "description": "Descripción larga (credenciales ya enmascaradas)",
    "context": { "...": "depende del alert_type" }
  },
  "self_heal_attempted": true,
  "self_heal_recovered": false
}
```

**Garantía del router:** `payload.title`, `payload.description` y todo `payload.context` ya pasaron por las 10 regex de enmascaramiento. NO vas a ver credenciales reales en bandeja. Si `masked_count > 0` el alert tocó algo sensible que el router redactó por ti.

## Patrones canónicos de acción por `alert_type`

### `credential_exposed`
**Quien lo emite:** #40 seguridad (típicamente desde scan de commits o leak detection).  
**Tu acción:**
1. Leer `payload.context` — campos típicos: `repo`, `commit_sha`, `requires_ceo_escalation`
2. Si `ceo_escalated:true` → CEO ya recibió email. Tu trabajo: confirmar al CEO que estás coordinando rotación
3. Coordinar con #40 la rotación de la credencial expuesta (NUNCA tocar credenciales tú mismo — frontera #14 de #50)
4. Verificar que el commit comprometido esté revertido o el secret retirado
5. Documentar en `pending-agent-updates/credential-rotations-{YYYY-MM}.md`

**Cuándo escalar al CEO si NO está escalado:** nunca por iniciativa tuya. La decisión de escalation está codificada en `requires_ceo_escalation` que #40 declara basado en su propia rúbrica.

### `infra_critical`
**Quien lo emite:** #25 servidor-cloud (servicios caídos, límites de recursos).  
**Tu acción:**
1. Si `self_heal_attempted:true` y `self_heal_recovered:false` (caso actual hasta Y.6.1) → CEO ya recibió email
2. Coordinar con #25 la recuperación manual
3. Si el problema afecta al sitio del cliente Don Jacinto Nahual o blog Addendo: prioridad P0, comunicar a #45 deployment

**Cuándo escalar al CEO si NO está escalado:** este caso **siempre escala** hoy hasta que Y.6.1 (Self-Heal Validator) esté construido. Cuando exista, recovered:true → no escala (PM resuelve sin CEO).

### `cost_warning` y `cost_blocked`
**Quien lo emite:** #42 analytics (Cost Guard v1, workflow `iCvHhSkTWiRNrlNe`).  
**Tu acción:**
1. `cost_warning` (umbral 70-95% del cap horario): documenta + plantea throttling al CEO si pattern repetido
2. `cost_blocked` (cap excedido, workflows pausados): coordinar con CEO la decisión de subir cap o esperar reset hora siguiente
3. `payload.context` típico: `current_usd`, `cap_usd`, `top_skills_consumiendo`

**Cuándo escalar al CEO si NO está escalado:** cuando veas patrón de 3+ warnings consecutivos en menos de 6 horas, sí escala con resumen agregado.

### `workflow_failed`
**Quien lo emite:** cualquier skill que detecte fallo de un workflow productivo.  
**Tu acción:**
1. Leer `payload.context.client_affected_days` — si ≥ 1 ya escaló al CEO
2. Coordinar con #50 reparación del workflow (no lo arregles tú — frontera, #50 es el constructor)
3. Si afecta a un cliente activo (Don Jacinto Nahual hoy), comunicar a #3 director-cuenta para mensaje al cliente
4. Documentar incidencia en `pending-agent-updates/incidents-{YYYY-MM}.md`

**Cuándo escalar al CEO si NO está escalado:** si ves 2+ workflow_failed del mismo workflow en 24h, pattern indica fragility — escala con análisis.

### `analytics_anomaly`
**Quien lo emite:** #42 analytics (drift en GA4, conversiones, tráfico).  
**Tu acción:**
1. Si `severe_impact:true` ya escaló — CEO ya tiene contexto
2. Coordinar con #42 análisis profundo (root cause)
3. Si la anomalía es del cliente: comunicar a #3 director-cuenta dentro de 24h

**Cuándo escalar al CEO si NO está escalado:** anomalías repetidas o que confirman tendencia negativa.

### `system_health`
**Quien lo emite:** múltiples (heartbeat de subworkflows, monitoreo de #45 deployment, etc).  
**Tu acción:**
1. Si `unresolvable_by_pm:false` → resolver en bandeja sin escalar (es info para tu radar)
2. Si `unresolvable_by_pm:true` → CEO ya recibió email; coordinar resolución técnica con el skill que aplique

**Cuándo escalar al CEO si NO está escalado:** patrón de degradación sostenido (ej: latencia subiendo cada día).

## Formato de respuesta esperada del PM

Cuando proceses un alert, agrega una entrada a `pending-agent-updates/pm-alert-log-{YYYY-MM}.md`:

```markdown
## {trace_id} — {alert_type} — {severity}
- **Recibido:** {received_at}
- **Procesado por #4:** {timestamp procesamiento}
- **Source skill:** {source_skill}
- **CEO escalado:** {ceo_escalated}
- **Acción tomada:** {breve descripción + a quién delegaste}
- **Resultado:** {OK | escalado a CEO | pendiente}
- **Tiempo respuesta:** {Xm | Xh}
```

## SLA de respuesta sugerido

| `severity` | SLA respuesta inicial PM | SLA cierre |
|---|---|---|
| P0 | 5 min | 1 h |
| P1 | 30 min | 4 h |
| P2 | 4 h | 24 h |
| P3 | 24 h | 7 d |

## Lo que NO debes hacer (fronteras)

- **NO toques credenciales tú mismo** — frontera #14 de #50, eso es CEO + #40 (frontera #14 de #50: "no crea credenciales nuevas")
- **NO modifiques workflows tú mismo** — eso es #50
- **NO desactives un alert_type por considerarlo "ruido"** — escala primero al CEO con análisis
- **NO escales duplicados** — el router ya deduplica por hash en ventana 30 min, si recibes un alert es porque NO es duplicado

## Diagnóstico si la bandeja está vacía pero crees que debería tener algo

1. Verifica que el router esté `active:true`:
   ```bash
   ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 'bash -ic "curl -s -H \"X-N8N-API-KEY: \$N8N_API_KEY\" https://n8n.addendo.io/api/v1/workflows/cnN8ngQnoaoEnqAM | python3 -c \"import sys,json; d=json.load(sys.stdin); print(d[\\\"active\\\"])\""'
   ```
2. Verifica el webhook está registrado:
   ```bash
   ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
     'sqlite3 /home/ubuntu/.n8n/database.sqlite "SELECT webhookPath,method FROM webhook_entity WHERE workflowId=\"cnN8ngQnoaoEnqAM\""'
   ```
   Esperado: `alert-router-v1|POST`
3. Si quieres ver los últimos 10 invocaciones (incluyendo errores):
   ```bash
   ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68 \
     'bash -ic "curl -s -H \"X-N8N-API-KEY: \$N8N_API_KEY\" \"https://n8n.addendo.io/api/v1/executions?workflowId=cnN8ngQnoaoEnqAM&limit=10\""'
   ```

## Punto de contacto técnico

Si algo del workflow falla y necesitas que se repare:
- Pide a #50 reparación documentando el `trace_id` afectado y el output del execution con `includeData=true`
- Si #50 no está disponible y es P0: escala al CEO con el ID de execution

---

*Handoff generado por skill #50 v1.1.2 sesión Y.6 — Addendo Agency OS Alert Router Central v1.*
