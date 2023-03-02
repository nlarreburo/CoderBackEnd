const {Schema, model} = require('mongoose')

const userCollection = 'Chat'

const UserSchema = Schema({
    mensajes:{
        type:Array,
        required:true
    }
})

module.exports = model(userCollection, UserSchema)