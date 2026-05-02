// web/src/providers/StoreProvider.tsx
// Ce composant est l'unique point de subscription au bus d'événements.
// FIX: useHudSync ne subscribe plus au bus (double subscription supprimée),
// il ne gère plus que le mock DEV.
import React, { useEffect, type ReactNode } from 'react';
import { eventBus, UI_EVENTS } from '../core/events/eventBus';
import { useHudStore } from '../features/store/hudStore';
import type { HudData, VehicleData } from '../features/store/types';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const setHud     = useHudStore((s) => s.setHud);
  const setVehicle = useHudStore((s) => s.setVehicle);
  const setVisible = useHudStore((s) => s.setVisible);

  useEffect(() => {
    const subs = [
      eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE, setHud),
      eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, setVehicle),
      eventBus.on<{ visible: boolean }>(UI_EVENTS.HUD_VISIBLE, (d) =>
        setVisible(d?.visible ?? true)
      ),
    ];

    return () => {
      subs.forEach((unsub) => unsub());
    };
  }, [setHud, setVehicle, setVisible]);

  return <>{children}</>;
};