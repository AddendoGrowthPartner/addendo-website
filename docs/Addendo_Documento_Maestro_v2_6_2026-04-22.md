# DOCUMENTO MAESTRO — ADDENDO AGENCY OS

**Version:** 2.6
**Fecha:** 22 abril 2026 (tarde)
**Autor:** Jose Raul Ramirez (CEO) + Claude (asistente arquitectonico)
**Supera a:** v2.5 (22 abril 2026 mañana)

---

## 1. RESUMEN EJECUTIVO

**22 abril 2026 (sesion tarde) — Dia de avance mixto arquitectonico + produccion:**

(a) **Diagnostico empirico critico del daemon Claude Code:** infraestructura operacional (CLI + variables + test validado $0.0064/921ms) pero **ningun workflow de produccion usa skills como system_prompt**. Workflow Blog Don Jacinto es bypass funcional del Agency OS.

(b) **Instalacion produccion GA4 + Search Console + vinculacion + sitemap** para donjacintonahual.com.

(c) **Schema BlogPosting implementado en 11 blogs.** Los 5 warnings de Google eliminados. Score SEO promedio subio 7.9 → ~9.5/10.

(d) **Vision definida para Sistema de Memoria Unificada por Cliente (D16) + Dashboard cliente-facing (D17)**, ambos postpuestos hasta completar nivelacion de agentes.

---

**22 abril 2026 (mañana) — Decision arquitectonica fundacional:** adoptada Filosofia B (herramienta correcta segun problema). Addendo usa agentes IA donde hay inferencia real, workflows N8N donde hay logica deterministica. Esta decision afecta todas las decisiones arquitectonicas futuras y genera ahorro operacional estimado de $100K-400K anuales a escala 1000 clientes vs Filosofia A (todo agente IA).

El 21 abril 2026 marca un hito mayor en la consolidacion del sistema Addendo Agency OS. En una sola jornada se ejecutaron:

