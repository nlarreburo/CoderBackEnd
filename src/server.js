const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
//---Session---
const session = require('express-session')
const cors = require('cors')
//---PassPort---
const passport =  require('passport')
const { initPassport } = require('./config/passport.config.js') //local
const { initializePassportJWT } = require('./middleware/jwtPassport.js') // con token
//---Mongo connect---
const configObject = require('./config/conectionDB.js')
const handlebars = require('express-handlebars')
//--Router--
const { router } = require('./routes')
const {Server: HttpServer}= require( 'http')
const { createTransport } = require('nodemailer')
const twilio = require('twilio')

// const { initializePassport } = require('./middleware/initialPassport.js') //github
// const homeRouter = require('./routes/home.router.js')
// const productsRouter = require('./routes/products.router.js')
// const cartsRouter = require('./routes/carts.router.js')
// const usersRouter = require('./routes/users.router.js')
// const viewsRouter= require( './routes/views.router.js')
// const chatRouter = require('./routes/chat.router.js')
// const cookieRouter = require('./routes/cookie.router.js')
// const authRouter = require('./routes/auth.router.js')
// const forkRouter = require('./routes/fork.router.js')
// const { Server: ServerIo }= require( 'socket.io')
//const ChatModel = require('./models/chat.model.js')

const app = express()
const httpServer = new HttpServer(app)

configObject.dbConnection()

app.use('/virtual' ,express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//---cookies---
app.use(cookieParser()) //Palabra secreta


//---PassPort---
initPassport()  //clase 21 login
//initializePassport() // clase 22 github
initializePassportJWT()
app.use(passport.initialize())
//app.use(passport.session())
app.use(logger('dev'))
//---Session Mongo---
app.use(session(configObject.session))
//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')
app.use(router)

//------------------------------------------

// const twilio_account_sid = process.env.TWILIO_ACCOUNT_SID
// const twilio_auth_token = process.env.TWILIO_AUTH_TOKEN
// const twilio_phone_num =  process.env.TWILIO_PHONE_NUMBER

// const cliente = twilio(twilio_account_sid, twilio_auth_token)
// app.get('/api/sms',async(req,res)=>{
//     try {
//         await cliente.messages.create({
//             body : 'esto es un wha',
//             from:'whatsapp:+14155238886',
//             to:`whatsapp:${process.env.NUMBER_MIO}`
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// const transport = createTransport({
//     service: 'gmail',
//     port: 578,
//     auth: {
//         user:  process.env.TEST_MAIL_ADMIN,
//         pass: process.env.TEST_MAIL_PASS
//     }
// })

// app.get('/api/mail', async(req,res) =>{
//     let result = await transport.sendMail({

//     })
// })

module.exports = {
    httpServer
}

// const io = new Server(httpServer)


// const mensajes = []
// let connectedClients = []

// io.on('connection', (socket) => {
//     console.log('Nuevo cliente conectado')
//     connectedClients.push(socket)
//     console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

//     socket.on('newProd', async data =>{
//         const {title,description,price,thumbnail,code,stock} = data
//         await productManager.addProduct(title,description,price,thumbnail,code,stock)
//         let historial = await productManager.getProducts()
//         io.emit('arrayProd',historial)
//     })

//     socket.on('delProd', async id =>{
//         await productManager.deleteProduct(Number(id))
//         let historial = await productManager.getProducts()
//         io.emit('arrayProd',historial)
//     })
    

//     //-------Chat-------
//     socket.on('message', async data => {
//         console.log('message',data)
//         mensajes.push(data)
//         io.emit('messageLogs', mensajes)

//         //Agregamos los msj a la BD
//         if((await ChatModel.find()).length == 0){
//             await ChatModel.create({
//                 mensajes
//             })
//         } else {
//             await ChatModel.updateOne({},{$set:{mensajes:mensajes}})
//         }
//         console.log(mensajes);
//     })

//     socket.on('authenticated', data => {
        
//         socket.broadcast.emit('newUserConnected', data)
//     })


//     socket.on('disconnect',()=>{
//         connectedClients = connectedClients.filter((client) => client !== socket)
//         console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
//     })

// })