// POST /api/pulse/start
// Modo Real — paso 1: subir ontología + disparar build de grafo. Stateless.
// Devuelve project_id + task_id que el frontend usa para polear /api/pulse/status.
import type { APIRoute } from 'astro';
import { ok, bad, fetchWithTimeout, notifyAlert, PULSE_BACKEND } from './_lib';

export const prerender = false;

interface StartInput {
  proyecto?: string;
  cliente?: string;
  mensaje?: string;
  perfil_publico?: string;
  num_agentes?: number;
}

export const POST: APIRoute = async ({ request }) => {
  let input: StartInput;
  try {
    input = await request.json() as StartInput;
  } catch {
    return bad(400, 'Body inválido');
  }
  const proyecto = String(input.proyecto || '').trim();
  const cliente = String(input.cliente || proyecto || '').trim();
  const mensaje = String(input.mensaje || '').trim();
  const perfil = String(input.perfil_publico || '').trim();
  const num_agentes = Number(input.num_agentes) || 300;
  if (!proyecto || !mensaje || !perfil) {
    return bad(400, 'Faltan campos: proyecto, mensaje y/o perfil_publico');
  }

  const briefText = [
    `PROYECTO: ${proyecto}`,
    `CLIENTE: ${cliente}`,
    '',
    'MENSAJE A SIMULAR',
    '==================',
    mensaje,
    '',
    'PERFIL DEL PÚBLICO OBJETIVO',
    '==================',
    perfil,
    '',
    `Cantidad de agentes solicitada: ${num_agentes}`,
  ].join('\n');

  // Step 1: ontology/generate (multipart). Native Web FormData works in Node 18+.
  const fd = new FormData();
  const blob = new Blob([briefText], { type: 'text/plain' });
  fd.append('files', blob, 'brief.txt');
  fd.append('simulation_requirement', 'Simular reacción del público objetivo al mensaje y predecir resonancia, adopción y resistencia.');
  fd.append('project_name', proyecto);
  fd.append('additional_context', perfil);

  let projectId: string;
  try {
    const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/graph/ontology/generate`, {
      method: 'POST',
      body: fd,
      timeoutMs: 50000,
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      await notifyAlert('start.ontology', `HTTP ${r.status}`, { proyecto, body: t.slice(0, 400) });
      return bad(502, `ontology/generate falló: HTTP ${r.status}`, { detail: t.slice(0, 400) });
    }
    const j: any = await r.json();
    projectId = j?.data?.project_id;
    if (!projectId) {
      await notifyAlert('start.ontology', 'project_id ausente en respuesta', { resp: j });
      return bad(502, 'ontology/generate no devolvió project_id', { resp: j });
    }
  } catch (e) {
    const err = e as Error & { cause?: any };
    const cause = err.cause ? (err.cause.code || err.cause.message || String(err.cause)) : '';
    const detail = err.message + (cause ? ' (cause: ' + cause + ')' : '');
    await notifyAlert('start.ontology', detail, { proyecto });
    return bad(502, 'No se pudo conectar con el motor de simulación: ' + detail);
  }

  // Step 2: graph/build (async — devuelve task_id rápido).
  let taskId: string;
  try {
    const r = await fetchWithTimeout(`${PULSE_BACKEND}/api/graph/build`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: projectId, graph_name: proyecto }),
      timeoutMs: 25000,
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      await notifyAlert('start.build', `HTTP ${r.status}`, { projectId, body: t.slice(0, 400) });
      return bad(502, `graph/build falló: HTTP ${r.status}`, { detail: t.slice(0, 400), project_id: projectId });
    }
    const j: any = await r.json();
    taskId = j?.data?.task_id;
    if (!taskId) {
      await notifyAlert('start.build', 'task_id ausente', { resp: j, projectId });
      return bad(502, 'graph/build no devolvió task_id', { resp: j, project_id: projectId });
    }
  } catch (e) {
    await notifyAlert('start.build', (e as Error).message, { projectId });
    return bad(502, 'graph/build error: ' + (e as Error).message, { project_id: projectId });
  }

  return ok({
    project_id: projectId,
    task_id: taskId,
    phase: 0,
    progress: 0,
    message: 'Construyendo grafo de agentes',
    started_at: Date.now(),
  });
};
