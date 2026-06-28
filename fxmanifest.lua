fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author      'kitotake'
name        'kt_hud'
description 'Modular HUD system'
version     '1.3'

-- ⚠️  shared_scripts est chargé en PREMIER, avant client_scripts
shared_scripts {
    'shared/config.lua',
}

client_scripts {
    -- threads chargés avant main (exposent leurs globals)
    'client/threads/minimap.lua',
    'client/threads/hud.lua',
    'client/threads/vehicle.lua',
    -- orchestrateur
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
}

ui_page 'web/dist/index.html'

files {
    'web/dist/**',
}