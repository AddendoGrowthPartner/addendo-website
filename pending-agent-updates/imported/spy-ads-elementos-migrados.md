# Elementos de valor específico migrados desde #5 FASE 2 → #6 agente-spy-ads

**Fecha:** 18 de abril de 2026
**Contexto:** Durante nivelación world-class de #5 scraping-inteligencia-competitiva, la FASE 2 (análisis de ads) fue eliminada para delegar completamente a #6 agente-spy-ads. Estos 3 elementos específicos de #5 FASE 2 deben importarse a #6 en su próxima nivelación world-class porque #6 actual (1568 líneas, no-nivelado) no los cubre.

**Ubicación:** `/pending-agent-updates/spy-ads-elementos-migrados.md`

---

## Elemento 1: Fórmula matemática de estimación CPC por keyword

**Fuente:** #5 FASE 2.3 líneas 293-306 (versión pre-nivelación, archivo BACKUP)

**Contenido a importar en #6:**

### Estimación de CPC por keyword

**API:** DataForSEO — `keywords_for_keywords`
**Endpoint:** `POST https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live`

Extraer las keywords implícitamente usadas en los anuncios:

```json
[
  {
    "keywords": ["{{keywords_extraidas_de_anuncios}}"],
    "language_code": "{{idioma}}",
    "location_name": "{{pais}}",
    "sort_by": "search_volume",
    "include_seed_keyword": true
  }
]
```

**Calcular gasto estimado mensual del competidor:**

```
gasto_estimado_mensual = SUM(cpc_keyword * clicks_estimados_keyword)

clicks_estimados_keyword = search_volume * CTR_ads_promedio
CTR_ads_promedio:
  - Posicion 1 ads: 2.1%
  - Posicion 2 ads: 1.4%
  - Posicion 3 ads: 1.3%
  - Posicion 4 ads: 1.2%
  - Promedio general: 1.5%
```

**Razón de migración:** #6 actual menciona herramientas (SpyFu $39-79/mes, SEMrush $129+/mes, DataForSEO) pero NO tiene esta fórmula específica de estimación matemática. Valor único que no debe perderse.

**Ubicación sugerida de importación en #6:** después de FASE 2.5 (SpyFu y SEMrush) como nueva sección 2.6 "Fórmula de estimación matemática de gasto".

---

## Elemento 2: Desglose estructural de anuncio por elemento

**Fuente:** #5 FASE 2.4 líneas 309-321 (versión pre-nivelación, archivo BACKUP)

**Contenido a importar en #6:**

### Análisis de estructura del anuncio

**Para cada anuncio activo ≥ 30 días, diseccionar:**

| Elemento | Que analizar | Por que importa |
|----------|-------------|-----------------|
| Headline 1 | Keyword principal usada | Revela la keyword que el competidor considera más valiosa |
| Headline 2 | Propuesta de valor o diferenciador | Revela como se posiciona vs la competencia |
| Headline 3 | CTA o refuerzo | Revela la acción que busca del usuario |
| Description 1 | Beneficios principales | Revela qué argumentos de venta funcionan en la industria |
| Description 2 | Prueba social o urgencia | Revela la táctica emocional que usa |
| Display URL | Path personalizado | Revela cómo estructura la experiencia post-click |
| Extensiones | Sitelinks, callouts, structured snippets, call, location | Revela qué tan sofisticada es su cuenta de Google Ads |
| Landing URL | Página de destino real | Revela dónde envía el tráfico y qué quiere que haga el usuario |

**Razón de migración:** #6 actual cubre mensajes en dimensión 2 de su análisis pero sin este desglose granular por elemento del anuncio (Headline 1/2/3, Description 1/2, Display URL, Extensiones, Landing URL). Este desglose es específico de Google Ads (RSA format) y da forma operativa al análisis que #6 hace cualitativamente.

**Ubicación sugerida de importación en #6:** dentro de FASE 3.3 (Analizar patrones), como nueva sub-sección "Desglose estructural por elemento en Google Ads (RSA)".

---

## Elemento 3: Taxonomía de 8 tipos de oferta con emociones dominantes

**Fuente:** #5 FASE 2.5 líneas 327-349 (versión pre-nivelación, archivo BACKUP)

**Contenido a importar en #6:**

### Análisis de oferta y emoción

**Clasificar cada anuncio en:**

**Tipo de oferta:**

| Tipo | Indicadores | Ejemplo |
|------|------------|---------|
| Descuento directo | %, off, descuento, ahorra, save | "20% Off First Service" |
| Gratis | free, gratis, sin costo, complimentary | "Free Consultation" |
| Garantía | guarantee, garantia, money back | "100% Satisfaction Guaranteed" |
| Urgencia | today, limited, expires, hoy, limitado | "Limited Time Offer" |
| Autoridad | #1, best, award, years, certificado | "Houston's #1 Rated" |
| Prueba social | reviews, clients, customers, reseñas | "500+ 5-Star Reviews" |
| Conveniencia | fast, same day, 24/7, rápido, hoy mismo | "Same Day Service" |
| Sin oferta | Solo información del servicio | "Professional Plumbing Services" |

**Emoción dominante:**

| Emoción | Indicadores |
|---------|------------|
| Miedo/urgencia | "Don't wait", "before it's too late", "emergency" |
| Confianza | "Trusted", "licensed", "insured", "certified" |
| Ahorro | "Save", "affordable", "best price", "lowest" |
| Exclusividad | "Premium", "luxury", "exclusive", "VIP" |
| Comodidad | "Easy", "hassle-free", "we handle everything" |
| Resultados | "Guaranteed results", "proven", "track record" |

**Razón de migración:** #6 actual menciona ofertas en dimensión 4 de su análisis (Free consultation, Discount, etc.) pero sin esta taxonomía estructurada de 8 tipos con indicadores lexicales específicos + tabla separada de 6 emociones dominantes. Permite clasificación sistemática en lugar de ad-hoc.

**Ubicación sugerida de importación en #6:** dentro de FASE 3.3 Dimensión 4 (Ofertas), como tabla estructurada de clasificación + nueva Dimensión 6.5 "Emoción dominante" con su tabla de indicadores.

---

## Próximo paso (tarea para agente humano o futura nivelación)

Cuando se nivele #6 agente-spy-ads a world-class v1.1:

1. Abrir este archivo `/pending-agent-updates/spy-ads-elementos-migrados.md`
2. Importar los 3 elementos en las ubicaciones sugeridas del agente nivelado #6
3. Verificar que no haya duplicación con contenido existente de #6 (merge inteligente)
4. Mencionar en el commit de nivelación de #6: "feat: importar 3 elementos migrados desde #5 (fórmula CPC, desglose estructural RSA, taxonomía ofertas)"
5. Después de importación exitosa, eliminar este archivo temporal

---

*Archivo generado durante nivelación world-class de #5 scraping-inteligencia-competitiva — 18 abril 2026*
*Commit de origen: [hash pendiente]*
