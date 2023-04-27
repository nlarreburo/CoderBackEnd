const cartController = require("../controllers/cart.controller")
const { passportCall } = require("../utils/pasportCall")
const Router  = require("./router")


class CartRouter extends Router {
    init(){
        //Crear carrito
        this.post('/',['PUBLIC'],cartController.addCart)

        //Agregar al carrito
        this.post('/:cid/product/:pid',['PUBLIC'],passportCall('jwt'),cartController.updateCart)

        //Borrar prod del carrito
        this.delete('/:cid/product/:pid',['PUBLIC'],cartController.deletProdCart)
        
        //Actualizar quantity 
        this.put('/:cid/product/:pid',['PUBLIC'],cartController.quantityProdCart)

        // Buscar por id
        this.get('/:cid',['PUBLIC'],cartController.getCartsById)

        //Borrar carrito
        this.delete('/:cid',['PUBLIC'],cartController.deleteCart)

        //Generar ticket
        this.post('/:cid/purchase',['PUBLIC'],passportCall('jwt'),cartController.createTicket)
    }
}

module.exports = {
    CartRouter
}