// INVERSIÓN DEL SCROLL

window.addEventListener('load', () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'instant'
  });
});