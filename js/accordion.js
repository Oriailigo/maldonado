//const mapa = require("./map");
const accordionButtons = document.querySelectorAll('.accordion__button');
accordionButtons.forEach(button => {
const expanded = button.getAttribute('aria-expanded');
const number = button.getAttribute('id').split('-').pop();
const associatedSection = document.getElementById(`accordion-section-${number}`)

button.addEventListener('click', () => {
button.classList.toggle('expanded');
associatedSection.classList.toggle('open');
if (button.classList.contains('expanded')) {
  button.setAttribute('aria-expanded', true);
  associatedSection.setAttribute('aria-hidden', false);
} else {
  button.setAttribute('aria-expanded', false);
  associatedSection.setAttribute('aria-hidden', true);
}
})


})