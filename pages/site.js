// script

async function getFuelPrice() {
    const list = document.getElementById("fuel-list");
    try {

        // fetch fuel price
        const res = await fetch("api/fuel-price");
        const fuel_prices = await res.json();
        if (!res.ok) {
            list.textContent = "Prices not available";
            return;
        }

        // get prices, update
        const unleaded = fuel_prices[0].price
        const diesel = fuel_prices[1].price 
        list.innerHTML = `
            <li>Petrol: ${JSON.stringify(unleaded)}</li>
            <li>Diesel: ${JSON.stringify(diesel)}</li>
        `;
    } catch (err) {
        list.textContent = "error getting prices";
    }
}

getFuelPrice();