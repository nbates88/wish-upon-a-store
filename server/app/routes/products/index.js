var router = require('express').Router();
var db = require('../../../db');
var products = db.model('product');
var Sequelize = require('sequelize');
module.exports = router;

// var products = require('../../../db/models/product.js');

// GET ALL PRODUCTS
router.get('/', function(req, res, next) {
    products.findAll()
        .then(function(response) {
            console.log("response", response);
            res.status(200).send(response);
        });
});

// CREATE PRODUCT
router.post('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
     else {   products.create(req.body)
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
        });
});

// UPDATE ONE PRODUCT
router.put('/:id', function(req, res, next) {
    if(req.user.isAdmin){
        products.findById(req.params.id)
            .then(function(response) {
                return response.update(req.body);
            })
            .then(function(response) {
                res.status(300).send(response);
            });
    }
    else{
        res.sendStatus(403);
    }
});

// DELETE ONE PRODUCT
router.delete('/:id', function(req, res, next) {
    if(req.user.isAdmin){
    products.findById(req.params.id)
        .then(function(response) {
            return response.destroy();
        })
        .then(function(response) {
            res.status(204).redirect('/');
        });
    }
    else{
        res.sendStatus(403);
    }
});
