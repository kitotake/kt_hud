-- ============================================================
-- client/main.lua — kt_hud NUI client
-- ============================================================

local isHudVisible = true
local hudData      = { health = 100, armor = 0, hunger = 100, thirst = 100 }
local vehicleData  = { speed = 0, fuel = 100, rpm = 0, gear = 0, inVehicle = false }

-- ── Helpers ──────────────────────────────────────────────────
local function SendHud()
    SendNUIMessage({ action = "updateHud", data = hudData })
end

local function SendVehicle()
    SendNUIMessage({ action = "updateVehicle", data = vehicleData })
end

-- ── HUD visibility ───────────────────────────────────────────
RegisterNUICallback("closeHud", function(_, cb)
    isHudVisible = false
    cb({ ok = true })
end)

-- ── Main tick — update HUD data ──────────────────────────────
local tick = 0

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(500) -- update every 500ms
        tick = tick + 1

        local ped    = PlayerPedId()
        local health = math.floor(GetEntityHealth(ped) - 100)
        local armor  = math.floor(GetPedArmour(ped))

        -- Clamp values
        health = math.max(0, math.min(100, health))
        armor  = math.max(0, math.min(100, armor))

        hudData.health = health
        hudData.armor  = armor

        -- Hunger / thirst (adjust for your framework)
        -- hudData.hunger = exports['your-framework']:GetHunger()
        -- hudData.thirst = exports['your-framework']:GetThirst()

        SendHud()

        -- ── Vehicle ──────────────────────────────────────────
        local vehicle = GetVehiclePedIsIn(ped, false)
        if vehicle ~= 0 then
            local speed = math.floor(GetEntitySpeed(vehicle) * 3.6) -- m/s → km/h
            local fuel  = math.floor(GetVehicleFuelLevel(vehicle))
            local rpm   = GetVehicleCurrentRpm(vehicle)
            local gear  = GetVehicleCurrentGear(vehicle)

            vehicleData.inVehicle = true
            vehicleData.speed     = speed
            vehicleData.fuel      = fuel
            vehicleData.rpm       = rpm
            vehicleData.gear      = gear
        else
            vehicleData.inVehicle = false
            vehicleData.speed     = 0
        end

        SendVehicle()
    end
end)

-- ── Show / hide HUD ──────────────────────────────────────────
RegisterCommand("togglehud", function()
    isHudVisible = not isHudVisible
    SendNUIMessage({
        action = "updateHud",
        data   = { visible = isHudVisible }
    })
end, false)

