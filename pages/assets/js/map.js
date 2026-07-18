// displaying the interactive map
const pinLocation = [-4.21, 57.47];

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
        url: "https://map-tile.craigellachiefillingstation.co.uk/scotland/map.json",
        attribution:
          '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
    },
    layers: basemaps.layers("basemap", basemaps.namedFlavor("light"), {
      lang: "en",
    }),
  },
  center: pinLocation,
  zoom: 10,
});

map.addControl(new maplibregl.NavigationControl());

new maplibregl.Marker()
  .setLngLat(pinLocation)
  .setPopup(
    new maplibregl.Popup().setHTML("<b>Craigellachie Filling Station</b>"),
  )
  .addTo(map);
