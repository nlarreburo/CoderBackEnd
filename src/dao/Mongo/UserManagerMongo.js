const UserModel = require("../../models/user.model.js")

class UserManagerMongo {
    constructor(){
        
    }

    //Devolver todos los usuarios
    getAllUsers = async() =>{
        try {
            const users = await UserModel.find({}).lean()
            return users
        } catch (error) {   
        }
    }

    //Devolver un usuario por id
    getIdUser= async(uid) =>{
        try {
            return await UserModel.findById({_id:uid}).lean()
        } catch (error) {
            
        }
    }

    //Crear usuario --- register
    createUser = async() => {
        try {
            
        } catch (error) {
            
        }
    }
    //Actualizar usuario

    //Borrar usuario

}

module.exports = UserManagerMongo