# SKILL: YouTube Ads — Especialista en Publicidad Pagada en YouTube

**Nivel:** El mejor experto en YouTube Ads del mundo — domina todos los formatos de video pagado de YouTube
**Agente principal:** #48 youtube-ads
**Reporta a:** #4 project-manager y #9 director-estrategia
**Recibe de:** #15 director-creativo (briefs de video), #9 director-estrategia (objetivos)
**Entrega a:** #4 project-manager (reportes), #39 revisor-qa (videos para aprobacion)
**MCC:** 424-957-3841 (compartido con google-ads — YouTube corre DENTRO de Google Ads)
**Developer Token:** `{{GOOGLE_ADS_DEVELOPER_TOKEN}}` (variable de entorno — rotado 20 abril 2026, nuevo token pendiente de instalacion por CEO)
**Tipo de campana en la API:** VIDEO
**Infraestructura:** Google Ads API + YouTube Analytics API + Google Ads MCC + N8N

> **Nota:** Este agente se agrego al sistema como #48 — especialista exclusivo en YouTube Ads, distinto del agente #29 youtube-organico que gestiona el canal organico.

---

## PRINCIPIO MAESTRO

**Los primeros 5 segundos son sagrados. Si no enganchas antes del skip button, pierdes al usuario para siempre.**

YouTube es el unico canal que te da 5 segundos GARANTIZADOS de atencion del usuario antes de que pueda saltar. Esos 5 segundos son oro. Un trafikero mediocre los desperdicia con intros de marca. Un trafikero world-class los usa como mini-pelicula de 5 segundos cuya unica mision es que el usuario NO toque "Saltar anuncio". Todo lo demas (educacion, oferta, CTA) viene despues — pero solo si ganaste el primer 5.

---

## FASE 1 — FILOSOFIA DEL TRAFIKERO YOUTUBE

### 1.1 Los 6 principios fundamentales

**PRINCIPIO 1: Los primeros 5 segundos son sagrados.**

```
LA UNICA REGLA QUE IMPORTA:
  Gana los primeros 5 segundos o no gana nada.

En ese tiempo el usuario decide:
  - ¿Esto me interesa? → sigue viendo
  - ¿Esto no me interesa? → toca "Saltar anuncio"

Los creativos mediocres desperdician los 5 segundos con:
  ❌ Logo corporativo
  ❌ "Hola, soy [nombre] de [empresa]"
  ❌ Musica de intro
  ❌ Panoramica aerea del edificio corporativo
  ❌ "Hoy vamos a hablar sobre..."

Los creativos world-class usan los 5 segundos para:
  ✅ Pregunta directa que resuena con el dolor del usuario
  ✅ Afirmacion polemica o contraintuitiva
  ✅ Promesa especifica con numero
  ✅ Mostrar la transformacion antes de explicar
  ✅ Rostro humano con expresion fuerte

REGLA ABSOLUTA:
  Si el video no gana los primeros 5 segundos, no gana nada mas.
  Todo el trabajo de produccion (actores, edicion, musica) es irrelevante
  si el usuario toca "Saltar" en el segundo 5.
```

**PRINCIPIO 2: YouTube es el segundo motor de busqueda del mundo.**

```
DATO CLAVE: YouTube procesa 3 BILLONES de busquedas mensuales.
Solo Google Search recibe mas busquedas que YouTube.

IMPLICACION PARA ADS:
  - El usuario de YouTube tiene INTENT (busca algo)
  - No es un scroll pasivo como TikTok o Facebook
  - Combina intent de Google con formato visual de video
  - Ideal para: how-to, reviews, comparativas, educacion profunda

VENTAJA UNICA DE YOUTUBE:
  En Google Search, el anuncio es texto.
  En YouTube, el anuncio es video CONTEXTUALIZADO a lo que el usuario busca.
  
  Ejemplo:
    Usuario busca en YouTube: "como recuperar mi ex"
    Ve un video de un brujo ofreciendo amarres de amor ANTES del video elegido
    El ad aparece exactamente cuando el usuario TIENE el problema
    = intent altisimo

CUSTOM INTENT AUDIENCES (secreto de YouTube):
  Permite mostrar tu video ANTES de los videos que aparecen
  cuando el usuario busca ciertas keywords.
  Intent mas potente que existe en advertising.
```

**PRINCIPIO 3: Un video que se salta mucho NO es malo.**

```
CONTRA-INTUITIVO PERO CIERTO:
  Skip Rate > 80% es NORMAL en YouTube.
  No es senal de fracaso.
  
  LA METRICA CORRECTA NO ES SKIP RATE, ES CPV (Cost Per View).

MATEMATICA:
  TrueView In-Stream solo cobra cuando el usuario ve 30+ segundos o hace clic.
  Si el 80% salta, NO COBRAN por esas impresiones.
  El 20% que ve es el que importa.
  El CPV real depende solo de ese 20%.

EJEMPLO REAL:
  Video A:
    10,000 impresiones
    Skip rate: 75%
    Views cobrables: 2,500
    CPV: $0.08
    Total cost: $200
    Conversiones: 15
    CPA: $13.33
  
  Video B:
    10,000 impresiones
    Skip rate: 50% (mejor que A!)
    Views cobrables: 5,000
    CPV: $0.15
    Total cost: $750
    Conversiones: 18
    CPA: $41.67
  
  A pesar de que B tiene mejor skip rate, A tiene MEJOR CPA.
  La metrica correcta es CPA o CPV, no skip rate.

REGLA: No juzgar un video por skip rate. Juzgar por CPV y CPA.
```

**PRINCIPIO 4: YouTube funciona mejor como parte de un funnel.**

```
YOUTUBE EN EL FUNNEL:
  ┌─────────────────────────────────────────┐
  │  TOP OF FUNNEL (Awareness)              │
  │  → YouTube Ads (awareness masivo)       │
  │                                          │
  │  MID OF FUNNEL (Consideration)          │
  │  → YouTube Ads (retargeting + educacion)│
  │                                          │
  │  BOTTOM OF FUNNEL (Conversion)          │
  │  → Google Search Ads (intent capture)   │
  │  → Meta Ads (retargeting conversion)    │
  └─────────────────────────────────────────┘

REGLA:
  YouTube es excelente para crear familiaridad con la marca.
  Google Search captura al usuario cuando ya busca.
  Meta captura al usuario cuando ya te conoce.
  
  Trabajar los 3 en sincronia da mejores resultados
  que cualquiera solo.

RETARGETING PODEROSO EN YOUTUBE:
  Crear audiencias:
    1. Visitantes del sitio web que NO convirtieron
    2. Viewers de videos organicos del canal del cliente
    3. Engagement con el canal
  
  Mostrarles videos de re-engagement con oferta especial.
  CPV muy bajo en audiencias calientes.
  Conversion rate mayor que ads a audiencia fria.
```

**PRINCIPIO 5: La duracion importa segun el objetivo.**

```
DURACION POR OBJETIVO:

CONVERSION DIRECTA:
  15-30 segundos
  Hook fuerte + problema + solucion + CTA
  Sin educacion extensa
  Directo al punto

CONSIDERACION / EDUCACION:
  2-5 minutos
  Hook + promesa + educacion profunda + prueba social + CTA
  Para temas complejos o B2B
  El usuario que llega al final esta MUY interesado

AWARENESS / BRAND:
  15-30 segundos (para lograr reach masivo)
  O 6 segundos (Bumper Ads para reforzar mensaje)
  Foco: memorabilidad, no conversion

SHORTS:
  15-60 segundos obligatorio
  Mismo formato que TikTok
  Hook en primeros 2 segundos (no 5)
  Ver skill tiktok-ads.md para detalles

REGLA:
  Videos mas cortos = menor costo + mas impresiones + menos educacion
  Videos mas largos = mayor costo + menos impresiones + mas educacion

  Elegir segun objetivo del cliente, no por default.
```

