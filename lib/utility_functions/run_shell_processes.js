const exec = require('child_process').exec;
const path = require( 'path' );
const logger = require ('../service/loggerService');


module.exports = (scriptPath, scriptName) => {

    return new Promise((resolve, reject) => {
        logger.info(`[base][run_shell_process]: running ${scriptName}/${scriptPath}`);
        const myShellScript = exec( path.join( __dirname, `${scriptPath}`, `${scriptName}`), (error, stdout, stderr) => {

            if (error) { resolve(error.message) };
            if (stderr) { resolve(stderr) };

            resolve(stdout);

        });

    });

};
