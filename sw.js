const staticCacheName = `site-static-v0.76`
const dynamicCache = 'site-dynamic-v0.76'
const assets = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/manifest.json',
]

// install evt
self.addEventListener(`install`, evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets')
            cache.addAll(assets)
        })
    )
})

// activate evt
self.addEventListener(`activate`, evt =>{
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCacheName && key !== dynamicCache)
                .map(key => caches.delete(key))
            )
        })
    )
})

// fetch evts
self.addEventListener(`fetch`, evt => {
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});
