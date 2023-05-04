const { httpServer } = require('./server.js')
const configObject = require('./config/conectionDB.js')
const { Server } = require('socket.io')
const ChatModel = require('./models/chat.model.js')

const PORT = configObject.port




httpServer.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})


const io = new Server(httpServer)
const mensajes = []
let connectedClients = []

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    //     //-------Chat-------
    socket.on('message', async data => {
        console.log('message', data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)

        //Agregamos los msj a la BD
        if ((await ChatModel.find()).length == 0) {
            await ChatModel.create({
                mensajes
            })
        } else {
            await ChatModel.updateOne({}, { $set: { mensajes: mensajes } })
        }
        console.log(mensajes);
    })

    socket.on('authenticated', data => {

        socket.broadcast.emit('newUserConnected', data)
    })


    socket.on('disconnect', () => {
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })

})