
import { cargarCategoria,mostrarData } from "./cargarCategorias.js";

export function eliminarCategoria(categoria){
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la categoría "${categoria}"?`);
    if(confirmacion){
        fetch(`/categoria/${categoria}`,{   
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
    }
    }
    

cargarCategoria()




