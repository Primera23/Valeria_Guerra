let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-from');
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

const formulario = document.getElementById('rol-formulario');
const CampoRol = document.getElementById('rol');
const mensajeElement = document.getElementById('mensaje');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const rol = CampoRol.value.trim().toLowerCase();

    if (rol === 'administrador') {
        mensajeElement.textContent = 'Acceso como administrador concedido';
    } else if (rol === 'usuario') {
        mensajeElement.textContent = 'Acceso como usuario concedido';
    } else {
        mensajeElement.textContent = 'Rol no reconocido';
    }
});

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
