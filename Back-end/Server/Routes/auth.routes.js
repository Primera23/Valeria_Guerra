const { Router } = require('express');  // Reemplazar 'import' por 'require'
const { login, registro, verifyEmail, logout,perfil,checkSession,sesionesActivas,adminLogin,adminLogout,adminPerfil,checkAdminSession,soliRPassword,verifyResetPassword,resetPassword,dashboardCli,pp,pResetPassword } = require('../Controllers/auth.controller.js');  // Ajusta la importación del controlador
const { isAdmin, reAuth } = require('../Middlewares/auth.Middleware.js');
const router = Router();

// Definir las rutas
router.post('/register', registro);
router.post('/login', login);
router.post('/loginadmin')
router.get('/verify', verifyEmail);
router.get('/check-session', checkSession);
router.post('/logout',reAuth,  logout);
router.get('/sesiones-activas',sesionesActivas)
router.get('/protected',reAuth,perfil);
router.get('/dashboard-cli.html',reAuth,dashboardCli);

router.post('/admin/login', adminLogin);
router.post('/admin/logout', isAdmin, adminLogout);
router.get('/admin/check-session', checkAdminSession);
router.get('/admin/protected', isAdmin, adminPerfil);
router.get('/pp.html',pp);

router.post('/soliRPassword',soliRPassword)
router.get('/pResetPassword',pResetPassword) // Cambia 'pResetPassword' a 'reAuth' para proteger la ruta
router.get('/verify-reset-token',verifyResetPassword)
router.post('/reset-password',resetPassword)
module.exports = router;  // Exportar el router usando 'module.exports'
