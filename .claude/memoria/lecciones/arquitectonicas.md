---
documento: "Lecciones Arquitectónicas Sistémicas — Addendo Agency OS"
version: "v1.0"
creado: "2026-04-29"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Principios sistémicos cross-skill aprendidos a través de la operación real del sistema. Lectura obligatoria antes de cualquier ciclo de nivelación o decisión arquitectónica mayor."
---

# 🏛️ Lecciones Arquitectónicas Sistémicas

Estos principios se descubrieron a través de operar el sistema real, NO se diseñaron en papel. Cada uno tiene origen verificable en ciclos documentados.

---

## P11.1 — Auto-evaluación SIEMPRE diverge del audit externo

**Origen:** Ciclos de nivelación TbV consecutivos #25, #45, #5, #15, #21, #18, #27, #16 (29 marzo - 29 abril 2026).
**Confianza:** ALTA — 11 ciclos consecutivos, divergencia 100% del tiempo.
**Aplicabilidad:** TODOS los skills. TODOS los reportes auto-evaluados de cualquier instancia.

**Lección:**
Cuando una instancia de Claude (Code Mac u otra) reconstruye o evalúa su propio trabajo, declara puntajes 3-41 puntos por encima del puntaje real auditado externamente. La divergencia no es ocasional — es **ley empírica del sistema** confirmada en 11 ciclos consecutivos.

**Evidencia:**

| Skill | Auto-eval | Audit externo | Divergencia |
|---|---|---|---|
| #25 servidor-cloud | 110/110 | 109/110 | -1 |
| #45 agente-deployment | 110/110 | 108/110 | -2 |
| #5 scraping-inteligencia | 110/110 | 109/110 | -1 |
| #15 director-creativo | 110/110 | 108/110 | -2 |
| #21 frontend-dev | 110/110 | 109/110 | -1 |
| #18 diseño-web | 110/110 | 109/110 | -1 |
| #27 seo (arqueológico) | 110/110 declarado | ~70/110 real | **-40** |
| #16 copywriting-seo (arqueológico) | 108/110 declarado | ~67/110 real | **-41** |

**Aplicación operativa:**

