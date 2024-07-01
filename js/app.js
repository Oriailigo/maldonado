// Archivo JavaScript principal
console.log('Mi PWA está funcionando');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(error => {
      console.log('Error al registrar el Service Worker:', error);
    });
  }
  
