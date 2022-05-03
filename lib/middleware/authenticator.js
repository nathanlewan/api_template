
const path = require('path');

const utilityFunctions = {
    "test_variable_patterns": require( path.join(__dirname, '../', 'utility_functions', 'test_variable_patterns') )
}

module.exports = async (req, res, next) => {
    
    let reqTestsPassed = [
        ( utilityFunctions.test_variable_patterns.isPopulated( req ) ),
        ( utilityFunctions.test_variable_patterns.isAttributePopulated( req, 'globalConfigs.baseConfigs.auth' ) )
    ];

    if (reqTestsPassed.includes(false)) {
        res.send('internal error')
        return
    }

    if (req.globalConfigs.baseConfigs.auth.token.tokenAuthEnabled === 'disabled') {

        next()
        return
        
    }

    let isAuthenticated = await utilityFunctions.test_variable_patterns.isAuthorized(req.headers.authorization, req.globalConfigs.baseConfigs.auth.token.tokenAuthToken)

    if (isAuthenticated) {
        next()
        return
    } else {
        res.send('not authorized')
        return
    }

}