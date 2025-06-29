const { Router } = require('express');  // Reemplazar 'import' por 'require'
const { login, registro, verifyEmailS, logout,perfil,checkSession,sesionesActivas,adminLogin,adminLogout,adminPerfil,checkAdminSession,soliRPassword,verifyResetPassword,resetPassword,dashboardCli,pp,pResetPassword, verifyEmailP } = require('../Controllers/auth.controller.js');  // Ajusta la importación del controlador
const { isAdmin, reAuth } = require('../Middlewares/auth.Middleware.js');
const router = Router();

// Definir las rutas
router.post('/register', registro);
router.post('/login', login);
router.post('/loginadmin')
router.get('/verify-s', verifyEmailS);
router.get('/check-session', checkSession);
router.post('/logout',reAuth,  logout);
router.get('/sesiones-activas',sesionesActivas)
router.get('/protected',reAuth,perfil);
router.get('/dashboard-cli.html',reAuth,dashboardCli);

router.post('/admin/login', adminLogin);
router.post('/admin/logout', isAdmin, adminLogout);
router.get('/admin/check-session', checkAdminSession);
router.get('/admin/protected', isAdmin, adminPerfil);
router.get('/pp.html', isAdmin,pp);

router.post('/soliRPassword',soliRPassword)
router.get('/pResetPassword',pResetPassword) // Cambia 'pResetPassword' a 'reAuth' para proteger la ruta
router.get('/verify-reset-token',verifyResetPassword)
router.post('/reset-password',resetPassword)
router.get('/verify', verifyEmailP);  // Ruta para verificar el email
module.exports = router;  // Exportar el router usando 'module.exports'
