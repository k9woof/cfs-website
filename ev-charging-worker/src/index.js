// worker to fetch latest ev availability from the smartcharging public api

export default {
    async scheduled(event, env, ctx) {
        await updateAvailabilityAndPrice(env);
    }
};

// update ev availability and current price
async function updateAvailabilityAndPrice(env) {
    try {

        // availability
        const avilabilityRes = await fetch ("https://info.smartcharging.uk/public_feed/locations/3666", {
            "Accept": "application/json"
        });
        if (!avilabilityRes.ok) throw new Error(`availability fetch error: ${avilabilityRes.text()}`)
        const availabilityData = await avilabilityRes.json();
        const ourAvailability = availabilityData.data.find(s => s.id === Number(env.SITE_ID));
        const ourAvailabilityText = JSON.stringify(ourAvailability.evses);
        await env.EV_CACHE.put("availability-data", ourAvailabilityText);

        // tarriff
        const tarriffRes = await fetch ("https://info.smartcharging.uk/public_feed/locations/3666/tariffs", {
            "Accept": "application/json"
        });
        if (!tarriffRes.ok) throw new Error(`price fetch error: ${tarriffRes.text()}`)
        const tarrifData = await tarriffRes.json();
        const ourTarriff = tarrifData.data.find(s => s.id === env.TARRIFF_ID);
        const ourTarriffText = JSON.stringify(ourTarriff.elements); 
        await env.EV_CACHE.put("tarriff-data", ourTarriffText);
        
    } catch(err) {
        console.log("EV availability or price fetch error: ", err);
        return;
    }
}