const MongoStore = require('connect-mongo')
const {connect} = require('mongoose')

const url = 'mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority'
let configObject = {
    dbConnection : async () => {
        try {
            await connect(url)
            console.log('DB connect')
        } catch (error) {
            console.log(error)
            process.exit()
        }
    },
    session: {
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority',
            mongoOptions:{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl:15
        }),
        secret: 'secretCoder',
        resave: false,
        seveUninitialized: false
    }
}

module.exports = {configObject}

//Creamos la conexion
