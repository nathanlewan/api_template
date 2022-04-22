module.exports.includes = (variableBeingTested, patternToMatch) => {
    return (variableBeingTested).includes(patternToMatch);
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