**PRINCIPIO 6: YouTube Shorts Ads son el TikTok de Google.**

```
YOUTUBE SHORTS ADS (desde 2022, escala desde 2024):
  - Formato vertical 9:16 obligatorio
  - Duracion: 15-60 segundos
  - Mismas reglas que TikTok: hook en 2 segundos, no 5
  - El usuario puede saltar con swipe up
  - Se cobra por CPV o CPM

CUANDO USAR YOUTUBE SHORTS ADS:
  ✅ Audiencia < 35 anos
  ✅ Ya tienes videos verticales hechos para TikTok
  ✅ Quieres alcance adicional mas alla de TikTok
  ✅ El cliente no tiene cuenta de TikTok Ads
  ✅ Aprovechar el ecosistema Google (Custom Intent, Search Data, etc.)

DIFERENCIA CLAVE vs TIKTOK:
  YouTube Shorts tiene la data de Google Search.
  Puedes mostrar el Short ANTES de los videos que aparecen
  cuando el usuario busca ciertas keywords.
  Intent mucho mas alto que TikTok organico.

REGLA PARA ADDENDO:
  Si el cliente ya hace TikTok Ads, usar YouTube Shorts como canal complementario.
  Mismo contenido, nueva audiencia.
  Muchas veces CPV de Shorts es mas bajo que TikTok.
```

### 1.2 Lo que el trafikero YouTube ES y NO ES

**ES:**
```
- Un experto en storytelling visual
- Un obsesivo de los primeros 5 segundos
- Un curador de placements (excluir canales malos)
- Un estudiante del algoritmo de YouTube Search
- Un conector entre YouTube y el resto del funnel
- Un analista de CPV y view rate
- Un maestro de Custom Intent Audiences
```

**NO ES:**
```
- Un videomaker (produce el video el cliente o diseno-imagen)
- Un decisor de estrategia (ese es director-estrategia)
- Un trafikero de Google Search que copio campanas a YouTube
- Un obsesivo de vanity metrics (views sin conversion)
```

---

## FASE 2 — CUANDO USAR YOUTUBE ADS

**REGLA:** YouTube Ads no es para todos los clientes. Aplicar el filtro antes de recomendarlo.

### 2.1 Criterios para USAR YouTube Ads

```
CRITERIO 1: Presupuesto minimo $1,000/mes dedicado a YouTube
  Con menos, YouTube no acumula datos suficientes para optimizar.
  Ideal: $2,000-5,000/mes para testing efectivo.

CRITERIO 2: El servicio o producto necesita explicacion visual
  YouTube brilla con productos/servicios que se demuestran mejor en video:
  ✅ Cursos online
  ✅ Software con demo visual
  ✅ Productos fisicos en uso
  ✅ Servicios con proceso visible (plomero, estetica, cocina)
  ✅ Testimonios en video

CRITERIO 3: Objetivo es awareness o consideracion
  YouTube es excelente para:
  - Construir autoridad de marca
  - Educar sobre un problema
  - Crear familiaridad
  
  YouTube NO es ideal para:
  - Conversion directa inmediata (Google Search es mejor)
  - Low-ticket impulso (Meta es mejor)

CRITERIO 4: Cliente puede producir video de calidad
  Minimo aceptable:
  - Buena iluminacion (natural o profesional)
  - Audio limpio (microfono externo, no camera mic)
  - Camera steady (tripod o gimbal)
  - Edicion basica (cortes, texto en pantalla, musica)
  
  Si el cliente no puede esto, YouTube no va a funcionar.

CRITERIO 5: Retargeting de visitantes del sitio web
  YouTube Ads es una de las mejores plataformas de retargeting.
  Si el cliente ya tiene trafico, YouTube amplifica la conversion.
  Si no tiene trafico, YouTube solo para awareness puro.
```

### 2.2 Criterios para USAR YouTube Shorts Ads

```
CRITERIOS ADICIONALES:
  ✅ Audiencia objetivo < 35 anos
  ✅ Ya tiene video vertical 9:16 producido
  ✅ Quiere complementar TikTok Ads
  ✅ Quiere alcance mayor en cliente que nota que TikTok satura

REGLA:
  Si el cliente cumple criterios de TikTok Ads, tambien cumple
  para YouTube Shorts Ads (son el mismo formato).
  
  Muchas veces conviene correr los dos en paralelo para maximizar reach.
```

### 2.3 NO usar YouTube Ads cuando

```
❌ Presupuesto total < $2,000/mes (no alcanza para youtube solo)
❌ Cliente no tiene video (imagenes no funcionan en YouTube)
❌ Objetivo es conversion directa de alto valor → usar Google Search
❌ Servicio 100% telefonico sin componente visual
❌ Cliente quiere resultados en 7 dias (YouTube toma tiempo)
❌ Audiencia objetivo es 65+ (posible pero menos eficiente)
```

---

## FASE 3 — FORMATOS DE YOUTUBE ADS

### 3.1 SKIPPABLE IN-STREAM ADS (TrueView In-Stream)

**El formato mas usado — 70% de los ads de YouTube.**

```
CARACTERISTICAS:
  - Aparece antes, durante o despues de otros videos
  - El usuario puede saltar despues de 5 segundos
  - Se cobra solo si el usuario ve 30+ segundos O hace clic
  - Si el video es < 30 segundos, se cobra si el usuario ve el video completo
  - Duracion permitida: hasta 3 minutos (tecnicamente)
  - Duracion recomendada: 15-30 segundos para conversion, 60-180 para educacion

MODELO DE COBRO:
  CPV (Cost Per View) — solo cuando el usuario ve 30+ segundos o hace clic
  CPM (Cost Per Thousand Impressions) — disponible tambien

VENTAJAS:
  ✅ Solo pagas por viewers reales (no por impresiones saltadas)
  ✅ Formato mas popular — mas inventory disponible
  ✅ Alta flexibilidad de duracion
  ✅ Ideal para testing (bajo riesgo)

DESVENTAJAS:
  ❌ 75-85% de viewers saltan (es normal pero hay que saber)
  ❌ Requiere hook muy fuerte en primeros 5 segundos
  ❌ Requiere creativo bien hecho (no cualquier video funciona)

CUANDO USAR:
  - Campanas de conversion (funcional para funnel completo)
  - Retargeting de visitantes
  - Awareness con presupuesto grande
  - Ideal para la MAYORIA de clientes de Addendo
```

### 3.2 NON-SKIPPABLE IN-STREAM ADS

**Maximo impacto pero con restricciones.**

```
CARACTERISTICAS:
  - El usuario NO puede saltar
  - Ve el ad completo obligatoriamente
  - Duracion maxima: 15 segundos
  - Se cobra por CPM (costo por 1000 impresiones)
  - Aparece antes, durante o despues de otros videos

VENTAJAS:
  ✅ 100% de completions (nadie salta)
  ✅ Mensaje garantizado de ser visto completo
  ✅ Bueno para mensajes cortos de alto impacto

DESVENTAJAS:
  ❌ Cobro por CPM (pagas por todas las impresiones, no solo views)
  ❌ CPM mas alto que Skippable (30-50% mas caro)
  ❌ Puede generar rechazo si el contenido no es relevante
  ❌ Solo 15 segundos — muy corto para educacion
  ❌ Usuario frustrado si no le interesa = sentimiento negativo hacia marca

CUANDO USAR:
  - Lanzamientos de marca importantes
  - Mensajes de marca cortos y directos
  - Cuando el presupuesto es suficiente para absorber el CPM alto
  - Campanas donde la frecuencia importa

CUANDO NO USAR:
  - Cliente con presupuesto limitado
  - Contenido que necesita mas de 15 segundos
  - Awareness en audiencias frias no interesadas
  - Nichos controversiales (esoteric, salud) — mayor riesgo de rechazo
```

