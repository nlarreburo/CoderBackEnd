const { request } = require('express')


class ChatController {

    chatUser = async (req = request, res) => {
        res.status(200).render('chat')

    }
}

module.exports = new ChatController()