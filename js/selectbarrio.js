// Elementos del DOM
const infoSelect = document.getElementById('info-select');
const infoContainer = document.getElementById('info-container');
const infoContent = document.getElementById('info-content');

// Datos de ejemplo para cada opción
const infoData = {
  info1: "Contenido de la opción 1: Esta es una descripción detallada para la primera opción.",
  info2: "Contenido de la opción 2: Aquí se muestra información relacionada con la segunda opción.",
  info3: "Contenido de la opción 3: Detalles adicionales sobre la tercera opción seleccionada."
};

// Evento para manejar la selección del select
infoSelect.addEventListener('change', () => {
  const selectedValue = infoSelect.value;

  // Si hay contenido correspondiente, renderízalo
  if (infoData[selectedValue]) {
    infoContent.textContent = infoData[selectedValue];
    infoContainer.classList.remove('hidden'); // Muestra el contenedor
  }
});
