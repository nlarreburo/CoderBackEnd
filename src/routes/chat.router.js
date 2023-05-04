const Router  = require("./router")
const chatController = require("../controllers/chat.controller")
const { passportCall } = require("../utils/pasportCall")

class ChatRouter extends Router {
    init(){
        //chat
        this.get('/',["PUBLIC"],passportCall('jwt'),chatController.chatUser)

    }
}

module.exports = {
    ChatRouter
}