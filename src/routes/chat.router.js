const chatController = require("../controllers/chat.controller")
const { passportCall } = require("../utils/pasportCall")
const Router  = require("./router")

class ChatRouter extends Router {
    init(){
        //chat
        this.get('/',["PUBLIC"],passportCall('jwt'),chatController.chatUser)

    }
}

module.exports = {
    ChatRouter
}