import { cargarCategoria, mostrarData } from "./cargarCategorias.js";
import { eliminarCategoria } from './eliminarCategoria.js';
import { enviarFormulario } from './subirFormulario.js';

export function actualizarCategoria(categoria) {
    const form = document.getElementById('container');

    
    
        form.addEventListener('submit', (event) => {
            // event.preventDefault();

           
            const nuevoNombre = form.querySelector('#nuevoNombre').value; 
            const descripcion1 = form.querySelector('#descripcion1').value; 

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

        
    }


// Cargar categorías al inicio
cargarCategoria();
