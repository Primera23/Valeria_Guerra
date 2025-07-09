document.getElementById('registerForm').addEventListener('submit', function (e) {
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = this.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;

    if (!nombres || !apellidos || !email || !password) {
        e.preventDefault();
        Swal.fire('Campos incompletos', 'Todos los campos son obligatorios', 'warning');
        return;
    }

    if (!nameRegex.test(nombres) || !nameRegex.test(apellidos)) {
        e.preventDefault();
        Swal.fire('Nombre inválido', 'Los nombres y apellidos solo deben contener letras y espacios', 'error');
        return;
    }

    if (!emailRegex.test(email)) {
        e.preventDefault();
        Swal.fire('Correo inválido', 'El correo electrónico no tiene un formato válido', 'error');
        return;
    }

    if (password.length < 8 || 
        !/[A-Z]/.test(password) || 
        !/[0-9]/.test(password) || 
        !/[^A-Za-z0-9]/.test(password)) {
        e.preventDefault();
        Swal.fire('Contraseña débil', 'Asegúrate de cumplir con todos los requisitos de la contraseña', 'error');
        return;
    }
});
