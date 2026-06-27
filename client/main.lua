-- ============================================================
-- client/main.lua — kt_hud
-- ============================================================

local isReady       = false
local inVehicle     = false
local hudThread     = nil
local vehicleThread = nil
local minimapThread = nil

-- ── Utilitaires ───────────────────────────────────────────────

local function SendNui(action, data)
    SendNUIMessage({ action = action, data = data })
end

local function GetSpeed(vehicle)
    local mps = GetEntitySpeed(vehicle)
    if Config.Vehicle.SpeedUnit == "mph" then
        return math.floor(mps * 2.237)
    end
    return math.floor(mps * 3.6)
end

-- ── Thread minimap — appelé chaque frame ──────────────────────
-- Doit être chaque frame (Wait(0)) sinon GTA réaffiche les
-- éléments natifs au frame suivant.

local function StartMinimapThread()
    if minimapThread then return end

    minimapThread = CreateThread(function()

        -- Forme de la minimap : appliqué une seule fois
        -- 0 = rond  |  1 = carré
        local clipType = Config.Minimap.Shape == "square" and 1 or 0
        SetMinimapClipType(clipType)

        while isReady do

            if Config.Minimap.HideNativeElements then
                -- Cache les composants natifs frame par frame
                for _, id in ipairs(Config.Minimap.HideComponents) do
                    HideHudComponentThisFrame(id)
                end
            end

            Wait(0) -- chaque frame
        end

        -- Ressource arrêtée → remet les composants natifs
        SetMinimapClipType(0)
        minimapThread = nil
    end)
end

-- ── Thread HUD joueur (toutes les 500ms) ─────────────────────

local function StartHudThread()
    if hudThread then return end

    hudThread = CreateThread(function()
        while isReady do
            local ped    = PlayerPedId()
            -- GTA stocke la vie entre 100 (vide) et 200 (plein)
            local health = math.max(0, math.floor(GetEntityHealth(ped) - 100))
            local armor  = math.floor(GetPedArmour(ped))

            SendNui("updateHud", {
                health = health,
                armor  = armor,
            })

            Wait(Config.HUD.UpdateInterval)
        end
        hudThread = nil
    end)
end

-- ── Thread véhicule (toutes les 100ms) ───────────────────────

local function StartVehicleThread()
    if vehicleThread then return end

    vehicleThread = CreateThread(function()
        while isReady do
            local ped     = PlayerPedId()
            local vehicle = GetVehiclePedIsIn(ped, false)
            local nowIn   = vehicle ~= 0 and IsPedInAnyVehicle(ped, false)

            -- Détection entrée / sortie véhicule
            if nowIn ~= inVehicle then
                inVehicle = nowIn
                if not inVehicle then
                    SendNui("updateVehicle", {
                        inVehicle = false,
                        speed     = 0,
                        fuel      = 0,
                        rpm       = 0,
                        gear      = 0,
                    })
                end
            end

            if inVehicle and vehicle ~= 0 then
                local data = {
                    inVehicle = true,
                    speed     = GetSpeed(vehicle),
                    fuel      = math.floor(GetVehicleFuelLevel(vehicle)),
                }

                if Config.Vehicle.ShowRPM then
                    data.rpm = GetVehicleCurrentRpm(vehicle)
                end

                if Config.Vehicle.ShowGear then
                    data.gear = GetVehicleCurrentGear(vehicle)
                end

                SendNui("updateVehicle", data)
            end

            Wait(Config.Vehicle.UpdateInterval)
        end
        vehicleThread = nil
    end)
end

-- ── Init ─────────────────────────────────────────────────────

local function Init()
    isReady = true

    -- Envoie la config au NUI (forme minimap)
    SendNui("setConfig", {
        minimapShape = Config.Minimap.Shape,
    })

    -- Affiche le HUD
    SendNui("setVisible", { visible = true })

    -- Lance les threads
    StartMinimapThread()
    StartHudThread()
    StartVehicleThread()

    print("^2[kt_hud]^7 Démarré — minimap: " .. Config.Minimap.Shape)
end

-- ── Events ressource ──────────────────────────────────────────

AddEventHandler("onResourceStart", function(res)
    if res ~= GetCurrentResourceName() then return end
    CreateThread(function()
        Wait(1000) -- laisse le NUI se charger
        Init()
    end)
end)

AddEventHandler("onResourceStop", function(res)
    if res ~= GetCurrentResourceName() then return end
    isReady = false
    -- Remet le clip natif
    SetMinimapClipType(0)
    SendNui("setVisible", { visible = false })
    print("^1[kt_hud]^7 Arrêté")
end)

-- ── Commandes debug ───────────────────────────────────────────

-- /hud_toggle  → affiche / cache le HUD
RegisterCommand("hud_toggle", function()
    SendNui("setVisible", { visible = not isReady })
end, false)

-- /hud_circle  → passe en minimap ronde
RegisterCommand("hud_circle", function()
    Config.Minimap.Shape = "circle"
    SetMinimapClipType(0)
    SendNui("setConfig", { minimapShape = "circle" })
end, false)

-- /hud_square  → passe en minimap carrée
RegisterCommand("hud_square", function()
    Config.Minimap.Shape = "square"
    SetMinimapClipType(1)
    SendNui("setConfig", { minimapShape = "square" })
end, false)
