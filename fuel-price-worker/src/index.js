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

        console.log(tokenRes)

        // update kv db cache with token
        const tokenData = await tokenRes.json();
        token = tokenData.data.access_token;
        await env.FUEL_CACHE.put("oauth_token", token, {
            expirationTtl: tokenData.data.expires_in - 60
        });
    }

    // fetch price data
    const lastCheck = await env.FUEL_CACHE.get("last-price-check");
    const url = `https://www.fuel-finder.service.gov.uk/api/v1/pfs/fuel-prices?batch-number=10`;
    const dataRes = await fetch(url, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Accept": "application/json", 
            "User-Agent": "Mozilla/5.0 (compatible; FuelPriceWorker/1.0)"
        }
    });
    if (!dataRes.ok) {
        console.error("fuel price api error", dataRes.status);
        return;
    }

    // manipulate response data, and store in kv cache
    const data = await dataRes.json();
    const ourPrice = data.find(s => s.node_id === env.STATION_ID);
    await env.FUEL_CACHE.put("station-price", JSON.stringify(ourPrice));

    // formatting time to match what is expected 
    function formatTime(date) {
        const pad = n => String(n).padStart(2, "0");
        return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
    }
    const now = formatTime(new Date());
    await env.FUEL_CACHE.put("last-price-check", now);
}
