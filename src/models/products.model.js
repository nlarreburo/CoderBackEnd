const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
        status:{
            type:Boolean,
            required:true
        }
})

UserSchema.plugin(mongoosePaginate)

module.exports = model(userCollection, UserSchema)
