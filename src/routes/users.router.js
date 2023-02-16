const { Router } = require('express')

const router = Router()

const arrayUser = [
    { id:'1', nombre:'nombre 1', apellido: 'apellido 1', email: 'email1@email.com'},
    { id:'2', nombre:'nombre 2', apellido: 'apellido 2', email: 'email2@email.com'},
    { id:'3', nombre:'nombre 3', apellido: 'apellido 3', email: 'email3@email.com'},
    { id:'4', nombre:'nombre 4', apellido: 'apellido 4', email: 'email4@email.com'},
    { id:'5', nombre:'nombre 5', apellido: 'apellido 5', email: 'email5@email.com'},
    { id:'6', nombre:'nombre 6', apellido: 'apellido 6', email: 'email6@email.com'},
    { id:'7', nombre:'nombre 7', apellido: 'apellido 7', email: 'email7@email.com'},
    { id:'8', nombre:'nombre 8', apellido: 'apellido 8', email: 'email8@email.com'},
    { id:'9', nombre:'nombre 9', apellido: 'apellido 9', email: 'email9@email.com'},
    { id:'0', nombre:'nombre 0', apellido: 'apellido 0', email: 'email0@email.com'},
]

// GET http://localhost:8080/api/user/
router.get('/', (req,res) => {
    res.status(200).send(arrayUser)
})

// POST http://localhost:8080/api/user/
router.post('/', async (req,res) =>{
    console.log(req)
    let user = req.body
    if (!user.nombre || !user.apellido){
        console.log(user);
        return res.status(400).send({
            message: 'Falta algo aca capo, ponete las pilas'
        })
    }
})


module.exports = router