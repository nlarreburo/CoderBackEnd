const { Router } = require('express')
const passport = require('passport')
const userModel = require('../models/user.model')
const router = Router()

router.get('/login', async (req,res)=>{
    res.status(200).render('login')
})

router.get('/github',passport.authenticate('github',{scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/api/auth/login'}), async(req,res)=>{
    req.session.user = req.user
    res.redirect('/views/products')
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/api/auth/faillogin'}), async (req,res)=>{
    if(!req.user) return res.status(400).json({status: 'error', error: 'Credentials incorrect'})
    
    req.session.user = {
        name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
    }


    res.status(200).send({
        status: 'success',
        payload: req.user,
        message: 'Login correcto',
    })

})

router.get('/faillogin', async (req, res)=>{
    res.status(400).json({error: 'failed login'})
})


router.get('/register', async (req,res)=>{
    res.status(200).render('register')
})

router.post('/register',  passport.authenticate('register', {failureRedirect:'/api/auth/failregister'}), async (req, res)=>{ // con basae de datos
   
    res.status(200).json({
        status: 'success',
        message: 'Usuario registrado correctamente'
    })
    
})

router.get('/failregister', async (req, res)=>{
    console.log('failregister')
    res.status(400).json({error: 'failed register'})
})

router.post('/restaurarpass', async (req, res) => {
    const { email, password } = req.body;
  
    // Encontrar el usuario por correo electrónico
    const user = await userModel.findOne({ email });
  
    if (!user) {
      // Si el usuario no existe, redireccionar a una página de error
      return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    
  
    //Hasear Actualizar la contraseña del usuario
    user.password = createHash(password)
    await user.save()
  
    // Redireccionar al usuario a la página de login
    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
})



router.get('/logout', (req,res)=>{
    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', msg: err})
    })
    res.status(200).redirect('/api/auth/login')
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