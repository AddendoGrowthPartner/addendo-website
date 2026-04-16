// POST /api/pulse/demo
// Modo Demo: análisis del mensaje + público vía LLM, ~10-30s.
import type { APIRoute } from 'astro';
import { ok, bad, callClaudeJson } from './_lib';

export const prerender = false;

interface DemoInput {
  proyecto?: string;
  cliente?: string;
  mensaje?: string;
  perfil_publico?: string;
  num_agentes?: number;
}

export const POST: APIRoute = async ({ request }) => {
  let input: DemoInput;
  try {
    input = await request.json() as DemoInput;
  } catch {
    return bad(400, 'Body inválido — esperando JSON');
  }
  const proyecto = String(input.proyecto || '').trim();
  const cliente = String(input.cliente || proyecto || '').trim();
  const mensaje = String(input.mensaje || '').trim();
  const perfil = String(input.perfil_publico || '').trim();
  const num_agentes = Number(input.num_agentes) || 300;
  if (!proyecto || !mensaje || !perfil) {
    return bad(400, 'Faltan campos: proyecto, mensaje y/o perfil_publico');
  }

  const prompt = `Eres el motor de análisis de Addendo Pulse, sistema de simulación predictiva de mercado. Analiza en profundidad:

Proyecto: ${proyecto}
Cliente: ${cliente}
Mensaje a simular: ${mensaje}
Perfil del público: ${perfil}
Agentes simulados: ${num_agentes}

Responde SOLO con JSON válido sin markdown:
{
  "respuesta_positiva": número 40-85 basado en análisis real,
  "resonancia_mensaje": número coherente con respuesta_positiva,
  "tasa_adopcion": número realista 15-45 para este mercado,
  "indice_resistencia": número coherente 5-25,
  "insights": [
    "insight MUY específico sobre este mensaje y público",
    "debilidad concreta detectada en el mensaje",
    "oportunidad específica para este mercado",
    "comportamiento esperado del segmento dominante"
  ],
  "recomendaciones": [
    "recomendación específica de ajuste al mensaje",
    "recomendación de segmentación para este mercado",
    "recomendación de canal o formato específico"
  ],
  "conversaciones": [
    "Agente #XXX → Agente #XXX: texto específico al tema",
    "... 20 conversaciones únicas en total ..."
  ],
  "segmento_dominante": "descripción del segmento que más responde",
  "palabra_clave_resonancia": "palabra o frase del mensaje que más impacta"
}

Las conversaciones deben ser específicas al producto/oferta del mensaje, no genéricas. Los IDs son de 3 dígitos. Los números deben ser realistas (no redondos perfectos como 80, 50).`;

  const result = await callClaudeJson({
    prompt,
    maxTokens: 4096,
    timeoutMs: 45000,
  });

  if (!result.ok) {
    return bad(502, result.error, { raw: (result as any).raw });
  }
  // Light validation of expected fields, but don't reject if some are missing
  return ok({ data: result.data });
};
