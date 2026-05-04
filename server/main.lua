-- kt_hud/server/main.lua
-- FIX #4 : Suppression du RegisterNetEvent("union:status:sync") qui entrait
--           en conflit avec le handler identique dans union/status/manager.lua.
--           Les deux resources ne peuvent pas toutes les deux écouter cet event
--           sans que l'une écrase l'autre selon l'ordre de chargement.
--           kt_hud ne doit pas gérer les stats côté serveur — c'est le rôle
--           de union/StatusManager. kt_hud se contente de lire via export.

local PlayerStatus = {}

-- ── START ───────────────────────────────────────────────────

AddEventHandler("onResourceStart", function(res)
    if res == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")
    end
end)

-- FIX #4 : SUPPRIMÉ — RegisterNetEvent("union:status:sync") retiré.
-- Ce handler dupliquait la logique de StatusManager dans union.
-- Le PlayerStatus local n'était utilisé que par l'export GetPlayerStatus
-- ci-dessous, qui est maintenant remplacé par une lecture du StatusManager.

-- ── GET STATUS (via StatusManager si disponible) ────────────

exports("GetPlayerStatus", function(source)
    -- Priorité : StatusManager de union (source de vérité)
    if StatusManager and StatusManager.cache then
        return StatusManager.cache[source]
    end
    -- Fallback : cache local (ne devrait plus être utilisé)
    return PlayerStatus[source]
end)

-- ── COMMANDES ──────────────────────────────────────────────

RegisterCommand("feed", function(src)
    local ok, err = pcall(function()
        exports['union']:AddPlayerStat(src, "hunger", 50)
        exports['union']:AddPlayerStat(src, "thirst", 30)
    end)
    if not ok then
        print("^1[kt_hud] Erreur export union (feed): " .. tostring(err))
    end
end)

RegisterCommand("stress", function(src)
    local ok, err = pcall(function()
        exports['union']:AddPlayerStat(src, "stress", 20)
    end)
    if not ok then
        print("^1[kt_hud] Erreur export union (stress): " .. tostring(err))
    end
end)

-- ── CLEANUP ────────────────────────────────────────────────

AddEventHandler("playerDropped", function()
    local src = source
    PlayerStatus[src] = nil
end)