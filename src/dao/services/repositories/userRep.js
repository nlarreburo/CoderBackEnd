
class UserRepositories{
    constructor(dao){
        this.dao = dao
    }
    getAllUsers = async() =>{
        try {
            let result = this.dao.getAllUsers()
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Devolver un usuario por id
    getIdUser= async(uid) =>{
        try {
            let result = this.dao.getIdUser(uid)
            return result
        } catch (error) {
            new Error(error)
        }
    }

    //Crear usuario --- register
    createUser = async() => {
        try {        
            let result = this.dao.createUser()
            return result
        } catch (error) {
            new Error(error)
        }
    }

}

module.exports = UserRepositories