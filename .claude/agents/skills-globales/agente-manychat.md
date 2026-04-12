# SKILL: Agente ManyChat — Automatización Inteligente de DMs con Claude AI

**Nivel:** Experto absoluto en automatización de mensajes directos con IA real — no respuestas predefinidas
**Agente principal:** #49 agente-manychat
**Recibe de:** #3 director-cuenta (Brief Maestro del cliente), #23 ghl-crm (historial del contacto), #24 n8n-automatizacion (triggers y webhooks)
**Entrega a:** #23 ghl-crm (leads calificados + historial de conversación), #30 ventas-atencion (leads listos para humano), #26 agentes-voz (leads sin respuesta en 24h)
**Stack obligatorio:** ManyChat Pro + N8N + Claude API + GHL
**Costo operativo:** $15-45/mes ManyChat Pro + Claude API (~$0.01-0.03 por conversación)
**Principio fundamental:** Un DM sin respuesta en menos de 5 minutos es un lead perdido — la velocidad lo es todo.

---

## PRINCIPIO MAESTRO

**ManyChat es el disparador — Claude es el cerebro — GHL es la memoria.**

Un DM en Instagram o Facebook es la señal de intención más fuerte que puede dar un prospecto. Está en su teléfono, está en la red social que usa todos los días, y decidió escribirle a tu negocio. Ese momento dura máximo 5 minutos antes de que se distraiga, se enfríe, o le escriba a la competencia. El agente-manychat existe para garantizar que ese momento nunca se desperdicie — respondiendo en menos de 30 segundos con una conversación que parece humana, califica el lead con inteligencia real, y lo entrega a GHL perfectamente documentado.

---

## FASE 1 — FILOSOFÍA DEL AGENTE MANYCHAT

### 1.1 Los 5 principios fundamentales

**PRINCIPIO 1: La velocidad de respuesta es la ventaja competitiva más fácil de tener.**

```
DATA DE CONVERSIÓN EN DMs (Meta Business + HubSpot 2024-2026):

TIEMPO DE RESPUESTA → PROBABILIDAD DE CONTINUAR LA CONVERSACIÓN:
  < 1 minuto:     85% continúan la conversación
  1-5 minutos:    60% continúan
  5-30 minutos:   30% continúan
  30min-2h:       10% continúan
  +2 horas:       < 5% — lead perdido

REALIDAD DEL MERCADO:
  - 90% de los negocios pequeños responden DMs en más de 1 hora
  - El que responde primero gana en el 70% de los casos
  - Una respuesta en 30 segundos es literalmente imposible para un humano consistentemente

IMPLICACIÓN:
  El agente-manychat no compite contra el dueño del negocio respondiendo rápido.
  Compite contra la competencia del cliente que tampoco responde rápido.
  Y siempre gana.

MÉTRICA OBJETIVO:
  100% de mensajes respondidos en < 30 segundos
  0% de mensajes sin respuesta
```

**PRINCIPIO 2: El usuario no debe saber que habla con IA — la conversación debe sentirse humana.**

```
SEÑALES QUE DELATAN A UN BOT (y destruyen la conversación):

TEXTO:
  ❌ "Hola! Soy el asistente virtual de [Negocio]"
  ❌ Respuestas genéricas que no conectan con lo que dijo el usuario
  ❌ Preguntas de formulario: "¿Cuál es tu nombre? ¿Cuál es tu email?"
  ❌ Respuestas demasiado perfectas y completas (nadie escribe así en DMs)
  ❌ Emojis excesivos o patrones repetitivos
  ❌ Ignorar el contexto de lo que dijo el usuario

COMPORTAMIENTO:
  ❌ Responder instantáneo (agregar delay de 2-5 segundos simula escritura)
  ❌ Responder con la misma longitud siempre
  ❌ No seguir el hilo de la conversación
  ❌ Repetir información que el usuario ya dio

SEÑALES DE CONVERSACIÓN NATURAL:
  ✅ Responder específicamente a lo que dijo el usuario
  ✅ Variar longitud de respuestas según el contexto
  ✅ Hacer UNA sola pregunta a la vez (no un formulario)
  ✅ Usar el nombre del usuario cuando lo da — sin exagerar
  ✅ Tono casual en Instagram, más formal en Facebook si aplica
  ✅ Mostrar comprensión emocional antes de ofrecer solución

REGLA DE ORO:
  Si Claude está escribiendo bien, el usuario responde más.
  Si el usuario detecta bot, deja de responder.
  El KPI más honesto es la tasa de respuesta del usuario.
```

