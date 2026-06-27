// ============================================================
// bridge/index.ts — NUI bridge kt_hud v3
// ============================================================
import { useEffect } from 'react';
import { useHudStore } from '../store';
import type { PlayerData, VehicleData, MinimapShape } from '../store';

type NuiAction =
  | { action: 'updateHud';     data: Partial<PlayerData> }
  | { action: 'updateVehicle'; data: Partial<VehicleData> }
  | { action: 'setVisible';    data: { visible: boolean } | boolean }
  | { action: 'setConfig';     data: { minimapShape?: MinimapShape } };

const IS_FIVEM = navigator.userAgent.includes('CitizenFX');

export async function fetchNui<T = unknown>(event: string, data?: unknown): Promise<T | null> {
  if (!IS_FIVEM) { console.log('[fetchNui DEV]', event, data); return null; }
  const res = (window as any).GetParentResourceName?.() ?? 'kt_hud';
  const r = await fetch(`https://${res}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data ?? {}),
  });
  return r.json();
}

// ── Hook bridge FiveM ─────────────────────────────────────────
export function useNuiBridge(): void {
  useEffect(() => {
    const { setPlayer, setVehicle, setVisible, setConfig } = useHudStore.getState();
    const handler = (e: MessageEvent<NuiAction>) => {
      const { action, data } = e.data ?? {};
      switch (action) {
        case 'updateHud':     setPlayer(data); break;
        case 'updateVehicle': setVehicle(data); break;
        case 'setVisible': {
          const v = typeof data === 'boolean' ? data : (data as any).visible ?? true;
          setVisible(Boolean(v));
          break;
        }
        case 'setConfig': setConfig(data); break;
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
}

// ── Hook DEV — initialise immédiatement (pas dans useEffect) ──
// setVisible(true) appelé en dehors du useEffect pour éviter
// le flash de page vide au premier render
export function useDevSync(): void {
  // Init immédiate au module load (hors React) en DEV
  if (import.meta.env.DEV) {
    const s = useHudStore.getState();
    if (!s.visible) {
      s.setConfig({ minimapShape: 'circle' });
      s.setVisible(true);
      s.setPlayer({ health: 78, armor: 45 });
      s.setVehicle({ speed: 0, fuel: 72, inVehicle: false });
    }
  }

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    let t = 0;
    const id = setInterval(() => {
      t++;
      useHudStore.getState().setPlayer({
        health: Math.max(0, Math.min(100, 50 + Math.round(Math.sin(t * 0.07) * 45))),
        armor:  Math.max(0, Math.min(100, 30 + Math.round(Math.cos(t * 0.05) * 28))),
      });
    }, 700);

    return () => clearInterval(id);
  }, []);
}
