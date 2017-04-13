// for authentication and social login
const passport = require('passport');
// for local logging
const PassportLocalStrategy = require('passport-local').Strategy;

// user model
const User = require('../models/user.model');

// passport.initialize() middleware is required to initialize Passport
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// passport.deserializeUser() middleware
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Tell passport to use local strategy for login
passport.use('local-login', new PassportLocalStrategy({
        usernameField: 'username', // You can use username or email as a login credential
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, username, password, done) {
        User.findOne({ $or: [{ 'login.username': username }] }, function(err, user) {
            if (err) {
                return done(err);
            }

            // if username does NOT exist, do the following....
            if (!user) {
                return done(null, false, req.flash('invalidUser', 'Your username does NOT match our records!'));
            }

            if (!user.checkAndComparePassword(password)) {
                return done(null, false, req.flash('invalidPassword', 'Your password is incorrect...try again or request for new password!'));
            }

            return done(null, user, req.flash('loginSuccess', 'You have successfully login...you can edit your profile now or later!'));
        });
    }
));

// validations
exports.isAuthenticated = function(req, res, anyRoute) {
    if (req.isAuthenticated()) {
        return anyRoute(); // go to any route that is specified in routes
    }

    res.redirect(301, '/login');
};