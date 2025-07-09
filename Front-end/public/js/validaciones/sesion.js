document.getElementById('loginForm').addEventListener('submit', function (e) {
    const email = this.correo_electronico.value.trim();
    const password = this.password1.value;

    if (!email || !password) {
        e.preventDefault();
        Swal.fire('Campos vacíos', 'Por favor, completa todos los campos', 'warning');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        e.preventDefault();
        Swal.fire('Correo inválido', 'El formato del correo no es válido', 'error');
        return;
    }
});
