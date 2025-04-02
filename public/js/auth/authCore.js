export class AuthManager {
    static async checkSession() {
        try {
            const response = await fetch('/check-session', {
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Error verificando sesión:', error);
            return { loggedIn: false };
        }
    }

    static async login(credentials) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        return await response.json();
    }

    static async logout() {
        await fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        });
    }

    static redirectToLogin() {
        window.location.href = 'index.html';
    }
}