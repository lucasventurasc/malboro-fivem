fx_version 'cerulean'

games { 'gta5' }

dependency 'webpack'
dependency 'yarn'

webpack_config 'production.config.js'
webpack_config 'server.config.js'

client_script 'dist/index.js'
server_script 'dist/server.js'
