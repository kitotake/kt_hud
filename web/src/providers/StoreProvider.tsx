// ============================================================
// StoreProvider — Wires NUI event bus → feature stores
// ============================================================
import React, { useEffect, type ReactNode } from 'react';
import { eventBus, UI_EVENTS } from '../core/events/eventBus';
import { useHudStore } from '../features/store/hudStore';
import { useUIStore } from '../app/store/uiStore';
import type { HudData, VehicleData } from '../features/hud/types';

interface StoreProviderProps { children: ReactNode; }

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const setHud         = useHudStore((s) => s.setHud);
  const setVehicle     = useHudStore((s) => s.setVehicle);
  const setMenuOpen    = useUIStore((s) => s.setMenuOpen);
  const setInventoryOpen = useUIStore((s) => s.setInventoryOpen);
  const addToast       = useUIStore((s) => s.addToast);

  useEffect(() => {
    const subs = [
      eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE,      setHud),
      eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, setVehicle),
      eventBus.on(UI_EVENTS.MENU_OPEN,               () => setMenuOpen(true)),
      eventBus.on(UI_EVENTS.MENU_CLOSE,              () => setMenuOpen(false)),
      eventBus.on(UI_EVENTS.INVENTORY_OPEN,          () => setInventoryOpen(true)),
      eventBus.on(UI_EVENTS.INVENTORY_CLOSE,         () => setInventoryOpen(false)),
      eventBus.on<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>(
        UI_EVENTS.NOTIFY,
        (data) => addToast(data),
      ),
    ];

    return () => subs.forEach((unsub) => unsub());
  }, [setHud, setVehicle, setMenuOpen, setInventoryOpen, addToast]);

  return <>{children}</>;
};