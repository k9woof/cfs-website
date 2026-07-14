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
    const unleaded = fuel_prices[0].price;
    const diesel = fuel_prices[1].price;
    petrolElement.innerHTML = `${JSON.stringify(unleaded)}p per litre`;
    dieselElement.innerHTML = `${JSON.stringify(diesel)}p per litre`;
  } catch (err) {
    petrolElement.textContent = "Error getting prices";
    dieselElement.textContent = "Error getting prices";
  }
}

// ev tarriff/availability
async function getEVAvailabilityTarriff() {
  const tarriffElement = document.getElementById("tariff");
  const availabilityElement = document.getElementById("availability");
  try {
    const res = await fetch("api/ev-charging");
    if (!res.ok) {
      tarriffElement.textContent("Tarriff information not available");
      availabilityElement.textContent("Availability data not available");
      return;
    }
    const tarriffAvailability = await res.json();
    const tarriff = tarriffAvailability[1][0].price_components[0].price * 1.2;
    const availability = tarriffAvailability[0][0];
    const availabilityDC = tarriffAvailability[0][1];
    const availabilityAC = tarriffAvailability[0][2];
    tarriffElement.innerHTML = `${JSON.stringify(Math.round((tarriff) * 100))}p per kwh`;
    availabilityElement.innerHTML = `DC: ${availability.status.toLowerCase()} <br> CHADEMO: ${availabilityDC.status.toLowerCase()} <br> AC: ${availabilityAC.status.toLowerCase()}`;
  } catch (err) {
    tarriffElement.textContent = "Error getting tarriff data";
    availabilityElement.textContent = "Error getting availability data";
  }
}

// load interactive map in place of static preview 
function loadInteractiveMap() {
  const previewMap = document.getElementById("preview-map");
  previewMap.outerHTML = `<iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2144.534675157363!2d-3.186799721988205!3d57.48626057377476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4885a44b313b653f%3A0x993479a922a81bb3!2sCraigellachie%20Filling%20Station%20Ltd!5e0!3m2!1sen!2suk!4v1781563003130!5m2!1sen!2suk"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>`
  localStorage.setItem("mapConsent", "true")
}

// check if user previously loaded interactive map
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("mapConsent") === "true") {
    loadInteractiveMap();
  }
});

getFuelPrice();
getEVAvailabilityTarriff();
