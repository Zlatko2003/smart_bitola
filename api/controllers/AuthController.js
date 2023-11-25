/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user
                });
            }
            req.logIn(user, function (err) {
                if (err) res.send(err);

                let redirectTo = (user.admin) ? '/admin/dashboard': '/';

                return res.redirect(redirectTo);
            });
        })(req, res);
    },

    register: async function(req, res) {
        let createdUser = await User.create(req.allParams());
        req.login(user, function(err){
            if (err) return res.negotiate(err);
            let redirectTo = (user.admin) ? '/admin/dashboard': '/';
            return res.redirect(redirectTo);
        });
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
};
