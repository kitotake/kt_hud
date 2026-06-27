-- ============================================================
-- server/main.lua — kt_hud
-- Léger : juste les logs et le cleanup
-- ============================================================

AddEventHandler("onResourceStart", function(res)
    if res == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Server started")
    end
end)

AddEventHandler("playerDropped", function()
    -- Nettoyage possible si tu stockes des données par joueur
end)
