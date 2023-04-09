const authorization = rol => {
    return async ( req, res, next) => {
        // 
        console.log('rol: ',rol)
        console.log('req: ',req.user.user.rol)
        if(!req.user) return  res.status(401).json({status: 'error', error: 'Unautorized'})
        if(req.user.user.rol !== rol) return res.status(403).json({status: 'error', error: 'No permissions'})
        next()
    }

}

module.exports = {
    authorization
}