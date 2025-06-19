const reAuth = (req, res, next) => {
  console.log('reAuth ejecutado - sesión:', req.session.userId);
  if (!req.session.userId) {
    console.log('No autenticado');
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }
  next();
};
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    }

    // Decide la respuesta según el tipo de solicitud
     else if (req.accepts('html')) {
        return res.status(401).redirect('/');
    }
};

module.exports = {
    isAdmin,
    reAuth
};
