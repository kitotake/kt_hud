// web/src/core/bridge/devTools.ts
// FIX #8 : injectMockNuiEvent isolé ici, uniquement utilisé en DEV
// Ne jamais importer ce fichier dans le code de production.

/**
 * Simule un message NUI depuis le Lua en DEV browser.
 * Usage : injectMockNuiEvent('updateHud', { health: 50, armor: 20, ... })
 */
export function injectMockNuiEvent(action: string, data: unknown): void {
  if (!import.meta.env.DEV) {
    console.warn('[devTools] injectMockNuiEvent appelé hors DEV — ignoré');
    return;
  }
  window.dispatchEvent(new MessageEvent('message', { data: { action, data } }));
}
