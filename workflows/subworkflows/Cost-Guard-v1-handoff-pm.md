# Handoff a #4 project-manager — Cost Guard v1

**De:** #50 agente-constructor-workflows v1.1.1
**Para:** #4 project-manager
**Fecha:** 2026-04-27
**Pipeline origen:** Sesión 3 plan 6 sesiones — pre-requisito FASE L skill #40

---

## Workflow compilado

| Campo | Valor |
|---|---|
| Nombre | `Addendo — Cost Guard v1` |
| ID N8N | `iCvHhSkTWiRNrlNe` |
| Webhook productivo | `POST https://n8n.addendo.io/webhook/cost-guard-v1` |
| Estado | `active=true` |
| Nodos | 15 |
| Credenciales usadas | 1 (Redis `Addendo Redis Local` id `ffoEKrHDBuMeDB0h`) |
| Path Mac | `/Users/Mac/addendo-website/workflows/subworkflows/Cost-Guard-v1.json` |
| Path AWS | `/home/ubuntu/addendo-website/workflows/subworkflows/Cost-Guard-v1.json` (post git-pull) |
| Reporte completo | `Cost-Guard-v1.md` |

---

## Testing pre-activación (3 niveles)

| Nivel | Resultado | Detalle |
|---|---|---|
| 1 — Syntax + Zero secrets | ✅ PASS | JSON válido, 0 patrones secret, 0 credenciales hardcoded |
| 2 — Smoke tests E2E | ✅ 4/4 + 2 bonus | check empty, record +0.50, check +0.50, record +2.60 → check capped, validation 400, missing field 400 |
| 3 — Cross-workflow integration | ✅ PASS | Caller workflow `WiBPuisvNw2DFhrk` invoca Cost Guard correctamente vía HTTP |

---

## Observabilidad configurada

- Logs estructurados via `console.log('COST_GUARD_ALERT ' + JSON.stringify(...))` en nodos `Fail-Closed CHECK` y `Fail-Closed RECORD`
- Capturable vía `pm2 logs n8n` (filtro `grep COST_GUARD_ALERT`)
- Recomendado: integrar con #43 agente-monitor para alertar cuando `level: CRITICAL` aparece

---

## Self-Healing configurado

- Nivel 1 (retry inmediato): no necesario en check (idempotente); record sí podría retry-on-fail (no implementado v1)
- Nivel 2 (fail-closed): activado vía `onError: continueErrorOutput` en nodos Redis
- Nivel 3+ (escalación): cuando `alert_sent: true` aparece en respuesta, caller debe escalar a humano vía workflow agente-monitor

---

## Budget estimado

- $0 USD por este compilado (no se invocó Claude API en pruebas; solo lectura Redis + N8N)
- Costo runtime estimado por invocación: ~$0 (Redis + Execute en infra Addendo, sin tokens)
- Latencia: 300-500ms por llamada

---

## Decisiones técnicas que requieren conocimiento de #4

1. **Pivot a Redis nativo** (sin Execute Command): bloqueado por `DisabledNodesRule` v2 en N8N. Caveat de no-atomicidad documentado.
2. **Patrón `webhookId` explícito**: nuevo learning canónico. Próximos workflows N8N de #50 deben incluir `webhookId` field para evitar URL prefijada.
3. **Coerción de tipos en Redis SET**: nuevo learning canónico. Cuando value viene de expresión numérica, requerir `keyType:"string"` + `.toString()`.
4. **Email no enviado en fail-closed v1**: `alert_sent:true` refiere al log estructurado, no a email Gmail. Backlog v1.1.

---

## Acción requerida de #4

1. **Validar Gate CEO**: confirmar al CEO que FASE L del skill #40 (pre-requisito Cost Guard) está cumplida. Sesión 4 puede arrancar el daemon Claude Code productivo siempre que invoque Cost Guard antes y después de cada llamada Claude.
2. **Comunicar a #43 agente-monitor**: configurar alerta para `COST_GUARD_ALERT level:CRITICAL` en pm2 logs n8n.
3. **Decidir backlog v1.1**: cuál de las 4 opciones del backlog (executeCommand, SSH credential, EVAL Lua, Gmail) tiene prioridad cuando el daemon escale.
4. **Coordinar con #25 servidor-cloud**: no requiere acción inmediata. Si en futuro habilita `NODES_EXCLUDE=[]`, requiere `pm2 restart n8n` con downtime ~30s.

---

## Estado y próximo paso

- Cost Guard v1 está LIVE y validado.
- El sistema queda listo para que el daemon Claude Code productivo (Sesión 4) lo consuma.
- Sin blockers arquitectónicos pendientes. Caveats documentados en `Cost-Guard-v1.md`.

#50 cierra ciclo. Handoff completo a #4.
