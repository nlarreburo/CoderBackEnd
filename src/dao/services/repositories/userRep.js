
class UserRepositories{
    constructor(dao){
        this.dao = dao
    }
    getAllUsers = async() =>{
        let result = this.dao.getAllUsers()
        return result
    }

    //Devolver un usuario por id
    getIdUser= async(uid) =>{
        let result = this.dao.getIdUser(uid)
        return result
    }

    //Crear usuario --- register
    createUser = async() => {
        let result = this.dao.createUser()
        return result
    }

}

module.exports = UserRepositories