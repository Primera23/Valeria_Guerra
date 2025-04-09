const { Router } = require('express');  // Reemplazar 'import' por 'require'
const { login, registro, verifyEmail, logout,perfil,checkSession,sesionesActivas,adminLogin,adminLogout,adminPerfil,isAdmin,checkAdminSession } = require('../Controllers/auth.controller.js');  // Ajusta la importación del controlador
const { requireAuth } = require('../Middlewares/auth.Middleware.js');
const router = Router();

// Definir las rutas
router.post('/register', registro);
router.post('/login', login);
router.post('/loginadmin')
router.get('/verify', verifyEmail);
router.get('/check-session', checkSession);
router.post('/logout',requireAuth,  logout);
router.get('/sesiones-activas',sesionesActivas)
router.get('/protected',requireAuth,perfil);
router.get('/dashboard-cli.html',requireAuth);

router.post('/admin/login', adminLogin);
router.post('/admin/logout', isAdmin, adminLogout);
router.get('/admin/check-session', checkAdminSession);
router.get('/admin/protected', isAdmin, adminPerfil);
router.get('/pp.html',isAdmin);
module.exports = router;  // Exportar el router usando 'module.exports'
