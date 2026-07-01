// worker to fetch latest fuel price from fuel-finder.service.gov.uk public api

export default {
  async fetch(event, env, ctx) {
    await checkForPriceUpdate(env);
    return new Response("OK");
  },
};

// check if price update needed
async function checkForPriceUpdate(env) {
  try {
    const storedPrice = await env.EV_CACHE.get("station-price");
    if (storedPrice === null) {
      await updatePrice(env);
    }
  } catch (err) {
    console.error("Fuel Price fetch error: ", err);
    return;
  }
}

// update fuel price
async function updatePrice(env) {
  // token
  try {
    const tokenRes = await fetch(
      "https://www.fuel-finder.service.gov.uk/api/v1/oauth/generate_access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: env.FUEL_CLIENT_ID,
          client_secret: env.FUEL_CLIENT_SECRET,
          scope: "fuelfinder.read",
        }),
      },
    );

    // check res
    if (!tokenRes.ok) {
      const tokenText = await dataRes.text();
      throw new Error(`Data fetch error: ${datatext}`);
    }
    const tokenData = await tokenRes.json();
    const token = tokenData.data.access_token;

    // fuel price
    let ourPrice = undefined;
    let batchNumber = 1;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (ourPrice === undefined) {
      const dataRes = await fetch(
        `https://www.fuel-finder.service.gov.uk/api/v1/pfs/fuel-prices?batch-number=${batchNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0",
          },
        },
      );

      // check res
      if (!dataRes.ok) {
        const dataText = await dataRes.text();
        throw new Error(`Data fetch error: ${datatext}`);
      }
      const data = await dataRes.json();
      ourPrice = data.find((s) => s.node_id === env.STATION_ID);
      await delay(1500);
      batchNumber++;
    }

    // update cache with current prices
    const fuel_price = JSON.stringify(ourPrice.fuel_prices);
    await env.FUEL_CACHE.put("station-price", fuel_price, {
      expirationTtl: 21600,
    });
  } catch (err) {
    console.error("Fuel Price/Token fetch error", err);
    return;
  }
}
