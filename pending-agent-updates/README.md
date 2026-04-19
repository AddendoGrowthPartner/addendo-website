# pending-agent-updates — Deuda técnica de nivelación

Esta carpeta rastrea elementos de valor migrados entre agentes durante nivelaciones World-Class, cuando el agente receptor aún no ha sido nivelado. Cada archivo en el raíz representa deuda técnica pendiente de importar. Archivos en `imported/` son deuda cerrada.

## Histórico de deuda cerrada

### 2026-04-18 — #5 scraping-inteligencia-competitiva → #6 agente-spy-ads

Durante la nivelación World-Class de #5 scraping-inteligencia-competitiva (commit `5922a71`), la FASE 2 original de #5 (análisis de ads) fue eliminada para delegar completamente a #6 agente-spy-ads. Tres elementos específicos de valor único fueron preservados en `spy-ads-elementos-migrados.md` para asegurar que no se perdieran durante la transición.

**Elementos preservados e importados:**

1. **Fórmula matemática de estimación CPC por keyword** — `gasto_estimado_mensual = SUM(cpc_keyword × clicks_estimados)` con tabla CTR por posición (pos 1 = 2.1%, pos 2 = 1.4%, pos 3 = 1.3%, pos 4 = 1.2%, promedio = 1.5%). Endpoint DataForSEO `keywords_for_keywords`.
   - **Importado a #6 en:** sub-sección 2.7 "Estimación Matemática de Gasto Publicitario" (6 sub-apartados con fórmula canónica, API de entrada, protocolo de rangos de confianza, fórmula complementaria Meta, cuándo NO reportar, calibración continua).

2. **Desglose estructural de anuncio por elemento (Google Ads RSA)** — tabla de 8 elementos (Headline 1/2/3, Description 1/2, Display URL, Extensiones, Landing URL) con qué analizar y por qué importa.
   - **Importado a #6 en:** FASE 3.3 Dimensión 2.5 "Desglose Estructural RSA" con protocolo de extracción en 5 pasos + regla de oro mínimo 5 ads con longevidad ≥ 30 días.

3. **Taxonomía de 8 tipos de oferta + 6 emociones dominantes** — Descuento directo, Gratis, Garantía, Urgencia, Autoridad, Prueba social, Conveniencia, Sin oferta + Miedo/urgencia, Confianza, Ahorro, Exclusividad, Comodidad, Resultados.
   - **Importado a #6 en:** FASE 3.3 Dimensión 4 (reemplazo de lista ad-hoc) + Dimensión 6.5 "Emoción Dominante" con indicadores lexicales + visuales + gancho cross-dimensión.

**Commit de nivelación de #6 que cerró la deuda:** [hash pendiente]

**Archivo original preservado en:** `imported/spy-ads-elementos-migrados.md` (no eliminar — referencia histórica).

## Cómo usar esta carpeta

Cuando un agente se niveliza a World-Class y requiere migrar elementos a otro agente aún no-nivelado:

1. Crear archivo `[origen]-a-[destino]-elementos-migrados.md` en el raíz de `/pending-agent-updates/`.
2. Documentar cada elemento con: fuente (agente origen + líneas pre-nivelación), contenido completo, razón de migración, ubicación sugerida de importación.
3. Mencionar en el commit de nivelación del agente origen: "feat: preservar N elementos para migración a [destino] en /pending-agent-updates/".
4. Cuando se niveliza el agente destino, importar los elementos en las ubicaciones sugeridas.
5. Mover el archivo de `pending-agent-updates/` a `pending-agent-updates/imported/`.
6. Actualizar este README con el histórico.
