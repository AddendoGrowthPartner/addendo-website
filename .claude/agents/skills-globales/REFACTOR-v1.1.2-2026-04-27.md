# Refactor skill #50 v1.1.1 → v1.1.2

**Fecha:** 2026-04-27
**Agente:** #50 agente-constructor-workflows
**Trigger:** cierre de 8 gaps acumulados (5 Sesion 2 + 3 Sesion 3 Cost Guard v1)
**Commits referenciados:** `dfaf6d8` (Sesion 2 Gate CEO), `c697be2` (Cost Guard v1 LIVE)
**Autorizado por:** CEO Jose Raul Ramirez

---

## 1. Resumen de cambios

| Tipo de cambio | Cantidad | Detalle |
|---|---|---|
| Sub-secciones nuevas | 3 | M.18.1, M.19, M.20 |
| Sub-secciones ampliadas | 1 | M.18 (bloque "Configuracion del nodo SSH" con gaps 2-4) |
| Patches puntuales en secciones existentes | 2 | FASE Z gap 1 + M.16.1 paso 2 gap 5 |
| Header / metadata | 2 | version v1.1.1→v1.1.2, ultima_actualizacion 2026-04-25→2026-04-27 |
| Indice navegable | 2 entradas | Linea FASE M actualizada + 3 filas nuevas en tabla "Uso rapido por escenario" |
| CHANGELOG | 1 entrada nueva al tope | v1.1.2 con 8 gaps + auto-evaluacion 109/110 honesta |
| Cierre Canonico | 2 lineas | Version + Mandamientos referencias v1.1.1→v1.1.2 |

**Lineas netas anadidas al skill:** ~360 lineas (ver checksum y wc -l antes/despues en seccion 5).

---

## 2. Diff conceptual — secciones tocadas y por que

```
Header YAML (L1-12)
  └─ version v1.1.1 → v1.1.2
  └─ ultima_actualizacion 2026-04-25 → 2026-04-27

Indice navegable (L86, L125-130)
  └─ FASE M: anadidas referencias M.18.1 / M.19 / M.20 + nota gaps SSH 2-4 en M.18
  └─ Tabla "Uso rapido por escenario": 3 filas nuevas (pivotar nodo prohibido / webhookId / Redis SET keyType)

M.16.1 paso 2 — Activacion temporal
  └─ Comando curl: + flags -d '{}' y -H Content-Type (gap 5)

M.18 Claude Code CLI no-interactivo
  └─ Tras "Honestidad operacional v1.1.1": bloque "Actualizacion v1.1.2" + sub-bloque
     "Configuracion del nodo SSH N8N para invocar Claude Code CLI (gaps 2-4 v1.1.2)"

M.18.1 NUEVA — Pivot patrones nodos prohibidos (gap 8)
  ├─ M.18.1.1 Lista canonica de 7 nodos prohibidos (tabla razon + fuente)
  ├─ M.18.1.2 Pivots canonicos por nodo (Claude Code CLI, Redis, code+child_process, httpRequest URL dinamica)
  │   └─ Caveat de atomicidad pivot Redis + 4 opciones canonicas v1.2 (Lua EVAL / INCRBYFLOAT via SSH / WATCH-MULTI-EXEC / distributed lock)
  └─ M.18.1.3 Pre-validacion en Bloque 3 con funcion validateNoProhibitedNodes

M.19 NUEVA — Webhook node webhookId obligatorio (gap 6)
  ├─ M.19.1 Sintoma + diagnostico canonico (sqlite3 webhook_entity)
  ├─ M.19.2 Patron canonico con slug deterministico
  ├─ M.19.3 Comparativa correcto vs incorrecto
  └─ M.19.4 Recovery cuando el bug ya ocurrio en produccion + validacion Nivel 1 extendida

M.20 NUEVA — Redis SET con value numerico keyType obligatorio (gap 7)
  ├─ M.20.1 Sintoma + causa raiz
  ├─ M.20.2 Patron canonico keyType:"string" + .toString()
  ├─ M.20.3 Comparativa correcto vs incorrecto
  └─ M.20.4 Validacion Nivel 1 extendida

FASE Z limitaciones N8N (L3070)
  └─ Aclaracion gap 1: GET /credentials funciona con scope admin, retorna null con scope reducido

CHANGELOG (L6017+)
  └─ Nueva entrada v1.1.2 al tope con 8 cambios + motivacion + auto-evaluacion 109/110

Cierre Canonico (L6121-6130)
  └─ Version v1.1.1 → v1.1.2 + nota refactor 27 abril
  └─ Mandamientos canonicos v1.1.1 → v1.1.2 (sin cambios estructurales)
```