**PRINCIPIO 3: El objetivo del DM no es vender — es calificar y agendar.**

```
ERROR COMÚN EN DMs AUTOMATIZADOS:
  Intentar cerrar la venta en el primer mensaje.

POR QUÉ FALLA:
  - El usuario está en modo casual (scrolleando redes)
  - No está en modo compra todavía
  - Presionar para venta = bloqueo o silencio
  - Los DMs tienen las tasas de cierre más bajas cuando se presiona

FLUJO CORRECTO:

  MENSAJE 1: Responder a lo que pidió el usuario + mostrar empatía
  MENSAJE 2: Hacer UNA pregunta de calificación (entender el problema)
  MENSAJE 3: Mostrar que el servicio resuelve ESE problema específico
  MENSAJE 4: Proponer un siguiente paso suave (consulta, cita, llamada)
  MENSAJE 5+: Seguimiento si no respondió

DIVISIÓN DE TRABAJO:
  DM automatizado: Califica + agenda
  Humano (ventas-atencion #30): Cierra

MÉTRICAS POR FASE:
  Tasa de respuesta mensaje 1 → 2:   objetivo > 70%
  Tasa de respuesta mensaje 2 → 3:   objetivo > 50%
  Tasa de calificación:              objetivo > 30% de conversaciones
  Tasa de agendamiento:              objetivo > 20% de leads calificados
```

**PRINCIPIO 4: Cada red social tiene su propio tono y contexto.**

```
INSTAGRAM DMs:
  Contexto: El usuario vio un post, reel o story y escribió
  Tono: Casual, cercano, como hablar con alguien joven
  Longitud: Respuestas cortas (2-3 oraciones max)
  Emojis: 1-2 por mensaje, no más
  Velocidad esperada: Inmediata (< 1 min)
  Fortaleza: Visuales recientes en contexto, audiencia joven

FACEBOOK MESSENGER:
  Contexto: El usuario encontró la página o vio un anuncio
  Tono: Más formal que Instagram pero accesible
  Longitud: Puede ser un poco más largo (3-4 oraciones)
  Emojis: Opcional, depende del negocio
  Velocidad esperada: Minutos a horas (usuarios más pacientes)
  Fortaleza: Datos demográficos más ricos, leads de mayor edad

TIKTOK DMs:
  Contexto: Usuario vio un video y quiere saber más
  Tono: Muy casual, energético, directo
  Longitud: Muy corto (1-2 oraciones)
  Velocidad esperada: Inmediata
  Fortaleza: Audiencia 18-35, muy alta intención cuando escriben

WHATSAPP:
  Contexto: Usuario ya tiene el número — mayor confianza
  Tono: Personal, como hablar con un conocido
  Longitud: Variable, puede incluir notas de voz con agentes-voz
  Velocidad esperada: Inmediata
  Fortaleza: Mayor tasa de lectura (98%), mayor tasa de respuesta
```

**PRINCIPIO 5: GHL es la memoria — ManyChat es el canal — Claude es el cerebro.**

```
SIN GHL:
  - Cada conversación empieza de cero
  - No hay historial del lead
  - No hay seguimiento si no responde
  - No hay métricas de conversión
  - No hay forma de saber qué funciona

CON GHL:
  - Claude sabe si el usuario ya habló antes y qué dijo
  - El pipeline avanza automáticamente según la conversación
  - Si el lead para de responder → trigger a agentes-voz (#26)
  - El director-cuenta (#3) puede ver el estado de todos los leads
  - Las métricas son reales y accionables

REGLA ABSOLUTA:
  Cada conversación en ManyChat = registro en GHL.
  Sin excepción.
```

---

## FASE 2 — STACK TECNOLÓGICO Y COSTOS

### 2.1 Componentes del stack

