import {cargarProducto } from  './cargarProducto.js';
import { crearProducto } from  './crearProducto.js';

cargarProducto()


document.getElementById('formularioPro').addEventListener('submit',crearProducto);

 
window.cargarProducto = cargarProducto;
