const usersController = require("../controllers/users.controller")
const Router  = require("./router")

class UserRouter extends Router {
    init(){
        //Devolver todos los usuarios
        this.get('/',["PUBLIC"],usersController.getAllUsers)
        //Devolver un usuario por id
        this.get('/:uid',["PUBLIC"],usersController.getIdUser)
        //Actualizar usuario
        this.put('/:uid',["PUBLIC"],usersController.updateUser)
        //Borrar usuario
        this.delete('/:uid',["PUBLIC"],usersController.updateUser)
    }
}

module.exports = {
    UserRouter
}