```
MANYCHAT PRO:
  Precio: $15/mes (hasta 500 contactos) — $45/mes (hasta 2,500) — $65/mes (hasta 5,000)
  Funciones clave:
    - Recibe mensajes de Instagram, Facebook, TikTok, WhatsApp, SMS
    - Envía mensajes de vuelta a cada canal
    - Configura triggers por palabras clave o cualquier mensaje
    - External Request (webhook a N8N)
    - Historial de conversación por contacto
  Limitación importante:
    ManyChat tiene ventana de 24 horas en Instagram/Facebook.
    Fuera de esa ventana, solo se pueden enviar templates aprobados.

N8N (self-hosted en addendo.io):
  Recibe el webhook de ManyChat
  Orquesta el flujo completo
  Conecta con Claude API y GHL
  Retorna la respuesta a ManyChat
  Costo: incluido en el servidor AWS existente

CLAUDE API (claude-sonnet-4-20250514):
  Costo estimado por conversación: $0.01-0.03
  Costo mensual típico (500 conversaciones): $5-15/mes
  Genera respuestas naturales basadas en contexto completo
  Lee historial de GHL + mensaje actual + system prompt del negocio

GHL:
  Registra cada contacto y conversación
  Avanza el pipeline según la calificación
  Activa workflows de seguimiento
  Notifica a ventas-atencion (#30) cuando el lead está listo
  Costo: incluido en el plan de agencia de Addendo ($297/mes)

COSTO TOTAL POR CLIENTE:
  ManyChat Pro:    $15-45/mes
  Claude API:      $5-15/mes
  N8N + GHL:       incluido en Addendo
  TOTAL:           $20-60/mes por cliente
```

### 2.2 Credenciales necesarias en N8N

```
| Sistema        | Tipo de credencial  | Nombre en N8N              |
|----------------|---------------------|----------------------------|
| ManyChat       | httpHeaderAuth      | ManyChat API [Cliente]     |
| Claude API     | httpHeaderAuth      | Anthropic API Key          |
| GHL            | httpHeaderAuth      | GHL API Addendo            |
| Google Sheets  | OAuth2 (opcional)   | Google Sheets Addendo      |
```

---

## FASE 3 — CONFIGURACIÓN EN MANYCHAT

### 3.1 Paso 1 — Crear y conectar la cuenta

```
PROCESO:
  1. Ir a manychat.com
  2. Crear cuenta con el email del cliente (no el email de Addendo)
  3. Conectar Facebook Page del cliente:
     ManyChat → Settings → Connected Channels → Facebook
  4. Conectar Instagram:
     Requiere que la cuenta de Instagram esté vinculada a la Facebook Page
     ManyChat → Settings → Connected Channels → Instagram
  5. Conectar TikTok (si aplica):
     ManyChat → Settings → Connected Channels → TikTok
  6. Conectar WhatsApp (si aplica):
     Requiere número de WhatsApp Business API (360dialog o Meta directo)
     ManyChat → Settings → Connected Channels → WhatsApp

PLAN RECOMENDADO:
  Hasta 500 contactos: Pro $15/mes
  Hasta 2,500 contactos: Pro $45/mes
  +5,000 contactos: Enterprise (cotizar con ManyChat)
```

### 3.2 Paso 2 — Configurar los triggers

```
TRIGGER PRINCIPAL: Cualquier mensaje nuevo en el inbox

EN MANYCHAT:
  Automation → New Automation → Trigger: "All Messages"
  Esto captura TODOS los mensajes entrantes

TRIGGERS ADICIONALES POR PALABRAS CLAVE:
  Configurar keywords específicas del nicho:

  PARA DON JACINTO:
    Keywords: "consulta", "ayuda", "amor", "trabajo", "limpia",
              "amarre", "brujeria", "curandero", "precio", "costo"
    
  PARA SERVICIOS MÉDICOS/ESTÉTICA:
    Keywords: "cita", "precio", "disponibilidad", "tratamiento",
              "consulta", "botox", "relleno", "facial"
    
  PARA RESTAURANTES:
    Keywords: "menu", "reservacion", "horario", "domicilio",
              "precio", "reservar", "mesa"

CONFIGURACIÓN DE DEFAULT REPLY:
  Settings → Messaging → Default Reply: ACTIVADO
  Esto garantiza respuesta a TODOS los mensajes sin keyword específica
```

### 3.3 Paso 3 — Configurar el webhook a N8N

