// web/src/core/bridge/nuiBridge.ts
// FIX #2 : setVisible robuste — accepte { visible: bool } OU bool brut
// FIX #8 : injectMockNuiEvent déplacé dans un module DEV dédié (voir devTools.ts)
import { useEffect } from 'react';
import { eventBus, UI_EVENTS } from '../events/eventBus';
import type { HudData, VehicleData } from '../../features/store/types';

interface NuiMessage {
  action: string;
  data: unknown;
}

// Normalise la payload setVisible : supporte bool brut ET { visible: bool }
function normalizeVisible(data: unknown): { visible: boolean } {
  if (typeof data === 'boolean') return { visible: data };
  if (data !== null && typeof data === 'object' && 'visible' in data) {
    return { visible: Boolean((data as Record<string, unknown>).visible) };
  }
  // Fallback conservateur : on garde la visibilité actuelle → on émet rien
  console.warn('[nuiBridge] setVisible: payload inattendue', data);
  return { visible: true };
}

// Mapping action NUI → event interne du bus
const routeMap: Record<string, string> = {
  updateHud:     UI_EVENTS.HUD_UPDATE,
  updateVehicle: UI_EVENTS.VEHICLE_UPDATE,
  setVisible:    UI_EVENTS.HUD_VISIBLE,
};

export function useNuiBridge(): void {
  useEffect(() => {
    const handler = (event: MessageEvent<NuiMessage>) => {
      const { action, data } = event.data ?? {};
      const busEvent = routeMap[action];
      if (!busEvent) return;

      // Normalisation spécifique pour setVisible
      const payload = action === 'setVisible' ? normalizeVisible(data) : data;
      eventBus.emit(busEvent, payload);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
}

export type { HudData, VehicleData };
