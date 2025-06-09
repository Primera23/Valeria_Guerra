import { API_BASE_URL } from './config.js'; 
// --- VARIABLES GLOBALES ---

let carrito = [];

// --- FUNCIONES DE INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    
    // Inicializar event listeners del carrito
    document.getElementById('checkout-btn')?.addEventListener('click', procesarPago);
    document.querySelector('.close-modal')?.addEventListener('click', cerrarModal);
    
    // Listener para cerrar modales al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('productoModal');
        if (event.target === modal) {
            cerrarModal();
        }
    });
});

// --- FUNCIONES DE CATEGORÍAS Y PRODUCTOS ---
function cargarCategorias() {
    fetch(`${API_BASE_URL}/categorias`)
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar categorías');
        return response.json();
    })
    .then(categorias => {
        if (!Array.isArray(categorias)) throw new Error('La respuesta no es un array');
        mostrarCategorias(categorias);
        cargarProductos();
    })
    .catch(error => {
        console.error('Error al cargar categorías:', error);
        mostrarError('Error al cargar las categorías');
    });
}

function mostrarCategorias(categorias) {
    const container = document.getElementById('filtros');
    if (!container) return console.error('No se encontró el contenedor con id "filtros"');

    let body = '<button class="filtro-btn active" data-filtro="Todos">Todos</button>';
    
    categorias.forEach(categoria => {
        if (!categoria.categoria) return console.warn('Categoría con datos incompletos:', categoria);
        body += `<button class="filtro-btn" data-filtro="${categoria.categoria}">${categoria.categoria}</button>`;
    });
    
    container.innerHTML = body;

    container.querySelectorAll('.filtro-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            cargarProductos(this.getAttribute('data-filtro'));
        });
    });
}

function cargarProductos(categoria = 'Todos') {
    
    if (categoria && categoria !== 'Todos') url += `?categoria=${encodeURIComponent(categoria)}`;

    const container = document.getElementById('food');
    if (container) container.innerHTML = '<div class="loader">Cargando productos...</div>';

    fetch(`${API_BASE_URL}/productos`)	
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar productos');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('La respuesta no es un array');
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            mostrarError('Error al cargar los productos');
        });
}

function mostrarProductos(productos) {
    const container = document.getElementById('food');
    if (!container) return console.error('No se encontró el contenedor con id "food"');

    if (productos.length === 0) {
        container.innerHTML = '<p class="no-products">No se encontraron productos en esta categoría</p>';
        return;
    }

    container.innerHTML = productos.map(producto => {
        if (!producto.id_producto || !producto.nombre) {
            console.warn('Producto con datos incompletos:', producto);
            return '';
        }
        return `
        <div class="recipe" data-id="${producto.id_producto}">
            <div class="img">
                <img src="${API_BASE_URL}/uploads/${producto.url_imagen || 'default.jpg'}" alt="${producto.nombre}">
                <div class="top-icons">
                    <span class="icon cart">&#128722;</span>
                    <span class="icon heart">&#10084;</span>
                </div>
            </div>
            <div class="info">
                <p class="product-name">${producto.nombre}</p>
                <p class="price">$${producto.precio || '0.00'}</p>
            </div>
        </div>`;
    }).join('');

     container.querySelectorAll('.recipe').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            abrirModalProducto(id);
        });
    });
}

