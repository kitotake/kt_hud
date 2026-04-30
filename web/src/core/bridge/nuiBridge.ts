import { useEffect } from 'react';
import { eventBus, UI_EVENTS } from '../events/eventBus';
import type { HudData, VehicleData } from '../../features/store/types';

interface NuiMessage {
  action: string;
  data: unknown;
}

const routeMap: Record<string, string> = {
  'updateHud':     UI_EVENTS.HUD_UPDATE,
  'updateVehicle': UI_EVENTS.VEHICLE_UPDATE,
};

export function useNuiBridge(): void {
  useEffect(() => {
    const handler = (event: MessageEvent<NuiMessage>) => {
      const { action, data } = event.data ?? {};
      const busEvent = routeMap[action];
      if (busEvent) eventBus.emit(busEvent, data);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
}

export function injectMockNuiEvent(action: string, data: unknown): void {
  window.dispatchEvent(new MessageEvent('message', { data: { action, data } }));
}

export type { HudData, VehicleData };