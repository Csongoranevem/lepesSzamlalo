let theme = 'light'

const appTitle = "Lépésszámláló App"
const author = "13.A Szoft"
const company = "Bajai SZC Türr István Technikum"

appTitleLBL = document.querySelector('footer h6')
appTitleLBL.textContent = company
authorLBL = document.querySelector('footer > p')
authorLBL.textContent = author

titleLBL = document.querySelector('header h1')
titleLBL.textContent = appTitle

//navLinks
loginNL = document.querySelector('#belepesNL')

let main = document.querySelector('main')

function LoadTheme() {
    theme = 'light'
    if (localStorage.getItem('SCTheme')) {
        theme = localStorage.getItem('SCTheme')
        SetTheme(theme)
    }
}


function SaveTheme(theme) {
    localStorage.setItem('SCTheme', theme)
}

function SetTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme)
}

LoadTheme()


colorModeL = document.querySelector('#colorModeLight')
colorModeD = document.querySelector('#colorModeDark')


colorModeL.addEventListener('click', () =>{
    SetTheme('light')
    SaveTheme('light')
    SetThemeBTN('light')

})

colorModeD.addEventListener('click', () =>{
    SetTheme('dark')
    SaveTheme('dark')
    SetThemeBTN('dark')


})


function SetThemeBTN() {
    if (theme == 'light') {
        colorModeD.classList.add('hide')
        colorModeL.classList.remove('hide')
        return
    }
    
    colorModeL.classList.add('hide')
    colorModeD.classList.remove('hide')

}



async function Render(view) {
    main.innerHTML = await (await fetch(`views/${view}.html`)).text()
}


LoadTheme()
Render('login')