let stepsData;
let table = document.getElementById('stepDataTable')
let tr = document.getElementById('stepDataTR')
let datumTD = document.getElementById('sDatum')
let lepesTD = document.getElementById('sLepes')
let lepesID = document.getElementById('sID')

function setdate() {
    let today = new Date().toISOString().split('T')[0]
    let dateField = document.getElementById('dateField')

    dateField.setAttribute('max', today)
}


async function Hozzaadas() {
    try {
        const res = await fetch(`${serverURL}/stepdataAdd`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: loggedUser.id,
                stepCount: document.getElementById('countField').value,
                date: document.getElementById('dateField').value
        })
    })


    } catch (err) {
        console.log(err)
    }
    TablaFeltoltes()


}

async function TablaFeltoltes() {
    try {
        const res = await fetch(`${serverURL}/stepdataFill`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: loggedUser.id
            })
    })

    stepsData =  await res.json()


    table.innerHTML = ''
    stepsData.forEach(element => {

        
    })



    } catch (err) {
        
    }
}

TablaFeltoltes()