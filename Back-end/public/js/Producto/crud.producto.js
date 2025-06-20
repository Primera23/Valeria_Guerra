import {cargarProducto } from  './cargarProducto.js';
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
            cargarProducto();
            alert('Visibilidad cambiada correctamente');
        } else {
            alert('Error al cambiar visibilidad');
        }
    } catch (error) {
        alert(`Cambiando visibilidad del producto ${error}`);
    }
};
