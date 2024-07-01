self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    event.waitUntil(
      caches.open('mi-pwa-cache').then(cache => {
        return cache.addAll([
          '/index.html',
          '/recomendaciones_previas.html',
          '/recomendaciones_post.html',
          '/recomendaciones_como_actuar.html',
          '/protocolos_actuacion.html',
          '/porque.html',
          '/higiene.html',
          '/daños_estructurales.html',
          '/conociendo.html',
          '/aprendiendo.html',
          '/adonde_acudir.html',

          '/css/css.css',
          '/css/menu.css',
          '/css/menuHamburguesa.css',
          '/css/myStyles.css',
          '/css/nav.css',
          '/css/tabsMain.css',
          '/css/tooplate-style.css',
          '/css/aprendiendo/bootstrap.min.css',

          '/js/app.js',
          '/js/main.js',
          '/js/menu.js',
          '/js/tab.js',
          '/js/tabsMain.js',

          '/images/',
          '/img/',
          '/manifest.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  