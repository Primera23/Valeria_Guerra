import { cargarCategorias, mostrarCategoria, mostrarData } from "./cargarCategorias.js";



export function actualizarCategoria(categoria) {
    const form = document.getElementById('container');
    
   
    fetch(`/categoria/${categoria}`)
        .then(response => response.json())
        .then(unique => {
            
            mostrarCategoria(unique);

            
            const modal = document.getElementById('actualizarCategoria');
            modal.style.display = 'block'; 
        })
        .catch(error => {
            console.error('Error al obtener la categoría:', error);
        });

   
    form.addEventListener('submit', (event) => {
        event.preventDefault();

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
                // Recargar las categorías después de la actualización
                fetch('/categorias')
                    .then(response => response.json())
                    .then(data => mostrarData(data))
                    .catch(error => console.log(error));
            }

            
            const modal = document.getElementById('actualizarCategoria');
            modal.style.display = 'none'; 
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
}


const closeModal = () => {
    const modal = document.getElementById('actualizarCategoria');
    modal.style.display = 'none';
}


document.querySelector('.close').addEventListener('click', closeModal);