- **2 nivelaciones World-Class v1.1 a PERFECTO PURO verificable** (#25 servidor-cloud + #40 seguridad), elevando el total a **3 agentes PERFECTO PURO con auditoria objetiva** (junto a #50 del 20 abril).
- **Sanitizacion integral de politica cero-secretos** en los 54 skills del sistema, con un hallazgo critico resuelto (Developer Token Google Ads expuesto en 3 skills, rotado el 20 abril + sanitizado el 21).
- **8 decisiones arquitectonicas mayores cerradas** (D1-D8), incluyendo definicion de roles canonicos, taxonomia SRE moderna para cloud engineering, cobertura LLM completa como habilitador del daemon Claude Code futuro, y protocolo tripartita formal entre agentes de seguridad / infra / monitoreo.
- **4 decisiones aplazadas a 22 abril** (D9-D12) tras cuestionamiento profesional del rol canonico de #43 agente-monitor por posible solapamiento destructivo con agentes ya existentes.

El sistema queda operacionalmente preparado para la activacion del daemon Claude Code 24/7 (pendiente decision CEO sobre timing) y para onboarding de clientes regulados (GDPR/LGPD/HIPAA/PCI-DSS con marcos documentados).

**Estado sincronizacion 3 capas al cierre del dia 21 abril:** Mac + GitHub + AWS en commit `104109d`.

---

## 2. INFRAESTRUCTURA ACTIVA (sin cambios desde v2.3)

| Componente | Estado | Ubicacion / URL |
|------------|--------|-----------------|
| AWS EC2 (t3.small, Ubuntu 24.04) | Activo, 14+ dias uptime | `ubuntu@18.233.117.68` |
| N8N self-hosted (PM2) | Activo | https://n8n.addendo.io |
| Cloudflare (DNS + CDN + WAF Free) | Activo | addendo.io + dominios cliente |
| Redis 7.0.15 (memoria operacional) | Activo (instalado 20 abril) | localhost:6379 en AWS |
| GitHub repo canonico | Activo | AddendoGrowthPartner/addendo-website |
| Claude Code Mac | Activo (desarrollo) | /Users/Mac/addendo-website |
| Claude Code AWS | Preparado (daemon pendiente) | /home/ubuntu/addendo-website |

Sin cambios infraestructurales el 21 abril — la jornada fue 100% consolidacion arquitectonica + nivelacion skills.

---

## 3. SISTEMA DE AGENTES — ESTADO ACTUAL

### 3.1 Vision general

**22 de 54 agentes** nivelados al estandar World-Class v1.1 (**40.7%** del sistema).

**3 PERFECTOS PUROS VERIFICABLES** (auditoria objetiva post-nivelacion):

| # | Agente | Version | Commit | Fecha | Rol canonico |
|---|--------|---------|--------|-------|--------------|
| **#50** | agente-constructor-workflows | v1.1.1 | `fd553ed` | 20 abril 2026 | Workflow Engineer N8N (COMPILAR/DESPLEGAR/VERSIONAR/AUTORREPARAR-WORKFLOWS) |
| **#25** | servidor-cloud | v1.1.0 | `5cc0f97` | 21 abril 2026 | Cloud Engineer Puro (ADMINISTRAR/OBSERVAR/AUTO-HEALING-INFRA/OPTIMIZAR) |
| **#40** | seguridad | v1.1.0 | `d618c16` | 21 abril 2026 | Auditor Seguridad Estrategica Pre-Produccion (AUDITAR/BLOQUEAR/ENMASCARAR/ESCALAR) |

**7 PERFECTOS PUROS AUTO-EVALUADOS** (auditoria independiente objetiva pendiente):
- #4 project-manager
- #11 meta-ads
- #12 google-ads
- #15 director-creativo
- #21 frontend-dev
- #27 seo
- #42 agente-analytics

El resto (32 agentes) permanece en v1.0 original, pendiente de nivelacion en olas subsiguientes.

### 3.2 Nivelaciones del 21 abril 2026 — detalle completo

#### 3.2.1 #25 servidor-cloud (nuevo PERFECTO PURO verificable)

| Metrica | Pre-nivelacion v1.0 | Post-nivelacion v1.1.0 |
|---------|--------------------|-----------------------|
| Puntaje auditoria objetiva | 35.5/110 | **110/110** |
| Lineas | 2,215 | **3,061** (+846) |
| Clasificacion | REQUIERE NIVELACION | **PERFECTO PURO verificable** |

**Cambios estructurales:**
- **Rol canonico definido:** Cloud Engineer Puro (NO DevOps, NO Architect, NO SRE completo).
- **4 verbos exclusivos aplicados** con taxonomia SRE moderna (estandar Google SRE + Netflix Full Cycle + AWS Well-Architected): **ADMINISTRAR / OBSERVAR / AUTO-HEALING-INFRA / OPTIMIZAR**. El guion de `AUTO-HEALING-INFRA` es deliberado para deslinde con `AUTORREPARAR-WORKFLOWS` de #50.
- **14 fronteras absolutas F1-F14** con tabla deslinde formal de 20 agentes adyacentes.
- **6 decisiones CEO D1-D6** cerradas y documentadas.
- **FASE M Modernizacion 2026** con 7 sub-secciones: Redis 7.0.15 keyspace canonico, 6 patrones AUTO-HEALING-INFRA, Claude Code CLI headless, SSH `bash -ic` wrapper, observabilidad estructurada, runaway cost detection, Protocolo Tripartita M.8.
- **FASE G Multi-idioma** con convenciones idiomaticas, TZ canonico America/New_York, compliance regional.
- **FASE Z Limitaciones Honestas** con 3 niveles madurez N1/N2/N3 (80% / 15% / 5% inventario).
- **Roadmap escalabilidad 4 hitos**: 1-10 (actual) → 10-50 (vertical scaling) → 50-200 (distribuido multi-AZ) → 200-1,000 (multi-region global).
- **FASES 3-9 operacionales preservadas integras**: comandos AWS reales, config PM2 N8N, reglas Cloudflare, hardening servidor, backups 3-2-1, monitoreo UptimeRobot, optimizacion costos.

**Addendum post-nivelacion:** tras verificacion objetiva (Trust but Verify), el CEO detecto divergencia de verbos aplicados vs propuesta original (OPERAR/MANTENER/RESPALDAR/AUTO-HEALING-INFRA). Tras revision, se documento en Decision D2 addendum la trazabilidad de la divergencia + justificacion arquitectonica (equivalencia semantica + superioridad taxonomia SRE moderna). Commit addendum: `5cc0f97`.

**Commits asociados:**
- Nivelacion inicial: `2eb431f`
- Addendum trazabilidad: `5cc0f97` (estado final)

#### 3.2.2 #40 seguridad (nuevo PERFECTO PURO verificable)

| Metrica | Pre-nivelacion v1.0 | Post-nivelacion v1.1.0 |
|---------|--------------------|-----------------------|
| Puntaje auditoria objetiva | 37/110 | **110/110** |
| Lineas | 1,992 | **3,584** (+1,592) |
| Clasificacion | REQUIERE NIVELACION | **PERFECTO PURO verificable** |

**Cambios estructurales:**
- **Rol canonico definido:** Auditor Seguridad Estrategica Pre-Produccion (NO SOC runtime 24/7, NO Cloud Engineer operacional, NO Workflow Engineer, NO Legal Interpreter).
- **4 verbos exclusivos aplicados:** **AUDITAR / BLOQUEAR / ENMASCARAR / ESCALAR** con deslinde explicito de dominio por cada uno.
- **14 fronteras absolutas F1-F14** + tabla deslinde formal con 20+ agentes.
- **8 decisiones CEO D1-D8** cerradas y documentadas.
- **FASE D Defensa en Profundidad 5 Niveles** (estandar obligatorio industria Google CI/CD + Microsoft SDL + Netflix Full Cycle): D.1 Static Analysis (SAST) + D.2 Dependency Scan (SCA) + D.3 Secret Scanning + D.4 Malware/Virus Scan + D.5 Manual Security Review. Cada nivel con herramientas canonicas, comandos reales, criterios fallo, ejemplos PR pasa/falla, template dictamen.
- **FASE L Cobertura LLM completa** (habilitador del daemon Claude Code 24/7 futuro): L.1 Prompt Injection Detection + L.2 Jailbreak Detection + L.3 Runaway Cost Detection + L.4 Enmascaramiento credenciales LLM + L.5 Secretos en logs runtime + L.6 Output sanitization. Codigo Python canonico + Redis keyspace `sec:*`.
- **FASE M Modernizacion Seguridad 2026:** Zero Trust Architecture + Cloudflare Zero Trust + HashiCorp Vault/AWS Secrets Manager + GitHub Advanced Security (CodeQL/Dependabot/Secret Scanning) + Snyk Enterprise + Supply Chain Security (SBOM/SLSA/Sigstore).
- **FASE G Multi-idioma + Compliance regional**: 9 variantes canonicas Addendo (ES-MX, ES-CO, ES-AR, ES-ES, ES-US, EN-US, EN-GB, PT-BR, PT-PT) + 10 marcos compliance (GDPR/CCPA/LGPD/HIPAA/PCI-DSS/SOC2/CAN-SPAM/TCPA/FDUTPA/LFPDPPP) + data residency por jurisdiccion + breach notification por plazo legal + consent management por region.
- **FASE Z Limitaciones Honestas** con 4 categorias canonicas de escalacion humana: Credencial comprometida / Breach activo / Decision compliance / Sistema comprometido. Templates WhatsApp/Email. Taxonomia N1/N2/N3 con inventario detallado (80% / 15% / 5%).
- **25 Mandamientos canonicos reorganizados en 5 clusters**.
- **Protocolo Tripartita M.8** formalizado (#40 ↔ #25 ↔ #43) con trace_id canonico compartido en Redis keyspace `sec:*`, JSON handoff schema, 3 flujos canonicos documentados.
- **Referencias tecnicas normativas consolidadas**: OWASP Top 10 2021 + OWASP Top 10 for LLM 2024 + NIST CSF 2.0 + NIST AI RMF + CIS Controls v8 + CIS Benchmarks + MITRE ATT&CK Enterprise + CVSS v3.1/v4.0 + EPSS + CWE Top 25 + SLSA + compliance frameworks.
- **FASES 1-10 operacionales preservadas integras**: filosofia, inventario activos, checklist mensual, accesos clientes, respuesta incidentes, seguridad web clientes, compliance, herramientas, metricas, integracion ecosistema.
- **4 IDs operacionales hardcoded tokenizados** (AJUSTE EXTRA D2): AWS Account + Meta BM + Google MCC + Developer Token (este ultimo sanitizado pre-nivelacion commit 6afdba1).

**Commits asociados:**
- Sanitizacion token Google Ads pre-nivelacion: `6afdba1` (ver seccion 4 abajo)
- Nivelacion #40: `d618c16` (estado final)

---

## 4. SANITIZACION POLITICA CERO-SECRETOS

El 21 abril 2026 se ejecuto un **escaneo integral de secretos expuestos** en los 54 skills del sistema con patrones canonicos (AWS keys, Anthropic keys, Google API keys, GitHub PATs, JWT tokens, SSH private keys, database URLs con credenciales, Stripe keys, Meta access tokens, etc.).

### 4.1 Hallazgo critico

**Google Ads Developer Token** del MCC Addendo expuesto en **4 ocurrencias / 3 archivos**:

| Archivo | Linea | Contexto |
|---------|-------|----------|
| `seguridad.md` | L267 | Bloque Tier 1 cuentas criticas |
| `reportes.md` | L747 | Configuracion integracion Google Ads |
| `youtube-ads.md` | L9 | Metadata header del skill |
| `youtube-ads.md` | L1424 | Bloque YAML credential_name |

**Estado del token al momento del escaneo:** ya habia sido rotado el 20 abril 2026 (nuevo token pendiente instalacion por CEO), por lo que el valor expuesto era criptograficamente inerte. Sin embargo, el token seguia en el repo (incluyendo git history) como politica operacional inaceptable.

### 4.2 Sanitizacion ejecutada

**Commit:** `6afdba1`

Las 4 ocurrencias fueron reemplazadas por el placeholder canonico `{{GOOGLE_ADS_DEVELOPER_TOKEN}}` + nota documentando la rotacion y estado pendiente, replicando el patron ya aplicado en `google-ads.md` L15 y `agente-analytics.md` L31.

**Verificacion post-sanitizacion:** `grep "njnh3UyX0kvCjWRVmsG-Jg"` retorna **0 ocurrencias activas** en los 54 skills (las 2 menciones residuales son documentacion historica/pedagogica explicita dentro de FASE D.3 del skill #40 y CHANGELOG v1.1.0 — no son exposiciones operacionales).

### 4.3 Politica canonica establecida

**Principio 10.Y del sistema Addendo (nuevo — ver Seccion 10):** ningun skill del sistema Addendo puede contener credenciales reales. Usar placeholders `{{VARIABLE_NOMBRE}}` + nota documentacion + variables de entorno en `~/.bashrc` / AWS Secrets Manager / 1Password.

### 4.4 Deuda tecnica pendiente

**4 IDs operacionales hardcoded** (no son secretos tecnicos pero violan criterio D2 Universalidad del checklist World-Class):

| ID operacional | Placeholder canonico | Estado |
|----------------|---------------------|--------|
| AWS Account ID `632672560295` | `{{ADDENDO_AWS_ACCOUNT_ID}}` | Tokenizado en #40 (21 abril), pendiente en otros skills |
| Meta Business Manager ID `161783471681304` | `{{ADDENDO_META_BM_ID}}` | Tokenizado en #40 (21 abril), pendiente en otros skills |
| Google Ads MCC ID `424-957-3841` | `{{ADDENDO_GOOGLE_MCC_ID}}` | Tokenizado en #40 (21 abril), pendiente en 10 archivos |
| Cloudinary Cloud ID `dokzw376u` | `{{ADDENDO_CLOUDINARY_CLOUD_ID}}` | Pendiente |

**Programacion:** tokenizar IDs operacionales durante la nivelacion individual de cada skill restante (no justifica commit aparte — se aplica como parte del AJUSTE EXTRA D2 en cada nivelacion World-Class).

**1 placeholder aceptable detectado:** `const STRIPE_KEY = 'sk_live_xxx'` en `backend-dev.md` L292. Es ejemplo didactico dentro de seccion "Errores comunes" mostrando patron vulnerable a evitar. No requiere accion.

---

## 5. DECISIONES ARQUITECTONICAS

### 5.1 Decisiones cerradas 21 abril 2026 (vinculantes)

**D1. Rol canonico #25: Cloud Engineer Puro.**
Explicitamente NO DevOps (eso es #45 agente-deployment), NO Architect (futuro #56, pendiente creacion), NO SRE completo (requiere volumen cliente que no existe aun). #25 opera infraestructura viva + observabilidad tecnica + auto-reparacion de componentes infra + optimizacion costos.

**D2. Roadmap escalabilidad 4 hitos para #25.**
- Hito 1 (actual, 1-10 clientes): 1x EC2 t3.small monolitico, N8N single-process, Cloudflare Free, Redis single-node, ~$30-45/mes.
- Hito 2 (10-50 clientes): EC2 t3.large o t3a.xlarge, N8N queue mode con Redis dedicado, Cloudflare Pro, SLO formal 99.5%, ~$80-130/mes.
- Hito 3 (50-200 clientes): 2x EC2 ALB, Aurora Serverless v2, Redis cluster, multi-AZ, SLO 99.9%, ~$400-700/mes.
- Hito 4 (200-1,000 clientes): multi-region (us-east-1 + eu-west-1 + ap-southeast-1), EKS, service mesh, SLO 99.95%, ~$3-7k/mes.

**D3. Agentes futuros condicionales a hito de escalabilidad.**
- **#55 DevOps Engineer**: crear cuando Addendo entre a Hito 2 (10-50 clientes) — actualmente #45 cubre CI/CD suficiente.
- **#56 Cloud Architect**: crear cuando Addendo entre a Hito 3 (50-200 clientes) — se necesitara diseño multi-cloud y migraciones.
- Hasta entonces, #25 absorbe responsabilidades limitadas dentro de sus 4 verbos.

**D4. Rol canonico #40: Auditor Seguridad Estrategica Pre-Produccion.**
NO opera seguridad runtime 24/7 (eso es #43 agente-monitor, ver cuestionamiento Seccion 6). NO hace seguridad operacional del servidor (eso es #25 con UFW/fail2ban/SSH hardening/patches). NO interpreta marco legal (eso es #52 agente-legal). Enfoque: auditoria estrategica + enmascaramiento credenciales + cobertura LLM completa para daemon futuro.

**D5. Defensa en Profundidad 5 Niveles es estandar obligatorio no-negociable.**
Todo codigo/workflow/prompt que va a produccion pasa los 5 niveles (Static Analysis + Dependency Scan + Secret Scanning + Malware Scan + Manual Review). Ventana excepcional solo por CEO con compensacion documentada. Alinea Addendo con pipelines CI/CD de Google, Microsoft, Netflix.

**D6. Cobertura LLM completa en #40 es requisito pre-daemon Claude Code.**
Ningun agente llega a daemon productivo sin pasar FASE L (L.1 prompt injection + L.2 jailbreak + L.3 runaway cost + L.4 enmascaramiento credenciales + L.5 secretos logs + L.6 output sanitization). El skill #40 v1.1.0 cumple este pre-requisito documentalmente; validacion empirica en carga real del daemon queda pendiente cuando CEO autorice activacion.

**D7. Politica cero-secretos en skills del sistema Addendo.**
Aprendizaje directo de la sanitizacion `6afdba1`. Ningun archivo `.md` del directorio `.claude/agents/skills-globales/` puede contener credenciales activas. Politica auditada por #40 mensual + escaneo continuo por patrones canonicos.

**D8. Protocolo Tripartita #40 ↔ #25 ↔ #43 con trace_id compartido en Redis.**
Formalizado en skill #40 seccion M.8. Keyspace `sec:*` exclusivo de #40, deslinde con `cb:*` de #50 y `metric:*` de #25. 3 flujos canonicos (runtime threat / rotacion emergencia / codigo requiere config infra). JSON handoff schema + deadline ack. **Condicional:** la implementacion completa del protocolo depende del destino arquitectonico de #43 (D9 aplazada — resuelta en D13-D15 el 22 abril).

### 5.2 Decisiones aplazadas a 22 abril 2026 — RESUELTAS

**D9. Destino arquitectonico de #43 agente-monitor → RESUELTA por D14 (Opcion C).**
Se adopta la **Opcion C**: convertir #43 en workflow N8N centralizado (no agente IA). Ver D14 abajo.

**D10. Incident Commander formal → pendiente.**
No resuelta en esta sesion. Queda abierta para analisis futuro independiente del destino de #43.

**D11. Comunicacion proactiva al cliente sobre incidentes → pendiente.**
No resuelta en esta sesion. Se analizara junto con la nivelacion de #3 director-cuenta y #44 agente-pqr.

**D12. Handoff formal #43 → #40 en amenazas runtime security → RESUELTA por D14.**
El handoff cambia de receptor: ya no es agente IA, es workflow N8N correlacionador. Los agentes expertos (#40, #25, #42, etc.) enviaran alertas via webhook al workflow, que correlaciona y enruta.

### 5.3 Decisiones cerradas 22 abril 2026 mañana (vinculantes)

**D13. Filosofia B adoptada como principio arquitectonico permanente de Addendo.**
Addendo adopta Filosofia B — **Herramienta Correcta segun Problema** — como principio fundacional del sistema. Regla:
- ¿Requiere inferencia (comprension lenguaje natural, creatividad, juicio contextual)? → **Agente IA**
- ¿Es logica deterministica (reglas booleanas, umbrales numericos, ruteo)? → **Workflow N8N**
- ¿Caso ambiguo? → default a **Workflow N8N** (mas barato + predecible); promover a agente solo con evidencia empirica

Aplica a TODAS las decisiones futuras sobre crear agente IA vs workflow N8N. Ver Seccion 7.5 completa para principio detallado + justificacion economica.

**D14. #43 se migrara a workflow N8N centralizado (no agente IA).**
Consecuencia directa de D13. Rol del workflow correlacionador:
- NO monitorea directamente ningun dominio (cada monitor experto lo hace en su dominio)
- RECIBE alertas que los monitores expertos envian via webhook
- CORRELACIONA señales cross-dominio con reglas deterministicas
- ENRUTA alertas al canal correcto (CEO directo, #4 incident commander, etc.)
- DEDUPLICA para no saturar al CEO

Diseño completo pendiente para sesion dedicada futura (no ejecutada hoy).

**D15. Skill #43 actual se archiva como referencia historica.**
`agente-monitor.md` v1.0 (1,946 lineas, 18 abril 2026) se mueve a `.claude/agents/archived/agente-monitor-v1.0-deprecated-2026-04-22.md`. NO se elimina — se preserva para contexto pero deja de ser skill activo del sistema. Nota DEPRECATED agregada al inicio del archivo.

---

## 6. CUESTIONAMIENTO CRITICO DE #43 AGENTE-MONITOR

Durante la sesion del 21 abril 2026, el CEO cuestiono profesionalmente si el agente #43 debe existir o no en el sistema. Este cuestionamiento surgio organicamente al auditar los deslindes de #25 y #40 y detectar posible solapamiento destructivo.

### 6.1 Declaracion original (Documento Maestro v1.x)

El Documento Maestro original declaraba a #43 como "Vigilante 24/7 que detecta y auto-repara anomalias". Esta definicion era amplia y sin fronteras formales, lo que en la practica significaba que #43 podia absorber trabajo de agentes especializados existentes.

### 6.2 Analisis honesto de solapamientos

Al mapear la "observabilidad" real del sistema contra los agentes ya establecidos:

| Dominio de observabilidad | Agente que ya lo cubre |
|---------------------------|------------------------|
| Infraestructura (uptime, CPU, RAM, disco, red) | **#25 servidor-cloud** via verbo OBSERVAR |
| Seguridad (vulnerabilidades, credenciales, compliance) | **#40 seguridad** via verbo AUDITAR |
| Analytics de sitio (trafico, conversion, bounce) | **#42 agente-analytics** |
| Campañas publicitarias (CPA, ROAS, impresiones) | **#11 meta-ads**, **#12 google-ads**, **#13 tiktok-ads**, **#14 linkedin-ads** |
| Reputacion online (menciones, reviews, sentiment) | **#34 agente-reputacion** |
| Workflows N8N (estado, failures, circuit breakers) | **#50 agente-constructor-workflows** via verbo AUTORREPARAR-WORKFLOWS |

**Conclusion del analisis:** no hay un solo dominio de "observabilidad" que sea exclusivo de #43. Todo lo que #43 podria observar ya tiene un agente dueño que lo observa con mayor profundidad de dominio.

### 6.3 Valor diferencial posible de #43

Si #43 se mantiene, su valor diferencial seria:

1. **Correlacion cross-dominio:** detectar patrones que ningun agente individual ve (ej: "caida de trafico + spike de costo IA + alerta seguridad runtime = posible ataque coordinado").
2. **Router unificado de alertas al CEO:** evitar que CEO reciba 5 alertas descoordinadas de 5 agentes distintos.
3. **Deteccion de patrones sistemicos no-obvios:** anomalias que requieren vista holistica.

### 6.4 Riesgo si se mantiene mal diseñado

1. **Mega-agente que mezcla dominios** (violacion de Unix philosophy — "do one thing well").
2. **Duplicacion de trabajo** con expertos existentes (#25, #40, #42, campañas).
3. **Autoridad ejecutiva sobre dominios ajenos** (ej: pausar campañas publicitarias es trabajo de #11, no de #43).
4. **Single point of failure** en observabilidad — si #43 falla, todo el sistema queda ciego.

### 6.5 Decision CEO: resuelta el 22 abril 2026 (Opcion C + archivo skill antiguo)

Tras el aplazamiento del 21 abril, el CEO resolvio el 22 abril adoptar la **Opcion C** (convertir #43 en workflow N8N centralizado). Ver decisiones D13-D15 de la Seccion 5.3 y el principio arquitectonico completo en Seccion 7.5.

**Las 3 funciones de correlacion + router + deduplicacion** que justificaban un "monitor central" se implementaran como workflow N8N deterministico, NO como agente IA. Los dominios especificos quedan cubiertos por los expertos que ya los cubren (monitoreo distribuido, ver Seccion 7.5).

---

## 7. TERCERA OLA DE NIVELACION — ESTADO

| # | Agente | Estado | Detalle |
|---|--------|--------|---------|
| #27 | seo | **Completado** | Auto-evaluado PERFECTO PURO (commit `65e6c16`) |
| #4 | project-manager | **Completado** | Auto-evaluado PERFECTO PURO (commit `976e986`) |
| #50 | agente-constructor-workflows | **Completado + validado empiricamente** | PERFECTO PURO verificable v1.1.1 (commit `fd553ed`), primer uso real en workflow `TEST-50-prueba-haiku-saludo` exitoso |
| #25 | servidor-cloud | **Completado + auditoria objetiva** | PERFECTO PURO verificable v1.1.0 (commit `5cc0f97`) |
| #40 | seguridad | **Completado + auditoria objetiva** | PERFECTO PURO verificable v1.1.0 (commit `d618c16`) |
| #3 | director-cuenta | Pendiente | Tercera ola, sesion futura |
| #39 | revisor-qa | Pendiente | Tercera ola, sesion futura |
| #43 | agente-monitor | **ARCHIVADO — migrado a workflow N8N per D14 y D15 (22 abril)** | Skill v1.0 movido a `.claude/agents/archived/`. Diseño workflow N8N correlacionador pendiente en sesion dedicada. |

**Cambio de ritmo respecto a v2.3:** ahora cada nivelacion incluye auditoria objetiva post-hoc (patron "Trust but Verify") antes de declarar PERFECTO PURO. Esto añade ~20-30 min por agente pero previene auto-engaño.

---

## 7.5 FILOSOFIA ARQUITECTONICA ADDENDO (NUEVA — 22 ABRIL 2026 mañana)

### Principio fundacional adoptado

Addendo adopta la **Filosofia B — Herramienta Correcta segun Problema** como principio arquitectonico permanente del sistema.

**Regla de decision:**
- ¿Requiere inferencia (comprension de lenguaje natural, creatividad, juicio contextual)? → **Agente IA**
- ¿Es logica deterministica (reglas booleanas, umbrales numericos, ruteo)? → **Workflow N8N**
- ¿Caso ambiguo? → Default a **Workflow N8N** (mas barato + predecible); promover a agente solo con evidencia empirica

### Arquitectura de Monitoreo Distribuido

**Consecuencia directa de Filosofia B:** Addendo NO tiene un "monitor central" tipo agente IA. El monitoreo es distribuido entre expertos de dominio:

| Dominio | Monitor responsable |
|---|---|
| Infraestructura (servidor, PM2, N8N, nginx, Cloudflare, DNS, SSL) | #25 servidor-cloud (verbo OBSERVAR) |
| Seguridad estrategica (codigo, CVE, compliance, credenciales) | #40 seguridad (verbo AUDITAR) |
| Campañas Meta | #11 meta-ads |
| Campañas Google | #12 google-ads |
| Analytics + tracking | #42 agente-analytics |
| SEO | #27 seo |
| Reputacion (reseñas) | #34 agente-reputacion |
| Uptime externo | UptimeRobot (herramienta externa) |
| Quejas cliente post-incidente | #44 agente-pqr |

**Workflow N8N correlacionador central (pendiente diseño):**
- NO monitorea directamente ningun dominio
- RECIBE alertas que los monitores expertos envian via webhook
- CORRELACIONA señales cross-dominio con reglas deterministicas
- ENRUTA alertas al canal correcto (CEO directo, #4 incident commander, etc.)
- DEDUPLICA para no saturar al CEO

### Aplicaciones de Filosofia B al resto del sistema

Queda pendiente auditoria de agentes existentes contra Filosofia B. Candidatos que podrian migrar de agente a workflow:

- Agentes que hacen solo schedule + trigger → workflow
- Agentes que rutean datos sin inferencia → workflow
- Agentes con logica puramente booleana → workflow

Esta auditoria NO se ejecuta hoy — se programa cuando llegue momento oportuno.

### Principio operativo 10.W (nuevo) — Filosofia B

"Usa agente IA donde la inferencia aporte valor real. Usa workflow N8N donde las reglas son suficientes. El costo operacional, la predictibilidad y el mantenimiento favorecen workflows para problemas deterministicos."

Justificacion economica verificable a 1000 clientes:
- Filosofia A (todo agente IA): ~$200-500K/año en LLM
- Filosofia B (selectiva): ~$50-100K/año en LLM
- Ahorro: $100-400K/año reinvertible en negocio

---

## 7.6 INFRAESTRUCTURA DAEMON CLAUDE CODE — DIAGNOSTICO 22 ABRIL 2026 (NUEVA)

### Estado verificado empiricamente

| Componente | Estado | Detalle |
|---|---|---|
| Claude Code CLI en AWS | ✅ Instalado | `/usr/bin/claude` v2.1.101 |
| `ANTHROPIC_API_KEY` | ✅ Presente | 108 chars (rango normal `sk-ant-api03-...`) |
| `REDIS_PASSWORD` | ✅ Presente | 24 chars |
| `N8N_API_KEY` | ✅ Presente | 267 chars (JWT n8n) |
| Test no-interactivo | ✅ Validado empiricamente | $0.0064 USD · 921ms API time · modelo `claude-haiku-4-5-20251001` · cache creation 4,937 tokens |

### Workflows N8N — 8 activos

**5 usan Claude via API HTTP directa:**
- `Addendo — Investigacion Manual Prospecto`
- `Addendo — Blog Automatico Don Jacinto Nahual`
- `Addendo — Inteligencia de Mercado Semanal`
- `EJEMPLO-invocacion-claude-haiku-skill50`
- `Addendo — Blog Automatico Addendo Lunes y Jueves`

**3 sin Claude:**
- `Addendo Pulse — Alertas`
- `Addendo Pulse — Simulacion Completa`
- `EJEMPLO-n8n-redis-end-to-end`

**0 workflows usan Claude Code CLI con skills como system_prompt.**

### GAP CRITICO IDENTIFICADO

Los workflows de produccion (Blog Don Jacinto, Blog Addendo, Inteligencia Mercado, Investigacion Prospecto) **llaman a Claude API via HTTP directa con prompts monoliticos hardcoded**. NO cargan skills del filesystem. Es **bypass funcional del Agency OS** — los 53 agentes nivelados NO participan en ejecucion real.

**Evidencia empirica (workflow Blog Don Jacinto):**
- 15 nodos, 1 solo llama a Claude (tipo `httpRequest` → `api.anthropic.com/v1/messages`)
- Modelo: `claude-sonnet-4-6`, max_tokens: 12000
- Mensaje: `[{role:"user", content:"<prompt monolitico embebido>"}]`
- **Campo `system` ausente** (no hay system_prompt con skill cargado)
- **Cero referencias a archivos `.md` del filesystem** ni al CLI `claude -p`
- Todo el conocimiento de dominio (estrategia SEO + tono + geografia + perfil cliente + prohibiciones legales) esta **duplicado en el JSON del workflow**, no en un skill canonico reutilizable

### Implicacion estrategica

El valor del Agency OS (skills nivelados + Interpretacion C + fronteras absolutas) **queda sin materializar** hasta cerrar este gap. Los 22 skills PERFECTOS PUROS no son accedidos por ningun workflow de produccion. La nivelacion es actualmente un **activo latente, no operativo**.

**Prioridad:** alta en proximas sesiones. Pendiente decision sobre:
1. Quien es el responsable de la migracion (candidato: ampliacion de #50 agente-constructor-workflows, o nuevo workflow ejemplar que otros copien).
2. Orden de migracion (cual workflow primero: Blog Don Jacinto como piloto mas controlado vs Investigacion Prospecto por mayor frecuencia vs crear uno nuevo como greenfield).
3. Patron canonico de integracion: `Execute Command` N8N node con `claude -p ... --bare --system @skill.md --max-budget-usd X`.

---

## 8. CLIENTES ACTIVOS

| Cliente | Estado |
|---------|--------|
| Don Jacinto Nahual | **LIVE** — donjacintonahual.com, blog automatico funcionando, 11 articulos publicados, GA4 + Search Console + BlogPosting schema activos (ver Seccion 8.1) |
| Neurokids | PENDIENTE onboarding |
| Bebe Genial | PENDIENTE onboarding |
| CreditBridge | PENDIENTE onboarding |

---

## 8.1 PRODUCCION DON JACINTO NAHUAL — CIERRE 22 ABRIL 2026 tarde (NUEVA)

### 8.1.1 Analisis SEO tecnico completo

- **Sitio:** apex `donjacintonahual.com` → 307 redirect a `www.donjacintonahual.com` (200 OK)
- **Hosting:** Vercel edge, Astro v6.1.5
- **Robots.txt:** `User-agent: * / Allow: /` ✅ (declara sitemap en apex)
- **Sitemap-index.xml:** 45 URLs indexables
- **Cobertura de URLs:**
  - 1 home
  - 1 aviso-legal
  - 1 blog index (`/blog/`)
  - 11 articulos blog
  - 27 landings de ciudad (`/ciudad/*`)
  - 4 paginas de servicio (`/servicio/*`)

**Inconsistencia sutil detectada (no critica):** robots.txt y sitemap declaran URLs apex (sin www) pero el sitio se sirve en www. Cada fetch inicial cuesta un 307 extra. Decision arquitectonica DNS/Vercel queda abierta para sesion futura (Opcion A canonico=apex vs Opcion B canonico=www).

### 8.1.2 Google Analytics 4 — ACTIVADO

| Campo | Valor |
|---|---|
| Propiedad | "Don Jacinto Nahual" |
| Cuenta | Addendo Growth Partner (389432957) |
| Property ID | 534067923 |
| Stream ID | 14411697218 |
| Measurement ID | `G-S0TWXE71XF` |
| Instalacion | `src/layouts/Layout.astro` con `<script is:inline>` |
| Commit produccion (repo don-jacinto-nahual) | `fabca3a` |
| Validacion empirica | 1 usuario activo confirmado en Realtime desde navegador incognito |

### 8.1.3 Google Search Console — CONFIGURADO

| Campo | Valor |
|---|---|
| Propiedad | `https://www.donjacintonahual.com/` (prefijo URL) |
| Cuenta | admin@addendo.io |
| Verificacion | automatica (via meta tag HTML + GA4) |
| Sitemap enviado | `sitemap-index.xml` — estado: Correcto (2do intento) |

### 8.1.4 Vinculacion GA4 ↔ Search Console — COMPLETADA

- Flujo web: Don Jacinto Nahual
- Propiedad SC vinculada: `https://www.donjacintonahual.com/`
- Datos SEO apareceran en GA4 en 24-48 horas

### 8.1.5 Schema BlogPosting — IMPLEMENTADO en los 11 blogs

- **Archivo:** `src/layouts/BlogPostLayout.astro`
- **Metodo:** inyeccion via Astro + `@id` referencias a Person y LocalBusiness ya existentes en Layout padre (sin duplicacion de datos)
- **Helper** `toISODate()` **con 3 formatos:**
  1. ISO directo `"2026-04-21"` → `"2026-04-21T00:00:00-07:00"`
  2. Legacy español `"Enero 2026"` → `"2026-01-01T00:00:00-07:00"`
  3. Fallback `undefined` (JSON.stringify omite la key antes que emitir valor invalido)
- **TZ:** Los Angeles `-07:00` (PDT)
- **Campos emitidos:** `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (con `@id` + `url`), `publisher`, `mainEntityOfPage`, `articleSection`, `inLanguage: "es"`
- **Commit inicial:** `64929f7` — schema agregado
- **Commit fix warnings:** `be6006d` — TZ -07:00 + author.url
- **Validacion Google Rich Results Test:** 3 elementos validos detectados (Articulos + LocalBusiness + Organizacion), **0 warnings**

### 8.1.6 Resultado SEO Don Jacinto

| Metrica | Pre (v2.5) | Post (v2.6) | Delta |
|---|---:|---:|---:|
| Score promedio 11 blogs | 7.9/10 | **~9.5/10** | +1.6 |
| Warnings Google Rich Results | 5 | **0** | -5 |
| Elegibilidad Google Discover | — | ✅ todos | + |
| Elegibilidad rich cards SERP | — | ✅ todos | + |
| GA4 activo | ❌ | ✅ | + |
| Search Console vinculado | ❌ | ✅ | + |
| Schema BlogPosting | ❌ (0/11) | ✅ (11/11) | + |

---

## 9. INTEGRACIONES Y STACK (estado al 22 abril 2026)

### 9.1 Redis 7.0.15 — memoria operacional del sistema

Instalado el 20 abril en AWS EC2. Keyspace canonico ya definido y deslindado entre agentes:

| Prefijo | Dueño | Proposito |
|---------|-------|-----------|
| `cb:{workflow_id}:*` | #50 | Circuit breakers de workflows N8N |
| `rate:{api_name}:{window}` | #50 | Rate limiters APIs externas |
| `metric:infra:{component}:*` | #25 | Metricas infra en cache |
| `cb:infra:*` | #25 | Circuit breakers infra (PM2, Redis, disco) |
| `alert:cooldown:{alert_id}` | workflow N8N correlacionador (per D14) | Anti-spam de alertas |
| `sec:mask:{key_type}:*` | #40 | Enmascaramiento secretos |
| `sec:injection:{trace_id}` | #40 | Prompt injection detectado |
| `sec:cost:{client_id}:*` | #40 coord #25 | Runaway cost detection |
| `sec:incident:{trace_id}:*` | #40 + #25 + workflow correlacionador (per D14) | Estado incidente cross-agent |

### 9.2 Claude Code headless 24/7 — preparacion

Servidor AWS preparado (~21 abril) para ejecutar agentes Claude Code en modo no-interactivo via cron jobs y eventos N8N. Patron canonico documentado en skill #25 seccion M.3: wrapper `bash -ic` obligatorio + flags `--bare --max-budget-usd --allowed-tools --no-session`.

**Pre-requisito pendiente:** activacion del daemon productivo requiere autorizacion CEO + validacion empirica de FASE L del skill #40 en carga real.

**Estado al 22 abril tarde:** daemon **operacional en infraestructura pero NO integrado en ningun workflow de produccion** (ver Seccion 7.6 gap critico).

---

## 9.5 DECISIONES ARQUITECTONICAS MAYORES POSTPUESTAS — 22 ABRIL 2026 tarde (NUEVA)

### D16 — Sistema de Memoria Unificada por Cliente (POSTPUESTO)

**VISION:** Sistema completo nivel "agencia Dios" donde cada cliente tiene memoria persistente accesible por agentes, CEO, y el cliente mismo.

**ALCANCE — 3 capas de memoria:**

- **Tipo A — Memoria operacional para agentes IA:** cuando cualquier agente (#11, #27, #40, etc.) trabaja para cliente X, **carga automaticamente su contexto** (industria, buyer persona, estrategia, campañas activas, historico, tono de voz, restricciones).
- **Tipo B — Memoria consultable para CEO:** Jose puede preguntar en lenguaje natural "¿como va el cliente X?" y recibe respuesta con estado actualizado, historico, proximos pasos.
- **Tipo C — Memoria viva (infraestructura tecnica):** Redis + archivos Markdown versionados + N8N workflows que sincronizan ambos.

**PIEZAS REQUERIDAS:**

1. **Almacenamiento unico** (fuente de verdad) — evita desincronizacion
2. **Estructura estandar por cliente** — esqueleto replicable
3. **Automatizacion de actualizacion** — cada agente escribe al finalizar trabajo
4. **Lectura automatica por agentes** — cargar contexto al iniciar tarea
5. **Interfaz de consulta para CEO** — chat natural
6. **Sincronizacion 24/7** — workflows N8N + Redis

**PRE-REQUISITO CRITICO:**
Los 54 agentes deben estar **nivelados a World-Class antes de construir memoria encima**. Construir memoria sobre agentes inmaduros requiere rehacer trabajo cuando los agentes maduren.

**Estado actual:** 20/54 agentes nivelados (37%). Falta 34 agentes.

**MOMENTO DE ARRANQUE:** cuando la tercera ola de nivelacion este completa.

**BENEFICIO ESPERADO:** los agentes aprenderan de **datos reales de clientes, no de suposiciones**. Auto-mejora continua con cada interaccion.

**COSTO ESTIMADO DE IMPLEMENTACION:** 2-3 semanas bien hechas (vs 1 semana mal hecha).

**80% DE PIEZAS TECNICAS YA EXISTEN:**
- ✅ Redis (instalado 20 abril)
- ✅ N8N (8 workflows activos)
- ✅ GitHub (versionado)
- ✅ Claude Code CLI (validado empiricamente 22 abril)
- ⏳ 53 agentes (20 nivelados, 34 pendientes)

---

### D17 — Dashboard Cliente-Facing (POSTPUESTO)

**VISION:** Dashboard web donde cada cliente puede ver **en tiempo real**:
- Estado de sus campañas (Meta, Google, TikTok, LinkedIn)
- Ventas generadas (con attribution)
- Leads recibidos
- KPIs del mes vs mes anterior
- Trabajo que ha hecho Addendo en la ultima semana
- Historico de reuniones, entregables, decisiones
- SEO rankings
- Trafico del sitio web

**VALOR ESTRATEGICO:**
- **Transparencia total con el cliente** (diferenciador vs competencia)
- **Reduce friccion** de reporting mensual
- **Aumenta confianza y retencion**
- **Aumenta ticket promedio** (valor percibido)
- Posible **upsell a tiers premium** con data exclusiva

**PRE-REQUISITO:** D16 debe estar funcionando (el dashboard lee de la memoria unificada).

**STACK TECNICO PROBABLE** (a decidir cuando arranque):
- Frontend: Next.js o Astro + React
- Auth: por cliente con credenciales
- Data: Redis + archivos Markdown + APIs externas (Meta/Google/TikTok)
- Integracion: N8N workflows que sincronizan data al dashboard

**MOMENTO DE ARRANQUE:** despues de D16 funcionando y validado con 2-3 clientes reales.

**ALINEACION CON FILOSOFIA B (D13):**
- Dashboard es **UI, no agente IA**
- Data viva gestionada por **workflows N8N**
- Coherente con "herramienta correcta para el problema"

---

### Honestidad editorial sobre D16 y D17

D16 y D17 son **VISION documentada**, NO implementacion. Ambas estan explicitamente **postpuestas** hasta completar nivelacion de agentes. El valor de documentarlas ahora:

1. **Evita drift de vision:** futuras decisiones arquitectonicas se alinean a esta hoja de ruta sin necesidad de re-pensarla.
2. **Define dependencias:** D17 requiere D16 que requiere nivelacion completa. Nadie arranca D17 antes.
3. **Cierra la ventana Filosofia B:** D16 (Tipo C) y D17 son UI/workflows, no agentes IA adicionales — coherente con D13.
4. **Previene sobre-ingenieria ahora:** al tener la vision clara, no se construyen piezas intermedias ad-hoc que habra que rehacer.

---

## 10. PRINCIPIOS OPERATIVOS DEL SISTEMA

### Principios heredados de v2.3 (preservar)
1. Español siempre — Jose no es tecnico.
2. Nunca inventar datos, hechos ni resultados.
3. Siempre leer el skill del agente antes de ejecutar cualquier tarea.
4. Siempre continuar desde donde se quedo la ultima sesion.
5. Cuando CEO da orden, identificar que agente o agentes deben ejecutarla.
6. Nunca ejecutar una tarea sin el skill correspondiente cargado.
7. Si una tarea requiere multiples agentes, activarlos en el orden correcto.
8. Interpretacion C (Orquestacion con Fronteras Absolutas): cada agente World-Class tiene verbos exclusivos + fronteras absolutas + artefactos viajan directo.
9. Honestidad operacional: distinguir "diseñado en skill" (N1/N2/N3) vs "validado empiricamente en produccion".

### Principios nuevos (21 abril 2026)

**10.10 Trust but Verify (nuevo).**
Post-nivelacion de cada PERFECTO PURO, ejecutar verificacion objetiva que:
- Confirma que los verbos exclusivos aplicados son los que el CEO acordo (no sustituciones silenciosas).
- Confirma preservacion de fortalezas originales del skill v1.0.
- Confirma profundidad real (no superficialidad que pasa checklist).
- Confirma deslindes con otros agentes nivelados (no violaciones de fronteras cross-skill).

Aplicado exitosamente el 21 abril en **#25** (detecto divergencia de verbos propuesta CEO vs aplicados, resuelto con addendum `5cc0f97`) y en **#40** (confirmo limpieza sin hallazgos, aprobado directo).

**10.11 Politica Cero-Secretos en Skills (nuevo).**
Ningun skill del sistema Addendo Agency OS puede contener credenciales reales.
- Usar placeholders canonicos `{{VARIABLE_NOMBRE}}` + nota documentacion + variables de entorno.
- Escaneo periodico con regex patterns de secretos conocidos (AWS keys, Anthropic, Google, GitHub, Stripe, Meta, Twilio, JWT, SSH keys, database URLs).
- Auditor responsable: #40 seguridad, mensual.
- Fundador del principio: sanitizacion `6afdba1` del 21 abril.

**10.12 Evolutionary Architecture (nuevo).**
Construir para hoy + 12 meses, NO para hoy + 5 anos.
- Documentar hitos futuros en roadmap (skills tienen seccion Roadmap Escalabilidad con 4 hitos).
- NO implementar hitos futuros hoy — sobre-ingenieria quema capex sin ROI.
- Cada hito activa re-evaluacion arquitectonica + posible creacion de agentes nuevos (#55 DevOps, #56 Cloud Architect condicionales por D3).
- Regla de oro: "la mejor arquitectura es la mas simple que sostiene el volumen actual con 2x de margen".

### Principio nuevo (22 abril 2026)

**10.W Filosofia B — Herramienta Correcta segun Problema (nuevo).**
"Usa agente IA donde la inferencia aporte valor real. Usa workflow N8N donde las reglas son suficientes. El costo operacional, la predictibilidad y el mantenimiento favorecen workflows para problemas deterministicos." Ver Seccion 7.5 completa + decisiones D13-D15.

---

## 11. PROXIMOS PASOS INMEDIATOS

### 23 abril 2026 y posteriores

1. **Considerar migracion primer workflow a Claude Code CLI + skill system_prompt** (caso piloto: Blog Don Jacinto como prueba de integracion daemon ↔ Agency OS). Cierra gap critico identificado en Seccion 7.6.
2. **Continuar tercera ola** con #3 director-cuenta y #39 revisor-qa.
3. **Decidir P1 Don Jacinto:** reescribir los 3 blogs legacy (`que-es-una-limpia-espiritual`, `senales-espirituales-relacion`, `tradicion-curanderil-catemaco`) con workflow Claude (contenido 2,300+ palabras) o archivar con 301 a sus equivalentes fechados.
4. **Arrancar produccion Bebe Genial** (primer cliente nuevo con stack maduro: GA4 + SC + BlogPosting schema desde el dia 1).
5. **D16 queda en backlog** hasta completar nivelacion de agentes (34 skills v1.0 pendientes).
6. **D17 queda en backlog** hasta D16 implementado y validado con 2-3 clientes reales.
7. **Diseñar workflow N8N correlacionador central** (consecuencia D14, cuando haya tiempo arquitectonico).

### 11.2 Decisiones aun abiertas

- **D10** Incident Commander formal — pendiente analisis independiente.
- **D11** Comunicacion proactiva al cliente sobre incidentes — pendiente, se analizara junto con nivelacion de #3 y #44.
- **Decision canonico DNS Don Jacinto** (Opcion A apex vs Opcion B www) — pendiente, no bloqueante.

---

## 12. ESTADO FINAL SINCRONIZACION 3 CAPAS

### Al cierre del 21 abril 2026

| Capa | Hash commit |
|------|-------------|
| Mac (desarrollo) | `104109d` |
| GitHub (origen) | `104109d` |
| AWS EC2 (produccion) | `104109d` |

### Al arranque del 22 abril 2026 mañana

3 capas sincronizadas en `104109d` (Doc Maestro v2.4 + nivelaciones dia 21).

### Commits del dia 22 abril 2026 (repo addendo-website)

1. `c056886` — arch: adoptar Filosofia B + archivar skill #43 agente-monitor (D13, D14, D15 — mañana)
2. `[PROXIMO — este documento]` — docs: actualizar Doc Maestro v2.5 → v2.6 (tarde)

### Commits del dia 22 abril 2026 (repo don-jacinto-nahual)

1. `fabca3a` — feat(analytics): activar GA4 con ID real `G-S0TWXE71XF`
2. `64929f7` — seo: agregar schema BlogPosting en BlogPostLayout
3. `be6006d` — seo: arreglar 5 warnings Rich Results en schema BlogPosting (estado final)

### Commits del dia 21 abril 2026 (cronologico)

1. `2eb431f` — feat: nivelar agente #25 servidor-cloud a World-Class v1.1 (primera pasada)
2. `5cc0f97` — docs(skill-25): addendum trazabilidad divergencia verbos exclusivos (post Trust but Verify)
3. `6afdba1` — sec: sanitize exposed Google Ads Developer Token across 3 skills (rotated 20 abril)
4. `d618c16` — feat: nivelar agente #40 seguridad a World-Class v1.1
5. `104109d` — docs: actualizar Documento Maestro a v2.4

---

## 13. MEMORIA DEL SISTEMA

### 13.1 Commits clave del 21 abril 2026

- `2eb431f` — #25 servidor-cloud v1.1.0 (primera pasada)
- `5cc0f97` — #25 addendum trazabilidad verbos (estado final #25)
- `6afdba1` — sanitizacion Developer Token Google Ads (3 archivos)
- `d618c16` — #40 seguridad v1.1.0 (estado final #40)
- `104109d` — Documento Maestro v2.4

### 13.2 Commits clave del 22 abril 2026

**Repo addendo-website:**
- `c056886` — Filosofia B + archivo skill #43 (mañana)
- `[este commit]` — Doc Maestro v2.6 (tarde)

**Repo don-jacinto-nahual:**
- `fabca3a` — GA4 activado `G-S0TWXE71XF`
- `64929f7` — Schema BlogPosting agregado
- `be6006d` — Fix warnings Rich Results

### 13.3 Estado skills al 22 abril 2026

- **53 skills activos** (tras archivo de #43 skill v1.0 per D15)
- **1 skill archivado** (`.claude/agents/archived/agente-monitor-v1.0-deprecated-2026-04-22.md`)
- **3 PERFECTOS PUROS verificables:** #50 (6,123 lineas) + #25 (3,061 lineas) + #40 (3,584 lineas)
- **7 PERFECTOS PUROS auto-evaluados** pendientes verificacion objetiva: #4, #11, #12, #15, #21, #27, #42
- **Total skills nivelados World-Class v1.1:** 22 / 53 activos (41.5%)

### 13.4 Decisiones cerradas 22 abril 2026

**Mañana (vinculantes):**
- **D13** — Filosofia B adoptada como principio arquitectonico permanente
- **D14** — #43 se migrara a workflow N8N centralizado
- **D15** — Skill #43 v1.0 archivado

**Tarde (vision documentada, postpuesta):**
- **D16** — Sistema de Memoria Unificada por Cliente (3 capas: A operacional, B consultable CEO, C infra)
- **D17** — Dashboard Cliente-Facing (depende de D16)

### 13.5 Decisiones aun aplazadas

- **D10** — Incident Commander formal
- **D11** — Comunicacion proactiva cliente incidentes
- **DNS Don Jacinto** — Opcion A apex vs B www canonico

### 13.6 Aprendizajes operacionales del 21 abril

1. **Auditoria objetiva (Trust but Verify) detecto un gap real** en #25 que no habria sido visible en auto-evaluacion: divergencia de verbos vs propuesta original CEO. El addendum `5cc0f97` resolvio con trazabilidad explicita. Este patron justifica añadir auditoria objetiva como paso estandar post-nivelacion de ahora en adelante.

2. **Sanitizacion integral reveo riesgo sistemico:** un secret puede replicarse en multiples skills sin deteccion hasta que se ejecuta un escaneo deliberado. La politica cero-secretos + escaneo periodico previene recurrencia.

3. **Cuestionamiento honesto del rol de #43** es **evidencia de madurez arquitectonica**, no de indecision. Es preferible aplazar 24h y decidir bien que nivelar por inercia y quemar tokens en un agente que terminara eliminado o refactorizado a workflow.

4. **Interpretacion C (Orquestacion con Fronteras Absolutas)** se consolida como **patron canonico del sistema**. Aplicado consistentemente en #50, #25, #40 — los 3 PERFECTO PURO verificables. Los 4 verbos exclusivos + 14 fronteras + tabla deslinde formal es el template repetible.

5. **Redis como memoria operacional compartida** demuestra valor arquitectonico real: el keyspace `sec:*` de #40 habilita la Protocolo Tripartita M.8, algo que no seria posible sin state compartido entre agentes.

### 13.7 Aprendizaje fundacional del 22 abril mañana

6. **Filosofia B (herramienta correcta segun problema) es el principio que previene sobre-ingenieria IA.** El cuestionamiento honesto del rol de #43 (iniciado el 21 abril) llevo al reconocimiento de que NO todo problema de sistema requiere un agente IA. Algunos problemas son inherentemente deterministicos (correlacion con reglas fijas, ruteo de alertas, deduplicacion) y se resuelven mejor con workflows N8N. Adoptar esta filosofia como principio fundacional previene que Addendo caiga en la trampa "hammer-nail" (todo es IA) y genera ahorro operacional material a escala.

### 13.8 Aprendizajes del 22 abril tarde

7. **Diagnostico empirico reveo gap entre infraestructura daemon y Agency OS.** El CLI Claude Code esta operacional y validado con costo/latencia medida, pero 0 workflows productivos lo usan con skills como system_prompt. Los 22 skills PERFECTOS PUROS son activo latente, no operativo. **La nivelacion sin integracion es inversion sin retorno.** Prioridad maxima: migrar al menos 1 workflow piloto a CLI + skill antes de seguir nivelando.

8. **Produccion SEO rapida es posible con stack maduro.** Don Jacinto paso de score 7.9 → ~9.5/10 con 2 commits (`64929f7` + `be6006d`) y <1 hora de trabajo, porque el schema se agrego en Layout central (no en 11 paginas individuales). **Leverage arquitectonico real.**

9. **Vision escrita ≠ compromiso de implementacion.** D16 y D17 se documentan ahora no para ejecutarse ya, sino para **evitar drift de decisiones arquitectonicas intermedias** que despues requieran rehacer trabajo. Honestidad editorial: vision sin pre-requisitos cumplidos es roadmap, no plan.

10. **Interpretacion C + Layout heredado = template replicable para clientes.** BlogPostLayout de Don Jacinto (schema BlogPosting + GA4 heredado + canonical + robots) es el **patron canonico para onboarding de clientes nuevos** (Bebe Genial, Neurokids, CreditBridge). No reconstruir desde cero.

---

## 14. CIERRE DEL DIA 21 ABRIL 2026 + DECISIONES 22 ABRIL 2026

### 14.1 Cierre del 21 abril 2026

**Jornada excepcional.** Se consolidaron logros que normalmente tomarian una semana en un sistema tradicional:

- **2 agentes criticos** (#25 Cloud Engineer + #40 Seguridad Estrategica) elevados a PERFECTO PURO con auditoria objetiva.
- **Sanitizacion integral** de secretos en los 54 skills del sistema.
- **8 decisiones arquitectonicas cerradas** con trazabilidad completa.
- **4 decisiones aplazadas honestamente** en lugar de forzar cierre prematuro.
- **3 principios operativos nuevos** integrados al sistema (Trust but Verify, Cero-Secretos, Evolutionary Architecture).
- **Protocolo Tripartita formalizado** para coordinacion cross-agent en incidentes.
- **Redis keyspace canonico** deslindado entre 4 agentes (#25, #40, #43 condicional, #50).

El sistema Addendo Agency OS quedo al 21 abril 2026:
- Mas seguro (cero-secretos establecido)
- Mas coordinado (protocolo tripartita)
- Mas honesto (aplazamientos documentados, Trust but Verify como estandar)
- Mas escalable (roadmap 4 hitos documentado en #25)
- Preparado para daemon Claude Code (FASE L de #40 como pre-requisito cumplido documentalmente)

### 14.2 Decisiones fundacionales del 22 abril 2026 mañana

En una sesion arquitectonica corta pero de alto impacto:

- **D13 Filosofia B** adoptada como principio arquitectonico permanente del sistema.
- **D14** #43 se migrara a workflow N8N centralizado (no agente IA); diseño pendiente.
- **D15** Skill #43 v1.0 archivado como referencia historica en `.claude/agents/archived/`.

El sistema pasa de 54 skills activos → **53 skills activos + 1 archivado**.
El principio Filosofia B queda como regla permanente para todas las decisiones arquitectonicas futuras.
Ahorro economico estimado a 1000 clientes: **$100K-400K/año vs Filosofia A**.

### 14.3 Cierre del 22 abril 2026 tarde

En una sesion mixta arquitectonica + produccion:

**Diagnostico (Seccion 7.6):**
- Infraestructura Claude Code daemon: ✅ operacional + validada empiricamente ($0.0064 / 921ms / Haiku)
- Integracion con Agency OS: ❌ **gap critico** — 0 workflows usan skills como system_prompt
- Prioridad en proximas sesiones: migrar piloto (candidato Blog Don Jacinto) a patron `claude -p --system @skill.md`

**Produccion Don Jacinto (Seccion 8.1):**
- GA4 `G-S0TWXE71XF` activado + validado con 1 usuario Realtime real
- Search Console configurado + sitemap enviado correcto
- GA4 ↔ SC vinculados
- Schema BlogPosting en 11 blogs — 0 warnings Google Rich Results
- Score SEO: 7.9 → ~9.5/10 con 2 commits bien pensados

**Vision arquitectonica postpuesta (Seccion 9.5):**
- **D16 Sistema Memoria Unificada** (3 capas A/B/C) — 80% piezas tecnicas existen, arranca tras nivelacion completa de agentes (~34 skills v1.0 pendientes)
- **D17 Dashboard Cliente-Facing** — depende D16, arranca tras validacion D16 con 2-3 clientes reales

**Lecciones consolidadas:**
- Nivelacion sin integracion = inversion sin retorno (#7 en Seccion 13.8)
- Leverage arquitectonico real en Layouts centrales (#8)
- Vision documentada ahora evita drift futuro (#9)
- Template replicable Don Jacinto para onboarding (#10)

El sistema Addendo Agency OS queda al 22 abril 2026 tarde:
- Mas diagnosticado (gap daemon↔Agency OS identificado con evidencia empirica)
- Con primer cliente SEO-first 100% productivo (Don Jacinto en standard 9.5/10)
- Con vision arquitectonica de mediano plazo documentada sin comprometer implementacion prematura
- Con backlog de proximas sesiones ordenado por dependencias reales (no por entusiasmo del momento)

---

*Documento Maestro del sistema Addendo Agency OS — v2.6 — 22 abril 2026 tarde.*
*53 agentes activos + 1 skill archivado — 1 mision: ser la agencia mas automatizada de America Latina.*
*Supera a v2.5 (22 abril mañana) con diagnostico daemon + cierre produccion Don Jacinto + vision D16/D17 postpuesta.*
