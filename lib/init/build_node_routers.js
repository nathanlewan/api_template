const path = require( 'path' );
const logger = require ('../service/loggerService');

const routes = {
    "examples_route": require ( path.join(__dirname, '../', 'routes', 'examples_route', 'examples_route-routes') ),
    "resources_route": require ( path.join(__dirname, '../', 'routes', 'resources_route', 'resources_route-routes') )
};






module.exports = (servers) => {

    // HTTP or HTTPS Routes
    if (servers.expressApp != false) {

        if (servers.configs.baseConfigs.nodeServer.examplesRouteStatus === 'enabled') {
            logger.info("[base][build_node_routers][http]: enabling /examples web endpoint");
            servers.expressApp.use( '/examples', routes.examples_route.WebRouter(servers.configs) );
        };

        logger.info("[base][build_node_routers][http]: enabling /resources web endpoint");
        servers.expressApp.use( '/resources', routes.resources_route.WebRouter(servers.configs) );

    };
    

    // Socket-io Routes
    if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

        if (servers.configs.baseConfigs.nodeServer.examplesRouteStatus === 'enabled') {
            socket.on('/examples', (data) => { routes.examples_route.IoRouter(socket, data, servers.configs) });
        };
        
    })};

};