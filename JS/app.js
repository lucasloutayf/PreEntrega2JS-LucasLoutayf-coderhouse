// Clase para definir las tasas de impuestos
class TaxRate {
    constructor(incomeLimit, rate) {
        this.incomeLimit = incomeLimit;
        this.rate = rate;
    }
}

// Array de objetos que define las tasas de impuestos
const taxRates = [
    new TaxRate(10000, 0.10), // 10% hasta $10,000
    new TaxRate(30000, 0.20), // 20% hasta $30,000
    new TaxRate(Infinity, 0.30), // 30% para ingresos mayores
];

// Array para almacenar el historial de cálculos
const simulationHistory = [];

// Función para encontrar la tasa correspondiente al ingreso
const getTaxRate = (income) => {
    return taxRates.find(rate => income <= rate.incomeLimit);
};

// Función para calcular el impuesto
const calculateTax = (income) => {
    const rateObj = getTaxRate(income);
    return {
        rate: rateObj.rate,
        tax: income * rateObj.rate,
    };
};

// Función para agregar una entrada al historial
const addSimulationToHistory = (income, tax, rate) => {
    simulationHistory.push({ income, tax, rate });
};

// Función para mostrar el historial en el DOM
const displayHistory = () => {
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = ""; // Limpiar historial anterior

    if (simulationHistory.length === 0) {
        summaryDiv.innerHTML = "<p>No hay simulaciones realizadas.</p>";
        return;
    }

    const list = simulationHistory.map(entry => {
        return `
            <p>
                Ingreso: $${entry.income} | Tasa: ${entry.rate * 100}% | Impuesto: $${entry.tax.toFixed(2)}
            </p>
        `;
    }).join("");

    summaryDiv.innerHTML = `
        <h3>Historial de Simulaciones:</h3>
        ${list}
    `;
};

// Función principal que inicia el simulador
function startSimulator() {
    console.log("Simulador iniciado");

    let continueSimulation = true;
    while (continueSimulation) {
        let income = parseFloat(prompt("Ingrese su ingreso anual en dólares:"));

        // Validaciones de ingreso (programación defensiva)
        if (isNaN(income) || income < 0) {
            alert("Por favor, ingrese un valor numérico válido.");
            continue;
        }

        // Obtener resultados del cálculo
        const { rate, tax } = calculateTax(income);

        // Mostrar resultado y agregar al historial
        alert(`Para un ingreso de $${income}, el impuesto a pagar es $${tax.toFixed(2)} (Tasa: ${rate * 100}%).`);
        addSimulationToHistory(income, tax, rate);

        // Preguntar si el usuario quiere continuar
        let response = prompt("¿Desea calcular el impuesto para otro ingreso? (si/no)").toLowerCase();
        continueSimulation = (response === "si");
    }

    // Mostrar historial en consola y DOM
    displayHistory();
    console.log("Historial de simulaciones:", simulationHistory);
    alert("Gracias por usar la calculadora de impuestos.");
}

// Mostrar tasas disponibles en la consola
taxRates.forEach(rate => {
    console.log(`Hasta $${rate.incomeLimit}: ${rate.rate * 100}%`);
});
