-- ============================================================
-- client/threads/minimap.lua — kt_hud
-- ============================================================

MinimapThread = {}
local thread  = nil

-- ── Texture custom (blip joueur) ──────────────────────────────

local function LoadPlayerBlipTexture()
    local dict = Config.Minimap.PlayerBlip.TextureDict
    if not dict then return end

    RequestStreamedTextureDict(dict, false)

    local timeout = 0
    while not HasStreamedTextureDictLoaded(dict) do
        Wait(10)
        timeout = timeout + 10
        if timeout > 3000 then
            print("^3[kt_hud]^7 Timeout chargement texture: " .. dict)
            return
        end
    end

    if Config.Minimap.PlayerBlip.ReplaceTarget then
        AddReplaceTexture(
            Config.Minimap.PlayerBlip.ReplaceTarget,
            Config.Minimap.PlayerBlip.ReplaceName,
            dict,
            Config.Minimap.PlayerBlip.TextureName
        )
    end
end

-- ── Blip joueur alpha ─────────────────────────────────────────

local function ApplyPlayerBlipAlpha()
    local alpha = Config.Minimap.PlayerBlip.Alpha
    if not alpha then return end

    local blip = GetMainPlayerBlipId()
    if blip and blip ~= 0 then
        SetBlipAlpha(blip, alpha)
    end
end

-- ── Position / taille minimap ─────────────────────────────────

local function ApplyMinimapLayout()
    local m = Config.Minimap

    if m.Angle ~= nil then
        LockMinimapAngle(m.Angle)
    else
        UnlockMinimapAngle()
    end

    if m.Zoom then
        SetRadarZoom(m.Zoom)
    end

    if m.ZoomPrecise then
        SetRadarZoomPrecise(m.ZoomPrecise)
    end

    -- Position / taille des composants (HUD safezone)
    -- SetMinimapComponentPosition(comp, alignX, alignY, x, y, w, h)
    if m.ComponentOverrides then
        for _, override in ipairs(m.ComponentOverrides) do
            SetMinimapComponentPosition(
                override.comp,
                override.alignX, override.alignY,
                override.x, override.y,
                override.w, override.h
            )
        end
    end
end

-- ── BigMap (M) ────────────────────────────────────────────────
-- Gère l'activation / désactivation de la grande carte
-- Si tu ne veux pas l'intercepter, laisse BigMap = nil dans config

local bigMapActive = false

local function HandleBigMap()
    if not Config.Minimap.HandleBigMap then return end

    if IsControlJustPressed(0, 20) then -- touche M
        bigMapActive = not bigMapActive
        SetBigmapActive(bigMapActive, false)
    end
end

-- ── Thread principal ──────────────────────────────────────────

function MinimapThread.Start(isReady)
    if thread then return end

    -- Setup une seule fois au démarrage
    LoadPlayerBlipTexture()
    ApplyMinimapLayout()

    thread = CreateThread(function()
        while isReady() do
            local clipType = Config.Minimap.Shape == "square" and 1 or 0
            SetMinimapClipType(clipType)

            if Config.Minimap.ForceRadar then
                DisplayRadar(true)
            end

            if Config.Minimap.HideNativeElements then
                for _, id in ipairs(Config.Minimap.HideComponents) do
                    HideHudComponentThisFrame(id)
                end
            end

            ApplyPlayerBlipAlpha()
            HandleBigMap()

            Wait(0)
        end

        SetMinimapClipType(0)
        UnlockMinimapAngle()
        thread = nil
    end)
end

function MinimapThread.Stop()
    SetMinimapClipType(0)
    UnlockMinimapAngle()
    bigMapActive = false
    SetBigmapActive(false, false)
end