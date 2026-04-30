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
}

-- ── Vehicle Settings ──────────────────────────────────────────
Config.Vehicle = {
    SpeedUnit      = "kmh",   -- "kmh" or "mph"
    ShowRPM        = true,
    ShowGear       = true,
    ShowSeatbelt   = false,
}

-- ── Notifications ─────────────────────────────────────────────
Config.Notify = {
    DefaultDuration = 3500,
    Position        = "bottom-right",
}

-- ── Framework (adjust for your setup) ────────────────────────
Config.Framework = "union" -- "esx", "qbcore", "standalone"