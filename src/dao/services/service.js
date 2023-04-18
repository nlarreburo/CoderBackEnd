const {UserDao,ProductDao,CartDao} = require('../factory.js')
const UserRepositories = require('./repositories/userRep.js')
const ProductRepositories = require('./repositories/productRep.js')
const CartRepositories = require('./repositories/cartRep.js')

const userService = new UserRepositories(new UserDao())
const productService = new ProductRepositories(new ProductDao())
const cartService = new CartRepositories(new CartDao())

module.exports = {
    userService,
    productService,
    cartService
}