//install event
self.addEventListener('install', event => {
    console.log("service worker installed");
});

//activate event
self.addEventListener('activate', event => {
    console.log("has been activated");
});
