var router = require('express').Router();
var db = require('../../../db');
var Sequelize = require('sequelize');
var collections = db.model('collection');
module.exports = router;


// GET ALL COLLECTIONS
router.get('/', function(req, res, next) {
    collections.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
});

// CREATE COLLECTION
router.post('/', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        collections.create(req.body)
            .then(function(response) {
                res.status(201).send(response);
            });
    }
});

// GET ONE COLLECTION BY ID
router.get('/:id', function(req, res, next) {
    collections.findById(req.params.id)
        .then(function(response) {
            // console.log(response);
            res.status(200).send(response);
        });
});


// UPDATE ONE COLLECTION
router.put('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        collections.findById(req.params.id)
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
        collections.findById(req.params.id)
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
    // collections.findAll({where: {id: req.params.id}, include: products})
    collections.findById(req.params.id)
    .then(function(collection){
        return collection.getProducts();
    })
    .then(function(response) {
        console.log(response, "collection's products");
        res.status(200).send(response);
    });
});
