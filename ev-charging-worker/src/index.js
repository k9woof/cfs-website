// worker to fetch latest ev availability from the smartcharging public api

export default {
  async fetch(event, env, ctx) {
    await updateAvailabilityAndPrice(env);
    return new Response("OK");
  },
};

// update ev availability and current price
async function updateAvailabilityAndPrice(env) {
  try {
    const storedTarriff = await env.EV_CACHE.get("tarriff-data");
    const storedAvailability = await env.EV_CACHE.get("availability-data");
    if (storedTarriff === null) {
      await updatePrice(env);
    }
    if (storedAvailability === null) {
      await updateAvailability(env);
    }
  } catch (err) {
    console.error("EV availability or price fetch error: ", err);
    return;
  }
}

// update availability
async function updateAvailability(env) {
  try {
    const availabilityRes = await fetch(
      "https://info.smartcharging.uk/public_feed/locations/3666",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    // check res
    if (!availabilityRes.ok) {
      const errorText = await availabilityRes.text();
      throw new Error(`Price fetch error: ${errorText}`);
    }

    // find our site availability data
    const availabilityData = await availabilityRes.json();
    const ourAvailability = availabilityData.data.find(
      (s) => s.id === Number(env.SITE_ID),
    );
    const ourAvailabilityText = JSON.stringify(ourAvailability.evses);

    // update availability in kv
    await env.EV_CACHE.put("availability-data", ourAvailabilityText, {
      expirationTtl: 300,
    });
  } catch (err) {
    console.error("EV Availability fetch error: ", err);
    return;
  }
}

// update price
async function updatePrice(env) {
  try {
    const tarriffRes = await fetch(
      "https://info.smartcharging.uk/public_feed/locations/3666/tariffs",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    // check res
    if (!tarriffRes.ok) {
      throw new Error(`price fetch error: ${tarriffRes.text()}`);
    }
    // find our price data
    const tarrifData = await tarriffRes.json();
    const ourTarriff = tarrifData.data.find((s) => s.id === env.TARRIFF_ID);
    const ourTarriffText = JSON.stringify(ourTarriff.elements);

    // update price in kv
    await env.EV_CACHE.put("tarriff-data", ourTarriffText, {
      expirationTtl: 86400,
    });
  } catch (err) {
    console.error("EV Price fetch error: ", err);
    return;
  }
}
