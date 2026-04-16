// GET /api/pulse/report?simulation_id=&report_id=
// Returns final structured analysis (same shape as /api/pulse/demo).
// Pulls markdown_content from the simulation backend, then asks the LLM to
// extract structured metrics + insights + recommendations.
import type { APIRoute } from 'astro';
import { ok, bad, fetchWithTimeout, callClaudeJson, notifyAlert, PULSE_BACKEND } from './_lib';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const simulation_id = url.searchParams.get('simulation_id') || '';
  let report_id = url.searchParams.get('report_id') || '';
  if (!simulation_id && !report_id) return bad(400, 'simulation_id o report_id requerido');

  // Resolve report_id if missing
  if (!report_id && simulation_id) {
    try {
      const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/report/by-simulation/${simulation_id}`, { timeoutMs: 15000 });
      if (r.ok) {
        const j: any = await r.json().catch(() => null);
        report_id = j?.data?.report_id || '';
      }
    } catch {}
  }
  if (!report_id) return bad(404, 'No hay reporte aún para esta simulación');

  // Fetch full report (markdown content)
  let markdown = '';
  try {
    const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/report/${report_id}`, { timeoutMs: 25000 });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      await notifyAlert('report.fetch', `HTTP ${r.status}`, { report_id, body: t.slice(0, 400) });
      return bad(502, `report fetch HTTP ${r.status}`);
    }
    const j: any = await r.json();
    markdown = String(j?.data?.markdown_content || '').trim();
    if (!markdown) {
      const status = j?.data?.status;
      if (status && status !== 'completed') return ok({ ready: false, status, report_id });
      return bad(502, 'Reporte vacío', { report_id });
    }
  } catch (e) {
    await notifyAlert('report.fetch', (e as Error).message, { report_id });
    return bad(502, 'No se pudo obtener el reporte: ' + (e as Error).message);
  }

  // Ask the LLM to extract structured JSON in same shape as demo.ts
  const truncated = markdown.length > 12000 ? markdown.slice(0, 12000) + '\n[truncated]' : markdown;
  const prompt = `Eres el motor de Addendo Pulse. Tienes a continuación el reporte completo de una simulación real de mercado en formato markdown. Extrae los datos clave en JSON con esta estructura EXACTA, sin markdown wrap, sin explicaciones:

{
  "respuesta_positiva": número 0-100 derivado del reporte,
  "resonancia_mensaje": número 0-100,
  "tasa_adopcion": número 0-100,
  "indice_resistencia": número 0-100,
  "insights": [
    "insight específico extraído del reporte",
    "debilidad detectada",
    "oportunidad identificada",
    "comportamiento del segmento dominante"
  ],
  "recomendaciones": [
    "recomendación específica del reporte",
    "recomendación de segmentación",
    "recomendación de canal o formato"
  ],
  "conversaciones": [
    "Agente #XXX → Agente #XXX: texto extraído o sintetizado del reporte",
    "(20 conversaciones representativas)"
  ],
  "segmento_dominante": "descripción del segmento que más respondió",
  "palabra_clave_resonancia": "palabra o frase del mensaje que más impactó"
}

REPORTE:
${truncated}`;

  const result = await callClaudeJson({
    prompt,
    maxTokens: 4096,
    timeoutMs: 50000,
  });
  if (!result.ok) {
    await notifyAlert('report.parse', result.error, { report_id, raw: (result as any).raw });
    return bad(502, 'Análisis del reporte falló: ' + result.error);
  }

  return ok({ ready: true, report_id, data: result.data });
};
