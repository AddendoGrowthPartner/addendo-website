# SKILL: GHL CRM — Sistema Nervioso Central de Ventas

**Nivel:** El mejor experto en GoHighLevel del mundo — configura y opera el CRM completo de cada cliente
**Agente principal:** #23 ghl-crm
**Recibe de:** #3 director-cuenta (Brief Maestro), #11 meta-ads / #12 google-ads / #13 tiktok-ads (leads), #24 n8n-automatizacion (webhooks)
**Entrega a:** #4 project-manager (reportes), #30 ventas-atencion (leads calificados), #34 agente-reputacion (post-venta)
**Plataforma:** GoHighLevel (GHL) — $297/mes plan agencia
**API Scopes:** 137 scopes configurados en N8N
**Credencial en N8N:** "GHL API Addendo" (httpHeaderAuth)
**Base URL:** https://services.leadconnectorhq.com

---

## PRINCIPIO MAESTRO

**Un lead sin seguimiento en menos de 5 minutos tiene 80% menos probabilidad de convertir. El tiempo es el enemigo.**

Segun Harvard Business Review, las empresas que contactan un lead en el primer minuto tienen 7x mas probabilidad de calificarlo que las que tardan 60 minutos. Despues de 5 minutos, la probabilidad cae un 80%. Despues de una hora, el lead practicamente esta muerto. El agente-ghl-crm NO es una base de datos pasiva — es un sistema activo que garantiza que ningun lead espere mas de 5 minutos para recibir su primera respuesta.

---

## FASE 1 — FILOSOFIA DEL AGENTE GHL-CRM

### 1.1 Los 5 principios fundamentales

**PRINCIPIO 1: La regla de los 5 minutos es sagrada.**

```
DATA DE VELOCIDAD DE RESPUESTA (Harvard Business Review + InsideSales.com):

TIEMPO DE RESPUESTA → PROBABILIDAD DE CALIFICAR AL LEAD:
  1 minuto:    391% mas probable (vs 30 minutos)
  5 minutos:   100% (baseline)
  10 minutos:  -26%
  30 minutos:  -60%
  1 hora:      -80%
  24 horas:    -90%
  +24 horas:   practicamente perdido

IMPLICACIONES:
  - El workflow de primera respuesta debe dispararse AUTOMATICAMENTE
  - No puede haber intervencion humana en los primeros 5 minutos
  - La automatizacion responde primero, el humano hace seguimiento despues
  - WhatsApp + Email + SMS en paralelo (multicanal)

METRICA OBJETIVO:
  95% de los leads deben recibir primer contacto en < 5 minutos
  100% de los leads deben recibir primer contacto en < 15 minutos
```

**PRINCIPIO 2: El CRM es el sistema nervioso central de las ventas.**

```
EL CRM NO ES:
  ❌ Una base de datos de contactos
  ❌ Un lugar donde guardar numeros de telefono
  ❌ Una herramienta opcional para "organizarse"
  ❌ Algo que se configura una vez y se olvida

EL CRM ES:
  ✅ El cerebro centralizado del proceso de ventas
  ✅ El orquestador de automatizaciones
  ✅ El registro historico de cada interaccion con cada lead
  ✅ El sistema que alerta cuando algo falla
  ✅ La fuente de verdad de las metricas de ventas
  ✅ El activo digital mas valioso del cliente

TODO debe pasar por GHL:
  - Leads de Meta Ads → GHL
  - Leads de Google Ads → GHL
  - Leads del sitio web → GHL
  - WhatsApp incoming → GHL
  - Email responses → GHL
  - Llamadas telefonicas → GHL (con call tracking)
  - Agendamientos → GHL Calendar
  - Pagos (Stripe) → GHL Billing

Si un canal no esta integrado con GHL, existe un PUNTO CIEGO.
Y en ventas, un punto ciego = lead perdido.
```

**PRINCIPIO 3: La automatizacion prepara la relacion humana, no la reemplaza.**

```
FRASE COMUN PERO INCORRECTA:
  "La automatizacion reemplaza a los vendedores"

REALIDAD:
  La automatizacion reemplaza las tareas REPETITIVAS y PREDECIBLES.
  La automatizacion LIBERA al vendedor humano para enfocarse
  en lo que solo un humano puede hacer: empatia, negociacion,
  cierre complejo, manejo de objeciones emocionales.

DIVISION DE TRABAJO:

LO QUE HACE LA AUTOMATIZACION:
  - Responder en < 5 minutos (imposible para humanos siempre)
  - Enviar recordatorios de citas
  - Calificar leads basicamente (campos obligatorios)
  - Secuencias de nurturing
  - Solicitudes de resenas post-servicio
  - Re-activacion de clientes inactivos
  - Reportes semanales automaticos
  - Actualizaciones de etapas basado en comportamiento

LO QUE HACE EL HUMANO (o agente-ventas-atencion):
  - Conversacion real con un lead calificado
  - Discovery call (entender necesidad profunda)
  - Manejo de objeciones complejas
  - Negociacion de precio y terminos
  - Cierre de la venta
  - Construccion de relacion a largo plazo
  - Escalamiento a Jose en casos complicados

REGLA:
  La automatizacion GANA al lead.
  El humano lo CIERRA.
```

**PRINCIPIO 4: Cada pipeline refleja el proceso real del cliente.**

```
ERROR COMUN:
  Configurar un pipeline generico con etapas tipo:
    "Prospect → Qualified → Proposal → Closed Won"

POR QUE FALLA:
  Cada cliente tiene un proceso de ventas DIFERENTE.
  Un brujo tiene un proceso totalmente distinto a un plomero.
  Un dentista tiene un proceso distinto a un abogado.
  
  Usar etapas genericas = el pipeline no refleja la realidad.
  Reporting fallido = optimizacion imposible.

PROCESO CORRECTO:

PASO 1: Durante el intake (director-cuenta #3), documentar EXACTAMENTE
         como el cliente cierra un lead paso a paso:
  "Primero me contactan por WhatsApp"
  "Luego les hago preguntas para calificarlos"
  "Si califican, agendo una consulta por videollamada"
  "Despues de la consulta, les mando propuesta"
  "Si aceptan, les mando link de pago"
  "Cuando pagan, empiezo el servicio"

PASO 2: Convertir eso en pipeline custom:
  Etapa 1: Nuevo Lead
  Etapa 2: En WhatsApp
  Etapa 3: Calificado
  Etapa 4: Consulta Agendada
  Etapa 5: Propuesta Enviada
  Etapa 6: En Negociacion
  Etapa 7: Pago Pendiente
  Etapa 8: Cerrado Ganado

PASO 3: Validar con el cliente:
  "¿Asi es exactamente como cierras? ¿Falta alguna etapa?"
  Ajustar hasta que el cliente diga "SI, asi es"

PASO 4: Aplicar el pipeline en GHL
```

**PRINCIPIO 5: Los datos del CRM son el activo mas valioso del cliente.**

```
PROTECCION DE DATOS — REGLAS:

[ ] Backup semanal automatico de todos los contactos
    Via N8N: export a Google Sheets o CSV cada domingo

[ ] Proteccion de acceso
    - Acceso solo a usuarios autorizados
    - Roles y permisos correctos
    - 2FA activado para el owner account
    - Jamas compartir credenciales

[ ] Limpieza de datos
    - Sin duplicados
    - Sin contactos corruptos
    - Campos personalizados con validacion
    - Tags organizados

[ ] Exportacion cuando el cliente termina el contrato
    - El cliente es DUENO de sus datos
    - Al finalizar contrato, exportar TODO:
      * Contactos
      * Oportunidades
      * Conversaciones
      * Calendarios
      * Workflows
    - Entregar al cliente en formato CSV/JSON

[ ] Compliance con privacidad
    - GDPR (Europa)
    - CCPA (California)
    - LGPD (Brasil)
    - Siempre pedir consentimiento antes de contactar
    - Respetar "unsubscribe" en email/SMS/WhatsApp
```

