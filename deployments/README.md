# Deployments — Addendo Growth Partner

Esta carpeta contiene los manifests versionados de deploys producidos por **#45 agente-deployment** para cada cliente.

## Estructura por cliente

```
/deployments/[cliente-kebab-case]/
├── README.md                              # estado del cliente, URL producción, último deploy
├── config.json                            # configuración persistente (dominio, Vercel project ID, Cloudflare zone ID, tracking IDs, compliance flags, rollback metadata)
├── deploys/
│   ├── YYYY-MM-DD_HH-MM-SS_[tipo].json    # deploy-report.json versionado por timestamp
│   └── ...
├── rollback-metadata/
│   ├── current-deployment-id.txt          # Vercel deployment ID actual
│   ├── previous-deployment-id.txt         # ID anterior (rollback target, RTO <2min)
│   └── dns-previous-values.json           # DNS values previos si fueron cambiados
└── post-mortems/
    └── YYYY-MM-DD_[incidente].md          # incidentes documentados con aprendizajes
```

Artefactos pesados (screenshots de Playwright, PDFs de PageSpeed reports, build logs extensos) siguen en Google Drive en `/Addendo/Clientes/[cliente]/deploys/[fecha]/`.

## Flujo

1. **#21 frontend-dev** completa código con build verificado
2. **#42 agente-analytics** provee tracking IDs configurados
3. **#52 agente-legal** marca compliance flags aplicables
4. **#45 agente-deployment** ejecuta protocolo de 7 fases + gates, guarda manifests aquí
5. Post-deploy: handoffs a **#42** (ownership tracking), **#27** (SEO), **#43** (campañas), **#33** (CRO), **#3** (cliente)

## Estado por cliente

| Cliente | Dominio | Última versión | Último deploy | Status |
|---------|---------|----------------|---------------|--------|
| (vacío — primer deploy real pendiente) | | | | |

## Relación con otros documentos

- `CLAUDE.md` — índice general de los 54 agentes
- `ORGANIGRAMA-ADDENDO.md` — flujos operativos (FLUJO 2 construcción de sitio web)
- `CHECKLIST-AGENTE-WORLD-CLASS.md` — estándar de calidad del agente #45
- `/brand-briefs/` — tokens de marca por cliente (#53)
- `/strategy-docs/` — planes operativos por cliente (#54)
- `/content/` — copy por cliente (#16)
- `/web-designs/` — outputs de diseño por cliente (#18)
- `/macro-strategies/` — planes macro por cliente (#9)
- `/deployments/` (este folder) — manifests de deploys por cliente (#45)

## Reglas operativas

- **RTO (Recovery Time Objective):** < 2 minutos vía `vercel promote [previous_deployment_id]`
- **SLA estándar:** < 15 minutos end-to-end desde trigger hasta producción verificada
- **Rollback obligatorio:** siempre disponible antes de cada deploy
- **Secrets:** jamás en código, siempre en Vercel Environment Variables con type encrypted
- **SSL:** Cloudflare Full Strict siempre, jamás Flexible
- **Compliance:** si vertical regulado, verificación por #52 antes de deploy
