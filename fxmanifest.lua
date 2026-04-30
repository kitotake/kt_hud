fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author      'kitoake'
name        'kt_hud'
description 'Modular interaction system hud'
version     '1.0.0'

shared_scripts {
    'shared/config.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
}

ui_page 'web/dist/index.html'

files {
    'web/dist/**',
}