var router = require('express').Router();
module.exports = router;

var collections = require('../../../db/models/collection.js');

// GET ALL COLLECTIONS
router.get('/collections', function(req, res, next) {
    collections.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
});

// CREATE COLLECTION
router.get('/collections/', function(req, res, next) {
    collections.create(req.body)
        .then(function(response) {
            res.status(201).send(response);
        });
});

// GET ONE COLLECTION BY ID
router.get('/collections/:id', function(req, res, next) {
    collections.findById({
            where: {
                id: req.params.id
            }
        })
        .then(function(response) {
            res.status(200).send(response);
        });
});


// UPDATE ONE COLLECTION
router.put('/collections/:id', function(req, res, next) {
    collections.findById({
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

// DELETE ONE COLLECTION
router.delete('/collections/:id', function(req, res, next) {
    collections.findById({
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
