const path = require('path');
const dataCompilers = require (path.join(__dirname, 'template_route-data_compilers'))


exports.WebRouter = () => {

    const express = require('express');
    const router = express.Router()

    router.use( (req, res, next) => {
        console.log('template_route called')
        next()
    })

    router.get('/', (req, res) => {
        res.send('root of template_route. try /test as well')
    })

    router.get('/test', (req, res) => {
        let data = dataCompilers.returnProcessedData()
        res.send(data)
    })

    return router

}

exports.IoRouter = (socket, data) => {
    
    switch (data.path) {

        case "/echo": {
            console.log(`[template_route]: ${data.message}`)
            break;
        }

        default: {
            console.log('[template_route]: no valid path supplied')
        }

    }
}
