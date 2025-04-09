document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos del menú
    const navLinks = document.querySelectorAll('.nav-links li');
    const userInfo = document.querySelector('#dropdownInformation ul li');
    // Función para cambiar de página
    function changePage(pageId) {
        // Ocultar todas las páginas
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        
        // Mostrar la página seleccionada
        document.getElementById(pageId).classList.add('active');
        
        // Actualizar el estado activo del menú
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        userInfo.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
    
   
        
    // Agregar event listeners a los elementos del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);

   
                       
            // Cerrar el menú hamburguesa en móviles si está abierto
            if (document.querySelector('.sidebar').classList.contains('active')) {
                toggleSidebar();
            }
            });
    });


    
    // Mostrar la página dashboard por defecto
    changePage('dashboard');
    
    // Función para el menú hamburguesa
    window.toggleSidebar = function() {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
        
    }
});

// Funciones para el modal de edición de perfil
function openModal() {
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveChanges() {
    // Aquí iría la lógica para guardar los cambios
    // Por ahora solo cerramos el modal
    closeModal();
    // Mostrar notificación de éxito
    showNotification('Cambios guardados correctamente', 'success');
}

function showNotification(message, type) {
    Swal.fire({
        title: message,
        icon: type,
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true
    });
}