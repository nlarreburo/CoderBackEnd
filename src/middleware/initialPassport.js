const passport = require('passport')
const userModel = require('../models/user.model')
const GithubStrategy = require('passport-github2')

function initializePassport(){
    passport.use('github', new GithubStrategy({  //Configuracion para el login
        clientID:'Iv1.b0784ca969587f91',
        clientSecret:'db4654550995e2353b9c46f599e30a51e1089ee0',
        CallbackURL:'http://localhost:8080/api/auth/githubcallback'
    }, async (accessToken,refreshToken,profile,done)=>{
        console.log('accT',accessToken)
        console.log('refT',refreshToken)
        console.log('Profile',profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if (!user) { // si no existe el usuario lo agregamos a nuestra base de datos
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username, // nos toca llenar los campos que no vienen desde el perfil de github
                    // edad: 0, // nos toca llenar los campos que no vienen desde el perfil de github
                    email: 'nlarreburo@gmail.com', // profile._json.email
                    password: '', //Al ser autenticación de terceros, no podemos asignar un password
                }
                
                let result= await userModel.create(newUser)
                return done(null, result)}
                
                return done(null, user)
            } catch (error) {
               return done(error)
            }

    }))
    passport.serializeUser((user,done)=>{ //Extrae la informacion
        done(null,user.id)
        
    }) 
    passport.deserializeUser(async (id,done)  => {
        let user = await userModel.findById(id)
        done(null,user)
    })
}

module.exports = {
    initializePassport
}