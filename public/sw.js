// ========================================
// BUeño Calculator — Service Worker
// Offline-first caching strategy
// Version: 1.0.0
// ========================================

const CACHE_VERSION = 'bueno-calc-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Core app shell files — always cached on install
const APP_SHELL = [
  '/',
  '/index.html',
  '/favicon/favicon.svg',
  '/favicon/favicon-96x96.png',
  '/favicon/favicon.ico',
  '/favicon/apple-touch-icon.png',
  '/favicon/web-app-manifest-192x192.png',
  '/favicon/web-app-manifest-512x512.png',
  '/favicon/site.webmanifest',
  '/icons.svg',
];

// ----------------------------------------
// INSTALL — Cache the app shell
// ----------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Pre-caching app shell...');
        return cache.addAll(APP_SHELL);
      })
      .then(() => {
        console.log('[SW] App shell cached. Skipping wait.');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Failed to pre-cache:', err);
      })
  );
});

// ----------------------------------------
// ACTIVATE — Clean up old caches
// ----------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (name) =>
                name.startsWith('bueno-calc-') &&
                name !== STATIC_CACHE &&
                name !== DYNAMIC_CACHE
            )
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated. Taking control of all clients.');
        return self.clients.claim();
      })
  );
});

// ----------------------------------------
// FETCH — Serve from cache, fall back to network
// ----------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Skip cross-origin requests (CDNs, analytics, etc.) — except Google Fonts
  if (
    url.origin !== self.location.origin &&
    !url.hostname.includes('fonts.googleapis.com') &&
    !url.hostname.includes('fonts.gstatic.com')
  ) {
    return;
  }

  // Navigation requests (HTML pages): Network-first, cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a fresh copy for offline fallback
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => {
          // Network unavailable — serve cached HTML
          return caches.match('/index.html').then(
            (cached) =>
              cached ||
              new Response('<h1>BUeño Calculator is offline</h1><p>Please try again when you have internet.</p>', {
                headers: { 'Content-Type': 'text/html' },
              })
          );
        })
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts): Cache-first, network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve from cache immediately; revalidate in background
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cloned = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
            }
            return networkResponse;
          })
          .catch(() => {
            /* network unavailable, that's fine — already serving from cache */
          });

        // Don't await the revalidation — return cache immediately
        event.waitUntil(fetchPromise);
        return cachedResponse;
      }

      // Not in cache — fetch from network and cache it
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const cloned = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
          return networkResponse;
        })
        .catch((err) => {
          console.warn('[SW] Fetch failed for:', request.url, err);
          // Return nothing — browser handles the error display
        });
    })
  );
});

// ----------------------------------------
// MESSAGE — Handle skip waiting from UI
// ----------------------------------------
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