### 1.2 Mentalidad del agente GHL-CRM

**ES:**
```
- Un arquitecto de procesos de venta automatizados
- Un obsesivo del tiempo de primera respuesta
- Un guardian de la limpieza de datos
- Un integrador de todos los canales de comunicacion
- Un analista de pipeline y cuellos de botella
- Un protector de los datos del cliente
```

**NO ES:**
```
- Un vendedor (ese es ventas-atencion #30)
- Un creador de copy (ese es copywriting #16)
- Un estratega (ese es director-estrategia #9)
- Un pasivo administrador de base de datos
```

---

## FASE 2 — CONFIGURACION INICIAL PARA NUEVO CLIENTE

### 2.1 Sub-cuenta GHL por cliente

**REGLA:** Cada cliente tiene su propia sub-cuenta bajo la cuenta agencia de Addendo. Nunca mezclar datos de clientes.

**Proceso de creacion (automatizable via API):**

```bash
# Via GHL API
POST https://services.leadconnectorhq.com/locations/
Headers:
  Authorization: Bearer {{agency_access_token}}
  Version: 2021-07-28

Body:
{
  "name": "{{cliente_nombre}} - {{ciudad}}",
  "companyId": "{{addendo_agency_id}}",
  "address": "{{direccion_cliente}}",
  "city": "{{ciudad}}",
  "state": "{{estado}}",
  "country": "{{pais}}",
  "postalCode": "{{cp}}",
  "website": "{{sitio_web_cliente}}",
  "timezone": "{{timezone_cliente}}",
  "firstName": "{{nombre_contacto}}",
  "lastName": "{{apellido_contacto}}",
  "email": "{{email_cliente}}",
  "phone": "{{telefono_cliente}}",
  "settings": {
    "allowDuplicateContact": false,
    "allowDuplicateOpportunity": false,
    "allowFacebookNameMerge": true,
    "disableContactTimezone": false
  },
  "snapshot": {
    "id": "{{snapshot_id_base_addendo}}",
    "type": "default"
  }
}
```

**Checklist de configuracion inicial:**

```
[ ] Sub-cuenta creada con nombre "[Cliente] — [Ciudad]"
[ ] Timezone correcto (zona del cliente, NO Addendo)
[ ] Idioma configurado (espanol para latinos, ingles para anglos)
[ ] Dominio personalizado configurado (si el cliente tiene sitio)
[ ] Logo del cliente subido
[ ] Colores de marca aplicados
[ ] Horarios de atencion configurados
[ ] Business hours definidos
[ ] Info de facturacion del cliente
[ ] API Key generada y guardada en N8N credentials
[ ] Webhook URLs configuradas para recibir leads
```

### 2.2 Integraciones obligatorias desde dia 1

```
INTEGRACIONES BASE (todas las sub-cuentas):

[ ] Meta Business Integration
    - Conectar Facebook Page del cliente
    - Conectar Instagram Business Account
    - Activar Lead Ads sync (formularios de Meta Ads)
    - Permitir mensajes directos sincronizados

[ ] Google Integration
    - Google My Business
    - Google Calendar (para sincronizar citas)
    - Google Ads (para importar conversiones)

[ ] Twilio / WhatsApp Business
    - Numero de WhatsApp Business del cliente
    - A2P 10DLC registration (obligatorio en USA)
    - Configurar webhook para mensajes entrantes

[ ] Email Service
    - Mailgun o SendGrid (via GHL LC Email)
    - Verificar dominio con SPF, DKIM, DMARC
    - Warm up del dominio si es nuevo

[ ] Stripe / PayPal (si el cliente cobra online)
    - Conectar cuenta del cliente
    - Configurar productos y precios
    - Webhooks para confirmar pagos

[ ] Tracking
    - GA4 ID del cliente
    - Meta Pixel ID
    - Google Tag Manager ID
```

### 2.3 Campos personalizados obligatorios

**Crear estos custom fields en cada sub-cuenta:**

```
CAMPOS ESTANDAR DEL LEAD:
  [ ] first_name (string) — obligatorio
  [ ] last_name (string) — obligatorio  
  [ ] email (email) — obligatorio
  [ ] phone (phone) — obligatorio con formato internacional
  [ ] source (dropdown) — Meta Ads / Google Ads / TikTok / Web Form / Referido
  [ ] campaign_name (string) — de que campana vino
  [ ] service_interest (dropdown) — cual servicio le interesa
  [ ] city (string) — ciudad del lead
  [ ] message (text) — mensaje inicial del lead
  [ ] utm_source (string)
  [ ] utm_medium (string)
  [ ] utm_campaign (string)
  [ ] utm_content (string)
  [ ] utm_term (string)
  [ ] timestamp_first_contact (datetime) — cuando fue contactado primera vez
  [ ] response_time_seconds (number) — tiempo hasta primera respuesta

CAMPOS DE CALIFICACION:
  [ ] qualification_score (number 1-10)
  [ ] budget_range (dropdown) — segun el servicio
  [ ] timeline (dropdown) — urgente / 30 dias / 60 dias / 90+ dias
  [ ] decision_maker (yes/no) — es quien decide

CAMPOS DE SEGUIMIENTO:
  [ ] last_contact_date (datetime)
  [ ] last_contact_channel (dropdown) — WhatsApp / Email / SMS / Call
  [ ] notes (text)
  [ ] next_follow_up (datetime)
```

---

## FASE 3 — PIPELINES OBLIGATORIOS

### 3.1 Pipeline 1 — LEADS NUEVOS

**Estructura obligatoria (8 etapas):**

```
PIPELINE: "Leads Nuevos"
Type: Sales Pipeline
Default for new opportunities: YES

ETAPAS:

1. NUEVO LEAD (entrada)
   - Criterio de entrada: webhook desde ads/forms
   - Automatizacion: dispara Workflow 1 (Respuesta Inmediata)
   - Esperado: lead entra aqui y sale en < 1 minuto
   - Si se queda aqui > 5 minutos: ALERTA CRITICA

2. CONTACTADO
   - Criterio: primer mensaje enviado
   - Automatizacion: mueve aqui al terminar Workflow 1
   - Esperado: lead aqui 0-60 minutos
   - Si no responde en 1h: dispara Workflow 2 (Nurturing)

3. EN CONVERSACION
   - Criterio: el lead respondio
   - Automatizacion: detecta respuesta via webhook y mueve aqui
   - Esperado: conversacion activa
   - Humano (vendedor) toma control aqui

4. CITA AGENDADA
   - Criterio: cita creada en calendario
   - Automatizacion: dispara Workflow 3 (Confirmacion de Cita)
   - Esperado: esperar la fecha de la cita
   - Si cancela: vuelve a "En Conversacion"

5. PROPUESTA ENVIADA
   - Criterio: vendedor marca esta etapa manualmente despues de enviar propuesta
   - Automatizacion: recordatorio a las 48h si no hay respuesta
   - Esperado: 3-7 dias
   - Si no responde en 7 dias: mover a Negociacion o Cerrado Perdido

6. NEGOCIACION
   - Criterio: el lead tiene preguntas o objeciones
   - Automatizacion: alerta al vendedor para follow-up personalizado
   - Esperado: 3-14 dias
   - Etapa donde mas se pierden leads — maxima atencion

7. CERRADO GANADO ✅
   - Criterio: el lead pago y es cliente
   - Automatizacion:
     * Dispara Workflow 4 (Solicitud de Resena — 3 dias despues)
     * Mueve al pipeline 2 (Clientes Activos)
     * Notifica al project-manager para onboarding
     * Dispara trigger de celebracion (WhatsApp a Jose)

8. CERRADO PERDIDO ❌
   - Criterio: el lead decidio no contratar
   - Automatizacion:
     * Tag con razon de perdida: "Precio" / "Timing" / "No responder" / "Otra"
     * Si razon es "No responder": agregar tag "Re-activar en 30 dias"
     * Si razon es "Precio": agregar tag "Re-ofertar en 60 dias"
     * Exportar a Instantly.ai para secuencia de email frio (opcional)
```

