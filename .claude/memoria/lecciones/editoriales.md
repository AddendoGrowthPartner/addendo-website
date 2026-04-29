---
documento: "Lecciones Editoriales — Addendo Agency OS"
version: "v1.0"
creado: "2026-04-29"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO"
proposito: "Disciplina editorial — qué palabras usar y evitar al documentar el sistema, redactar reportes, y comunicar resultados"
---

# ✍️ Lecciones Editoriales — Disciplina de Honestidad

Cómo se escribe en el sistema. Qué palabras tienen peso operacional. Qué frases son banderas rojas.

---

## ED1 — Vocabulario de honestidad: "preservado" vs "consolidado" vs "reducido"

**Origen:** Ciclo #16 copywriting-seo, 29 abril 2026 (ver P11.6 en arquitectonicas.md).
**Confianza:** ALTA.

**Tabla de uso correcto:**

| Palabra | Significado canónico | Cuándo usar |
|---|---|---|
| **preservado / conservado / intacto** | Bit-perfect del original | SOLO cuando diff vs original es 0 cambios |
| **consolidado** | Reorganizado sin pérdida cuantificable | Cuando contenido fusionado o reformateado pero verificable que nada se perdió |
| **reformateado** | Misma información, distinta estructura visual | Cuando cambia formato (lista→tabla, prosa→bullets) sin cambiar contenido |
| **reducido a X (de Y originales)** | Pérdida cuantificada explícita | Cuando hay menos contenido que el original — DECLARAR los números |
| **extracto / muestra** | Fragmento del original | Cuando se extrajo una parte deliberadamente |
| **mejorado / optimizado** | Cambio de calidad declarado y verificable | SOLO con evidencia de mejora medible (no opinión) |

**Banderas rojas que el sistema castiga:**

- ❌ "Preservado del v1.0 — adaptado a 9 variantes" cuando la realidad es 30→9 (caso #16 v1.1.0)
- ❌ "Optimización" sin métrica que valide la optimización
- ❌ "Mejor que antes" sin evidencia comparativa
- ❌ "Suficiente" / "adecuado" / "apropiado" — palabras vagas que esconden decisiones no auditables

**Aplicación operativa:**

1. En CHANGELOGs, reportes finales, y declaraciones de status: usar el vocabulario correcto.
2. Si una instancia de Claude usa "preservado", auditor externo verifica con diff.
3. Penalizar (−1 punto) en rúbrica F (Calidad Editorial) cuando se detecta uso engañoso.

---

## ED2 — Score honesto declarado: 109/110 con caveat F2 residual

**Origen:** Ciclos consecutivos #25, #45, #5, #15, #21, #18, #27, #16.
**Confianza:** ALTA.

**Lección:**
El score declarado oficial post-Trust but Verify externo de un skill es **109/110 honesto verificable**, no 110/110.

**Razón canónica:**

El caveat F2 residual existe porque el TbV externo mismo NO fue auditado por una tercera instancia — el Principio 10.10 sistémico aplicado recursivamente requeriría un 2do TbV del addendum, lo cual abre regresión infinita.

La política operacional es:
- TbV externo cierra el caveat principal del skill (Opción A o B con addendum)
- F2 residual (auto-bias del TbV mismo) queda declarado como caveat aceptado
- Skill entra como PERFECTO PURO VERIFICABLE con 109/110 honesto

**Excepción documentada:**
- #40 seguridad logró 110/110 limpio en su ciclo. Caso atípico — no replicable como meta sistemático.

**Aplicación operativa:**

1. NUNCA inflar a 110/110. La disciplina cultural premia honestidad.
2. Si un reporte declara 110/110, auditar inmediatamente — banderas rojas activadas.
3. El caveat F2 se documenta en BL-5 v1.1.X (backlog formal) de cada skill.

---

## ED3 — Caveats explícitos vs sesgo de éxito

**Origen:** Patrón observado en múltiples reportes de instancias reconstructoras.
**Confianza:** ALTA.

**Lección:**
Los reportes de instancias de Claude tienden a enmarcar éxitos sin caveats. La disciplina canónica del Addendo Agency OS exige que **TODO reporte final declare explícitamente**:

1. **Hechos verificados** (con evidencia: hash, MD5, líneas, comandos ejecutados)
2. **Inferencias** (qué se asume basado en evidencia parcial)
3. **Caveats abiertos** (qué quedó sin verificar, qué requiere validación adicional)
4. **Discrepancias** (cualquier dato declarado en el prompt que no coincida con la realidad observada)

**Ejemplo correcto (de reporte #16 hoy):**

> "MD5 v1.0 declarado en prompt (0abfd7745...) NO coincide con cómputo independiente desde commit b9d5a3d (ba1c32b05c...). Reportado como hecho — no afecta validez del audit."

Esto es honestidad editorial. El reporte no escondió la discrepancia, no la maquilló, no la ignoró.

**Aplicación operativa:**

1. Reportes finales con sección "Caveats declarados" obligatoria.
2. Si un dato del prompt es inexacto, instancia lo reporta sin asumir error propio.
3. Inferencias se etiquetan como tales (NO presentar como hechos).

---

## 📋 Pendientes por documentar

- **ED.X (pendiente):** Política de citas internas (cuándo citar línea exacta vs parafrasear)
- **ED.X (pendiente):** Frases prohibidas en CHANGELOGs (palabras genéricas que esconden contenido real)
- **ED.X (pendiente):** Disciplina de fechas en formato canónico ISO YYYY-MM-DD
