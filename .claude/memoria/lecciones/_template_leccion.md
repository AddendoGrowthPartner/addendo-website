---
documento: "Template Canónico — Lección Sistémica"
version: "v1.0"
proposito: "Plantilla para documentar nuevas lecciones en arquitectonicas.md / proceso.md / editoriales.md / tecnicas.md"
---

# 📝 Template — Nueva Lección

Copiar y rellenar este bloque al final del archivo de lecciones correspondiente:

```markdown
## [PREFIJO][NUMERO] — [Título corto y descriptivo]

**Origen:** [ciclo, fecha YYYY-MM-DD, cliente, evento que produjo la lección]
**Confianza:** alta / media / hipótesis
**Aplicabilidad:** [qué skills, verticales, procesos o tecnologías afecta]

**Lección:**
[descripción concreta de qué se aprendió. 1-3 párrafos. NO inflar.]

**Evidencia:**
- [evidencia 1 — verificable, con referencia: línea, commit, fecha, métrica]
- [evidencia 2]
- [evidencia 3]

**Aplicación operativa:**
1. [acción concreta 1 — qué hay que hacer en futuros ciclos]
2. [acción concreta 2 — qué hay que evitar]
3. [acción concreta 3 — cómo se verifica]

**Caveats:**
- [límite de la lección 1 — cuándo NO aplica]
- [excepciones documentadas]
```

## Prefijos canónicos

| Prefijo | Archivo destino | Tipo de lección |
|---|---|---|
| `P11.X` | arquitectonicas.md | Principio sistémico cross-skill |
| `PR.X` | proceso.md | Lección de proceso/workflow |
| `ED.X` | editoriales.md | Disciplina editorial |
| `TC.X` | tecnicas.md | Lección técnica del stack |

## Reglas de honestidad

- **NO inventar evidencia.** Si no podés citar línea/commit/fecha/métrica, NO documentes la lección todavía.
- **NO inflar.** 3 líneas sólidas > 30 líneas especulativas.
- **DECLARAR confianza.** alta = caso real reproducido. media = caso único pero claro. hipótesis = patrón sospechado, requiere más casos.
- **CAVEATS obligatorios.** Toda lección tiene límites — si no los identificás, repensá la lección.

## Cuándo crear lección nueva

✅ **SÍ crear:**
- Patrón observado en 2+ ciclos/clientes
- Decisión arquitectónica del CEO con justificación documentada
- Bug+fix verificado en producción
- Discrepancia auto-eval vs audit que se repite

❌ **NO crear:**
- Anécdotas únicas sin patrón
- Opiniones sin evidencia
- Re-formulaciones de lecciones existentes (mejor consolidar)
- Cosas obvias que cualquier dev profesional sabría
