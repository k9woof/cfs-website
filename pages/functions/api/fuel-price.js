// fuel price api

export async function onRequestGet(context) {
  // fetch worker
  const workerFetch = await fetch(
    "https://fuelprice.craigellachiefillingstation.co.uk",
  );
  if (workerFetch.ok) {
    const cached = await context.env.FUEL_CACHE.get("station-price", "json");

    // no data in cache
    if (!cached) {
      return new Response(JSON.stringify({ error: "No data yet " }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    // return cache data
    return new Response(JSON.stringify(cached), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  }
}
