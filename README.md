# Craigellachie Filling Station Website/Associated Workers Repository

This repository contains the source code for the website for Craigellachie Filling Station Limited. It also contains the source code for three cloudflare workers. These are:

1.  Fuel Price worker (/fuel-price-worker)
2.  EV Charging worker (/ev-charging-worker)
3.  Map worker (/map-worker)

## Map worker Code Notice

The worker code (map-worker/src/index.js) for the map-tile worker is taken from [here](https://github.com/protomaps/PMTiles/tree/main/serverless/cloudflare). In the root of the map-worker (/map-worker/LICENSE) is the license from the above repository. From following the guide [here](https://docs.protomaps.com/deploy/cloudflare).

## Fuel Price worker

The fuel price worker fetches from the UK Government's Fuel Finder service.

## EV Charger worker

The EV charger worker fetches from ChargePlace Scotland's public API.

## Development/How to Access

The website and workers were designed/adapted by Cailan White (@k9woof) on behalf of Craigellachie Filling Station Limited. The website is accessable [here](https://craigellachiefilingstation.co.uk).
