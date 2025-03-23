
var modal = document.getElementById("modal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModal");

// Cuando el usuario hace clic en el botón, abre o cierra el modal
btn.onclick = function() {
    if (modal.style.display === "block") {
        modal.style.display = "none"; // Cierra el modal si ya está abierto
        btn.classList.remove("active"); // Restaura la imagen
    } else {
        modal.style.display = "block"; // Abre el modal
        btn.classList.add("active"); // Oscurece la imagen
    }
}

// Cuando el usuario hace clic fuera del modal, cierra el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        btn.classList.remove("active"); // Restaura la imagen
    }
}

