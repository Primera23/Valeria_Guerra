export function cargarTallas(){
    fetch('/tallas')
    .then(response => response.json())
    .then(talla => mostrarTallas(talla))
    .catch(error => console.log(error));
}



export function cargarCategorias() {
    fetch('/categorias')
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));
}
export function cargarCategoria(categoria) {
   
    fetch(`/categoria/${categoria}`)
    .then(response => response.json())
    .then(unique => mostrarCategoria(unique))
       
    .catch(error => {
        console.error('Error al obtener la categoría:', error);
    })
}

export function mostrarTallas(talla){
    let lista = '';
    talla.forEach(talla => {
        lista +=`<option value="${talla.talla}">${talla.talla}</option>`;       
    }); 
    document.getElementById('talla').innerHTML = lista
}

export function mostrarData(data){
    let body = '';
    let lista = '<option selected>Selecciona</option>';
    for (var i = 0; i < data.length; i++) {
        body += `
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${i + 1}
                                </th>
                                <td class="px-6 py-4">
                                ${data[i].categoria}
                                </td>
                                <td class="px-6 py-4">
                                ${data[i].descripcion}
                                </td>
                                <td class="px-6 py-4">
                                <button class="btn btn-danger" onclick="eliminarCategoria('${data[i].categoria}')">Eliminar</button>
                                </td>
                                <td class="px-6 py-4">
                                <button class="btn btn-warning" onclick="actualizarCategoria('${data[i].categoria}')">Modificar</button>
                                </td>
            </tr>
            
`
       
        lista +=`<option value="${data[i].categoria}">${data[i].categoria}</option>`       
    }
    document.getElementById('data').innerHTML = body;
    document.getElementById('categoria2').innerHTML = lista;
                
}
          
  

        export function mostrarCategoria(unique) {
            
            let boton=''
            boton='<button class="btn btn-warning" onclick="actualizarCategoria(${categoria.categoria})">Modificar</button>'
            if (unique && unique.length > 0) {
                const categoria = unique[0];  // Usamos el primer elemento del arreglo
        
                // Llena el formulario con los datos
                document.getElementById('categoria1').value = categoria.categoria;
                document.getElementById('descripcion1').value = categoria.descripcion;
                document.getElementById('nuevoNombre').value = categoria.categoria;  // Esto está asignando el nombre actual de la categoría a 'nuevoNombre'
                
                // Muestra el modal
                
            } else {
                console.error('No se encontraron datos para la categoría:', unique);
            }
        
            document.getElementById('boton').innerHTML = boton;
            
        }
        
        
