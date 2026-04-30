// ============================================================
// Shared global types
// ============================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// ── NUI base types ───────────────────────────────────────────
export interface NuiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

// ── Player ───────────────────────────────────────────────────
export interface PlayerIdentifier {
  id: number;
  source: string;
  name: string;
}

// ── Item ─────────────────────────────────────────────────────
export interface BaseItem {
  name: string;
  label: string;
  weight: number;
  stack: boolean;
  usable: boolean;
  description?: string;
  image?: string;
  metadata?: Record<string, unknown>;
}