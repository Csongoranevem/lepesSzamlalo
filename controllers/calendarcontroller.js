let calEvents = []

function initCalendar() {

    var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale: 'hu',
            headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,multiMonthYear'
        },
        events: calEvents
    })
    calendar.render();
}



async function getCalendar(id) {
    try {

        const res = await fetch(`${serverURL}/stepdata/Fill/${id}`)
        stepsData = await res.json()

        calEvents = []
        stepsData.forEach(e => {
            calEvents.push({
                title: `${e.stepCount} lépés \n \t ${loggedUser.name}`,
                start: e.date
            })
        })
}

    catch (err) {
            showmessages('error', '', 'Hiba történt a naptár betöltése során!')
        }
}




