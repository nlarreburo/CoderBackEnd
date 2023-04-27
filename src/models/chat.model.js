const {Schema, model} = require('mongoose')

const chatCollection = 'Chat'

const ChatSchema = Schema({
    mensajes:{
        type:Array,
        required:true
    }
})

module.exports = model(chatCollection, ChatSchema)