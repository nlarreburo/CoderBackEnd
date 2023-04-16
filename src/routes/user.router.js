const Router  = require("./rutes")
const jwt = require('jsonwebtoken')

class UserRouter extends Router {
    init(){
        
        this.get('/', (req,res)=>{
            console.log("entra aca?");
            res.sendSuccess('Bienvenidos a la clase padre UserRouter')
        })

        this.post('/login', ["PUBLIC"], (req, res)=>{
            let user = {
                email: req.body.email,
                role: 'user'
            }
            console.log(user)
            let token = jwt.sign(user, 'CoderSecretClassRouter')
            res.sendSuccess({token})
        })

        this.get('/current', ["USER","USER_PREMIUN"],(req,res)=>{
            res.sendSuccess(req.user)
        })
    }
}

module.exports = UserRouter
