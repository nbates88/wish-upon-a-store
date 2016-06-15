var router = require('express').Router();
var db = require('../../../db');
var Product = db.model('product');
var Review = db.model('review');
var User = db.model('user');
var Collection = db.model('collection');

var Sequelize = require('sequelize');
module.exports = router;

// var products = require('../../../db/models/product.js');

// GET ALL PRODUCTS
router.get('/', function(req, res, next) {
    Product.findAll({
        include: [Collection]
    })
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
});

// CREATE PRODUCT
router.post('/', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Product.create(req.body)
            .then(function(product) {
                return product.addCollection(req.body.collection.id)
            })
            .then(function(product) {
                res.status(201).send(product);
            })
    }
});

// GET ONE PRODUCT BY ID
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
});

// UPDATE ONE PRODUCT
router.put('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Product.findById(req.params.id)
            .then(function(product) {
                return product.update(req.body);
            })
            .then(function(product){
                var updatedProduct = product;
                if(req.body.collection){
                    Collection.findOne({where:
                        {name: req.body.collection}
                    })
                    .then(function(collection){
                        return updatedProduct.addCollection(collection.id);
                    })
                    
                }
            })
            .then(function(updatedProduct) {
                res.status(200).send(updatedProduct);
            })
            .then(null, next)
    }
});

// DELETE ONE PRODUCT
router.delete('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Product.findById(req.params.id)
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
            Product.findById(req.params.productId),
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
