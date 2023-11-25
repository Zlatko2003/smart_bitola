module.exports = async function(req, res, next) {
    if (req.user && req.user.admin === true) {
        return next();
    }

    return res.redirect('/login');
};
