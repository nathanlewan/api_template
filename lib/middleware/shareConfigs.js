module.exports = (req, res, next) => {
    req.globalConfigs = {
        baseConfigs: require('../../conf/config')(''),
    }
    next()
}
