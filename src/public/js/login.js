const handleSubmit = (evt) =>{
    evt.preventDefault()
    let email = document.querySelector('input[name="email"]').value
    let password = document.querySelector('input[name="password"]').value
    fetch('/api/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(resp => resp)
    .then(resp => {
        if(resp.status === 401) document.querySelector('#msglogin').textContent = resp.statusText
    })
}

let form = document.querySelector('#form').addEventListener('submit', handleSubmit)