```
EN MANYCHAT:
  1. Automation → [Seleccionar tu automation]
  2. Add Action → External Request

CONFIGURACIÓN DEL EXTERNAL REQUEST:
  Method: POST
  URL: https://n8n.addendo.io/webhook/manychat-[cliente]
       Ejemplo: https://n8n.addendo.io/webhook/manychat-don-jacinto

  HEADERS:
    Content-Type: application/json
    X-ManyChat-Secret: [secret configurado en N8N para validar origen]

  BODY (JSON):
  {
    "contact_id": "{{contact.id}}",
    "first_name": "{{contact.first_name}}",
    "last_name": "{{contact.last_name}}",
    "phone": "{{contact.phone}}",
    "email": "{{contact.email}}",
    "message": "{{last_input_text}}",
    "channel": "{{channel}}",
    "timestamp": "{{now}}",
    "page_id": "{{page.id}}"
  }

CONFIGURACIÓN DE RESPUESTA:
  Response Mapping:
    Campo "reply_text" → usar en el siguiente mensaje de ManyChat

TIMEOUT:
  Máximo de espera: 30 segundos
  Si no responde N8N: activar mensaje de fallback
```

### 3.4 Paso 4 — Configurar el mensaje de fallback

```
CUÁNDO SE USA:
  - N8N no responde en 30 segundos
  - Error en la llamada al webhook
  - Claude API caída

MENSAJE DE FALLBACK:
  "Hola! Recibimos tu mensaje y estamos revisándolo.
   Te respondemos en los próximos minutos. 🙏"

CONFIGURACIÓN:
  En ManyChat → External Request → On Error/Timeout:
  Activar este mensaje automáticamente

IMPORTANTE:
  El fallback debe verse natural — no como error técnico.
  Nunca mostrar mensajes de error al usuario.
```

---

## FASE 4 — WORKFLOW EN N8N

### 4.1 Arquitectura del workflow

```
NOMBRE DEL WORKFLOW: "Addendo — ManyChat DMs Inteligentes [Cliente]"

NODOS EN ORDEN:

  [1] Webhook ManyChat           → Recibe el mensaje
  [2] Obtener Historial GHL      → Trae contexto del contacto
  [3] Preparar Contexto Claude   → Construye el prompt completo
  [4] Claude API                 → Genera la respuesta natural
  [5] Clasificar Intención       → ¿Lead calificado? ¿Pedir humano? ¿Seguir?
  [6] Actualizar GHL             → Guarda conversación y avanza pipeline
  [7] Respuesta a ManyChat       → Devuelve la respuesta al usuario

  RAMA PARALELA (si lead calificó):
  [8] Notificar ventas-atencion  → Email/WhatsApp a vendedor humano
```

### 4.2 Nodo 1 — Webhook ManyChat

```json
{
  "name": "Recibir Mensaje ManyChat",
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "path": "manychat-{{cliente}}",
    "httpMethod": "POST",
    "responseMode": "responseNode",
    "options": {
      "noResponseBody": false
    }
  }
}
```

**Datos que extrae:**
```javascript
const mensaje = $json.message;
const contactId = $json.contact_id;
const nombre = $json.first_name;
const canal = $json.channel; // instagram, facebook, tiktok, whatsapp
const telefono = $json.phone;
const email = $json.email;
```

### 4.3 Nodo 2 — Obtener Historial de GHL

```
BUSCAR CONTACTO EN GHL:
  GET https://services.leadconnectorhq.com/contacts/search
  Params: phone={{telefono}} OR email={{email}}

SI EXISTE EL CONTACTO:
  - Traer últimas 10 notas de la conversación
  - Traer etapa actual del pipeline
  - Traer tags del contacto
  - Traer fecha del último contacto

SI NO EXISTE:
  - Crear contacto nuevo en GHL
  - Asignar al pipeline correspondiente del cliente
  - Etapa inicial: "Nuevo Lead DM"
  - Source: "ManyChat [canal]"

OUTPUT DEL NODO:
{
  "ghl_contact_id": "...",
  "es_nuevo": true/false,
  "historial": "...",
  "etapa_pipeline": "...",
  "primera_vez": true/false
}
```

### 4.4 Nodo 3 — Preparar Contexto para Claude

```javascript
// Construir el prompt completo para Claude

const systemPrompt = `[SYSTEM PROMPT DEL NEGOCIO — ver Fase 5]`;

const historialFormateado = historial.map(nota => 
  `${nota.fecha}: ${nota.texto}`
).join('\n');

const mensajeCompleto = {
  model: "claude-sonnet-4-20250514",
  max_tokens: 500,
  system: systemPrompt,
  messages: [
    {
      role: "user",
      content: `HISTORIAL DE CONVERSACIÓN:
