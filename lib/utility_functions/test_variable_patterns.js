module.exports.includes = (variableBeingTested, patternToMatch) => {
    return (variableBeingTested).includes(patternToMatch);
}

module.exports.isAuthorized = async ( req ) => {
    
    let configFileToken = req.globalConfigs.projectConfigs.auth.token || '12345678'

    if (configFileToken === req.headers.authorization) {
        return true
    } else {
        return false
    }
    
}

module.exports.isEmpty = (variableBeingTested) => {
    try {
        if (variableBeingTested === null || variableBeingTested === undefined || variableBeingTested === "") {
            return true
        } else {
            return false
        }
    } catch (err) {
        // if there's an error, assume it's empty
        return true
    }
    
}