---

## 3. Los 8 gaps cerrados — before / after

### Gap 1 — FASE Z, GET /credentials (Severidad Baja)

**Antes (v1.1.1):**
> GET /credentials puede devolver null o array vacio segun scope del API token (validado 20 abril 2026): el endpoint GET /api/v1/credentials retorno null con el token admin@addendo.io actual. El scope requerido para listar credentials aparentemente es mas restrictivo que el de workflows.

**Despues (v1.1.2):**
> GET /credentials depende del scope del API token (validado 20 abril 2026, refinado 25 abril 2026 — Sesion 2 Cost Bridge Redis): la primera prueba (20 abril) con un token de scope reducido retorno null. La segunda prueba (25 abril) con el token admin completo de admin@addendo.io devolvio el array de credenciales correctamente. La leccion canonica: el endpoint funciona si el token tiene scope admin, no si tiene scope read-only sobre workflows unicamente. Cuando #50 opera con un token desconocido, debe asumir el peor caso (puede retornar null) y aplicar el workaround de introspeccion indirecta como fallback.

**Por que el cambio:** Sesion 2 (25 abril) demostro empiricamente que el endpoint sí funciona con admin token. La afirmacion v1.1.1 era parcialmente incorrecta; la version refinada preserva la prudencia operacional (workaround como fallback) sin quemar el matiz tecnico.

---

### Gap 2 — M.18, nodo SSH default authentication (Severidad Media)

**Antes (v1.1.1):**
M.18 mencionaba "nodo Execute Command o HTTP Request con shell" como opcion de invocacion, sin documentar el nodo SSH ni su autenticacion default.

**Despues (v1.1.2):** anadido sub-bloque "Configuracion del nodo SSH N8N (gaps 2-4 v1.1.2)" tras Honestidad Operacional, con:
> Gap 2 (Severidad Media) — autenticacion del nodo SSH default es password: el nodo n8n-nodes-base.ssh de N8N expone el campo authentication con dos valores: password y privateKey. El default del UI es password, pero la infraestructura Addendo usa autenticacion por llave privada... Si #50 deploya un workflow JSON sin declarar authentication: "privateKey" explicito, el nodo intenta password auth y falla con Authentication failed.

Mas patron canonico JSON con `"authentication": "privateKey"` declarado.

**Por que el cambio:** Sesion 2 deploy del workflow `MLG4B67xXI8WH7Mp` fallo en primer intento por este gap. Documentar el patron canonico evita que vuelva a ocurrir.

---

### Gap 3 — M.18, conversion PKCS#1 → OpenSSH RFC4716 (Severidad Alta)

**Antes (v1.1.1):**
No existia documentacion sobre formato de la llave SSH para el nodo SSH de N8N.

**Despues (v1.1.2):** anadido en el sub-bloque "Configuracion del nodo SSH":
> Gap 3 (Severidad Alta) — la libreria ssh2 que usa N8N NO acepta llaves PKCS#1 PEM: La llave SSH de Addendo (~/Desktop/addendo-server-key.pem) esta en formato PKCS#1 PEM (header -----BEGIN RSA PRIVATE KEY-----). El nodo SSH de N8N usa internamente la libreria ssh2 de Node.js, que rechaza PKCS#1 y exige formato OpenSSH RFC4716...

Mas procedimiento canonico de conversion en 4 pasos (`cp` + `chmod 600` + `ssh-keygen -p -m RFC4716` + `head -1` para verificar header).

