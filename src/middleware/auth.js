function auth (req,res,next){
    // if(req.session?.user === 'admin' && req.session?.admin){
    console.log(req.session.user);
    if(req.session.user){
        return next()
    }
    return res.status(401).send({msg:'No autorizado'})
}

module.exports = {auth}