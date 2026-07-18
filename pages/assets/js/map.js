// displaying the interactive map
const pinLocation = [-3.184139, 57.486293];

// fetches the basemap from our domain, and then styles it
const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    sources: {
      basemap: {
        type: "vector",
        url: "https://map-tile.craigellachiefillingstation.co.uk/scotland.json",
        attribution:
          '<a href="https://protomaps.com" target="_blank" title="Protomaps website" rel="noopener">Protomaps</a> © <a href="https://openstreetmap.org" target="_blank" title="Open Street Maps website" rel="noopener">OpenStreetMap</a>',
      },
    },
    layers: basemaps.layers("basemap", basemaps.namedFlavor("light"), {
      lang: "en",
    }),
  },
  center: pinLocation,
  zoom: 11,
});

map.addControl(new maplibregl.NavigationControl());

new maplibregl.Marker()
  .setLngLat(pinLocation)
  .setPopup(
    new maplibregl.Popup().setHTML(
      "<b>Craigellachie Filling Station</b><br><p>Hill Street, Craigellachie,<br> Moray, AB38 9TB</p>",
    ),
  )
  .addTo(map);
