const fs = require('fs');
const path = require('path');
const logger = require ( path.join(__dirname, '../', 'service', 'loggerService') );


const utilityFunctions = {
    "testPatterns": require( path.join(__dirname, 'test_variable_patterns') )
}



exports.getDirContents = (dirPath) => {

    return new Promise( (resolve, reject) => {

        logger.info(`[base][getDirContents]: getting files in directory: [${dirPath}]`);

        if ( utilityFunctions.testPatterns.isEmpty(dirPath) === true) {
            logger.error("[base][getDirContents]: dirPath is empty. it is required");
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

                logger.info(`[base][getFileContents]: getting data from file [${dirPath}/${element.name}]`);

                let data = fs.readFileSync(`${dirPath}/${element.name}`, 'utf8')

                finalData[element.name] = data

            }
                
        })
        
        resolve(finalData)

    })

}


exports.writeFileContents = (fileName, fileData) => {

    return new Promise ((resolve, reject) => {

        logger.info(`[base][writeFileContents]: writing data to [${fileName}]`);

        fs.writeFile(fileName, fileData, (err) => {
            if (err) {
                resolve(err.message)
            }
            resolve("success")
        })

    })

}


exports.createBaseFolderStructures = () => {

    logger.info(`[base][createBaseFolderStructure]: ensuring log folder exists at [${path.join(__dirname, '../', '../', 'logs')}]`);
    
    if (!fs.existsSync( path.join(__dirname, '../', '../', 'logs') ) ) {
        fs.mkdirSync( path.join(__dirname, '../', '../', 'logs') )
    }

}

