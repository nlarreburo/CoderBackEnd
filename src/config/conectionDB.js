const {connect} = require('mongoose')

const url = 'mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority'

const dbConnection = async () => {
    return await connect(url, err =>{
        if (err){
            console.log('No se pudo conectar mongodb: ', err)
            process.exit()
        }
        console.log('DB connect')

    })
}

module.exports = {dbConnection}

//Creamos la conexion
