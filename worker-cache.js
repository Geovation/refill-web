(global => {
  'use strict';

  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

  if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.routing.registerRoute(
      new RegExp('http.*refillStations\.json'),
      workbox.strategies.cacheFirst({
        cacheName: 'refillStations',
        plugins: [
          new workbox.expiration.Plugin({
            // Cache for a maximum of a day
            maxAgeSeconds: 1 * 24 * 60 * 60
          })
        ]
      })
    );

    // workbox.routing.registerRoute(
    //   new RegExp('.*api\.mapbox\.com\/.*'),
    //   workbox.strategies.cacheFirst({
    //     cacheName: 'mapbox',
    //   })
    // );

    workbox.routing.registerRoute(
      new RegExp('.*'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'default',
      })
    );

    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }

})(self);
