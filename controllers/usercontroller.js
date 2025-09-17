


let userpasswordAgain = document.querySelector('#floatingPasswordAgain')
//let belepBTN = document.getElementById('belepesBTN')
let regBTN = document.getElementById('regBTN')
const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const serverURL = 'http://localhost:3000'
let loggedUser;


if (!sessionStorage.getItem('loggedUser')) {
    loggedUser = null
    sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
} else {
    loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
}






async function registration() {

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
    else if (!passwdRegExp.test(userpassword.value)) {
        ShowMessages('danger', 'Hiba', 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell legalább egy nagybetűt, egy kisbetűt és egy számot.')
        return
    }
    
    else
    {
        try {
            const res = await fetch(`${serverURL}/users/registration`, {
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
// Bejelentkezés

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

        if (loggedUser.email == useremail.value && res.status == 200) {
            ShowMessages('success', '', 'Sikeres bejelentkezés!')
            sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            getloggedUser()
            Render('main')
            return

}

        
        ShowMessages('warning', 'Hiba', 'Sikertelen bejelentkezés!')



    } catch (err) {
        ShowMessages('danger', 'Sikertelen bejelentkezés', `${err}`)

    }

}



// Kijelentkezés

function logout() {
    sessionStorage.removeItem('loggedUser')
    getloggedUser()
    Render('logout')
}



function userDelete(params) {
    
}

function dataChange(params) {
    
}

if (!getloggedUser()) {
    Render('login')
}

// Profil adatok betöltése a profil nézetben

function ProfileDataFill() {
    try {
        loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))

        if (!loggedUser) {
            return ShowMessages('danger', 'Hiba', 'Nincs bejelentkezve felhasználó')
        }
    
        document.getElementById('profileNameField').value = loggedUser.name
        document.getElementById('profileEmailField').value = loggedUser.email
        document.getElementById('profilePasswordField').value = loggedUser.password
    
    } catch (err) {
        ShowMessages('danger', 'Hiba', `Sikertelen adatlekérés \n ${err}`)
    }
}

function ChangeData(element) {

    document.getElementById('saveProfileBTN').classList.remove('d-none')
    dataToChange = document.getElementById(`profile${element}Field`)
    if (dataToChange.id == 'profilePasswordField') {
        document.getElementById('profileOldPasswordField').setAttribute('required', true)

    }
    dataToChange.removeAttribute('readonly')
    dataToChange.classList.remove('bg-light')
    dataToChange.classList.add('bg-black')
    dataToChange.classList.add('fg-white')
}

async function UpdateProfile() {
    try {

        let profileUserEmail = document.querySelector('#profileEmailField')
        let profileUserName = document.querySelector('#profileNameField')
        let profileUserPassword = document.querySelector('#profilePasswordField')
        let profileOldPassword = document.querySelector('#profileOldPasswordField')



        if (profileUserEmail.value.trim() == '' || profileUserName.value.trim() == '' || profileUserPassword.value.trim() == '' || profileOldPassword.value == "") {
            ShowMessages('danger', 'Hiba', 'Kitöltetlen adatok vagy hibás jelszó')
            return
        }
        else if (!regexMail.test(profileUserEmail.value)) {
            ShowMessages('danger', 'Hiba', 'Hibás e-mail')
            return
        }
        else if (!passwdRegExp.test(profileUserPassword.value)) {
            ShowMessages('danger', 'Hiba', 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell legalább egy nagybetűt, egy kisbetűt és egy számot.')
            return
        }

        else if (profileOldPassword.value == '' || profileOldPassword.value == null || profileOldPassword.value != loggedUser.password) {
            ShowMessages('danger', 'Hiba', 'Hibás jelszó')
            return
        }

        /*else if (profileUserEmail.value != loggedUser.email){
            const res = await fetch(`${serverURL}/users/registration`, {
                method: "POST",
                headers: 
                {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    email: useremail.value,
                })
            })  
            
            if (res.status != 200) {
                ShowMessages('warning', 'Hiba', 'Hiba')
            }
        }*/


       const res = await fetch(`${serverURL}/users/${loggedUser.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('profileNameField').value,
            email: document.getElementById('profileEmailField').value,
            password: document.getElementById('profilePasswordField').value
    })
})


        if (res.status == 200) {
            ShowMessages('success', '', 'Sikeres adatfrissítés!')
            loggedUser.name = document.getElementById('profileNameField').value
            loggedUser.email = document.getElementById('profileEmailField').value
            loggedUser.password = document.getElementById('profilePasswordField').value
            sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            document.getElementById('profileNameField').setAttribute('readonly', true)
            document.getElementById('profileEmailField').setAttribute('readonly', true)
            document.getElementById('profilePasswordField').setAttribute('readonly', true)

            document.getElementById('profileOldPasswordField').value = ''



            document.getElementById('profileNameField').classList.remove('bg-black')
            document.getElementById('profileEmailField').classList.remove('bg-black')
            document.getElementById('profilePasswordField').classList.remove('bg-black')

            document.getElementById('profileNameField').classList.add('bg-dark')
            document.getElementById('profileEmailField').classList.add('bg-dark')
            document.getElementById('profilePasswordField').classList.add('bg-dark')


            document.getElementById('saveProfileBTN').classList.add('d-none')
            doc

            

            ProfileDataFill()

            return
        }
    } catch (error) {
        
    }
}


