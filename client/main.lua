-- kt_hud/client/main.lua
-- Récepteur NUI pour kt_hud.

-- ── Relay NUI ────────────────────────────────────────────────
AddEventHandler("kt_hud:sendNui", function(action, data)
    if type(action) ~= "string" or action == "" then return end
    SendNUIMessage({ action = action, data = data })
end)

-- ── Log démarrage ─────────────────────────────────────────────
AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")

        -- FIX: LocalPlayer.state n'est pas disponible nativement en Lua FiveM
        -- sans framework. On affiche le HUD directement au démarrage.
        -- Si tu utilises un framework (ESX, QBCore), remplace par la vérification
        -- appropriée (ex: ESX.GetPlayerData(), PlayerData.loaded, etc.)
        SendNUIMessage({ action = "setVisible", data = { visible = true } })
    end
end)

-- ── Masquer le HUD à la déconnexion (optionnel) ───────────────
AddEventHandler("onResourceStop", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SendNUIMessage({ action = "setVisible", data = { visible = false } })
    end
end)