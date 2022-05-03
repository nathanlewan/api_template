const fs = require('fs');
var hjson = require('../../node_modules/hjson/bundle/hjson');
const logger = require ('../service/loggerService');


const utilityFunctions = {
    "testPatterns": require('./test_variable_patterns')
}



exports.getDirContents = (dirPath) => {

    return new Promise( (resolve, reject) => {

        if ( utilityFunctions.testPatterns.isEmpty(dirPath) === true) {
            logger.error("[base][filesystem_functions][getDirContents]: dirPath is empty. it is required");
            resolve([]);
        }
    
        fs.readdir(dirPath, {encoding: 'utf8', withFileTypes: true}, (err, files) => {
            if (err) {
                resolve(err)
            } else {
                resolve({
                    "directoryName": dirPath,
                    "filesArray": files
                })
            }
        })

    })
    
}


exports.getFileContents = (filesObject) => {

    return new Promise ((resolve, reject) => {
        let dirPath = filesObject.directoryName
        let finalData = {};

        filesObject.filesArray.forEach( element => {

            if ( element.isDirectory() === false ) {
                let data = fs.readFileSync(`${dirPath}/${element.name}`, 'utf8')

                //finalData[element] = hjson.parse(data)
                finalData[element.name] = data
            }
                
        })
        
        resolve(finalData)

    })

}


exports.writeFileContents = (fileName, fileData) => {

    return new Promise ((resolve, reject) => {
        fs.writeFile(fileName, fileData, (err) => {
            if (err) {
                resolve(err.message)
            }
            resolve("success")
        })
    })

}


exports.createBaseFolderStructures = () => {

    // create log folder if it does not exist
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs')
    }
}

