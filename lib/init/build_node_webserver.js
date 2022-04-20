const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const expressPinoLogger = require('express-pino-logger');
const logger = require ('../service/loggerService');



module.exports = ( configs ) => {

    let app = express();
    let serverPort = configs.nodeServer.port || 8080;
    let webServerType = configs.nodeServer.HTTP_HTTPS.toLowerCase() || 'disabled';
    let webServerHostname = configs.nodeServer.nodeHostName.toLowerCase() || 'localhost';
    let socketIoStatus = configs.nodeServer.socketIoStatus.toLowerCase() || 'disabled';

    let baseServer = false;
    let Server = false;
    let io = false;

    const loggerMiddleware = expressPinoLogger({
        logger: logger,
        autoLogging: false
    });

    app.use(loggerMiddleware);


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

            let sslCertPath = configs.nodeServer.HTTPS_CERT_PATH || "";
            let sslKeyPath = configs.nodeServer.HTTPS_KEY_PATH || "";

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
            logger.info(`[base][build_node_webservers][http]: no webserver defined, skipping`);
        };

    }

    switch (socketIoStatus) {

        case "enabled": {
            if ( Server === false) {
                logger.info(`[base][build_node_webservers][io]: no webserder defined, skipping socket.io, as we don't know the protocol to use`);
            } else {
                logger.info('[base][build_node_webservers][io]: enabling socket.io');
                io = require('socket.io')(Server);
            };
            break;
        }

        default: {
            logger.info(`[base][build_node_webservers][io]: socket.io not defined, skipping`);
        };
    };

    return {
        "expressApp": app,
        "socketioApp": io
    };

};