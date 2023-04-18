const { connect } = require('mongoose')


class MongoSingleton {
    static #instance

    constructor(){
        connect('mongodb+srv://nicolaslarreburo:12qwaszxB1@cluster0.ahxowjc.mongodb.net/ecommerce?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    static getInstance(){
        console.log("entro");
        if (this.#instance) {
            console.log('Ya está conectada')
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('conected')
        return this.#instance
    }
}





module.exports = MongoSingleton


// const mongoInstance = MongoSingleton.getInstance()
// const otherMongoInstance = MongoSingleton.getInstance()
// MongoSingleton.getInstance()