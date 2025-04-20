import {mostrarProducto} from './cargarProducto.js';
export function crearProducto(event) {
    event.preventDefault();

    const form = event.target;
      const formData = new FormData(form);
      const data = new URLSearchParams(formData);

    // Para debug: mostrar los datos correctamente
    const imagenFile = formData.get('Imagen');
    console.log("Datos recibidos:", {
        ...Object.fromEntries(formData.entries()),
        Imagen: imagenFile.name // o el objeto completo como en la solución 2
    });

    fetch(form.action, { 
        method: form.method, 
        body: data})
        
    .then(response => response.json())
    .then(result => {
        const alertContainer = document.getElementById('alertProducto');
        alertContainer.innerHTML = '';

        const alertType = result.success ? 'alert-success' : 'alert-danger';
        const alertMessage = `<div class="alert ${alertType} alert-dismissible fade show" role="alert">${result.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        alertContainer.innerHTML = alertMessage;

        if (result.success) {
            fetch('/productos')
                .then(response => response.json())
                .then(productos => mostrarProducto(productos))
                .catch(error => console.log(error));
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}