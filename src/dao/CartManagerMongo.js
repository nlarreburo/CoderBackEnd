const CartsModel = require('../models/carts.model.js')


class CartManagerMongo {

    //Crear carrito
    addCart = async() =>{
        try {
            const cart = await CartsModel.create({})
    
            return cart

        } catch (error) {
            console.log("Cart Error:", error)
        } 
    }


    //Buscar por id
    getCartsById = async(cid) =>{
        const cart = await CartsModel.find({_id:cid})
        //const cart = await CartsModel.find({_id:cid}).populate('products.product')
        //console.log(JSON.stringify(cart,null,2));
        return cart
        
    }


    //Agregar prod al carrito
    updateCart = async(cid,pid) =>{
        let cart = await CartsModel.findById({_id:cid})
        cart.products.push({product:pid,quantity:1})
        console.log(cart);
        let resp = await CartsModel.findOneAndUpdate({_id:cid},cart)
        console.log(resp);
    }

    //borrar producto del carrito
    deletProdCart = async(cid,pid) =>{
        let cart = await CartsModel.findById({_id:cid})
        let msg = ""
        if((cart.products.find(p => p.product == pid))) {
            const newCart = cart.products.filter(p => p.product != pid)
            await CartsModel.updateOne({_id:cid},{$set:{products:newCart}})
            msg = "El producto se elimino del carrito"
        }else{
            console.log("El producto no esta en el carrito");
            msg = "El producto no esta en el carrito"
        }
        return msg
    }

    //Actualizar quantity
    quantityProdCart = async(cid,pid,quantity) =>{
        let cart = await CartsModel.findById({_id:cid})
        let msg = ""
        if((cart.products.find(p => p.product == pid))) {
            let newCart = cart.products
            newCart.find(t => {
                if(t.product==pid){
                    console.log(t);
                    t.quantity = t.quantity + quantity
                    console.log(t)
                }
            })
            await CartsModel.updateOne({_id:cid},{$set:{products:newCart}})
            msg = "El producto se actualizo correctamente"
        }else{
            console.log("El producto no esta en el carrito");
            msg = "El producto no esta en el carrito"
        }
        return msg
    }

    //Borrar carrito
    deleteCart = async(cid) => {
        const cart = await CartsModel.findById({_id:cid})
        if (cart){
            await CartsModel.deleteOne({_id:cid})
        }
    }


}

module.exports = CartManagerMongo