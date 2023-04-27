const { createTransport } = require("nodemailer")

const  transport = createTransport({
    service: 'gmail',
    port: 578,
    secure:false,
    auth: {
        user: process.env.TEST_MAIL_ADMIN,
        pass: process.env.TEST_MAIL_PASS
    }
})

module.exports = {
    transport
}