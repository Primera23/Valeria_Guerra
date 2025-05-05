reAuth = (req, res, next) => {
    if (!req.session.userId) {
       
            return res.status(404).redirect('/index.html');
        
    
    }
    next();
}
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    }

    // Decide la respuesta según el tipo de solicitud
     else if (req.accepts('html')) {
        return res.status(404).redirect('/');
    }
};

module.exports = {
    isAdmin,
    reAuth
};
