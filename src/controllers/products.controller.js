const {request} = require('express')
const {productService} = require('../dao/services/service.js')

class ProductsController {
    getProducts = async(req=request,res)=>{
        const products = await productService.getProducts()
        res.status(200).json({
            msg:'Productos',
            products
        })
    }

    getProductsById= async(req=request,res) =>{
        const {pid} = req.params
        const product = await productService.getProductsById(pid)
        res.status(200).json({
            msg:'Producto',
            product
        })
    }

    addProduct = async(req=request,res) => {
        const {title,description,price,thumbnail,code,stock} = req.body  
        const prod = await productService.addProduct(title,description,price,thumbnail,code,stock)
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
    }

    updateProduct = async(req=request,res) => {
        const {pid} = req.params
        const updateProd = req.body
        await productService.updateProduct(Number(pid),updateProd)
        res.status(200).json({
            msg : 'Se actualizo correctamente'
        })
    }

    deleteProduct = async(req=request,res) => {
        const {pid} = req.params
        const product = await productService.deleteProduct(pid)
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
    }
}

module.exports = new ProductsController()