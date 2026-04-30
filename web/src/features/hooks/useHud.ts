// features/hooks/useHud.ts
import { useEffect, useCallback } from 'react';
import { useHudStore } from '../store/hudStore';
import { eventBus, UI_EVENTS } from '../../core/events/eventBus';
import type { HudData, VehicleData } from '../store/types';


// ─────────────────────────────────────────────
// Sync avec NUI / EventBus
// ─────────────────────────────────────────────
export function useHudSync(): void {
  const setHud     = useHudStore((s) => s.setHud);
  const setVehicle = useHudStore((s) => s.setVehicle);
  const setVisible = useHudStore((s) => s.setVisible);

  const onHudUpdate = useCallback((data: HudData) => {
    setHud(data);
  }, [setHud]);

  const onVehicleUpdate = useCallback((data: VehicleData) => {
    setVehicle(data);
  }, [setVehicle]);

  // ✅ EventBus (stable)
  useEffect(() => {
    const unsubHud     = eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE, onHudUpdate);
    const unsubVehicle = eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, onVehicleUpdate);

    return () => {
      unsubHud();
      unsubVehicle();
    };
  }, [onHudUpdate, onVehicleUpdate]);

  // ✅ Mock DEV séparé (évite les loops)
  useEffect(() => {
    if (import.meta.env.DEV) {
      setVisible(true);
      setHud({ 
        health: 78, 
        armor: 45, 
        hunger: 60, 
        thirst: 40 
      });
      setVehicle({ 
        speed: 0, 
        fuel: 72, 
        inVehicle: false 
      });
    }
  }, []);
}

// ─────────────────────────────────────────────
// HUD STATS (FIX PRINCIPAL)
// ─────────────────────────────────────────────
export function useHudStats() {
  const health  = useHudStore((s) => s.health);
  const armor   = useHudStore((s) => s.armor);
  const hunger  = useHudStore((s) => s.hunger);
  const thirst  = useHudStore((s) => s.thirst);
  const stamina = useHudStore((s) => s.stamina);
  const stress  = useHudStore((s) => s.stress);

  return { health, armor, hunger, thirst, stamina, stress };
}

// ─────────────────────────────────────────────
// VEHICLE
// ─────────────────────────────────────────────
export function useVehicleStats() {
  return useHudStore((s) => s.vehicle);
}