// productos 

export function cargarProducto() {
    fetch('/productos')
    .then(response => response.json())
    .then(productos => mostrarProducto(productos))
    .catch(error => console.log(error));
}


export function mostrarProducto(productos){
    let tabla = ''; 
    for (var i = 0; i < productos.length; i++) {
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
                                         <td class="px-6 py-4">
                                <button class="btn btn-danger" onclick="eliminarCategoria('${productos[i].id_categoria2}')">Eliminar</button>
                                </td>
                                <td class="px-6 py-4">
                                <button class="btn btn-warning" onclick="actualizarCategoria('${productos[i].id_categoria2}')">Modificar</button>
                                </td>
                                        
                                        
                    </tr>
                    
        
            
`
  
    }

    document.getElementById('tablaProducto').innerHTML =  tabla;
    
                
}



