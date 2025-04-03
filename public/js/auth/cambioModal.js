class AuthModalManager {
    static async checkAuth() {
        try {
            // 1. Verificar sesión
            const sessionResponse = await fetch('/check-session', {
                credentials: 'include'
            });
            
            if (!sessionResponse.ok) throw new Error('Error en sesión');
            
            const sessionData = await sessionResponse.json();

            if (!sessionData.loggedIn) {
                this.showLoginModal();
                return false;
            }

            // 2. Obtener datos del usuario
            const userResponse = await fetch('/protected', {
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
            this.showLoginModal();
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
        const userModal = document.getElementById('modal');
        const loginModal = document.getElementById('inicioSesion');
        const btn = document.getElementById("openModal");
        
        if (userModal) {
            userModal.style.display = 'none';
            userModal.classList.remove('active');
        }
        if (loginModal) {
            loginModal.style.pointerEvents = 'auto';
            loginModal.style.opacity = '1';
            loginModal.style.display = 'block';
            
            const inputs = loginModal.querySelectorAll('input');
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
        if (btn) btn.classList.remove("active");
    }

    static hideLoginModal() {
        const loginModal = document.getElementById('inicioSesion');
        if (loginModal) {
            loginModal.style.opacity = '0';
            setTimeout(() => {
                loginModal.style.display = 'none';
                loginModal.style.pointerEvents = 'none';
            }, 400);
        }
    }

    static async handleLogout() {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = 'index.html';
                this.showLoginModal();
               
                }
             else {
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
        const closeLoginBtn = loginModal?.querySelector('.close');
        const loginForm = document.getElementById('loginForm');
        const configBtn = document.querySelector('.config-btn');

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
                            btn.classList.add("active");
                        } else {
                            this.showLoginModal();
                        }
                    }
                }
            });
        }

        window.addEventListener('click', (e) => {
            const loginModal = document.getElementById('inicioSesion');
            
            if (userModal && e.target === userModal) {
                userModal.style.display = 'none';
                btn?.classList.remove("active");
            }
            
            if (loginModal && e.target === loginModal) {
                this.hideLoginModal();
            }
        });

        if (closeLoginBtn) {
            closeLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideLoginModal();
            });
        }

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
            
                // 1. Primero hacemos el login
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials),
                    credentials: 'include'
                })
                .then(loginResponse => {
                    if (!loginResponse.ok) {
                        throw new Error('Error en la respuesta del login');
                    }
                    return loginResponse.json();
                })
                .then(loginData => {
                    const alertContainer = document.getElementById('aja');
                    alertContainer.innerHTML = '';
            
                    // Mostrar alerta de éxito/error básica
                    const alertType = loginData.success ? 'alert-success' : 'alert-danger';
                    const alertMessage = `<div class="alert ${alertType} alert-dismissible fade show" role="alert">${loginData.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    alertContainer.innerHTML = alertMessage;
            
                    if (loginData.success) {
                        // 2. Si el login fue exitoso, obtenemos los datos del usuario
                        return fetch('/protected', {
                            credentials: 'include'
                        })
                        .then(userResponse => {
                            if (!userResponse.ok) {
                                throw new Error('Error al obtener perfil');
                            }
                            return userResponse.json();
                        })
                        .then(userData => {
                            if (userData.success) {
                                Swal.fire({
                                    title: `¡${userData.user.nombre || 'Usuario'} ha iniciado sesión con éxito!`,
                                    icon: "success",
                                    draggable: true
                                });
                                this.hideLoginModal();
                                this.checkAuth();
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        }        
            
        

        // Configurar botón de logout
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Configurar botón de configuración (nuevo)
        if (configBtn) {
            configBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'dashboard-cli.html'; // Redirige al dashboard
            });
        }
    }

    static async protectPage() {
        const isAuthenticated = await this.checkAuth();
        if (!isAuthenticated && window.location.pathname.includes('dashboard-cli.html')) {
            sessionStorage.setItem('redirectUrl', window.location.href);
            window.location.href = 'index.html';
        }
    }

    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.location.pathname.includes('dashboard-cli.html')) {
                this.protectPage();
            } else {
                this.checkAuth();
            }
            this.initModalEvents();
        });
    }
}

AuthModalManager.init();