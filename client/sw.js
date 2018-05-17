const version = 12;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      self.skypWaiting();
      return cache.addAll(
        [
          'https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css',
          'https://code.jquery.com/jquery-3.2.1.slim.min.js',
          'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js',
          'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js',
          'https://fonts.googleapis.com/css?family=Roboto',
          'https://fonts.googleapis.com/icon?family=Material+Icons'
        ]
      );
    })
  );
});

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