


let userpasswordAgain = document.querySelector('#floatingPasswordAgain')
//let belepBTN = document.getElementById('belepesBTN')
let regBTN = document.getElementById('regBTN')
//const passwdRegExp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$';
const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;





async function registration() {
    //await fetch('http://localhost:3000/users')
    //.then(res => {res.json().then(data => console.log(data))})

    let username = document.querySelector('#floatingName')
    let useremail = document.querySelector('#floatingInput')
    let userpassword = document.querySelector('#floatingPassword')


    if (!username.value || !useremail.value || !userpassword.value) {
        alert('Kitöltetlen adatok!')
        return
    }
    else if (!regexMail.test(useremail.value)) {
        alert('Helytelen e-mail cím!')
        return
    }

//    else if (!passwdRegExp.test(userpassword.value)) 
//    {
//        //alert('Helytelen jelszó!')
//       return
//   }
    
    else
    {
        try {
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username.value,
                    email: useremail.value,
                    password: userpassword.value
                })
            })

            const data = await res.json()
         

            if (res.status == 200) {
                username.value = ''
                useremail.value = ''
                userpassword.value = ''
                confirm("Sikeres regisztráció!")
            }

        } catch (err) {
            console.log('Hiba történt: \n', err);
            
        }


    }
   
}


async function logIn() {
    let useremail = document.querySelector('loginName')
    let userpassword = document.querySelector('loginPassword')

}


let users = []



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




