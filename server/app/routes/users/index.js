var router = require('express').Router();
var db = require('../../../db');
var users = db.model('user');
var Sequelize = require('sequelize');
module.exports = router;


// GET ALL USERS
router.get('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
    users.findAll()
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
    }
});

// CREATE USER
router.post('/', function(req, res, next) {
    users.create(req.body)
        .then(function(response) {
            res.status(201).send(response);
        })
        .then(null, next)
});

// GET ONE USER BY ID
router.get('/:id', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
    users.findById(req.params.id)
        .then(function(response) {
            res.status(200).send(response);
        });
    }
});

// UPDATE ONE USER
router.put('/:id', function(req, res, next) {
    if(!req.user || !req.user.isAdmin || req.user.dataValues.id !== +req.params.id) res.sendStatus(403);
    else {
    users.findById(req.params.id)
        .then(function(response) {
            return response.update(req.body);
        })
        .then(function(response) {
            res.status(200).send(response);
        });
    }
});

// DELETE ONE USER
router.delete('/:id', function(req, res, next) {
    if(!req.user || !req.user.isAdmin || req.user.dataValues.id !== +req.params.id) res.sendStatus(403);
    else {
    users.findById(req.params.id)
        .then(function(response) {
            return response.destroy();
        })
        .then(function(response) {
            res.redirect(204, '/');
        });
    }
});
