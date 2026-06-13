// fuel price api

export async function onRequestGet(context) {
    const cached = await context.env.FUEL_CACHE.get("station-price", "json");
    if (!cached) {
        return new Response(JSON.stringify({ error: "No data yet "}), {
            status: 503, 
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify(cached), {
        headers: {
            "Content-Type": "application/json", 
            "Cache-Control": "public, max-age=300"
        }
    });
}