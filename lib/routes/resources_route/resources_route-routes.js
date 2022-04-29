const path = require( 'path' );
const logger = require ('../../service/loggerService');

exports.WebRouter = (configs) => {

    const express = require( 'express' );
    const router = express.Router();

    router.use( (req, res, next) => { 

        req.globalConfigs = {
            "baseConfigs": configs.baseConfigs
        }
        
        next();
    });

    router.get('/src/socket.io.min.js', (req, res) => { 
        res.sendFile( path.join(__dirname, '../', '../', '../', 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js') );
    });

    router.get('/src/socket.io.min.js.map', (req, res) => { 
        res.sendFile( path.join(__dirname, '../', '../', '../',  'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js.map') );
    });

    return router;

};

exports.IoRouter = async (socket, data, configs) => {
    return;
};