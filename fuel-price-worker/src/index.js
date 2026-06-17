// worker to fetch latest fuel price from fuel-finder.service.gov.uk public api

export default {
    async scheduled(event, env, ctx) {
        await updatePrice(env);
    }
};

// update fuel price
async function updatePrice(env) {
    let token = undefined;

    // fetch token
    try {
        const tokenRes = await fetch ("https://www.fuel-finder.service.gov.uk/api/v1/oauth/generate_access_token", {
            method: "POST",
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded", 
                "Accept": "application/json", 
                "User-Agent": "Mozilla/5.0 (compatible; FuelPriceWorker/1.0)"
            }, 
            body: new URLSearchParams ({
                grant_type: "client_credentials", 
                client_id: env.FUEL_CLIENT_ID, 
                client_secret: env.FUEL_CLIENT_SECRET,
                scope: "fuelfinder.read"
            })
        });
        if (!tokenRes.ok) {
            throw new Error("Token res error", tokenRes.status)
        }
        const tokenData = await tokenRes.json();
        token = tokenData.data.access_token;
    } catch (err) {
        console.error("Error getting token", err);
        return;
    }

    // fetch price data
    try {

        // try batches until ours is found
        let ourPrice = undefined;
        let batchNumber = 1;
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        while (ourPrice === undefined) {
            const dataRes = await fetch(`https://www.fuel-finder.service.gov.uk/api/v1/pfs/fuel-prices?batch-number=${batchNumber}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json", 
                    "User-Agent": "Mozilla/5.0 (compatible; FuelPriceWorker/1.0)"
                }
            });
            const data = await dataRes.json();
            ourPrice = data.find(s => s.node_id === env.STATION_ID);
            await delay(1500);
            batchNumber++;
        }

        // update cache with current prices
        const fuel_price = JSON.stringify(ourPrice.fuel_prices);
        await env.FUEL_CACHE.put("station-price", fuel_price);
    } catch (err) {
        console.error("Fuel Price fetch error", err);
        return;
    }
}
