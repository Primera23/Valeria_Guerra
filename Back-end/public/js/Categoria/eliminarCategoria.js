
import { cargarCategorias,mostrarData } from "./cargarCategorias.js";

export function eliminarCategoria(categoria) {
    // Muestra el Swal de confirmación
    const confirmacion = Swal.fire({
      title: `¿Estás seguro de querer eliminar la categoría ${categoria}?`,
      text: "No podrás deshacer esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Elimínala!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si el usuario confirma la eliminación
      if (result.isConfirmed) {
        // Realiza el fetch para eliminar la categoría
        fetch(`/categoria/${categoria}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result => {
          const alertContainer = document.getElementById('alertContainer');
          alertContainer.innerHTML = '';
  
          const alertType = result.success ? 'alert-success' : 'alert-danger';
          const alertMessage = `<div class="alert ${alertType} alert-dismissible fade show" role="alert">${result.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
          alertContainer.innerHTML = alertMessage;
  
          // Si la eliminación fue exitosa, recarga las categorías
          if (result.success) {
            fetch('/categorias')
              .then(response => response.json())
              .then(data => mostrarData(data)) // Supongo que tienes una función mostrarData que muestra las categorías
              .catch(error => console.log(error));
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
  
        // Muestra un Swal de éxito después de la eliminación
        Swal.fire({
          title: "¡Eliminado!",
          text: "La categoría ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }




