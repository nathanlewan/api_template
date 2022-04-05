const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );



module.exports = ( configs ) => {

    let app = express();
    let serverPort = configs.nodeServer.port || 8080;
    let webServerType = configs.nodeServer.HTTP_HTTPS.toLowerCase() || 'disabled';
    let webServerHostname = configs.nodeServer.nodeHostName.toLowerCase() || 'localhost';
    let socketIoStatus = configs.nodeServer.socketIoStatus.toLowerCase() || 'disabled';

    let baseServer = false;
    let Server = false;
    let io = false;


    switch (webServerType) {

        case "http": {

            baseServer = require('http')
            Server = baseServer.createServer(app)
            Server.listen(serverPort, () => {
                console.log(`local node instance running on ${webServerType}://${webServerHostname}:${serverPort}`);
            })

            break;
        }

        case "https": {

            let sslCertPath = configs.nodeServer.HTTPS_CERT_PATH || "";
            let sslKeyPath = configs.nodeServer.HTTPS_KEY_PATH || "";

            if ( sslCertPath === "" ) {
                // error no cert file
            } else {
                sslCert = fs.readFileSync( path.join(sslCertPath) );
            }
    
            if ( sslKeyPath === "" ) {
                // error no key path
            } else {
                sslKey = fs.readFileSync( path.join(sslKeyPath) );
            }

            let httpsOptions = {
                key: sslKey,
                cert: sslCert
            }

            baseServer = require( 'https' )
            Server = baseServer.createServer(httpsOptions, app)
            Server.listen(serverPort, () => {
                console.log(`local node instance running on ${webServerType}://${webServerHostname}:${serverPort}`);
            })

            break;
        }

        default: {
            console.log(`no webserver defined, skipping`);
        }

    }

    switch (socketIoStatus) {

        case "enabled": {
            if ( Server === false) {
                console.log(`no webserder defined, skipping socket.io, as we don't know the protocol to use`);
            } else {
                console.log('enabling socket.io')
                io = require('socket.io')(Server);
            }
            break;
        }

        default: {
            console.log(`socket.io not defined, skipping`);
        }
    }

    return {
        "expressApp": app,
        "socketioApp": io
    }

}