const path = require('path');
const logger = require (path.join(__dirname, '../', 'lib', 'service', 'loggerService') );

module.exports = (basePath) => {

    require('dotenv').config({ path: path.join( basePath, 'conf','.env') });

    logger.info(`[base][config]: creating config object with basepath of [${basePath}]`);

    return {
        nodeServer: {
            port: process.env.api_NODE_PORT || 8080,
            nodeHostName: (process.env.api_NODE_SERVER_HOSTNAME || 'localhost').toLowerCase(),
            socketIoStatus: (process.env.api_NODE_SOCKET_IO || 'enabled').toLowerCase(),
            HTTP_HTTPS: (process.env.api_NODE_HTTP_HTTPS || 'http').toLowerCase(),
            HTTPS_CERT_PATH: process.env.api_NODE_HTTPS_CERT_PATH || '',
            HTTPS_KEY_PATH: process.env.api_NODE_HTTPS_CERT_KEY_PATH || ''
        },
        routes: {
            examples: {
                examplesRouteStatus: (process.env.api_NODE_ENABLE_EXAMPLES || 'enabled').toLowerCase()
            }
        },
        auth: {
            token: {
                tokenAuthEnabled: (process.env.api_NODE_TOKEN_AUTH_ENABLED || 'enabled').toLowerCase(),
                tokenAuthToken: process.env.api_TOKEN || '12345678'
            }
        }
    };
};
