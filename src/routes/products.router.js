const { Router } = require('express')
//const ProductManager = require('../dao/ProductManager.js')
const ProductManagerMongo = require('../dao/ProductManagerMongo.js')


const router = Router()
const productManagerMongo = new ProductManagerMongo()

//GET http://localhost:8080/api/products/ Muestra todos los productos
router.get('/', async (req, res) =>{
    //const products = await productManager.getProducts()
    const products = await productManagerMongo.getProducts()
    const {limit} = req.query
    if(limit) return res.send(products.slice(0, limit)) //Devuelve products hasta el indice [limit]
    res.status(201).send({
        msg:'success',
        products
    })
//    res.render('home', {
//        products
//    }) //Devuelve products completo

})

//GET http://localhost:8080/api/products/:pid  Buscar por ID
router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    //const prod = await productManager.getProductsById(Number(pid))
    const prod = await productManagerMongo.getProductsById(Number(pid))
    res.status(200).json({
        msg: 'Su busqueda',
        prod
    })
})

//POST http://localhost:8080/api/products/  Agregar product
router.post('/', async (req,res) =>{
    const {title,description,price,thumbnail,code,stock} = req.body  
    //await productManager.addProduct(title,description,price,thumbnail,code,stock)
    const prod = await productManagerMongo.addProduct(title,description,price,thumbnail,code,stock)
    if(prod){
        res.status(201).send({
            msg: 'success',
            prod
        })
    } else {
        res.status(400).send({
            msg: 'error'
        })
    }
})

//PUT http://localhost:8080/api/products/:pid   id del producto, campo al cual se quiere modificar, modificacion
router.put('/:pid', async (req,res) => {
    const {pid} = req.params
    const updateProd = req.body
    //await productManager.updateProduct(Number(pid),updateProd)
    await productManagerMongo.updateProduct(Number(pid),updateProd)
    res.status(200).json({
        msg : 'Se actualizo correctamente'
    })
})

//DELETE http://localhost:8080/api/products/:pid    Borrar product
router.delete('/:pid', async (req,res) => {
    const {pid} = req.params
    //await productManager.deleteProduct(pid)
    const product = await productManagerMongo.deleteProduct(pid)
    if (product.length!=0){
        res.status(200).json({
            msg : 'El producto se a borrado',
            product
        })
    } else {
        res.status(200).send({
            msg: 'No existe el producto'
        })
    }
})




module.exports = router