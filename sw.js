
const staticCache = `site-static-${appVersion}`
const dynamicCache = `site-dynamic-${appVersion}`
const assets = [
    './',
    './index.html',
    './modules/bottlelist.js',
    './modules/cocktails.js',
    './modules/randomizer.js',
    './modules/settings.js',
    './modules/support.js',
    './startup.js',
    './style.css',
    './manifest.json'
]

// install evt
self.addEventListener(`install`, evt => {
    console.log("installed new SW")
    evt.waitUntil(
        caches.open(staticCache).then(filesUpdate)
        // .then(cache => {
        //     console.log('caching shell assets');
        //     cache.addAll(assets)
        // })
    )
})

const filesUpdate = cache => {
    const stack = [];
    assets.forEach(file => stack.push(
        cache.add(file).catch(_=>console.error(`can't load ${file} to cache`))
    ));
    return Promise.all(stack);
};

// activate evt
self.addEventListener(`activate`, evt =>{
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCache && key !== dynamicCache)
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