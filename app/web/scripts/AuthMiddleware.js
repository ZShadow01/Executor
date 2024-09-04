module.exports = {
    isAuthenticated(req, res, next) {
        if (req.session && req.session.oauth2) {
            return next();
        }
        res.redirect('/login');
    }
};
