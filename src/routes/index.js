const { Router } = require('express')
const {UserRouter} = require('./user.router.js')
const {ProductRouter} = require('./product.router.js')
const { CartRouter } = require('./cart.router.js')


const router = Router()
const userRouter = new UserRouter()
const productRouter = new ProductRouter()
const cartRouter = new CartRouter()


router.use('/user', userRouter.getRouter())
router.use('/product', productRouter.getRouter())
router.use('/cart', cartRouter.getRouter())


router.get('/', async (req,res) =>{
    res.status(200).redirect('/user/login')
})



module.exports = {
    router
}