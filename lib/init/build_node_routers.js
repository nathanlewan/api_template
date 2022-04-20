const path = require( 'path' );

const routes = {
    "examples_route": require ( path.join(__dirname, '../', 'routes', 'examples_route', 'examples_route-routes') ),
    "resources_route": require ( path.join(__dirname, '../', 'routes', 'resources_route', 'resources_route-routes') )
}






module.exports = (configs, servers) => {


    // HTTP or HTTPS Routes
    if (servers.expressApp != false) {

        if (configs.nodeServer.examplesRouteStatus === 'enabled') {
            servers.expressApp.use( '/examples', routes.examples_route.WebRouter(configs) )
        }

        servers.expressApp.use( '/resources', routes.resources_route.WebRouter(configs) )

    }
    

    // Socket-io Routes
    if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

        if (configs.nodeServer.examplesRouteStatus === 'enabled') {
            socket.on('/examples', (data) => { routes.examples_route.IoRouter(socket, data, configs) });
        }
        
    })}

}