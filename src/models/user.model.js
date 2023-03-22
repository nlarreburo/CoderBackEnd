const {Schema, model} = require('mongoose')

const userCollection = 'Usuarios'

const UserSchema = Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    }
})

module.exports = model(userCollection, UserSchema)