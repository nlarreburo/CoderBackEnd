const {Router} = require('express')

const router = Router()

router.get('/',(req,res)=>{
    req.logger.fatal('fatal: 0')
    req.logger.error('error: 1')
    req.logger.warning('warning: 2')
    req.logger.info('info: 3')
    req.logger.http('http: 4')
    req.logger.debug('debug: 5')
    res.send({
        msg: 'Prueba de logger'
    })
})

module.exports = router