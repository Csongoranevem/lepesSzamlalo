let chart = null;
let chartLabels = []
let chartData = []

async function getChartdata() {
    // lekérdezi a szükséges adatokat az API-ból
    // feltölti a label[] és data[] tömböket
}


function initChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data:  {
            labels: chartLabels,
            datasets: [
              {
                label: 'Teszt felhasználó',
                data: chartData,
              }
            ]
          },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Lépésszámok'
            }
          }
        },
    });
}