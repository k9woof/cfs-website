// displaying the interactive map

// fetches the basemap from our domain, and then places marker at our location
const pinLocation = [-3.184139, 57.486293];
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

// nav/marker
map.addControl(new maplibregl.NavigationControl());
new maplibregl.Marker()
  .setLngLat(pinLocation)
  .setPopup(
    new maplibregl.Popup().setHTML(
      '<b>Craigellachie Filling Station</b><br><p>Hill Street, Craigellachie,<br> Moray, AB38 9TB</p><a href="https://www.google.com/maps/dir//Craigellachie+Filling+Station+Ltd,+Hill+St,+Craigellachie,+Aberlour+AB38+9TB/@57.4862635,-3.1867997,17z/data=!4m17!1m7!3m6!1s0x4885a44b313b653f:0x993479a922a81bb3!2sCraigellachie+Filling+Station+Ltd!8m2!3d57.4862606!4d-3.1842248!16s%2Fg%2F1tf3b352!4m8!1m0!1m5!1m1!1s0x4885a44b313b653f:0x993479a922a81bb3!2m2!1d-3.1842248!2d57.4862606!3e0?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D" rel="noopener" target="_blank" title="Get Directions for Craigellachie Filling Station on Google Maps">Get Directions</a>',
    ),
  )
  .addTo(map);
