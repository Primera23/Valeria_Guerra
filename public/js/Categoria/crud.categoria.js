import{cargarCategoria, cargarCategorias,mostrarData,mostrarCategoria,cargarTallas} from './cargarCategorias.js';
import{crearCategoria}from './crearCategoria.js'
import{eliminarCategoria} from './eliminarCategoria.js'
import { actualizarCategoria } from './actualizarCategoria.js';
cargarTallas()
cargarCategorias()





    document.getElementById('formularioCate').addEventListener('submit',crearCategoria);
    

    window.eliminarCategoria = eliminarCategoria;
    window.actualizarCategoria = actualizarCategoria;
    window.cargarCategoria = cargarCategoria;
    window.cargarTallas = cargarTallas;
    




