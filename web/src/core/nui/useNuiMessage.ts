// ============================================================
// useNuiMessage — Listen to NUI messages sent from Lua client
// ============================================================
import { useEffect } from 'react';

export type NuiMessageHandler<T = unknown> = (data: T) => void;

/**
 * React hook to listen for NUI messages from Lua:
 *   SendNUIMessage({ action = "myAction", data = {...} })
 *
 * @param action   The action string to listen for
 * @param handler  Callback receiving the typed payload
 */
export function useNuiMessage<T = unknown>(
  action: string,
  handler: NuiMessageHandler<T>,
): void {
  useEffect(() => {
    const listener = (event: MessageEvent<{ action: string; data: T }>) => {
      if (event.data?.action === action) {
        handler(event.data.data);
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [action, handler]);
}