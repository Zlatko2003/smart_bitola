self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('your-app-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/favicon.ico',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // Remove old caches except the current one
                    return cacheName.startsWith('your-app-cache') && cacheName !== 'your-app-cache';
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Push notification event
self.addEventListener('push', function(event) { 
});
