-- ============================================================
-- shared/config.lua — kt_hud configuration
-- ============================================================

Config = {}

-- ── HUD Settings ─────────────────────────────────────────────
Config.HUD = {
    UpdateInterval  = 500,    -- ms between HUD updates
    ShowStress      = false,  -- retiré du HUD
    ShowOxygen      = false,  -- show oxygen bar
    ShowStamina     = true,   -- show stamina bar
    ShowHunger      = false,  -- retiré du HUD
    ShowThirst      = false,  -- retiré du HUD
}

-- ── Vehicle Settings ──────────────────────────────────────────
Config.Vehicle = {
    SpeedUnit      = "kmh",   -- "kmh" or "mph"
    ShowRPM        = true,
    ShowGear       = true,
    ShowSeatbelt   = false,
}

-- ── Framework (adjust for your setup) ────────────────────────
Config.Framework = "union"