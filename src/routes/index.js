const { Router } = require('express')
const {UserRouter} = require('./user.router.js')
const {ProductRouter} = require('./product.router.js')
const { CartRouter } = require('./cart.router.js')
const { AuthRouter } = require('./auth.router.js')


const router = Router()
const userRouter = new UserRouter()
const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
const authRouter = new AuthRouter()


router
    .use('/user', userRouter.getRouter())
    .use('/product', productRouter.getRouter())
    .use('/cart', cartRouter.getRouter())
    .use('/auth',authRouter.getRouter())


router.get('/', async (req,res) =>{
    res.status(200).redirect('/auth/login')
})



module.exports = {
    router
}