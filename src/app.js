const { httpServer } = require('./server.js')
const configObject = require('./config/conectionDB.js')

const PORT = configObject.port

httpServer.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})