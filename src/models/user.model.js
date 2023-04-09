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
        unique: true,
        index: true
    },
    password:{
        type:String,
    },
    rol:{
        type: String,
        require: true,
        enum: ['admin','user'],
        default: 'user'
    },
    age:{
        type: Number,
        require: true
    },
    cart:{
        type:String,
        require:true
    }
})

module.exports = model(userCollection, UserSchema)