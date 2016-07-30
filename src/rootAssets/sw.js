self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/static/css/app.css',
        '/static/js/app.js',
        '/static/js/vendor.js'
      ])
        .then(() => self.skipWaiting())
        .catch((err) => {
          console.log(err)
        })
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})
