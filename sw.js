const CACHE_NAME = 'doc-to-a4-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching App Assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch events (Serve from cache if available)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate & Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Clearing Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