### 3.3 BUMPER ADS

**6 segundos de oro.**

```
CARACTERISTICAS:
  - 6 segundos maximo (exactamente 6, no mas)
  - NO se pueden saltar
  - Se cobra por CPM
  - Aparece antes de otros videos

VENTAJAS:
  ✅ 100% completion rate
  ✅ CPM relativamente bajo comparado con Non-Skippable 15s
  ✅ Perfecto para reforzar mensajes de marca
  ✅ Puede complementar campanas mas largas (multiple touch)

DESVENTAJAS:
  ❌ Solo 6 segundos — imposible educar
  ❌ Solo puedes transmitir UN punto
  ❌ Cobro por CPM (no por engagement)

CUANDO USAR:
  - Reforzar un mensaje de campana mas larga
  - Construccion de marca (repeticion)
  - Recordatorio de oferta especial
  - Complemento a otros formatos

EL MENSAJE DEBE SER:
  - Ultra-especifico
  - Un solo punto clave
  - Visualmente impactante
  - Con voz clara en los 6 segundos
  
  Ejemplo: "Brujo en Los Angeles. 2,500 parejas reunidas. Llama ahora."
```

### 3.4 IN-FEED VIDEO ADS (antes llamado Discovery Ads)

**El usuario elige verlo.**

```
CARACTERISTICAS:
  - Aparece en resultados de busqueda de YouTube
  - Aparece en sugerencias del lado derecho
  - Aparece en la pagina principal de YouTube (home)
  - El usuario hace CLIC voluntariamente para verlo
  - Se cobra solo cuando el usuario hace clic para ver

VENTAJAS:
  ✅ Alta intencion (el usuario eligio verlo)
  ✅ No hay restriccion de duracion
  ✅ Mejor completion rate (el usuario quiso verlo)
  ✅ Ideal para audiencias que buscan activamente el tema
  ✅ Solo pagas si generan interes (el clic)

DESVENTAJAS:
  ❌ Menos inventory que In-Stream
  ❌ Requiere THUMBNAIL y TITULO atractivos (no solo el video)
  ❌ Depende de que el usuario BUSQUE el tema
  ❌ Menos volumen que otros formatos

REQUISITOS CRITICOS:
  - Thumbnail: 1280x720, alta calidad, rostros humanos, texto overlay grande
  - Titulo: 70 caracteres max, con keyword, genera curiosidad
  - Description: 2 lineas visibles, beneficio claro

CUANDO USAR:
  - Cuando la audiencia busca activamente el tema
  - Tutoriales, how-to, reviews
  - Complemento a In-Stream (mas variedad de formatos)
  - Captura de intent de busqueda en YouTube
```

### 3.5 YOUTUBE SHORTS ADS

**El TikTok de Google.**

```
CARACTERISTICAS:
  - Formato vertical 9:16 (1080x1920)
  - Duracion: 15-60 segundos
  - Se cobra por CPV o CPM
  - Aparece entre Shorts organicos en el feed
  - El usuario puede saltar con swipe up

VENTAJAS:
  ✅ Enorme alcance (Shorts crece rapido)
  ✅ Aprovechar videos ya hechos para TikTok
  ✅ Combina con data de Google (Custom Intent audiences)
  ✅ CPV muchas veces mas bajo que TikTok

DESVENTAJAS:
  ❌ Audiencia principalmente joven
  ❌ Requiere formato vertical (no reusar horizontal)
  ❌ Hook en 2 segundos (no 5 como In-Stream)
  ❌ Mismo ad fatigue rapido que TikTok

REGLAS PARA SHORTS ADS:
  - Hook en primeros 2 segundos (mismo que TikTok)
  - Subtitulos burned-in obligatorios
  - Musica trending cuando aplica
  - Formato vertical estricto
  - Duracion ideal: 15-30 segundos
  - Ver skill tiktok-ads.md para detalles de creativos

CUANDO USAR:
  - Cliente que ya hace TikTok Ads (reusar videos)
  - Audiencia < 35 anos
  - Quiere alcance mayor que solo TikTok
  - Complementar estrategia de video
```

### 3.6 Matriz de seleccion de formato

**Tabla de recomendacion por objetivo:**

| Objetivo | Formato recomendado | Razon |
|----------|---------------------|-------|
| Conversion directa | Skippable In-Stream (15-30s) | Solo pagas por viewers reales |
| Awareness masivo | Skippable In-Stream + Bumper | Combinacion de reach + refuerzo |
| Consideracion / educacion | Skippable In-Stream (60-180s) | Duracion para explicar |
| Marca mensaje ultra-corto | Bumper Ads (6s) | 100% completion, CPM bajo |
| Retargeting alto intent | Skippable In-Stream + In-Feed | Intent alto de la audiencia |
| Intent de busqueda | In-Feed Video Ads | Usuario busca el tema activamente |
| Audiencia joven < 35 | YouTube Shorts Ads | Formato nativo para la audiencia |
| Lanzamiento de producto | Non-Skippable + Skippable | Maximo impacto inicial |

---

## FASE 4 — LOS PRIMEROS 5 SEGUNDOS

**La regla mas importante de YouTube Ads.**

### 4.1 Estructura de los primeros 5 segundos

```
BREAKDOWN SECUNDO POR SEGUNDO:

SEGUNDO 0 (frame 1):
  - Imagen o accion visual impactante
  - NUNCA logo ni texto de marca
  - Rostro humano con expresion fuerte
  - O: accion visual con movimiento
  - O: imagen que rompe el patron

SEGUNDO 1:
  - Texto en pantalla con hook
  - Voz empezando a decir el hook
  - Crear relevancia inmediata

SEGUNDO 2-3:
  - Ampliar el hook
  - Dar razon para seguir viendo
  - Generar curiosidad

SEGUNDO 4:
  - Hint de lo que viene despues
  - Promesa especifica
  - "En este video te voy a mostrar..."

SEGUNDO 5:
  - EL MOMENTO CLAVE: el usuario decide
  - Si el hook fue efectivo: sigue viendo
  - Si fue debil: toca "Saltar"

REGLA:
  En los 5 segundos, el usuario debe:
  1. Saber que el video habla de algo que le interesa (relevancia)
  2. Querer saber mas (curiosidad)
  3. Confiar en que el resto del video vale la pena (promesa)
```

### 4.2 Formulas de hook probadas

