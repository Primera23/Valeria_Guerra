import { API_BASE_URL } from '../config.js';
class AuthModalManager {
    static async checkAuth(showLogin = false) {
        try {
            // 1. Verificar sesión
            const sessionResponse = await fetch(`${API_BASE_URL}/check-session`, {
                credentials: 'include'
            });
            
            if (!sessionResponse.ok) throw new Error('Error en sesión');
            
            const sessionData = await sessionResponse.json();

            if (!sessionData.loggedIn) {
                if (showLogin) {
                    this.showLoginModal();
                }
                return false;
            }

            // 2. Obtener datos del usuario
            const userResponse = await fetch(`${API_BASE_URL}/protected`, {
                credentials: 'include'
            });
            
            if (!userResponse.ok) throw new Error('Error en perfil');
            
            const userData = await userResponse.json();

            if (userData.success) {
                this.setupUserModal(userData.user);
                return true;
            } else {
                throw new Error(userData.message || 'Error en datos de usuario');
            }

        } catch (error) {
            console.error('Error en autenticación:', error);
            if (showLogin) {
                this.showLoginModal();
            }
            return false;
        }
    }

    static setupUserModal(user) {
        const loginModal = document.getElementById('inicioSesion');
        const userModal = document.getElementById('modal');
        
        if (loginModal) loginModal.style.display = 'none';
        if (userModal) {
            

                
                
            
            const userInfo = userModal.querySelector('.user-info');
            if (userInfo) {
                userInfo.innerHTML = `
                    <p>${user.nombre || 'Usuario'}</p>
                    <p>${user.correo_electronico || 'Correo no disponible'}</p>
                `;
            }
        }
    }

    static showLoginModal() {
        this.hideAllModals();
        const loginModal = document.getElementById('inicioSesion');
        const btn = document.getElementById("openModal");
        
        if (loginModal) {
            loginModal.style.display = 'block';
            
                loginModal.style.opacity = '1';
                loginModal.style.pointerEvents = 'auto';
            
        }
        if (btn) btn.classList.remove("active");
    }

    static showRegisterModal() {
        this.hideAllModals();
        const registerModal = document.getElementById('registrarse');
        if (registerModal) {
            registerModal.style.display = 'block';
            
                registerModal.style.opacity = '1';
                registerModal.style.pointerEvents = 'auto';
            
        }
    }
    
    static showAdminModal() {
        this.hideAllModals();
        const adminModal = document.getElementById('sesionAdministrador');
        if (adminModal) {
            adminModal.style.display = 'block';
            
                adminModal.style.opacity = '1';
                adminModal.style.pointerEvents = 'auto';
            
        }
    }

    static showRecoverPModal() {
        this.hideAllModals();
        const recoverPModal = document.getElementById('olvidarContra');
        if (recoverPModal) {
            recoverPModal.style.display = 'block';
            
                recoverPModal.style.opacity = '1';
                recoverPModal.style.pointerEvents = 'auto';
            
        }
    }
    
