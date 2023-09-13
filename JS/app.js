import { fetchApi } from "./funciones.js";


let codigo = [];

let estacion = [];
 

async function renderData(){

    const dataApi = await fetchApi('https://api.gael.cloud/general/public/clima/')

    console.log(dataApi)

    codigo = dataApi.map((cd) => cd.Codigo)

    console.log(codigo);

    estacion = dataApi.map((cd1) => cd1.Estacion)

    console.log(estacion);
   
    const codEst = [{codigo}, {estacion}];


    let html = "";

    // aqui esta listo para hacer recorrido con FOR o split

        codEst.forEach(function(element, index){
        html += "<option> " + estacion[1] + " </option>";
        
    });


 
    // aqui esta inserto el ID del select
    document.querySelector('#regiones').innerHTML = html;


    
    const ctx = document.getElementById('myChart')

 

    new Chart(ctx, {

        type: 'bar',

        data: {

          labels: Estacion,

          datasets: [{

            label: 'Climas de Chile',

            data: magnitudes,

            borderWidth: 1,

            backgroundColor: backgroundColors,
            
            borderColor: borderColor

          },]

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

 

renderData()