const {Schema, model} = require('mongoose')

const userCollection = 'Carts'

const UserSchema = Schema({

    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
            }
        }]
    }

})

module.exports = model(userCollection, UserSchema)