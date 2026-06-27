-- ============================================================
-- shared/config.lua — kt_hud configuration
-- ============================================================

Config = {}

-- ── HUD ──────────────────────────────────────────────────────
Config.HUD = {
    UpdateInterval = 500,   -- ms entre chaque update NUI
    ShowArmor      = true,
}

-- ── Minimap ───────────────────────────────────────────────────
-- Shape  : "circle" → minimap ronde + barre en arc
--          "square" → minimap carrée + barre droite
--
-- HideNativeElements : cache les barres HP/Armor/Arme/Cash
--                      natifs de GTA sous la minimap
Config.Minimap = {
    Shape              = "circle",
    HideNativeElements = true,

    -- Composants HUD natifs à masquer (HideHudComponentThisFrame)
    -- 1  = Vie joueur
    -- 2  = Armure joueur
    -- 6  = Véhicule (barre d'état moteur)
    -- 7  = Cash
    -- 8  = Nom de zone
    -- 9  = Arme courante
    -- 20 = Aide contextuelle
    HideComponents = { 1, 2, 6, 7, 8, 9, 20 },
}

-- ── Véhicule ─────────────────────────────────────────────────
Config.Vehicle = {
    SpeedUnit      = "kmh",  -- "kmh" ou "mph"
    ShowRPM        = true,
    ShowGear       = true,
    UpdateInterval = 100,    -- ms (plus rapide pour fluidité vitesse)
}
