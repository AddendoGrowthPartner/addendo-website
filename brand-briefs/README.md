# Brand Briefs — Addendo Growth Partner

Esta carpeta contiene los brand briefs completos de cada cliente de Addendo.

## Estructura de archivos

Cada cliente tiene su propio archivo:
- `cliente-nombre.md` — brand brief completo del cliente

Nombre en kebab-case (minusculas, guiones en lugar de espacios o acentos).

## Como se crean

Los brand briefs se generan invocando al agente #53 (`agente-branding`) con contexto del cliente. El agente produce el brief aplicando sus procesos universales al contexto especifico del cliente.

Flujo tipico:
1. `director-cuenta` (#3) entrega el contexto del cliente al agente-branding
2. `director-estrategia` (#9) entrega el posicionamiento y el mapa competitivo
3. `agente-branding` (#53) produce el brand brief completo y lo guarda aqui
4. `diseno-web` (#18), `diseno-imagen` (#17) y `frontend-dev` (#21) consumen este brief como fuente de verdad para sus entregables

## Que contiene cada brand brief

- Executive summary del cliente
- Buyer persona visual
- Mood board references
- Posicionamiento en mapa competitivo visual
- Paleta propuesta con razon estrategica (hex + HSL + OKLCH)
- Tipografias propuestas con razon estrategica
- Sistema de espacio y forma
- 5 principios visuales del brand
- Lo que el brand NO es
- Tono visual
- Aplicaciones clave (web, ads, redes, email, merchandise)
- Design tokens listos para `tailwind.config.js`
- Logo prompts listos para Midjourney

## Indice de clientes actuales

(vacio — se actualizara al generar cada brief)
