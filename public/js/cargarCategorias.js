import{eliminarCategoria} from './eliminarCategoria.js'
import{enviarFormulario}from './subirFormulario.js'
import {actualizarCategoria} from './actualizarCategoria.js'

export function cargarCategoria() {
    fetch('/categoria')
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));
}

export function cargarUsuarios() {
    fetch('/usuarios')
    .then(response => response.json())
    .then(usuarios => mostrarUsuarios(usuarios))
    .catch(error => console.log(error));
}

export function mostrarData(data){
    let body = '';
    var actualizar ='';
    let lista= '';
    for (var i = 0; i < data.length; i++) {
        body += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].categoria}</td>
            <td>${data[i].descripcion}</td>
            <td><button class="btn btn-danger" onclick="eliminarCategoria('${data[i].categoria}')">Eliminar</button></td>
            <td><a class="btn btn-white" href="#actualizarCategoria">Actualizar</a></td></tr>
`
        lista +=`
         <option value="${data[i].categoria}">${data[i].categoria}</option>`
        
         actualizar+=`
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="categoria" name="categoria" value='${data[i].categoria}' disabled>
                                    <label for="categoria">Categoria Actual</label>
                                </div>

                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control"  id="descripcion1" name="descripcion1" value='${data[i].descripcion}'>
                                    <label for="descripcion1">Descripcion</label>
                                </div>

                                <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="nuevoNombre" name="nuevoNombre" value='${data[i].categoria}'>
                                <label for="nuevoNombre">Nuevo Nombre</label>
                                </div>

                                <button class="btn btn-warning" onclick="actualizarCategoria('${data[i].categoria}')">Modificar</button>
                   `
        }
        
        document.getElementById('data').innerHTML = body
        document.getElementById('container').innerHTML = actualizar
        document.getElementById('categoriaselect').innerHTML = lista
            
        }
          
export function mostrarUsuarios(usuarios){
    let nombre =`${usuarios[0].nombre}`
    let permiso =`${usuarios[0].permiso2}`
    document.getElementById('nombre').innerHTML = nombre
    document.getElementById('permiso').innerHTML = permiso
}          
