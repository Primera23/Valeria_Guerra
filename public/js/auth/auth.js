export function crearUsuario(event) {
    event.preventDefault();  // Previene el comportamiento predeterminado del formulario

    const form = event.target;  // Obtiene el formulario que se envió
    const formData = new FormData(form);  // Crea un objeto FormData con los datos del formulario
    const data = new URLSearchParams(formData);  // Convierte los datos a un formato de URL codificada (clave=valor)

    // Realiza la solicitud fetch para enviar los datos al servidor
    fetch(form.action, { 
        method: form.method,  // Utiliza el método del formulario (POST, GET, etc.)
        body: data  // Envía los datos como cuerpo de la solicitud
    })
    .then(response => response.json())  // Convierte la respuesta en formato JSON
    .then(result => {
        const alertContainer = document.getElementById('alertContainer');
        alertContainer.innerHTML = '';  // Limpia las alertas previas

        // Determina el tipo de alerta según el resultado (éxito o error)
        const alertType = result.success ? 'alert-success' : 'alert-danger';
        const alertMessage = `
            <div class="alert ${alertType} alert-dismissible fade show" role="alert">
                ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        alertContainer.innerHTML = alertMessage;  // Muestra el mensaje de alerta en el contenedor

        // Si la operación fue exitosa, realizar una acción adicional (ej. obtener categorías)
        if (result.success) {
            setTimeout(() => {
                // Selecciona el formulario correctamente
                const form = document.querySelector('#registerForm');  // Ajusta el selector
        
                // Verifica si el formulario existe antes de intentar resetearlo
                if (form) {
                    form.reset();  // Limpia todos los campos del formulario
                } else {
                    console.error("Formulario no encontrado.");
                }
        
                // Redirigir después de 3 segundos
                window.location.href = 'Productos.html';  // Redirige a la página deseada
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error:', error);  // Maneja cualquier error que ocurra en el proceso
    });
}
