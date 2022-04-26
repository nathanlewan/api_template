const path = require('path');
const logger = require ('../../base/lib/service/loggerService');

module.exports = (basePath) => {

    require('dotenv').config({ path: path.join( basePath, 'conf','.env') });

    logger.info("[base][config]: creating config object");

    return {
        nodeServer: {
            port: process.env.api_NODE_PORT || 8080,
            nodeHostName: (process.env.api_NODE_SERVER_HOSTNAME || 'localhost').toLowerCase(),
            socketIoStatus: (process.env.api_NODE_SOCKET_IO || 'enabled').toLowerCase(),
            HTTP_HTTPS: (process.env.api_NODE_HTTP_HTTPS || 'http').toLowerCase(),
            HTTPS_CERT_PATH: process.env.api_NODE_HTTPS_CERT_PATH || '',
            HTTPS_KEY_PATH: process.env.api_NODE_HTTPS_CERT_KEY_PATH || '',
            examplesRouteStatus: (process.env.api_NODE_ENABLE_EXAMPLES || 'enabled').toLowerCase()
        }
    };
};
