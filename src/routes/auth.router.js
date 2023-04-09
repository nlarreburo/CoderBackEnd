const { Router } = require('express')
const passport = require('passport')
const userModel = require('../models/user.model')
const { generateToken } = require('../utils/jsonwt')
const { initializePassportJWT,userJWT } = require('../middleware/jwtPassport')
const { passportCall } = require('../utils/pasportCall')

const router = Router()

router.get('/login', async (req,res)=>{
    res.status(200).render('login')
})

router.get('/github',passport.authenticate('github',{scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/api/auth/login'}), async(req,res)=>{
    req.session.user = req.user
    res.redirect('/views/products')
})

//router.post('/login', passport.authenticate('login', {failureRedirect:'/api/auth/faillogin'}), async (req,res)=>{ //post login utilizando passport.config.js
router.post('/login', passport.authenticate('login',), async (req,res)=>{
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
})

router.get('/current',passportCall('jwt'),async(req,res) => {
    const token = req.cookies.coderCookieToken
    const {name, last_name, email,rol} = req.user.user
    console.log("token: ",token,"usuario:", name, last_name, email,rol);

    res.status(200).render('current',{
        token,
        name,
        last_name,
        email,
        rol
    })


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

