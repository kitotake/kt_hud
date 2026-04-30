-- ============================================================
-- server/main.lua — kt_hud server side
-- ============================================================

-- Example: player data callback
lib = {}

-- Basic server callback to get player info
RegisterNetEvent("kt_hud:getPlayerData", function()
    local src = source
    -- Return player data to client
    TriggerClientEvent("kt_hud:receivePlayerData", src, {
        id   = src,
        name = GetPlayerName(src),
    })
end)

-- Log resource start
AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        print("^2[kt_hud]^7 Started successfully")
    end
end)