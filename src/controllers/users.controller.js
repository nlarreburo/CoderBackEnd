const {request} = require('express')
const {userService} = require('../dao/services/service.js')
const { generateToken } = require('../utils/jsonwt.js')

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

    renderRegister = async (req=request,res)=>{
        res.status(200).render('register')
    }

    userLogin = async (req=request,res)=>{
        if(!req.user) return res.status(400).json({status: 'error', error: 'Credentials incorrect'})
  
        req.session.user = {
            name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            rol: req.user.rol
        }
        const token = generateToken(req.session.user) //Genero token      
        res.cookie('coderCookieToken', token, {
            maxAge: 60*60*1000,
            httpOnly: true
        }).send({msg: 'logged in'})
    }

    renderLogin = async (req=request,res)=>{
        res.status(200).render('login')
    }
}

module.exports = new UsersController()