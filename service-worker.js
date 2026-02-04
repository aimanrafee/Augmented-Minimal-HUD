/**
 * SERVICE WORKER - SOLID 2050 CORE
 * Membolehkan aplikasi berjalan 100% Offline.
 */

const CACHE_NAME = 'augmented-hud-v1';

// Senarai fail yang perlu disimpan untuk kegunaan offline
const OFFLINE_ASSETS = [
    './',
    './index.html',
    './style.css',
    './auth.js',
    './app.js',
    './manifest.json'
];

// 1. EVENT: INSTALL (Simpan Aset ke Cache)
self.addEventListener('install', (event) => {
    console.log('SW: Installing Solid Core Assets...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(OFFLINE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// 2. EVENT: ACTIVATE (Pembersihan Cache Lama)
self.addEventListener('activate', (event) => {
    console.log('SW: System Activated. Cleaning old nodes...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. EVENT: FETCH (Strategi Offline-First)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Jika fail ada dalam cache, guna cache. Jika tidak, ambil dari internet.
                return response || fetch(event.request);
            })
            .catch(() => {
                // Jika offline dan fail tiada dalam cache
                console.error('SW: Resource not found in cache and no internet connection.');
            })
    );
});
