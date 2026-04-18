# Competitive Intelligence — Addendo Growth Partner

Esta carpeta contiene los outputs de análisis competitivo producidos por **#5 scraping-inteligencia-competitiva** para cada cliente.

## Estructura por cliente

```
/competitive-intelligence/[cliente-kebab-case]/
├── README.md                                  # estado del cliente, último análisis, histórico
└── [YYYY-MM-DD_HH-MM-SS]/                     # cada análisis es inmutable, versionado por timestamp
    ├── brief-input.md                         # brief original recibido
    ├── sources.json                           # manifest con fuentes + timestamps + métodos
    ├── compliance-check.json                  # evidencia de robots.txt / ToS / rate limit / jurisdicción
    ├── fase-1-keywords.json + .md             # data raw + human-readable
    ├── fase-2-technical.json + .md            # análisis técnico + Core Web Vitals
    ├── fase-3-seo-onpage.json + .md           # SEO on-page + schema + densidad
    ├── fase-4-synthesis.md                    # gaps + oportunidades + plan
    ├── reporte-final.md                       # consolidado para #8 agente-investigacion
    └── raw-data/                              # responses raw de APIs (excluido de git)
        ├── dataforseo-[endpoint].json
        ├── apify-[actor]-[run_id].json
        └── pagespeed-[url].json
```

## Flujo de inteligencia competitiva

1. **#3 director-cuenta** provee brief del cliente + competidores identificados
2. **#5 scraping-inteligencia-competitiva** (este agente) extrae data raw de web + keywords + SEO + contenido
3. **#6 agente-spy-ads** en paralelo extrae data de ads (Meta, Google, TikTok, LinkedIn)
4. **#7 agente-redes-organicas** en paralelo extrae data de redes orgánicas (IG, FB, TikTok, LinkedIn, YouTube)
5. **#8 agente-investigacion** consolida los 3 reportes + 7 maletas del cliente ideal
6. **#9 director-estrategia** consume research consolidado para análisis MACRO
7. **#54 agente-estrategia-comercial** consume para strategy doc MICRO por cliente

## Reglas operativas

- **Compliance first:** robots.txt + rate limiting + ToS review antes de cualquier scrape
- **Data con fuente + timestamp + método:** cero data sin evidencia reproducible
- **Sin personal data:** #5 NO recolecta nombres/emails/fotos de personas individuales (GDPR/CCPA/LGPD/BIPA risk)
- **STOP on C&D:** si Addendo, cliente, o scraper reciben Cease-and-Desist, paro inmediato
- **Escalación a analista senior humano:** cuando caso excede perímetro (M&A DD, corporate intelligence, enterprise, mercados restringidos)

## Relación con otros documentos

- `CLAUDE.md` — índice general de 54 agentes
- `ORGANIGRAMA-ADDENDO.md` — flujos operativos
- `CHECKLIST-AGENTE-WORLD-CLASS.md` — estándar de calidad v1.1
- `/brand-briefs/` — tokens de marca (#53)
- `/strategy-docs/` — strategy doc operativo (#54)
- `/macro-strategies/` — planes macro (#9)
- `/web-designs/` — diseños web (#18)
- `/deployments/` — manifests de deploy (#45)
- `/competitive-intelligence/` (este folder) — análisis competitivo web (#5)
- `/pending-agent-updates/` — elementos pendientes de importar a #6 en próxima nivelación
