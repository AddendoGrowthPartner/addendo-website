---
documento: "README Sistema de Aprendizaje Constante"
version: "v1.0"
creado: "2026-04-29"
proposito: "Guía de uso para humanos y agentes IA del sistema de memoria sistémica del Addendo Agency OS"
---

# 📖 README — Cómo usar el Sistema de Aprendizaje Constante

## ¿Qué es esto?

Es el **cerebro persistente** del Addendo Agency OS. Cualquier lección que se aprende en un ciclo de trabajo (nivelación de skill, ejecución de cliente, decisión arquitectónica, descubrimiento técnico) se documenta acá para que TODO el sistema lo aprenda — no solo la sesión donde se aprendió.

**Sin este sistema:** las lecciones viven en chats que se cierran, en commits que nadie relee, en la memoria humana del CEO que olvida.

**Con este sistema:** cada futuro skill nivelado, cada futuro cliente, cada futuro chat — empieza con todo el aprendizaje previo aplicado.

---

## 🔄 Flujo operativo

### Para Claude Code Mac (instancias de nivelación)

**Antes de arrancar Paso 1 arqueológico de un skill:**

```bash
cat /Users/Mac/addendo-website/.claude/memoria/INDICE.md
cat /Users/Mac/addendo-website/.claude/memoria/lecciones/arquitectonicas.md
cat /Users/Mac/addendo-website/.claude/memoria/lecciones/editoriales.md
cat /Users/Mac/addendo-website/.claude/memoria/lecciones/proceso.md
```

Aplicar preventivamente las lecciones documentadas durante el arqueológico/reconstrucción.

**Al cierre del ciclo:**

Crear archivo en `ciclos-nivelacion/YYYY-MM-DD-skill-NN-{nombre}.md` con resumen + lecciones nuevas + decisiones CEO.

### Para Claude conversacional (yo)

**Al inicio de cada chat con CEO:**

Si tengo acceso vía MCP RAG (Capa 4 cuando esté construida) → consulto automáticamente.

Mientras tanto (hasta Capa 4): el CEO debería invocar manualmente "lee la memoria del sistema antes de responder" o adjuntar el INDICE.md como contexto.

### Para el CEO

**Cuando termina un ciclo importante:**

Pedile a Claude: *"capturemos las lecciones de este ciclo en la memoria"*. Claude propone qué documentar, tú decides qué entra y qué no.

**Cuando arrancás un cliente nuevo:**

Crea `clientes/{nuevo_cliente}.md` desde `_template_cliente.md` con datos iniciales conocidos.

**Cuando detectás un cambio de plataforma o tecnología relevante:**

Crea o actualizá `mercado/{tema}.md` con la fecha y el cambio.

---

## 📝 Cómo agregar contenido nuevo

### Agregar una lección arquitectónica

Editá `lecciones/arquitectonicas.md` siguiendo el formato canónico:

```markdown
## P11.X — [Título corto y descriptivo]

**Origen:** [ciclo, fecha, cliente, evento que produjo la lección]
**Confianza:** alta / media / hipótesis
**Aplicabilidad:** [qué skills, verticales o procesos afecta]

**Lección:**
[descripción concreta de qué se aprendió]

**Evidencia:**
- [evidencia 1]
- [evidencia 2]

**Aplicación operativa:**
[cómo se aplica en futuros ciclos — qué hay que hacer/evitar]

**Caveats:**
[límites de la lección si aplica]
```

### Agregar una lección de cliente

Editá `clientes/{cliente_kebab}.md` agregando entrada en sección `## Lecciones aprendidas` con fecha + lección + evidencia.

### Agregar un ciclo de nivelación

Crear `ciclos-nivelacion/YYYY-MM-DD-skill-NN-{nombre}.md` siguiendo `_template_ciclo.md`.

---

## 🛡️ Reglas duras

1. **NO INVENTAR.** Cada lección documentada lleva origen verificable. Si no hay evidencia, NO se documenta.
2. **NO INFLAR.** Una lección de 3 líneas sólida vale más que una de 30 líneas especulativa.
3. **DECLARAR CONFIANZA.** Marcá `alta / media / hipótesis` siempre.
4. **VERSIONAR.** Cada cambio = commit Git. Sin excepciones.
5. **REVISAR PERIÓDICAMENTE.** Una vez por mes el CEO + Claude revisan si las lecciones siguen vigentes o necesitan actualizar.
6. **PROMOVER PATRONES.** Si una misma lección aparece 3+ veces en `ciclos-nivelacion/`, promoverla a `lecciones/arquitectonicas.md` como principio canónico.

---

## 🚫 Antipatrones a evitar

❌ Documentar TODO lo que pasa (genera ruido, nadie lo lee)
❌ Documentar lecciones genéricas tipo "ser cuidadoso con X" (sin evidencia ni aplicación operativa)
❌ Re-documentar la misma lección con palabras distintas (consolidar antes de duplicar)
❌ Dejar archivos sin owner (cada archivo debe tener `mantenido_por:` en frontmatter)
❌ Modificar lecciones históricas (mejor agregar nueva entrada con fecha + actualización)

---

## 🧭 Navegación rápida

- **¿Qué pasó hoy?** → `ciclos-nivelacion/YYYY-MM-DD-*.md` más reciente
- **¿Cuáles son los principios sistémicos?** → `lecciones/arquitectonicas.md`
- **¿Qué sé de este cliente?** → `clientes/{cliente_kebab}.md`
- **¿Cuál es el patrón de esta vertical?** → `verticales/{vertical_kebab}.md`
- **¿Cambió algo en la plataforma X?** → `mercado/{plataforma}.md`
