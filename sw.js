const CACHE = 'binday-v9';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './widget.html',
  './icon-192.png',
  './icon-512.png'
];

// ── Install ────────────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── Activate — purge old caches ────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch — cache-first for assets, network for the rest ──────────────────────
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith('http')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});

// ── Notification click ─────────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes('index.html') || client.url.endsWith('/')) {
          return client.focus();
        }
      }
      return clients.openWindow('./');
    })
  );
});

// ── Widget API (Chrome on Android) ────────────────────────────────────────────
// The app pushes a fresh payload via postMessage whenever the schedule changes.
// The SW updates all installed widget instances with the new data.

self.addEventListener('widgetinstall', e => {
  e.waitUntil(refreshWidget(e.widget));
});

self.addEventListener('widgetresume', e => {
  e.waitUntil(refreshWidget(e.widget));
});

self.addEventListener('widgetclick', e => {
  e.waitUntil(clients.openWindow('./'));
});

self.addEventListener('widgetuninstall', () => {});

// Message from the app: { type: 'WIDGET_UPDATE', payload: { ... } }
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'WIDGET_UPDATE') {
    e.waitUntil(updateAllWidgets(e.data.payload));
  }
});

async function refreshWidget(widget) {
  if (!self.widgets) return;
  const template = await getTemplate();
  const data = JSON.stringify(getFallbackPayload());
  await self.widgets.updateByTag(widget.definition.tag, { template, data, settings: {} });
}

async function updateAllWidgets(payload) {
  if (!self.widgets) return;
  const template = await getTemplate();
  const data = JSON.stringify(payload);
  const instances = await self.widgets.getByTag('binday-next');
  for (const widget of (instances || [])) {
    await self.widgets.updateByInstanceId(widget.id, { template, data, settings: {} });
  }
}

async function getTemplate() {
  // Try cache first (widget.html is pre-cached on install)
  const cached = await caches.match('./widget.html');
  if (cached) return cached.text();
  const res = await fetch('./widget.html');
  return res.text();
}

function getFallbackPayload() {
  return { binName: '', binColor: '#818cf8', binLabel: '', daysUntil: null, dateStr: '' };
}
