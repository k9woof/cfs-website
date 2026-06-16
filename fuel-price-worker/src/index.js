// worker to fetch latest fuel price from fuel-finder.service.gov.uk public api

export default {
    async scheduled(event, env, ctx) {
        await updatePrice(env);
    }
};

// update fuel price
async function updatePrice(env) {
    let token = await env.FUEL_CACHE.get("oauth-token");

    // fetch new token
    if (!token) {
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

            // update kv db cache with token
            const tokenData = await tokenRes.json();
            token = tokenData.data.access_token;
            await env.FUEL_CACHE.put("oauth-token", token, {
                expirationTtl: tokenData.data.expires_in - 60
            });
        } catch (err) {
            console.error("Error getting token", err);
            return;
        }
    }

    // fetch price data
    try {
        const dataRes = await fetch("https://www.fuel-finder.service.gov.uk/api/v1/pfs/fuel-prices?batch-number=10", {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Accept": "application/json", 
                "User-Agent": "Mozilla/5.0 (compatible; FuelPriceWorker/1.0)"
            }
        });

        // manipulate response data, and store in kv cache
        const data = await dataRes.json();
        const ourPrice = data.find(s => s.node_id === env.STATION_ID);
        await env.FUEL_CACHE.put("station-price", JSON.stringify(ourPrice));
    } catch (err) {
        console.error("Fuel Price fetch error", err);
        return;
    }
    console.log(await env.FUEL_CACHE.get("station-price"))
}