// --- FUNCIONES DEL MODAL DE PRODUCTO ---
function abrirModalProducto(idProducto) {
    if (!idProducto) return console.error('ID de producto no proporcionado');

    fetch(`${API_BASE_URL}/productos/${idProducto}`)
        .then(response => {
            if (!response.ok) throw new Error('Producto no encontrado');
            return response.json();
        })
        .then(producto => {
            const modal = document.getElementById('productoModal');
            if (!modal) throw new Error('No se encontró el modal');

            const modalImg = document.getElementById('modalImagen');
            const modalNombre = document.getElementById('modalNombre');
            const modalPrecio = document.getElementById('modalPrecio');
            const modalDesc = document.getElementById('modalDescripcion');
            const btnAddToCart = document.querySelector('.btn-add-to-cart');

            if (!modalImg || !modalNombre || !modalPrecio || !modalDesc || !btnAddToCart) {
                throw new Error('Elementos del modal no encontrados');
            }

            modalImg.src = `${API_BASE_URL}/uploads/${producto.url_imagen || 'default.jpg'}`;
            modalImg.alt = producto.nombre || 'Producto';
            modalNombre.textContent = producto.nombre || 'Nombre no disponible';
            modalPrecio.textContent = `$${producto.precio || '0.00'}`;
            modalDesc.textContent = producto.descripcion || 'Descripción no disponible';

            btnAddToCart.setAttribute('data-id', producto.id_producto);
            btnAddToCart.onclick = function() {
                agregarAlCarrito(
                    producto.id_producto,
                    producto.nombre,
                    producto.precio,
                    producto.url_imagen
                );
                cerrarModal();
            };

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error al cargar el producto:', error);
            mostrarError('No se pudo cargar la información del producto');
        });
}

function cerrarModal() {
    const modal = document.getElementById('productoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- FUNCIONES DEL CARRITO ---
function agregarAlCarrito(id, nombre, precio, imagen) {	
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito-items-lateral');
    const totalContainer = document.getElementById('total-price');
    if (!carritoContainer || !totalContainer) return;

    carritoContainer.innerHTML = carrito.map(item => `
        <div style="display:flex;align-items:center;margin-bottom:10px;">
          <img src="${API_BASE_URL}/uploads/${item.imagen || 'default.jpg'}" alt="${item.nombre}" style="width:40px;height:40px;object-fit:cover;margin-right:10px;">
          <div>
            <div>${item.nombre} x${item.cantidad}</div>
            <div>$${(item.precio * item.cantidad).toFixed(2)}</div>
          </div>
        </div>`
    ).join('');

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalContainer.innerText = total.toFixed(2);
}

// --- FUNCIONES DE PAGO CON MERCADOPAGO ---
async function procesarPago() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const btnPago = document.getElementById('checkout-btn');
    btnPago.disabled = true;
    btnPago.textContent = 'Procesando...';

    try {
        const response = await fetch(`${API_BASE_URL}/crear-orden`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: carrito,
                total: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
            })
        });

        const data = await response.json();
    
    if (!response.ok || !data.result) {
        throw new Error(data.message || 'Error al crear la orden');
    }

        const { preferenceId } = await response.json();
        
        // Cargar SDK de MercadoPago si no está cargado
        if (typeof MercadoPago === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.onload = () => iniciarCheckoutMercadoPago(preferenceId);
            document.body.appendChild(script);
        } else {
            iniciarCheckoutMercadoPago(preferenceId);
        }
    } catch (error) {
        console.error('Error en el proceso de pago:', error);
        alert(error.message || 'Error al procesar el pago');
        btnPago.disabled = false;
        btnPago.textContent = 'IR A PAGAR';
    }
}

function iniciarCheckoutMercadoPago(preferenceId) {
    const mp = new MercadoPago('TU_CLAVE_PUBLICA_DE_MERCADOPAGO', {
        locale: 'es-AR'
    });

    mp.checkout({
        preference: { id: preferenceId },
        autoOpen: true,
        render: {
            container: '#checkout-btn',
            label: 'Pagar con MercadoPago'
        }
    });
}

// --- FUNCIÓN PARA MOSTRAR ERRORES ---
function mostrarError(mensaje) {
    const container = document.getElementById('food') || document.body;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = mensaje;
    container.appendChild(errorElement);
    
    setTimeout(() => errorElement.remove(), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = cartModal?.querySelector('.close-modal');

  if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', () => {
      cartModal.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
});