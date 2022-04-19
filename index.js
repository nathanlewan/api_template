const path = require('path');

module.exports = (basePath) => {

    const cfg = require( path.join(__dirname, 'conf','config') )(basePath);
    const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
    const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )

    let servers = initializeWebServer( cfg )
    initializeRoutes( cfg, servers)

}