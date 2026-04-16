# ADDENDO AGENCY OS — CLAUDE.md
## Sistema Operativo de la Agencia mas Automatizada de America Latina

---

## ⚠️ REGLA #1 — OBLIGATORIA ANTES DE CUALQUIER TAREA

Antes de ejecutar CUALQUIER tarea, Claude Code DEBE:

1. Identificar qué agente es responsable de esa tarea
2. Leer el archivo completo del agente en:
   `/Users/Mac/addendo-website/.claude/agents/skills-globales/[nombre-agente].md`
3. Ejecutar la tarea usando ese agente como guía

**NUNCA ejecutar tareas sin haber leído el agente correspondiente primero.**
Si no está claro qué agente aplica, leer el agente #4 `project-manager` para que él decida.

### MAPA RÁPIDO DE AGENTES POR TAREA

- Workflows N8N → `agente-constructor-workflows` (#50)
- Investigación de cliente/mercado → `agente-investigacion` (#8)
- Sitios web / código → `agente-desarrollo-web` (#20) + `agente-frontend` (#21)
- SEO y blog → `agente-seo` (#27) + `agente-copywriting-seo` (#16)
- Deploy / GitHub / servidor → `agente-deployment` (#45)
- Seguridad → `agente-seguridad` (#40)
- Meta Ads → `agente-meta-ads` (#11)
- Google Ads → `agente-google-ads` (#12)
- Diseño / imágenes → `agente-diseno-imagen` (#17)
- Onboarding nuevo cliente → `onboarding-cliente` (#2) + `director-cuenta` (#3)
- Revisión de calidad → `revisor-qa` (#39)
- Automatización general → `agente-n8n-automatizacion` (#24)
- Reportes → `agente-reportes` (#36)
- Ventas / prospección → `agente-prospector` (#35)

---

## ⚠️ REGLA #2 — USO SEGURO DEL MCP DE N8N

El MCP de n8n (`czlonkowski/n8n-mcp`) está instalado y configurado en dos ubicaciones vía `.mcp.json` (stdio transport, `npx` on-demand):

- **Mac**: `/Users/Mac/addendo-website/.mcp.json` — para sesiones interactivas de Jose
- **AWS**: `/home/ubuntu/addendo-website/.mcp.json` — para agentes headless Claude Code 24/7

Ambos archivos son idénticos y cargan `N8N_API_KEY` desde variable de entorno del host (ya existe en `~/.bashrc` del servidor y en `~/.zshrc` del Mac).

### Reglas de uso

1. **Por defecto solo lectura**: listar workflows, describir nodos, revisar ejecuciones, consultar docs. Estas operaciones son seguras e idempotentes.
2. **Para escribir workflows activos en producción** (crear, modificar, activar, desactivar, eliminar):
   - Backup del workflow **antes** de cualquier cambio (convención `workflows/<nombre>.json.bak-<timestamp>` en AWS)
   - Confirmación explícita de Jose en chat antes de ejecutar la operación
3. **Secretos**: `N8N_API_KEY` nunca se expone en logs, commits, echos ni archivos públicos. El `.mcp.json` está en `.gitignore` como defensa en profundidad; el key viaja vía env var substitution `${N8N_API_KEY}`.
4. **Alcance**: el MCP puede tocar cualquier workflow de la instancia `n8n.addendo.io`. Los workflows críticos conocidos hoy son `blog-don-jacinto` (ID `NKyH6etI3cF8En7n`) y `blog-addendo` (ID `vjejHZvJa2PtTLYh`).
5. **Incompatibilidades conocidas**: n8n CLI reporta `2.8.4` (versioning no-mainline). Operaciones de lectura funcionan; build/edit podría tener quirks — probar en workflow staging antes de aplicar a producción.

---

## IDENTIDAD DEL SISTEMA

- **Empresa:** Addendo Growth Partner (Addendo LLC)
- **CEO:** Jose Raul Ramirez — admin@addendo.io
- **Mision:** Agencia de marketing y ventas 100% automatizada con IA
- **Ubicacion:** Kissimmee, Florida, USA
- **Servidor AWS:** ubuntu@18.233.117.68
- **N8N:** https://n8n.addendo.io
- **Sitio web:** https://addendo.io

---

## REGLAS DE COMPORTAMIENTO OBLIGATORIAS

1. **Siempre responder en español** — Jose no es tecnico
2. **Nunca inventar datos, hechos ni resultados**
3. **Siempre leer el skill del agente antes de ejecutar cualquier tarea**
4. **Siempre continuar desde donde se quedo la ultima sesion**
5. **Cuando Jose de una orden, identificar que agente o agentes deben ejecutarla**
6. **Nunca ejecutar una tarea sin el skill correspondiente cargado**
7. **Si una tarea requiere multiples agentes, activarlos en el orden correcto**

---

## COMO IDENTIFICAR QUE AGENTE ACTIVAR

Cuando Jose da una orden, seguir este proceso:

1. **Leer la orden** y entender el objetivo
2. **Identificar que agente o agentes** del sistema son responsables
3. **Leer el skill** de ese agente en `.claude/agents/skills-globales/`
4. **Ejecutar la tarea** siguiendo las instrucciones del skill
5. **Si la tarea requiere multiples agentes**, activarlos en paralelo como subagentes

---

## MAPA DE AGENTES POR TIPO DE TAREA

### CUANDO JOSE DICE "tenemos un cliente nuevo":
→ Activar en secuencia:
1. director-cuenta (#3)
2. onboarding-cliente (#2)
3. agente-auditoria (#10)
4. director-estrategia (#9)
5. director-creativo (#15)
6. project-manager (#4)

### CUANDO JOSE DICE "construye el sitio web de [cliente]":
→ Activar en secuencia:
1. diseno-web (#18)
2. desarrollo-web (#20)
3. frontend-dev (#21)
4. revisor-qa (#39)
5. agente-deployment (#45)

### CUANDO JOSE DICE "investiga la competencia de [cliente]":
→ Activar en paralelo:
- agente-scraping (#5) +
- agente-spy-ads (#6) +
- agente-redes-organicas (#7)

→ Despues consolidar con:
- agente-investigacion (#8)

### CUANDO JOSE DICE "escribe un articulo de blog para [cliente]":
→ Activar en secuencia:
1. seo (#27) para keywords
2. copywriting-seo (#16) para redactar
3. revisor-qa (#39)
4. agente-deployment (#45) para publicar

### CUANDO JOSE DICE "lanza campañas de publicidad para [cliente]":
→ Activar segun canal:
- google-ads (#12) +
- meta-ads (#11) +
- tiktok-ads (#13) +
- linkedin-ads (#14) +
- youtube-ads (#48)

→ Segun estrategia, despues:
- revisor-qa (#39)
- aprobador (#41)

### CUANDO JOSE DICE "busca clientes nuevos para Addendo":
→ Activar en secuencia:
1. agente-prospector (#35)
2. agente-preventa (#1)

### CUANDO JOSE DICE "hay un problema con un cliente":
→ Activar en secuencia:
1. agente-pqr (#44)
2. director-cuenta (#3)
3. Jose (si es critico)

### CUANDO JOSE DICE "crea el reporte mensual de [cliente]":
→ Activar en paralelo:
- agente-analytics (#42) +
- reportes (#36)

→ Despues:
- director-cuenta (#3) para entregar

### CUANDO JOSE DICE "revisa la seguridad del servidor":
→ Activar en paralelo:
- seguridad (#40) +
- servidor-cloud (#25) +
- agente-monitor (#43)

### CUANDO JOSE DICE "haz un video para [cliente]":
→ Activar en secuencia:
1. agente-video-director (#51) — disena estrategia + guion tecnico
2. diseno-imagen (#17) — produce el video segun briefing
3. contenido-redes (#28) — publica en las plataformas

---

## LOS 51 AGENTES DEL SISTEMA

### CAPA 01 — ENTRADA
| # | Agente | Skill |
|---|--------|-------|
| #1 | agente-preventa | `agente-preventa.md` |
| #2 | onboarding-cliente | `onboarding-cliente.md` |
| #3 | director-cuenta | `director-cuenta.md` |
| #4 | project-manager | `project-manager.md` |

### CAPA 02 — INTELIGENCIA
| # | Agente | Skill |
|---|--------|-------|
| #5 | agente-scraping | `scraping-inteligencia-competitiva.md` |
| #6 | agente-spy-ads | `agente-spy-ads.md` |
| #7 | agente-redes-organicas | `agente-redes-organicas.md` |
| #8 | agente-investigacion | `agente-investigacion.md` |
| #9 | director-estrategia | `director-estrategia.md` |
| #10 | agente-auditoria | `agente-auditoria.md` |

### CAPA 03 — PUBLICIDAD
| # | Agente | Skill |
|---|--------|-------|
| #11 | meta-ads | `meta-ads.md` |
| #12 | google-ads | `google-ads.md` |
| #13 | tiktok-ads | `tiktok-ads.md` |
| #14 | linkedin-ads | `linkedin-ads.md` |

### CAPA 04 — DISEÑO Y CONTENIDO
| # | Agente | Skill |
|---|--------|-------|
| #15 | director-creativo | `director-creativo.md` |
| #16 | copywriting | `copywriting-seo.md` |
| #17 | diseno-imagen | `diseno-imagen.md` |
| #18 | diseno-web | `diseno-web.md` |
| #19 | gestor-assets | `gestor-assets.md` |

### CAPA 05 — SISTEMAS
| # | Agente | Skill |
|---|--------|-------|
| #20 | desarrollo-web | `desarrollo-web.md` |
| #21 | frontend-dev | `frontend-dev.md` |
| #22 | backend-dev | `backend-dev.md` |
| #23 | ghl-crm | `ghl-crm.md` |
| #24 | n8n-automatizacion | `n8n-automatizacion.md` |
| #25 | servidor-cloud | `servidor-cloud.md` |
| #26 | agentes-voz | `agentes-voz.md` |

### CAPA 06 — CRECIMIENTO
| # | Agente | Skill |
|---|--------|-------|
| #27 | seo | `seo.md` |
| #28 | contenido-redes | `contenido-redes.md` |
| #29 | youtube-organico | `youtube-organico.md` |
| #30 | ventas-atencion | `ventas-atencion.md` |
| #31 | agente-email-marketing | `agente-email-marketing.md` |
| #32 | agente-gbp | `agente-gbp.md` |
| #33 | agente-cro | `agente-cro.md` |
| #34 | agente-reputacion | `agente-reputacion.md` |
| #35 | agente-prospector | `agente-prospector.md` |

### CAPA 07 — FINANZAS Y DATOS
| # | Agente | Skill |
|---|--------|-------|
| #36 | reportes | `reportes.md` |
| #37 | finanzas | `finanzas.md` |
| #38 | analisis-datos | `analisis-datos.md` |

### CAPA 08 — CONTROL
| # | Agente | Skill |
|---|--------|-------|
| #39 | revisor-qa | `revisor-qa.md` |
| #40 | seguridad | `seguridad.md` |
| #41 | aprobador | `aprobador.md` |
| #42 | agente-analytics | `agente-analytics.md` |
| #43 | agente-monitor | `agente-monitor.md` |
| #44 | agente-pqr | `agente-pqr.md` |
| #45 | agente-deployment | `agente-deployment.md` |
| #46 | agente-rp | `agente-rp.md` |

### AGENTES ESPECIALES
| # | Agente | Skill |
|---|--------|-------|
| #47 | growth-content-specialist | `growth-content-specialist.md` |
| #48 | youtube-ads | `youtube-ads.md` |
| #49 | agente-manychat | `agente-manychat.md` |
| #50 | agente-constructor-workflows | `agente-constructor-workflows.md` |
| #51 | agente-video-director | `agente-video-director.md` |

**Total: 51 agentes** — todos los skills estan en `.claude/agents/skills-globales/`

---

## INFRAESTRUCTURA DEL SISTEMA

### Servidor y desarrollo
- **AWS EC2:** ubuntu@18.233.117.68 (t3.small, Ubuntu 24)
- **SSH:** `ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68`
- **N8N:** https://n8n.addendo.io (PM2) — puerto 5678 (UI) y 5679 (Task Broker interno)
- **Claude Code AWS:** `/home/ubuntu/addendo-website/`
- **Claude Code Mac:** `/Users/Mac/addendo-website/`
- **Claude Code Don Jacinto Mac:** `/Users/Mac/don-jacinto-nahual/`
- **GitHub:** AddendoGrowthPartner
- **Vercel:** sitios de clientes
- **Cloudflare:** DNS y CDN

### Plataformas y cuentas
- **GHL:** CRM agencia
- **Google Ads MCC:** 424-957-3841
- **Meta Business ID:** 161783471681304
- **Cloudinary:** dokzw376u

---

## CLIENTES ACTIVOS

| Cliente | Estado |
|---------|--------|
| Don Jacinto Nahual | donjacintonahual.com — **LIVE**, blog automático funcionando, 2 artículos publicados, menú y página `/blog` activos |
| Neurokids | PENDIENTE onboarding |
| Bebe Genial | PENDIENTE onboarding |
| CreditBridge | PENDIENTE onboarding |

---

## PROYECTOS Y REPOS ACTIVOS

| Cliente | Repo GitHub | Path Mac | Path AWS | Estado |
|---|---|---|---|---|
| Don Jacinto Nahual | AddendoGrowthPartner/don-jacinto-nahual | /Users/Mac/don-jacinto-nahual | No clonado en AWS | LIVE |
| Addendo website | AddendoGrowthPartner/addendo-website | /Users/Mac/addendo-website | /home/ubuntu/addendo-website | LIVE |
| Neurokids | Pendiente crear | Pendiente | Pendiente | ONBOARDING |
| Bebe Genial | Pendiente crear | Pendiente | Pendiente | ONBOARDING |
| CreditBridge | Pendiente crear | Pendiente | Pendiente | ONBOARDING |

---

## COMO USAR EL SISTEMA DE SUBAGENTES

Cuando una tarea requiere multiples agentes trabajando en paralelo, usar este formato:

### Para tareas paralelas
**Ejemplo:** investigar la competencia de un cliente nuevo

1. **Leer el skill** de cada agente involucrado
2. **Crear un subagente** por cada tarea paralela
3. **Consolidar los resultados** cuando todos terminen
4. **Entregar el resultado consolidado** a Jose

### Patron tipico de coordinacion paralela:

```
Tarea: "investiga la competencia de [cliente]"

Subagente 1 → agente-scraping (#5)
  Lee: scraping-inteligencia-competitiva.md
  Ejecuta: extraccion de SEO/web/mercado

Subagente 2 → agente-spy-ads (#6)
  Lee: agente-spy-ads.md
  Ejecuta: extraccion de ads pagados

Subagente 3 → agente-redes-organicas (#7)
  Lee: agente-redes-organicas.md
  Ejecuta: extraccion de contenido organico

[esperar a que los 3 terminen]

Consolidacion → agente-investigacion (#8)
  Lee: agente-investigacion.md
  Recibe: los 3 reportes
  Entrega: reporte consolidado al director-estrategia
```

---

## REGLA DE ORO

**Antes de ejecutar cualquier tarea, responder estas 4 preguntas:**

1. ¿Que agente es responsable de esta tarea?
2. ¿Lei su skill completo?
3. ¿Tengo todos los inputs que el skill requiere?
4. ¿Se a quien le entrego el resultado?

**Si la respuesta a cualquiera de estas es NO** — parar y resolver antes de continuar.

---

## FILOSOFIA DEL SISTEMA

> "Nunca actuar sin contexto. Nunca improvisar sin skill. Nunca entregar sin verificar. La calidad de Addendo se construye con disciplina sistematica, no con velocidad sin metodo."

El sistema de 51 agentes existe para que cada decision se tome con la misma rigurosidad que tomaria el mejor especialista del mundo en cada area. La forma de honrar ese diseño es **leyendo el skill, siguiendo el proceso, y respetando las dependencias entre agentes**.

---

*Sistema operativo de Addendo Growth Partner — 51 agentes especializados, 1 mision: ser la agencia mas automatizada de America Latina.*
