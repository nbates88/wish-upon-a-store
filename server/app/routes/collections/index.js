var router = require('express').Router();
var db = require('../../../db');
var Collection = db.model('collection');

module.exports = router;


// GET ALL COLLECTIONS
router.get('/', function(req, res, next) {
    Collection.findAll()
        .then(function(collections) {
            res.status(200).send(collections);
        });
});

// CREATE COLLECTION
router.post('/', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Collection.create(req.body)
            .then(function(response) {
                res.status(201).send(response);
            });
    }
});

// GET ONE COLLECTION BY ID
router.get('/:id', function(req, res, next) {
    Collection.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        });
});


// UPDATE ONE COLLECTION
router.put('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Collection.findById(req.params.id)
            .then(function(response) {
                return response.update(req.body);
            })
            .then(function(response) {
                res.status(300).send(response);
            });
    }
});

// DELETE ONE COLLECTION
router.delete('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Collection.findById(req.params.id)
            .then(function(response) {
                return response.destroy();
            })
            .then(function(response) {
                res.status(204).redirect('/');
            });
    }
});

// Get Collection's Products
router.get('/:id/products', function(req, res, next) {
    Collection.findById(req.params.id)
    .then(function(collection){
        return collection.getProducts();
    })
    .then(function(response) {
        res.status(200).send(response);
    });
});

// Add Product to Collection
router.post('/:id/products', function(req, res, next) {
    Promise.all([Collection.findById(req.params.id),
    products.findOrCreate({where: req.body})])
    .then(function(response){
        var collection = response[0];
        var product = response[1];
        return collection.addProduct(product);
    })
    .then(function(response) {
        res.status(200).send(response);
    });
});

// Need to figure out a route to Delete Product from Collection
// router.delete('/:catid/products/:productid', function(req, res, next) {
    
// });