// ev price api

export async function onRequestGet(context) {
  // fetch worker
  const workerFetch = await fetch(
    "https://evcharger.craigellachiefillingstation.co.uk",
  );
  if (workerFetch.ok) {
    const cached = await context.env.EV_CACHE.get("availability-data", "json");
    const cached_tarriff = await context.env.EV_CACHE.get(
      "tarriff-data",
      "json",
    );
  }

  // no data in cache
  if (!cached || !cached_tarriff) {
    return new Response(JSON.stringify({ error: "No data yet " }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  // return cache data
  const bodyRes = JSON.stringify([cached, cached_tarriff]);
  return new Response(bodyRes, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
