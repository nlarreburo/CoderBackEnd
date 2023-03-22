const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//salt es un string que se agrega al password para hacerla mas segura
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password) //true o false


module.exports = {
    createHash,
    isValidPassword
}