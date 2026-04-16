// Shared helpers for /api/pulse/* routes. Server-side only.

export const PULSE_BACKEND = 'http://3.231.126.70:5001';
export const ALERT_WEBHOOK_URL = 'https://n8n.addendo.io/webhook/addendo-pulse-alert';

export type PulsePhase = 0 | 1 | 2 | 3;

export function bad(status: number, message: string, extra: Record<string, unknown> = {}) {
  return new Response(JSON.stringify({ ok: false, error: message, ...extra }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function ok(payload: Record<string, unknown>) {
  return new Response(JSON.stringify({ ok: true, ...payload }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function fetchWithTimeout(url: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 25000, ...rest } = init;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...rest, signal: ctl.signal });
  } finally {
    clearTimeout(t);
  }
}

export async function notifyAlert(stage: string, errorMsg: string, payload: Record<string, unknown> = {}) {
  console.error(`[pulse-alert] ${stage}: ${errorMsg}`, payload);
  try {
    await fetchWithTimeout(ALERT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: `[Addendo Pulse] Falla en ${stage}`,
        body: `Stage: ${stage}\nError: ${errorMsg}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`,
        ts: new Date().toISOString(),
      }),
      timeoutMs: 5000,
    });
  } catch (e) {
    console.error('[pulse-alert] notify failed', (e as Error).message);
  }
}

// ---- Light translation dictionary for MiroFish agent logs ----
const TRANS_PAIRS: Array<[RegExp, string]> = [
  [/\bUser\b/g, 'Usuario'],
  [/\bUsers\b/g, 'Usuarios'],
  [/\bAgent\b/g, 'Agente'],
  [/\bAgents\b/g, 'Agentes'],
  [/\bRound\b/g, 'Ronda'],
  [/\bRounds\b/g, 'Rondas'],
  [/\bcompleted\b/gi, 'completado'],
  [/\bstarting\b/gi, 'iniciando'],
  [/\bstarted\b/gi, 'iniciado'],
  [/\bfinished\b/gi, 'finalizado'],
  [/\bfailed\b/gi, 'fallido'],
  [/\bsuccess\b/gi, 'éxito'],
  [/\bgraph\b/g, 'grafo'],
  [/\bsimulation\b/g, 'simulación'],
  [/\bprofile\b/g, 'perfil'],
  [/\bprofiles\b/g, 'perfiles'],
  [/\bpreparing\b/gi, 'preparando'],
  [/\bbuilding\b/gi, 'construyendo'],
  [/\binteraction\b/g, 'interacción'],
  [/\binteractions\b/g, 'interacciones'],
  [/\baction\b/g, 'acción'],
  [/\bactions\b/g, 'acciones'],
  [/\bpost\b/g, 'publicación'],
  [/\bposts\b/g, 'publicaciones'],
  [/\bcomment\b/g, 'comentario'],
  [/\bcomments\b/g, 'comentarios'],
  [/\blike\b/g, 'like'],
  [/\blikes\b/g, 'likes'],
  [/\bfollower\b/g, 'seguidor'],
  [/\bfollowers\b/g, 'seguidores'],
  [/\bnetwork\b/gi, 'red'],
  [/\bcluster\b/g, 'cluster'],
  [/\bsegment\b/g, 'segmento'],
  [/\bgenerating\b/gi, 'generando'],
  [/\bbatch\b/g, 'batch'],
  [/\bentity\b/g, 'entidad'],
  [/\bentities\b/g, 'entidades'],
  [/\brunning\b/gi, 'ejecutando'],
  [/\bidle\b/gi, 'inactivo'],
  [/\bstopped\b/gi, 'detenido'],
];
export function translateLogLine(line: string): string {
  let out = line;
  for (const [re, rep] of TRANS_PAIRS) out = out.replace(re, rep);
  return out;
}

// ---- Claude API helper ----
export async function callClaudeJson(opts: {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  timeoutMs?: number;
  model?: string;
}): Promise<{ ok: true; data: any } | { ok: false; error: string; raw?: string }> {
  const apiKey = (globalThis as any).process?.env?.ANTHROPIC_API_KEY;
  if (!apiKey) return { ok: false, error: 'ANTHROPIC_API_KEY not configured on server' };
  const model = opts.model || 'claude-sonnet-4-5';
  let resp: Response;
  try {
    resp = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 4096,
        system: opts.systemPrompt,
        messages: [{ role: 'user', content: opts.prompt }],
      }),
      timeoutMs: opts.timeoutMs ?? 45000,
    });
  } catch (e) {
    return { ok: false, error: 'Request to model failed: ' + (e as Error).message };
  }
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    return { ok: false, error: `Model HTTP ${resp.status}`, raw: text.slice(0, 500) };
  }
  const body: any = await resp.json().catch(() => null);
  const text: string = body?.content?.[0]?.text || '';
  // Try to parse JSON. Strip markdown fences if present.
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  try {
    return { ok: true, data: JSON.parse(cleaned) };
  } catch {
    // Try to find a {...} block
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try { return { ok: true, data: JSON.parse(match[0]) }; } catch {}
    }
    return { ok: false, error: 'Model did not return valid JSON', raw: cleaned.slice(0, 500) };
  }
}
