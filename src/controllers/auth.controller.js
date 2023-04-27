const {request} = require('express')
const { generateToken } = require('../utils/jsonwt.js')
const UserDTO = require('../DTO/user.dto.js')

class AuthController {
    
    renderRegister = async (req=request,res)=>{
        try {
            res.status(200).render('register')
        } catch (error) {
            Error(error)
        }
    }

    authLogin = async (req=request,res)=>{
        try {
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
        } catch (error) {
            Error(error)
        }
    }

    renderLogin = async (req=request,res)=>{
        try {
            res.status(200).render('login')
        } catch (error) {
            Error(error)
        }
    }

    authLogout = async (req,res)=>{
        try {
            res.clearCookie("coderCookieToken")
            res.status(200).redirect('/auth/login')
        } catch (error) {
            Error(error)
        }
    }

    authCurrent = async(req=request,res)=>{
        try {
            const {name,last_name,email,rol} =  req.user.user
            const token =  req.cookies.coderCookieToken
            res.status(200).render("current",{
                token,
                name,
                last_name,
                email,
                rol
            })
        } catch (error) {
            Error(error)
        }
    }
}

module.exports = new AuthController()
