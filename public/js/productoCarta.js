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
        <div class="recipe">
            <div class="img">
                <img src="ImagenesProyecto/${producto.url_imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
            </div>
            <div class="buttons">
                <button class="buy-btn">Comprar</button>
                <button class="details-btn">Detalles</button>
            </div>
        </div>`;
    });
    
    document.getElementById('food').innerHTML = body;
}

document.addEventListener('DOMContentLoaded', cargarProductos);