// ============================================================
// HUD — Zustand Store
// ============================================================
import { create } from 'zustand';
import type { HudState, HudData, VehicleData } from './types';

interface HudStore extends HudState {
  setHud: (data: Partial<HudData>) => void;
  setVehicle: (data: Partial<VehicleData>) => void;
  setVisible: (visible: boolean) => void;
  showHunger: boolean;
  showThirst: boolean;
  toggleHunger: () => void;
  toggleThirst: () => void;
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
  // TOUJOURS visible par défaut — le Lua contrôle via setVisible
  visible: true,

  showHunger: true,
  showThirst: true,

  setHud:     (data) => set((s) => ({ ...s, ...data })),
  setVehicle: (data) => set((s) => ({ vehicle: { ...s.vehicle, ...data } })),
  setVisible: (visible) => set({ visible }),
  toggleHunger: () => set((s) => ({ showHunger: !s.showHunger })),
  toggleThirst: () => set((s) => ({ showThirst: !s.showThirst })),
}));