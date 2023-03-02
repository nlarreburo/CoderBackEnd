const { Router } = require('express')
const CartManager= require('../dao/CartManager.js')
const CartManagerMongo = require('../dao/CartManagerMongo.js')

const filePath = __dirname + '/JSON/carts.JSON'
const router = Router()
const cartManager = new CartManager(filePath)
const cartManagerMongo = new CartManagerMongo()

//POST http://localhost:8080/api/cart/  Crear carrito
router.post('/', async (req, res) =>{
    //await cartManager.addCart()
    const cart = await cartManagerMongo.addCart()
    res.status(200).json({
        msg: 'Carrito creado',
        cart
    })
})

//POST http://localhost:8080/api/cart/:cid/product/:pid Agregar al carrito
router.post('/:cid/product/:pid', async (req,res) => {
    const {cid, pid} = req.params
    //await cartManager.updateCart(Number(cid),Number(pid))
    await cartManagerMongo.updateCart(Number(cid),Number(pid))
    res.status(200).json({
        msg: 'Producto agregado al carrito',
        cid,
        pid
    })
})

//GET http://localhost:8080/api/cart/:cid Buscar por id
router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    //const cart = await cartManager.getCartsById(Number(cid))
    const cart = await cartManagerMongo.getCartsById(Number(cid))
    res.status(200).json({
        msg: 'Toma tu carrito',
        cart

    })
})



module.exports = router