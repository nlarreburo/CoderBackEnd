const { Router } = require('express')
const CartManagerMongo = require('../dao/CartManagerMongo.js')
const router = Router()
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
    await cartManagerMongo.updateCart(String(cid),String(pid))
    res.status(200).json({
        msg: 'Producto agregado al carrito',
        cid,
        pid
    })
})

// DELETE http://localhost:8080/api/cart/:cid/product/:pid Borrar prod del carrito
router.delete('/:cid/product/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const msg = await cartManagerMongo.deletProdCart(String(cid),String(pid))
    res.status(200).json({
        msg,
        cid,
        pid
    })
})

//PUT http://localhost:8080/api/cart/:cid/product/:pid Actualizar quantity 
router.put('/:cid/product/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    const msg = await cartManagerMongo.quantityProdCart(String(cid),String(pid),Number(quantity))
    res.status(200).json({
        msg,
        cid,
        pid
    })
})

//GET http://localhost:8080/api/cart/:cid Buscar por id
router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    //const cart = await cartManager.getCartsById(Number(cid))
    const cart = (await cartManagerMongo.getCartsById(String(cid))).products
    const newcart=cart.map(p => p.product)
    //console.log(newcart);
    res.status(200).render('cart',{
        newcart
    })
})

// DELETE http://localhost:8080/api/cart/:cid Borrar carrito
router.delete('/:cid', async(req,res) => {
    const {cid} = req.params
    const cart = await cartManagerMongo.deleteCart(String(cid))
    if(!cart){
        res.status(200).json({
            msg: 'El carrito se borro'})
        } else {
        res.status(200).json({
            msg: 'Error'})
        }
})



module.exports = router