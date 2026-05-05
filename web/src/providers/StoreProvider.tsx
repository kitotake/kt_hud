// web/src/providers/StoreProvider.tsx
// FIX #2 : subscriptions stables — on utilise useHudStore.getState() dans
// l'effet pour éviter que les setters (même stables via Zustand) ne soient
// listés comme dépendances et ne causent de re-subscriptions.
// FIX #2 (setVisible) : le bus reçoit déjà un { visible: bool } normalisé
// depuis nuiBridge — le cast ici est donc sûr.
import React, { useEffect, type ReactNode } from 'react';
import { eventBus, UI_EVENTS } from '../core/events/eventBus';
import { useHudStore } from '../features/store/hudStore';
import type { HudData, VehicleData } from '../features/store/types';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  useEffect(() => {
    // FIX : on lit les actions directement depuis getState() pour ne pas
    // avoir de dépendances instables dans le tableau de useEffect.
    const { setHud, setVehicle, setVisible } = useHudStore.getState();

    const subs = [
      eventBus.on<HudData>(UI_EVENTS.HUD_UPDATE, setHud),
      eventBus.on<VehicleData>(UI_EVENTS.VEHICLE_UPDATE, setVehicle),
      // nuiBridge garantit déjà { visible: boolean } — cast sûr
      eventBus.on<{ visible: boolean }>(UI_EVENTS.HUD_VISIBLE, (d) =>
        setVisible(d.visible)
      ),
    ];

    return () => subs.forEach((unsub) => unsub());
  }, []); // tableau vide intentionnel — les actions Zustand sont stables

  return <>{children}</>;
};
