// ============================================================
// HUD — Types
// ============================================================

export interface HudData {
  health: number;   // 0–100
  armor: number;    // 0–100
  hunger: number;   // 0–100
  thirst: number;   // 0–100
  stamina?: number; // 0–100
  oxygen?: number;  // 0–100
  stress?: number;  // 0–100
}

export interface VehicleData {
  speed: number;    // km/h
  fuel: number;     // 0–100
  rpm?: number;     // 0–1
  gear?: number;    // 0–8
  engineHealth?: number; // 0–1000
  seatbelt?: boolean;
  inVehicle: boolean;
}

export interface HudState extends HudData {
  vehicle: VehicleData;
  visible: boolean;
}