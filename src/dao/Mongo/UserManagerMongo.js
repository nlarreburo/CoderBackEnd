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

    //Actualizar usuario
    updateUser = async(uid,first_name) =>{
        try {
            return await UserModel.updateOne({_id: uid}, { first_name })
        } catch (error) {
            Error(error)
        }
    }

    //Borrar usuario
    deleteUser = async(uid) => {
        try {
            return await UserModel.deleteOne({_id: uid})
        } catch (error) {
            Error(error)
        }
    }

}

module.exports = UserManagerMongo