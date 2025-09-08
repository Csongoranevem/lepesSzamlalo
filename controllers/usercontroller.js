let username = document.querySelector('#floatingName').value
let useremail = document.querySelector('#floatingInput').value
let userpassword = document.querySelector('#floatingPassword').value
let userpasswordAgain = document.querySelector('#floatingPasswordAgain').value
let regBTN = document.getElementById('belepesBTN')


let users = []


regBTN.addEventListener('click', () =>{
    saveUser()
})

function saveUser() {
    if (userpasswordAgain != userpassword) {
        alert('Helytelen adatok')
        return
    }

    let user = {
        name: username,
        email: useremail,
        password: userpassword
    }

    users.push(user)

    localStorage.setItem('userList', users)
}


function logOut(params) {
    
}

function logIn(params) {
    
}

function userDelete(params) {
    
}

function dataChange(params) {
    
}
