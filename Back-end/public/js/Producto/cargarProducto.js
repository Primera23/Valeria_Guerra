// productos 

export function cargarProducto() {
    fetch('/productos')
    .then(response => response.json())
    .then(productos => mostrarProducto(productos))
    .catch(error => console.log(error));
}


     

export function mostrarProducto(productos){
    let tabla = ''; 
   for (let i = 0; i < productos.length; i++) {
        const visible = productos[i].estado === 1;
        tabla += `
        
            
            
                    
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ${i + 1}
                                        </th>
                                        <td class="px-6 py-4">
                                        ${productos[i].id_categoria2}
                                        </td>
                                        <td class="px-6 py-4">
                                        ${productos[i].nombre}
                                        </td>
                                        <td class="px-6 py-4">
                                        ${productos[i].descripcion}
                                        </td>
                                        <td class="px-6 py-4">
                                        ${productos[i].precio}
                                        </td>
                                        <td class="px-6 py-4">
                                            <img src="/uploads/${productos[i].url_imagen}" alt="Imagen del producto" style="width: 50px; height: 50px;">
                                        </td>
                                        <td>
                                            <button class="btn btn-${visible ? 'success' : 'secondary'}" onclick="cambiarVisibilidadProducto('${productos[i].id_producto}', ${visible})">
                                                ${visible ? 'Visible' : 'Oculto'}
                                            </button>
                                        </td>
                                <td class="px-6 py-4">
                                <button class="btn btn-warning" onclick="actualizarProducto('${productos[i].id_producto}')">Modificar</button>
                                </td>
                                        
                                        
                    </tr>
                    
        
            
`
  
    }

    document.getElementById('tablaProducto').innerHTML =  tabla;
    

// Función global para mostrar el formulario de actualización
window.actualizarProducto = function (id) {
    fetch(`/productos/${id}`)
        .then(response => {
            console.log('Soy la vrg');
            if (!response.ok) {
                // Si la respuesta no es OK (ej. 404 Not Found), lanza un error
                throw new Error('Producto no encontrado o error en el servidor.');
            }
            
            return response.json();
        })
        .then(producto => mostrarFormularioEditarProducto(producto))
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            // Mostrar alerta de error al usuario usando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar el producto para editar. Intenta de nuevo.'
            });
        });
};

// Mostrar el modal con los datos del producto
function mostrarFormularioEditarProducto(producto) {
    const modal = document.getElementById('actualizarProducto');
    if (modal) modal.style.display = 'block';

    document.getElementById('nombreProducto').value = producto.nombre || '';
    document.getElementById('descripcionProducto').value = producto.descripcion || '';
    document.getElementById('precioProducto').value = producto.precio || '';
    // La categoría se establece después de cargar las opciones

    const contenedorBoton = document.getElementById('botonProducto');
    contenedorBoton.innerHTML = `
        <button type="button" class="btn btn-primary"
            onclick="guardarProductoModificado('${producto.id_producto}')">
            Actualizar
        </button>
    `;

    // Cargar categorías
    fetch('/categorias')
        .then(res => res.json())
        .then(categorias => {
            const select = document.getElementById('categoriaProducto');
            select.innerHTML = '';
            categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.categoria;
                option.textContent = cat.categoria;
                select.appendChild(option);
            });

            // Preseleccionar la categoría actual del producto después de cargar todas las opciones
            select.value = producto.id_categoria2;
        });
}


// Función para guardar los cambios del producto y recargar la página automáticamente
window.guardarProductoModificado = async function (id) {
    try {
        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;
        const precio = document.getElementById('precioProducto').value;
        const categoria = document.getElementById('categoriaProducto').value;

        const datos = {
            nombre,
            descripcion,
            precio,
            id_categoria2: categoria
        };

        const response = await fetch(`/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el producto.');
        }

        // Mostrar mensaje de éxito
        await Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El producto fue actualizado correctamente.',
            showConfirmButton: false
        });

        // Cerrar el modal (asegúrate de que esta función realmente cierra el modal)
        cerrarModalProducto();
        

        // Recargar la página inmediatamente después de cerrar el modal
        cargarProducto();

    } catch (error) {
        console.error('Error al guardar producto:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'No se pudo actualizar el producto. Intenta de nuevo.'
        });
    }
};

window.cerrarModalProducto = function () {
    const modal = document.getElementById('actualizarProducto');
    if (modal) modal.style.display = 'none';
};

                
}



