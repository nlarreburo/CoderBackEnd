const { request } = require("express");
const { cartService } = require("../dao/services/service.js");

class CartController {
    //Crear carrito
    addCart = async(req=request,res) =>{
        const cart = await cartService.addCart()
        res.status(200).json({
        msg: 'Carrito creado',
        cart
    })
    }

    //Buscar por id
    getCartsById= async(req=request,res) =>{
        const {cid} = req.params
        const cart = (await cartService.getCartsById(String(cid))).products
        const newcart=cart.map(p => p.product)
        res.status(200).render('cart',{
            newcart
        })
    }

    //Agregar prod al carrito
    updateCart = async(req=request,res) => {
        const {cid, pid} = req.params
        await cartService.updateCart(String(cid),String(pid))
        res.status(200).json({
            msg: 'Producto agregado al carrito',
            cid,
            pid
        })
    }

    //borrar producto del carrito
    deletProdCart = async(req=request,res) => {
        const {cid, pid} = req.params
        const msg = await cartService.deletProdCart(String(cid),String(pid))
        res.status(200).json({
            msg,
            cid,
            pid
        })
    }

    //Actualizar quantity
    quantityProdCart = async(req=request,res) => {
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
    deleteCart = async(req=request,res) => {
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
}

module.exports = new CartController()