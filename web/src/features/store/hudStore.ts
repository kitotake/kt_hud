// ============================================================
// HUD — Zustand Store
// FIX #11 : showHunger / showThirst / toggleHunger / toggleThirst
// déplacés dans uiStore (préférences UI ≠ données de jeu)
// FIX #16 : visible: false par défaut — le Lua l'active via setVisible
// pour éviter un flash au chargement en production.
// En DEV, useHudSync force visible = true.
// ============================================================
import { create } from 'zustand';
import type { HudState, HudData, VehicleData } from './types';

interface HudStore extends HudState {
  setHud: (data: Partial<HudData>) => void;
  setVehicle: (data: Partial<VehicleData>) => void;
  setVisible: (visible: boolean) => void;
}

const DEFAULT_VEHICLE: VehicleData = {
  speed: 0,
  fuel: 100,
  rpm: 0,
  gear: 0,
  engineHealth: 1000,
  seatbelt: false,
  inVehicle: false,
};

export const useHudStore = create<HudStore>((set) => ({
  health:  100,
  armor:   0,
  hunger:  100,
  thirst:  100,
  stamina: 100,
  oxygen:  100,
  stress:  0,
  vehicle: DEFAULT_VEHICLE,

  // FIX #16 : false en production — le Lua envoie setVisible(true) quand
  // le joueur est chargé. En DEV, useHudSync passe à true immédiatement.
  visible: false,

  setHud:     (data) => set((s) => ({ ...s, ...data })),
  setVehicle: (data) => set((s) => ({ vehicle: { ...s.vehicle, ...data } })),
  setVisible: (visible) => set({ visible }),
}));
