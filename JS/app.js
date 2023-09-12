import { fetchApi } from "./fetch.js";

const rgbaRedColor = "orange";
const rgbRedColor = "coral";

const rgbaBlueColor = "coral";
const rgbBlueColor = "orange";

async function renderData() {
    const earthquakes = await fetchApi(
        "https://api.gael.cloud/general/public/sismos"
    );

    earthquakes.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

    const ultimos5Sismos = earthquakes.slice(0, 5);

    const magnitudes = ultimos5Sismos.map((earthquake) => parseFloat(earthquake.Magnitud));
    const geographicReferences = ultimos5Sismos.map((earthquake) => earthquake.RefGeografica);

    const backgroundColors = magnitudes.map((magnitude) =>
        magnitude > 3 ? rgbaRedColor : rgbaBlueColor
    );
    const borderColors = magnitudes.map((magnitude) =>
        magnitude > 3 ? rgbRedColor : rgbBlueColor
    );

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: geographicReferences,
            datasets: [
                {
                    label: "Sismos por Localidad",
                    data: magnitudes,
                    borderWidth: 1,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: "Sismos por localidad",
                    padding: {
                        top: 20,
                        bottom: 30,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + "°";
                            }
                            return label;
                        },
                    },
                },
            },
        },
    });
}

renderData();