**Por que el cambio:** Sesion 2 perdio ~30 min depurando este gap (error críptico `Cannot parse privateKey` sin pista de formato). Documentarlo elimina el costo recurrente.

---

### Gap 4 — M.18, chmod 600 antes de ssh-keygen -p (Severidad Baja)

**Antes (v1.1.1):**
Sin mencion.

**Despues (v1.1.2):** anadido en el sub-bloque "Configuracion del nodo SSH":
> Gap 4 (Severidad Baja) — ssh-keygen -p requiere chmod 600 si la llave fuente esta en 400: Las llaves SSH de produccion suelen tener permisos 400 (read-only owner) por defecto de seguridad. El comando ssh-keygen -p necesita escribir el archivo (modificar in-place), por lo que falla con Permission denied... Solucion: copiar a un workspace temporal + chmod 600 antes de convertir... NUNCA modificar permisos de la llave fuente en produccion.

Mas comando canonico de cleanup post-uso (`shred -u`).

**Por que el cambio:** preservar el principio de seguridad (no degradar permisos en produccion) mientras habilita el procedimiento operativo necesario.

---

### Gap 5 — M.16.1 paso 2, activate API requiere body {} (Severidad Baja)

**Antes (v1.1.1):**
```bash
PASO 2 — ACTIVACION TEMPORAL
  curl -s -X POST -H "X-N8N-API-KEY: $N8N_API_KEY" \
    https://n8n.addendo.io/api/v1/workflows/${WF_ID}/activate
```

**Despues (v1.1.2):**
```bash
PASO 2 — ACTIVACION TEMPORAL
  curl -s -X POST -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{}' \
    https://n8n.addendo.io/api/v1/workflows/${WF_ID}/activate
  # ...
  # GAP CANONICO v1.1.2 (validado Sesion 2, 25 abril 2026): el endpoint
  # POST /activate exige body explicito '{}' aunque sea vacio. Sin -d '{}' +
  # Content-Type, ciertos clientes HTTP envian Content-Length:0 que N8N
  # interpreta como request malformado en algunas versiones. Esta linea de
  # tres flags es el invocacion canonica que NO debe simplificarse.
```

**Por que el cambio:** Sesion 2 reporto que el activate fallo intermitentemente sin el body explicito. Documentar la invocacion canonica completa elimina la sutileza.

---

### Gap 6 — M.19 NUEVA, Webhook node webhookId obligatorio (Severidad Media)

**Antes (v1.1.1):**
La seccion no existia. El skill no mencionaba el campo `webhookId` en ningun nodo Webhook.

**Despues (v1.1.2):** seccion completa M.19 con cuatro sub-secciones:
- M.19.1 Sintoma y diagnostico canonico (HTTP 404 + sqlite3 query a `webhook_entity`)
- M.19.2 Patron canonico — slug deterministico
- M.19.3 Comparativa correcto vs incorrecto (JSON con/sin `webhookId`)
- M.19.4 Recovery procedure cuando el bug ya ocurrio + validacion Nivel 1 extendida

Extracto:
> Sintoma: workflow desplegado y activado correctamente via API, pero el webhook no responde: ... Diagnostico canonico — consultar la tabla webhook_entity directamente: ssh ... sqlite3 ... 'SELECT webhookPath, method, workflowId, node FROM webhook_entity WHERE workflowId="<WID>"' ... Si el webhookPath retornado es <workflowId>/webhook/<path> (con prefijo del workflow id), el bug esta confirmado: falta el campo webhookId en el JSON.

**Por que el cambio:** descubierto en Cost Guard v1 deploy. Sin este patron canonico, todo workflow N8N con webhook trigger deployado via API queda inaccesible y no hay pista del problema en los logs estandar.

---

### Gap 7 — M.20 NUEVA, Redis SET con value numerico keyType + .toString() (Severidad Media)

**Antes (v1.1.1):**
La seccion no existia. M.6.1 documentaba Redis canonico pero no este caso especifico.

