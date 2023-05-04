const {request} = require('express')
const {productService} = require('../dao/services/service.js')
const CustomError = require('../Errors/CustomError.js')
const { generateProductsErrorInfo } = require('../Errors/info.js')
const EErrors = require('../Errors/enum.js')

class ProductsController {

    getProductsById= async(req=request,res) =>{
        const {pid} = req.params
        const product = await productService.getProductsById(pid)
        res.status(200).json({
            msg:'Producto',
            product
        })
    }

    addProduct = async(req=request,res,done) => {
        const {title,description,price,thumbnail,code,stock} = req.body 
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock){
                CustomError.createError({
                    name: 'Product Creation error',
                    cause: generateProductsErrorInfo({
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock
                    }),
                    message: 'Error tring to create Product',
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }
            const prod = await productService.addProduct(title,description,price,thumbnail,code,stock)
            
            res.status(200).send({
                msg: 'success',
                prod
            })

        } catch (error) {
            console.log(error.cause)
            done(error)
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
    getProducts = async(req=request,res)=>{
        try {
            const {page = 1, limit, sort} = req.query
            var limitNum = Number(limit)
            if(!limitNum || limitNum > 10){limitNum = 10}
            if(sort){
                var sortFilter = ""
                if(sort=="asc"){
                    sortFilter = {price:1}
                } else if(sort=="des"){
                    sortFilter = {price:-1}
                }
            }
            const option = {
                page,
                limit : limitNum,
                lean:true,
                sort: sortFilter
            }
            const filter = {
    
            }
    
            const {docs,totalPages,hasPrevPage,hasNextPage,nextPage,prevPage} = await productService.getProducts(filter,option)
            const products = docs
            var prevLink = null
            var nextLink = null
            if(hasPrevPage){prevLink = `http://localhost:8080/views/products?page=` + prevPage}
            if(hasNextPage){prevLink = `http://localhost:8080/views/products?page=` + nextPage}
            const formatObj={
                status: 'success',
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            }

            res.status(200).render('views-products',{
                products,
                hasNextPage,
                hasPrevPage,
                nextPage,
                prevPage,
                page,
                user:req.session.user
            })

    
        } catch (error) {
            console.log(error);
        } 
    }
}

module.exports = new ProductsController()