    static hideAllModals() {
        const modals = ['inicioSesion', 'registrarse', 'sesionAdministrador', 'modal','olvidarContra'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.opacity = '0'; // Inicia fade-out
                
                    modal.style.display = 'none'; // Oculta después de 4 segundos (demasiado largo)
                    modal.style.pointerEvents = 'none';
                 // ← Este era el problema principal
            }
        });
    }

    static async handleLogout() {
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = 'index.html';
            } else {
                throw new Error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error en logout:', error);
            this.showLoginModal();
        }
    }

    static initModalEvents() {
        const btn = document.getElementById("openModal");
        const userModal = document.getElementById("modal");
        const loginModal = document.getElementById("inicioSesion");
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const adminForm = document.getElementById('adminForm')
        
        const resetPasswordForm = document.getElementById('resetForm');
        // Botón principal que alterna modales
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (userModal && userModal.style.display === 'block') {
                    userModal.style.display = 'none';
                    btn.classList.remove("active");
                } else {
                    if (userModal && loginModal) {
                        const userInfo = userModal.querySelector('.user-info p');
                        if (userInfo && userInfo.textContent !== 'Nombre del Usuario') {
                            userModal.style.display = 'block';
                            
                
                        userModal.style.opacity = '1';
                        userModal.style.pointerEvents = 'auto';
                            btn.classList.add("active");
                        } else {
                            this.showLoginModal();
                        }
                    }
                }
            });
        }

        

        // Cerrar modales al hacer click fuera
        window.addEventListener('click', (e) => {
            ['inicioSesion', 'registrarse', 'sesionAdministrador', 'modal','olvidarContra'].forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal && e.target === modal) {
                    this.hideAllModals();
                }
            });
        });

        document.querySelectorAll('a[href="#olvidarContra"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRecoverPModal();
            });
        });

        document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.hideAllModals();
            }
        });
        // Cerrar modales con botón X
        document.querySelectorAll('.modalmask .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAllModals();
            });
        });

        // Manejar enlaces entre modales
        document.querySelectorAll('a[href="#inicioSesion"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        });

        document.querySelectorAll('a[href="#registrarse"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegisterModal();
            });
        });

        document.querySelectorAll('a[href="#sesionAdministrador"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAdminModal();
            });
        });

        const configBtn = document.querySelector('.config-btn');
        if (configBtn) {
            configBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = "https://localhost:3001/dashboard-cli.html";  // Cambia la ruta si tu archivo está en otra carpeta
            });
        }

        // Formulario de login
        if (loginForm) {
            loginForm.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(loginForm);
                const credentials = {
                    correo_electronico: formData.get('correo_electronico'),
                    password1: formData.get('password1')
                };
            
                fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials),
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                    const alertContainer = document.getElementById('aja');
                    if (alertContainer) {
                        const isSuccess = data.result;
                        const alertClass = isSuccess 
                            ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400' 
                            : 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400';
                        const alertIcon = isSuccess ? 'Success' : 'Danger';
                
                        alertContainer.innerHTML = `
                            <div class="p-4 mb-4 text-[15px] rounded-lg ${alertClass}" role="alert">
                                <span class="font-medium"></span> ${data.message}
                            </div>`;
                    }

                    if (data.result) {
                        fetch(`${API_BASE_URL}/protected`, {
                            credentials: 'include', // Esto es crucial
                            headers: {
                                'Content-Type': 'application/json',
                                // 'Authorization': `Bearer ${token}` // Si usas JWT
                            }
                        })
                        .then(response => {
                    if (response.status === 401) {
                        // Sesión no válida, forzar nuevo login
                        throw new Error('La sesión ha expirado');
                    }
                    if (!response.ok) throw new Error('Error al obtener perfil');
                    return response.json();
                    })
                    .then(userData => {
                    if (userData.success) {
                        // Asegúrate que coincidan los nombres de propiedades
                        const nombreUsuario = userData.user.nombre || userData.user.correo_electronico || 'Usuario';
                        Swal.fire({
                        title: `¡${nombreUsuario} ha iniciado sesión con éxito!`,
                        icon: "success"
                        });
                        this.hideAllModals();
                        this.checkAuth();
                    }
                    });
                }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error'
                    });
                });
            });
        }

        // Formulario de registro
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Obtener valores directamente del formulario
                const formData = {
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    nombres: registerForm.nombres.value,
                    apellidos: registerForm.apellidos.value
                };
                
                fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response =>response.json())
                .then(data => {
                    const alertContainer = document.getElementById('alertContainer');
                    if (alertContainer) {
                        const isSuccess = data.result;
                        const alertClass = isSuccess 
                            ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400' 
                            : 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400';
                        
                        alertContainer.innerHTML = `
                            <div class="p-4 mb-4 text-[15px] rounded-lg ${alertClass}" role="alert">
                                <span class="font-medium"></span> ${data.message}
                            </div>`;
                    }
        
                    if (data.result) {
                        Swal.fire({
                            title: '¡Registro exitoso!',
                            html: `Se ha enviado un correo a <strong>${formData.email}</strong>`,
                            icon: 'success'
                        }).then(() => {
                            registerForm.reset();
                            // this.showLoginModal(); // Descomenta si es necesario
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                });
            });
        }

        if (resetPasswordForm) {
            resetPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Obtener valores directamente del formulario
                
                
                fetch(`${API_BASE_URL}/soliRPassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
  email: resetPasswordForm.mail.value
})
                })
                .then(response =>response.json())
                .then(data => {
                    const alertContainer = document.getElementById('alertResetPassword');
                    if (alertContainer) {
                        const isSuccess = data.result;
                        const alertClass = isSuccess 
                            ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400' 
                            : 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400';
                        
                        alertContainer.innerHTML = `
                            <div class="p-4 mb-4 text-[15px] rounded-lg ${alertClass}" role="alert">
                                <span class="font-medium"></span> ${data.message}
                            </div>`;
                    }
        
                    if (data.result) {
                        const emailValue = document.getElementById('mail').value; // Obtener el valor del email
                        Swal.fire({
                            title: '¡Solicitud exitosa!',
                            html: `Se ha enviado un correo a <strong>${emailValue}</strong> para reestablecer la contraseña`,
                            icon: 'success'
                        }).then(() => {
                            resetPasswordForm.reset();
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                });
            });
        }

        if (adminForm) {
            adminForm.addEventListener('submit', (e) => {
                e.preventDefault();
            
            const formData = new FormData(adminForm);
            const credentials = {
                correo_electronico: formData.get('correo'),
                contraseña: formData.get('password2')
            };
        
            fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                const alertContainer = document.getElementById('alertAdmin');
                if (alertContainer) {
                    // Determinar el tipo de alerta según el resultado
                    const isSuccess = data.result;
                    const alertClass = isSuccess 
                        ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400' 
                        : 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400';
                    const alertIcon = isSuccess ? 'Success' : 'Danger';
            
                    alertContainer.innerHTML = `
                        <div class="p-4 mb-4 text-[15px] rounded-lg ${alertClass}" role="alert">
                            <span class="font-medium"></span> ${data.message}
                        </div>`;
                }

                if (data.result) {  // Cambiado a data.result para ser consistente
                    Swal.fire({
                        title: '¡Inicio de Sesión Como Admin Exitoso!',
                        html: 'La sesión caducará en 5 minutos',
                        icon: 'success',
                        customClass: {
                          popup: 'custom-swal-popup'  // Clase CSS personalizada
                        }
                      }).then(() => {
                        adminForm.reset();
                        window.location.href = "https://localhost:3001/pp.html";  // Redirección asegurada
                      });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error'
                });
            });
        });
    }

        // Botón de logout
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Botón de configuración
        
    }

    static async protectPage() {
        const isAuthenticated = await this.checkAuth(false);
        if (!isAuthenticated) {
            sessionStorage.setItem('redirectUrl', window.location.href);
            this.showLoginModal();
        }
    }

    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initModalEvents();
            
            if (window.location.pathname.includes('dashboard-cli.html') || window.location.pathname.includes('pp.html')) {
                this.protectPage();
            } else {
                this.checkAuth(false);
            }
        });
    }


}

AuthModalManager.init();