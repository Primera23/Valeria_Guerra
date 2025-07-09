class AuthManager {
    static async checkAuth() {
        try {
            // 1. Verificar sesión
            const sessionResponse = await fetch('/check-session', {
                credentials: 'include'
            });
            
            if (!sessionResponse.ok) throw new Error('Error en sesión');
            
            const sessionData = await sessionResponse.json();

            if (!sessionData.loggedIn) {
                this.redirectToLogin();
                return;
            }

            // 2. Obtener datos del usuario
            const userResponse = await fetch('/protected', {
                credentials: 'include'
            });
            
            if (!userResponse.ok) throw new Error('Error en perfil');
            
            const userData = await userResponse.json();

            if (userData.success) {
                this.updateUI(userData.user);
            } else {
                throw new Error(userData.message || 'Error en datos de usuario');
            }

        } catch (error) {
            console.error('Error en autenticación:', error);
            this.redirectToLogin();
        }
    }

    static updateUI(user) {
        // Actualizar sidebar
        const sidebarName = document.getElementById('sidebar-nombre');

        if (sidebarName) sidebarName.textContent = user.nombre || 'Usuario';
        
        // Actualizar perfil
        const profileElements = {
            'nombre': user.nombre,
            'apellido': user.apellido,
            'email': user.correo_electronico,
            'documento': user.documento || '-',
            'genero': user.genero || '-',
            'fecha': user.fecha_nacimiento || '-',
            'telefono': user.telefono || '-'
        };

        for (const [id, value] of Object.entries(profileElements)) {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        }
    }

    static redirectToLogin() {
        sessionStorage.setItem('redirectUrl', window.location.pathname);
        window.location.href = 'index.html';
    }

    static async handleLogout() {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                // Limpiar cualquier dato de sesión del cliente
                sessionStorage.clear();
                // Redirigir al login
                window.location.href = 'https://localhost:3000/index.html';
            } else {
                throw new Error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error en logout:', error);
            // Aún así redirigir al login si hay error
            window.location.href = 'index.html';
        }
    }

    static init() {
        // Verificar si estamos en una página protegida
        const protectedPaths = ['dashboard-cli.html', 'categoria.html', 'productos.html'];
        if (protectedPaths.some(path => window.location.pathname.includes(path))) {
            document.addEventListener('DOMContentLoaded', () => this.checkAuth());
            
            // Manejar logout - ahora busca correctamente el elemento
            document.addEventListener('DOMContentLoaded', () => {
                const logoutBtn = document.querySelector('[data-page="cerrar"] a');
                
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.handleLogout();
                    });
                }
            });
        }
    }
}

AuthManager.init();