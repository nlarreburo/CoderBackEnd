const {Schema, model} = require('mongoose')

const userCollection = 'Usuarios'

const UserSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model(userCollection, UserSchema)