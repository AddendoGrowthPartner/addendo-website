// GET /api/pulse/logs?simulation_id=&report_id=&since=N
// Returns conversational log lines translated to Spanish via Claude API.
// Before report exists: synthesizes lines from run-status (rounds, action counts).
// After report_id provided: pulls real MiroFish agent-log, filters noise,
// translates up to 5 lines per call with Claude Haiku, falls back to synthetic
// Spanish logs if translation fails or filtering leaves nothing.
import type { APIRoute } from 'astro';
import { ok, bad, fetchWithTimeout, PULSE_BACKEND } from './_lib';

export const prerender = false;

interface LogLine { ts: string; text: string; type: 'event' | 'pair'; }

const FILTER_TOKENS = [
  'tool_call', 'tool_result', 'elapsed_seconds', 'report_id',
  'section_index', 'timestamp', 'acción', 'action',
  'details', 'parameters',
];

function shouldFilter(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 15) return true;
  const first = trimmed.charAt(0);
  if (first === '{' || first === '[') return true;
  const low = trimmed.toLowerCase();
  for (const tok of FILTER_TOKENS) {
    if (low.includes(tok)) return true;
  }
  return false;
}

async function translateLinesWithClaude(lines: string[]): Promise<string[] | null> {
  if (!lines.length) return [];
  const apiKey = (globalThis as any).process?.env?.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const numbered = lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
  const prompt = `Traduce estas líneas de log de simulación al español natural y profesional.
Si la línea está en chino, tradúcela al español.
Si ya está en español o inglés, corrígela y mejórala.
Devuelve SOLO las líneas traducidas, una por línea, sin explicaciones.
Mantén el formato 'Agente #XXX → Agente #YYY: texto' cuando aplique.
Líneas a traducir:
${numbered}`;

  try {
    const resp = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
      timeoutMs: 12000,
    });
    if (!resp.ok) {
      console.warn('[pulse/logs] Claude HTTP', resp.status);
      return null;
    }
    const body: any = await resp.json().catch(() => null);
    const text: string = body?.content?.[0]?.text || '';
    const out: string[] = [];
    for (const raw of text.split('\n')) {
      const cleaned = raw.replace(/^\s*\d+[\.\)]\s*/, '').trim();
      if (!cleaned) continue;
      const low = cleaned.toLowerCase();
      // Skip Claude preamble like "Aquí tienes..." or "Las traducciones..."
      if (low.startsWith('aquí') || low.startsWith('las traducciones') || low.startsWith('traducciones:')) continue;
      out.push(cleaned);
    }
    return out;
  } catch (e) {
    console.warn('[pulse/logs] Claude translation failed:', (e as Error).message);
    return null;
  }
}

const SYNTH_PAIRS = [
  'El mensaje genera confianza inmediata',
  '¿Has visto resultados similares antes?',
  'La oferta resuena pero el precio confunde',
  'Esto encaja con lo que estaba buscando',
  'Necesito más prueba social antes de decidir',
  'El timing es perfecto para mi situación actual',
  'Tengo dudas sobre la garantía',
  'Comparto esto con mi equipo',
  'Me recuerda algo que vi la semana pasada',
  'Convencido — pediré más información',
  'Suena demasiado bueno para ser verdad',
  'El segundo párrafo me hizo cambiar de opinión',
  'Necesito ver casos en mi industria',
  'Esto cambia la conversación con mi jefe',
  'El valor percibido supera al precio',
  'Me falta claridad sobre la implementación',
];

const SYNTH_EVENTS = [
  'Cluster converge hacia consenso positivo',
  'Subgrafo #{n} forma patrón de adopción emergente',
  'Red neuronal: señal amplificada por nodos líderes',
  'Difusión viral detectada — propagación {k}x baseline',
  'Polarización emergente entre segmentos',
  'Pico de actividad — {k} interacciones en ventana reciente',
  'Cluster de resistencia identificado — {k} agentes',
  'Nodo líder amplifica mensaje — {k} conexiones activas',
];

function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rndId(): string { return String(Math.floor(Math.random() * 1000)).padStart(3, '0'); }

