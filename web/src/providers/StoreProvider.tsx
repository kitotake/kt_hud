// ============================================================
// StoreProvider — Wires NUI event bus → feature stores
// ============================================================
import React, { useEffect, type ReactNode } from 'react';
import { eventBus, UI_EVENTS } from '../core/events/eventBus';
import { useHudStore } from '../features/store/hudStore';
import { useUIStore } from '../app/store/uiStore';
import type { HudData, VehicleData } from '../features/store/types';

interface StoreProviderProps { children: ReactNode; }

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const setHud         = useHudStore((s) => s.setHud);
  const setVehicle     = useHudStore((s) => s.setVehicle);
  const addToast       = useUIStore((s) => s.addToast);

  useEffect(() => {
    const subs = [
      eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE,      setHud),
      eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, setVehicle),
        (data) => addToast(data),
      ),
    ];

    return () => subs.forEach((unsub) => unsub());
  }, [setHud, setVehicle, addToast]);

  return <>{children}</>;
};