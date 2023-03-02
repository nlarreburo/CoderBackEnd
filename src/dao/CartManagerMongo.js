const CartsModel = require('../models/carts.model.js')
const ProductManagerMongo = require('../dao/ProductManagerMongo.js')

const productManagerMongo = new ProductManagerMongo()


class CartManagerMongo {

    //Crear carrito
    addCart = async() =>{
        try {
            //Creamos id
            var cid = ((await CartsModel.find({},{id:1,_id:0}).sort({id:-1}).limit(1)).map(doc => doc.id))[0]
            if(cid){
                //Sumamos al ultimo id
                var id = cid + 1
            }else{
                //Creamos el primer id
                var id = 1
            }
    
            let cart = await CartsModel.create({
                id,
                "product" : []
            })
    
            return cart

        } catch (error) {
            console.log("Cart Error:", error)
        } 
    }


    //Buscar por id
    getCartsById = async(cid) =>{
        const cart = await CartsModel.find({id:cid})
        return cart
    }


    //Agregar prod al carrito
    updateCart = async(cid,pid) =>{
        let product = await productManagerMongo.getProductsById(pid)
        let cart = await this.getCartsById(cid)
        if(!(cart[0].product.find(p => p.prodId === pid))) {
            var newCart = [{"prodId":pid,"quantity":1}]
            await CartsModel.updateOne({id:cid},{$set:{product:newCart}})
        }else{
            cart[0].product.find( async p => {if(p.prodId === pid){
                var newQuantity = p.quantity + 1
                var newCart = [{"prodId":pid,"quantity":newQuantity}]
                await CartsModel.updateOne({id:cid},{$set:{product:newCart}})
            }})
        }
    }


}

module.exports = CartManagerMongo