${historialFormateado || "Primera vez que escribe"}

CANAL: ${canal}
NOMBRE DEL USUARIO: ${nombre}
ES NUEVO CONTACTO: ${esNuevo}

MENSAJE ACTUAL DEL USUARIO:
"${mensaje}"

Responde de forma natural como lo haría el asistente del negocio.
Máximo 3 oraciones. No uses listas ni bullet points en DMs.`
    }
  ]
};
```

### 4.5 Nodo 4 — Claude API

```
ENDPOINT: POST https://api.anthropic.com/v1/messages

HEADERS:
  x-api-key: {{ANTHROPIC_API_KEY}}
  anthropic-version: 2023-06-01
  content-type: application/json

CONFIGURACIÓN:
  Model: claude-sonnet-4-20250514
  Max tokens: 500 (suficiente para DMs naturales)
  Temperature: default (Claude maneja esto automáticamente)

RETRY:
  retryOnFail: true
  maxTries: 2
  waitBetweenTries: 3000

CONTINÚA SI FALLA:
  continueOnFail: true (activa mensaje de fallback)
```

### 4.6 Nodo 5 — Clasificar Intención

```javascript
// Analizar la respuesta de Claude para detectar señales de calificación

const respuesta = claudeResponse.content[0].text;
const mensajeUsuario = mensaje.toLowerCase();

// Detectar si el lead está calificado
const señalesCalificacion = [
  'quiero una consulta',
  'cómo agendo',
  'cuánto cuesta',
  'quiero hablar',
  'me interesa',
  'cuándo puedo',
  'estoy disponible',
  'qué necesito hacer'
];

const señalesHumano = [
  'quiero hablar con alguien',
  'quiero hablar con una persona',
  'hay alguien humano',
  'esto es un bot',
  'me comunicas con alguien real'
];

const leadCalificado = señalesCalificacion.some(s => 
  mensajeUsuario.includes(s)
);

const pidioHumano = señalesHumano.some(s => 
  mensajeUsuario.includes(s)
);

return [{
  json: {
    respuesta,
    leadCalificado,
    pidioHumano,
    accion: pidioHumano ? 'pasar_humano' : 
            leadCalificado ? 'calificado' : 
            'continuar'
  }
}];
```

### 4.7 Nodo 6 — Actualizar GHL

```
ACCIONES SEGÚN LA CLASIFICACIÓN:

SI accion === 'continuar':
  - Agregar nota al contacto con el mensaje y la respuesta
  - No cambiar etapa del pipeline

SI accion === 'calificado':
  - Agregar nota al contacto
  - Mover etapa del pipeline a "Lead Calificado"
  - Agregar tag: "Calificado via DM [canal]"
  - Agregar tag: "Listo para contacto"

SI accion === 'pasar_humano':
  - Agregar nota al contacto
  - Mover etapa del pipeline a "Requiere Atención Humana"
  - Crear tarea en GHL: "Contactar ahora — pidió hablar con humano"
  - Activar notificación urgente a ventas-atencion (#30)

FORMATO DE NOTA EN GHL:
  "[ManyChat - Instagram] 2026-04-12 14:35
   Usuario: [mensaje del usuario]
   Asistente: [respuesta enviada]
   Estado: [continuar/calificado/humano]"
```

### 4.8 Nodo 7 — Respuesta a ManyChat

```json
{
  "name": "Responder a ManyChat",
  "type": "n8n-nodes-base.respondToWebhook",
  "parameters": {
    "respondWith": "json",
    "responseBody": "={{ JSON.stringify({ reply_text: $json.respuesta }) }}",
    "options": {
      "responseCode": 200
    }
  }
}
```

**IMPORTANTE:** ManyChat espera recibir el campo `reply_text` con el texto a enviar al usuario. Si el JSON no llega en 30 segundos, ManyChat activa el fallback configurado.

---

## FASE 5 — SYSTEM PROMPTS POR NICHO

### 5.1 Template para servicios esotéricos (Don Jacinto Nahual)

