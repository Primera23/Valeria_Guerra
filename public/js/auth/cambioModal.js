import { AuthManager } from './authCore.js';

class IndexAuth extends AuthManager {
    static init() {
        this.setupModal();
        this.setupLoginForm();
        this.setupRegisterForm();
        this.checkInitialAuth();
        this.checkSession();
    }

    static setupModal() {
        const modal = document.getElementById('auth-modal');
        const openModalBtn = document.getElementById('openModal');
        const closeModalBtn = document.getElementById('closeModal');

        openModalBtn?.addEventListener('click', () => {
            modal.style.display = 'flex';
            this.updateModalUI();
        });

        closeModalBtn?.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    static async updateModalUI() {
        const authStatus = await this.checkSession();
        const authView = document.getElementById('authenticated-view');
        const unauthView = document.getElementById('unauthenticated-view');

        if (authStatus.loggedIn) {
            authView.style.display = 'block';
            unauthView.style.display = 'none';
            document.getElementById('modal-username').textContent = authStatus.user.nombre;
            document.getElementById('modal-email').textContent = authStatus.user.correo_electronico;
        } else {
            authView.style.display = 'none';
            unauthView.style.display = 'block';
        }
    }

   

   

    static async checkInitialAuth() {
        const authStatus = await this.checkSession();
        if (authStatus.loggedIn && window.location.pathname.includes('index.html')) {
            window.location.href = 'dashboard-cli.html';
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => IndexAuth.init());