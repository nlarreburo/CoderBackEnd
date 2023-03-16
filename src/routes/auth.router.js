const { Router } = require('express')
const userModel = require('../models/user.model')

const router = Router()

router.get('/login', async (req,res)=>{
    res.status(200).render('login')
})

router.post('/login', async (req,res)=>{
    const {email,password} = req.body
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        req.session.user = {
            name: "Admin",
            email: email,
            admin: true 
        }

    } else {
        const user = await userModel.findOne({email,password})
        if(!user) return res.status(401).send({status:'error',msg: 'Datos incorrectos'})
        
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            admin: false
        }
    }

    // if (email != 'admin' || password != 'admin'){
    //     return res.send({msg:'fail login'})
    // } else {
    //     req.session.user = email
    //     req.session.admin = true
    // }
    //res.status(200).render('views-products')
    // res.status(200).send({
    //     status:'success',
    //     msg: 'Login correct',
    //     payload: req.session.user
    // })
    res.status(200).redirect('/views/products')
})

router.get('/register', async (req,res)=>{
    res.status(200).render('register')
})

router.post('/register', async (req,res)=>{
    const {first_name, last_name, email, password} = req.body
    
    const exists = await userModel.findOne({email})

    if(exists) return res.status(401).send({status:'error',msg: 'El email ya existe'})

    const user = new userModel({
        first_name,
        last_name,
        email,
        password
    })

    await user.save()
    
    res.status(200).send({
        msg:'register',
        first_name,
        last_name,
        email,
        password
    })
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', msg: err})
    })
    res.status(200).redirect('/auth/login')
})

module.exports = router


// router.post('/login', (req,res)=>{
//     const data = req.body
//     console.log(data)
//     res.cookie('nombre','valor',{maxAge: 1000000}).send({
//         status: "success",
//         message: "Cookie creada"
//     })
// })

// router.post('/login', (req,res)=>{
//     const {username,password} = req.body
//     if (username != 'admin' || password != 'admin'){
//         return res.send({msg:'fail login'})
//     } else {
//         req.session.user = username
//         req.session.admin = true
//         res.send({msg:'login ok'})
//     }
// })