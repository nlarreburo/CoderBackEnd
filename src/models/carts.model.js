const {Schema, model} = require('mongoose')

const userCollection = 'Carts'

const UserSchema = Schema({
    id:{
        type:Number,
        required: true
    },
    product:{
        type:Array,
        required:true
    }
})

module.exports = model(userCollection, UserSchema)