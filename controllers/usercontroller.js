


let userpasswordAgain = document.querySelector('#floatingPasswordAgain')
//let belepBTN = document.getElementById('belepesBTN')
let regBTN = document.getElementById('regBTN')
//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const serverURL = 'http://localhost:3000'
let loggedUser = false





async function registration() {
    //await fetch('http://localhost:3000/users')
    //.then(res => {res.json().then(data => console.log(data))})

    let username = document.querySelector('#floatingName')
    let useremail = document.querySelector('#floatingInput')
    let userpassword = document.querySelector('#floatingPassword')


    if (!username.value || !useremail.value || !userpassword.value) {
        ShowMessages('danger', 'Hiba', 'Kitöltetlen adatok')
        return
    }
    else if (!regexMail.test(useremail.value)) {
        ShowMessages('danger', 'Hiba', 'Hibás e-mail')
        return
    }

    //else if (!passwdRegExp.test(userpassword.value)) 
    //{
        //ShowMessages('danger', 'Hiba', 'Nem megfelelő jelszó!')
      //return
    //}
    
    else
    {
        try {
            const res = await fetch(`${serverURL}/users`, {
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
                ShowMessages('success', '', 'Sikeres regisztráció!')

            }
            else{
                ShowMessages('danger', 'Hiba', 'Szerverhiba!')
            }

        } catch (err) {
            console.log('Hiba történt: \n', err);
            
        }


    }
   
}


async function login() {
    let useremail = document.querySelector('#loginName')
    let userpassword = document.querySelector('#loginPassword')


    if (!useremail.value || !userpassword.value) {
        ShowMessages('danger', 'Hiba', 'Kitöltetlen adatok')
        return
    }
    else if (!regexMail.test(useremail.value)) {
        ShowMessages('danger', 'Hiba', 'Hibás e-mail')
        return
    }

    try {
        const res = await fetch(`${serverURL}/users/login`, {
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email: useremail.value,
                password: userpassword.value
            })
        })

        user = await res.json()

        if (user != null) {
            loggedUser = user
        }

        if (loggedUser.email == useremail.value && loggedUser.password == userpassword.value && res.status == 200) {
            ShowMessages('success', '', 'Sikeres bejelentkezés!')
            getloggedUser()
            return
        }
        
        ShowMessages('warning', 'Hiba', 'Sikertelen bejelentkezés!')

        

    } catch (err) {
        ShowMessages('danger', 'Sikertelen bejelentkezés', `${err}`)

    }
}





function logout() {
    sessionStorage.removeItem('loggedUser')
    getloggedUser()
    Render('logout')
}


function logIn(params) {
    
}

function userDelete(params) {
    
}

function dataChange(params) {
    
}

if (getloggedUser()) {
    Render('main')
}
else{
    Render('login')
}