### 3.2 Pipeline 2 — CLIENTES ACTIVOS

**Estructura obligatoria (5 etapas):**

```
PIPELINE: "Clientes Activos"
Type: Customer Lifecycle

ETAPAS:

1. ONBOARDING
   - Criterio: cliente recien cerrado, en primer mes
   - Automatizacion:
     * Email de bienvenida con next steps
     * Agendar kick-off call
     * Notificar a project-manager para iniciar proyecto
     * Workflow de onboarding activa (7 emails en 14 dias)
   - Duracion: 30 dias

2. ACTIVO
   - Criterio: onboarding terminado, servicio en curso
   - Automatizacion:
     * Check-in mensual automatico
     * Recordatorios de pago (si aplica subscription)
     * Monitoreo de satisfaccion (NPS survey trimestral)
   - Duracion: mientras este pagando

3. EN RIESGO
   - Criterio: senales de insatisfaccion
     * NPS < 6
     * Queja en conversaciones
     * Retraso en pago
     * Sin contacto en 60 dias
     * Menciona competidor
   - Automatizacion:
     * ALERTA a director-cuenta (#3) via WhatsApp
     * Escalar a ventas-atencion (#30)
     * Plan de retencion activado
   - Tiempo maximo: 14 dias para resolver

4. RENOVACION
   - Criterio: 30 dias antes de vencimiento de contrato
   - Automatizacion:
     * Email al cliente sobre renovacion
     * Agendar renewal call con director-cuenta
     * Preparar propuesta de renovacion
   - Duracion: 30 dias

5. REACTIVACION
   - Criterio: cliente que pauso o cancelo
   - Automatizacion:
     * Secuencia de email de re-engagement (30, 60, 90 dias)
     * Oferta especial de reactivacion
     * Llamada personal de director-cuenta
   - Tiempo: hasta 6 meses post-cancelacion
```

### 3.3 Pipelines adicionales (segun nicho)

**Algunos clientes necesitan pipelines especificos:**

```
PIPELINE ECOMMERCE:
  Para clientes con tienda online
  Etapas:
    - Carrito Abandonado
    - Cliente Primera Compra
    - Cliente Recurrente
    - VIP (3+ compras)
    - En Churn (no compra hace 90 dias)

PIPELINE B2B LARGO:
  Para servicios B2B con ciclos de 6-12 meses
  Etapas:
    - MQL (Marketing Qualified Lead)
    - SQL (Sales Qualified Lead)
    - Discovery Call
    - Demo
    - Proposal
    - Procurement / Legal Review
    - Contract Negotiation
    - Closed Won / Closed Lost

PIPELINE SERVICIOS MEDICOS:
  Para clinicas y consultorios
  Etapas:
    - Primera Consulta
    - En Tratamiento
    - Alta del Tratamiento
    - Seguimiento
    - Paciente Recurrente
```

---

## FASE 4 — WORKFLOWS AUTOMATICOS

**Los workflows son el corazon del CRM. Sin ellos, GHL es solo una base de datos.**

### 4.1 Workflow 1 — RESPUESTA INMEDIATA (el mas importante)

**Proposito:** Garantizar que cada lead reciba su primer contacto en < 5 minutos.

```
WORKFLOW: "Respuesta Inmediata a Nuevo Lead"

TRIGGER:
  - Contact Created (with tag "new_lead")
  - OR Opportunity Created in Pipeline "Leads Nuevos" Stage "Nuevo Lead"

ACCIONES:

[STEP 1] — Wait 0 seconds
  (Ejecucion inmediata)

[STEP 2] — Send WhatsApp Message
  To: {{contact.phone}}
  Message: Ver Plantilla WhatsApp 1 (seccion 5.1)
  
[STEP 3] — Send Email
  To: {{contact.email}}
  Template: "Bienvenida Primer Contacto"
  Subject: "{{contact.first_name}}, gracias por tu interes en {{custom.business_name}}"

[STEP 4] — Send SMS (backup si WhatsApp falla)
  Condicional: solo si WhatsApp no se entrego en 60 segundos
  To: {{contact.phone}}
  Message: Version corta del primer mensaje WhatsApp

[STEP 5] — Internal Notification
  Notificar al vendedor/cliente via:
  - WhatsApp a numero interno
  - Email a email del vendedor
  - Slack webhook si aplica
  Mensaje: "🔥 Nuevo lead: {{contact.first_name}} {{contact.last_name}} — {{custom.service_interest}} — {{contact.phone}}"

[STEP 6] — Update Contact
  - Tag: "workflow_1_completed"
  - Custom field "timestamp_first_contact" = now()
  - Custom field "last_contact_channel" = "WhatsApp"

[STEP 7] — Move Opportunity
  From: "Nuevo Lead"
  To: "Contactado"

[STEP 8] — Wait 1 hour
  Waiting for response...

[STEP 9] — Check If Responded
  Condition: {{contact.last_incoming_message_date}} > trigger time?
  
  IF YES:
    - Move to "En Conversacion"
    - Tag: "responded_in_1h"
    - End workflow
  
  IF NO:
    - Continue to Step 10

[STEP 10] — Second Touch (1 hour after no response)
  Send WhatsApp: Ver Plantilla WhatsApp 2
  Tag: "second_touch_sent"

[STEP 11] — Wait 23 hours (total 24h desde primer contacto)

[STEP 12] — Check If Responded
  IF YES: Move to "En Conversacion", end workflow
  IF NO: Continue to Step 13

[STEP 13] — Third Touch (24h after first contact)
  Send WhatsApp: Ver Plantilla WhatsApp 3
  Send Email: "ultima oportunidad" template
  Internal alert: "⚠️ Lead sin responder 24h: {{contact.first_name}}"
  Tag: "third_touch_sent"

[STEP 14] — Wait 6 days

[STEP 15] — Move to Workflow 2 (Nurturing Long)
  Mover automaticamente al workflow de nurturing de 7 dias
  End this workflow
```

### 4.2 Workflow 2 — SECUENCIA DE NURTURING (7 dias)

```
WORKFLOW: "Nurturing 7 Dias"

TRIGGER:
  - Tag added: "nurturing_start"
  - OR Workflow 1 completed without response

ACCIONES:

DIA 1:
  [08:00 hora del lead] Send WhatsApp
    Template: "Testimonio de cliente satisfecho"
    Incluye: imagen de resena real + frase emotiva
    Ver Plantilla WhatsApp 4

  [18:00] Send Email
    Template: "Historia de exito"
    Content: case study corto

DIA 2:
  [10:00] Send Email
    Template: "Valor educativo"
    Content: articulo del blog del cliente
    CTA: "Leer articulo completo"

DIA 3:
  [14:00] Send WhatsApp
    Template: "Oferta especial o urgencia"
    Ver Plantilla WhatsApp 5
    Incluir: oferta con fecha limite

DIA 5:
  [11:00] Send Email
    Template: "FAQ del servicio"
    Content: respuestas a preguntas comunes
    CTA: "Agendar consulta"

DIA 7:
  [09:00] Send WhatsApp
    Template: "Ultima pregunta abierta"
    Message: "{{contact.first_name}}, quiero saber si hay algo mas que pueda ayudarte o si prefieres que te deje de contactar. Solo dime 'NO GRACIAS' si no quieres mas mensajes. Respeto tu decision 🙏"

  [18:00] Check If Responded
    IF YES: move to "En Conversacion"
    IF NO: continue

DIA 8:
  [09:00] Move to "Cerrado Perdido"
    Tag: "nurturing_completed_no_response"
    Tag: "re_activate_in_30_days"
    Note: "Lead no respondio despues de 7 dias de nurturing. Re-intentar en 30 dias con oferta diferente."
```

### 4.3 Workflow 3 — CONFIRMACION DE CITA

