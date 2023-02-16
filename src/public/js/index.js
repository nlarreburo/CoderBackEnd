const socket = io()

let title = document.getElementById('title')
let description = document.getElementById('description')
let price = document.getElementById('price')
let thumbnail = document.getElementById('thumbnail')
let code = document.getElementById('code')
let stock = document.getElementById('stock')
let buttomProd = document.getElementById('buttomProd')
let prodID = document.getElementById('prodID')
let buttomID = document.getElementById('buttomID')

buttomProd.addEventListener('click', () =>{
    socket.emit('newProd',{
        title: title.value, 
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
    })
})

buttomID.addEventListener('click', () =>{
    socket.emit('delProd',prodID.value)
})


socket.on('arrayProd',data =>{
    let log = document.getElementById('divProd')
    let elemento = ''
    data.forEach(historial => {
        elemento = elemento + `
                    <div>
                        <p>Title: ${historial.title}</p>
                        <p>Description: ${historial.description}</p>
                        <p>Price: ${historial.price}</p>
                        <p>Image: ${historial.thumbnail}</p>
                        <p>Code: ${historial.code}</p>
                        <p>Stock: ${historial.stock}</p>
                        <p>ID: ${historial.id}</p>
                        <p>Status: ${historial.status}</p>
                        <br>
                    </div>              
        `
    })
    log.innerHTML = elemento
})
