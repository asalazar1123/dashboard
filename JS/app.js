import { fetchApi } from "./funciones.js";

let codigo = [];
let estacion = [];
let temperatura = [];
let humedad = [];
let estadoGeneral = [];

async function renderData() {
    const dataApi = await fetchApi('https://api.gael.cloud/general/public/clima/');

    codigo = dataApi.map((cd) => cd.Codigo);
    estacion = dataApi.map((cd1) => cd1.Estacion);
    humedad = dataApi.map((cd3) => cd3.Humedad);
    estadoGeneral = dataApi.map((cd4) => cd4.Estado);
    temperatura = dataApi.map((cd2) => parseFloat(cd2.Temp));

    const dataObj = {
        labels: estacion,
        datasets: [{
            label:  'Climas de Chile',
            data: temperatura,
            borderWidth: 1,
            backgroundColor: 'rgba(173, 216, 230, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
        }]
    };

    

    createChart(dataObj);

    const selectElement = document.getElementById('regiones');
    for (let i = 0; i < codigo.length; i++) {
        const option = document.createElement('option');
        option.value = codigo[i];
        option.text = estacion[i];
        selectElement.appendChild(option);
    }
}

function createChart(data) {
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

function mostrarInformacionCiudad() {
    const selectElement = document.getElementById('regiones');
    const ciudadSeleccionada = selectElement.value;
    const indiceCiudad = codigo.indexOf(ciudadSeleccionada);
    const humedadSpan = document.getElementById('humedad-valor');
    const estadoGeneralSpan = document.getElementById('estado-general');

    if (indiceCiudad !== -1) {
        humedadSpan.textContent = `${humedad[indiceCiudad]} %`;
        estadoGeneralSpan.textContent = `${estadoGeneral[indiceCiudad]}`;
    } else {
        humedadSpan.textContent = 'Valor de humedad: No disponible';
        estadoGeneralSpan.textContent = 'Estado: No disponible';
    }
}


document.getElementById('buscar').addEventListener('click', mostrarInformacionCiudad);
mostrarInformacionCiudad();
renderData();
