// ev price api

export async function onRequestGet(context) {
    const cached = await context.env.EV_CACHE.get("availability-data", "json");
    const cached_tarriff = await context.env.EV_CACHE.get("tarriff-data", "json");
    if (!cached || !cached_tarriff) {
        return new Response(JSON.stringify({ error: "No data yet "}), {
            status: 503, 
            headers: { "Content-Type": "application/json" }
        });
    }
    const bodyRes =  [JSON.stringify(cached) , JSON.stringify(cached_tarriff)]
    return new Response(bodyRes, {
        headers: {
            "Content-Type": "application/json", 
            "Cache-Control": "public, max-age=300"
        }
    });
}