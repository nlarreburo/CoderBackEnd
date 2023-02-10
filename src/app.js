//const express = require('express')
import express from 'express'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'


const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')
//Handlebars

app.get('/',(req,res) => {
    let context = {
        name: 'Nicolas',
    }
    res.render('index',context)
})


app.use('/api/user', usersRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/views',viewsRouter)

const httpServer = app.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando en el puerto a ${httpServer.address().port}`)
})

const io = new Server(httpServer)


io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('newProd', data =>{
        console.log(data)
    })
})