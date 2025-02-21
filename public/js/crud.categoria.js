import{cargarCategoria, cargarCategorias,mostrarData,mostrarCategoria} from './cargarCategorias.js';
import{crearCategoria}from './crearCategoria.js'
import{eliminarCategoria} from './eliminarCategoria.js'
import { actualizarCategoria } from './actualizarCategoria.js';
cargarCategorias()




    document.getElementById('formularioCate').addEventListener('submit',crearCategoria);

    window.eliminarCategoria = eliminarCategoria;
    window.actualizarCategoria = actualizarCategoria;
    window.cargarCategoria = cargarCategoria;
    




