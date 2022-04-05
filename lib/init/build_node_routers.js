const path = require( 'path' );

// route definition files
const default_route = require ( path.join(__dirname, '../', 'routes', 'default_route', 'default_route-routes') )
const template_route = require ( path.join(__dirname, '../', 'routes', 'template_route', 'template_route-routes') )






module.exports = (configs, servers) => {


    // HTTP or HTTPS Routes
    if (servers.expressApp != false) {

        servers.expressApp.use( '/default', default_route.WebRouter() )
        servers.expressApp.use( '/template_route', template_route.WebRouter() )
        
    }
    

    // Socket-io Routes
    if ( servers.socketioApp != false ) { servers.socketioApp.on('connection', (socket) => {

        socket.on('/default', (data) => { default_route.IoRouter(socket, data) });
        socket.on('/template_route', (data) => { template_route.IoRouter(socket, data) });

    })}

}