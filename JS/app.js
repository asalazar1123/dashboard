import { fetchApi } from "./funciones.js";

let codigo = [];
let estacion = [];
let temperatura = [];
let humedad = [];
let estadoGeneral = [];

async function renderData() {
    const dataApi = await fetchApi('https://api.gael.cloud/general/public/clima/');
    console.log(dataApi);

    codigo = dataApi.map((cd) => cd.Codigo);
    console.log(codigo);

    estacion = dataApi.map((cd1) => cd1.Estacion);
    console.log(estacion);

    temperatura = dataApi.map((cd2) => cd2.Temp)
    console.log(temperatura)

    humedad = dataApi.map((cd3) => cd3.Humedad)
    console.log(humedad)

    estadoGeneral = dataApi.map((cd4) => cd4.Estado)
    console.log(estadoGeneral)

    const selectRegiones = document.getElementById('regiones'); 

    estacion.forEach(function (element) {
        const option = document.createElement('option');
        option.value = element; 
        option.text = element; 
        selectRegiones.appendChild(option);
    });

    const pedirInfo = document.getElementById('buscar')//falta aun...

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: estacion, 
            datasets: [{
                label: 'Climas de Chile',
                data: [], //agregar datos de variables para actuvar el grafico
                borderWidth: 1,
                backgroundColor: [], 
                borderColor: [] 
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
renderData();

