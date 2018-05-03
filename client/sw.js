const version = 8;

self.addEventListener('install', function (event) {
  console.log('install ' + version )

  self.skipWaiting();
})

self.addEventListener('activate', function (event) {
  console.log('active ' + version )

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
    console.log(event.request.url)
    event.respondWith(fetch(event.request))
  }

})