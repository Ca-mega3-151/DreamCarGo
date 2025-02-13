/* eslint-disable no-restricted-globals */
// Define the name for your cache
const CACHE_NAME = 'cacheV1';

self.addEventListener('fetch', event => {
  if (event.request.url.includes('cacheV1')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      }),
    );
  }
});