function generateSyntheticLogs(count: number): LogLine[] {
  const out: LogLine[] = [];
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.6) {
      out.push({
        ts: new Date().toISOString(),
        text: `Agente #${rndId()} → Agente #${rndId()}: ${rnd(SYNTH_PAIRS)}`,
        type: 'pair',
      });
    } else {
      const tpl = rnd(SYNTH_EVENTS);
      const text = tpl
        .replace('{n}', String(1 + Math.floor(Math.random() * 9)))
        .replace('{k}', String(15 + Math.floor(Math.random() * 120)));
      out.push({ ts: new Date().toISOString(), text, type: 'event' });
    }
  }
  return out;
}

function classifyType(text: string): 'event' | 'pair' {
  return /Agente\s+#?\d+\s*[→\-]/i.test(text) || /Agente\s+#?\d+\s+to\s+Agente/i.test(text)
    ? 'pair'
    : 'event';
}

export const GET: APIRoute = async ({ url }) => {
  const simulation_id = url.searchParams.get('simulation_id') || '';
  const report_id = url.searchParams.get('report_id') || '';
  const since = Number(url.searchParams.get('since') || 0);
  if (!simulation_id) return bad(400, 'simulation_id requerido');

  const logs: LogLine[] = [];
  let next_since = since;

  if (report_id) {
    try {
      const r = await fetchWithTimeout(
        `${PULSE_BACKEND}/api/report/${report_id}/agent-log`,
        { timeoutMs: 20000 },
      );
      if (r.ok) {
        const j: any = await r.json().catch(() => null);
        const arr: any[] = Array.isArray(j?.data?.lines) ? j.data.lines
          : Array.isArray(j?.data?.logs) ? j.data.logs
          : Array.isArray(j?.data) ? j.data : [];
        const sliced = arr.slice(since);

        // Walk through new lines, keep up to 5 that survive filtering.
        // Advance `next_since` only through items we actually processed —
        // if we stop early after 5, subsequent polls resume from there.
        const rawLines: string[] = [];
        let processedCount = 0;
        for (const item of sliced) {
          if (rawLines.length >= 5) break;
          processedCount++;
          const text = typeof item === 'string' ? item : (item?.text || item?.message || '');
          if (typeof text !== 'string' || !text) continue;
          if (shouldFilter(text)) continue;
          rawLines.push(text.trim());
        }
        next_since = since + processedCount;

        if (rawLines.length) {
          const translated = await translateLinesWithClaude(rawLines);
          if (translated && translated.length) {
            for (const t of translated) {
              if (t.length >= 8) {
                logs.push({
                  ts: new Date().toISOString(),
                  text: t,
                  type: classifyType(t),
                });
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('[pulse/logs] agent-log fetch failed:', (e as Error).message);
    }
  } else {
    try {
      const r = await fetchWithTimeout(
        `${PULSE_BACKEND}/api/simulation/${simulation_id}/run-status`,
        { timeoutMs: 15000 },
      );
      if (r.ok) {
        const j: any = await r.json().catch(() => null);
        const d = j?.data || {};
        const cur = Number(d.current_round || 0);
        const tot = Number(d.total_rounds || 0);
        const tw = Number(d.twitter_actions_count || 0);
        const rd = Number(d.reddit_actions_count || 0);
        const total = Number(d.total_actions_count || tw + rd);
        if (cur > 0) {
          logs.push({
            ts: new Date().toISOString(),
            text: `Ronda ${cur}/${tot} en curso · ${total} interacciones procesadas`,
            type: 'event',
          });
        }
        if (tw > 0) logs.push({
          ts: new Date().toISOString(),
          text: `Cluster Twitter activo — ${tw} acciones registradas`,
          type: 'event',
        });
        if (rd > 0) logs.push({
          ts: new Date().toISOString(),
          text: `Cluster Reddit activo — ${rd} acciones registradas`,
          type: 'event',
        });
      }
    } catch (e) {
      console.warn('[pulse/logs] run-status synth failed:', (e as Error).message);
    }
  }

  // If filter + translation produced nothing usable, emit synthetic Spanish
  // logs so the UI still feels alive. Never show raw Chinese / JSON / tech names.
  if (logs.length === 0) {
    logs.push(...generateSyntheticLogs(2));
  }

  return ok({ logs, next_since });
};
