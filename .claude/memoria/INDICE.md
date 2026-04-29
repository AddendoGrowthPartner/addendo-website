---
documento: "INDICE Sistema de Aprendizaje Constante — Addendo Agency OS"
version: "v1.0"
creado: "2026-04-29"
ultima_actualizacion: "2026-04-29"
mantenido_por: "Sistema de Agentes Addendo + CEO José Raúl Ramírez"
proposito: "Índice navegable del sistema de memoria sistémica del Addendo Agency OS. Punto de entrada obligatorio para cualquier instancia de Claude (conversacional, Code Mac, futuros agentes 24/7) antes de operar."
---

# 📚 ÍNDICE — Sistema de Aprendizaje Constante v1.0

**Repo:** `/Users/Mac/addendo-website/.claude/memoria/`
**Versionado:** Git (cada cambio = commit)
**Lectura obligatoria:** SÍ — todos los ciclos de nivelación, todos los chats nuevos del CEO, todos los workflows productivos consultan este índice como punto de entrada.

---

## 🎯 Propósito

Este sistema captura el aprendizaje del Addendo Agency OS para que NINGUNA lección quede atrapada en una conversación, una pestaña de Claude Code, o la memoria humana del CEO. Cada decisión arquitectónica, cada catch del CEO, cada hallazgo de Trust but Verify, cada patrón de cliente — se documenta aquí.

**Regla de oro:** si una lección no está documentada acá, NO existe sistémicamente. Va a perderse y re-aprenderse a costo.

---

## 📂 Estructura del repo

```
.claude/memoria/
├── INDICE.md (este archivo)
├── README.md (cómo usar este sistema)
│
├── lecciones/
│   ├── arquitectonicas.md     ← Principios sistémicos cross-skill (P11.1-P11.N)
│   ├── proceso.md             ← Workflow CEO ↔ agentes, ciclos canónicos
│   ├── editoriales.md         ← Honestidad de redacción y declaración
│   ├── tecnicas.md            ← Stack, bugs, fixes, gotchas técnicos
│   └── _template_leccion.md   ← Plantilla canónica para nuevas lecciones
│
├── clientes/                   ← 1 archivo por cliente activo o pasivo
│   ├── _template_cliente.md
│   ├── don-jacinto-nahual.md  ← LIVE
│   ├── bebe-genial.md          ← LIVE
│   ├── bebe-poliglota.md       ← Pendiente datos
│   ├── creditbridge.md         ← Live deployment, contenido pendiente
│   ├── ciudad-maderas.md       ← Pendiente
│   ├── neurokids.md            ← Pendiente
│   ├── creditos-experto.md     ← Pendiente
│   └── real-estate-pendiente.md
│
├── verticales/                 ← Patrones cross-cliente por industria
│   ├── _template_vertical.md
│   ├── servicios-locales-esotericos.md
│   ├── fintech-credito.md
│   ├── neurodesarrollo-infantil.md
│   ├── real-estate.md
│   ├── salud-bienestar.md
│   ├── educacion.md
│   └── saas-tech.md
│
├── mercado/                    ← Cambios en plataformas y tecnologías
│   ├── _template_mercado.md
│   ├── seo-aeo-geo-2026.md
│   ├── meta-ads-cambios.md
│   ├── google-ads-cambios.md
│   ├── tailwind-v4-stack.md
│   └── astro-vercel-stack.md
│
└── ciclos-nivelacion/          ← Reportes históricos de cada ciclo cerrado
    ├── _template_ciclo.md
    ├── 2026-04-29-skill-27-seo.md
    └── 2026-04-29-skill-16-copywriting-seo.md
```

---

## 🔑 Reglas operativas del sistema

### Regla 1 — Lectura preventiva obligatoria

Todo prompt de **Paso 1 arqueológico** o **Paso 3 reconstrucción** de un skill DEBE empezar leyendo:

1. `INDICE.md` (este archivo)
2. `lecciones/arquitectonicas.md`
3. `lecciones/editoriales.md`
4. `lecciones/proceso.md`
5. Si el skill toca un cliente activo → `clientes/{cliente_kebab}.md`
6. Si el skill toca una vertical → `verticales/{vertical_kebab}.md`
7. Si el skill toca tecnología afectada → `mercado/{tecnologia_kebab}.md`

**Aplicar PREVENTIVAMENTE las lecciones relevantes durante el arqueológico/reconstrucción.**

### Regla 2 — Captura post-ciclo obligatoria

Al cierre de cada ciclo de nivelación, ejecución de cliente, o sesión arquitectónica relevante, el CEO + Claude documentan en `ciclos-nivelacion/YYYY-MM-DD-{descripcion}.md` y promueven lecciones nuevas a las carpetas correspondientes.

### Regla 3 — Honestidad documental

NO inflar. NO inventar lecciones. NO presentar suposiciones como hechos. Cada lección lleva:

- Origen verificable (commit, ciclo, cliente, fecha)
- Evidencia concreta
- Confianza declarada (alta / media / hipótesis)
- Caveats si aplica

### Regla 4 — Versionado en Git

Cada cambio en este repo = commit con mensaje descriptivo. Trazabilidad completa de cómo el sistema aprendió a lo largo del tiempo.

---

## 📊 Estado actual del sistema (al cierre de 29 abril 2026)

| Capa | Estado |
|---|---|
| **Capa 1** — Memoria estructurada versionada | ✅ ACTIVA (este sistema, recién creado) |
| **Capa 2** — Telemetría performance Redis + N8N | ⚠️ Pendiente construcción (esta semana) |
| **Capa 3** — Detección activa de patrones | ⚠️ Pendiente construcción (mes que viene) |
| **Capa 4** — MCP RAG sobre memoria (Claude conversacional consulta automática) | ⚠️ Pendiente construcción (próxima semana) |

---

## 🔢 Métricas del sistema

| Métrica | Valor |
|---|---|
| Lecciones arquitectónicas documentadas | 8 |
| Lecciones de proceso | 3 |
| Lecciones editoriales | 3 |
| Lecciones técnicas | 4 |
| Clientes con archivo | 8 (2 con datos, 6 templates) |
| Verticales documentadas | 7 (1 con datos reales, 6 templates) |
| Documentos de mercado | 5 (2 con contenido inicial, 3 templates) |
| Ciclos de nivelación documentados | 2 (#27, #16) |

---

## 🚀 Próximos pasos del sistema

1. **HOY:** Capa 1 desplegada + 2 ciclos de hoy documentados + 11 lecciones reales capturadas
2. **Esta semana:** Capa 2 — Telemetría Redis + workflow N8N nocturno
3. **Próxima semana:** Capa 4 Enfoque A — Servidor MCP RAG sobre `/memoria/`
4. **Mes que viene:** Capa 3 — Meta-observador detección activa de patrones

---

## 📞 Mantenimiento

**Owner:** CEO José Raúl Ramírez (admin@addendo.io)
**Co-mantenedor:** Sistema de Agentes Addendo (Claude conversacional + Claude Code Mac)
**Cadencia revisión:** al cierre de cada ciclo + revisión semanal consolidada