```
FORMULA 1: PREGUNTA DIRECTA AL DOLOR

Nicho: esoteric
  Hook: "¿Por que tu pareja dejo de llamarte de repente?"
  Por que funciona: apunta al dolor exacto del buyer persona
  
Nicho: plomero
  Hook: "¿Ves manchas como esta en tu techo?"
  Visual: close-up de mancha de humedad
  
Nicho: fitness
  Hook: "¿Llevas meses entrenando y no ves resultados?"
  Visual: persona frustrada mirandose al espejo

FORMULA 2: AFIRMACION CONTRAINTUITIVA

Nicho: esoteric
  Hook: "Lo que te ensenaron sobre el amor esta completamente mal"
  Por que funciona: reta creencias, genera curiosidad
  
Nicho: fitness
  Hook: "Las dietas bajas en calorias estan engordando a Mexico"
  Visual: dato chocante en pantalla
  
Nicho: finanzas
  Hook: "Ahorrar dinero te hara mas pobre en 2026"
  Visual: grafico bajando

FORMULA 3: PROMESA ESPECIFICA

Nicho: esoteric
  Hook: "En este video te muestro exactamente como recuperar a tu ex en 7 dias"
  Por que funciona: promesa especifica + numero + tiempo claro
  
Nicho: belleza
  Hook: "3 trucos para rejuvenecer 10 anos sin cirugia"
  Visual: mujer sonriendo + numeros en pantalla

FORMULA 4: DEMOSTRACION INMEDIATA

Nicho: esoteric
  Visual: pareja abrazandose con emocion real
  Hook: "Asi es como se ven despues de que funciona"
  
Nicho: plomero
  Visual: camara endoscopica mostrando interior de tuberia sucia
  Hook: "Esto es lo que tu plomero NO te va a mostrar"

FORMULA 5: NUMERO + PROMESA

Nicho: esoteric
  Hook: "3 errores que alejan a tu pareja (y como corregirlos hoy)"
  Por que funciona: lista + dolor + solucion inmediata
  
Nicho: negocio
  Hook: "5 razones por las que tu negocio no crece (y no es tu culpa)"
  Visual: duena de negocio con cara preocupada

FORMULA 6: CALL OUT A UN SEGMENTO

Nicho: esoteric
  Hook: "Si tu pareja te dejo hace menos de 30 dias, para todo y mira esto"
  Por que funciona: segmenta a la audiencia exacta + urgencia
  
Nicho: fitness
  Hook: "Si tienes mas de 40 anos y no ves resultados con dieta, esto es para ti"
  Visual: persona del segmento objetivo

FORMULA 7: SHOCK + STORYTELLING

Nicho: esoteric
  Hook: "Yo tampoco creia en brujos hasta que paso esto..."
  Visual: persona testimoniando con emocion
  Por que funciona: storytelling personal genera conexion emocional

Nicho: fitness
  Hook: "Perdi 30 kg sin gym y sin dietas locas. Asi fue."
  Visual: persona antes/despues (cuidado policies)
```

### 4.3 Lo que NUNCA funciona en los primeros 5 segundos

```
PROHIBIDO:
  ❌ Logo de la empresa grande en centro
     Nadie le importa tu marca todavia
  
  ❌ "Hola, soy [nombre] de [empresa]"
     Aburrido, el usuario salta inmediatamente
  
  ❌ "Hoy vamos a hablar sobre..."
     Ningun usuario espera introduccion
  
  ❌ "En este video..."
     Frase muerta que anuncia aburricion
  
  ❌ Musica de intro larga (corporate jingle)
     2-3 segundos de musica sin accion = skip
  
  ❌ Panoramica aerea del edificio corporativo
     Se ve comercial barato de TV
  
  ❌ Imagenes lentas, fade-ins lentos
     Falta de energia = skip
  
  ❌ Pantalla negra con texto elegante
     Nadie espera a que aparezca el mensaje
  
  ❌ "Bienvenidos a nuestro canal"
     Cero valor inmediato
  
  ❌ Grafico animado de estadisticas aburridas
     Sin contexto emocional, se salta
```

---

## FASE 5 — ESTRUCTURA DEL VIDEO SEGUN OBJETIVO

### 5.1 Video de conversion directa (15-30 segundos)

```
ESTRUCTURA MILIMETRICA:

0-5s: HOOK IRRESISTIBLE
  Ganar los primeros 5 segundos
  Usar una de las 7 formulas probadas
  Texto en pantalla + voz + visual impactante

5-15s: PROBLEMA + AGITACION
  Hacer sentir el dolor al espectador
  "Te ha pasado esto?"
  Mostrar consecuencias del problema
  Generar urgencia emocional

15-25s: SOLUCION + PRUEBA SOCIAL RAPIDA
  Presentar la solucion en 1-2 frases
  Prueba social inmediata: "+2,500 clientes felices"
  Credibilidad rapida: "20 anos de experiencia"
  Demostracion visual

25-30s: CTA ESPECIFICO
  Accion clara: "Llama al (555) 123-4567"
  O: "Escribe al link en descripcion"
  O: "Haz clic en el boton debajo"
  Urgencia etica: "Esta semana nomas"
  Texto en pantalla reforzando el CTA
```

**Ejemplo completo: video de 22 segundos para esoteric en LA:**

```
SEGUNDOS 0-5 (Hook):
  Visual: mujer mirando telefono con tristeza
  Voz: "¿Tu ex dejo de hablarte y no sabes por que?"
  Texto en pantalla: "¿Tu ex te dejo de hablar?"
  
SEGUNDOS 5-10 (Problema + agitacion):
  Visual: corte a mujer llorando, luego a ella sola en casa
  Voz: "Cada dia que pasa, se aleja mas. Lo sabes."
  Texto: "Cada dia que pasa..."
  
SEGUNDOS 10-15 (Solucion):
  Visual: brujo trabajando con velas, luego cliente recibiendo llamada
  Voz: "Mas de 2,500 parejas en LA recuperaron su amor con nosotros"
  Texto: "+2,500 parejas reunidas"
  
SEGUNDOS 15-20 (Prueba social):
  Visual: testimonios rapidos en carrusel (3 rostros, 2s cada uno)
  Voz: "Con 20 anos de experiencia en tradicion ancestral"
  Texto: "20 anos ayudando en LA"
  
SEGUNDOS 20-22 (CTA):
  Visual: numero grande en pantalla + logo pequeno
  Voz: "Llama ahora al (213) 555-1234"
  Texto: "Llama (213) 555-1234 — Consulta Gratis"
```

### 5.2 Video de consideracion (2-5 minutos)

```
ESTRUCTURA MILIMETRICA:

0-5s: HOOK
  Misma regla: gana los primeros 5 segundos
  Formula contraintuitiva o promesa especifica

0:05-0:30: PROMESA DEL VIDEO
  "En los proximos 3 minutos te voy a mostrar..."
  Explicar que aprendera el viewer
  Crear anticipacion clara
  "Y al final tengo algo especial para ti"

0:30-3:00: CONTENIDO DE VALOR
  Educacion real sobre el tema
  Demostracion
  Historia
  Metodologia
  Proceso paso a paso
  
  Reglas del contenido:
  - Variar visuales cada 5-8 segundos (mantener atencion)
  - Texto en pantalla para reforzar puntos clave
  - Musica de fondo que apoye el mood
  - B-roll relevante (no solo talking head)
  - Evitar tangentes o divagaciones

3:00-4:30: PRUEBA SOCIAL
  Testimonios de clientes
  Casos de estudio con datos
  Credenciales: anos, certificaciones, numeros
  Antes/despues (con cuidado de policies)
  Reconocimientos publicos

4:30-5:00: CTA CLARO
  Accion especifica
  Instruccion paso a paso
  "Haz clic en el enlace de descripcion"
  "Llama al numero que aparece en pantalla"
  Urgencia etica si aplica
  Texto en pantalla reforzando
```

### 5.3 YouTube Shorts (15-60 segundos)

```
ESTRUCTURA SIMILAR A TIKTOK:

0-2s: HOOK VISUAL + TEXTO
  Igual que TikTok: hook en 2 segundos, no 5
  Formato vertical 9:16
  Texto en pantalla desde el frame 0

2-10s: PROBLEMA / CONTEXTO
  Identificacion del dolor
  Buyer persona reconoce su situacion

10-45s: SOLUCION / DEMOSTRACION
  Mostrar el servicio en accion
  Prueba social rapida
  Educacion breve

45-60s: CTA + TEXTO EN PANTALLA
  Accion especifica
  Texto grande con la accion
  Link en descripcion del Short o bio

REFERENCIA:
  Ver skill tiktok-ads.md Fase 5 para detalles completos
  Los Shorts siguen las mismas reglas que TikTok
```

### 5.4 Video Non-Skippable (15 segundos exactos)

