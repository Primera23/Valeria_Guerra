import{cargarCategoria,mostrarData,cargarUsuarios,mostrarUsuarios} from './cargarCategorias.js';
import{enviarFormulario}from './subirFormulario.js'
import{eliminarCategoria} from './eliminarCategoria.js'
import { actualizarCategoria } from './actualizarCategoria.js';
cargarUsuarios();
cargarCategoria()


    document.getElementById('formularioCate').addEventListener('submit',enviarFormulario);

    window.eliminarCategoria = eliminarCategoria;
    window.actualizarCategoria = actualizarCategoria;
    




