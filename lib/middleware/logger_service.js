const path = require( 'path' );
const expressPinoLogger = require( 'express-pino-logger' );
const logger = require ( path.join(__dirname, '../', 'service', 'loggerService') );

module.exports = expressPinoLogger({
    logger: logger,
    autoLogging: false
});