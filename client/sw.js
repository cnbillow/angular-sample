const version = 8;

self.addEventListener('install', function (event) {

  self.skipWaiting();
})

self.addEventListener('activate', function (event) {

})

self.addEventListener('fetch', function (event) {
  if (!navigator.onLine) {
    event.respondWith(new Response('<h1>Your are Offline :(</h1>', {
      status: 200,
      headers: new Headers({
        'Content-Type': 'text/html'
      })
    }))
  } else {
    event.respondWith(fetch(event.request))
  }

})