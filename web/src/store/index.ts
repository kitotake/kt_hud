// ============================================================
// store/index.ts — store Zustand centralisé kt_hud v3
// ============================================================
import { create } from 'zustand';

// ── Types ─────────────────────────────────────────────────────
export type MinimapShape = 'circle' | 'square';

export interface PlayerData {
  health : number;  // 0–100
  armor  : number;  // 0–100
}

export interface VehicleData {
  inVehicle : boolean;
  speed     : number;   // km/h
  fuel      : number;   // 0–100
}

// ── State ─────────────────────────────────────────────────────
interface HudState {
  // Joueur
  health : number;
  armor  : number;
  // Véhicule
  vehicle : VehicleData;
  // UI
  visible      : boolean;
  minimapShape : MinimapShape;
}

// ── Actions ───────────────────────────────────────────────────
interface HudActions {
  setPlayer  : (data: Partial<PlayerData>)  => void;
  setVehicle : (data: Partial<VehicleData>) => void;
  setVisible : (v: boolean)                 => void;
  setConfig  : (cfg: { minimapShape?: MinimapShape }) => void;
}

// ── Defaults ──────────────────────────────────────────────────
const DEFAULT_VEHICLE: VehicleData = {
  inVehicle : false,
  speed     : 0,
  fuel      : 100,
};

// ── Store ─────────────────────────────────────────────────────
export const useHudStore = create<HudState & HudActions>((set) => ({
  health       : 100,
  armor        : 0,
  vehicle      : DEFAULT_VEHICLE,
  visible      : false,
  minimapShape : 'circle',

  setPlayer  : (d) => set((s) => ({ ...s, ...d })),
  setVehicle : (d) => set((s) => ({ vehicle: { ...s.vehicle, ...d } })),
  setVisible : (v) => set({ visible: v }),
  setConfig  : (c) => set((s) => ({
    minimapShape: c.minimapShape ?? s.minimapShape,
  })),
}));
