// web/src/features/hooks/useHud.ts
// FIX #7 : suppression du eslint-disable-next-line — on utilise getState()
// pour les actions afin d'éviter les dépendances instables dans useEffect.
// FIX #16 : setVisible(true) explicite en DEV pour simuler le comportement Lua.
import { useEffect } from 'react';
import { useHudStore } from '../store/hudStore';

// ─────────────────────────────────────────────
// Sync DEV uniquement
// ─────────────────────────────────────────────
export function useHudSync(): void {
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    // FIX #16 : active le HUD immédiatement en DEV (simule le Lua)
    const { setVisible, setHud, setVehicle } = useHudStore.getState();

    setVisible(true);
    setHud({ health: 78, armor: 45, hunger: 60, thirst: 40 });
    setVehicle({ speed: 0, fuel: 72, inVehicle: false });

    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      useHudStore.getState().setHud({
        health: 50 + Math.round(Math.sin(tick * 0.08) * 40),
        armor:  30 + Math.round(Math.cos(tick * 0.05) * 30),
        hunger: 60 + Math.round(Math.sin(tick * 0.03 + 1) * 30),
        thirst: 40 + Math.round(Math.cos(tick * 0.04 + 2) * 35),
      });
    }, 800);

    return () => clearInterval(id);
  }, []); // tableau vide intentionnel — actions Zustand stables via getState()
}

// ─────────────────────────────────────────────
// HUD STATS
// ─────────────────────────────────────────────
export function useHudStats() {
  return {
    health:  useHudStore((s) => s.health),
    armor:   useHudStore((s) => s.armor),
    hunger:  useHudStore((s) => s.hunger),
    thirst:  useHudStore((s) => s.thirst),
    stamina: useHudStore((s) => s.stamina),
    stress:  useHudStore((s) => s.stress),
  };
}

// ─────────────────────────────────────────────
// VEHICLE
// ─────────────────────────────────────────────
export function useVehicleStats() {
  return useHudStore((s) => s.vehicle);
}
