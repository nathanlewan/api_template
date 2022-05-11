const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const logger = require ( path.join(__dirname, '../', 'service', 'loggerService') );

const middleware = {
    "logger_service": require ( path.join(__dirname, '../', 'middleware', 'logger_service') ),
    "authenticator": require ( path.join(__dirname, '../', 'middleware', 'authenticator') ),
    "shareConfigs": require ( path.join(__dirname,'../', 'middleware', 'shareConfigs') )
}




module.exports = ( configs ) => {

    let app = express();
    let serverPort = configs.baseConfigs.nodeServer.port || 8080;
    let webServerType = configs.baseConfigs.nodeServer.HTTP_HTTPS.toLowerCase() || 'disabled';
    let webServerHostname = configs.baseConfigs.nodeServer.nodeHostName.toLowerCase() || 'localhost';
    let socketIoStatus = configs.baseConfigs.nodeServer.socketIoStatus.toLowerCase() || 'disabled';

    let baseServer = false;
    let Server = false;
    let io = false;

    
    app.use(express.json());
    app.use(middleware.shareConfigs);
    app.use(middleware.logger_service);
    app.use(middleware.authenticator);
    


    switch (webServerType) {

        case "http": {

            baseServer = require('http');
            Server = baseServer.createServer(app);
            Server.listen(serverPort, () => {
                logger.info("[base][build_node_webservers][http]: running HTTP server");
                logger.info(`[base][build_node_webservers][http]: local node instance running on ${webServerType}://${webServerHostname}:${serverPort}`);
            });

            break;
        }

        case "https": {

            let sslCertPath = configs.baseConfigs.nodeServer.HTTPS_CERT_PATH || "";
            let sslKeyPath = configs.baseConfigs.nodeServer.HTTPS_KEY_PATH || "";

            if ( sslCertPath === "" ) {
                // error no cert file
            } else {
                sslCert = fs.readFileSync( path.join(sslCertPath) );
            };
    
            if ( sslKeyPath === "" ) {
                // error no key path
            } else {
                sslKey = fs.readFileSync( path.join(sslKeyPath) );
            };

            let httpsOptions = {
                key: sslKey,
                cert: sslCert
            };

            baseServer = require( 'https' );
            Server = baseServer.createServer(httpsOptions, app);
            Server.listen(serverPort, () => {
                logger.info("[base][build_node_webservers][https]: running HTTPS server");
                logger.info(`[base][build_node_webservers][https]: local node instance running on ${webServerType}://${webServerHostname}:${serverPort}`);
            });

            break;
        }

        default: {
            logger.info(`[base][build_node_webservers][http]: no webserver defined`);
            return
        };

    }

    switch (socketIoStatus) {

        case "enabled": {
            if ( Server === false) {
                logger.info(`[base][build_node_webservers][io]: no webserder defined`);
                return
            } else {
                logger.info('[base][build_node_webservers][io]: enabling socket.io');
                io = require('socket.io')(Server);
            };
            break;
        }

        case "disabled": {
            logger.info(`[base][build_node_webservers][io]: socket.io disabled`);
            break;
        }

        default: {
            logger.info(`[base][build_node_webservers][io]: socket.io not defined, skipping`);
        };
    };

    return {
        "expressApp": app,
        "socketioApp": io,
        "configs": {
            "baseConfigs": configs.baseConfigs
        }
    };

};