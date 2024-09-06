document.getElementById ('formulario').addEventListener('submit',(event)=> {
    event.preventDefault();
    ValidaFormulario();
});

function ValidaFormulario() {
    let nombre = document.getElementById(`nombre`).value;
    let codigo = parseInt(document.getElementById(`codigo`).value);
    let precio = parseInt(document.getElementById(`precio`).value);
    let categoria = document.getElementById(`categoria`).value;
    let resultado;

    if(isNaN(codigo) || isNaN(precio)  || nombre==='' || categoria===''){
        document.getElementById('resultado').innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        Por favor, diligencie todos los campos correctamente 
      </div>`;
      return;
    }

    objPro = new Producto(nombre, codigo, precio, categoria);
    document.getElementById(`resultado`).innerHTML =`${objPro.mostrarProducto()

    }`
}