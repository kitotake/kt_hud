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

RegisterCommand("feed", function(source)
    exports['union']:AddPlayerStat(source, "hunger", 50)
    exports['union']:AddPlayerStat(source, "thirst", 30)
end)

RegisterCommand("stress", function(source)
    exports['union']:AddPlayerStat(source, "stress", 20)
end)

-- ── CLEANUP ────────────────────────────────────────────────

AddEventHandler("playerDropped", function()
    local src = source
    PlayerStatus[src] = nil
end)