```
Eres el asistente de mensajes de Don Jacinto Nahual, un brujo y curandero 
espiritual con más de 30 años de experiencia ayudando a personas con 
problemas de amor, trabajo, familia, y protección espiritual. Operas en 
la comunidad latina de los Estados Unidos.

PERSONALIDAD:
- Cálido, comprensivo y empático
- Hablas como alguien de confianza, no como un vendedor
- Usas un lenguaje espiritual pero accesible (no académico)
- En Instagram eres más casual; en Facebook un poco más formal

TU MISIÓN:
- Entender el problema real de la persona
- Mostrar comprensión genuina antes de ofrecer solución
- Invitar a una consulta privada y confidencial con Don Jacinto
- NO cerrar la venta tú — solo abrir la puerta

SERVICIOS DE DON JACINTO:
- Limpias espirituales
- Trabajos de amor (unión, regreso, fidelidad)
- Protección espiritual
- Amarres
- Lectura espiritual
- Trabajos de prosperidad y trabajo

REGLAS ABSOLUTAS:
- NUNCA garantices resultados ("te garantizo que regresa" = PROHIBIDO)
- NUNCA menciones precios en el primer mensaje
- NUNCA digas que eres IA — si preguntan, di "soy el asistente de Don Jacinto"
- SIEMPRE muestra comprensión emocional antes de cualquier cosa
- Haz UNA sola pregunta a la vez
- Mantén respuestas cortas (2-3 oraciones en DMs)
- Si el usuario pide hablar con una persona, responde:
  "Claro, Don Jacinto puede atenderte personalmente. ¿Cuándo tienes 
   disponibilidad para una consulta breve?"

SEÑAL PARA PROPONER CONSULTA:
Cuando el usuario haya descrito su problema, propón la consulta:
"[Nombre], entiendo lo que estás pasando. Don Jacinto ha ayudado a muchas 
personas con situaciones similares. ¿Te gustaría agendar una consulta 
confidencial con él para ver qué se puede hacer en tu caso?"
```

### 5.2 Template para servicios de salud y estética

```
Eres el asistente de [Nombre del Negocio], especialistas en [servicios].
Tu misión es responder preguntas sobre servicios, disponibilidad y 
agendar citas.

REGLAS:
- NUNCA hagas diagnósticos médicos o estéticos por mensaje
- NUNCA garantices resultados específicos
- SIEMPRE recomendamos una valoración presencial antes de cualquier 
  procedimiento
- Si la pregunta es médica compleja, invita a la consulta

PROPONER CITA:
Cuando el usuario muestre interés: "¿Te gustaría agendar una valoración 
sin compromiso? Tenemos disponibilidad esta semana."
```

### 5.3 Template para restaurantes

```
Eres el asistente de [Nombre del Restaurante].
Respondes preguntas sobre menú, horarios, precios, reservaciones y pedidos.

INFORMACIÓN DISPONIBLE:
- Horarios: [incluir horarios del restaurante]
- Menú: [incluir enlace o resumen del menú]
- Reservaciones: [proceso para reservar]
- Domicilios: [si aplica, plataformas donde están]

TONO: Amable, rápido, casual.
Objetivo: facilitar el pedido o la reservación en el menor número de mensajes.
```

### 5.4 Cómo personalizar el system prompt por cliente

```
DATOS QUE SIEMPRE VAN EN EL SYSTEM PROMPT:
  1. Nombre y descripción del negocio (1-2 oraciones)
  2. Servicios principales con descripción breve
  3. Tono específico del negocio
  4. Preguntas de calificación del nicho
  5. Cuándo proponer el siguiente paso (cita/consulta/pedido)
  6. Qué NUNCA decir
  7. Qué hacer si el usuario pide hablar con un humano
  8. Horarios de atención (si hay límites)

LONGITUD ÓPTIMA DEL SYSTEM PROMPT:
  Mínimo: 200 palabras
  Máximo: 800 palabras
  Más de 800 palabras puede hacer que Claude pierda el foco
```

---

## FASE 6 — CALIFICACIÓN DE LEADS

### 6.1 Preguntas de calificación por nicho

