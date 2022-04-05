const path = require('path');
const cfg = require( path.join(__dirname, 'conf','config') );
const initializeWebServer = require( path.join(__dirname, 'lib', 'init', 'build_node_webserver') );
// const initializeRoutes = require( path.join(__dirname, 'lib', 'init', 'build_node_routers') )


let servers = initializeWebServer( cfg )
/* 
initializeRoutes ( cfg, servers)

servers.expressApp.get( '/', ( req, res ) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.join(__dirname, 'conf', 'index.html'))
});

servers.expressApp.get( '/io.js', ( req, res ) => {
    res.setHeader('content-type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js'))
});

if ( servers.socketioApp != false ) {
    servers.socketioApp.on('connection', function(socket) {
        console.log('A user connected');
    
        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
        console.log('A user disconnected');
        });
    });
} */
