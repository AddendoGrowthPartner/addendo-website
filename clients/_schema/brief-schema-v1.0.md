# Schema Canónico de Brief Cliente — v1.0

**Propósito:** estructura única y replicable que define cómo se documenta cada cliente del workflow multi-tenant Addendo Agency OS. Single source of truth de qué campos lleva cada brief.

**Estado:** v1.0 derivado del brief CreditBridge (cliente piloto, 25 abril 2026)

## Estructura de archivos por cliente

```
clients/
├── _schema/
│   └── brief-schema-v1.0.md (este archivo)
├── _examples/
│   └── brief-example.json
└── {client_slug}/
    ├── brief.json          (canónico, fuente de verdad)
    ├── assets/             (logos, imágenes generadas)
    ├── output/             (sitio generado, deploys)
    └── changelog.md        (historial de cambios al brief)
```

## Campos canónicos del brief.json

### Identificación (required)
- `agente` — string, slug lowercase kebab-case del cliente
- `version` — string, versionado semántico del brief (v1.0, v1.1, etc.)
- `fecha_creacion` — string, formato ISO YYYY-MM-DD
- `categoria_producto` — string, snake_case describiendo categoría

### Posicionamiento (required)
- `tagline` — object con keys `es_principal`, `es_diferenciador`, `en_principal`, `en_diferenciador`
- `diferenciador_estrategico` — object con keys `es`, `en`
- `pain_points` — array de objects, cada uno con `id`, `es`, `en`, y triggers culturales

### Modelo comercial (required)
- `tiers` — object con tiers (esencial, avanzado, privado), cada uno con nombre ES/EN, contenido, y flag `precio_publico_visible`
- `vocabulario` — object con `permitido_es`, `permitido_en`, `vetado_es`, `vetado_en`

### Audiencia (required)
- `audiencia` — object con `primaria_fase_1`, `secundaria_dia_1`, `expansion_futura`, `principio`

### Compliance (required para verticales reguladas)
- `compliance_lenguaje` — object con `modo`, flags booleanos de restricciones, `tono`

### Branding (required)
- `visual` — object con `paleta` (5 colores hex), `tipografia`, `estandar_calidad`, `benchmarks`, `lighthouse_target_mobile`, `fotografia`
- `logo` — object con `concepto`, `metáfora`, `wordmark`, tipografía, versión cromática

### Infraestructura (required)
- `dominio` — object con `primario`, `estado`, `registrar_recomendado`
- `infraestructura` — object con `stack`, `hosting`, `repo`, `local`, `i18n`

### Estrategia legal/financiera (optional para clientes de marketing, required para proyectos propios)
- `arquitectura_legal` — object con estado actual y triggers de refactor
- `tesis_negocio` — object con horizonte, exit target, modelo revenue, TAM
- `trust_signals_v1` — object con permitidos día 1 y diferidos para v2

## Reglas de naming

- `client_slug`: lowercase, kebab-case, sin acentos, sin caracteres especiales
- Ejemplo válido: `creditbridge`, `bebe-genial`, `ciudad-maderas`
- Ejemplo inválido: `CreditBridge`, `bebé_genial`, `ciudad maderas`

## Versionado del schema

Este schema es v1.0. Cualquier cambio breaking requiere v2.0 + plan de migración para clientes existentes.
