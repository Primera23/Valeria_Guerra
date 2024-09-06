class Producto {

    constructor (nombre, codigo, precio, categoria) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.precio = precio;
    this.categoria = categoria;
    }

    mostrarProducto() {
        let mensaje=`   <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <strong>Nombre: </strong>${this.nombre} <br>
                            <strong>Código: </strong>${this.codigo} <br>
                            <strong>Precio: </strong>${this.precio} <br>
                            <strong>Categoria: </strong>${this.categoria}
                        </div>`;
        return mensaje;
    }
}