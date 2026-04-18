# Macro Strategies — Addendo Growth Partner

Esta carpeta contiene los planes estratégicos macro producidos por **#9 director-estrategia** para cada cliente de Addendo.

## Estructura

Cada cliente tiene su archivo `[cliente-kebab-case].md` con el Plan Macro vigente. Los planes trimestrales versionados se guardan con sufijo `-q1-YYYY.md`, `-q2-YYYY.md`, etc.

```
/macro-strategies/
├── README.md                          # este archivo
├── [cliente].md                       # plan macro vigente por cliente
├── [cliente]-q1-YYYY.md               # versiones trimestrales versionadas
└── revisions/
    └── [cliente]-YYYY-MM-DD-change-log.md
```

## Flujo

1. **#9 director-estrategia** produce el Plan Macro aquí tras análisis de 5 dimensiones + decisión de canales + plan trimestral + North Star Metric + Brief Macro estructurado al final del documento.

2. **#54 agente-estrategia-comercial** consume el Plan Macro + Brief Macro como input y produce el plan operativo micro en `/strategy-docs/[cliente].md` (GTM 90 días tarea-por-semana, buyer persona 12 dimensiones, customer journey, sitemap, etc.).

3. **Los dos documentos** (`/macro-strategies/` + `/strategy-docs/`) componen la estrategia completa del cliente. Sin el macro, el micro carece de dirección; sin el micro, el macro es teoría.

## Revisión

- Cada plan macro se revisa al día 90 con data real del mercado vs. supuestos iniciales.
- Los ajustes se documentan en `/revisions/[cliente]-YYYY-MM-DD-change-log.md`.
- Si la revisión indica pivote mayor, #9 escala a José + #3 director-cuenta antes de re-emitir brief macro.

## Relación con otros documentos

- **CLAUDE.md** — índice general de los 54 agentes.
- **ORGANIGRAMA-ADDENDO.md** — flujos operativos (FLUJO 1 onboarding activa esta carpeta).
- **CHECKLIST-AGENTE-WORLD-CLASS.md** — estándar de calidad del agente #9.
- **/strategy-docs/** — planes micro operativos por cliente (output de #54).
- **/brand-briefs/** — brand briefs por cliente (output de #53).
