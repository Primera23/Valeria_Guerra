import {cargarProducto, } from  './cargarProducto.js';
import { crearProducto } from  './crearProducto.js';

cargarProducto()


document.getElementById('formularioPro').addEventListener('submit',crearProducto);

 
window.cargarProducto = cargarProducto;


window.cambiarVisibilidadProducto = async function(id_producto, visible) {
    try {
        console.log(`Cambiando visibilidad del producto ${id_producto}`);
        const response = await fetch(`/producto/visibilidad/${id_producto}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: !visible })
        });

        if (response.ok) {
            await cargarProducto();
            Swal.fire({
                icon: 'success',
                title: 'Visibilidad actualizada',
                text: 'El estado del producto ha sido cambiado correctamente',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cambiar la visibilidad del producto',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: `Ocurrió un problema: ${error.message}`
        });
    }
};

