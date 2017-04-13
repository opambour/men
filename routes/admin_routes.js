const express = require('express');

// model files
const Category = require('../models/product/category.model');
const Product = require('../models/product/product.model');

// router
adminRouter = express.Router();


// admin main page
adminRouter.route('/').get(function(req, res, next) {
    res.render('admin/admin', {
        title: 'Admin',
        path: '/admin',
    });
}).post(function(req, res, next) {

});

// ----- add a category: post http://127.0.0.1:3000/admin/add-category
adminRouter.post('/add-category', function(req, res, next) {
    // form processing and saving new catgory to db
    let category = new Category();

    category.name = req.body.name;

    Category.findOne({ $or: [{ 'name': req.body.name }] }).exec(function(err, existingCategory) {
        if (existingCategory) {
            req.flash('adminError', 'The Category you specified exist already...Enter new category!');
            return res.redirect(303, '/admin');
        }

        category.save(function(err) {
            if (err) {
                if (req.body.name === '') {
                    res.status(400);
                    req.flash('adminError', 'Category name cannot be blank...Enter data');
                    console.log(err);
                    return res.redirect(303, '/admin');
                }
                // error
                res.status(400);
                req.flash('adminError', 'Form processing: An error occurred during Adding Category...!');
                console.log(err);
                return res.redirect(303, '/admin');
            }

            res.status(201);
            req.flash('adminSuccess', 'You have successfully added a new field to Category collections!');
            return res.redirect('/admin');
        });
    });

});

// add a manufacturer chaining: http://127.0.0.1:3000/admin/add-category
adminRouter.route('/add-manufacturer').get(function(req, res, next) {
    // Form: add category

}).post(function(req, res, next) {
    // Form processing

});

// add a product chaining: http://127.0.0.1:3000/admin/add-product
adminRouter.route('/add-product').get(function(req, res, next) {
    // Form: add product

}).post(function(req, res, next) {
    // Form processing

});



// export route
module.exports = adminRouter;