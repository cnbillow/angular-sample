const CACHE_VERSION = 1;
let CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION
};
const OFFLINE_URL = '/assets/pages/offline.html';


function createCacheBustedRequest(url) {
    let request = new Request(url, {cache: 'reload'});
    // See https://fetch.spec.whatwg.org/#concept-request-mode
    // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
    // if the cache: 'reload' option had any effect.
    if ('cache' in request) {
      return request;
    }
  
    // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
    return new Request(bustedUrl);
  }
  
  self.addEventListener('install', event => {
    event.waitUntil(
      // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
      // the actual URL we end up requesting might include a cache-busting parameter.
      fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(response) {
        return caches.open(CURRENT_CACHES.offline).then(function(cache) {
          return cache.put(OFFLINE_URL, response);
        });
      })
    );
  });

