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

    humedad = dataApi.map((cd3)=>cd3.Humedad)
    console.log(humedad)

    estadoGeneral = dataApi.map((cd4)=>cd4.Estado)
    console.log(estadoGeneral)

    const selectRegiones = document.getElementById('regiones'); // Selecciona el elemento select por ID

    estacion.forEach(function (element) {
        const option = document.createElement('option');
        option.value = element; // Utiliza el nombre de la ciudad como valor
        option.text = element; // Muestra el nombre de la ciudad como texto de la opción
        selectRegiones.appendChild(option);
    });

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: estacion, // Usar estacion en lugar de Estacion
            datasets: [{
                label: 'Climas de Chile',
                data: [], // Agregar los datos apropiados aquí
                borderWidth: 1,
                backgroundColor: [], // Agregar los colores apropiados aquí
                borderColor: [] // Agregar los colores de borde apropiados aquí
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

