-- ============================================================
-- client/threads/hud.lua — kt_hud
-- ============================================================

HudThread   = {}
local thread = nil

-- Cache des dernières valeurs envoyées
local lastHealth = -1
local lastArmor  = -1

function HudThread.Start(isReady, sendNui)
    if thread then return end

    thread = CreateThread(function()
        while isReady() do
            local ped    = PlayerPedId()
            local health = math.max(0, math.floor(GetEntityHealth(ped) - 100))
            local armor  = math.floor(GetPedArmour(ped))

            -- N'envoie au NUI que si les valeurs ont changé
            if health ~= lastHealth or armor ~= lastArmor then
                lastHealth = health
                lastArmor  = armor

                sendNui("updateHud", {
                    health = health,
                    armor  = armor,
                })
            end

            Wait(Config.HUD.UpdateInterval)
        end

        -- Reset au stop
        lastHealth = -1
        lastArmor  = -1
        thread     = nil
    end)
end