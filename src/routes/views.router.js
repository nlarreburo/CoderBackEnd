const { Router } = require('express')
const ProductModel = require('../models/products.model.js')
const ProductManagerMongo = require('../dao/ProductManagerMongo.js')

const router = Router()


// //GET http://localhost:8080/api/realtimeproducts/
// router.get('/realtimeproducts', async (req, res) =>{
//     const products = await productManager.getProducts()
//     const {limit} = req.query
//     if(limit) return res.send(products.slice(0, limit)) //Devuelve products hasta el indice [limit]
    
//     res.render('realtimeproducts', {
//         products
//     }) //Devuelve products completo

// })

router.get('/products', async (req,res) => {
    try {
        const {page = 1, limit, sort} = req.query
        console.log(req.session.user)
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
        
        const {docs,totalPages,hasPrevPage,hasNextPage,nextPage,prevPage} = await ProductModel.paginate(filter,option)
        const products = docs
        var prevLink = null
        var nextLink = null
        if(hasPrevPage){prevLink = `http://localhost:8080/views/products?page=` + prevPage}
        if(hasNextPage){prevLink = `http://localhost:8080/views/products?page=` + nextPage}
        formatObj={
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

        console.log(formatObj)
        
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
})

module.exports = router