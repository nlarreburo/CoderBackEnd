const passport = require("passport")
const authController = require("../controllers/auth.controller")
const Router  = require("./router")
const { passportCall } = require("../utils/pasportCall")

class AuthRouter extends Router {
    init(){
        //Register render
        this.get('/register',["PUBLIC"],authController.renderRegister)
        //Login render
        this.get('/login',["PUBLIC"],authController.renderLogin)
        //Register 
        this.post('/register',["PUBLIC"],passport.authenticate('register'),authController.renderLogin)
        //Login
        this.post('/login', ["PUBLIC"],passport.authenticate('login'),authController.authLogin)
        //Logout
        this.get('/logout',["PUBLIC"],authController.authLogout)
        //current
        this.get('/current',["PUBLIC"],passportCall('jwt'),authController.authCurrent)
        
    }
}

module.exports = {
    AuthRouter
}