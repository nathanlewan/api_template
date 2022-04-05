const path = require( 'path' );

// route definition files
const template_route = require ( path.join(__dirname, '../', 'routes', 'template_route', 'routes') )

module.exports = (configs, servers) => {

    servers.expressApp.use( '/template_route', template_route)

}