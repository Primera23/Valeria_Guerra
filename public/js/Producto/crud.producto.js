import {cargarProducto } from  './cargarProducto.js';
import { crearProducto } from  './crearProducto.js';
import {abrirModalProducto }from './detallesProductos.js'
cargarProducto()
abrirModalProducto()

document.getElementById('formularioPro').addEventListener('submit',crearProducto);

 
window.cargarProducto = cargarProducto;
window.abrirModalProducto= abrirModalProducto;