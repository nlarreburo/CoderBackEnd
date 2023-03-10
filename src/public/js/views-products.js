const socket = io()


let buttomLimit = document.getElementById('buttomLimit')

// buttomLimit.addEventListener('click', () =>{
//     window.location.href = `http://localhost:8080/views/products?page=1&limit=` + limitValue.value
// })

function limitButtom(page){
    let limitValue = document.getElementById('limit-value')
    if(limitValue.value!=""){
        window.location.href = `http://localhost:8080/views/products?page=` + page + `&limit=` + limitValue.value
    }else{
        window.location.href = `http://localhost:8080/views/products?page=` + page
    }
}