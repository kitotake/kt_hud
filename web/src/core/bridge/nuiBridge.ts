// ============================================================
// NUI Bridge — routes all window 'message' events to eventBus
// Initialize once at app root
// ============================================================
import { useEffect } from 'react';
import { eventBus, UI_EVENTS } from '../events/eventBus';
import type { HudData, VehicleData } from '../../features/components/types';
import type { UserData } from '../../features/user/types';

interface NuiMessage {
  action: string;
  data: unknown;
}

const routeMap: Record<string, string> = {
  'updateHud':     UI_EVENTS.HUD_UPDATE,
  'updateVehicle': UI_EVENTS.VEHICLE_UPDATE,
  'openMenu':      UI_EVENTS.MENU_OPEN,
  'closeMenu':     UI_EVENTS.MENU_CLOSE,
  'openInventory': UI_EVENTS.INVENTORY_OPEN,
  'closeInventory':UI_EVENTS.INVENTORY_CLOSE,
  'showTarget':    UI_EVENTS.TARGET_SHOW,
  'hideTarget':    UI_EVENTS.TARGET_HIDE,
  'updateUser':    UI_EVENTS.USER_UPDATE,
  'notify':        UI_EVENTS.NOTIFY,
};

export function useNuiBridge(): void {
  useEffect(() => {
    const handler = (event: MessageEvent<NuiMessage>) => {
      const { action, data } = event.data ?? {};
      const busEvent = routeMap[action];
      if (busEvent) {
        eventBus.emit(busEvent, data);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
}

// Type-safe mock data injector for development
export function injectMockNuiEvent(action: string, data: unknown): void {
  window.dispatchEvent(new MessageEvent('message', { data: { action, data } }));
}

// Re-export typed event data so consumers don't need to import types directly
export type { HudData, VehicleData, UserData };