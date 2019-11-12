const version = "1.0.2"

self.addEventListener("install", event => {
   console.log("INSTALL service worker version " + version)
    return self.skipWaiting()
})

self.addEventListener("activate", event => {
    console.log("ACTIVATE service worker version " + version)
     //return self.skipWaiting()
 })

 self.addEventListener('fetch', function () {
     //met en écoute le service
 })

 importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

 if (workbox) {
     console.log('OK, workbox chargé');
     workbox.precaching.precacheAndRoute([
         {
             "url" : "index.html"
         },
         {
            "url" : "style.css"
        },
        {
            "url" : "manifest.json"
        },
        {
            "url" : "icon-96-96.png"
        },
        {
            "url" : "favicon.ico"
        },
        {
            "url" : "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
        },
        {
            "url" : "sw-register.js"
        },
        {
            "url" : "install.js"
        },
        {
            "url" : "main.js"
        }
     ])

    workbox.routing.registerRoute(
        /(.*)\.(?:png|gif|jpg|css)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'design-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30*24*60*60 //30 days
                })
            ]
        })
    )

workbox.routing.registerRoute(
    "https://api.irail.be/stations/?format=json",
    new workbox.strategies.NetworkFirst({
        cacheName: "api-cache",
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30*24*60*60
            })
        ]
    })
)

 } else {
     console.log('Oooh, workbox non chargé');
 }