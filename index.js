const path = require('path');
const cfg = require( path.join(__dirname, 'conf','config') );
const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )


let servers = initializeWebServer( cfg )
initializeRoutes( cfg, servers)
