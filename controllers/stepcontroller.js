let stepsData;
let datumTD = document.getElementById('sDatum')
let lepesTD = document.getElementById('sLepes')
let lepesID = document.getElementById('sID')
let editMode = false
let dateField = document.getElementById('dateField')
let countField = document.getElementById('countField')
let selectedStepData;

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

    await azonosDatum()
    await Render('main')


}

async function TablaFeltoltes() {
    let SUM = 0;

    try {

        let tbody = document.getElementById('stepDataTable')


        const res = await fetch(`${serverURL}/stepdata/Fill/${loggedUser.id}`)

        stepsData =  await res.json()
        



    stepsData.forEach(element => {

        let tr = document.createElement('tr')
        let lepesID = document.createElement('td')
        let datumTD = document.createElement('td')
        datumTD.classList.add('text-end')
        let lepesTD = document.createElement('td')
        lepesTD.classList.add('text-end')
        let muveletekTD = document.createElement('td')

        lepesID.innerHTML = element.id + '.'
        datumTD.innerHTML = element.date
        lepesTD.innerHTML = element.stepCount
        muveletekTD.innerHTML = `<button class="btn btn-danger" id="deleteOne" onclick="Delete(${element.id})">X</button>`
        muveletekTD.innerHTML += ` <button class="btn btn-warning" id="modifyBTN" onclick="Editdata(${element.id})">Módosít</button>`
        muveletekTD.classList.add('text-end')

        tr.appendChild(lepesID)
        tr.appendChild(datumTD)
        tr.appendChild(lepesTD)
        tr.appendChild(muveletekTD)

        tbody.appendChild(tr)
        

        
    })



    stepsData.forEach(e => {
        SUM += Number(e.stepCount)
        document.getElementById('osszLepes').innerText = Number(SUM)
    });


    } catch (err) {
        ShowMessages('danger', 'Hiba', 'Hiba történt a táblázat betöltése során! \n', err)
    }


}

async function Delete(id) {

    if (confirm('Biztosan törölni szeretnéd ezt a bejegyzést?') == false) {
        return
        
    }

    try {

        const res = await fetch(`${serverURL}/stepdata/Delete/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
    })

    tbody.innerHTML = ''
    await TablaFeltoltes()


    }
    catch (err) {
        console.log(err)
    }

}

async function Update(id) {

    let newStepCount = document.getElementById('countField').value
    let newDate = document.getElementById('dateField').value

    if (!newStepCount || !newDate) {
        //ShowMessages('danger', 'Hiba', 'Kitöltetlen adatok')
        return
    }

    // módosítások mentése

    try {

        const res = await fetch(`${serverURL}/stepdata/Update/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stepCount: Number(newStepCount),
                date: newDate
        })
    })


    
    if (res.status == 200) {
        ShowMessages('success', '', 'Sikeres adatfrissítés!')


        }
}
    catch (err) {
        console.log(err)
    }



    azonosDatum()
    Render('main')
}


async function azonosDatum(){

    const res = await fetch(`${serverURL}/stepdataFill/${loggedUser.id}`)

    stepsData =  await res.json()

    stepsData.forEach(element => {
        if(element.date == document.getElementById('dateField').value){
            stepsData.stepCount += parseInt(document.getElementById('countField').value)
            return
        }
    });



    try {
        const res = await fetch(`${serverURL}/stepdataUpdate/${stepsData.id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stepCount: stepsData.stepCount,
                date: document.getElementById('dateField').value
        })
    })
    } catch (err) {
        console.log(err)
    }

    await TablaFeltoltes()




}


async function Editdata(id) {

    let modBTN = document.getElementById('modositasBTN')
    let megBTN = document.getElementById('megsemBTN')

    if (!editMode) {
        modBTN.classList.remove('d-none')
        megBTN.classList.remove('d-none')
        document.getElementById('modifyBTN').classList.add('d-none')
        modBTN.setAttribute('onclick', `Update(${id})`)
        editMode = true
    }

    else {
        modBTN.classList.add('d-none')
        megBTN.classList.add('d-none')
        document.getElementById(modifyBTN).classList.remove('d-none')
        editMode = false
        return
    }

    countField.value = selectedStepData.stepCount
    dateField.value = selectedStepData.date


    document.getElementById('hozzaadBTN').classList.add('d-none')

}

function Cancel() {
    editMode = false
    Render('main')
}

async function del(){
    try {
        console.log(selectedStepData.id)
        Delete(selectedStepData.id)
        selectedStepData = null
        Render('main') 
    } catch (err) {
        console.log(err)
    }
}



async function update() {
    /*
    Ha a dátum nem változott -> csak a lépésszámot módosítja
    Ha a dátum változott -> ellenőrzi, hogy van-e már ilyen dátumú bejegyzés
        - van: hozzáadja a lépésszámot a meglévőhöz, majd törli a módosítandó bejegyzést
        - nincs: csak módosítja a dátumot és a lépésszámot
    */

    let modBTN = document.getElementById('modositasBTN')
    let megBTN = document.getElementById('megsemBTN')

    if (selectedStepData.date == dateField.value) {
        // csak lépésszám módosítás
        Update(selectedStepData.id)

        try {

            const res = await fetch(`${serverURL}/stepdata/Update/${selectedStepData.id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stepCount: Number(newStepCount),
                    date: newDate
            })
        })
    
    
        
        if (res.status == 200) {
            ShowMessages('success', '', 'Sikeres adatfrissítés!')
    
    
            }
    }
        catch (err) {
            console.log(err)
        }
    
        
    }
    
}



function Modify() {
    Update(selectedStepData.id)
}


