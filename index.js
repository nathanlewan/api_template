const path = require('path');


if (process.env.RUN_STANDALONE ) {

        const configs = {
            "baseConfigs": require( path.join(__dirname, 'conf','config') )("")
        }

        const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
        const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )

        let servers = initializeWebServer( configs )
        initializeRoutes( servers)
    
}

module.exports = (basePath) => {

    const configs = {
        "baseConfigs": require( path.join(__dirname, 'conf','config') )(basePath)
    }

    const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
    const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )

    let servers = initializeWebServer( configs )
    initializeRoutes( servers )

    return {
        "expressApp": servers.expressApp,
        "socketioApp": servers.socketioApp,
        "configs": {
            "baseConfigs": configs.baseConfigs
        }
    }

}