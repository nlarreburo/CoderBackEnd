const express = require('express')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const usersRouter = require('./routes/users.router.js')
const viewsRouter= require( './routes/views.router.js')
const { Server }= require( 'socket.io')
const ProductManager = require('./manager/ProductManager.js')

const {createServer}= require( 'http')
const productManager = new ProductManager(__dirname + '/routes/JSON/products.JSON')

const app = express()
const PORT = 8080 || process.env.PORT
const httpServer = createServer(app)


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/virtual' ,express.static(__dirname+'/public'))
app.use(cookieParser())
console.log(__dirname);
//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')
//Handlebars

// app.get('/',(req,res) => {
//     let context = {
//         name: 'Nicolas',
//     }
//     res.render('index',context)
// })

app.use('/api/user', usersRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/views',viewsRouter)

httpServer.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando en el puerto a ${httpServer.address().port}`)
})

const io = new Server(httpServer)

let connectedClients = []

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    socket.on('newProd', async data =>{
        const {title,description,price,thumbnail,code,stock} = data
        await productManager.addProduct(title,description,price,thumbnail,code,stock)
        let historial = await productManager.getProducts()
        io.emit('arrayProd',historial)
    })

    socket.on('delProd', async id =>{
        console.log(id)
        await productManager.deleteProduct(Number(id))
        let historial = await productManager.getProducts()
        io.emit('arrayProd',historial)
    })



    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })

})