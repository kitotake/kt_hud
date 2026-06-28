-- ============================================================
-- client/threads/vehicle.lua — kt_hud
-- ============================================================

VehicleThread = {}
local thread  = nil

-- Cache
local lastSpeed = -1
local lastFuel  = -1
local lastRpm   = -1
local lastGear  = ""
local inVehicle = false

local function ResetCache()
    lastSpeed = -1
    lastFuel  = -1
    lastRpm   = -1
    lastGear  = ""
end

local function GetFuel(veh)
    if exports["LegacyFuel"] then
        local ok, val = pcall(function() return exports["LegacyFuel"]:GetFuel(veh) end)
        if ok and val then return math.floor(val) end
    end
    if exports["ox_fuel"] then
        local ok, val = pcall(function() return exports["ox_fuel"]:GetFuel(veh) end)
        if ok and val then return math.floor(val) end
    end
    return math.floor(GetVehicleFuelLevel(veh))
end

local function GetSpeed(veh)
    local mps = GetEntitySpeed(veh)
    return Config.Vehicle.SpeedUnit == "mph"
        and math.floor(mps * 2.237)
        or  math.floor(mps * 3.6)
end

local function GetGearLabel(veh)
    local gear  = GetVehicleCurrentGear(veh)
    local speed = GetEntitySpeed(veh)
    if gear == 0 then
        return speed > 0.5 and "R" or "N"
    end
    return tostring(gear)
end

function VehicleThread.Start(isReady, sendNui)
    if thread then return end

    thread = CreateThread(function()
        while isReady() do
            local ped   = PlayerPedId()
            local veh   = GetVehiclePedIsIn(ped, false)
            local nowIn = veh ~= 0 and IsPedInAnyVehicle(ped, false)

            -- Sortie de véhicule
            if not nowIn and inVehicle then
                inVehicle = false
                ResetCache()
                sendNui("updateVehicle", {
                    inVehicle = false,
                    speed     = 0,
                    fuel      = 0,
                    rpm       = 0,
                    gear      = "N",
                })
            end

            -- Dans un véhicule : envoi différentiel
            if nowIn and veh ~= 0 then
                inVehicle   = true

                local speed = GetSpeed(veh)
                local fuel  = GetFuel(veh)
                local rpm   = Config.Vehicle.ShowRPM  and GetVehicleCurrentRpm(veh) or 0
                local gear  = Config.Vehicle.ShowGear and GetGearLabel(veh)         or ""

                if speed ~= lastSpeed or fuel ~= lastFuel
                or rpm ~= lastRpm     or gear ~= lastGear then
                    lastSpeed = speed
                    lastFuel  = fuel
                    lastRpm   = rpm
                    lastGear  = gear

                    sendNui("updateVehicle", {
                        inVehicle = true,
                        speed     = speed,
                        fuel      = fuel,
                        rpm       = rpm,
                        gear      = gear,
                    })
                end
            end

            Wait(Config.Vehicle.UpdateInterval)
        end

        inVehicle = false
        ResetCache()
        thread = nil
    end)
end