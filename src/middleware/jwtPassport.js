const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')

const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['coderCookieToken']
    }
    return token
}

const objectConfig = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'coderSecret'
}

const initializePassportJWT = () =>{
    passport.use('jwt', new JWTStrategy(objectConfig, async (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}


module.exports = {
    initializePassportJWT
}