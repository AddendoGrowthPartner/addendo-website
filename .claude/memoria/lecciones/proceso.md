---
documento: "Lecciones de Proceso — Addendo Agency OS"
version: "v1.0"
creado: "2026-04-29"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Lecciones sobre cómo opera el sistema día a día — workflow CEO ↔ agentes, ciclos canónicos, comunicación, disciplina operativa"
---

# 🔄 Lecciones de Proceso

Cómo opera Addendo Agency OS día a día. Estas son lecciones del **workflow real** entre CEO y agentes IA, no principios arquitectónicos abstractos.

---

## PR1 — Ciclo Canónico de Nivelación: 4 Pasos disciplinados

**Origen:** Establecido en ciclo #15 (marzo 2026), refinado en #25, #45, #5, #21, #18, #27, #16.
**Confianza:** ALTA — 8 ciclos consecutivos exitosos.

**Estructura:**

| Paso | Qué se hace | Pestaña |
|---|---|---|
| **Paso 1 — Reporte Arqueológico** | Lectura READ-ONLY del skill actual contra estándar canónico vigente. Detecta gaps sin modificar. | Pestaña limpia Claude Code Mac (con `/clear` previo) |
| **Paso 2 — Auditoría Cruzada + 4 Verbos** | CEO firma 4 verbos exclusivos canónicos con cero solapamiento contra los verbos ocupados. | Conversación Claude (esta UI) |
| **Paso 3 — Reconstrucción Monolítica 7 Chunks** | Ejecución continua sin pausa, commit único al final, sync 3 capas Mac+GitHub+AWS bit-perfect MD5. | MISMA pestaña del Paso 1 (continuidad de contexto) |
| **Paso 4 — Trust but Verify Externo** | Auditor independiente verifica reconstrucción. Si Opción B (hallazgos) → addendum quirúrgico EN MISMA pestaña sin `/clear`. | Pestaña NUEVA con `/clear` |

**Rúbrica oficial:** 110 puntos / 23 criterios / 7 secciones (A20 / B30 / C20 / D15 / E10 / F5 / G10).

**Score honesto declarado oficial post-TbV:** 109/110 con caveat F2 residual (el TbV mismo no fue auditado, requeriría 2do TbV).

**Aplicación operativa:**

1. NUNCA saltar Paso 4. La regla 10.10 (Trust but Verify NO es opcional) es ley.
2. Si un skill se nivela "a ojo" sin TbV, NO entra como PERFECTO PURO VERIFICABLE — máximo PERFECTO PURO AUTO-EVALUADO.
3. Mantener pestañas abiertas hasta que el ciclo cierre completo (no `/clear` prematuro entre Paso 4 y addendum).

---

## PR2 — Lectura preventiva de memoria al inicio de cada ciclo

**Origen:** Sistema creado el 29 abril 2026.
**Confianza:** MEDIA — política nueva, validación pendiente con próximos ciclos.

**Lección:**
Todo prompt de Paso 1 arqueológico DEBE empezar instruyendo a la instancia que lea:

```
1. /Users/Mac/addendo-website/.claude/memoria/INDICE.md
2. /Users/Mac/addendo-website/.claude/memoria/lecciones/arquitectonicas.md
3. /Users/Mac/addendo-website/.claude/memoria/lecciones/editoriales.md
4. /Users/Mac/addendo-website/.claude/memoria/lecciones/proceso.md
5. Si el skill toca cliente activo → clientes/{cliente_kebab}.md
6. Si el skill toca vertical → verticales/{vertical_kebab}.md
```

Esta lectura preventiva permite a la instancia aplicar lecciones aprendidas en ciclos anteriores SIN que el CEO tenga que recordarle manualmente cada vez.

**Aplicación operativa:**

1. Agregar bloque "LECTURA OBLIGATORIA PREVIA" al template canónico de prompts Paso 1 / Paso 3 / Paso 4.
2. La instancia confirma haber leído antes de ejecutar análisis.
3. En reporte final, instancia declara qué lecciones aplicó preventivamente.

---

## PR3 — Honestidad operativa CEO ↔ Claude

**Origen:** Conversaciones repetidas durante ciclos de nivelación.
**Confianza:** ALTA — política explícita firmada por CEO.

**Lección:**
La relación CEO ↔ Claude funciona mejor cuando:

1. **Claude no infla capacidades.** Si NO puede leer un archivo (ej: hoy ofrecí "revisar yo primero" sin verificar acceso real), debe rectificar honestamente.
2. **Claude declara confianza.** Hechos verificados vs inferencias vs hipótesis vs creatividad — etiquetados claramente.
3. **CEO catch arquitectónico es señal valiosa.** Cuando el CEO pregunta *"¿esto está bien?"* sobre algo que Claude declaró exitoso, esa pregunta vale auditoría completa.
4. **NO pasar como hechos las suposiciones.** Si Claude no ha verificado algo, debe declararlo.
5. **Claude usa bloques de código para prompts copiables.** El CEO trabaja desde iPhone con Termius — la formatación importa.

**Caveats:**
- El sistema no es jerárquico estricto: Claude puede pushback sobre decisiones del CEO si tiene argumento arquitectónico, NO solo obedecer.
- CEO valida que Claude diga "no sé" cuando no sabe — premio a la honestidad.

---

## 📋 Pendientes por documentar

- **PR.X (pendiente):** Cadencia de Doc Maestro — cuándo y cómo se cierra un día con versión nueva del Doc Maestro
- **PR.X (pendiente):** Disciplina de commits — formato canónico de commit messages para skills vs sistema vs cliente
- **PR.X (pendiente):** Cuándo pausar y cuándo continuar — señales de fatiga del CEO y respuesta de Claude
