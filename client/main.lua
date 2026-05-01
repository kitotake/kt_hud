-- kt_hud/client/main.lua
-- Récepteur NUI pour kt_hud.
--
-- ARCHITECTURE :
--   union/bridge/client/kt_hud.lua ne peut pas appeler SendNUIMessage
--   directement (union n'a pas de ui_page). Il déclenche l'event local
--   "kt_hud:sendNui" → ce fichier le reçoit et fait le vrai SendNUIMessage
--   dans le contexte de kt_hud (qui possède la frame NUI).

-- ── Relay NUI ────────────────────────────────────────────────
-- Reçoit (action, data) depuis n'importe quelle ressource cliente
-- et les transmet à la page React via SendNUIMessage.
AddEventHandler("kt_hud:sendNui", function(action, data)
    if type(action) ~= "string" or action == "" then return end
    SendNUIMessage({ action = action, data = data })
end)

-- ── Log démarrage ─────────────────────────────────────────────
AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")
        -- Si un personnage est déjà actif (restart à chaud), affiche le HUD
        if LocalPlayer.state and LocalPlayer.state.character then
            SendNUIMessage({ action = "setVisible", data = { visible = true } })
        end
    end
end)