```
ESTRUCTURA MILIMETRICA:

0-2s: HOOK INMEDIATO
  El usuario no puede saltar pero puede desconectar mentalmente
  Hook fuerte igual que Skippable

2-8s: MENSAJE PRINCIPAL
  Directo al punto
  Un solo concepto
  Sin rodeos

8-12s: DIFERENCIADOR
  Por que tu marca
  Numero o dato concreto

12-15s: CTA
  Accion clara
  Nombre de marca
  Forma de contacto
```

### 5.5 Bumper Ad (6 segundos exactos)

```
ESTRUCTURA ULTRA-COMPRIMIDA:

0-1s: HOOK VISUAL
  Imagen impactante
  Rostro o accion

1-4s: MENSAJE CORE
  UN solo punto clave
  Frase corta y memorable

4-6s: MARCA + CTA
  Nombre de marca
  Accion simple

EJEMPLO:
  Segundos 0-1: brujo con velas encendidas (visual)
  Segundos 1-4: "2,500 parejas reunidas en LA" (texto + voz)
  Segundos 4-6: "Llama ahora al (213) 555-1234" (texto + logo)
```

---

## FASE 6 — AUDIENCIAS EN YOUTUBE

### 6.1 Custom Intent Audiences (las mas poderosas)

```
QUE SON:
  Audiencias basadas en keywords que el usuario BUSCO en Google
  en los ultimos dias.
  
  No son intereses generales — son senales de busqueda real.

COMO FUNCIONAN:
  1. Tu defines las keywords objetivo
  2. Google identifica usuarios que BUSCARON esas keywords
  3. Tu video aparece en YouTube ANTES de los videos que ellos ven
  4. Intent altisimo porque acaban de buscar el tema

POR QUE SON TAN PODEROSAS:
  Combinan intent de Google con formato visual de YouTube.
  El usuario tiene el problema FRESCO en su mente.
  Tu video es la respuesta visual a lo que busco.

EJEMPLO:
  Cliente: brujo en Los Angeles
  
  Custom Intent con keywords:
    "como recuperar mi ex"
    "brujo en Los Angeles"
    "amarre de amor"
    "mi pareja me dejo"
    "como hacer que vuelva mi ex"
  
  Resultado: el video del brujo aparece en YouTube antes
  de los videos que ven las personas que acaban de buscar
  estas keywords.

COMO CREAR EN GOOGLE ADS:
  Audiences > Custom Audiences > New
  Tipo: "Custom Audience"
  Seleccionar: "People who searched for any of these terms on Google"
  Ingresar: lista de keywords objetivo (15-50 keywords)
  Nombrar descriptivamente
```

### 6.2 In-Market Audiences

```
QUE SON:
  Usuarios que Google identifica como "en mercado" — 
  es decir, activamente investigando comprar en una categoria.

COMO FUNCIONAN:
  Google usa signales de comportamiento (busquedas, sitios visitados, videos vistos)
  para identificar usuarios que estan cerca de comprar.

CATEGORIAS DISPONIBLES:
  Google tiene miles de In-Market audiences predefinidas.
  Ejemplos relevantes para Addendo:
    - "Legal Services > Family Law"
    - "Home & Garden > Home Improvement > Plumbers"
    - "Health & Beauty > Skincare Services"
    - "Financial Services > Credit Cards"

VENTAJAS:
  ✅ Google ya hizo el trabajo de identificar intent
  ✅ No necesitas definir keywords
  ✅ Actualizaciones automaticas del inventory

DESVENTAJAS:
  ❌ Menos granularidad que Custom Intent
  ❌ Categorias generales (no todas las industrias)
  ❌ Competencia alta (muchos anunciantes las usan)

CUANDO USAR:
  - Industrias con categoria clara en In-Market
  - Complementar Custom Intent (no reemplazar)
  - Testing inicial antes de construir Custom Intent propio
```

### 6.3 Affinity Audiences

```
QUE SON:
  Usuarios con interes HABITUAL en un tema (no solo en-mercado ahora).
  Son audiencias grandes, mas broad que In-Market.

CATEGORIAS:
  Google tiene cientos de Affinity audiences predefinidas:
    - "Beauty Mavens"
    - "Sports Enthusiasts"
    - "Green Living Enthusiasts"
    - "Hispanic/Latino Affinity"

VENTAJAS:
  ✅ Audiencias enormes (millones de usuarios)
  ✅ Ideal para awareness masivo
  ✅ Coste por impresion bajo

DESVENTAJAS:
  ❌ Intent bajo (son intereses habituales, no compra)
  ❌ Conversion rate bajo
  ❌ Mejor para awareness que conversion

CUANDO USAR:
  - Campanas de awareness con presupuesto grande
  - Construccion de marca a largo plazo
  - Nichos que Custom Intent no cubre bien
  - Complementar con retargeting despues
```

### 6.4 Customer Match

```
QUE ES:
  Subir lista de clientes (emails, telefonos hasheados) a Google Ads.
  Google la vincula con usuarios de YouTube y Gmail.
  Permite mostrar videos especificos a esos usuarios.

USO ESTRATEGICO:
  
  CASO 1: Retargeting de clientes existentes
    - Video de upsell / cross-sell
    - Mensaje personalizado "como cliente premium"
    - Alto converison rate
  
  CASO 2: Reactivacion de clientes inactivos
    - Video de re-engagement
    - Oferta especial "te echamos de menos"
    - Lower cost que acquisition
  
  CASO 3: Crear Lookalikes (Similar Audiences)
    - Base para Similar Audiences
    - Expandir mas alla de clientes actuales
    - Mantener la calidad similar

COMO SUBIR:
  Google Ads > Tools > Audience Manager > Customer Lists
  Subir CSV con emails, telefonos o address
  Google los hashea automaticamente
  Match rate tipico: 30-60%
```

### 6.5 Similar Audiences (Lookalike)

```
QUE SON:
  Versi Google de los Lookalike de Meta.
  Audiencias similares a una Custom Audience seed.

REQUISITO:
  Customer Match con minimo 1,000 usuarios
  O Remarketing con minimo 1,000 visitantes

VENTAJA:
  Expandir mas alla de tus clientes actuales
  Manteniendo caracteristicas similares

LIMITACION:
  Google 2024+: Similar Audiences esta siendo descontinuado
  en varios tipos de campana.
  Para YouTube, aun esta disponible pero verificar siempre.

ALTERNATIVA MODERNA:
  Optimized Targeting en Google Ads
  Combinacion de audiences + AI de Google
  Auto-expande la audiencia manteniendo calidad
```

### 6.6 Remarketing

```
TIPOS DE REMARKETING EN YOUTUBE:

1. VISITANTES DEL SITIO WEB
   - Requiere: Google Ads Tag o Google Tag en el sitio
   - Segmentar por pagina visitada
   - Ejemplo: "Visitantes de /servicios en ultimos 30 dias"

2. YOUTUBE VIEWERS
   - Usuarios que vieron tus videos organicos
   - Segmentar por:
     * Viewers de videos especificos
     * Subscriptores del canal
     * Viewers de 25%, 50%, 75% del video
     * Usuarios que dieron like a algun video

3. ENGAGEMENT CON EL CANAL
   - Usuarios que visitaron tu canal
   - Usuarios que comentaron
   - Usuarios que compartieron

4. USUARIOS DE APP (si el cliente tiene app)
   - Users que abrieron la app
   - Users que hicieron acciones dentro

ESTRATEGIA RECOMENDADA:
  Crear audiencias de remarketing DESDE EL DIA 1
  aunque no las uses inmediatamente.
  Cuanto mas tiempo, mejor construyes data.
  
  Usarlas para retargeting con videos especificos.
  CPV en remarketing es tipicamente 50-70% menor que audiencia fria.
```

### 6.7 Targeting contextual (Keywords, Topics, Placements)

**KEYWORDS TARGETING:**

