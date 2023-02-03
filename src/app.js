//const express = require('express')
import express from 'express'
import cookieParser from 'cookie-parser'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
const app = express()
const PORT = 8080
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/api/user', usersRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)


//------------------------------------------------
// const productManager = new ProductManager('./src/products.JSON')
// const products = await productManager.getProducts()

// app.get('/products', (req, res) =>{
//     const {limit} = req.query
//     if(limit) return res.send(products.slice(0, limit)) //Devuelve products hasta el indice [limit]

//     res.send(products) //Devuelve products completo

// })

// app.get('/products/:pid', async (req,res)=>{
//     const {pid} = req.params
//     //const prod = products.find(p => p.id === Number(pid))

//     const prod = await productManager.getProductsById(Number(pid))

//     console.log(prod)
//     res.send(prod)
// })



app.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})

