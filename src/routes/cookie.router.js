const { Router } = require('express')

const router = Router()

router.get('/set', (req,res) => {
    res.cookie('nombre','valor').send('cookie seteada')
})

router.get('/setSigned',(req,res)=>{
    res.cookie('nombre','valor').send('cookie seteada')
})

router.get('/delete',(req,res) => {
    res.clearCookie('nombre').send('cookie borrada')
})
module.exports = router