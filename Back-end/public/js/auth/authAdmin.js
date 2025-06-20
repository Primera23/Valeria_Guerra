import { API_BASE_URL } from '../config.js';
class AdminAuthManager {
    
    static async checkAdminAuth() {
        try {
            // Verificar si es admin
            const response = await fetch(`${API_BASE_URL}/admin/check-session`, {
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Error al verificar sesión');
            
            const data = await response.json();
            
            if (!data.isAdmin) {
                window.location.href = 'index.html'; // Redirige si no es admin
                return false;
            }
            
            const adminResponse = await fetch('/admin/protected', {
                credentials: 'include'
            });
            
            if (!adminResponse.ok) throw new Error('Error en perfil');
            
            const adminData = await adminResponse.json();

            if (adminData.success) {
                this.loadAdminData(adminData.admin);
                return true;
            } else {
                throw new Error(adminData.message || 'Error en datos de usuario');
            }
            // Cargar datos del admin
            
            
        } catch (error) {
            console.error('Error en autenticación admin:', error);
            window.location.href = 'index.html';
            return false;
        }
    }

    static loadAdminData(admin) {
        // Actualizar UI con datos del admin
        const userAdmin=  document.querySelector('#dashboard span');
        const userInfo = document.querySelector('#sidebar-nombre');
        const userRol = document.querySelector('#rol');

        if (userInfo) {
            userInfo.textContent = admin.nombre || 'Administrador';
        }

        if(userAdmin){
            userAdmin.textContent = admin.nombre || 'Administrador';
        }

        if(userRol){
            userRol.textContent = admin.rol || 'Administrador';
        }
        
        // Configurar logout
        const logoutBtn = document.querySelector('[href="#logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAdminLogout();
            });
        }

        fetch('/usuarios')
        .then(response => response.json())
        .then(usuarios => {if (usuarios.success){
            document.getElementById('countUsers').textContent = 
                `${usuarios.totalUsuarios}`;
        }}

        )
        .catch(error => console.log(error));
    }

    static async handleAdminLogout() {
        try {
            const response = await fetch('/admin/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Error al cerrar sesión admin:', error);
        }
    }

    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.checkAdminAuth(); // Verifica autenticación al cargar
        });
    }
}

AdminAuthManager.init();