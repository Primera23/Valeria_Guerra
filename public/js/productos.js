 // Contador de productos en el carrito
 let cartCount = 0;
 const cartCounter = document.querySelector('.cart-counter');
 const cartBtn = document.getElementById('cart-btn');
 
 // Función para actualizar el contador
 function updateCartCount() {
   cartCounter.textContent = cartCount;
   cartCounter.style.display = cartCount > 0 ? 'flex' : 'none';
 }
 
 // Evento para los botones "Comprar"
 document.querySelectorAll('.buy-btn').forEach(button => {
   button.addEventListener('click', () => {
     cartCount++;
     updateCartCount();
     // Aquí podrías añadir la lógica para agregar el producto al carrito
   });
 });
 
  
 
 // Inicializar el contador
 updateCartCount();


 // Abrir modal
document.getElementById('cart-btn').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'flex';
});

// Cerrar modal
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none';
});

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('cartModal')) {
        document.getElementById('cartModal').style.display = 'none';
    }
});

 
// Mostrar detalles del producto
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.closest('.recipe').getAttribute('data-product-id');
        const product = products[productId];
        
        document.getElementById('detail-title').textContent = product.title;
        document.getElementById('detail-description').textContent = product.description;
        document.getElementById('detail-price').textContent = product.price;
        document.getElementById('detail-image').src = product.image;
        document.getElementById('detail-material').textContent = product.material;
        document.getElementById('detail-sizes').textContent = product.sizes;
        document.getElementById('detail-colors').textContent = product.colors;
        document.getElementById('detail-care').textContent = product.care;
        
        document.getElementById('productDetailModal').style.display = 'flex';
    });
});

// Cerrar modal de detalles
document.querySelector('.close-detail').addEventListener('click', function() {
    document.getElementById('productDetailModal').style.display = 'none';
});

// Cerrar al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('productDetailModal')) {
        document.getElementById('productDetailModal').style.display = 'none';
    }
});

 
 