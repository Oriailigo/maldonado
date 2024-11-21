// Seleccionar elementos interactivos
const interactiveDivs = document.querySelectorAll('.interactive-div');
const infoSelect = document.getElementById('info-select');
const infoContainer = document.getElementById('info-container');
const infoContent = document.getElementById('info-content');

// Función para mostrar contenido
function showContent(content) {
  infoContainer.classList.remove('hidden');
  infoContent.innerHTML = content; // Usamos innerHTML para interpretar el HTML
}

// Evento para manejar los divs interactivos
interactiveDivs.forEach(div => {
  // Manejar clics
  div.addEventListener('click', () => {
    const content = div.getAttribute('data-content');
    showContent(content);
  });

  // Manejar eventos de teclado (accesibilidad)
  div.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const content = div.getAttribute('data-content');
      showContent(content);
    }
  });
});

// Evento para manejar el select
infoSelect.addEventListener('change', () => {
  const selectedOption = infoSelect.options[infoSelect.selectedIndex]; // Obtener la opción seleccionada
  const content = selectedOption.getAttribute('data-content'); // Leer el atributo data-content

  // Mostrar contenido si existe
  if (content) {
    showContent(content);
  }
});
