// archivo: alertaPago.js

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  const status = params.get('status');

  if (error === 'pago') {
    Swal.fire({
      icon: 'error',
      title: '¡Pago fallido!',
      text: '❌ El pago ha fallado. Por favor, intenta nuevamente.'
    });
  } else if (status === 'approved') {
    Swal.fire({
      icon: 'success',
      title: '¡Pago exitoso!',
      text: '✅ ¡Gracias por tu compra!'
    });
  } else if (status === 'pending') {
    Swal.fire({
      icon: 'info',
      title: 'Pago pendiente',
      text: '⏳ Tu pago está pendiente. Te notificaremos cuando se confirme.'
    });
  }
});

