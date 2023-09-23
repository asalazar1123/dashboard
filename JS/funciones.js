// aqui ponemos la promesa esperando respuesta del servidor
export const fetchApi = async (url)=>{ 
    const response=await fetch(url);
    const data= response.json();
    return data;
}

let myChart = null;



// exportamos funcion de crear chart
export function createChart(data, data2) {
    const ctx = document.getElementById('myChart');

    if (myChart !== null) {
        myChart.destroy();
    }

    if (!data2) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Climas de Chile',
                    data: data.data,
                    backgroundColor: 'rgba(173, 216, 230, 0.7)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                }, {
                    label: 'Clima en ciudad seleccionada',
                    data: data2.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        myChart = new Chart(ctx, config);
    }
    

    
}

