-- ============================================================
-- server/main.lua — kt_hud server side
-- Compatible avec le framework Union
-- ============================================================

-- Log resource start
AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")
    end
end)

-- Relay union:player:spawned vers le client kt_hud
-- (Union trigger déjà le client event, ce relay est optionnel
--  mais utile si kt_hud a besoin de données serveur supplémentaires)
AddEventHandler("union:player:spawned", function(src, character)
    if not src or not character then return end
    -- Le client kt_hud écoute déjà union:player:spawned directement
    -- Pas besoin de relay supplémentaire
end)