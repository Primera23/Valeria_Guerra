import {mostrarProducto} from './cargarProducto.js';
export function crearProducto(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Debug: Verificar los datos
    console.log("Datos del formulario:", {
        categoria2: formData.get('categoria2'),
        producto: formData.get('producto'),
        precio: formData.get('precio'),
        descripcion2: formData.get('descripcion2'),
        Imagen: formData.get('Imagen').name, // Nombre del archivo
        talla: formData.get('talla'),
        cantidad: formData.get('cantidad'),
        color: formData.get('color')
    });

    fetch(form.action, {
        method: form.method,
        body: formData // ¡Usa FormData directamente, no URLSearchParams!
    })
    .then(response => response.json())
    .then(result => {
        const alertContainer = document.getElementById('alertProducto');
        alertContainer.innerHTML = `
            <div class="alert ${result.success ? 'alert-success' : 'alert-danger'} alert-dismissible fade show" role="alert">
                ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        if (result.success) {
            fetch('/productos')
                .then(response => response.json())
                .then(productos => mostrarProducto(productos))
                .catch(error => console.error('Error al cargar productos:', error));
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Error al enviar el formulario: ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    });
}