```
WORKFLOW: "Confirmacion y Recordatorios de Cita"

TRIGGER:
  - Calendar: Appointment Created

ACCIONES:

[INMEDIATO]
  Send Email: "Confirmacion de Cita"
    Include:
    - Fecha y hora (con timezone del lead)
    - Tipo de cita
    - Link de Zoom/Meet si es videollamada
    - Direccion si es presencial
    - Que llevar / preparar
    - Link para reagendar si necesita
    - CTA: "Agregar a mi calendario"

  Send WhatsApp: "Cita confirmada"
    Mensaje corto con detalles clave
    Link corto al Zoom/Meet

[24 HORAS ANTES DE LA CITA]
  Send WhatsApp: "Recordatorio 24h"
    Message: "Hola {{contact.first_name}}, te recuerdo nuestra cita manana 
             {{appointment.time}} por {{appointment.type}}. 
             Avisame si necesitas reagendar 🙏"

[2 HORAS ANTES DE LA CITA]
  Send WhatsApp: "Recordatorio final"
    Message: "{{contact.first_name}}, nuestra cita es en 2 horas. 
             {{appointment.location_or_link}} 
             ¡Nos vemos pronto!"

[DURANTE LA CITA]
  Internal notification: "📅 Cita en curso: {{contact.first_name}}"

[1 HORA DESPUES DE LA CITA]
  Check: ¿Se presento? (custom field updated by vendor)
  
  IF NO (no-show):
    Send WhatsApp: "¿Todo bien?"
      Message: "{{contact.first_name}}, note que no pudiste conectarte a nuestra cita.
               ¿Todo bien? ¿Podemos reagendar?"
      Include: link para reagendar
    
    Tag: "no_show"
    Internal alert to vendor
  
  IF YES (attended):
    Send WhatsApp: "Gracias por tu tiempo"
      Message: "{{contact.first_name}}, gracias por la cita de hoy.
               Te envio la informacion que hablamos en unos minutos."
    
    Move Opportunity: to "Propuesta Enviada" (if applicable)
```

### 4.4 Workflow 4 — SOLICITUD DE RESENA

```
WORKFLOW: "Solicitud de Resena Google"

TRIGGER:
  - Opportunity moved to "Cerrado Ganado"

ACCIONES:

[WAIT 3 DIAS]
  (Dar tiempo para que el cliente experimente el servicio)

[STEP 1] — Send WhatsApp
  Message:
  "Hola {{contact.first_name}} 👋
  
  Gracias por confiar en {{business_name}}.
  
  ¿Te tomarias 60 segundos para dejarnos una resena en Google?
  Significa mucho para nosotros y nos ayuda a seguir ayudando a mas personas como tu.
  
  Link directo: {{google_review_link}}
  
  ¡Gracias! 🙏"

[WAIT 3 DIAS]

[STEP 2] — Check If Reviewed
  Custom logic via N8N: verificar si hay resena nueva con el nombre del cliente
  
  IF YES:
    Send WhatsApp: "¡Gracias por tu resena!"
      Message: "{{contact.first_name}}, ¡gracias por tu resena! 
               Lo agradecemos muchisimo 💛"
    
    Tag: "review_left"
    End workflow
  
  IF NO:
    Continue to Step 3

[STEP 3] — Send Email
  Template: "Recordatorio de Resena"
  Subject: "{{contact.first_name}}, 60 segundos que nos ayudan mucho"
  Include: link directo

[WAIT 2 DIAS]

[STEP 4] — Final Touch
  Send WhatsApp: "Ultima pregunta"
    Message: "{{contact.first_name}}, se que estas ocupado.
             Si tuviste buena experiencia, una resena de 60 segundos nos ayudaria muchisimo:
             {{google_review_link}}
             
             Si tuviste algun problema, por favor contactame directamente 
             y lo resolvemos.
             
             Gracias 🙏"
  
  Tag: "review_request_completed"
  End workflow
```

### 4.5 Otros workflows recomendados

```
WORKFLOW 5: "Cliente en Riesgo - Deteccion y Retencion"
  Trigger: tag "at_risk" applied
  Acciones: alerta inmediata + plan de retencion

WORKFLOW 6: "Cobro Recurrente Automatico"
  Trigger: fecha de cobro mensual
  Acciones: cargar tarjeta, confirmar, recordatorio si falla

WORKFLOW 7: "Nurturing Largo 30 Dias"
  Trigger: lead en "Cerrado Perdido" con tag "re_activate_in_30_days"
  Acciones: secuencia de re-engagement con contenido de valor

WORKFLOW 8: "Upsell a Clientes Existentes"
  Trigger: cliente 6 meses activo
  Acciones: ofrecer servicio complementario

WORKFLOW 9: "Cumpleanos del Cliente"
  Trigger: fecha de cumpleanos
  Acciones: WhatsApp con felicitacion + oferta especial

WORKFLOW 10: "Aniversario como Cliente"
  Trigger: 1 ano de cerrado ganado
  Acciones: mensaje de agradecimiento + oferta de renovacion
```

---

## FASE 5 — PLANTILLAS DE MENSAJES

### 5.1 Plantilla WhatsApp 1 — Primer contacto (menos de 5 minutos)

```
FORMATO GENERAL:

"Hola {{contact.first_name}} 👋 

Vi que te interesaste en {{custom.service_interest}}. 
Soy [NOMBRE DEL NEGOCIO] y estoy aqui para ayudarte.

¿Tienes unos minutos para contarme que necesitas? 🙏"

REGLAS:
- Maximo 3 lineas
- Incluir nombre del lead
- Incluir servicio de interes
- Pregunta al final (genera respuesta)
- Un solo emoji estrategico
- Tono amigable, no agresivo
```

**Variaciones por nicho:**

```
NICHO ESOTERIC (brujo, curandero, tarot):
"Hola {{contact.first_name}} 👋

Vi que buscas ayuda con [tema]. Soy [Nombre] y he ayudado a mas de 2,500 personas con situaciones similares.

¿Puedes contarme en 2 lineas que esta pasando? Asi te puedo orientar mejor 🙏"

NICHO PLOMERO (servicios de emergencia):
"Hola {{contact.first_name}}!

Vi que tienes una emergencia de plomeria. Soy [Nombre] de [Negocio].

¿Que esta pasando exactamente? Voy camino a tu zona 🚐"

NICHO DENTISTA:
"Hola {{contact.first_name}} 👋

Gracias por contactar a [Nombre Clinica]. 
Somos expertos en [servicio principal].

¿Necesitas cita de consulta? Puedo agendarte esta misma semana 🦷"

NICHO ESTETICA:
"Hola {{contact.first_name}} ✨

Me contento que te intereses en [servicio]. 
En [Clinica] hemos ayudado a +500 mujeres como tu.

¿Cuando te gustaria venir a una consulta gratis? 💛"

NICHO RESTAURANTE (reservas):
"Hola {{contact.first_name}}!

Gracias por querer visitarnos en [Restaurante].
Tenemos disponibilidad para {{custom.date}}.

¿Cuantas personas serian y que hora preferirias? 🍽️"
```

### 5.2 Plantilla WhatsApp 2 — Segundo contacto (1 hora despues sin respuesta)

```
"{{contact.first_name}}, entiendo que puedes estar ocupado.

Solo queria asegurarme de que recibiste mi mensaje.

Cuando tengas 2 minutos, me cuentas?"
```

### 5.3 Plantilla WhatsApp 3 — Tercer contacto (24 horas)

```
"{{contact.first_name}}, hola de nuevo.

Se que el dia a dia absorbe, pero queria recordarte que estoy aqui para ayudarte con [servicio].

¿Preferiste no avanzar o simplemente no has tenido tiempo? Sin presion, solo quiero saber.

Un dia mas y te dejo en paz si no sabes de mi 😊"
```

### 5.4 Plantilla Email 1 — Bienvenida Primer Contacto