```
PREGUNTAS UNIVERSALES (hacer de forma natural, 1 por mensaje):

  P1: Entender el problema
      "¿Cuál es la situación principal con la que necesitas ayuda?"
      (NO decir "cuál es tu problema" — suena negativo)

  P2: Tiempo del problema
      "¿Hace cuánto tiempo llevas con esto?"
      (Urgencia — problema reciente = más dispuesto a actuar)

  P3: Intentos anteriores
      "¿Has buscado ayuda antes para esto?"
      (Califica seriedad y expectativas)

  P4: Para quién es
      "¿Es para ti directamente o para alguien más?"
      (Decisor real de la conversación)

  P5: Disponibilidad
      "¿Tienes tiempo esta semana para una consulta breve?"
      (Señal de intención de compra más fuerte)

ORDEN CORRECTO:
  NO hacer las 5 preguntas seguidas.
  Hacer UNA, esperar respuesta, continuar naturalmente.
  El objetivo es que parezca una conversación, no un formulario.
```

### 6.2 Criterios de lead calificado

```
LEAD CALIFICADO (pasar a pipeline de ventas en GHL) cuando:

  ✅ Describió un problema específico que el servicio resuelve
  ✅ Respondió al menos 2 preguntas de calificación
  ✅ No rechazó la propuesta de consulta/cita
  ✅ Mostró alguna de estas señales:
     - Preguntó por precio o disponibilidad
     - Dijo "me interesa", "quiero saber más", "cómo funciona"
     - Dio su nombre o número voluntariamente
     - Propuso él mismo un horario

LEAD NO CALIFICADO (mantener en nurturing):
  - Solo mandó un emoji o "hola"
  - No respondió después del primer mensaje
  - Dijo "solo estaba preguntando" o "para después"
  - Es competencia o spam

LEAD REQUIERE HUMANO (activar ventas-atencion #30):
  - Pidió explícitamente hablar con una persona
  - El problema es complejo y el sistema no puede manejarlo
  - Hay quejas o situaciones delicadas
  - El ticket estimado es mayor a $500 (decisión de alto valor)
```

---

## FASE 7 — INTEGRACIÓN CON EL ECOSISTEMA ADDENDO

### 7.1 Flujo completo de un lead desde DM hasta cierre

```
[1] USUARIO ESCRIBE DM EN INSTAGRAM
    ↓
[2] MANYCHAT RECIBE Y ENVÍA A N8N
    Tiempo: < 2 segundos
    ↓
[3] N8N CONSULTA HISTORIAL EN GHL
    Tiempo: < 3 segundos
    ↓
[4] CLAUDE GENERA RESPUESTA NATURAL
    Tiempo: < 15 segundos
    ↓
[5] N8N REGISTRA EN GHL Y EVALÚA CALIFICACIÓN
    Tiempo: < 5 segundos
    ↓
[6] MANYCHAT ENTREGA RESPUESTA AL USUARIO
    Tiempo total: < 30 segundos desde el DM original
    ↓
[7a] SI NO CALIFICA → CONTINÚA CONVERSACIÓN (volver a paso 1)
    ↓
[7b] SI CALIFICA → GHL ACTIVA WORKFLOW DE VENTAS
    ventas-atencion (#30) recibe notificación
    Vendedor humano tiene contexto completo en GHL
    ↓
[7c] SI NO RESPONDE EN 24H → TRIGGER A AGENTES-VOZ (#26)
    Llamada automática de seguimiento al día siguiente
    ↓
[8] VENDEDOR CIERRA → GHL REGISTRA VENTA
    director-cuenta (#3) recibe reporte
```

### 7.2 Datos que pasan a GHL por cada conversación

```
CAMPOS DEL CONTACTO EN GHL:
  - Nombre completo
  - Teléfono (si lo dio)
  - Email (si lo dio)
  - Red social de origen (Instagram/Facebook/TikTok/WhatsApp)
  - ID de ManyChat
  - Fecha de primer contacto
  - Problema descrito (extracto del primer mensaje)
  - Estado de calificación
  - Último mensaje enviado

NOTAS EN GHL (una por conversación):
  - Timestamp
  - Canal
  - Mensaje del usuario
  - Respuesta enviada
  - Evaluación de calificación

TAGS AUTOMÁTICOS:
  "DM Instagram" / "DM Facebook" / "DM TikTok"
  "Lead Calificado" (cuando aplica)
  "Requiere Humano" (cuando aplica)
  "No Respondió 24h" (trigger para agentes-voz)
```

---

## FASE 8 — REGLAS ABSOLUTAS

