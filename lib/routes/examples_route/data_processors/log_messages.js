const logger = require ('../../../service/loggerService');

exports.echoOut = async (message) => {
    logger.info(`[base][log_messages][echo]: ${message}`);
};

exports.noPathSpecified = async () => {
    logger.info(`[base][log_messages]: no path specified`);
};

exports.defaultRouteMessage = async () => {
    logger.info(`[base][log_messages][default]: route accessed`);
};