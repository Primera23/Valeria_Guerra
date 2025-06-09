import { cargarCategorias, mostrarCategoria, mostrarData } from "../Categoria/cargarCategorias.js";



export function actualizarCategoria(categoria) {
    // Obtener referencias a los elementos
    const modal = document.getElementById('actualizarCategoria');
    const form = document.getElementById('categoriaForm'); // Cambié el ID del formulario
    const closeBtn = document.querySelector('#actualizarCategoria .close');
    
    // Función para mostrar el modal
    const showModal = () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previene el scroll
    };
    
    // Función para cerrar el modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaura el scroll
    };
    
    // Cargar datos de la categoría
    fetch(`/categoria/${categoria}`)
        .then(response => response.json())
        .then(unique => {
            // Llenar los campos del formulario
                mostrarCategoria(unique);
            
            // Mostrar el modal
            showModal();
        })
        .catch(error => {
            console.error('Error al obtener la categoría:', error);
        });
    
    // Manejar el cierre del modal
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Manejar el envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nuevoNombre = form.querySelector('#nuevoNombre').value;
        const descripcion1 = form.querySelector('#descripcion1').value;
        
        fetch(`/categoria/${categoria}`, {
            method: 'PATCH',
            body: JSON.stringify({ nuevoNombre, descripcion1 }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(result => {
            const alertContainer = document.getElementById('aja');
            alertContainer.innerHTML = '';
            
            const alertType = result.success ? 'alert-success' : 'alert-danger';
            const alertMessage = `
                <div class="alert ${alertType} alert-dismissible fade show" role="alert">
                    ${result.message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            alertContainer.innerHTML = alertMessage;
            
            if (result.success) {
                // Recargar las categorías después de la actualización
                fetch('/categorias')
                    .then(response => response.json())
                    .then(data => mostrarData(data))
                    .catch(error => console.log(error));
                
                // Cerrar el modal después de 1.5 segundos
                setTimeout(closeModal, 1500);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
}
