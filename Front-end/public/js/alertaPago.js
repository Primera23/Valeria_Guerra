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
      text: '✅ ¡Gracias por tu compra!, nos pondremos en contacto contigo pronto.',
      timer: 3000,
      timerProgressBar: true,
      willClose: () => {
        // Redirigir al dashboard con el hash #pedido
        window.location.href = 'https://localhost:3001/dashboard-cli.html#pedido';
      }
    });
  } else if (status === 'pending') {
    Swal.fire({
      icon: 'info',
      title: 'Pago pendiente',
      text: '⏳ Tu pago está pendiente. Te notificaremos cuando se confirme.'
    });
  }
});


