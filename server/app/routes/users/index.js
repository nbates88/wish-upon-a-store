var router = require('express').Router();
module.exports = router;

var users = require('../../../db/models/user.js');

// GET ALL USERS
router.get('/users', function(req, res, next) {
    users.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
});

// CREATE USER
router.post('/users', function(req, res, next) {
    users.create(req.body)
        .then(function(response) {
            res.status(201).send(response);
        });
});

// GET ONE USER BY ID
router.get('/users/:id', function(req, res, next) {
    users.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        });
});

// UPDATE ONE USER
router.put('/users/:id', function(req, res, next) {
    users.findById(req.params.id)
        .then(function(response) {
            return response.update(req.body);
        })
        .then(function(response) {
            res.status(300).send(response);
        });
});

// DELETE ONE USER
router.delete('/users/:id', function(req, res, next) {
    users.findById(req.params.id)
        .then(function(response) {
            return response.destroy();
        })
        .then(function(response) {
            res.status(204).redirect('/');
        });
});
