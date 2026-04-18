# Strategy Docs — Addendo Growth Partner

Esta carpeta contiene los planes estrategicos comerciales completos de cada cliente de Addendo.

## Estructura

Cada cliente tiene su propio archivo:
- `cliente-nombre.md` — plan estrategico comercial completo del cliente

Nombre en kebab-case (minusculas, guiones en lugar de espacios o acentos).

Contenido tipico de cada archivo:
- Posicionamiento operativo
- Buyer persona detallado
- Customer journey map
- Arquitectura de funnel de adquisicion
- Arquitectura de paginas web del sitio
- Plan go-to-market de 90 dias
- Metricas por etapa

## Como se crean

Los strategy docs se generan invocando al agente #54 (`agente-estrategia-comercial`) con el brief del cliente. El agente aplica sus frameworks universales al contexto especifico del cliente.

Flujo tipico:
1. `director-cuenta` (#3) entrega el contexto del cliente
2. `director-estrategia` (#9) entrega el Plan Estrategico macro
3. `agente-investigacion` (#8) y `agente-auditoria` (#10) aportan data competitiva
4. `agente-branding` (#53) entrega el brand brief si ya existe
5. `agente-estrategia-comercial` (#54) produce el strategy doc y lo guarda aqui
6. `copywriting-seo` (#16), `diseno-web` (#18), `frontend-dev` (#21) y los agentes de paid media consumen este doc como fuente de verdad para sus entregables

## Que contiene cada strategy doc

- Executive summary del cliente
- Positioning statement final
- Competitive alternatives mapeados
- Buyer persona con 12 dimensiones
- Customer journey en 5 fases + 4 sub-fases
- Touchpoint plan
- Tipo de funnel recomendado con razon
- Sitemap del sitio web + wireframe verbal de home
- CTAs por pagina por fase del journey
- Plan go-to-market de 90 dias (3 fases × 30 dias)
- Channel-market fit matrix aplicada
- Metricas y KPIs AARRR con benchmarks sugeridos

## Indice de clientes actuales

(vacio — se actualizara al generar cada doc)
