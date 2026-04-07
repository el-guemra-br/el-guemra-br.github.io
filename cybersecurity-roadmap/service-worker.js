const CACHE_NAME = 'cyber-roadmap-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './README.md',
  './manifest.webmanifest',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const isCoreAsset = CORE_ASSETS.some((asset) => {
    if (asset === './') {
      return url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
    }

    return url.pathname.endsWith(asset.replace('./', ''));
  });

  event.respondWith(
    (isCoreAsset
      ? fetch(event.request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            return response;
          })
          .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
      : caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

          return fetch(event.request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
              return response;
            })
            .catch(() => caches.match('./index.html'));
        }))
  );
});
