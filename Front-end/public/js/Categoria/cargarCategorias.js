export function cargarTallas(){
    fetch('/tallas')
    .then(response => response.json())
    .then(talla => mostrarTallas(talla))
    .catch(error => console.log(error));
}



export function cargarCategorias() {
    fetch('/categorias')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar categorías');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data); // Para depuración
        mostrarData(data);
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar mensaje de error al usuario
        document.getElementById('data').innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-red-500">
                    Error al cargar las categorías: ${error.message}
                </td>
            </tr>
        `;
    });
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

export function mostrarData(data) {
    let body = '';
    let lista = '<option selected>Selecciona</option>';
    
    // Verificamos que data sea un array
    if (!Array.isArray(data)) {
        console.error('Los datos recibidos no son un array:', data);
        return;
    }

    for (var i = 0; i < data.length; i++) {
        // Usamos id_categoria2 como identificador principal
        const categoriaNombre = data[i].categoria || 'Sin nombre';
        const descripcion = data[i].descripcion || 'Sin descripción';
        
        body += `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${i + 1}
                </th>
                <td class="px-6 py-4">
                    ${categoriaNombre}
                </td>
                <td class="px-6 py-4">
                    ${descripcion}
                </td>
                <td class="px-6 py-4">
                    <button class="btn btn-danger" onclick="eliminarCategoria('${categoriaNombre}')">Eliminar</button>
                </td>
                <td class="px-6 py-4">
                    <button class="btn btn-warning" onclick="actualizarCategoria('${categoriaNombre}')">Modificar</button>
                </td>
            </tr>
        `;
       
        lista += `<option value="${categoriaNombre}">${categoriaNombre}</option>`;       
    }
    
    // Solo actualizamos el DOM si los elementos existen
    const dataElement = document.getElementById('data');
    const categoria2Element = document.getElementById('categoria2');
    
    if (dataElement) dataElement.innerHTML = body;
    if (categoria2Element) categoria2Element.innerHTML = lista;
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


        
        
