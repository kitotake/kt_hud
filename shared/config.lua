-- ============================================================
-- shared/config.lua — kt_hud configuration
-- ============================================================

Config = {}

-- ── HUD Settings ─────────────────────────────────────────────
Config.HUD = {
    UpdateInterval  = 500,    -- ms between HUD updates
    ShowStress      = false,  -- show stress bar
    ShowOxygen      = false,  -- show oxygen bar
    ShowStamina     = true,   -- show stamina bar
    ShowHunger      = true,   -- show hunger bar
    ShowThirst      = true,   -- show thirst bar
}

-- ── Vehicle Settings ──────────────────────────────────────────
Config.Vehicle = {
    SpeedUnit      = "kmh",   -- "kmh" or "mph"
    ShowRPM        = true,
    ShowGear       = true,
    ShowSeatbelt   = false,
}

-- ── Framework (adjust for your setup) ────────────────────────
Config.Framework = "union" -- "esx", "qbcore", "standalone"