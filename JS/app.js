import { fetchApi } from "./funciones.js";    // Realizamos importacion de funciones
import { createChart } from "./funciones.js";

// creamos variables objetos vacias para mandarle contenido

let codigo = [];  
let estacion = [];
let temperatura = [];
let humedad = [];
let estadoGeneral = [];
let myChart = null;

// mandamos a llamar la API

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
            label:  'Temperatura °C',
            data: temperatura,
            borderWidth: 1,
            backgroundColor: 'rgba(173, 216, 230, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
        }]
    };

    
// aqui creamos el grafico 
    createChart(dataObj);

    const selectElement = document.getElementById('regiones');
    for (let i = 0; i < codigo.length; i++) {
        const option = document.createElement('option');
        option.value = codigo[i];
        option.text = estacion[i];
        selectElement.appendChild(option);
    }
}

// aqui mostramos la informacion de la ciudades que seria humedad y estado general

function mostrarInformacionCiudad() {
    const selectElement = document.getElementById('regiones');
    const ciudadSeleccionada = selectElement.value;
    const indiceCiudad = codigo.indexOf(ciudadSeleccionada);
    const humedadSpan = document.getElementById('humedad-valor');
    const estadoGeneralSpan = document.getElementById('estado-general');

    if (indiceCiudad !== -1) {

        if (myChart !== null) {
            myChart.destroy();
        }

        const highlightedData = temperatura.map((temp, index) => (index === indiceCiudad) ? temp : null);

        const dataObj = {
            labels: estacion,
            data: temperatura,
        };
        
        const dataObj2 = {
            labels: estacion,
            data: highlightedData,
        };
        
        createChart(dataObj, dataObj2);

        humedadSpan.textContent = `${humedad[indiceCiudad]} %`;
        estadoGeneralSpan.textContent = `${estadoGeneral[indiceCiudad]}`;
    } else {
        humedadSpan.textContent = 'Valor de humedad: No disponible';
        estadoGeneralSpan.textContent = 'Estado: No disponible';
    }
}

// aqui mandamos a llamar al boton para que al hacer click este nos muestre la informacion proporcionada de la ciudad y nos limpie data

document.getElementById('buscar').addEventListener('click', mostrarInformacionCiudad);
document.getElementById('limpiar').addEventListener('click', renderData);
mostrarInformacionCiudad();
renderData();