```
QUE ES:
  Mostrar tu video antes de videos relacionados con esas keywords.
  NO son keywords que el usuario busca — son keywords del CONTENIDO.

EJEMPLO:
  Cliente: plomero
  Keywords: "water leak", "plumbing repair", "pipe burst"
  
  Tu video aparece antes de videos de YouTube sobre estos temas.
  Usuario viendo un video de DIY plumbing → ve tu ad antes.

CUANDO USAR:
  - Cuando el contenido del video importa
  - Para capturar interes del tema en tiempo real
  - Complementar Custom Intent (audience) con Keywords (context)
```

**TOPICS TARGETING:**

```
QUE ES:
  Mostrar tu video antes de videos de un tema especifico.
  Topics son categorias predefinidas por Google.

EJEMPLO:
  Topic: "Beauty & Fitness"
  Tu video aparece antes de videos categorizados en Beauty & Fitness.

VENTAJAS:
  ✅ Rapido de configurar
  ✅ Amplio alcance

DESVENTAJAS:
  ❌ Menos preciso que Keywords
  ❌ Puede mostrar en canales irrelevantes
```

**PLACEMENTS TARGETING:**

```
QUE ES:
  Elegir canales o videos ESPECIFICOS donde mostrar tu ad.
  Maximo control sobre donde aparece.

TIPOS:
  - Channel placements: tu ad solo en canales X, Y, Z
  - Video placements: tu ad solo antes de videos especificos
  - Website placements: tu ad en sitios web especificos (Display)
  - App placements: tu ad en apps especificas

ESTRATEGIA:
  1. Investigar canales top del nicho del cliente
  2. Investigar canales de competidores
  3. Crear lista de 20-50 canales placements
  4. Tu ad aparece solo en esos canales
  5. Intent altisimo (audiencia exacta del nicho)
```

### 6.8 Estrategia para clientes locales

```
FORMULA GANADORA PARA PYMES LOCALES:

1. Geographic Targeting:
   - Ciudad + radio (ej: LA + 50 km)
   - Excluir areas no servibles

2. Custom Intent Audience:
   - Keywords hiper-especificas
   - "brujo en Los Angeles"
   - "plomero emergency houston"
   - "dentista cerca de mi {{ciudad}}"

3. Demographics adjustment:
   - Edad segun buyer persona
   - Genero si aplica
   - Parental status si relevante

4. Device:
   - Priorizar mobile (donde esta la audiencia)
   - Desktop como secundario

5. Schedule:
   - Horarios cuando la audiencia esta activa
   - Excluir horas muertas (2am-5am)

6. Placements exclusions:
   - Excluir canales de ninos
   - Excluir canales de gaming irrelevantes
   - Excluir categorias sensibles
```

---

## FASE 7 — METRICAS CLAVE YOUTUBE ADS

### 7.1 Metricas principales

**Tabla de diagnostico:**

| Metrica | Saludable | Alarma | Critico | Accion |
|---------|-----------|--------|---------|--------|
| View Rate | >= 30% | 15-29% | < 15% | Hook falla, renovar video |
| CPV | < $0.05 (awareness) | $0.05-0.10 | > $0.10 | Audiencia o video problema |
| CTR (Skippable) | >= 0.5% | 0.3-0.49% | < 0.3% | CTA no motiva |
| CTR (In-Feed) | >= 3% | 1-2.99% | < 1% | Thumbnail o titulo malo |
| Skip Rate | 70-85% | N/A | N/A | Normal, no actuar |
| Completion Rate (skip) | >= 30% | 15-29% | < 15% | Video muy largo o aburrido |
| Completion Rate (non-skip) | 100% | - | - | Forzado |
| CPA | = objetivo | 1.2-1.5x | > 2x | Investigar causa |
| Video Views 25% | >= 40% | - | - | Hook efectividad |
| Video Views 50% | >= 25% | - | - | Engagement |
| Video Views 75% | >= 15% | - | - | Quality content |
| Video Views 100% | >= 10% | - | - | Excellence |

### 7.2 Que es view rate y como mejorarlo

```
VIEW RATE = Views / Impressions * 100

DEFINICION DE "VIEW":
  - Skippable In-Stream: usuario vio 30+ segundos O interactuo
  - Non-Skippable: usuario vio el ad completo (automatico)
  - Bumper: usuario vio los 6 segundos (automatico)
  - In-Feed: usuario hizo clic para ver el video

PARA SKIPPABLE IN-STREAM:
  View Rate saludable: 30%+
  Significa: de cada 100 impresiones, 30+ viewers ven al menos 30 segundos
  
  Si esta debajo de 15%:
    ❌ El hook no funciona
    ❌ El target audience esta mal
    ❌ El creativo no resuena
  
  Accion: renovar el video, revisar audiencia

COMO MEJORAR VIEW RATE:
  1. Hook mas fuerte en primeros 5 segundos
  2. Audiencia mas precisa (Custom Intent en lugar de Affinity)
  3. Duracion del video: 15-30s generalmente mejor que 60s+
  4. Calidad audio/visual alta
  5. Mensaje relevante al segmento
```

### 7.3 Skip Rate — no es mala noticia

```
SKIP RATE EN YOUTUBE:
  Normal: 70-85%
  Rango aceptable: 60-90%
  Por debajo de 60%: muy bueno (hook excepcional)
  Por encima de 90%: problema serio

POR QUE EL SKIP RATE ALTO NO ES MALO:
  Google solo cobra cuando el usuario ve 30+ segundos o interactua.
  Impresiones saltadas NO cuestan dinero.
  La metrica que importa es CPV (cost per view), no skip rate.

EJEMPLO:
  Video A: 80% skip rate, CPV $0.03
  Video B: 60% skip rate, CPV $0.08
  
  Video A es MEJOR economicamente (CPV menor)
  Aunque su skip rate sea peor.

REGLA:
  Nunca juzgar un video por skip rate solamente.
  Siempre comparar skip rate + CPV + CPA juntos.
```

### 7.4 Cuando pausar

```
PAUSAR VIDEO CREATIVO:
  - View Rate < 15% despues de 5,000 impresiones
    (hook esta fallando o audiencia incorrecta)
  
  - CPV > 3x objetivo despues de 10,000 impresiones
    (creativo no resuena con la audiencia)
  
  - Completion rate < 5% despues de 3,000 viewable impressions
    (video no esta entregando valor)
  
  - CTR < 0.1% despues de 10,000 impresiones (In-Feed)
    (thumbnail o titulo no motivan clic)

PAUSAR AD GROUP:
  - CPV > 3x objetivo despues de 14 dias
  - 0 conversiones despues de gastar 3x el CPL objetivo
  - View rate < 20% en todos los creativos del grupo

PAUSAR CAMPANA:
  - Performance debajo del objetivo durante 30 dias
  - Multiples ad groups fallando
  - Cliente decide pivotar estrategia
```

---

## FASE 8 — OPTIMIZACION CONTINUA

### 8.1 Cada semana (30 minutos)

```
PROCESO OBLIGATORIO CADA LUNES:

PASO 1: Review View Rate por video (5 min)
  Filtrar videos con:
    - Impresiones >= 5,000
    - View Rate < 20%
  Accion: PAUSAR

PASO 2: Review CPV por audiencia (5 min)
  Filtrar ad groups con:
    - CPV > 2x objetivo despues de 14 dias
  Accion: INVESTIGAR y ajustar

PASO 3: PLACEMENTS REPORT — el mas importante (10 min)
  Google Ads > Campanas YouTube > Placements
  
  Revisar:
    - Canales donde aparecieron los ads
    - Ver CPV y conversiones por canal
    - Identificar canales de baja calidad:
      * Canales infantiles (apps, games)
      * Canales de contenido basura
      * Canales irrelevantes al nicho
    
  Accion: EXCLUIR esos canales de la campana
  
  REGLA: revisar placements cada semana.
  Google por default muestra ads en CUALQUIER canal elegible.
  Sin exclusiones, estas tirando dinero en canales malos.

PASO 4: Demographics review (5 min)
  Ver breakdown por edad, genero, parental status
  Identificar segmentos que NO convierten
  Accion: ajustar bid adjustments o excluir

PASO 5: Device review (5 min)
  Mobile vs Desktop vs Tablet vs TV
  YouTube se ve mucho en mobile y TV (en TVs inteligentes)
  Ajustar bids segun donde mejor convierte
```

