const {Schema, model} = require('mongoose')

const userCollection = 'Products'

const UserSchema = Schema({
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        price:{
            type:Number,
            required: true
        },
        thumbnail:{
            type:String,
            required: true
        },
        code:{
            type:String,
            required: true,
            unique: true
        },
        stock:{
            type:Number,
            required: true
        },
        id:{
            type:Number,
            required:true,
            unique:true
        },
        status:{
            type:Boolean,
            required:true
        }
})

module.exports = model(userCollection, UserSchema)
