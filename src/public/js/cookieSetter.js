const form = document.querySelector('#cookieForm')

form.addEventListener('submit',(e) => {
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key) => obj[key] = value)

    fetch('/auth/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json()
    .then(resp => console.log(resp)))
})

const getCookie = () =>{
    console.log(document.cookie)
}