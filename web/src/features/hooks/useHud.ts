// web/src/features/hooks/useHud.ts
// FIX: suppression de la double subscription.
// StoreProvider gère déjà les subscriptions au bus.
// useHudSync ne fait plus que le mock DEV.
import { useEffect } from 'react';
import { useHudStore } from '../store/hudStore';

// ─────────────────────────────────────────────
// Sync DEV uniquement (les subscriptions réelles sont dans StoreProvider)
// ─────────────────────────────────────────────
export function useHudSync(): void {
  const setHud     = useHudStore((s) => s.setHud);
  const setVehicle = useHudStore((s) => s.setVehicle);
  const setVisible = useHudStore((s) => s.setVisible);

  // Mock animé en DEV uniquement
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    setVisible(true);
    setHud({ health: 78, armor: 45, hunger: 60, thirst: 40 });
    setVehicle({ speed: 0, fuel: 72, inVehicle: false });

    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      setHud({
        health: 50 + Math.round(Math.sin(tick * 0.08) * 40),
        armor:  30 + Math.round(Math.cos(tick * 0.05) * 30),
        hunger: 60 + Math.round(Math.sin(tick * 0.03 + 1) * 30),
        thirst: 40 + Math.round(Math.cos(tick * 0.04 + 2) * 35),
      });
    }, 800);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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