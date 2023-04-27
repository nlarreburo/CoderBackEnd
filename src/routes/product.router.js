const productsController = require("../controllers/products.controller")
const Router  = require("./router")
const { passportCall } = require('../utils/pasportCall.js')
const { authorization } = require('../middleware/authorization.js')


class ProductRouter extends Router {
    init(){
        //passportCall('jwt')    ->    verificar usuario
        //authorization('admin') ->    verificar admin
        
        //Obtener todos los productos
        this.get('/',['PUBLIC'], productsController.getProducts)

        //Buscar por id
        this.get('/:pid',['PUBLIC'],productsController.getProductsById)

        //Agregar products
        this.post('/',['PUBLIC'],passportCall('jwt'),authorization('admin'),productsController.addProduct)
        
        //Update products
        this.put('/:pid',['PUBLIC'],passportCall('jwt'),authorization('admin'),productsController.updateProduct)

        //Delete products
        this.delete('/:pid',['PUBLIC'],passportCall('jwt'),authorization('admin'),productsController.deleteProduct)
    }
}

module.exports = {
    ProductRouter
}