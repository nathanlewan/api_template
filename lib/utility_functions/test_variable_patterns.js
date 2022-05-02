module.exports.includes = (variableBeingTested, patternToMatch) => {
    return (variableBeingTested).includes(patternToMatch);
}

module.exports.isAuthorized = async ( givenToken, requiredToken ) => {

    if (givenToken === requiredToken) {
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

module.exports.isPopulated = (variableBeingTested) => {
    try {
        if (variableBeingTested === null || variableBeingTested === undefined || variableBeingTested === "") {
            return false
        } else {
            return true
        }
    } catch (err) {
        // if there's an error, assume it's empty
        return true
    }
    
}

module.exports.isAttributePopulated = (object, stringPath) => {

    // if object is empty, return false
    if (this.isEmpty(object) === true) {
        return false;
    };
  
    // if nothing is passed for stringPath, return false
    if (this.isEmpty(stringPath) === true) {
        return false;
    }
  
    // attempt to split our stringPath into an array, otherwise set to empty array
    var arr = stringPath.split(".") || [];
  
    // while arr still has a length, and obj is still an obj, do the following
    while (arr.length) {
  
        var testVal = arr.shift();
  
        if (this.isEmpty(object[testVal]) === false) {
            object = object[testVal];
            continue;
        } else {
            return false;
        }
  
    }
  
    return true;
  
}