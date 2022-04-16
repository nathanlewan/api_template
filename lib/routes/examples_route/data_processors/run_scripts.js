const exec = require('child_process').execFile;


module.exports = async (scriptName) => {
    const myShellScript = exec( `lib/routes/examples_route/data_processors/scripts/${scriptName}`, (error, stdout, stderr) => {
        if (error) {
            return error.message
        }

        return(stdout)
    });

    return myShellScript.stdout
}
