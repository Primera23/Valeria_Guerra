// archivo: alertaPago.js
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const error = params.get('error');
  const status = params.get('status');

  if (error === 'pago') {
    alert('❌ El pago ha fallado. Por favor, intenta nuevamente.');
  } else if (status === 'approved') {
    alert('✅ ¡Pago exitoso! Gracias por tu compra.');
  } else if (status === 'pending') {
    alert('⏳ Tu pago está pendiente. Te notificaremos cuando se confirme.');
  }
});
