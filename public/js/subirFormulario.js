import{cargarCategoria,mostrarData} from './cargarCategorias.js';

export function enviarFormulario(event) {
    event.preventDefault();
  
      const form = event.target;
      const formData = new FormData(form);
      const data = new URLSearchParams(formData);
  
      fetch(form.action, { 
          method: form.method, 
          body: data})
          .then(response => response.json())
          .then(result => {
              const alertContainer = document.getElementById('alertContainer');
              alertContainer.innerHTML = '';
  
              const alertType = result.success ? 'alert-success' : 'alert-danger';
              const alertMessage = `<div class="alert ${alertType} alert-dismissible fade show" role="alert">${result.message}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;
              alertContainer.innerHTML = alertMessage;
     
    if (result.success) {
            fetch('/categoria')
                .then(response => response.json())
                .then(data => mostrarData(data))
                .catch(error => console.log(error));
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}