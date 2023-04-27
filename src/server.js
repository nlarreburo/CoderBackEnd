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

module.exports = {
    httpServer
}


