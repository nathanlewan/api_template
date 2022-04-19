const exec = require('child_process').exec;
const path = require( 'path' );


module.exports = (scriptPath, scriptName) => {

    return new Promise((resolve, reject) => {
        const myShellScript = exec( path.join( __dirname, `${scriptPath}`, `${scriptName}`), (error, stdout, stderr) => {

            if (error) { resolve(error.message) }
            if (stderr) { resolve(stderr) }

            resolve(stdout)

        });

        return myShellScript.stdout
    })

}
