var router = require('express').Router();
var db = require('../../../db');
var products = db.model('product');
var Review = db.model('review');
var User = db.model('user');


var Sequelize = require('sequelize');
module.exports = router;

// var products = require('../../../db/models/product.js');

// GET ALL PRODUCTS
router.get('/', function(req, res, next) {
    products.findAll()
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
});

// CREATE PRODUCT
router.post('/', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        products.create(req.body)
            .then(function(response) {
                res.status(201).send(response);
            });
    }
});

// GET ONE PRODUCT BY ID
router.get('/:id', function(req, res, next) {
    products.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
});

// UPDATE ONE PRODUCT
router.put('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        products.findById(req.params.id)
            .then(function(response) {
                return response.update(req.body);
            })
            .then(function(response) {
                res.status(200).send(response);
            })
            .then(null, next)
    }
});

// DELETE ONE PRODUCT
router.delete('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        products.findById(req.params.id)
            .then(function(response) {
                return response.destroy();
            })
            .then(function() {
                res.redirect(204, '/');
            })
            .then(null, next)
    }

});


// GET ALL REVIEWS FOR ONE PRODUCT
router.get('/:productId/reviews', function(req, res, next) {
    Review.findAll({
            where: {
                productId: req.params.productId
            },
            include: [User]
        })
        .then(function(reviews) {
            res.status(200).send(reviews);
        });
});

// CREATE REVIEW FOR PRODUCT
router.post('/:productId/reviews', function(req, res, next) {
    if (!req.user) res.sendStatus(403);
    else {
        Promise.all([
            products.findById(req.params.productId),
            Review.create(req.body)
        ])
        .then(function(response) {
            var product = response[0];
            var review = response[1];
            return review.setProduct(product);
        })
        .then(function(review) {
            return review.setUser(req.user);
        })
        .then(function(review) {
            res.status(201).send(review);
        });
    }
});
