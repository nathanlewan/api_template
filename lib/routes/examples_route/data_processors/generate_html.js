exports.generateIoTerminalHtml = async () => {
    let htmlData = `
    <html>
        <head>
            <title>io-terminal</title>
        </head>
        <body>
            <h3>Open browser console to interact with 'socket'</h3>
            <script src="/examples/socket.io.min.js"></script>
            <script>var socket = io();</script>
            <script>
                socket.on('/examples/echo', (data) => {
                    document.all[0].innerHTML = data
                })
            </script>
        </body>
    </html>
    `
    return htmlData
}

exports.generateEchoHtml = async (message) => {
    let htmlData = `
    <html>
        <head>
            <title>io-terminal</title>
        </head>
        <body>
        <h3 style="color: red">${message}</h3>
        <script src="/examples/socket.io.min.js"></script>
        <script>var socket = io();</script>
        </body>
    </html>
    `
    return htmlData
}
