export function cargarVendido() {
    fetch('/productos')
    .then(response => response.json())
    .then(productos => mostrarProducto(productos))
    .catch(error => console.log(error));
}