import { Router } from "express"
import CartManager from '../CartManager.js'

const filePath = String(new URL(import.meta.url).pathname).replace('carts.router.js','carts.JSON').substring(1,999)

const router = Router()
const cartManager = new CartManager(filePath)

//POST http://localhost:8080/api/cart/
router.post('/', async (req, res) =>{
    const cart = req.body
    cart.id = Date.now()
    cart.product = []
    await cartManager.addCart(cart)
    res.status(200).json({
        cart,
        msg: 'Carrito creado'
    })
})

//POST http://localhost:8080/api/cart/:cid/product/:pid
router.post('/:cid/product/:pid', async (req,res) => {
    const {cid, pid} = req.params
    await cartManager.updateCart(Number(cid),Number(pid))
    res.status(200).json({
        msg: 'Producto agregado al carrito',
        cid,
        pid
    })
})

//GET http://localhost:8080/api/cart/:cid
router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const cart = await cartManager.getCartsById(Number(cid))
    res.status(200).json({
        msg: 'Toma tu carrito',
        cart

    })
})



export default router