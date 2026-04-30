// ============================================================
// useNuiMessage.ts — Écoute les messages NUI envoyés depuis Lua
// ============================================================
import { useEffect, useRef } from 'react';

export type NuiMessageHandler<T = unknown> = (data: T) => void;

/**
 * Hook React pour écouter les messages NUI envoyés depuis le client Lua
 * Utilisation : SendNUIMessage({ action: "updateHud", data: {...} })
 */
export function useNuiMessage<T = unknown>(
  action: string,
  handler: NuiMessageHandler<T>,
): void {
  
  // Référence stable du handler pour éviter les boucles infinies
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const message = event.data as { action?: string; data?: T } | null;

      if (message?.action === action) {
        handlerRef.current(message.data as T);
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [action]);
}