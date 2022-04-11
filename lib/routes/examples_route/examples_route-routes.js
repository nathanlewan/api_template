const path = require( 'path' );

const data_processors = {
    "generate_html": require( path.join(__dirname, 'data_processors', 'generate_html') ),
    "log_messages": require( path.join(__dirname, 'data_processors', 'log_messages') ),
    "run_scripts": require( path.join(__dirname, 'data_processors', 'run_scripts') ),
    "serve_files": require( path.join(__dirname, 'data_processors', 'serve_files') )
}



exports.WebRouter = () => {

    const express = require( 'express' );
    const router = express.Router()

    router.use( (req, res, next) => { 
        data_processors.log_messages.defaultRouteMessage()
        next()
    })

    router.get('/io-terminal', (req, res) => { res.send( data_processors.generate_html.generateIoTerminalHtml() ) })

    router.get('/socket.io.min.js', (req, res) => { res.sendFile( data_processors.serve_files.generateIoPath() ) })

    router.get('/socket.io.min.js.map', (req, res) => { res.sendFile( data_processors.serve_files.generateIoPath(".map") ) })

    router.get('/echo/:message', (req, res) => { 
        data_processors.log_messages.echoOut( req.params.message );
        res.send( data_processors.generate_html.generateEchoHtml( req.params.message ) )
    })

    router.get('/runScript/scriptName', (req, res) => { 
        data_processors.log_messages.echoOut( req.params.message );
        res.send( data_processors.generate_html.generateEchoHtml( req.params.message ) )
    })

    return router

}

exports.IoRouter = (socket, data) => {
    
    switch (data.path) {

        case "/echo": {
            data_processors.log_messages.echoOut( data.message );
            socket.emit('/examples/echo', data_processors.generate_html.generateEchoHtml( data.message ))
            break;
        }

        case "/io-terminal": {
            data_processors.log_messages.echoOut( data.message );
            break;
        }

        default: {
            data_processors.log_messages.noPathSpecified();
        }

    }
}