```
ASUNTO: "{{contact.first_name}}, gracias por tu interes en {{business_name}}"

BODY:

Hola {{contact.first_name}},

Acabo de ver tu mensaje sobre {{custom.service_interest}}.

Ya te envie un WhatsApp para que sigamos por ahi (es mas rapido), 
pero queria tambien dejarte este email como respaldo.

Aqui estamos para responder cualquier pregunta que tengas:

📱 WhatsApp: {{business_whatsapp}}
📞 Telefono: {{business_phone}}
📧 Email: {{business_email}}
🌐 Web: {{business_website}}

Un saludo,
{{business_signature}}

P.D.: Respondemos todos los mensajes en menos de 5 minutos durante horario de atencion.
```

### 5.5 Reglas de copywriting para mensajes

```
REGLAS ABSOLUTAS:

[ ] SIEMPRE personalizar con {{contact.first_name}}
    Nunca "estimado cliente" o "hola"

[ ] MAXIMO 3 lineas por mensaje WhatsApp
    Los mensajes largos no se leen

[ ] INCLUIR emoji estrategico
    1-2 emojis por mensaje, no mas
    Elegir segun el nicho (profesional vs casual)

[ ] NUNCA lenguaje de vendedor agresivo en primer mensaje
    Prohibido: "¡Oferta especial solo hoy!"
    Prohibido: "¡Llama ya antes de que se acabe!"
    Prohibido: "¡Garantizado 100%!"

[ ] EL PRIMER MENSAJE PREGUNTA, NO VENDE
    Objetivo: generar respuesta, no cerrar venta
    "¿Cuentame mas?" > "Contratame"

[ ] IDIOMA DEL LEAD
    Detectar por:
    - Nombre (si es espanol/ingles)
    - Campo del formulario
    - IP del form submission
    Responder en el mismo idioma que el lead hablo

[ ] TIMING
    Respetar horarios de la zona del lead
    No enviar WhatsApp a las 2am
    Respetar "no molestar" weekends si aplica

[ ] VOZ DEL CLIENTE, NO DE ADDENDO
    Los mensajes representan al cliente, no a Addendo
    Usar nombre del cliente, no de la agencia
    Tono del cliente (formal/informal segun sistema de marca)
```

---

## FASE 6 — CALENDARIO Y CITAS

### 6.1 Configuracion del calendario

**Reglas de creacion:**

```
CREAR UN CALENDARIO POR:
  - Tipo de servicio (consulta, propuesta, seguimiento)
  - Vendedor o practitioner (si hay multiples)
  - Ubicacion fisica (si hay multiples sucursales)

CONFIGURACION POR CALENDARIO:

[ ] Duracion de cita:
    - Consulta inicial: 30 minutos
    - Discovery call B2B: 45 minutos
    - Propuesta detallada: 60 minutos
    - Seguimiento rapido: 15 minutos

[ ] Buffer entre citas:
    - Minimo 15 minutos
    - 30 minutos si es presencial con tiempo de traslado

[ ] Horario disponible:
    - Segun el cliente
    - Respetar zona horaria del cliente
    - Incluir/excluir weekends segun preferencia
    - Bloquear horas de almuerzo

[ ] Max citas por dia:
    - Limite razonable para evitar saturacion
    - Ejemplo: 6 consultas/dia max

[ ] Max dias en el futuro:
    - 30 dias para consultas
    - 60 dias para seguimientos largos

[ ] Min notice (tiempo minimo de agendamiento):
    - 2 horas minimo (permitir preparacion)
    - 24 horas para reuniones importantes

[ ] Recordatorios automaticos:
    - Email inmediato al agendar
    - WhatsApp 24h antes
    - WhatsApp 2h antes
    - Email 1h antes (backup)
```

### 6.2 Formulario de agendamiento

```
CAMPOS OBLIGATORIOS (minimos):
  [ ] Nombre completo
  [ ] Email
  [ ] Telefono (con WhatsApp)
  [ ] Servicio de interes
  [ ] Mensaje / motivo de la consulta

CAMPOS OPCIONALES (mas data = mejor calificacion):
  [ ] Ciudad
  [ ] Como nos encontraste
  [ ] Presupuesto estimado
  [ ] Urgencia
  [ ] Horario preferido

REGLAS DE UX:
  [ ] Maximo 5-7 campos visibles (mas = abandono)
  [ ] Campos obligatorios marcados con *
  [ ] Validacion de email y telefono
  [ ] Botones grandes tocables en mobile
  [ ] Confirmacion inmediata al enviar
  [ ] Redireccion a /gracias.html personalizada
```

### 6.3 Sincronizacion con Google Calendar

```
INTEGRACION OBLIGATORIA:

[ ] Conectar Google Calendar del cliente a GHL
[ ] Configurar 2-way sync (cambios en GHL reflejados en GCal y viceversa)
[ ] Check for conflicts enabled (evitar doble-booking)
[ ] Include busy events de GCal (bloquear horarios ocupados)

BENEFICIOS:
  - El cliente ve sus citas en GCal
  - Si bloquea horario en GCal, GHL respeta
  - Si agenda cita en GHL, aparece en GCal
  - Notificaciones de GCal funcionan como backup
```

---

## FASE 7 — INTEGRACION CON ECOSISTEMA ADDENDO

### 7.1 Desde los canales de adquisicion (IN)

```
META LEAD ADS → GHL:
  Via: Meta Business Integration nativa de GHL
  Configuracion: en GHL Settings > Integrations > Facebook
  Accion automatica: leads de Meta Lead Ads aparecen en pipeline automaticamente
  Workflow trigger: inmediato
  
  ALTERNATIVA: via N8N webhook
  Meta Ads → N8N → GHL API POST /contacts/
  Uso: cuando necesitas transformacion de datos antes de entrar

GOOGLE LEAD FORM EXTENSIONS → GHL:
  Via: N8N webhook (Google no tiene integracion nativa con GHL)
  Flow:
    1. Google Ads Lead Form → webhook
    2. N8N recibe webhook
    3. N8N formatea datos (map fields)
    4. N8N POST a GHL API
    5. GHL crea contacto y dispara Workflow 1
  Tiempo total: < 30 segundos

FORMULARIOS DEL SITIO WEB → GHL:
  Via: N8N webhook (el formulario del sitio apunta a N8N)
  Flow:
    1. Usuario llena form en sitio web
    2. POST a N8N webhook URL
    3. N8N valida y enriquece datos
    4. N8N POST a GHL API
    5. GHL crea contacto y dispara Workflow 1
    6. GHL retorna confirmacion
    7. N8N responde al sitio con success
    8. Sitio muestra "Gracias, te contactaremos en < 5 minutos"

TIKTOK LEAD GENERATION → GHL:
  Via: N8N webhook
  Flow similar a Google Lead Forms

LLAMADAS ENTRANTES → GHL:
  Via: Twilio integration + GHL Call Tracking
  Accion automatica:
    - Numero tracked dispara creacion de contacto
    - Grabacion se guarda en el perfil del lead
    - Transcripcion automatica
    - Tag con source de la llamada
```

### 7.2 Hacia otros sistemas (OUT)

```
GHL → PROJECT-MANAGER (#4):
  Trigger: opportunity moved to "Cerrado Ganado"
  Via: N8N webhook desde GHL
  Accion: 
    - Crear ticket en project-manager
    - Iniciar flujo de onboarding
    - Asignar a director-cuenta para handoff
    - Notificar a Jose

GHL → AGENTE-REPUTACION (#34):
  Trigger: resena negativa detectada (rating < 4)
  Via: N8N monitoring + alert
  Accion:
    - Alerta inmediata a director-cuenta
    - Plan de respuesta activado
    - Registro en pipeline "Clientes en Riesgo"

GHL → INSTANTLY.AI:
  Trigger: lead movido a "Cerrado Perdido" con tag "re_activate_in_30_days"
  Via: N8N export
  Accion:
    - Exportar contacto a lista de Instantly.ai
    - Iniciar secuencia de email frio en 30 dias
    - Respetar unsubscribe

GHL → GOOGLE SHEETS (reportes):
  Trigger: diario 6am
  Via: N8N schedule
  Accion:
    - Export pipeline snapshot a Google Sheets
    - Metricas agregadas por semana/mes
    - Alimenta dashboards de Looker Studio

GHL → STRIPE:
  Trigger: opportunity "Propuesta Enviada" con monto definido
  Via: GHL Payments nativo
  Accion:
    - Generar link de pago
    - Enviar al cliente
    - Al pagar: webhook confirma y mueve a "Cerrado Ganado"
```

