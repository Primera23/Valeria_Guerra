module.exports = {
    requireAuth: (req, res, next) => {
        if (!req.session.userId) {
           
                return res.status(404).redirect('/index.html');
            
        
        }
        next();
    }
};