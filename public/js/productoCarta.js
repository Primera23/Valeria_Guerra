document.addEventListener('DOMContentLoaded', cargarProductos);

function cargarProductos() {
    fetch('/productos')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar productos');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('La respuesta no es un array');
            }
            mostrarData(data);
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            alert('Error al cargar los productos');
        });
}

function mostrarData(data) {
    const container = document.getElementById('food');
    if (!container) {
        console.error('No se encontró el contenedor con id "food"');
        return;
    }

    let body = '';
    
    data.forEach(producto => {
        if (!producto.id_producto || !producto.url_imagen) {
            console.warn('Producto con datos incompletos:', producto);
            return;
        }

        body += `
        <div class="recipe" onclick="abrirModalProducto(${producto.id_producto})">
            <div class="img">
                <img src="/uploads/${producto.url_imagen || 'default.jpg'}" alt="${producto.nombre || 'Producto'}">
                <div class="top-icons">
                    <span class="icon cart">&#128722;</span>
                    <span class="icon heart">&#10084;</span>
                </div>
            </div>
            <div class="info">
                <p class="product-name">${producto.nombre || 'Nombre no disponible'}</p>
                <p class="price">$${producto.precio || '0.00'}</p>
            </div>
        </div>`;
    });
    
    container.innerHTML = body;
}

function abrirModalProducto(idProducto) {
    if (!idProducto) {
        console.error('ID de producto no proporcionado');
        return;
    }

    fetch(`/productos/${idProducto}`)
        .then(response => {
            if (!response.ok) throw new Error('Producto no encontrado');
            return response.json();
        })
        .then(producto => {
            const modal = document.getElementById('productoModal');
            if (!modal) {
                throw new Error('No se encontró el modal');
            }

            const modalImg = document.getElementById('modalImagen');
            const modalNombre = document.getElementById('modalNombre');
            const modalPrecio = document.getElementById('modalPrecio');
            const modalDesc = document.getElementById('modalDescripcion');

            if (!modalImg || !modalNombre || !modalPrecio || !modalDesc) {
                throw new Error('Elementos del modal no encontrados');
            }

            // Actualizar contenido del modal con valores por defecto si es necesario
            modalImg.src = `/uploads/${producto.url_imagen || 'default.jpg'}`;
            modalImg.alt = producto.nombre || 'Producto';
            modalNombre.textContent = producto.nombre || 'Nombre no disponible';
            modalPrecio.textContent = `$${producto.precio || '0.00'}`;
            modalDesc.textContent = producto.descripcion || 'Descripción no disponible';

            // Mostrar el modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error al cargar el producto:', error);
            alert('No se pudo cargar la información del producto');
        });
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('productoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Evento para cerrar el modal al hacer clic en la X
document.querySelector('.close-modal')?.addEventListener('click', cerrarModal);

// Evento para cerrar el modal al hacer clic fuera
window.addEventListener('click', (event) => {
    const modal = document.getElementById('productoModal');
    if (event.target === modal) {
        cerrarModal();
    }
});