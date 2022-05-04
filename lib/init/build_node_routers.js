const path = require( 'path' );

const routes = {
    "examples_route": require ( path.join(__dirname, '../', 'routes', 'examples_route', 'examples_route-routes') ),
    "resources_route": require ( path.join(__dirname, '../', 'routes', 'resources_route', 'resources_route-routes') )
};






module.exports = (servers) => {

    // HTTP or HTTPS Routes
    if (servers.expressApp != false) {

        servers.expressApp.use( '/examples', routes.examples_route.WebRouter(servers.configs) );
        servers.expressApp.use( '/resources', routes.resources_route.WebRouter(servers.configs) );

    };
    

    // Socket-io Routes
    if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

        socket.on('/examples', (data) => { routes.examples_route.IoRouter(socket, data, servers.configs) });
        
    })};

};