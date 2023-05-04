const EErrors = require("../../Errors/enum");
const errorHandler = (error, req, res, next) => {
    switch (Number(error.code)) {
        case EErrors.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error:error.name})
            break;
        default:
            return res.send({status:'error', error:'Error defauld'})
            break;
    }
    next()
}

module.exports = errorHandler