const CACHE_NAME = 'gym-planner-assets';

// Install - skip caching entirely
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

// Fetch - Network ONLY for all requests (no caching)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch((error) => {
        console.log('Fetch failed, offline:', error);
        // Optionally return offline page here
      })
  );
});

// Activate - clean all caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  return self.clients.claim();
});
