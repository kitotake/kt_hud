-- ============================================================
-- shared/config.lua — kt_hud
-- ============================================================

Config = {}

-- ── HUD ──────────────────────────────────────────────────────
Config.HUD = {
    UpdateInterval = 500,
    ShowArmor      = true,
}

-- ── Minimap ───────────────────────────────────────────────────
Config.Minimap = {
    Shape              = "circle",  -- "circle" | "square"
    HideNativeElements = true,
    ForceRadar         = true,      -- DisplayRadar(true) chaque frame

    -- ── Composants natifs à masquer ───────────────────────────
    -- ⚠️  Ne pas mettre 6 (= cache la minimap entière)
    -- 1=Vie  2=Armure  7=Cash  8=Zone  9=Arme  20=Aide
    HideComponents = { 1, 2, 7, 8, 9, 20 },

    -- ── Angle ─────────────────────────────────────────────────
    -- nil   = libre (nord toujours en haut = false par défaut)
    -- 0     = nord fixe
    -- 1-359 = angle fixe en degrés
    Angle = nil,

    -- ── Zoom ──────────────────────────────────────────────────
    -- SetRadarZoom      : valeur entière (0–1200 environ)
    -- SetRadarZoomPrecise : valeur flottante (plus précis)
    -- nil = zoom GTA par défaut
    Zoom        = nil,
    ZoomPrecise = nil,

    -- ── Grande carte (touche M) ───────────────────────────────
    -- true  = kt_hud gère le toggle BigMap lui-même
    -- false = comportement natif GTA
    HandleBigMap = false,

    -- ── Blip joueur ───────────────────────────────────────────
    PlayerBlip = {
        -- Alpha du blip joueur sur la minimap (0=invisible, 255=opaque)
        Alpha = 255,

        -- Remplacement de texture (optionnel)
        -- Laisse nil pour ne pas remplacer
        TextureDict   = nil,  -- ex: "timecycle_mods_natural"
        TextureName   = nil,  -- nom de la texture dans le dict
        ReplaceTarget = nil,  -- dict cible à remplacer  ex: "minimap"
        ReplaceName   = nil,  -- texture cible            ex: "blip_player"
    },

    -- ── Overrides position / taille composants ────────────────
    -- SetMinimapComponentPosition(comp, alignX, alignY, x, y, w, h)
    -- nil = positions natives GTA
    -- Exemple :
    -- ComponentOverrides = {
    --     { comp = "minimap",        alignX = "L", alignY = "B", x = 0.0, y = 0.0, w = 0.2578, h = 0.1944 },
    --     { comp = "minimap_corner", alignX = "L", alignY = "B", x = 0.0, y = 0.0, w = 0.0625, h = 0.0833 },
    -- },
    ComponentOverrides = nil,
}

-- ── Véhicule ─────────────────────────────────────────────────
Config.Vehicle = {
    SpeedUnit      = "kmh",  -- "kmh" | "mph"
    ShowRPM        = true,
    ShowGear       = true,
    UpdateInterval = 100,
}