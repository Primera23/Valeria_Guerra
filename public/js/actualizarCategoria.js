import { cargarCategoria, mostrarData } from "./cargarCategorias.js";
import { eliminarCategoria } from './eliminarCategoria.js';
import { enviarFormulario } from './subirFormulario.js';

export function actualizarCategoria(categoria) {
    const form = document.getElementById('container');

    // Asegúrate de que el evento solo se registre una vez
    
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            // Obtener los valores de los campos de entrada
            const nuevoNombre = form.querySelector('#nuevoNombre').value; // Asegúrate de que el ID es correcto
            const descripcion1 = form.querySelector('#descripcion1').value; // Asegúrate de que el ID es correcto

            fetch(`/categoria/${categoria}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    nuevoNombre,
                    descripcion1
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(result => {
                const alertContainer = document.getElementById('aja');
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
                console.error('Error:', error.message);
            });
        });

        // Marcar el listener como agregado
        
    }


// Cargar categorías al inicio
cargarCategoria();
