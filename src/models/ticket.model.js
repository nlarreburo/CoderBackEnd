const {Schema, model} = require('mongoose')

const collection = 'Tickets'

const TicketSchema = Schema({
    code: {
        type: String, 
        unique: true,
        require:true,
        default: Date.now().toString()
    },
    purchase_datetime: { 
        type: Date, 
        default: Date.now,
        require:true
    },
    amount: { 
        type:Number,
        require:true
    },
    purchaser: { 
        type:String,
        require:true
    },
});

module.exports = model(collection, TicketSchema);