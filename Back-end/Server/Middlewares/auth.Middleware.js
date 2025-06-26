const reAuth = (req, res, next) => {
  console.log('reAuth ejecutado - sesión:', req.session.userId);
  if (!req.session.userId) {
    console.log('No autenticado');
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }
  next();
};
const isAdmin = (req, res, next) => {
  console.log('🔵 isAdmin ejecutado - sesión:', req.session.adminId); // Mensaje azul para destacar
  if (req.session.adminId) {
    console.log('✅ Usuario es administrador');
    return next();
  } else if (req.accepts('html')) {
    console.log('❌ Redirigiendo a la página de inicio (no admin)');
    return res.status(401).redirect('/');
  }
  console.log('⚠️ No se cumplieron las condiciones anteriores');
};

module.exports = {
    isAdmin,
    reAuth
};
