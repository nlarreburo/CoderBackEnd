const passport = require("passport")
const mailController = require("../controllers/mail.controller")
const Router  = require("./router")

class MailRouter extends Router {
    init(){
        //mandar mail
        this.get('/',["PUBLIC"],mailController.sendMail)
    }
}

module.exports = {
    MailRouter
}