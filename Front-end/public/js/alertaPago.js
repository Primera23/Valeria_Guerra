// archivo: alertaPago.js
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('error') === 'pago') {
    alert('El pago ha fallado. Por favor, intenta nuevamente.');
  }
});
