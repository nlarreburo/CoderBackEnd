const {request} = require('express')
const {userService} = require('../dao/services/service.js')

class UsersController {
    getAllUsers = async (req=request,res)=>{
        const users = await userService.getAllUsers()
        res.status(200).json({
            msg:'Entro',
            users
        })
    }

    getIdUser = async (req=request,res)=>{
        const {uid} = req.params
        const user = await userService.getIdUser(uid)
        res.status(200).json({
            msg:'Entro',
            user
        })
    }

    updateUser = async (req=request,res)=>{
        const {uid} = req.params
        let { first_name, last_name, email, password, age}  = request.body
        if(!first_name || !last_name || !email || !password || !age){
            return res.status(400).send({ message: 'Che pasar todos los datos'})
        }
        let result = await userService.updateUser(uid,first_name)
        response.status(201).send({ 
            msg: 'success',
            result : result
        })

    }

    deleteUser = async(req,res) => {
        const {uid} = req.params
        await userService.deleteUser(uid)
        res.status(200).send({ 
            status: 'success',
            result: true
        })
    }

}

module.exports = new UsersController()