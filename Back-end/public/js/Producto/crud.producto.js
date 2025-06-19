import {cargarProducto } from  './cargarProducto.js';
import { crearProducto } from  './crearProducto.js';

cargarProducto()


document.getElementById('formularioPro').addEventListener('submit',crearProducto);

 
window.cargarProducto = cargarProducto;

window.cambiarVisibilidadProducto = async function(id_producto, visible) {
    try {
        const response = await fetch(`/producto/visibilidad/${id_producto}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: !visible })
        });
        if (response.ok) {
            cargarProducto();
        } else {
            alert('Error al cambiar visibilidad');
        }
    } catch (error) {
        alert('Error de red');
    }
};
