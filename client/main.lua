-- ============================================================
-- client/main.lua — kt_hud
-- ============================================================

local isReady    = false
local hudVisible = true

-- ── NUI helper ────────────────────────────────────────────────

local function SendNui(action, data)
    SendNUIMessage({ action = action, data = data })
end

-- ── Threads (chargés via fxmanifest dans l'ordre) ────────────
-- Les fichiers threads/*.lua exposent leurs fonctions dans
-- le scope global : MinimapThread, HudThread, VehicleThread

-- ── Init ─────────────────────────────────────────────────────

local function Init()
    isReady    = true
    hudVisible = true

    SendNui("setConfig",  { minimapShape = Config.Minimap.Shape })
    SendNui("setVisible", { visible      = true })

    MinimapThread.Start(function() return isReady end)
    HudThread.Start(function() return isReady end, SendNui)
    VehicleThread.Start(function() return isReady end, SendNui)

    print("^2[kt_hud]^7 Démarré — minimap: " .. Config.Minimap.Shape)
end

-- ── Events ressource ──────────────────────────────────────────

AddEventHandler("onResourceStart", function(res)
    if res ~= GetCurrentResourceName() then return end
    CreateThread(function()
        Wait(1000)
        Init()
    end)
end)

AddEventHandler("onResourceStop", function(res)
    if res ~= GetCurrentResourceName() then return end
    isReady = false
    MinimapThread.Stop()
    SendNui("setVisible", { visible = false })
    print("^1[kt_hud]^7 Arrêté")
end)

-- ── Commandes debug ───────────────────────────────────────────

-- /hud_toggle → variable dédiée, ne dépend plus de isReady
RegisterCommand("hud_toggle", function()
    hudVisible = not hudVisible
    SendNui("setVisible", { visible = hudVisible })
end, false)

-- /hud_circle → minimap ronde
RegisterCommand("hud_circle", function()
    Config.Minimap.Shape = "circle"
    SendNui("setConfig", { minimapShape = "circle" })
end, false)

-- /hud_square → minimap carrée
RegisterCommand("hud_square", function()
    Config.Minimap.Shape = "square"
    SendNui("setConfig", { minimapShape = "square" })
end, false)