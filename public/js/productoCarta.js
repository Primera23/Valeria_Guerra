function cargarProductos() {
    fetch('/productos')
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));
}

function mostrarData(data) {
    let body = '';
    
    // Iteramos sobre cada producto en el array
    data.forEach(producto => {
        body += `
       
          <div   class="recipe" onclick="verDetalles('${producto.id}')">
            <div class="img">
              <img src="/uploads/${producto.url_imagen}" alt="${producto.nombre}">
              <div class="top-icons">
                <span class="icon cart">&#128722;</span>
                <span class="icon heart">&#10084;</span>
              </div>
            </div>
            <div class="info">
              <p class="product-name">${producto.nombre}</p>
              <p class="price">$${producto.precio}</p>
            </div>
          </div>
        


`;
    });
    
    document.getElementById('food').innerHTML = body;
}

document.addEventListener('DOMContentLoaded', cargarProductos);