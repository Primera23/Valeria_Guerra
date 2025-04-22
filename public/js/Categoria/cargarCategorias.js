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
    let lista = '<option selected>Selecciona</option>';
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
    // Verificar si hay datos y si es un array con elementos
    if (!unique || !Array.isArray(unique) || unique.length === 0) {
        console.error('No se encontraron datos para la categoría:', unique);
        return; // Salir de la función si no hay datos
    }

    const categoria = unique[0]; // Tomar el primer elemento del array

    try {
        // Llenar el formulario con los datos
        const categoriaInput = document.getElementById('categoria1');
        const descripcionInput = document.getElementById('descripcion1');
        const nuevoNombreInput = document.getElementById('nuevoNombre');
        
        if (categoriaInput) categoriaInput.value = categoria.categoria || '';
        if (descripcionInput) descripcionInput.value = categoria.descripcion || '';
        if (nuevoNombreInput) nuevoNombreInput.value = categoria.categoria || '';

        // Crear botón solo si existe el contenedor
        const botonContainer = document.getElementById('boton');
        if (botonContainer) {
            botonContainer.innerHTML = `
                <button class="btn btn-warning" onclick="actualizarCategoria('${categoria.categoria}')">
                    Modificar
                </button>
            `;
        }

    } catch (error) {
        console.error('Error al mostrar categoría:', error);
    }
}


        
        
