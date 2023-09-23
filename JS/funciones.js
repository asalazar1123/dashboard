// aqui ponemos la promesa esperando respuesta del servidor
export const fetchApi = async (url)=>{ 
    const response=await fetch(url);
    const data= response.json();
    return data;
}

// exportamos funcion de crear chart
export function createChart(data) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
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
}

