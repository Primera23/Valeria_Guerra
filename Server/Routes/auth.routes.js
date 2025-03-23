const { Router } = require('express');  // Reemplazar 'import' por 'require'
const { login, registro, verifyEmail, logout,perfil,checkSession,sesionesActivas } = require('../Controllers/auth.controller.js');  // Ajusta la importación del controlador

const router = Router();

// Definir las rutas
router.post('/register', registro);
router.post('/login', login);
router.get('/verify', verifyEmail);
router.get('/check-session', checkSession)
router.get('/logout',  logout);
router.get('/sesiones-activas',sesionesActivas)
router.get('/protected',perfil);

module.exports = router;  // Exportar el router usando 'module.exports'
