// // var  캐싱 스토리지에 저장될 이름 = '';
// var CACHE_NAME = 'pwa-offline-v1';
// // var 캐싱 할 웹 자원 목록 =[]
// var filesToCache = [
//     '/',
//     '/img/icons/favicon.ico',
//     '/index.html',
//     './src/main.js',
//     './src/App.vue',
//     '/app.js'
// ]

const dynamicCACHE_NAME = 'pwa-dynamic-v4';

var CACHE_NAME = 'pwa-offline-v5';
// var 캐싱 할 웹 자원 목록 =[]
var filesToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/img/icons/favicon-32x32.png',
];

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    })
  })
}

// 서비스 워커 설치(웹 지원 캐싱)
// window 대신 self로 받는다.

// install service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('cashing shell filetocache');
      cache.addAll(filesToCache);
    })
  );
});

// activate service worker
self.addEventListener('activate', function(event) {
  console.log('[service worker has been activated]');
  event.waitUntil(
    caches.keys().then(keys => {
      console.log(keys["이거 되나?"]);
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME && key !== dynamicCACHE_NAME)
        .map(key => caches.delete(key))
      )
    })
  )
});

self.addEventListener('fetch', function(event) {
  // console.log('[fetch]', event);
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request).then(fetchRes => {
          return caches.open(dynamicCACHE_NAME).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            limitCacheSize(dynamicCACHE_NAME, 100);
            return fetchRes;
          })
        });
      }).catch(function(error) {
        return console.log(error);
      })
    );
  }
});
