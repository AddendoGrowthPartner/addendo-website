# Web Designs — Addendo Growth Partner

Esta carpeta contiene los outputs de diseño web producidos por **#18 diseno-web** para cada cliente de Addendo. El Figma vive en Figma Cloud; esta carpeta acompaña con especificaciones versionadas y assets exportados en el repo.

## Estructura por cliente

```
/web-designs/[cliente-kebab-case]/
├── README.md                       # resumen del proyecto
├── figma-links.md                  # links a Figma + prototipo
├── design-decisions.md             # log de decisiones con justificación
├── mockups/                        # capturas de mockups finales
├── exports/                        # assets exportados
│   ├── logos/                      # SVG en 3 versiones
│   ├── icons/                      # SVG optimizado
│   ├── images/                     # WebP + @2x
│   └── favicons/                   # ICO + PNGs
├── handoffs/
│   ├── handoff-to-frontend-dev.md  # handoff estructurado a #21
│   ├── handoff-to-diseno-imagen.md # briefs de imágenes para #17
│   └── visual-qa-checklist.md      # checklist para #39
├── specs/
│   ├── breakpoints.md
│   ├── animations.md
│   ├── accessibility.md
│   └── component-states.md
└── revisions/
    └── [YYYY-MM-DD]-change-log.md
```

## Flujo

1. **#53 agente-branding** produce `/brand-briefs/[cliente].md` con tokens abstractos.
2. **#54 agente-estrategia-comercial** produce `/strategy-docs/[cliente].md` con sitemap + wireframes verbales.
3. **#16 copywriting-seo** produce copy en `/content/[cliente]/`.
4. **#18 diseno-web** recibe los 3 inputs + brief creativo de #15, y produce mockups Figma + handoff aquí.
5. **#21 frontend-dev** recibe el handoff y implementa en código.

## Relación con otros documentos

- `CLAUDE.md` — índice general de los 54 agentes.
- `ORGANIGRAMA-ADDENDO.md` — flujos operativos (FLUJO 2 construcción de sitio web).
- `CHECKLIST-AGENTE-WORLD-CLASS.md` — estándar de calidad del agente #18.
- `/brand-briefs/` — tokens abstractos por cliente (input crítico de #53).
- `/strategy-docs/` — sitemap + wireframes verbales por cliente (input crítico de #54).
- `/content/` — copy por cliente (input crítico de #16).
- `/macro-strategies/` — planes macro por cliente (de #9).
