const {request} = require('express')
const { transport } = require('../config/configEmail.js')

class MailController {
    
    // sendMail = async(first_name,last_name,email,password)=>{
    //     try {
    //         console.log((process.env.TEST_MAIL_ADMIN));
    //         console.log("aemail:",email);
    //         await transport.sendMail({
    //             from:'Servicio de BackEnd de Coder',
    //             to: process.env.TEST_MAIL_ADMIN,
    //             subject: 'Mail de prueba, registro realizado',
    //             html: `<div>
    //                     <h1>Bienvenido ${first_name} - ${last_name}</h1>
    //                     <p> Tu contraseña es: ${password}</p>
    //                    </div>`
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    sendMail = async(req=request, res)=>{
        try {
            await transport.sendMail({
    
            })
            console.log("no entro");
        } catch (error) {
            console.log(error)
        }
        res.send({
            status: 'success',
            payload: 'Mensaje enviado'
        })    
    }
}

module.exports = new MailController()

