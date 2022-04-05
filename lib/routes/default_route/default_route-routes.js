const path = require('path');
const dataCompilers = require (path.join(__dirname, 'default_route-data_compilers'))


exports.WebRouter = () => {

    const express = require('express');
    const router = express.Router()

    router.use( (req, res, next) => { 
        dataCompilers.defaultRouteMessage()
        next()
    })

    router.get('/io-terminal', (req, res) => {
        res.send(dataCompilers.ioTerminalHtml)
    })

    router.get('/socket.io.min.js', (req, res) => {
        res.sendFile(dataCompilers.generateIoPath(""))
    })

    router.get('/socket.io.min.js.map', (req, res) => {
        res.sendFile(dataCompilers.generateIoPath(".map"))
    })

    return router

}

exports.IoRouter = (socket, data) => {
    
    switch (data.path) {

        case "/echo": {
            dataCompilers.echoOut(data);
            break;
        }

        default: {
            dataCompilers.noPathSpecified();
        }

    }
}




