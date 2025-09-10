function ShowMessages(severity, title, message) {
    let msgBox = document.getElementById('msgBox')
    msgBox.innerHTML = ''
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    let btn = document.createElement('button')

    h3.innerHTML = title
    p.innerHTML = message
    btn.classList.add('btn-close')
    btn.setAttribute('data-bs-dismiss', 'alert')
    btn.setAttribute('aria-labe', 'Close')
    msgBox.classList.add('alert', `alert-${severity}`, 'alert-dismissible', 'fade', 'show')
    msgBox.setAttribute('role', 'alert')

    msgBox.appendChild(h3)
    msgBox.appendChild(p)
    msgBox.appendChild(btn)

    setTimeout(() => {
        msgBox.classList.remove('show')
        msgBox.classList.add('hide')

    }, 3000);
}