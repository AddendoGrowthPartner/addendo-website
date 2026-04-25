# TEST-Sesion2-CB-Redis-CC-AWS — Reporte de Validación

**Fecha:** 2026-04-25 00:50 EDT
**Workflow ID:** MLG4B67xXI8WH7Mp
**Estado:** ✅ Smoke test exitoso

## Pipeline validado end-to-end

curl POST → N8N webhook → SSH (OpenSSH key on 127.0.0.1:22) → bash -ic
→ claude CLI --bare → lee test-saludo.md → responde JSON → Code parse
→ Webhook responde HTTP 200

## Resultado smoke test

- HTTP 200
- Latencia total: 6.34s (3.4s internos)
- Costo: $0.0252 USD
- Tokens: 4 input + 150 output
- Respuesta: "Hola Jose, qué gusto saludarte desde el sistema Addendo. ¿En qué puedo ayudarte hoy?"

## Gaps detectados para skill #50 v1.1.2

1. (Baja) GET /credentials sí funciona con admin token — actualizar FASE Z
2. (Media) N8N SSH node default es "password" — declarar "privateKey" en M.18
3. (Alta) lib ssh2 NO acepta PKCS#1 PEM — documentar conversión a OpenSSH RFC4716 en M.18
4. (Baja) chmod 600 necesario antes de ssh-keygen -p si llave fuente es 400
5. (Baja) Activate workflow N8N API requiere body {} — actualizar M.16.1

## Patrones canónicos validados

- ✅ M.18 Claude Code CLI no-interactivo
- ✅ FASE 11.4 deploy via scp + curl @file (Gap 5 v1.1.1)
- ⚠️ M.6.1 Redis Circuit Breaker: NO testeado (Sesión 3)
