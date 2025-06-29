
class AdminAuthManager {
    
   static async checkAdminAuth() {
    console.log("🔍 Iniciando verificación de admin");


    try {
        // 1. Verificar sesión
        console.log("⏳ Verificando sesión en:", `/admin/check-session`);
        const sessionResponse = await fetch(`/admin/check-session`, {
            credentials: 'include'
        });
        
        console.log("📊 Respuesta de sesión:", {
            status: sessionResponse.status,
            ok: sessionResponse.ok,
            headers: Object.fromEntries(sessionResponse.headers.entries())
        });

        if (!sessionResponse.ok) {
            const errorText = await sessionResponse.text();
            console.error("❌ Error en sesión:", errorText);
            throw new Error(`HTTP ${sessionResponse.status}: ${errorText}`);
        }
        
        const sessionData = await sessionResponse.json();
        console.log("📦 Datos de sesión:", sessionData);
        
        if (!sessionData.isAdmin) {
            console.warn("⚠️ Usuario no es admin");
            return this.redirectToIndex();
        }

        // 2. Obtener datos protegidos
        console.log("⏳ Obteniendo datos protegidos");
        const protectedResponse = await fetch('/admin/protected', {
            credentials: 'include'
        });
        
        console.log("📊 Respuesta protegida:", {
            status: protectedResponse.status,
            ok: protectedResponse.ok
        });

        if (!protectedResponse.ok) {
            const errorText = await protectedResponse.text();
            console.error("❌ Error en datos protegidos:", errorText);
            throw new Error(`HTTP ${protectedResponse.status}: ${errorText}`);
        }
        
        const protectedData = await protectedResponse.json();
        console.log("📦 Datos protegidos:", protectedData);

        if (protectedData.success) {
            console.log("✅ Autenticación exitosa");
            this.loadAdminData(protectedData.admin);
            return true;
        } else {
            console.warn("⚠️ Datos de admin inválidos:", protectedData.message);
            throw new Error(protectedData.message || 'Datos de admin inválidos');
        }
        
    } catch (error) {
        console.error("💥 Error crítico:", error);
        return this.redirectToIndex();
    }
}

static redirectToIndex() {
    setTimeout(() => {
        console.log("⏰ Redirigiendo a index.html en 3 segundos"); 
    console.log("🔀 Redirigiendo a index.html");
    window.location.href = 'https://localhost:3000/index.html';
    return false;
    }, 310000)
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
                window.location.href = 'https://localhost:3000/index.html';
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