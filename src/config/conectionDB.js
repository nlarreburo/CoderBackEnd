const MongoStore = require('connect-mongo')
const {commander} = require('../utils/commander')
const dotenv = require('dotenv')
const MongoSingleton = require('./MongoSingleton')


const { mode } = commander.opts()

const enviroment = mode || "development"

dotenv.config({
    path: enviroment === 'development' ? './.env.development' : './.env.production'
})

//const url = 'mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority'
const url = process.env.MONGO_URL || 'mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority'
module.exports ={
    port: process.env.PORT || 8080, 
    mongoUrl: url, 
    adminName:process.env.ADMIN_NAME || 'admin',
    adminPassword:process.env.ADMIN_PASSWORD || 'admin',
    persistence: process.env.PERSISTENCE,
    dbConnection : () => MongoSingleton.getInstance(),

    session: {
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions:{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl:15000000000
        }),
        secret: 'secretCoder',
        resave: false,
        seveUninitialized: false
    }
}

//module.exports = {configObject}

//Creamos la conexion
