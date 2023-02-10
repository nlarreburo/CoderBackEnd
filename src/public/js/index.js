const socket = io()

let title = document.getElementById('title')
let description = document.getElementById('description')
let price = document.getElementById('price')
let thumbnail = document.getElementById('thumbnail')
let code = document.getElementById('code')
let stock = document.getElementById('stock')
let buttomProd = document.getElementById('buttomProd')



const handleSocket = evt =>{
    if(evt.key === "Enter"){
        socket.emit('newProd',{
            title, 
            description ,
            price,
            thumbnail,
            code,
            stock,
        })
    }
}