### 7.3 Diagrama completo del flujo de un lead

```
[META ADS LEAD] 
    ↓
[META LEAD INTEGRATION]
    ↓
[GHL PIPELINE "Nuevo Lead"]
    ↓
[WORKFLOW 1 — RESPUESTA INMEDIATA]
    ↓ (< 60 segundos)
[WHATSAPP + EMAIL + INTERNAL NOTIFICATION]
    ↓
[GHL PIPELINE "Contactado"]
    ↓
    ├── [LEAD RESPONDE] → "En Conversacion" → vendedor toma control
    │
    └── [NO RESPONDE 1h] → [2do mensaje] → [NO RESPONDE 24h] → [3er mensaje]
        → [NO RESPONDE 48h] → [WORKFLOW 2 — NURTURING 7 DIAS]
        → [NO RESPONDE 7 dias] → "Cerrado Perdido" → [Instantly.ai 30d]
```

---

## FASE 8 — LIMPIEZA Y MANTENIMIENTO

### 8.1 Rutina semanal (30 minutos)

```
CADA LUNES A PRIMERA HORA:

[ ] REVISAR LEADS ESTANCADOS
    Filtro: pipeline "Leads Nuevos" + stage "Contactado" + >7 dias sin movimiento
    Accion:
    - Si no respondio en 7 dias: mover a "Cerrado Perdido" con tag "re_activate_30d"
    - Si respondio pero no avanzo: mover a "En Conversacion" y alertar vendedor
    - Si tiene tag de alta prioridad: escalar a director-cuenta

[ ] DUPLICADOS
    Herramienta: GHL Settings > Contact Merge
    Criterio: email + telefono coincidentes
    Accion: merge mantener el contacto con mas interacciones

[ ] WORKFLOWS ACTIVOS
    Verificar que todos los workflows estan "ENABLED"
    Revisar "Workflow Stats" — cualquier workflow con 0 ejecuciones en 7 dias es sospechoso
    Verificar que los triggers funcionan (crear lead de prueba)

[ ] TAGS INCONSISTENTES
    Revisar tags con mayusculas/minusculas inconsistentes
    Estandarizar a lowercase con underscores
    Eliminar tags usados < 5 veces (si no son criticos)

[ ] CONVERSACIONES SIN LEER
    Alertar si hay mensajes del cliente sin leer > 24h
    Escalar a director-cuenta
```

### 8.2 Rutina mensual (2 horas)

```
PRIMER LUNES DEL MES:

[ ] AUDITORIA DE PIPELINE
    Preguntas:
    - ¿Las etapas siguen reflejando el proceso real?
    - ¿Hay cuellos de botella en alguna etapa especifica?
    - ¿La tasa de conversion por etapa es saludable?
    - ¿Necesitamos agregar/quitar etapas?

[ ] TASAS DE CONVERSION POR ETAPA
    Calcular:
    - Nuevo Lead → Contactado: % (debe ser >95% si workflow funciona)
    - Contactado → En Conversacion: % (objetivo >40%)
    - En Conversacion → Cita Agendada: % (objetivo >30%)
    - Cita Agendada → Propuesta: % (objetivo >70%)
    - Propuesta → Cerrado Ganado: % (objetivo >20%)
    
    Identificar el cuello de botella (la etapa con menor conversion)
    Plan de accion para mejorarlo

[ ] LIMPIEZA DE CAMPOS Y TAGS
    Eliminar custom fields no utilizados
    Eliminar tags no utilizados
    Eliminar workflows pausados hace > 60 dias

[ ] BACKUP COMPLETO
    Exportar todos los contactos a CSV
    Guardar en Google Drive del cliente
    Filename: "{{cliente}}-contacts-{{YYYY-MM-DD}}.csv"

[ ] REPORTE AL CLIENTE
    Enviar reporte mensual con metricas y insights
    (ver Fase 10)
```

### 8.3 Rutina trimestral (4 horas)

```
CADA 3 MESES:

[ ] REVISION ESTRATEGICA CON EL CLIENTE
    Meeting de 60 min
    Temas:
    - ¿El pipeline sigue reflejando la realidad?
    - ¿Hay nuevos servicios que agregar al CRM?
    - ¿Hay cambios en el proceso de ventas?
    - ¿Que workflows optimizar?
    - ¿Que nuevas automatizaciones agregar?

[ ] AUDITORIA DE WORKFLOWS
    Revisar cada workflow:
    - ¿Sigue siendo relevante?
    - ¿Las metricas justifican mantenerlo?
    - ¿Se puede optimizar?
    - ¿Se puede simplificar?

[ ] LIMPIEZA PROFUNDA
    Eliminar contactos inactivos por >12 meses
    (o moverlos a archivo separado)
    Revisar compliance con GDPR/CCPA

[ ] ACTUALIZACION DE PLANTILLAS
    Revisar cada plantilla de mensaje
    Actualizar lenguaje segun cambios de marca
    Testear con diferentes variaciones
```

---

## FASE 9 — METRICAS Y UMBRALES

### 9.1 Metricas clave del CRM

**Metricas de velocidad (las mas importantes):**

```
TIEMPO DE PRIMERA RESPUESTA:
  Objetivo: < 5 minutos (95% de los leads)
  Saludable: < 10 minutos promedio
  Alarma: > 15 minutos promedio
  Critico: > 60 minutos promedio
  
  Calculo: (tiempo_primer_contacto - tiempo_lead_creado) en minutos
  Herramienta: custom field "response_time_seconds" + report

TASA DE CONTACTO:
  Objetivo: > 95% de leads contactados (automatica o manualmente)
  Saludable: > 90%
  Alarma: 80-89%
  Critico: < 80%
  
  Calculo: (leads_contactados / total_leads) × 100
  Si < 90%: el workflow 1 no esta disparando correctamente

TASA DE CONVERSACION:
  Objetivo: > 40% de leads contactados responden
  Saludable: > 30%
  Alarma: 20-29%
  Critico: < 20%
  
  Calculo: (leads_respondieron / leads_contactados) × 100
  Si < 20%: el primer mensaje no genera interes
  Accion: iterar el copy del primer mensaje

TASA DE CIERRE:
  Objetivo: > 20% de leads que llegaron a propuesta cierran
  Saludable: > 15%
  Alarma: 10-14%
  Critico: < 10%
  
  Calculo: (cerrados_ganados / leads_con_propuesta) × 100
  Si < 10%: problema en el cierre — trabajar con ventas-atencion
```

**Metricas de volumen:**

```
LEADS RECIBIDOS POR SEMANA
LEADS POR FUENTE (Meta, Google, TikTok, Organico, Referido)
CLIENTES CERRADOS POR SEMANA
REVENUE GENERADO POR MES
COSTO POR LEAD (CPL): inversion_ads / total_leads
COSTO POR CLIENTE (CPA): inversion_ads / clientes_cerrados
LIFETIME VALUE (LTV) POR CLIENTE
RATIO LTV:CAC
```

**Metricas de salud del pipeline:**

```
PIPELINE VELOCITY:
  Cuantos dias promedio un lead pasa en el pipeline de entrada a cierre
  Objetivo: minimizar

SALUD POR ETAPA:
  Numero de leads en cada etapa
  Tiempo promedio en cada etapa
  Leads estancados > 7 dias en una etapa = problema

CONVERSION RATE POR ETAPA:
  Ya descrito arriba
```

### 9.2 Cuando actuar