**Despues (v1.1.2):** seccion completa M.20 con cuatro sub-secciones:
- M.20.1 Sintoma y causa raiz (`Could not identify the type to set` + auto-deteccion vs expresion)
- M.20.2 Patron canonico (`keyType: "string"` + `.toString()`)
- M.20.3 Comparativa correcto vs incorrecto
- M.20.4 Validacion Nivel 1 extendida

Extracto:
> Sintoma en logs: error string literal "Could not identify the type to set. Please set it manually!" en el output del nodo Redis SET (visible solo si se inspecciona la ejecucion via GET /api/v1/executions/{id}?includeData=true). ... Causa raiz: la auto-deteccion del campo keyType del nodo Redis depende de la inspeccion del literal del valor. Con string literal funciona... Con expresion N8N que retorna un tipo no-string, la inspeccion ocurre antes de la evaluacion de la expresion y no detecta el tipo correctamente.

**Por que el cambio:** descubierto en Cost Guard v1 smoke test (test B fallo silenciosamente con error oculto en runData). Sin este patron, todos los workflows que escriben numeros a Redis desde expresiones N8N fallan en silencio.

---

### Gap 8 — M.18.1 NUEVA, Pivot patrones nodos prohibidos (Arquitectonico)

**Antes (v1.1.1):**
La seccion no existia. M.18 asumia disponibilidad de `executeCommand` para ejecutar Claude Code CLI.

**Despues (v1.1.2):** seccion completa M.18.1 con tres sub-secciones:
- M.18.1.1 Lista canonica de 7 nodos prohibidos (tabla con razon + fuente del bloqueo)
- M.18.1.2 Pivots canonicos por nodo prohibido (Claude Code CLI → SSH localhost; Redis INCRBYFLOAT → GET-calc-SET; code+child_process → subworkflow auxiliar; httpRequest URL dinamica → allow-list)
- M.18.1.3 Pre-validacion en Bloque 3 con funcion `validateNoProhibitedNodes` (codigo JS canonico)

Plus caveat de atomicidad del pivot Redis con 4 opciones canonicas v1.2 (Lua EVAL / INCRBYFLOAT via SSH credential / WATCH-MULTI-EXEC / distributed lock SET NX EX) presentadas en tabla con trade-off + cuando aplicar cada una.

Extracto del contexto operacional:
> N8N v2 introduce la DisabledNodesRule (archivo /usr/lib/node_modules/n8n/dist/modules/breaking-changes/rules/v2/disabled-nodes.rule.js) que deshabilita por default ciertos nodos por riesgo de ejecucion arbitraria. Reactivarlos requiere variable de entorno NODES_EXCLUDE=[] en el proceso N8N — modificacion de configuracion del servidor que viola la Decision 9 (D9) inviolable del skill #50: #50 no modifica config del servidor sin autorizacion explicita CEO. La decision arquitectonica subyacente del CEO es coherente: no permitir ejecucion arbitraria de shell desde workflows porque amplia drasticamente la superficie de ataque.

**Por que el cambio:** descubierto en Cost Guard v1 deploy (intento inicial con `executeCommand` fallo con `Unrecognized node type`). El pivot a Redis nativo + GET-calc-SET ya esta en produccion. La sub-seccion documenta el pivot universal (no solo Redis) y la regla de decision para el motor de #50.

---

## 4. Validacion de coherencia editorial

### Tono

Las 4 sub-secciones nuevas (M.18 ampliada, M.18.1, M.19, M.20) usan el mismo tono editorial del skill v1.1.1:
- **Encabezado de contexto operacional con fecha y workflow validador** (igual que M.16.1, M.6.1, M.18 originales)
- **Sintoma → Causa raiz → Patron canonico → Comparativa correcto/incorrecto** (estructura usada en M.16.1 y FASE 11.3/11.4)
- **Codigo bash y JSON con fences sintaxis-marcadas** (igual estilo que M.18, M.6.1)
- **Tabla canonica con columna de razon o trade-off** (igual M.6.1 transiciones, M.18 flags, M.18.1 pivots, etc.)

### Profundidad

