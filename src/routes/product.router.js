const productsController = require("../controllers/products.controller")
const Router  = require("./router")
const { passportCall } = require('../utils/pasportCall.js')
const { authorization } = require('../middleware/authorization.js')


class ProductRouter extends Router {
    init(){
        //Obtener todos los productos
        this.get('/',['PUBLIC'], passportCall('jwt'),authorization('admin'),productsController.getProducts)

        //Buscar por id
        this.get('/:pid',['PUBLIC'],productsController.getProductsById)

        //Agregar products
        this.post('/',['PUBLIC'],productsController.addProduct)
        
        //Update products
        this.put('/:pid',['PUBLIC'],productsController.updateProduct)

        //Delete products
        this.delete('/:pid',['PUBLIC'],productsController.deleteProduct)
    }
}

module.exports = {
    ProductRouter
}