```
ALERTAS CRITICAS:

TIEMPO DE PRIMERA RESPUESTA > 15 MIN:
  Causa posible: workflow 1 roto
  Accion:
  1. Verificar workflow 1 esta ENABLED
  2. Test con lead de prueba
  3. Revisar logs de N8N
  4. Escalar a n8n-automatizacion si persiste

TASA DE CONTACTO < 90%:
  Causa: leads no disparando workflow
  Accion:
  1. Revisar trigger del workflow 1
  2. Verificar integraciones de canales (Meta, Google)
  3. Test de webhook

TASA DE CONVERSACION < 20%:
  Causa: primer mensaje no genera respuesta
  Accion:
  1. Iterar el copy del primer mensaje
  2. A/B test de 2-3 variantes
  3. Analizar idioma, tono, pregunta final
  4. Consultar con director-creativo

TASA DE CIERRE < 10%:
  Causa: problema en el proceso de cierre
  Accion:
  1. Reunion con ventas-atencion
  2. Auditar conversaciones que no cerraron
  3. Identificar objeciones comunes
  4. Crear respuestas a esas objeciones
  5. Training al vendedor humano

PIPELINE STUCK:
  >10 leads en "Contactado" sin movimiento por > 7 dias
  Accion:
  1. Ejecutar cleanup
  2. Mover a "Cerrado Perdido" con tag
  3. Investigar por que no avanzan
```

---

## FASE 10 — REPORTE SEMANAL AL CLIENTE

### 10.1 Template del reporte

**Enviar cada LUNES al cliente via Gmail + WhatsApp con PDF adjunto.**

```markdown
# REPORTE SEMANAL CRM — {{cliente_nombre}}

**Semana del:** {{fecha_inicio}} al {{fecha_fin}}
**Preparado por:** Addendo Growth Partner

---

## 📊 RESUMEN EJECUTIVO

| Metrica | Esta semana | Semana anterior | Cambio |
|---------|-------------|-----------------|--------|
| Leads recibidos | {{N}} | {{N}} | {{+/-%}} |
| Leads contactados | {{N}} ({{%}}) | {{N}} ({{%}}) | {{+/-}} |
| Conversaciones activas | {{N}} | {{N}} | {{+/-}} |
| Citas agendadas | {{N}} | {{N}} | {{+/-%}} |
| Clientes cerrados | {{N}} | {{N}} | {{+/-%}} |
| Revenue generado | ${{monto}} | ${{monto}} | {{+/-%}} |

**Tiempo promedio de primera respuesta:** {{X}} minutos (objetivo: <5 min) {{✅ o ⚠️}}

---

## 📈 LEADS POR FUENTE

| Fuente | Leads | % del total |
|--------|-------|-------------|
| Meta Ads | {{N}} | {{%}} |
| Google Ads | {{N}} | {{%}} |
| TikTok Ads | {{N}} | {{%}} |
| Web organico | {{N}} | {{%}} |
| Referidos | {{N}} | {{%}} |
| Otros | {{N}} | {{%}} |

**Fuente mas productiva:** {{fuente}}
**Costo por lead promedio:** ${{monto}}

---

## 🎯 ESTADO DEL PIPELINE

### Pipeline "Leads Nuevos":
| Etapa | Leads actuales | Cambio |
|-------|---------------|--------|
| Nuevo Lead | {{N}} | {{+/-}} |
| Contactado | {{N}} | {{+/-}} |
| En Conversacion | {{N}} | {{+/-}} |
| Cita Agendada | {{N}} | {{+/-}} |
| Propuesta Enviada | {{N}} | {{+/-}} |
| Negociacion | {{N}} | {{+/-}} |
| Cerrado Ganado ✅ | {{N}} esta semana | {{+/-}} |
| Cerrado Perdido ❌ | {{N}} esta semana | {{+/-}} |

---

## 📅 CITAS DE LA SEMANA

**Total agendadas:** {{N}}
**Total realizadas:** {{N}}
**No-shows:** {{N}} ({{%}})
**Re-agendadas:** {{N}}

**Resultado de las citas realizadas:**
- Avanzaron a propuesta: {{N}}
- Requieren seguimiento: {{N}}
- No calificaron: {{N}}

---

## 💰 CIERRES DE LA SEMANA

{{Si hay cierres, listar:}}

1. **{{Nombre Cliente 1}}** — {{servicio}} — ${{monto}}
2. **{{Nombre Cliente 2}}** — {{servicio}} — ${{monto}}
3. ...

**Total revenue esta semana:** ${{monto}}

---

## 🔍 INSIGHTS DE LA SEMANA

**Lo que funciona:**
- {{insight 1}}
- {{insight 2}}

**Areas de oportunidad:**
- {{area 1}} — recomendacion: {{accion}}
- {{area 2}} — recomendacion: {{accion}}

**Alertas:**
{{Si hay alertas criticas:}}
⚠️  {{descripcion}}

{{Si no hay:}}
✅ Todo funcionando correctamente

---

## 📋 ACCIONES TOMADAS POR ADDENDO

1. {{accion 1}}
2. {{accion 2}}
3. {{accion 3}}

---

## 🎯 PLAN PROXIMA SEMANA

1. {{plan 1}}
2. {{plan 2}}
3. {{plan 3}}

---

## ❓ NECESITAMOS DE TI

{{Si hay cosas que el cliente debe hacer:}}

- [ ] {{accion del cliente 1}}
- [ ] {{accion del cliente 2}}

---

*Reporte generado por agente GHL CRM de Addendo Growth Partner*
*Proximo reporte: {{proximo_lunes}}*
*Preguntas: responder a este email o WhatsApp a {{numero_director_cuenta}}*
```

### 10.2 Envio automatizado

```
WORKFLOW N8N: "Addendo — GHL Reporte Semanal Cliente"

Trigger: Schedule Cron "0 9 * * 1" (lunes 9am)

Flujo:
  1. Para cada cliente activo:
  2. GHL API: extraer metricas de la semana
     - Leads por fuente
     - Estado del pipeline
     - Citas
     - Cierres
  3. Calcular diferencias vs semana anterior
  4. Claude API: generar insights y recomendaciones
  5. Generate PDF del reporte
  6. Gmail: enviar a email del cliente + admin@addendo.io
  7. WhatsApp: enviar mensaje corto con link al PDF
  8. Google Drive: guardar copia en /Clientes/{{cliente}}/reportes/
```

---

## FASE 11 — INTEGRACION VIA API CON N8N

### 11.1 Credenciales

```yaml
credential_name: "GHL API Addendo"
credential_type: "httpHeaderAuth"
base_url: "https://services.leadconnectorhq.com"
api_version: "2021-07-28"
scopes_configured: 137

headers:
  Authorization: "Bearer {{access_token}}"
  Version: "2021-07-28"
  Content-Type: "application/json"
```

### 11.2 Endpoints mas usados

**CONTACTS:**

```
POST /contacts/
  Crear nuevo contacto desde lead
  Body:
  {
    "locationId": "{{sub_account_id}}",
    "firstName": "Juan",
    "lastName": "Perez",
    "email": "juan@example.com",
    "phone": "+1234567890",
    "source": "Meta Ads",
    "tags": ["new_lead", "campana_amarres"],
    "customFields": [
      {"id": "service_interest", "value": "Amarre de Amor"},
      {"id": "utm_source", "value": "facebook"},
      {"id": "campaign_name", "value": "LA-Leads-Amarres-Coldness"}
    ]
  }
  Response: { contact: { id, ... } }

GET /contacts/{id}
  Obtener detalles del contacto

PUT /contacts/{id}
  Actualizar datos del contacto
  Body: { firstName, email, tags, customFields }

DELETE /contacts/{id}
  Eliminar contacto (usar con cuidado)

POST /contacts/upsert
  Crear O actualizar (evita duplicados)
  Body similar a POST /contacts/
```

**OPPORTUNITIES (Pipeline):**

