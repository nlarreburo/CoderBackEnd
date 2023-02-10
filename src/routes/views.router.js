import { Router } from "express"
import ProductManager from '../ProductManager.js'
import __dirname from "../utils.js"

const filePath = __dirname + '/routes/JSON/products.JSON'
const router = Router()
const productManager = new ProductManager(filePath)

//GET http://localhost:8080/api/realtimeproducts/
router.get('/realtimeproducts', async (req, res) =>{
    const products = await productManager.getProducts()
    const {limit} = req.query
    if(limit) return res.send(products.slice(0, limit)) //Devuelve products hasta el indice [limit]
    
    res.render('realtimeproducts', {
        products
    }) //Devuelve products completo

})

export default router