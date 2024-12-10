const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.content-tab');

tabButtons.forEach((tab, index) => {
  // Evento de clic
  tab.addEventListener('click', () => tabClicked(tab));

  // Evento de teclado
  tab.addEventListener('keydown', (e) => handleKeyDown(e, index));
});

function tabClicked(tab) {
  // Actualizar estado de las pestañas
  tabButtons.forEach((button) => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('tabindex', '-1');
  });

  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  tab.focus();

  // Mostrar contenido asociado
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  const contentId = tab.getAttribute('content-id');
  const contentSelected = document.getElementById(contentId);
  contentSelected.hidden = false;
}

function handleKeyDown(event, index) {
  const { key } = event;
  const totalTabs = tabButtons.length;

  if (key === 'ArrowRight') {
    const nextIndex = (index + 1) % totalTabs;
    tabButtons[nextIndex].click();
  } else if (key === 'ArrowLeft') {
    const prevIndex = (index - 1 + totalTabs) % totalTabs;
    tabButtons[prevIndex].click();
  }
}
