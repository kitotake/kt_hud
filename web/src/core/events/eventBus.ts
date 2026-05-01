// web/src/core/events/eventBus.ts
// ============================================================
// Event Bus — lightweight pub/sub for internal UI events
// ============================================================

type EventCallback<T = unknown> = (data: T) => void;

class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  on<T = unknown>(event: string, cb: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(cb as EventCallback);
    return () => this.off(event, cb as EventCallback);
  }

  off(event: string, cb: EventCallback): void {
    this.listeners.get(event)?.delete(cb);
  }

  emit<T = unknown>(event: string, data?: T): void {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }

  clear(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

export const eventBus = new EventBus();

// ── Typed event constants ────────────────────────────────────
export const UI_EVENTS = {
  HUD_UPDATE:   'hud:update',
  VEHICLE_UPDATE: 'hud:vehicle',
  HUD_VISIBLE:  'hud:visible',   // ← ajouté pour l'action setVisible
} as const;

export type UIEventKey = typeof UI_EVENTS[keyof typeof UI_EVENTS];