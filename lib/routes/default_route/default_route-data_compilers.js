const path = require('path');

function defaultRouteMessage() {
    console.log("[defaultRouteMessage]: default route accessed")
}

function generateIoTerminalHtml() {
    let htmlData = `
    <html>
        <head>
            <title>io-terminal</title>
        </head>
        <body>
        <script src="/default/socket.io.min.js"></script>
        <script>var socket = io();</script>
        </body>
    </html>
    `
    return htmlData
}

function generateIoPath(append) {
    let pathDef = path.join(__dirname, '../', '../', '../', 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js')
    return `${pathDef}${append}`
}

function echoOut(data) {
    console.log(data.message)
}

function noPathSpecified() {
    console.log("[default_route]: no path specified")
}

exports.ioTerminalHtml = generateIoTerminalHtml();
exports.defaultRouteMessage = defaultRouteMessage;
exports.generateIoPath = generateIoPath;
exports.echoOut = echoOut;
exports.noPathSpecified = noPathSpecified