const path = require('path');

const utilityFunctions = {
    "filesystemFunctions": require('./lib/utility_functions/filesystem_functions')
}


let startServices = (basePath) => {

    const configs = {
        "baseConfigs": require( path.join(__dirname, 'conf','config') )(basePath)
    }

    utilityFunctions.filesystemFunctions.createBaseFolderStructures();

    const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
    const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )

    let servers = initializeWebServer( configs )
    initializeRoutes( servers )

    if ( basePath !== "" ) {
        return {
            "expressApp": servers.expressApp,
            "socketioApp": servers.socketioApp,
            "configs": {
                "baseConfigs": configs.baseConfigs
            }
        }
    }

}

if (process.env.RUN_STANDALONE ) {

    startServices("")
    
}

module.exports = (basePath) => {

    return startServices(basePath)

}