const path = require( 'path' );

const data_processors = {
    "generate_html": require( path.join(__dirname, 'data_processors', 'generate_html') ),
    "log_messages": require( path.join(__dirname, 'data_processors', 'log_messages') )
};

const utility_functions = {
    "runShellProcesses": require( path.join(__dirname, '../', '../', 'utility_functions', 'run_shell_processes') )
}



exports.WebRouter = (configs) => {

    const express = require( 'express' );
    const router = express.Router();

    router.use( (req, res, next) => {

        if (configs.baseConfigs.routes.examples.examplesRouteStatus === 'disabled') {
            console.log('not enabled')
            res.send('disabled')
            return
        }

        req.globalConfigs = {
            "baseConfigs": configs.baseConfigs
        }

        next();
    });

    router.get('/io-terminal', async (req, res) => { res.send( await data_processors.generate_html.generateIoTerminalHtml() ) });

    router.get('/echo/:message', async (req, res) => { 
        await data_processors.log_messages.echoOut( req.params.message );
        res.send( await data_processors.generate_html.generateEchoHtml( req.params.message ) );
    });

    router.get('/runScript/:scriptName', async (req, res) => { 
        let message = await utility_functions.runShellProcesses.linuxShell("../routes/examples_route/data_processors/scripts", req.params.scriptName);
        await data_processors.log_messages.echoOut( message );
        res.send( await data_processors.generate_html.generateEchoHtml( message ) );
    });

    return router;

};

exports.IoRouter = async (socket, data, configs) => {

    if (configs.baseConfigs.routes.examples.examplesRouteStatus === 'disabled') {
        socket.emit('/error', await data_processors.generate_html.generateEchoHtml( "route disabled" ));
        return
    }
    
    switch (data.path) {

        case "/echo": {
            data_processors.log_messages.echoOut( data.message );
            socket.emit('/examples/echo', await data_processors.generate_html.generateEchoHtml( data.message ));
            break;
        };

        case "/io-terminal": {
            data_processors.log_messages.echoOut( data.message );
            break;
        };

        case "/runScript": {
            let message = await data_processors.run_scripts("../routes/examples_route/data_processors/scripts", data.scriptName);
            data_processors.log_messages.echoOut( message );
            socket.emit('/examples/echo', await data_processors.generate_html.generateEchoHtml( message ));
            break;
        };


        default: {
            data_processors.log_messages.noPathSpecified();
        };

    };
};




