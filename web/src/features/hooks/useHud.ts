// ============================================================
// HUD — Hooks
// ============================================================
import { useEffect, useCallback } from 'react';
import { useHudStore } from '../store/hudStore';
import { eventBus, UI_EVENTS } from '../../core/events/eventBus';
import type { HudData, VehicleData } from '../store/types';

/** Subscribe to NUI HUD updates via event bus */
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

  useEffect(() => {
    const unsubHud     = eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE, onHudUpdate);
    const unsubVehicle = eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, onVehicleUpdate);

    // Mock data in dev
    if (import.meta.env.DEV) {
      setVisible(true);
      setHud({ health: 78, armor: 45, hunger: 60, thirst: 40 });
      setVehicle({ speed: 0, fuel: 72, inVehicle: false });
    }

    return () => {
      unsubHud();
      unsubVehicle();
    };
  }, [onHudUpdate, onVehicleUpdate, setHud, setVehicle, setVisible]);
}

/** Read current HUD stats */
export function useHudStats() {
  return useHudStore((s) => ({
    health:  s.health,
    armor:   s.armor,
    hunger:  s.hunger,
    thirst:  s.thirst,
    stamina: s.stamina,
    stress:  s.stress,
  }));
}

/** Read current vehicle data */
export function useVehicleStats() {
  return useHudStore((s) => s.vehicle);
}