### 8.2 Cada mes (1.5 horas)

```
AUDITORIA MENSUAL:

PARTE 1: Renovar videos antiguos (30 min)
  Videos con > 60 dias activos tienen ad fatigue
  Crear variaciones o reemplazar
  Brief nuevos videos al cliente

PARTE 2: Auditoria completa de placements (30 min)
  Exportar placements report del mes
  Excluir canales problematicos acumulados:
    * Ninos (YouTube Kids channels)
    * Gaming irrelevante
    * Canales con views bots
    * Canales de baja calidad
  
  Importar lista master de exclusiones
  Mantener lista actualizada

PARTE 3: Revisar si YouTube sigue siendo el canal correcto (15 min)
  Questions:
    - ¿CPV dentro del objetivo?
    - ¿CPL dentro del objetivo?
    - ¿ROAS justifica la inversion?
    - ¿El cliente ve valor en el canal?
  
  Si 2+ respuestas son NO, considerar pivotar

PARTE 4: Reporte al director-estrategia (15 min)
  - Insights del mes
  - Top performing videos y audiencias
  - Recomendaciones
  - Presupuesto ajustes

TOTAL: 1.5 horas por cuenta por mes
```

### 8.3 La exclusion de placements — secreto de los pros

```
POR QUE ES CRITICO:
  Google Ads muestra tus ads en CUALQUIER canal elegible por default.
  Esto incluye:
    - Canales de ninos (YouTube Kids)
    - Canales de gaming (muchas impresiones, cero conversiones)
    - Canales de musica (skip rate altisimo)
    - Canales con views bots
    - Canales de bajisima calidad
  
  Sin exclusiones, 30-50% de tu presupuesto puede irse en estos canales.

LISTA MASTER DE EXCLUSIONES (aplicar a todos los clientes):

CATEGORIAS A EXCLUIR:
  - Kids content (ninos)
  - Gaming walkthroughs de baja calidad
  - Music videos (a menos que sea el nicho)
  - Reaction videos de baja calidad
  - Clickbait channels
  - Auto-generated content

CANALES ESPECIFICOS COMUNES A EXCLUIR:
  - Cocomelon
  - Chu Chu TV
  - Blippi
  - Ryan's World
  - Bluey
  - Any gaming lucky videos
  - "Daily compilation" channels
  - "Top 10 videos" farms

COMO EXCLUIR:
  Google Ads > Campaign > Placements > Exclusions
  Agregar canales uno por uno o importar lista

GUARDAR LISTA COMPARTIDA:
  Google Ads > Tools > Shared Library > Exclusion Lists
  Crear: "Addendo-YouTube-Master-Exclusions"
  Aplicar a TODAS las campanas de YouTube
  Actualizar mensualmente
```

---

## FASE 9 — INTEGRACION CON GOOGLE ADS VIA N8N

**YouTube Ads usa la misma API que Google Ads.**

### 9.1 Credenciales (compartidas con google-ads)

```yaml
credential_name: "Google Ads Addendo"  # la misma que google-ads
credential_type: "googleAdsOAuth2Api"
mcc_id: "424-957-3841"
developer_token: "{{GOOGLE_ADS_DEVELOPER_TOKEN}}"  # variable de entorno — rotado 20 abril 2026, nuevo token pendiente de instalacion por CEO
login_customer_id: "4249573841"
scopes:
  - "https://www.googleapis.com/auth/adwords"
```

### 9.2 Tipo de campana YouTube

**En la Google Ads API, YouTube campaigns usan:**

```
advertising_channel_type: "VIDEO"
advertising_channel_sub_type: varia segun formato
  - "VIDEO_ACTION" → para conversion campaigns
  - "VIDEO_NON_SKIPPABLE" → non-skippable
  - "VIDEO_OUTSTREAM" → video in feed
  - "VIDEO_SEQUENCE" → video sequences
```

### 9.3 Crear campana de video via API

**POST** `/v16/customers/{customer_id}/campaigns:mutate`

```json
{
  "operations": [{
    "create": {
      "name": "LA-Video-Amarres-Conversion",
      "status": "PAUSED",
      "advertising_channel_type": "VIDEO",
      "advertising_channel_sub_type": "VIDEO_ACTION",
      "campaign_budget": "customers/{customer_id}/campaignBudgets/{budget_id}",
      "start_date": "20260411",
      "maximize_conversions": {}
    }
  }]
}
```

### 9.4 Crear ad group de video

```json
{
  "operations": [{
    "create": {
      "campaign": "customers/{customer_id}/campaigns/{campaign_id}",
      "name": "CustomIntent-Amarres-LA",
      "status": "ENABLED",
      "type": "VIDEO_TRUE_VIEW_IN_STREAM",
      "cpv_bid_micros": 50000
    }
  }]
}
```

### 9.5 Crear video ad

```json
{
  "operations": [{
    "create": {
      "ad_group": "customers/{customer_id}/adGroups/{ad_group_id}",
      "status": "ENABLED",
      "ad": {
        "final_urls": ["https://cliente.com/servicios/amarres"],
        "video_ad": {
          "video": {
            "resource_name": "customers/{customer_id}/videos/{video_id}"
          },
          "in_stream": {
            "action_button_label": "Learn More",
            "action_headline": "Consulta Gratis Hoy",
            "companion_banner": {}
          }
        }
      }
    }
  }]
}
```

### 9.6 Query GAQL para performance de video

```sql
SELECT
  video.id,
  video.title,
  campaign.name,
  ad_group.name,
  metrics.video_views,
  metrics.video_view_rate,
  metrics.impressions,
  metrics.cost_micros,
  metrics.average_cpv,
  metrics.clicks,
  metrics.ctr,
  metrics.conversions,
  metrics.video_quartile_p25_rate,
  metrics.video_quartile_p50_rate,
  metrics.video_quartile_p75_rate,
  metrics.video_quartile_p100_rate
FROM video
WHERE segments.date DURING LAST_7_DAYS
  AND campaign.advertising_channel_type = 'VIDEO'
ORDER BY metrics.video_views DESC
```

### 9.7 Query para placements report

```sql
SELECT
  detail_placement_view.display_name,
  detail_placement_view.placement,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.video_views
FROM detail_placement_view
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'VIDEO'
  AND metrics.impressions > 100
ORDER BY metrics.cost_micros DESC
```

### 9.8 Workflows N8N para YouTube Ads

```
WORKFLOW 1: "Addendo — YouTube Ads Reporte Semanal"
  Trigger: Schedule lunes 8am
  Output: Email HTML con metricas de video

WORKFLOW 2: "Addendo — YouTube Auto-Exclude Bad Placements"
  Trigger: Schedule cada lunes
  Logica:
    - Query placements con >100 impresiones y 0 conversiones
    - Filtrar por canales tipicamente malos (kids, gaming, etc.)
    - Excluir automaticamente
    - Notificar a admin@addendo.io

WORKFLOW 3: "Addendo — YouTube Pause Low View Rate"
  Trigger: Schedule daily 6am
  Logica:
    - Query videos con impresiones >5K y view rate <15%
    - Pausar automaticamente
    - Notificar para renovacion

WORKFLOW 4: "Addendo — YouTube Custom Intent Update"
  Trigger: Manual o weekly
  Logica:
    - Pull keywords nuevas del reporte de Google Ads Search
    - Agregarlas a la Custom Intent Audience
    - Expandir audience con nuevos search terms
```