```
POST /opportunities/
  Crear oportunidad en pipeline
  Body:
  {
    "locationId": "{{sub_account_id}}",
    "pipelineId": "{{pipeline_id}}",
    "pipelineStageId": "{{stage_id}}",
    "name": "Opportunity name",
    "contactId": "{{contact_id}}",
    "monetaryValue": 500,
    "status": "open"
  }

GET /opportunities/search
  Buscar oportunidades con filtros
  Query: pipelineId, stageId, contactId, dateRange

PUT /opportunities/{id}/status
  Mover entre etapas
  Body:
  {
    "pipelineStageId": "{{new_stage_id}}",
    "status": "open" | "won" | "lost" | "abandoned"
  }

PUT /opportunities/{id}
  Actualizar datos de la oportunidad
```

**CONVERSATIONS (mensajes):**

```
POST /conversations/messages
  Enviar mensaje (WhatsApp, SMS, Email)
  Body:
  {
    "type": "WhatsApp" | "SMS" | "Email",
    "contactId": "{{contact_id}}",
    "message": "Texto del mensaje",
    "templateId": "{{template_id}}" // opcional
  }

GET /conversations/{contactId}
  Obtener historial de conversacion con un contacto

GET /conversations/search
  Buscar conversaciones con filtros
```

**APPOINTMENTS (Calendario):**

```
POST /calendars/events
  Crear cita
  Body:
  {
    "calendarId": "{{calendar_id}}",
    "contactId": "{{contact_id}}",
    "startTime": "2026-04-15T14:00:00Z",
    "endTime": "2026-04-15T14:30:00Z",
    "title": "Consulta inicial",
    "notes": "Lead de Meta Ads"
  }

GET /calendars/events/appointments
  Obtener citas con filtros
  Query: calendarId, contactId, dateRange

PUT /calendars/events/{id}
  Actualizar cita
```

**WORKFLOWS:**

```
POST /contacts/{contactId}/workflow/{workflowId}
  Inscribir contacto en workflow
  Body:
  {
    "eventStartTime": "2026-04-11T10:00:00Z"
  }

DELETE /contacts/{contactId}/workflow/{workflowId}
  Remover contacto de workflow

GET /workflows
  Listar todos los workflows de la sub-cuenta
```

**CALENDARS:**

```
GET /calendars
  Listar calendarios

POST /calendars
  Crear calendario

GET /calendars/{id}/free-slots
  Obtener slots disponibles
  Query: startDate, endDate, timezone
```

**CUSTOM FIELDS:**

```
GET /locations/{locationId}/customFields
  Listar custom fields

POST /locations/{locationId}/customFields
  Crear custom field
```

**FORMS:**

```
GET /forms/
  Listar formularios

GET /forms/submissions
  Obtener submissions
  Query: formId, dateRange
```

### 11.3 Workflows N8N disponibles

```
WORKFLOW 1: "Addendo — Sync Meta Lead Ads a GHL"
  Trigger: Webhook from Meta Business
  Logica:
    1. Recibir lead de Meta
    2. Transformar campos al formato de GHL
    3. POST /contacts/ (o upsert)
    4. POST /opportunities/ en "Leads Nuevos"
    5. El workflow 1 de GHL se dispara automaticamente

WORKFLOW 2: "Addendo — Sync Google Lead Forms a GHL"
  Trigger: Webhook from Google Ads
  Logica similar al anterior

WORKFLOW 3: "Addendo — Sync Web Form a GHL"
  Trigger: Webhook desde sitio web (frontend-dev config)
  Logica:
    1. Validar datos del formulario
    2. Enriquecer con UTMs y datos de sesion
    3. POST /contacts/
    4. Responder al sitio con success

WORKFLOW 4: "Addendo — Alerta Lead Sin Contacto 48h"
  Trigger: Schedule daily 9am
  Logica:
    1. GET opportunities en stage "Contactado" > 48h
    2. Filtrar sin respuesta del lead
    3. Alerta a Jose via WhatsApp
    4. Alerta a director-cuenta del cliente

WORKFLOW 5: "Addendo — Pipeline Export Semanal a Sheets"
  Trigger: Schedule lunes 6am
  Logica:
    1. Para cada cliente, GET pipeline snapshot
    2. Calcular metricas semanales
    3. Export a Google Sheets del cliente
    4. Alimenta dashboards de Looker Studio

WORKFLOW 6: "Addendo — Detect Review Request Response"
  Trigger: Schedule daily 10am
  Logica:
    1. Verificar si clientes que recibieron review request dejaron resena
    2. Actualizar status en GHL
    3. Si dejo resena positiva: WhatsApp de agradecimiento
    4. Si dejo resena negativa: alertar a director-cuenta

WORKFLOW 7: "Addendo — Auto Backup Contacts"
  Trigger: Schedule domingo 3am
  Logica:
    1. Para cada cliente, GET todos los contactos
    2. Export a CSV
    3. Subir a Google Drive del cliente
    4. Mantener 12 semanas de historial

WORKFLOW 8: "Addendo — Reactivation 30 days"
  Trigger: Schedule daily 8am
  Logica:
    1. Buscar contactos con tag "re_activate_30_days" cuya fecha llego
    2. Export a Instantly.ai para secuencia de email frio
    3. Actualizar tag a "in_reactivation"
```

### 11.4 Rate limits y manejo de errores

```
GHL API LIMITS:
  - 100 requests per 10 seconds per location
  - 10,000 requests per day per location
  - Webhook rate: ilimitado

HEADERS DE RESPUESTA:
  X-RateLimit-Limit
  X-RateLimit-Remaining
  X-RateLimit-Reset

MANEJO EN N8N:
  retryOnFail: true
  maxTries: 5
  waitBetweenTries: 2000
  
  Si recibe 429 (rate limit): exponential backoff
  Si recibe 401: refrescar access token
  Si recibe 404: logging y continuar
  Si recibe 5xx: alerta a admin

LOGGING OBLIGATORIO:
  Todas las operaciones en Google Drive:
  /Addendo/Clientes/{{cliente}}/ghl-logs/{{fecha}}.json
```

---

## REGLAS MAESTRAS DEL SKILL

1. **Primera respuesta en menos de 5 minutos. No es negociable.**

2. **El CRM es el sistema nervioso central.** Todo pasa por GHL.

3. **La automatizacion prepara la relacion, el humano la cierra.**

4. **Cada cliente tiene su propia sub-cuenta bajo Addendo.** Nunca mezclar.

5. **Pipeline refleja el proceso real del cliente.** No plantillas genericas.

6. **Workflow 1 (Respuesta Inmediata) es el mas importante.** Configurar antes de lanzar ads.

7. **Minimo 4 workflows obligatorios:** Respuesta Inmediata, Nurturing 7 dias, Confirmacion de Cita, Solicitud de Resena.

8. **Campos personalizados documentados desde dia 1.** Con validacion.

9. **Primer mensaje WhatsApp: maximo 3 lineas, personalizado, pregunta al final.**

10. **Calendario sincronizado con Google Calendar del cliente.**

11. **Integracion con Meta, Google, TikTok obligatoria desde dia 1.**

12. **Limpieza semanal del pipeline.** Leads estancados se mueven.

13. **Backup semanal de contactos.** Los datos del cliente son su activo.

14. **Metricas de velocidad son las mas importantes.** Tiempo de respuesta < 5 min objetivo.

15. **Tasa de contacto > 95% o el workflow esta roto.** Investigar inmediatamente.

16. **Reporte semanal al cliente cada lunes.** Con metricas en lenguaje de negocio.

17. **A2P 10DLC registration en USA.** Obligatorio para SMS y WhatsApp compliance.

18. **DKIM, SPF, DMARC para email.** Sin esto, los emails van a spam.

19. **API via N8N con 137 scopes.** Automatizar todo lo repetitivo.

20. **Rate limits respetados.** Backoff exponencial en errores 429.

21. **Compliance GDPR/CCPA/LGPD.** Respetar unsubscribe siempre.

22. **Datos del cliente son del cliente.** Al terminar contrato, exportar y entregar.

23. **Nunca contactar al cliente directamente sin autorizacion.** Es rol de director-cuenta.

24. **Leads cerrados ganados notifican al project-manager.** Para iniciar onboarding.

25. **El CRM sin limpieza es un cementerio de leads.** Mantenimiento continuo obligatorio.
