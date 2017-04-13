const express = require('express');
const signupRouter = express.Router();

// user model
const User = require('../models/user.model');

signupRouter.route('/').get(function(req, res, next) {
    // render html form
    res.render('signup', {
        title: 'Signup',
        path: '/signup',
    });
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
    // session ID
    console.log('Session ID: ', req.sessionID);
}).post(function(req, res, next) {
    // process html form
    // Post: sign-up and save to database
    const user = new User();

    // set the users information
    user.profile.firstName = req.body.firstName;
    user.profile.middleNameInitial = req.body.middleNameInitial;
    user.profile.lastName = req.body.lastName;
    user.profile.email = req.body.email;
    user.login.username = req.body.username;
    user.login.password = req.body.password;

    user.profile.headshot = user.gravatar();

    User.findOne({ $or: [{ 'profile.email': req.body.email }, { 'login.username': req.body.username }] }, function(err, existingUser) {
        if (existingUser) {
            req.flash('existingUserError', 'User with the same info already exists:' +
                'Email or Username should be unique...');
            return res.redirect(303, '/signup');
        } else {
            // save the user and check for errors
            user.save(function(err, newUser) {
                if (err) {
                    // error
                    res.status(400);
                    req.flash('error', 'An error occurred during form (signup) processing!');
                    return res.redirect(303, '/Signup');
                }
                res.status(201);

                // automatically log in after sign up
                req.login(newUser, function(err) {
                    if (err) {
                        return next(err);
                    }
                    req.flash('signupSuccess', 'You have successfully registered and automatically logged in by default!');
                    res.redirect('/profile');
                });

                // --- if you don't wanna log in automatically
                // req.flash('success', 'You have been successfully registered...You can now log in!');
                // return res.redirect(303, '/login'); // after successfully Signed up, return to home page
            });
        }
    });
});

module.exports = signupRouter;