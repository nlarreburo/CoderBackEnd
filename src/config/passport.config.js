const passport = require('passport')
const local = require('passport-local')
const userModel = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptPass')
const CartManagerMongo = require('../dao/Mongo/CartManagerMongo.js')
const UserDTO = require('../DTO/user.dto')
const CustomError = require('../Errors/CustomError')
const {generateUserErrorInfo} = require('../Errors/info')
const EErrors = require('../Errors/enum')

const LocalStrategy = local.Strategy
const cartManagerMongo = new CartManagerMongo()

const initPassport = () =>{
    passport.use('register',new LocalStrategy(

        {
            passReqToCallback: true, //acceso a la request
            usernameField: 'email',
            
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email,age} = req.body
            try{
                if(!first_name ||  !last_name ||  !email || !age){
                    CustomError.createError({
                        name: 'User Creations error',
                        cause: generateUserErrorInfo({
                            first_name,
                            last_name,
                            email,
                            age
                        }),
                        message: 'Error trying to create User',
                        code: EErrors.INVALID_TYPES_ERROR
                    })
                }

                let user = await userModel.findOne({email: username})
                if (user){
                    console.log('usuario existente')
                    return done(null,false)
                }
                //Obtiene un id de cart luego de confirmar que no existe el usuario
                var cart = await cartManagerMongo.addCart()
                // Crear usuario
                newUser = new UserDTO(first_name, last_name, email,age)
                newUser.password = createHash(password)
                newUser.cart=cart._id

                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error){
                console.log(error.cause)
                done(error)
            }
        }
    ))

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })
    passport.deserializeUser(async (id,done) => {
        try {
            let user = await userModel.findById(id)
            done(null,user)
        } catch (error) {
            done(error)
        }
    })

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) =>{
        try {
            const user = await userModel.findOne({email:username})
            if (!user){
                console.log('user no encontrado');
                return done(null,false)
            }
            if(!isValidPassword(user,password)) return done(null,false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = {
    initPassport
}