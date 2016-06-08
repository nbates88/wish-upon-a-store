var router = require('express').Router();
var db = require('../../../db/_db');
var orders = require('../../../db/models/order.js')(db);
var Sequelize = require('sequelize');
module.exports = router;


// GET ALL ORDERS
router.get('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else{
    orders.findAll()
        .then(function(response) {
            res.status(200).send(response);
        });
    }
});

// CREATE ORDER
router.post('/', function(req, res, next) {
    orders.create(req.body)
        .then(function(response) {
                return response.setUser(req.user)
        })
        .then(function(response){
            res.status(201).send(response);
        })
});

// GET ONE ORDER BY ID
router.get('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                res.status(200).send(response);    
            }
            else{
                res.sendStatus(403);
            }
        });
});

// UPDATE ONE ORDER
router.put('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                return response.update(req.body)
                .then(function(repsonse){
                    res.status(300).send(response);
                });
            }
            else{
                res.sendStatus(403);
            }
        })
       
});

// DELETE ONE ORDER
router.delete('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                return response.destroy()
                .then(function(response) {
                    res.status(204).redirect('/');
                })
            }
            else{
                res.sendStatus(403);
            }
        });
});