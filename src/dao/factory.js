const {persistence, dbConnection} = require('../config/conectionDB.js')

let ProductDao
let UserDao
let CartDao

switch (persistence) {
    case 'MONGO':
        dbConnection()
        const ProductDaoMongo = require('./Mongo/ProductManagerMongo.js')
        ProductDao = ProductDaoMongo

        const UserManagerMongo = require('./Mongo/UserManagerMongo.js')
        UserDao = UserManagerMongo

        const CartManagerMongo = require('./Mongo/CartManagerMongo.js')
        CartDao = CartManagerMongo
        break;
    case 'MEMORY':

        break;
    case 'ARCHIVO':
        
        break;
    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao
}