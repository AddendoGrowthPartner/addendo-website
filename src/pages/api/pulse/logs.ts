// GET /api/pulse/logs?simulation_id=&report_id=&since=N
// Returns conversational log lines (translated to Spanish).
// Before report exists: synthesizes lines from run-status (rounds, action counts).
// After report_id provided: pulls real agent-log and returns lines after `since`.
import type { APIRoute } from 'astro';
import { ok, bad, fetchWithTimeout, translateLogLine, PULSE_BACKEND } from './_lib';

export const prerender = false;

interface LogLine { ts: string; text: string; type: 'event' | 'pair'; }

export const GET: APIRoute = async ({ url }) => {
  const simulation_id = url.searchParams.get('simulation_id') || '';
  const report_id = url.searchParams.get('report_id') || '';
  const since = Number(url.searchParams.get('since') || 0);
  if (!simulation_id) return bad(400, 'simulation_id requerido');

  const logs: LogLine[] = [];
  let next_since = since;

  if (report_id) {
    // Fetch real agent log lines.
    try {
      const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/report/${report_id}/agent-log`, { timeoutMs: 20000 });
      if (r.ok) {
        const j: any = await r.json().catch(() => null);
        const arr: any[] = Array.isArray(j?.data?.lines) ? j.data.lines
                          : Array.isArray(j?.data?.logs) ? j.data.logs
                          : Array.isArray(j?.data) ? j.data : [];
        const sliced = arr.slice(since);
        for (let i = 0; i < sliced.length; i++) {
          const item = sliced[i];
          const text = typeof item === 'string' ? item : (item?.text || item?.message || JSON.stringify(item));
          const translated = translateLogLine(text).trim();
          if (!translated) continue;
          // Detect pair-style logs ("Agent #X → Agent #Y" or "Agente X to Agente Y")
          const isPair = /Agente\s+#?\d+\s*[-→to]/i.test(translated);
          logs.push({
            ts: new Date().toISOString(),
            text: translated,
            type: isPair ? 'pair' : 'event',
          });
        }
        next_since = since + sliced.length;
      }
    } catch (e) {
      // Non-fatal — return empty logs
      console.warn('[pulse/logs] agent-log fetch failed:', (e as Error).message);
    }
  } else {
    // Synthesize from run-status — provides round/action progress as event lines.
    try {
      const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/simulation/${simulation_id}/run-status`, { timeoutMs: 15000 });
      if (r.ok) {
        const j: any = await r.json().catch(() => null);
        const d = j?.data || {};
        const cur = Number(d.current_round || 0);
        const tot = Number(d.total_rounds || 0);
        const tw = Number(d.twitter_actions_count || 0);
        const rd = Number(d.reddit_actions_count || 0);
        const total = Number(d.total_actions_count || tw + rd);
        if (cur > 0) {
          logs.push({ ts: new Date().toISOString(), text: `Ronda ${cur}/${tot} en curso · ${total} interacciones procesadas`, type: 'event' });
        }
        if (tw > 0) logs.push({ ts: new Date().toISOString(), text: `Cluster Twitter activo — ${tw} acciones registradas`, type: 'event' });
        if (rd > 0) logs.push({ ts: new Date().toISOString(), text: `Cluster Reddit activo — ${rd} acciones registradas`, type: 'event' });
      }
    } catch (e) {
      console.warn('[pulse/logs] run-status synth failed:', (e as Error).message);
    }
  }

  return ok({ logs, next_since });
};
