// Offline: la app abre sin conexión; imágenes guardadas al verlas.
const V = 'contenido-v2';
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.add('/'))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api')) return;
  if (e.request.mode === 'navigate' || u.pathname === '/') {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put('/', c)); return r; }).catch(() => caches.match('/')));
    return;
  }
  if (u.pathname.startsWith('/c/')) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok && !u.pathname.endsWith('.mp4')) { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); } return r; })));
  }
});
