const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// passport.config file
const passportConfig = require('../lib/passport.config');


const loginRouter = express.Router();

// login route chaining
loginRouter.route('/').get(function(req, res) {
    // if user is logged in
    if (req.user) {
        return res.redirect(301, '/');
    } else {
        // else render login page
        return res.render('login', {
            title: 'Login',
            path: '/login',
        });
    }

}).post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = loginRouter;