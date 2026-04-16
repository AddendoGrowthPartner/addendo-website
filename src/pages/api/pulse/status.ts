// GET /api/pulse/status?project_id=&task_id=&simulation_id=&prep_task_id=&report_id=
// Stateless orchestrator: each call advances the state machine if possible.
// Frontend persists returned IDs and includes them in subsequent calls.
import type { APIRoute } from 'astro';
import { ok, bad, fetchWithTimeout, notifyAlert, PULSE_BACKEND } from './_lib';

export const prerender = false;

const TERMINAL_OK = new Set(['completed', 'ready', 'finished', 'success', 'done']);
const TERMINAL_FAIL = new Set(['failed', 'error', 'cancelled', 'crashed']);

async function getJson(url: string) {
  const r = await fetchWithTimeout(url, { timeoutMs: 20000 });
  return { status: r.status, body: await r.json().catch(() => null) as any };
}
async function postJson(url: string, body: unknown) {
  const r = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    timeoutMs: 25000,
  });
  return { status: r.status, body: await r.json().catch(() => null) as any };
}

export const GET: APIRoute = async ({ url }) => {
  const project_id = url.searchParams.get('project_id') || '';
  const task_id = url.searchParams.get('task_id') || '';
  let simulation_id = url.searchParams.get('simulation_id') || '';
  let prep_task_id = url.searchParams.get('prep_task_id') || '';
  let report_id = url.searchParams.get('report_id') || '';

  if (!project_id || !task_id) return bad(400, 'project_id y task_id requeridos');

  // ---- PHASE 0: graph build ----
  if (!simulation_id) {
    let res;
    try { res = await getJson(`${PULSE_BACKEND}/api/graph/task/${task_id}`); }
    catch (e) { return bad(502, 'graph/task error: ' + (e as Error).message); }
    if (res.status !== 200) return bad(502, `graph/task HTTP ${res.status}`);
    const t = res.body?.data || {};
    const status = String(t.status || '').toLowerCase();
    if (TERMINAL_FAIL.has(status)) {
      await notifyAlert('status.graph', 'graph build failed', { task_id, body: t });
      return bad(500, 'Build de grafo falló', { stage: 'graph', detail: t?.error || status });
    }
    if (!TERMINAL_OK.has(status)) {
      // still building — report progress
      const progress = Math.min(95, Math.round((t.progress || 0) * 100));
      return ok({
        phase: 0, progress, completed: false,
        project_id, task_id,
        message: t.message || 'Construyendo grafo social',
      });
    }
    // graph done — create simulation
    const create = await postJson(`${PULSE_BACKEND}/api/simulation/create`, { project_id });
    if (create.status !== 200 || !create.body?.data?.simulation_id) {
      await notifyAlert('status.create', `HTTP ${create.status}`, { project_id, body: create.body });
      return bad(502, 'simulation/create falló', { detail: create.body });
    }
    simulation_id = create.body.data.simulation_id;
    // immediately trigger prepare (async — returns prep task_id)
    const prep = await postJson(`${PULSE_BACKEND}/api/simulation/prepare`, { simulation_id });
    if (prep.status !== 200) {
      await notifyAlert('status.prepare', `HTTP ${prep.status}`, { simulation_id, body: prep.body });
      return bad(502, 'simulation/prepare falló', { detail: prep.body });
    }
    prep_task_id = prep.body?.data?.task_id || '';
    const alreadyPrepared = !!prep.body?.data?.already_prepared;
    return ok({
      phase: 1, progress: alreadyPrepared ? 100 : 5, completed: false,
      project_id, task_id, simulation_id, prep_task_id,
      message: alreadyPrepared ? 'Perfiles ya preparados' : 'Generando perfiles psicográficos',
    });
  }

  // ---- PHASE 1: simulation prepare ----
  // Try to detect if prepare is done via prepare/status (POST despite name).
  if (simulation_id) {
    // Check prepare/status with simulation_id (works even if prep_task_id missing).
    const ps = await postJson(`${PULSE_BACKEND}/api/simulation/prepare/status`, prep_task_id ? { task_id: prep_task_id, simulation_id } : { simulation_id });
    const pd = ps.body?.data || {};
    const psStatus = String(pd.status || '').toLowerCase();
    const isReady = pd.already_prepared === true || psStatus === 'ready' || TERMINAL_OK.has(psStatus);
    if (TERMINAL_FAIL.has(psStatus)) {
      await notifyAlert('status.prep_poll', 'prepare failed', { simulation_id, body: pd });
      return bad(500, 'Preparación de simulación falló', { stage: 'prepare', detail: pd });
    }

    if (!isReady) {
      // Still preparing
      const progress = typeof pd.progress === 'number' ? Math.min(95, pd.progress) : 25;
      return ok({
        phase: 1, progress, completed: false,
        project_id, task_id, simulation_id, prep_task_id,
        message: pd.message || 'Generando perfiles psicográficos',
      });
    }

    // Prepare ready — ensure simulation has been started
    // Check current run-status; if "idle" or no run_state, trigger start.
    const run = await getJson(`${PULSE_BACKEND}/api/simulation/${simulation_id}/run-status`);
    const rd = run.body?.data || {};
    const rs = String(rd.runner_status || '').toLowerCase();
    const totalRounds = Number(rd.total_rounds || 0);
    const currentRound = Number(rd.current_round || 0);
    const pct = Number(rd.progress_percent || 0);
    const startedYet = rs === 'running' || rs === 'completed' || rs === 'finished' || rs === 'stopped' || totalRounds > 0;

    if (!startedYet) {
      const startResp = await postJson(`${PULSE_BACKEND}/api/simulation/start`, {
        simulation_id, platform: 'parallel', max_rounds: 10,
      });
      if (startResp.status !== 200) {
        await notifyAlert('status.start', `HTTP ${startResp.status}`, { simulation_id, body: startResp.body });
        return bad(502, 'simulation/start falló', { detail: startResp.body });
      }
      return ok({
        phase: 2, progress: 0, completed: false,
        project_id, task_id, simulation_id, prep_task_id,
        message: 'Simulación iniciada',
      });
    }

    // ---- PHASE 2: simulation running ----
    if (rs === 'running' || rs === 'idle' || rs === 'starting') {
      const progress = totalRounds > 0 ? Math.min(99, Math.round((currentRound / totalRounds) * 100)) : Math.round(pct);
      return ok({
        phase: 2, progress, completed: false,
        project_id, task_id, simulation_id, prep_task_id,
        current_round: currentRound, total_rounds: totalRounds,
        message: `Simulando interacciones — ronda ${currentRound}/${totalRounds || '?'}`,
      });
    }

    // Simulation finished — proceed to phase 3 (report generation)
    if (TERMINAL_FAIL.has(rs)) {
      await notifyAlert('status.run', 'simulation failed', { simulation_id, body: rd });
      return bad(500, 'Simulación falló', { stage: 'run', detail: rd });
    }

    // ---- PHASE 3: report ----
    if (!report_id) {
      // Check if a report already exists; otherwise trigger generate.
      const check = await getJson(`${PULSE_BACKEND}/api/report/by-simulation/${simulation_id}`);
      let existing = check.body?.data;
      if (existing?.report_id) {
        report_id = existing.report_id;
      } else {
        const gen = await postJson(`${PULSE_BACKEND}/api/report/generate`, { simulation_id });
        if (gen.status !== 200) {
          await notifyAlert('status.report_gen', `HTTP ${gen.status}`, { simulation_id, body: gen.body });
          return bad(502, 'report/generate falló', { detail: gen.body });
        }
        report_id = gen.body?.data?.report_id || '';
      }
    }

    if (report_id) {
      const prog = await getJson(`${PULSE_BACKEND}/api/report/${report_id}/progress`);
      const pg = prog.body?.data || {};
      const psStatus2 = String(pg.status || '').toLowerCase();
      if (TERMINAL_FAIL.has(psStatus2)) {
        await notifyAlert('status.report_poll', 'report failed', { report_id, body: pg });
        return bad(500, 'Generación de reporte falló', { stage: 'report', detail: pg });
      }
      const reportProgress = typeof pg.progress === 'number' ? pg.progress : 0;
      const isReady = TERMINAL_OK.has(psStatus2);
      return ok({
        phase: 3, progress: Math.min(100, reportProgress), completed: isReady,
        project_id, task_id, simulation_id, prep_task_id, report_id,
        message: pg.message || (isReady ? 'Reporte listo' : 'Analizando resultados'),
      });
    }
  }

  return bad(500, 'Estado inesperado en orquestador');
};
