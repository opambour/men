const express = require('express');

const profileRouter = express.Router();

const User = require('../models/user.model'); //  user model

// ====== Profile router ==========
profileRouter.route('/').get(function(req, res, next) { // get form
    // redirect anonymous users trying to access profile page
    if (!req.user) {
        req.flash('accessDenied', 'Access Error: Only logged in members can access "profile" page. ' +
            'Login now or Signup!');
        // just delay for 5 seconds...
        setTimeout(function() {
            return res.redirect(301, '/');
        }, 5000);
    } else {
        User.findOne({ '_id': req.user._id }).exec(function(err, user) {
            if (err) {
                return next(err);
            }
            res.render('profile');
        });
    }
}).post(function(req, res) { // Edit and update profile form processing
    User.findOne({ $or: [{ '_id': req.user._id }] }).exec(function(err, user) {
        if (err) {
            return next(err);
        }

        // req. body
        if (req.body.firstName) { // first name
            user.profile.firstName = req.body.firstName;
        }

        if (req.body.middleNameInitial) { // middle name
            user.profile.middleNameInitial = req.body.middleNameInitial;
        }

        if (req.body.lastName) { // last name
            user.profile.lastName = req.body.lastName;
        }

        if (req.body.email) { // email
            user.profile.email = req.body.email;
        }

        if (req.body.phone) { // phone
            user.profile.phone = req.body.phone;
        }

        if (req.body.headshot) { // headshot
            user.profile.headshot = req.body.headshot;
        }

        if (req.body.street) { // street
            user.address.street = req.body.street;
        }

        if (req.body.aptNumber) { // apt number
            user.address.aptNumber = req.body.aptNumber;
        }

        if (req.body.city) { // city
            user.address.city = req.body.city;
        }

        if (req.body.state) { // state
            user.address.state = req.body.state;
        }

        if (req.body.zip) { // zip
            user.address.zip = req.body.zip;
        }

        if (req.body.username) { // username
            user.login.username = req.body.username;
        }

        if (req.body.password) { // password
            user.login.password = req.body.password;
        }

        // save
        user.save(function(err, updateField) {
            if (err) {
                if (user.profile.email) {
                    req.flash('existingEmailError', 'User with the same info already exists:' +
                        'Email should be unique');
                    return res.redirect(303, '/profile');
                }

                if (user.login.username) {
                    req.flash('existingEmailError', 'User with the same info already exists:' +
                        'Email should be unique');
                    return res.redirect(303, '/profile');
                }

                // error
                res.status(400);
                req.flash('error', 'An error occurred during form (update) processing!');
                console.log(err);
                return res.redirect(303, '/profile');
            }

            res.status(201);
            if (req.body.firstName) {
                req.flash('updateSuccess', 'First name Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.middleNameInitial) {
                req.flash('updateSuccess', 'Middle name Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.lastName) {
                req.flash('updateSuccess', 'Last name Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.email) {
                req.flash('updateSuccess', 'Email Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.phone) {
                req.flash('updateSuccess', 'Phone number Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.headshot) {
                req.flash('updateSuccess', 'Profile picture Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.street) {
                req.flash('updateSuccess', 'Street address Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.aptNumber) {
                req.flash('updateSuccess', 'Apartment number Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.city) {
                req.flash('updateSuccess', 'City Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.state) {
                req.flash('updateSuccess', 'State Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.zip) {
                req.flash('updateSuccess', 'Zip code Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.username) {
                req.flash('updateSuccess', 'Username Updated successfully!');
                return res.redirect(303, '/profile');
            }
            if (req.body.password) {
                req.flash('updateSuccess', 'Phone number Updated successfully!');
                return res.redirect(303, '/profile');
            }
        });
    });
});

module.exports = profileRouter;