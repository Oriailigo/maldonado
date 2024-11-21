document.querySelectorAll('.image-wrapper').forEach((wrapper) => {
    wrapper.addEventListener('click', toggleCollapsible);
    wrapper.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        toggleCollapsible.call(wrapper);
      }
    });
  });
  
  function toggleCollapsible() {
    const collapsible = this.querySelector('.collapsible');
    const isOpen = collapsible.style.maxHeight;
    collapsible.style.maxHeight = isOpen ? null : collapsible.scrollHeight + "px";
  }
  