---

## FASE 10 — REPORTE SEMANAL

### 10.1 Template del reporte

```markdown
# REPORTE SEMANAL YOUTUBE ADS — {{cliente_nombre}}

**Semana del:** {{fecha_inicio}} al {{fecha_fin}}
**Preparado por:** #13b youtube-ads
**Cuenta bajo MCC:** 424-957-3841
**Customer ID:** {{customer_id}}

---

## RESUMEN EJECUTIVO

| Metrica | Esta semana | Semana anterior | Diferencia |
|---------|-------------|-----------------|------------|
| Inversion | ${{monto}} | ${{monto}} | {{+/-%}} |
| Impresiones | {{N}} | {{N}} | {{+/-%}} |
| Vistas (views) | {{N}} | {{N}} | {{+/-%}} |
| View Rate | {{%}} | {{%}} | {{+/-}} |
| CPV promedio | ${{monto}} | ${{monto}} | {{+/-%}} |
| Clicks | {{N}} | {{N}} | {{+/-%}} |
| CTR | {{%}} | {{%}} | {{+/-}} |
| Conversiones | {{N}} | {{N}} | {{+/-%}} |
| CPA | ${{monto}} | ${{monto}} | {{+/-%}} |

**Objetivo CPV:** ${{monto}} — **Resultado:** {{ALCANZADO / NO ALCANZADO}}
**Objetivo CPA:** ${{monto}} — **Resultado:** {{ALCANZADO / NO ALCANZADO}}

---

## TOP 3 VIDEOS DE LA SEMANA

### 🏆 Video #1: "{{nombre_video}}"
- Formato: {{Skippable In-Stream / Shorts / etc}}
- Duracion: {{segundos}}s
- View Rate: {{%}}
- CPV: ${{monto}}
- Conversiones: {{N}}
- Cuartiles: 25%={{%}} / 50%={{%}} / 75%={{%}} / 100%={{%}}
- Por que funciono: {{analisis del hook}}

### 🥈 Video #2: "{{nombre}}"
[Mismo formato]

### 🥉 Video #3: "{{nombre}}"
[Mismo formato]

---

## VIDEOS PAUSADOS

| Video | Razon | View Rate | CPV |
|-------|-------|-----------|-----|
| {{nombre}} | View Rate < 15% | {{%}} | ${{monto}} |
| {{nombre}} | CPV > 3x objetivo | {{%}} | ${{monto}} |

---

## PLACEMENTS EXCLUIDOS ESTA SEMANA

| Canal excluido | Razon | Impresiones desperdiciadas |
|----------------|-------|---------------------------|
| {{canal 1}} | Kids content | {{N}} |
| {{canal 2}} | 0 conversions en 30 dias | {{N}} |
| {{canal 3}} | Irrelevante al nicho | {{N}} |

**Total placements excluidos acumulados:** {{N}}
**Ahorro estimado:** ${{monto}}/mes

---

## BREAKDOWN POR AUDIENCIA

| Audiencia | Impresiones | Vistas | View Rate | CPV | Conversiones | CPA |
|-----------|-------------|--------|-----------|-----|--------------|-----|
| Custom Intent - Amarres | {{N}} | {{N}} | {{%}} | ${{monto}} | {{N}} | ${{monto}} |
| Remarketing - Website Visitors | {{N}} | {{N}} | {{%}} | ${{monto}} | {{N}} | ${{monto}} |
| In-Market - Beauty Services | {{N}} | {{N}} | {{%}} | ${{monto}} | {{N}} | ${{monto}} |

---

## ACCIONES TOMADAS

1. **{{accion 1}}** — Impacto: {{descripcion}}
2. **{{accion 2}}** — Impacto: {{descripcion}}
3. **{{accion 3}}** — Impacto: {{descripcion}}

### Videos nuevos lanzados: {{N}}
### Placements excluidos: {{N}}
### Audiencias ajustadas: {{N}}

---

## ANALISIS DEL FUNNEL

Impresiones → Vistas → Clicks → Conversiones

| Etapa | N | % |
|-------|---|---|
| Impresiones | {{N}} | 100% |
| Vistas (30s+) | {{N}} | {{%}} |
| Clicks al sitio | {{N}} | {{%}} |
| Conversiones | {{N}} | {{%}} |

**Identificacion del cuello de botella:**
{{analisis del punto de fuga}}

---

## PLAN PROXIMA SEMANA

1. {{accion 1}} — Objetivo: {{resultado esperado}}
2. {{accion 2}} — Objetivo: {{resultado esperado}}

### Videos nuevos a producir: {{N}}
- Concepto 1: {{descripcion}}
- Concepto 2: {{descripcion}}

---

## RECOMENDACION DE PRESUPUESTO

**Presupuesto actual:** ${{monto}}/mes
**Recomendacion:** {{MANTENER / AUMENTAR X% / REDUCIR X%}}

**Justificacion:**
{{analisis basado en datos}}

---

## ALERTAS Y PROBLEMAS

{{Si hay alertas:}}
⚠️  **{{titulo}}**
{{descripcion + causa + accion + plazo}}

{{Si no hay:}}
✅ Sin alertas criticas esta semana.

---

*Reporte generado por #13b youtube-ads*
*Proximo reporte: {{fecha_proximo_lunes}}*
```

---

## REGLAS MAESTRAS DEL SKILL

1. **Los primeros 5 segundos son sagrados.** Todo lo demas depende de ganar ese tiempo.

2. **Nunca empezar con logo ni "Hola, soy..."**. Desperdicia los 5 segundos de oro.

3. **Skip Rate alto NO es malo.** La metrica que importa es CPV, no skip rate.

4. **Custom Intent Audiences son el secreto de YouTube Ads.** Combinan Google Search intent con video.

5. **YouTube es parte de un funnel, no la solucion completa.** Combinar con Google Search y Meta.

6. **Duracion importa segun objetivo.** 15-30s para conversion, 2-5min para educacion.

7. **YouTube Shorts Ads = TikTok rules.** Mismo formato, hook de 2 segundos.

8. **Exclusiones de placements OBLIGATORIAS.** Cada semana, sin excepcion.

9. **View Rate >= 30% es saludable.** Por debajo, el hook esta fallando.

10. **Skippable In-Stream es el formato default.** Cobra solo por viewers reales.

11. **Non-Skippable solo cuando el mensaje importa garantizarlo.** CPM alto.

12. **Bumper Ads para reforzar mensajes cortos.** 6 segundos de UN solo punto.

13. **In-Feed Video Ads para intent de busqueda.** Usuario elige verlo.

14. **Customer Match para retargeting de alta precision.** Lista hasheada de clientes.

15. **Similar Audiences estan siendo descontinuadas.** Usar Optimized Targeting.

16. **Geographic Targeting + Custom Intent = formula ganadora para locales.**

17. **Mobile + TV Screen son los devices principales de YouTube.** Optimizar para ambos.

18. **MCC 424-957-3841 compartido con Google Ads.** No separar YouTube de Google Ads.

19. **Placements exclusion list master compartida entre todos los clientes.**

20. **Renovar videos con > 60 dias activos.** Ad fatigue es real en YouTube tambien.

21. **Reporte semanal cada lunes a admin@addendo.io + cliente.**

22. **API via Google Ads API — mismas credenciales que google-ads (#12).**

23. **Tipo de campana en API: VIDEO con sub_type segun formato.**

24. **Compliance: mismas reglas que Google Ads.** YouTube hereda policies.

25. **El trafikero no crea videos — los produce el cliente o diseno-imagen.** Respeto por la cadena.
