const pino = require('pino');

module.exports = pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: false,
                levelFirst: true,
                ignore: 'hostname,pid',
                translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT Z',
                destination: (`${__dirname}/../../logs/logfile.log`)
            }
        }
    }
); 