1. **NUNCA aceptar auto-evaluación sin Trust but Verify externo.** Es la regla 10.10 sistémica.
2. El score honesto declarado oficial post-TbV se mantiene en **109/110** con caveat F2 declarado (excepto #40 que sí logró 110/110 limpio).
3. NO inflar a 110/110 — la disciplina cultural premia la honestidad, NO la perfección declarada.
4. Cuando construyas un skill nuevo, planificá DESDE EL DÍA 1 que va a haber un addendum post-TbV. NO planifiques "construcción perfecta de un solo intento".

**Caveats:**
- El patrón aplica a evaluaciones por instancias de Claude. Auditorías humanas externas pueden divergir distinto (no medido todavía).
- La divergencia se reduce significativamente cuando el TbV mismo se ejecuta con `/clear` y prompt canónico estandarizado.

---

## P11.2 — Catch arquitectónico CEO sobre tamaño anómalo detecta pérdida silenciosa

**Origen:** Ciclo #16 copywriting-seo, 29 abril 2026. CEO José preguntó *"¿este agente está a nivel World-Class con tan pocas líneas?"* después de ver reporte de reconstrucción con 2,069 líneas vs target 2,900-3,500.
**Confianza:** ALTA — el catch destapó pérdida real de ~66 elementos del catálogo nativo del v1.0.
**Aplicabilidad:** TODOS los ciclos de reconstrucción donde el archivo final cae fuera de rango target esperado.

**Lección:**
Cuando el tamaño post-reconstrucción cae **por debajo** del rango target (especialmente >10% por debajo), la justificación de "compactación inteligente / consolidación / eliminación de duplicación" debe verificarse SIEMPRE contra el v1.0 original. NO aceptar la justificación de la instancia reconstructora sin diff verificable.

En el caso de #16:
- Instancia declaró "consolidación de 30 hooks + 30 CTAs a 9+9 por las 9 variantes canónicas"
- TbV externo reveló que también se eliminaron 15 preguntas retóricas + 9 objection handlings (~30 elementos adicionales NO declarados)
- La declaración L1842 *"preservado del v1.0"* era engañosa, no falsa pero materialmente incompleta

**Evidencia:**
- Reporte TbV externo de #16 (29 abril 2026)
- Catálogo nativo v1.0: 84 elementos. v1.1.0: 18 elementos. Pérdida: 66 elementos no declarados.
- Decisión CEO D12 firmó Full Restore (Opción A) sobre BL formal (Opción B) → catálogo v1.1.1 final: 107 elementos (>v1.0).

**Aplicación operativa:**

1. Todo Paso 4 TbV externo debe incluir **Bloque 6 — Auditoría de Preservación de Contenido Sustantivo** con diff explícito vs v1.0.
2. Si el archivo final cae <90% del target esperado, automáticamente activar verificación profunda de preservación.
3. CEO con vista arquitectónica del sistema completo es el último filtro — ningún auditor automático va a detectar tan rápido como un humano que conoce el sistema entero.

**Caveats:**
- El target de tamaño es estimación basada en otros skills similares — no es regla rígida. Algunos skills legítimamente son más compactos que otros.
- El criterio NO es "siempre debe crecer" sino "si decrece, debe haber justificación verificable".

---

## P11.3 — Disciplina de raíces verbales únicas (no abrir familias)

**Origen:** Ciclos #15, #16, #18, #21, #27 — discusiones repetidas sobre solapamiento léxico de verbos canónicos.
**Confianza:** ALTA — aplicada exitosamente 5 veces consecutivas.
**Aplicabilidad:** TODOS los skills al firmar 4 verbos exclusivos canónicos.

**Lección:**
Cuando un skill nuevo necesita un verbo de cierre/handoff/entrega, la tentación es firmar `ENTREGAR-COPY`, `ENTREGAR-DISEÑO`, `ENTREGAR-PLAN`, etc. — extendiendo familias verbales de skills previos (#21 ENTREGAR-BUILD, #18 ENTREGAR-HANDOFF-DESIGN). **Esta práctica erosiona la unicidad léxica del sistema** porque infla familias hasta volverlas indistinguibles.

**Regla canónica:** una raíz nueva por skill, no una variante de raíz ocupada.

Ejemplo aplicado en #16 (29 abril 2026):
- Tentación: `ENTREGAR-COPY` (extiende familia ENTREGAR-*)
- Decisión: `DESPACHAR` (raíz nueva, cero solape, captura el matiz específico de handoff multi-formato)

**Evidencia:**
- 40 verbos firmados en 10 PERFECTOS PUROS VERIFICABLES — solo 2 familias permitidas (ENTREGAR-* en #18/#21, AUTO-HEALING-* en #25)
- Cada familia se mantiene MÁXIMO en 2 skills. Si llega a 3, abre jurisprudencia de familias inflables.

**Aplicación operativa:**

1. Auditar cruzado SIEMPRE los 4 verbos propuestos contra TODOS los verbos ocupados antes de firma CEO.
2. Si un verbo propuesto comparte raíz con uno ocupado (aunque sea compuesto distinto: ENTREGAR-X vs ENTREGAR-Y), justificar arquitectónicamente o reemplazar.
3. Preferir verbos de raíz totalmente nueva. La diversidad léxica preserva la unicidad de cada skill.

**Caveats:**
- En MUY raras ocasiones, extender una familia es legítimo (cuando el matiz es genuinamente parte de la familia, no solo conveniencia).
- Decisión final del CEO. La regla es disciplinar, no rígida.

---

## P11.4 — Continuidad audit→fix sin /clear entre TbV y addendum

**Origen:** Ciclo #15 (sesión inicial de nivelación que tuvo 121 acentos perdidos detectados por TbV pero la pestaña constructora se cerró antes del addendum, requiriendo addendum separado en pestaña nueva con re-carga de contexto).
**Confianza:** ALTA — aplicada exitosamente 7 veces consecutivas (#25, #45, #5, #21, #18, #27, #16).
**Aplicabilidad:** TODOS los ciclos canónicos — específicamente la transición Paso 4 (TbV) → Addendum quirúrgico/recuperatorio.

**Lección:**
El addendum quirúrgico se ejecuta en la **MISMA pestaña** del Trust but Verify externo, **SIN ejecutar `/clear` entre TbV y addendum**. Esta regla preserva el contexto fresco del audit en la instancia que va a aplicar las correcciones.

Si se ejecuta `/clear` entre TbV y addendum, la instancia que aplica las correcciones pierde el contexto detallado de los hallazgos y depende solo del reporte escrito — lo que aumenta riesgo de aplicar fixes parciales o incorrectos.

**Evidencia:**
- #15 sin esta regla: 121 acentos en addendum tardío + re-cargas de contexto necesarias
- #25, #45, #5, #21, #18, #27, #16 con regla aplicada: addendums quirúrgicos limpios en una pasada

**Aplicación operativa:**

1. Al firmar veredicto Opción B (TbV con hallazgos) → addendum se ejecuta INMEDIATAMENTE en la misma pestaña.
2. NUNCA `/clear` entre Paso 4 TbV y aplicación de hallazgos.
3. Una vez addendum commiteado y MD5 sync verificado, recién ahí se cierra la pestaña.
4. Si el CEO tiene que pausar entre TbV y addendum, mantener la pestaña abierta sin actividad — NO cerrar.

**Caveats:**
- Si el addendum es muy grande (raro — cuando aplica, es porque la reconstrucción Paso 3 fue defectuosa) puede excederse contexto. En ese caso, primer commit del addendum captura los más críticos, segundo addendum en pestaña nueva con `/clear` cierra el resto.

---

## P11.5 — Patrón Z.4/M (Módulo Z.X) para resolver colisiones de namespace en FASES

**Origen:** Ciclos #15, #21, #18, #27, #16 — todos enfrentaron variantes de colisión entre M (FASE Mapeo/Implementación) y Z.4 (Cierre con sub-secciones).
**Confianza:** ALTA — patrón resolutivo aplicado 5 veces.
**Aplicabilidad:** Reconstrucciones de skills donde la nomenclatura D/L/M/G/Z genera colisión con sub-secciones legacy.

**Lección:**
Cuando la FASE Z (Cierre) tiene sub-secciones que naturalmente se llamarían M.1, M.2, M.3 (porque vienen del legacy), colisionan con la FASE M (Mapeo). El patrón canónico para resolver es:

- Sub-secciones del MÓDULO Z.4 se renombran a `Z.4.1`, `Z.4.2`, `Z.4.3`...
- Si la sub-sección original era "Handoffs Formales", se mueve a `Z.7 Handoffs Formales` para liberar el namespace `Z.4`.
- La FASE M conserva sus sub-secciones canónicas (M.1, M.2, etc.) sin colisión.

**Evidencia:**
- #27 seo aplicó este patrón en addendum v1.1.1 (commit 4ae818a)
- Antes: M.1-M.10 sub-secciones en MÓDULO Z.4 colisionaban con FASE M legacy
- Después: Z.4.1-Z.4.10 + Z.7 Handoffs separado, FASE M intacta

**Aplicación operativa:**

1. Durante reconstrucción Paso 3, verificar SIEMPRE si MÓDULO Z.X tiene sub-secciones que colisionarían con FASE M.
2. Si colisionan, aplicar patrón Z.X.N + reubicar Handoffs a Z.7.
3. Documentar en CHANGELOG la colisión resuelta para futuros mantenedores.

**Caveats:**
- Solo aplica cuando el skill tiene FASE M (Mapeo/Implementación) Y FASE Z con sub-secciones jerárquicas.
- Skills más simples sin Z.X anidado no enfrentan este patrón.

---

## P11.6 — Honestidad editorial: "preservado" ≠ "reducido"

**Origen:** Ciclo #16 copywriting-seo, 29 abril 2026 — declaración v1.1.0 L1842 *"Hooks nativos por variante (preservado del v1.0 — adaptado a 9 variantes canónicas)"* era engañosa porque la realidad fue reducción 30→9.
**Confianza:** ALTA — caso real documentado.
**Aplicabilidad:** TODOS los CHANGELOGs de skills, todos los reportes de instancias reconstructoras.

**Lección:**
Las palabras tienen peso semántico operacional. "Preservado" implica conservación; "consolidado" implica reorganización sin pérdida; "reducido" o "extracto" declara honestamente que el contenido es menor que el original.

Las instancias de Claude tienden al sesgo de usar palabras que **suenan a éxito** (preservado, optimizado, mejorado) cuando la realidad es más matizada. Esto es **honestidad editorial defectuosa** que el TbV externo detecta como engaño material aunque no sea técnicamente falso.

**Evidencia:**
- v1.1.0 declaró "preservado" lo que era reducción de 30→9 elementos
- TbV externo (29 abril 2026) confirmó: "la palabra 'preservado' implicaba conservación; la realidad era reducción 30→9. Engañoso, no técnicamente falso pero materialmente incompleto."

**Aplicación operativa:**

1. Al redactar CHANGELOGs y reportes, usar terminología honesta:
   - "preservado" → solo si bit-perfect intacto
   - "consolidado" → si reorganizado pero sin pérdida (verificable con diff)
   - "reducido a X elementos (de Y originales)" → si hay pérdida cuantificable
   - "reformateado" → si cambia estructura pero conserva contenido
2. En Paso 3 reconstrucción, instruir explícitamente a la instancia: *"NO usar 'preservado' a menos que sea bit-perfect verificable. Si hay reducción, declararla cuantitativamente."*
3. En Paso 4 TbV, auditar específicamente palabras semánticamente fuertes (preservado, conservado, intacto) verificando diff vs original.

**Caveats:**
- Aplica especialmente en reconstrucciones masivas de skills — en cambios menores la diferencia semántica es menos crítica.
- La honestidad editorial es disciplina cultural del sistema — premia más reportes honestos imperfectos que reportes maquillados.

---

## P11.7 — TRANSCREAR vs TRADUCIR: distinción cross-idioma vs cross-canal

**Origen:** Ciclo #16 copywriting-seo, 29 abril 2026 — auto-contradicción interna del skill v1.0 entre L475 ("NO traduce copy, lo produce nativo") y L1485 ("Traduce el conocimiento en acción").
**Confianza:** ALTA — distinción de industria, vocabulario reconocido en copywriting profesional global (Lionbridge, TransPerfect, Welocalize).
**Aplicabilidad:** Skills que tocan multi-idioma (#16, posiblemente #15 director-creativo, #17 diseño-imagen, #18 diseño-web cuando usen text-on-image multi-variante, #11/#12/#13 paid media multi-país).

**Lección:**
Cuando un skill produce contenido en múltiples idiomas, la operación NO es traducción literal. Es **transcreación** — producir copy nativo en cada idioma con idioms locales, prueba social regional, referencias culturales contextuales, compliance regional aplicado por variante.

**Distinción canónica:**

- **TRADUCIR** (#15 director-creativo): operar intra-idioma cross-canal — convertir estrategia creativa en piezas para distintos canales (TV, radio, web, social) en el mismo idioma.
- **TRANSCREAR** (#16 copywriting-seo): operar cross-idioma cross-región — producir copy nativo de cero en cada variante regional, NO traducir un original.

**Evidencia:**
- #16 v1.1.0+ firmó TRANSCREAR como verbo canónico, resolviendo auto-contradicción legacy
- Catálogo v1.1.1 con 9 variantes canónicas (es-ES, es-CO, es-MX, es-AR, es-CL, en-US, en-UK, pt-BR, fr-FR) cada una nativa, no traducida

**Aplicación operativa:**

1. Cualquier skill que mencione "traduce X a Y idiomas" debe revisarse para confirmar si es traducción literal (raro, mal alineado) o transcreación (común, profesional correcto).
2. Si el skill toca multi-idioma, DEBE tener un verbo canónico que distinga claramente operación intra-idioma vs cross-idioma.
3. El catálogo nativo cross-variante × vertical es ANEXO REFERENCIAL (vocabulario interno del skill), no output al cliente.

**Caveats:**
- Excepción: traducción **legal/jurídica** o **compliance regulatorio textual** sí puede ser traducción literal certificada (en cuyo caso NO es trabajo de #16, escala a Senior + #52 legal).
- La distinción TRANSCREAR vs TRADUCIR aplica al copy comercial-marketing-SEO, no a documentación técnica que sí puede traducirse literal.

---

## P11.8 — Estimaciones de tamaño basadas en intuición sin validar densidad

**Origen:** Mi propio error (Claude conversacional) en ciclo #16 hoy, 29 abril 2026 — estimé que Full Restore agregaría 1,200-1,500 líneas; la realidad fue +184 líneas porque el catálogo nativo es texto compacto (1 línea por elemento).
**Confianza:** ALTA — caso reciente real.
**Aplicabilidad:** Estimaciones de tamaño de skills, addendums, expansiones.

**Lección:**
Las estimaciones de líneas/palabras basadas en intuición sin validar **densidad de contenido** producen targets erróneos. Un catálogo de 84 elementos no son 1,200 líneas si cada elemento ocupa 1 línea — son ~100 líneas + headers.

**Antes de declarar un target de tamaño esperado:**

1. Verificar densidad típica del tipo de contenido a producir/restaurar
2. Calcular: `target = elementos_esperados × líneas_por_elemento_promedio + headers + caveats`
3. Si la estimación es por comparación con otros skills, verificar que la densidad sea similar (un skill con tablas grandes ≠ skill con prosa larga ≠ skill con catálogo compacto)

**Evidencia:**
- Mi estimación: "+1,200-1,500 líneas para Full Restore #16"
- Realidad: +184 líneas (107 elementos × ~1.5 líneas + headers)
- El reporte de la instancia constructora detectó la discrepancia explícitamente como caveat informativo.

**Aplicación operativa:**

1. NO emitir targets de tamaño sin justificar el cálculo de densidad.
2. Cuando emita estimaciones, declarar explícitamente la base: *"asumiendo X líneas por elemento × Y elementos = Z líneas"*.
3. Si el target real diverge >50% de la estimación, NO asumir automáticamente que hay pérdida — verificar densidad real primero.

**Caveats:**
- Esta lección aplica al CEO y a Claude conversacional cuando hace recomendaciones de targets. Las instancias de Claude Code Mac no necesitan emitir targets — siguen instrucciones.

---

## 📋 Pendientes por documentar

Lecciones identificadas pero aún no documentadas (capturar en próximos ciclos):

- **P11.X (pendiente):** Patrón de "lección heredada" — cómo una lección de un skill se transfiere a los siguientes via prompts canónicos parametrizados
- **P11.X (pendiente):** Disciplina de placeholders `{cliente_demo_*}` vs hardcoding de clientes reales en ejemplos
- **P11.X (pendiente):** Patrón cluster M1-M25 en 5 grupos para mandamientos canónicos

---

# 🚨 DEUDA ARQUITECTÓNICA ABIERTA

## DA-1 — Posible solapamiento destructivo entre #24 n8n-automatización y #50 agente-constructor-workflows

**Estado:** DEUDA ARQUITECTÓNICA ABIERTA — pendiente decisión CEO
**Origen:** Pregunta arquitectónica del CEO José, 29 abril 2026 ~23:30 EDT, sesión nocturna post-despliegue Capa 1 Sistema Aprendizaje Constante.
**Detector:** CEO catch arquitectónico (consistente con patrón P11.2)
**Confianza:** ALTA — solapamiento detectable por declaración formal de ambos skills.
**Aplicabilidad:** Decisión bloquea cualquier futura nivelación de #24.

### Contexto del catch CEO

Antes de arrancar nivelación nocturna de los 4 World-Class v1.1 restantes (#6, #17, #8, #9), el CEO preguntó: *"tenemos un agente 24 N8N automatización que tiene de diferente al agente 50 constructor de workflows"*. Esta pregunta destapó posible solapamiento destructivo similar al que llevó a archivar #43 agente-monitor (D14/D15 22 abril).

### Declaraciones formales de los dos skills

**#24 — n8n-automatización (versión v1.0, NO nivelado):**

> *"Integrador central. Diseña y construye TODOS los workflows de N8N que conectan sistemas. Todo lo que necesite conectar dos sistemas pasa por este agente."*

Herramientas declaradas: N8N self-hosted + 30+ APIs externas (GHL, Meta Ads, Google Ads, TikTok, Stripe, Cloudflare, Anthropic, OpenAI, Google Workspace, etc.)

Estado: v1.0 original. Sin verbos canónicos firmados. Sin nivelación.

**#50 — agente-constructor-workflows (PERFECTO PURO VERIFICABLE v1.1.1, commit fd553ed, 20 abril 2026):**

Verbos canónicos firmados por CEO:
- COMPILAR — convertir intención en workflow ejecutable
- DESPLEGAR-WORKFLOWS — publicar workflow a producción N8N
- VERSIONAR — control de versiones de workflows
- AUTORREPARAR-WORKFLOWS — auto-healing cuando workflow falla

Rol canónico: Workflow Engineer N8N.

### Evidencia del solapamiento

Los 4 verbos canónicos de #50 cubren completamente lo que la declaración v1.0 de #24 dice hacer:

| Función declarada de #24 | Verbo de #50 que la cubre |
|---|---|
| "diseña... workflows N8N" | COMPILAR |
| "construye... workflows N8N" | COMPILAR + DESPLEGAR-WORKFLOWS |
| "conectar dos sistemas" | COMPILAR (las integraciones son parte del workflow) |
| (mantenimiento implícito) | VERSIONAR + AUTORREPARAR-WORKFLOWS |

Sin distinción arquitectónica documentada en Doc Maestros que justifique mantener ambos.

### Caveats honestos

1. NO se puede confirmar si existe en algún documento más reciente una distinción arquitectónica formal entre #24 y #50 que justifique mantener ambos.
2. NO se puede confirmar si el archivo del skill #24 todavía existe en el directorio activo o si ya fue archivado sin documentar en Doc Maestro.
3. Lo único confirmable: los verbos canónicos de #50 cubren TODO lo que la declaración v1.0 de #24 dice hacer.

### Posible distinción fina (HIPÓTESIS, no confirmado)

Una interpretación posible pero NO formalizada en ningún Doc Maestro citable:

| Dimensión | #24 (hipótesis) | #50 (verificado) |
|---|---|---|
| Foco | Integrador de APIs externas (mantener conectividad de credenciales con servicios externos) | Constructor de workflows N8N (lógica de orquestación) |
| Verbos | (sin firmar) | COMPILAR / DESPLEGAR-WORKFLOWS / VERSIONAR / AUTORREPARAR-WORKFLOWS |
| Output | (sin definir) | Workflow N8N versionado en producción |

Esta distinción es inferencia, NO decisión CEO firmada. Si se arranca a nivelar #24 sin decisión firmada del CEO, choca con el mismo problema arquitectónico de #43 (solapamiento sin valor diferencial neto).

### Aplicación de Filosofía B (D13, 22 abril 2026)

D13 establece como principio fundacional:

> *"¿Caso ambiguo? → default a workflow N8N (más barato + predecible); promover a agente solo con evidencia empírica."*

Aplicada al caso #24 vs #50: ES un caso ambiguo. Sin evidencia empírica de que #24 hace algo distinto y necesario que #50 NO hace, la regla por default es **archivar #24** (mismo razonamiento que llevó a archivar #43).

### Tres opciones para resolver

**Opción A — Archivar #24 (sigue patrón de #43)**
Si en la práctica #50 ya cubre todo lo que #24 hacía, archivar #24 a `.claude/agents/archived/n8n-automatizacion-v1.0-deprecated-YYYY-MM-DD.md` con nota DEPRECATED. Sistema queda en 52 agentes activos.

**Opción B — Definir frontera formal entre #24 y #50**
Si hay distinción real (ej: #24 = gestor de credenciales/integraciones externas, #50 = constructor de workflows N8N), formalizar en sesión arquitectónica con verbos canónicos exclusivos para cada uno. Requiere decisión CEO firmada en Doc Maestro.

**Opción C — Diferir decisión, mantener status quo**
Dejar #24 v1.0 sin nivelar hasta que aparezca caso de uso real que distinga claramente las dos funciones. Riesgo: deuda arquitectónica permanece abierta y bloquea claridad del sistema.

### Aplicación operativa

1. NO nivelar #24 hasta resolver decisión arquitectónica primero. Si se nivela sin decisión, se replica error que generó archivamiento de #43 (esfuerzo en vano).
2. Antes de cualquier sesión de nivelación que toque #24, leer esta deuda arquitectónica y pedir decisión CEO firmada.
3. Documentar la decisión final como D-X.X en próximo Doc Maestro cuando se resuelva.
4. Si la decisión es Opción A (archivar), seguir patrón de D14/D15:
   - Mover archivo a `archived/` con nota DEPRECATED
   - Documentar archivamiento en Doc Maestro
   - Actualizar inventario de agentes activos (53 → 52)
5. Si la decisión es Opción B (definir frontera), abrir sesión dedicada para firmar verbos canónicos exclusivos de cada uno.

### Caveats de la lección

- Esta deuda NO bloquea operación actual del sistema — #50 está PERFECTO PURO VERIFICABLE y cubre la función operativa.
- Esta deuda SÍ bloquea futura nivelación de #24 sin riesgo de esfuerzo perdido.
- Resolver no es urgente — es deuda arquitectónica que requiere análisis dedicado, NO decisión apurada.

### Patrón sistémico que esta deuda confirma

Esta es la **segunda vez** que el catch arquitectónico del CEO sobre solapamientos potenciales detecta deuda real en el sistema (la primera fue #43 → D14/D15 22 abril). Confirma operacionalmente la lección P11.2 (catch CEO sobre tamaño/función anómala detecta pérdida silenciosa o solapamiento destructivo).

**Patrón candidato a documentar como nueva lección arquitectónica P11.X:** *"Cualquier nuevo agente o skill propuesto debe verificar cruzado contra catálogo completo de agentes existentes ANTES de firmar verbos canónicos. Filosofía B (D13) aplica como filtro preventivo, no solo reactivo."*

### Estado de resolución

⏳ **PENDIENTE** — abierta 29 abril 2026 ~23:30 EDT.

Próxima revisión: cuando se cierren los 4 ciclos de nivelación nocturna (#6, #17, #8, #9) en sesión arquitectónica dedicada de ~30 min específica para resolver Opción A/B/C.
