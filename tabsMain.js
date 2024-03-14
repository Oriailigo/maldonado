document.addEventListener("DOMContentLoaded", function() {
    // Añade la clase 'active' al elemento .tab ul.tabs y 'current' al primer elemento li
    document.querySelector('.tab ul.tabs').classList.add('active');
    document.querySelector('.tab ul.tabs li:first-child').classList.add('current');
  
    // Agrega el evento 'click' a los enlaces dentro de los elementos li
    document.querySelectorAll('.tab ul.tabs li a').forEach(function(link) {
      link.addEventListener('click', function(event) {
        var tab = this.closest('.tab');
        var index = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);
  
        // Remueve la clase 'current' de todos los elementos li y luego la agrega al elemento actual
        tab.querySelectorAll('.tab ul.tabs > li').forEach(function(li) {
          li.classList.remove('current');
        });
        this.parentNode.classList.add('current');
  
        // Oculta todos los elementos div.tabs_item excepto el que corresponde al índice seleccionado
        tab.querySelectorAll('.tab_content div.tabs_item').forEach(function(item, i) {
          if (i !== index) {
            item.style.display = 'none';
          } else {
            item.style.display = 'block';
          }
        });
  
        event.preventDefault();
      });
    });
  });
  