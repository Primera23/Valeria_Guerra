document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
});

// Función para cargar las categorías desde el backend
function cargarCategorias() {
    fetch('/categorias')
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar categorías');
        return response.json();
    })
    .then(categorias => {
        if (!Array.isArray(categorias)) {
            throw new Error('La respuesta no es un array');
        }
        mostrarCategorias(categorias);
        // Cargar todos los productos inicialmente
        cargarProductos();
    })
    .catch(error => {
        console.error('Error al cargar categorías:', error);
        mostrarError('Error al cargar las categorías');
    });
}

// Función para mostrar las categorías como botones de filtro
function mostrarCategorias(categorias) {
    const container = document.getElementById('filtros');
    if (!container) {
        console.error('No se encontró el contenedor con id "filtros"');
        return;
    }

    // Botón "Todos" siempre visible
    let body = '<button class="filtro-btn active" data-filtro="Todos">Todos</button>';
    
    // Agregar cada categoría como botón
    categorias.forEach(categoria => {
        if (!categoria.categoria) {
            console.warn('Categoría con datos incompletos:', categoria);
            return;
        }

        body += `<button class="filtro-btn" data-filtro="${categoria.categoria}">${categoria.categoria}</button>`;
    });
    
    container.innerHTML = body;

    // Agregar event listeners a los botones de filtro
    container.querySelectorAll('.filtro-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones
            document.querySelectorAll('.filtro-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase 'active' al botón clickeado
            this.classList.add('active');
            
            const filtro = this.getAttribute('data-filtro');
            cargarProductos(filtro);
        });
    });
}

// Función para cargar productos (con o sin filtro)
function cargarProductos(categoria = 'Todos') {
    let url = '/productos';
    if (categoria && categoria !== 'Todos') {
        url += `?categoria=${encodeURIComponent(categoria)}`;
    }

    // Mostrar loader mientras se cargan los productos
    const container = document.getElementById('food');
    if (container) container.innerHTML = '<div class="loader">Cargando productos...</div>';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar productos');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('La respuesta no es un array');
            }
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            mostrarError('Error al cargar los productos');
        });
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
    const container = document.getElementById('food');
    if (!container) {
        console.error('No se encontró el contenedor con id "food"');
        return;
    }

    if (productos.length === 0) {
        container.innerHTML = '<p class="no-products">No se encontraron productos en esta categoría</p>';
        return;
    }

    let body = '';
    
    productos.forEach(producto => {
        // Validar datos mínimos del producto
        if (!producto.id_producto || !producto.nombre) {
            console.warn('Producto con datos incompletos:', producto);
            return;
        }

        body += `
        <div class="recipe" onclick="abrirModalProducto(${producto.id_producto})">
            <div class="img">
                <img src="/uploads/${producto.url_imagen || 'default.jpg'}" alt="${producto.nombre}">
                <div class="top-icons">
                    <span class="icon cart">&#128722;</span>
                    <span class="icon heart">&#10084;</span>
                </div>
            </div>
            <div class="info">
                <p class="product-name">${producto.nombre}</p>
                <p class="price">$${producto.precio ||  '0.00'}</p>
            </div>
        </div>`;
    });
    
    container.innerHTML = body;
}

// Función para mostrar errores al usuario
function mostrarError(mensaje) {
    const container = document.getElementById('food') || document.body;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = mensaje;
    container.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Funciones del modal (pueden permanecer igual que antes)
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

            // Actualizar contenido del modal
            document.getElementById('modalImagen').src = `/uploads/${producto.url_imagen || 'default.jpg'}`;
            document.getElementById('modalNombre').textContent = `${producto.nombre}` || 'Nombre no disponible';
            document.getElementById('modalPrecio').textContent = `${producto.precio}` ||  '0.00';
            document.getElementById('modalDescripcion').textContent = producto.descripcion || 'Descripción no disponible';

            // Mostrar el modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error al cargar el producto:', error);
            mostrarError('No se pudo cargar la información del producto');
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

// Event listeners para el modal
document.querySelector('.close-modal')?.addEventListener('click', cerrarModal);
window.addEventListener('click', (event) => {
    const modal = document.getElementById('productoModal');
    if (event.target === modal) {
        cerrarModal();
    }
});