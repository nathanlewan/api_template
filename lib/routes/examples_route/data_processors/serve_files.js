const path = require('path');

exports.generateIoPath = async (append) => {

    let pathDef;

    if (append === undefined) {
        pathDef = path.join(__dirname, '../', '../', '../', '../', 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js')
    } else {
        pathDef = path.join(__dirname, '../', '../', '../', '../', 'node_modules', 'socket.io', 'client-dist', `socket.io.min.js${append}`)
    }
    
    return `${pathDef}`

}