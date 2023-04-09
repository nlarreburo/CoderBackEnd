const express = require('express')
const cookieParser = require('cookie-parser')
//---Session---
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')

//---PassPort---
const passport =  require('passport')
const { initPassport } = require('./config/passport.config.js') //local
const { initializePassport } = require('./middleware/initialPassport.js') //github
const { initializePassportJWT } = require('./middleware/jwtPassport.js') // con token
//---Mongo connect---
const { configObject } = require('./config/conectionDB.js')

const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.router.js')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const usersRouter = require('./routes/users.router.js')
const viewsRouter= require( './routes/views.router.js')
const chatRouter = require('./routes/chat.router.js')
const cookieRouter = require('./routes/cookie.router.js')
const authRouter = require('./routes/auth.router.js')
const { Server }= require( 'socket.io')
const ProductManager = require('./dao/ProductManager.js')
const {createServer}= require( 'http')
const ChatModel = require('./models/chat.model.js')



//require('dotenv').config()

const app = express()

const PORT = 8080 || process.env.PORT
const httpServer = createServer(app)

const productManager = new ProductManager(__dirname + '/routes/JSON/products.JSON')

configObject.dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/virtual' ,express.static(__dirname+'/public'))

//cookies
app.use(cookieParser()) //Palabra secreta

//---Session Mongo---
app.use(session(configObject.session))


//---PassPort---
initPassport()  //clase 21 login
initializePassport() // clase 22 github
initializePassportJWT()
app.use(passport.initialize())
app.use(passport.session())

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')
//Handlebars


//RouterhomeRouter
app.use('/', homeRouter)
app.use('/api/user', usersRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/views',viewsRouter)
app.use('/api/chat',chatRouter)
app.use('/cookie', cookieRouter)
app.use('/api/auth', authRouter)
//Router

httpServer.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando en el puerto a ${httpServer.address().port}`)
})

const io = new Server(httpServer)


const mensajes = []
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
        await productManager.deleteProduct(Number(id))
        let historial = await productManager.getProducts()
        io.emit('arrayProd',historial)
    })
    

    //-------Chat-------
    socket.on('message', async data => {
        console.log('message',data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)

        //Agregamos los msj a la BD
        if((await ChatModel.find()).length == 0){
            await ChatModel.create({
                mensajes
            })
        } else {
            await ChatModel.updateOne({},{$set:{mensajes:mensajes}})
        }
        console.log(mensajes);
    })

    socket.on('authenticated', data => {
        
        socket.broadcast.emit('newUserConnected', data)
    })


    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })

})