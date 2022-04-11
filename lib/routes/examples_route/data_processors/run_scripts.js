const exec = require('child_process').exec;


exports.runScript = (scriptPath) => {
    const myShellScript = exec( scriptPath );
    myShellScript.stdout.on('data', (data)=>{
        console.log(data); 
    });
    myShellScript.stderr.on('data', (data)=>{
        console.error(data);
    });
}
