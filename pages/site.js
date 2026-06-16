// script

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
        const unleaded = station.fuel_prices[0].price
        const diesel = station.fuel_prices[1].price 
        petrolElement.innerHTML = `${JSON.stringify(unleaded)}`;
        dieselElement.innerHTML = `${JSON.stringify(diesel)}`;
    } catch (err) {
        petrolElement.textContent = "Error getting prices";
        dieselElement.textContent = "Error getting prices"
    }
}

getFuelPrice();