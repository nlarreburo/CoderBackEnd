import { Router } from "express"
import ProductManager from '../ProductManager.js'


const filePath = String(new URL(import.meta.url).pathname).replace('products.router.js','products.JSON').substring(1,999)


const router = Router()
const productManager = new ProductManager(filePath)

//GET http://localhost:8080/api/products/
router.get('/', async (req, res) =>{
    const products = await productManager.getProducts()
    //console.log(products)
    const {limit} = req.query
    if(limit) return res.send(products.slice(0, limit)) //Devuelve products hasta el indice [limit]
    res.send(products) //Devuelve products completo

})

//GET http://localhost:8080/api/products/:pid
router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    //const prod = products.find(p => p.id === Number(pid))
    const prod = await productManager.getProductsById(Number(pid))
    res.status(200).json({
        msg: 'Su busqueda',
        prod
    })
})

//POST http://localhost:8080/api/products/
router.post('/', async (req,res) =>{
    const {title,description,price,thumbnail,code,stock} = req.body
    await productManager.addProduct(title,description,price,thumbnail,code,stock)
    res.status(200).json({
        msg : 'Se agrego correctamente'
    })
})

//PUT http://localhost:8080/api/products/:pid
router.put('/:pid', async (req,res) => {
    const {pid} = req.params
    const updateProd = req.body
    await productManager.updateProduct(Number(pid),updateProd)
    res.status(200).json({
        msg : 'Se actualizo correctamente'
    })
})

//DELETE http://localhost:8080/api/products/:pid
router.delete('/:pid', async (req,res) => {
    const {pid} = req.params
    await productManager.deleteProduct(pid)
    res.status(200).json({
        msg : 'El producto se a borrado'
    })
})




export default router