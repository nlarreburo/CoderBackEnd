const {Router} = require('express')
const router = Router()
const {fork} = require('child_process')

function oparcionCompleja(params) {
    let result = 0
    for (let i = 0; i < 5e9; i++) {
        result += i
    }
    return result
}
router.get('/block', (req,res) => {
    res.send('block')
})

module.exports = router