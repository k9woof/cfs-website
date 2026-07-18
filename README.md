# Craigellachie Filling Station Limited Website

[<img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=white" />](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [<img alt="HTML 5" src="https://img.shields.io/badge/-HTML%205-ff69b4?logo=html5&logoColor=white" />](https://www.w3schools.com) [<img alt="CSS 3" src="https://img.shields.io/badge/-CSS%203-lightgrey?logo=css&logoColor=white" />](https://www.w3schools.com)

## Overview

This repository contains the source code for Craigellachie Filling Station Limited's website. It also contains the source code for three Cloudflare workers which provide functionality to parts of the website. These are:

1. Fuel Price worker
2. EV Charger worker
3. Map worker

## Fuel Price worker

The fuel price worker fetches from the [UK Government's Fuel Finder service](https://www.gov.uk/government/collections/fuel-finder). The worker works by fetching from the fuel finder api, making use a oauth token to do so. It then searches through the returned data for the station's prices and then stores the data in a kv cache. This was done so as to reduce the amount of fetches.

## EV Charger worker

The EV charger worker fetches from [ChargePlace Scotland's public API](https://chargeplacescotland.org/"). In a similar way to the fuel price worker, this worker fetches from the api, searches for the charger's tariff/availability data and stores it in a kv cache.

## Map worker

The worker code (map-worker/src/index.js) for the map-tile worker is taken from [this repository](https://github.com/protomaps/PMTiles/tree/main/serverless/cloudflare). In the root of the map-worker (/map-worker/LICENSE) is the license from that repository. This was created with help from the guide on [Protomap's website](https://docs.protomaps.com/deploy/cloudflare). This was done to keep the map data in house, and thus avoid transferring user data to a third party.

## Development

The website and workers were designed/adapted by Cailan White (@k9woof) on behalf of Craigellachie Filling Station Limited. The website is accessible [at this address](https://craigellachiefillingstation.co.uk).
