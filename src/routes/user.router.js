const passport = require("passport")
const usersController = require("../controllers/users.controller")
const Router  = require("./router")

class UserRouter extends Router {
    init(){
        //Devolver todos los usuarios
        this.get('/',["PUBLIC"],usersController.getAllUsers)
        //Devolver un usuario por id
        //this.get('/:uid',["PUBLIC"],usersController.getIdUser)
        //Register render
        this.get('/register',["PUBLIC"],usersController.renderRegister)
        //Login render
        this.get('/login',["PUBLIC"],usersController.renderLogin)
        //Register 
        this.post('/register',["PUBLIC"],passport.authenticate('register', {failureRedirect:'/api/auth/failregister'}),usersController.renderLogin)
        //Login
        this.post('/login', ["PUBLIC"],passport.authenticate('login'),usersController.userLogin)
    }
}

module.exports = {
    UserRouter
}