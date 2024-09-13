class Producto {

    constructor (nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    }

    mostrarProducto() {
        let mensaje=`   <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <strong>Nombre: </strong>${this.nombre} <br>
                            <strong>Cantidad: </strong>${this.cantidad} <br>
                            <strong>Precio: </strong>${this.precio}<br>
                            <strong>Categoria: </strong>"<%= data[0].categoria1 %>"
                        </div>`;
        return mensaje;
    }
}