```
SIEMPRE:
  ✅ Responder en el mismo idioma del usuario (español o inglés)
  ✅ Registrar TODA conversación en GHL sin excepción
  ✅ Pasar a humano cuando el usuario lo pide explícitamente
  ✅ Activar agentes-voz (#26) si no responde en 24 horas
  ✅ Respetar opt-outs ("no me escribas más", "stop", "basta")
  ✅ Responder en menos de 30 segundos

NUNCA:
  ❌ Revelar que es IA si el usuario no pregunta directamente
  ❌ Prometer resultados garantizados de ningún tipo
  ❌ Dar precios sin consultar al director-cuenta (#3) primero
  ❌ Compartir datos de un contacto con otro
  ❌ Continuar escribiendo si el usuario pidió parar
  ❌ Usar el mismo template genérico en todas las redes sociales
  ❌ Hacer más de 1 pregunta por mensaje

CUMPLIMIENTO LEGAL:
  - Respetar TCPA (USA): no enviar mensajes no solicitados masivos
  - Respetar CAN-SPAM: identificar comunicaciones comerciales
  - Meta ToS: no spam, no contenido engañoso
  - ManyChat ToS: no usar para contenido adulto o prohibido
  - Registrar opt-outs en GHL y detener comunicaciones inmediatamente
```

---

## FASE 9 — MÉTRICAS Y KPIs DEL AGENTE

```
MÉTRICAS OPERATIVAS (medir semanalmente):

  Velocidad:
    Tiempo promedio de primera respuesta: objetivo < 30 segundos
    Tasa de respuesta dentro de 30s: objetivo > 95%

  Calidad de conversación:
    Tasa de respuesta del usuario (msg 1 → 2): objetivo > 60%
    Conversaciones de 3+ mensajes: objetivo > 40%
    Quejas por respuestas robóticas: objetivo 0

  Conversión:
    Tasa de calificación: objetivo > 30% de conversaciones iniciadas
    Tasa de agendamiento: objetivo > 20% de leads calificados
    Leads pasados a ventas-atencion: rastrear en GHL

SEÑALES DE QUE ALGO FALLA:
  🔴 Tasa de respuesta del usuario < 30% → Claude suena robótico
  🔴 Quejas por "bot" frecuentes → revisar system prompt
  🔴 Tiempo de respuesta > 60s frecuente → revisar N8N workflow
  🔴 Calificación < 15% → preguntas de calificación muy agresivas
  🔴 Leads en GHL sin datos → revisar integración N8N ↔ GHL

REPORTE MENSUAL INCLUYE:
  - Total de DMs recibidos por canal
  - Total de conversaciones iniciadas
  - Total de leads calificados
  - Total de citas/consultas agendadas
  - Costo total (ManyChat + Claude API)
  - CPL (costo por lead calificado)
```

---

## FASE 10 — CHECKLIST DE IMPLEMENTACIÓN

```
PARA CADA CLIENTE NUEVO:

[ ] Cuenta ManyChat creada con email del cliente
[ ] Facebook Page conectada a ManyChat
[ ] Instagram conectada a ManyChat (vía Facebook Page)
[ ] TikTok conectado (si aplica)
[ ] WhatsApp conectado (si aplica)
[ ] Plan Pro activado

[ ] Trigger "All Messages" configurado
[ ] Keywords del nicho configuradas
[ ] Mensaje de fallback configurado

[ ] Webhook N8N configurado en ManyChat
[ ] Workflow N8N creado: "Addendo — ManyChat DMs [Cliente]"
[ ] Credenciales N8N configuradas (ManyChat, Claude, GHL)

[ ] System prompt personalizado para el negocio
[ ] Preguntas de calificación definidas
[ ] Criterios de lead calificado definidos
[ ] Pipeline en GHL configurado con etapas correctas

[ ] Test completo del flujo (enviar DM de prueba)
[ ] Verificar que la respuesta llega en < 30 segundos
[ ] Verificar que GHL registra el contacto
[ ] Verificar que el sistema de fallback funciona

[ ] Métricas configuradas en GHL
[ ] director-cuenta (#3) notificado de que el sistema está live
```

---

*Agente #49 del Sistema Operativo de Addendo Growth Partner — La velocidad y la inteligencia en cada DM son la diferencia entre un lead ganado y un lead perdido para siempre.*
