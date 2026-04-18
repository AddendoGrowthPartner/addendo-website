# Creative Briefs — Addendo Growth Partner

Esta carpeta contiene los briefs creativos versionados por campaña, producidos por **#15 director-creativo** para cada cliente.

## Estructura por cliente

```
/creative-briefs/[cliente-kebab-case]/
├── README.md                                     # estado del cliente: campañas activas, archivadas, histórico
└── [YYYY-MM-DD]_[campaña-kebab-case]/            # una carpeta por campaña (inmutable, versionada por fecha)
    ├── brief-creativo.md                         # brief maestro de la campaña
    ├── big-idea.md                               # concepto creativo central en 1 frase + justificación
    ├── brief-por-ejecutor/
    │   ├── brief-16-copywriting.md
    │   ├── brief-17-diseno-imagen.md
    │   ├── brief-18-diseno-web.md                # solo si campaña incluye landing
    │   ├── brief-11-meta-ads.md                  # solo si aplica
    │   ├── brief-12-google-ads.md                # solo si aplica
    │   ├── brief-13-tiktok-ads.md                # solo si aplica
    │   ├── brief-28-contenido-redes.md           # solo si aplica
    │   └── brief-51-video-director.md            # solo si aplica
    ├── referencias-visuales.md                   # links a 8-12 referencias externas + racional
    ├── cultura.md                                # variante cultural + 11 dimensiones aplicadas
    ├── do-and-dont.md                            # perímetro positivo y negativo explícito
    ├── validacion-cruzada.md                     # audit post-ejecución: ¿las piezas se sienten familia?
    └── sources/                                  # input docs referenciados (copias, no links rotos)
        ├── brand-brief-53.md
        ├── strategy-doc-54.md
        ├── brief-macro-9.md
        └── brief-maestro-3.md
```

## Flujo creativo

1. **#3 director-cuenta** provee brief maestro del cliente
2. **#9 director-estrategia** emite brief macro en `/macro-strategies/`
3. **#54 agente-estrategia-comercial** emite strategy doc operativo en `/strategy-docs/`
4. **#53 agente-branding** emite brand brief en `/brand-briefs/`
5. **#15 director-creativo** (este agente) consolida inputs y emite brief creativo por campaña aquí
6. **#3 director-cuenta** valida como único gate antes de distribuir a ejecutores
7. **Ejecutores downstream** reciben briefs específicos:
   - #16 copywriting-seo (copy final)
   - #17 diseño-imagen (imagen/video)
   - #18 diseño-web (landing/web)
   - #11 meta-ads, #12 google-ads, #13 tiktok-ads (campañas pagadas)
   - #28 contenido-redes (orgánico)
   - #51 agente-video-director (video mayor)
8. **#15** audita coherencia cruzada post-ejecución antes de publicar

## Principios operativos

- **Inmutabilidad por campaña:** una vez emitido, la carpeta no se modifica retroactivamente. Nueva versión = nueva carpeta `[YYYY-MM-DD]_[campaña]_v2`
- **Auto-contenido:** snapshots de brand brief, strategy doc, brief macro al momento del brief creativo
- **Accesible:** cualquier agente lee briefs sin permisos adicionales
- **Trazable:** README del cliente lista campañas con fechas, estados, KPIs, responsables
- **Gate obligatorio de #3:** sin aprobación de director-cuenta, el brief no se distribuye

## Reglas de deslinde

- **#53 agente-branding** define identidad visual permanente (paleta, tipografía, logo, sistema)
- **#15 director-creativo** interpreta la identidad visual en cada campaña específica — NUNCA redefine la identidad
- **#9 y #54** definen estrategia MACRO y MICRO — #15 NUNCA redefine estrategia
- **#16-28-51-17-18-21-11-12** ejecutan las piezas — #15 NUNCA ejecuta, solo orquesta coherencia
- **#52 agente-legal** revisa antes de publicar en verticales reguladas

## Escalación a DC senior humano

Ver FASE 9 de `/Users/Mac/addendo-website/.claude/agents/skills-globales/director-creativo.md` — 12 escenarios de escalación obligatoria:
1. Category creation (lanzamiento de categoría de mercado nueva)
2. Re-branding parcial o total
3. Crisis reputacional grave
4. Verticales reguladas con jurisprudencia pendiente
5. Mercados fuera de las 10 variantes culturales canónicas
6. Campañas enterprise (>USD 500k o escala nacional/continental)
7. Publicidad comparativa agresiva
8. Talent / celebridad / influencer alto perfil
9. Investigación creativa primaria
10. Cliente sin brand brief de #53
11. Tensión irresoluble entre #53 y #54
12. Riesgo de backlash cultural o político

## Relación con otros documentos

- `CLAUDE.md` — índice general de 54 agentes
- `ORGANIGRAMA-ADDENDO.md` — flujos operativos
- `CHECKLIST-AGENTE-WORLD-CLASS.md` — estándar de calidad v1.1
- `/brand-briefs/` — identidad visual por cliente (#53)
- `/strategy-docs/` — strategy doc operativo MICRO (#54)
- `/macro-strategies/` — planes macro (#9)
- `/competitive-intelligence/` — análisis competitivo (#5)
- `/creative-briefs/` (este folder) — briefs creativos por campaña (#15)
- `/web-designs/` — diseños web (#18)
- `/deployments/` — manifests de deploy (#45)
