// fuel/ev scripts

// fuel price 
async function getFuelPrice() {
    const petrolElement = document.getElementById("petrol");
    const dieselElement = document.getElementById("diesel");
    try {

        // fetch fuel price
        const res = await fetch("api/fuel-price");
        const fuel_prices = await res.json();
        if (!res.ok) {
            petrolElement.textContent = "Prices not available";
            dieselElement.textContent = "Prices not available";
            return;
        }

        // get prices, update
        const unleaded = fuel_prices[0].price
        const diesel = fuel_prices[1].price 
        petrolElement.innerHTML = `${JSON.stringify(unleaded)}p`;
        dieselElement.innerHTML = `${JSON.stringify(diesel)}p`;
    } catch (err) {
        petrolElement.textContent = "Error getting prices";
        dieselElement.textContent = "Error getting prices"
    }
}

// ev tarriff/availability
async function getEVAvailabilityTarriff() {
    const tarriffElement = document.getElementById("tarriff");
    const availabilityElement = document.getElementById("availability");
    try {
        const res = await fetch("api/ev-charging");
        if (!res.ok) {
            tarriffElement.textContent("Tarriff information not available");
            availabilityElement.textContent("Availability data not available");
            return;
        }
        const tarriffAvailability = await res.json();
        const tarriff = tarriffAvailability[1].price_components[0].price;
        const availability = tarriffAvailability[0];
        tarriffElement.innerHTML = `£${JSON.stringify(tarriff)} per kwh`;
        //availabilityElement.innerHTML = 
    } catch(err) {
        tarriffElement.textContent = "Error getting tarriff data";
        availabilityElement.textContent = "Error getting availability data";
    }
}

getFuelPrice();
getEVAvailabilityTarriff();