const { request } = require("express");
const { cartService, productService } = require("../dao/services/service.js");

class CartController {
    //Crear carrito
    addCart = async(req,res) =>{
        const cart = await cartService.addCart()
        res.status(200).json({
        msg: 'Carrito creado',
        cart
    })
    }

    //Buscar por id
    getCartsById= async(req,res) =>{
        const {cid} = req.params
        const cart = (await cartService.getCartsById(String(cid))).products
        const newcart=cart.map(p => p.product)
        res.status(200).render('cart',{
            newcart
        })
    }

    //Agregar prod al carrito
    updateCart = async(req,res) => {
        const {cid, pid} = req.params
        await cartService.updateCart(String(cid),String(pid))
        res.status(200).json({
            msg: 'Producto agregado al carrito',
            cid,
            pid
        })
    }

    //borrar producto del carrito
    deletProdCart = async(req,res) => {
        const {cid, pid} = req.params
        const msg = await cartService.deletProdCart(String(cid),String(pid))
        res.status(200).json({
            msg,
            cid,
            pid
        })
    }

    //Actualizar quantity
    quantityProdCart = async(req,res) => {
        const {cid, pid} = req.params
        const {quantity} = req.body
        const msg = await cartService.quantityProdCart(String(cid),String(pid),Number(quantity))
        res.status(200).json({
            msg,
            cid,
            pid
        })
    }

    //Borrar carrito
    deleteCart = async(req,res) => {
        const {cid} = req.params
        const cart = await cartService.deleteCart(String(cid))
        if(!cart){
            res.status(200).json({
                msg: 'El carrito se borro'})
            } else {
            res.status(200).json({
                msg: 'Error'})
            }
    }

    //Crear ticket
    createTicket = async(req,res) => {
        const {cid} = req.params
        let totalPrice = 0
        const cart = await cartService.getCartsById(String(cid))
        if(!cart) return res.status(401).send({
            status: 'error',
            error: cart
        })

        let productsNotPutchased = []
        for (const item of cart.products){
            const productStock = item.product.stock
            const quantity = item.quantity
            if (quantity <= productStock){
                let newStock = Number(productStock - quantity)
                await productService.updateProduct(item.product._id,{stock: newStock})
                totalPrice += (quantity * item.product.price)
            } else {
                productsNotPutchased.push(item.product._id)
            }
        }
        let ticket = await cartService.ticketCart(totalPrice,req.session.user.email)
        if (productsNotPutchased.length > 0) {
            let deletProd = cart.products.filter(item => !productsNotPutchased.includes(item.product._id))
            deletProd.forEach(async element => {
                await  cartService.deletProdCart(cid,element.product._id)               
            })
        } else {
            let deletCart = cart.products
            for (let i = 0; i <= deletCart.length; i++) {
                await deletCart.forEach(async element =>  { 
                    await cartService.deletProdCart(cid,element.product._id)
                })
            }
        }
        res.status(200).json({
            ticket
        })
    }

}

module.exports = new CartController()