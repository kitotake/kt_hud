-- ============================================================
-- server/main.lua — kt_hud (sync + logique union)
-- ============================================================

local PlayerStatus = {}

-- ── START ───────────────────────────────────────────────────

AddEventHandler("onResourceStart", function(res)
    if res == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")
    end
end)

-- ── SYNC CLIENT → SERVEUR ──────────────────────────────────

RegisterNetEvent("union:status:sync", function(status)
    local src = source
    if not status then return end

    PlayerStatus[src] = status

    print(("[kt_hud] Sync %s | H:%s T:%s S:%s")
        :format(src, status.hunger, status.thirst, status.stress))
end)

-- ── GET STATUS (EXPORT READY) ───────────────────────────────

exports("GetPlayerStatus", function(source)
    return PlayerStatus[source]
end)

-- ── EXEMPLES UTILISATION ───────────────────────────────────
-- FIX: vérification de l'existence du resource 'union' avant d'appeler
-- ses exports, pour éviter un crash si union n'est pas chargée.

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