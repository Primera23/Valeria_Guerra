document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const resultado = document.getElementById('resultad');

    formulario.addEventListener('submit', (event) => {
        if (!ValidaFormulario()) {
            event.preventDefault(); 
            resultado.innerHTML = `<div class="alert alert-danger" role="alert">
            Termine el formulario
            </div>`;// Previene el envío del formulario si la validación falla
        }
        else{
            alert('Producto ingresado con exito');
            resultado.innerHTML = `<div class="alert alert-primary" role="alert">
            Producto ingresado con exito
            </div>`;
        }
    });

    function ValidaFormulario() {
        let nombre = document.getElementById('Nombre_Producto').value;
        let cantidad = parseInt(document.getElementById('cantidad').value, 10);
        let precio = parseInt(document.getElementById('precio').value, 10);
        let categoria = document.getElementById('categoria').value;

        const regexNombre = /^[A-Za-zÀ-ÿ\s]+$/;

        if (nombre === '') {
            resultado.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <p>Nombre está mal digitado o vacío</p>
            </div>`;
            return false;
        }

        if (!regexNombre.test(nombre)) {
            resultado.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <p>Nombre no puede tener números</p>
            </div>`;
            return false;
        }

        if (cantidad <= 0 || isNaN(cantidad)) {
            resultado.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <p>Cantidad debe ser un número positivo</p>
            </div>`;
            return false;
        }

        if (precio <= 0 || isNaN(precio)) {
            resultado.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <p>Precio debe ser un número positivo</p>
            </div>`;
            return false;
        }
        return true;
    }
});

