// install event
self.addEventListener(`install`, event => {
    console.log(`worker installed`)
})

// activate event
self.addEventListener(`activate`, event =>{
    console.log(`worker activated`)
})

// fetch events
self.addEventListener(`fetch`, event => {
    console.log(`fetch event`, event)
})