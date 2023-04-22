const passport = require("passport")
const authController = require("../controllers/auth.controller")
const Router  = require("./router")

class AuthRouter extends Router {
    init(){
        //Register render
        this.get('/register',["PUBLIC"],authController.renderRegister)
        //Login render
        this.get('/login',["PUBLIC"],authController.renderLogin)
        //Register 
        this.post('/register',["PUBLIC"],passport.authenticate('register', {failureRedirect:'/api/auth/failregister'}),authController.renderLogin)
        //Login
        this.post('/login', ["PUBLIC"],passport.authenticate('login'),authController.authLogin)
        //Logout
        this.get('/logout',["PUBLIC"],authController.authLogout)
    }
}

module.exports = {
    AuthRouter
}