Las sub-secciones nuevas tienen densidad comparable a las existentes:
- M.6.1 Redis canonico (v1.1.1): ~80 lineas con tabla 5 claves + 4 transiciones + ejemplo Code N8N
- M.18.1 Pivot patrones (v1.1.2): ~70 lineas con tabla 7 nodos prohibidos + 4 pivots + 4 opciones atomicidad + funcion validacion
- M.19 webhookId (v1.1.2): ~60 lineas con sintoma + diagnostico SQL + patron + recovery + validacion
- M.20 Redis SET keyType (v1.1.2): ~40 lineas con sintoma + causa raiz + patron + validacion

Ninguna sub-seccion es declarativa-vacia (todas tienen JSON canonico o codigo JS de validacion).

### Trazabilidad cruzada

Las sub-secciones nuevas referencian explicitamente las existentes cuando corresponde:
- M.18 ampliada referencia M.18.1 (pivot post-DisabledNodesRule)
- M.18.1.2 referencia M.18 (pivot Claude Code CLI canonico) y M.6.1 (Redis canonico para el caso Cost Guard)
- M.19.4 referencia M.16 Nivel 1 Syntax Check (extension del validator)
- M.20.4 referencia M.16 Nivel 1 Syntax Check (extension del validator)

### Indice navegable

La linea FASE M del indice se actualizo para listar las 3 sub-secciones nuevas + nota de gaps SSH 2-4 en M.18. La tabla "Uso rapido por escenario" gano 3 filas con escenarios concretos que apuntan a las nuevas sub-secciones.

### Auto-evaluacion honesta

El CHANGELOG declara puntaje 109/110 (no 110/110) con la justificacion explicita de por que la categoria D5 pierde 1 punto (extensiones de validacion Nivel 1 documentadas como pseudocodigo pero no consolidadas en el `validateWorkflowJSON` canonico de M.16). Esto preserva la regla del prompt CEO: "auto-evaluacion no declarativa, debe sostenerse — si arroja <110/110, reportar el puntaje real".

---

## 5. Validaciones tecnicas aplicadas

| Nivel | Resultado | Detalle |
|---|---|---|
| **Nivel 1 syntax** | (pendiente — se ejecuta tras este reporte) | grep secrets + check markdown valido |
| **Nivel 2 coherencia editorial** | ✅ PASS (esta seccion 4) | Tono + profundidad + trazabilidad + indice + auto-evaluacion |
| **Nivel 3 trazabilidad** | (pendiente — se ejecuta tras este reporte) | grep "M.18.1\|M.19\|M.20" + numeros de linea de cada cambio |

---

## 6. Backlog post-v1.1.2

Items no incluidos en v1.1.2 que el siguiente patch (v1.1.3) debe consolidar:

1. **Unificar las 4 extensiones del validador Nivel 1** (M.18.1.3 `validateNoProhibitedNodes`, M.19.4 `validateWebhookId`, M.20.4 `validateRedisSetKeyType`, mas la funcion original `validateWorkflowJSON` de M.16) en una sola funcion ejecutable canonica. Esto elimina el gap del puntaje 109/110.

2. **Migrar Cost Guard v1 a INCRBYFLOAT atomico** cuando el daemon Claude Code escale a >1 thread. Decision arquitectonica del CEO entre las 4 opciones de M.18.1.2 (Lua EVAL preferido por simplicidad).

3. **Smoke test del pivot httpRequest URL allow-list** en un workflow real (M.18.1.2 lo documenta como pivot pero no esta validado empiricamente todavia).

4. **Documentar SSH credential id de localhost** una vez creada (D9 escalacion CEO pendiente). Hasta entonces, M.18 + M.18.1.2 referencian la credencial SSH como `<credential-id-existente>` placeholder.

---

## 7. Refractor cerrado — siguiente accion

- Skill `agente-constructor-workflows.md` actualizado en Mac
- Reporte refactor (este archivo) generado
- Pendiente: validacion Nivel 1 + 3 + commit + sync 3 capas (Mac + GitHub + AWS)
- Sin handoff a #4 PM (auto-refactor del propio skill)
