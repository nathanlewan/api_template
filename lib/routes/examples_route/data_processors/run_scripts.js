const exec = require('child_process').exec;


module.exports = (scriptName) => {
    return new Promise((resolve, reject) => {
        const myShellScript = exec( `./lib/routes/examples_route/data_processors/scripts/${scriptName}`, (error, stdout, stderr) => {

            if (error) {
                resolve(error.message)
            }

            if (stderr) {
             
                resolve(stderr)
            }
           resolve(stdout)
        });

        return myShellScript.stdout
    })
}
