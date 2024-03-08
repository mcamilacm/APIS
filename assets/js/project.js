const inputMoneda = document.querySelector("#input");
const resultadoFinal = document.querySelector("#result");
const botonCalcular = document.querySelector("#boton_calcular");
const selectMoneda = document.querySelector("#selectMoneda");

async function obtenerDatosParaCalculoConversióndeMoneda() {
  try {
    const res = await fetch("https://mindicador.cl/api/");
    const data = await res.json();
    const valorEuro = data.euro.valor;
    const valorDolar = data.dolar.valor;
    console.log(valorEuro,valorDolar)

    return { valorEuro, valorDolar };
  } catch (e) {
    resultadoFinal.innerHTML = `¡Algo salió mal! Error: ${e.message}`;
  }
}

async function obtenerDatosGrafica() {
  try {
    const resDolar = await fetch("https://mindicador.cl/api/dolar");
    const dataDolar = await resDolar.json();
    const serieDolar = dataDolar.serie
    console.log(serieDolar)


    const resEuro = await fetch("https://mindicador.cl/api/euro");
    const dataEuro = await resEuro.json();
    const serieEuro  = dataEuro.serie;
    console.log(serieEuro)


    return { serieDolar, serieEuro};
  } catch (e) {
    resultadoFinal.innerHTML = `¡Algo salió mal! Error: ${e.message}`;
  }
}

function configurarGraficaDolar(serieDolar) {
  // Crear arrays para almacenar las fechas y los valores de la moneda
  const fechas = [];
  const valores = [];

  // Iterar sobre la serie de datos y extraer las fechas y los valores
  serieDolar.forEach((dato) => {
    fechas.push(dato.fecha);
    valores.push(dato.valor);
  });

  console.log(fechas,valores)

  // Crear la configuración de la gráfica
  const config = {
    type: 'line',
    data: {
      labels: fechas, // Fechas en el eje x
      datasets: [{
        label: 'Valor de la moneda',
        backgroundColor: 'red',
        borderColor: 'red',
        data: valores // Valores en el eje y
      }]
    },
    options: {
      // Aquí puedes añadir opciones adicionales de configuración de la gráfica, si las necesitas
    }
  };

  return config;
}

function configurarGraficaEuro(serieEuro) {

    const fechas = [];
    const valores = [];
  
    // Iterar sobre la serie de datos y extraer las fechas y los valores
    serieEuro.forEach((dato) => {
      fechas.push(dato.fecha);
      valores.push(dato.valor);
    });
  
    // Crear la configuración de la gráfica
    const config = {
      type: 'line',
      data: {
        labels: fechas, // Fechas en el eje x
        datasets: [{
          label: 'Valor de la moneda',
          backgroundColor: 'red',
          borderColor: 'red',
          data: valores // Valores en el eje y
        }]
      },
      options: {
        // Aquí puedes añadir opciones adicionales de configuración de la gráfica, si las necesitas
      }
    };
  
    return config;
  }

botonCalcular.addEventListener('click', async () => {
  const resultados = await obtenerDatosParaCalculoConversióndeMoneda();
  const valorDolar = resultados.valorDolar;
  const valorEuro = resultados.valorEuro;
  const inputValor = parseFloat(inputMoneda.value);

  if (selectMoneda.value === "opcion1") {
    resultadoFinal.innerHTML = inputValor / valorDolar;


    const {serieDolar} = await obtenerDatosGrafica()
    const config = configurarGraficaDolar (serieDolar)
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
    

  } else if (selectMoneda.value === "opcion2") {
    resultadoFinal.innerHTML = inputValor / valorEuro;

    const {serieEuro} = await obtenerDatosGrafica()
    const config2 = configurarGraficaEuro (serieEuro)
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config2);

  }
});

// async function renderGrafica (){

//   if (selectMoneda.value === "opcion1") {
//   const monedas= await obtenerDatosGrafica()
//   const config = organizarDatosParaGraficaDolar ((monedas.valorDolarFecha, monedas.fechaDolar))
//   const chartDOM = document.getElementById("myChart");
//   new Chart(chartDOM, config);

// }

//   else if (selectMoneda.value === "opcion2") {

// }
// }





// function organizarDatosParaGraficaDolar() {
//   const fechaDeLasMonedas = data.map((moneda) => moneda.fecha);
//   const valorMonedas = data.map((moneda) => moneda.valor);

//   const config = {
//     type: 'line',
//     data: {
//       labels: fechaDeLasMonedas,
//       datasets: [{
//         label: 'Valor de la moneda',
//         backgroundColor: 'red',
//         borderColor: 'red',
//         data: valorMonedas
//       }]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'Historial últimos 10 días'
//       }
//     }
//   };
//   return config;
// }
    
    // if (selectMoneda.value === "opcion1") {
    //     resultadoFinal.innerHTML = inputMoneda.value * resultados.valorDolar;
    // } else if (selectMoneda.value === "opcion2") {
    //     resultadoFinal.innerHTML = inputMoneda.value * resultados.valorEuro;
    // }

    
// inputMoneda = document.querySelector("#input");
// resultadoFinal =document.querySelector("#result")

// // const getCurrencyValue = (currency, data) => {
// //     return data[currency].valor
// // }

// // FUNCIÓN QUE OBTIENE LOS DATOS DEL ARRGELO 
// async function obtenerDatosMoneda() {
//   try {
//     const res = await fetch("https://mindicador.cl/api/");
//     const data = await res.json();

//     // const valor = getCurrencyValue('dolar', data);

//     const valorEuro = data.map((item) => {
//       const euro = item.euro.valor; // pregunta ¿como llamo a el valor especificamente del euro?
//       return Number(euro);
//     });

//     const valorDolar = data.map((item) => {
//       const dolar = item.dolar.valor;
//       return Number(dolar);
//     });

//     return { valorEuro, valorDolar };

//   } catch (e) {
//     alert = document.querySelectorAll("#result");
//     alert.innerHTML = `Algo salió mal! Error: ${e.message}`;
//   }
// }


//  boton_calcular.addEventListener('click',(value,resultado) =>{

//     if (value === opcion1)
//     {
//         resultado = valorDolar* inputMoneda
//     }
//     else if(value === opcion2){
//         resultado = valorEuro* inputMoneda
//     }
// resultadoFinal.innerHTML= resultado 

//  })

