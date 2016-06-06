var router = require('express').Router();
module.exports = router;

var products = require('FOLDER???');

// GET ALL PRODUCTS
router.get('api/products/', function(req, res, next) {
    products.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
});

// CREATE PRODUCT
router.get('api/products/', function(req, res, next) {
    products.create(req.body)
        .then(function(response) {
            res.status(201).send(response);
        });
});

// GET ONE PRODUCT BY ID
router.get('api/products/:id', function(req, res, next) {
    products.findById({
            where: {
                id: req.params.id
            }
        })
        .then(function(response) {
            res.status(200).send(response);
        });
});

// UPDATE ONE PRODUCT
router.put('api/products/:id', function(req, res, next) {
    products.findById({
            where: {
                id: req.params.id
            }
        })
        .then(function(response) {
            return response.update(req.body);
        })
        .then(function(response) {
            res.status(300).send(response);
        });
});

// DELETE ONE PRODUCT
router.delete('api/products/:id', function(req, res, next) {
    products.findById({
            where: {
                id: req.params.id
            }
        })
        .then(function(response) {
            return response.destroy(req.body);
        })
        .then(function(response) {
            res.status(204).redirect('/');
        });
});
