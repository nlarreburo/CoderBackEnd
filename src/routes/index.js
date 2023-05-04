const { Router } = require('express')
const {UserRouter} = require('./user.router.js')
const {ProductRouter} = require('./product.router.js')
const { CartRouter } = require('./cart.router.js')
const { AuthRouter } = require('./auth.router.js')
const { MailRouter } = require('./mail.router.js')
const { ChatRouter } = require('./chat.router.js')
const errorHandler = require('../middleware/error/indexerror.js')
const { MockingRouter } = require('./mockingproducts.router.js')



const router = Router()
const userRouter = new UserRouter()
const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
const authRouter = new AuthRouter()
const mailRouter = new MailRouter()
const chatRouter = new ChatRouter()
const mockingRouter = new MockingRouter()


router
    .use('/user', userRouter.getRouter())
    .use('/product', productRouter.getRouter())
    .use('/cart', cartRouter.getRouter())
    .use('/auth', authRouter.getRouter())
    .use('/api/mail', mailRouter.getRouter())
    .use('/chat', chatRouter.getRouter())
    .use('/mockingproducts',mockingRouter.getRouter())
    .use(errorHandler)
    

router.get('/', async (req,res) =>{
    res.status(200).redirect('/auth/login')
})



module.exports = {
    router
}