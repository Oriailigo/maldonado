const imageWrappers = document.querySelectorAll('.image-wrapper');
const collapsibleContents = document.querySelectorAll('.collapsible-content');

imageWrappers.forEach((wrapper) => {
  wrapper.addEventListener('click', () => toggleCollapse(wrapper));
  wrapper.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      toggleCollapse(wrapper);
    }
  });
});

function toggleCollapse(selectedWrapper) {
  const targetCollapseId = selectedWrapper.getAttribute('data-collapse');

  // Ocultar todos los colapsables
  collapsibleContents.forEach((content) => {
    content.style.display = 'none';
  });

  // Mostrar el colapsable seleccionado
  const targetCollapse = document.getElementById(targetCollapseId);
  targetCollapse.style.display = 'block';
}
