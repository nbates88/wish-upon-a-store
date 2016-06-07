var router = require('express').Router();
module.exports = router;

var orders = require('../../../db/models/order.js');

// GET ALL ORDERS
router.get('/orders/', function(req, res, next) {
    orders.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
});

// CREATE ORDER
router.post('/orders', function(req, res, next) {
    orders.create(req.body)
        .then(function(response) {
            res.status(201).send(response);
        });
});

// GET ONE ORDER BY ID
router.get('/orders/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        });
});

// UPDATE ONE ORDER
router.put('/orders/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            return response.update(req.body);
        })
        .then(function(response) {
            res.status(300).send(response);
        });
});

// DELETE ONE ORDER
router.delete('/orders/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            return response.destroy();
        })
        .then(function(response) {
            res.status(204).redirect('/');
        });
});
