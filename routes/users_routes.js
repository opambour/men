const express = require('express');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

// user model
const User = require('../models/user.model');

// param middleware: id
userRouter.param('id', function(req, res, next, id) {
    if (id) {
        req.id = id;
        console.log('Valid id: ' + id);
        next();
    } else {
        console.log('Invalid id or empty id...');
        next();
    }
});

// ------chaining urls using http verbs: get and post
userRouter.route('/').get(function(req, res, next) {
    // Get All users: http://127.0.0.1:3000/users
    User.find().sort({ firstName: 'ascending' }).exec(function(err, users) {
        if (err) {
            res.status(404);
            res.send(err);
        } else {
            if (users.length > 0) {
                res.status(200);
                res.send(users);
            } else {
                res.status(200);
                res.json({
                    success: true,
                    message: 'There are no Users currently in our database',
                });
            }
        }
        next();
    });
}).post(function(req, res, next) {
    // Post: sign-up and save to database
    const user = new User();

    // set the users information
    user.profile.firstName = req.body.firstName;
    user.profile.middleNameInitial = req.body.middleNameInitial;
    user.profile.lastName = req.body.lastName;
    user.profile.email = req.body.email;
    user.profile.phone = req.body.phone;
    user.profile.headshot = req.body.headshot;

    user.address.street = req.body.street;
    user.address.aptNumber = req.body.aptNumber;
    user.address.city = req.body.city;
    user.address.state = req.body.state;
    user.address.zip = req.body.zip;

    user.login.username = req.body.username;
    user.login.password = req.body.password;

    // save the user and check for errors
    user.save(function(err, newUser) {
        if (err) {
            // if duplicates entry
            res.status(400);
            if (err.code == 11000) { // Mongo Error duplicate key error code is 11000
                return res.json({
                    success: false,
                    message: 'User with the same info already exists',
                });
            } else {
                res.send(err);
            }
        } else {
            res.status(201);
            res.json({
                success: true,
                message: 'New user created and saved successfully!' +
                    ' ' + newUser,
            });
        }
        next();
    });
});

userRouter.route('/user/:id').get(function(req, res, next) {
    // Get single users: http://localhost:3000/users/user/557c9716f6d1379422443a71
    // by default finOne()  method always includes the _id field even if the 
    // field is not explicitly specified in the projection parameter.
    User.findOne({ $or: [{ '_id': req.id }] }).exec(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200);
            res.send(user);
        }
        next();
    });
}).put(function(req, res, next) {
    // Update single user: http://localhost:3000/users/user/557c9716f6d1379422443a71
    User.findOneAndUpdate({ $or: [{ '_id': req.id }] });
}).delete(function(req, res, next) {
    // delete single user: http://localhost:3000/users/user/557c9716f6d1379422443a71
    User.delete();
});

module.exports = userRouter;