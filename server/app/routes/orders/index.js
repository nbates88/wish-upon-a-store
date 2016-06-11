var router = require('express').Router();

var db = require('../../../db');
var orders = db.model('order');
var users = db.model('user');
var products = db.model('product');
var passport = ('passport');

var Sequelize = require('sequelize');
module.exports = router;

function addProductToOrder(product, userId){
    var userId = userId;
    var productId = product.id
    var productQuantity = product.qnty;
    var productObj;

    return products.findById(productId)
        .then(function(product){
            productObj = product;
        }) 
       .then(function(){
           return orders.find({
            where:{ 
                userId: userId, 
                status: 'Created'
                }
            });
       })
       .then(function(order){
        if(!order){
            return orders.create(
                {userId: userId, 
                status: 'Created'});
        }else{
            return order;
        }
       })
       .then(function(newOrder){
            return newOrder.addProduct(productObj, {quantity: productQuantity})
       })
}

// GET ALL ORDERS
router.get('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else{
        orders.findAll()
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next);
    }
});

// GET ALL ORDERS
router.get('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else{
    orders.findAll()
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next);
    }
});

// ADDING A PRODUCT TO AN ORDER
router.post('/products', function(req, res, next) {

    var userId = req.session.userId || req.user.id;

        addProductToOrder(req.body, userId)
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next);
        
});

//GET ALL PRODUCTS IN A USER'S CART
router.get('/products/', function(req, res, next) {

    var userId = req.session.userId || req.user.id;

        orders.find({
            where:{ 
                userId: userId, 
                status: 'Created'
            }
       })
       .then(function(order){
            return order;
       })
       .then(function(foundOrder){
            return foundOrder.getProducts();
       })
       .then(function(foundProducts){
            return foundProducts;
       })
       .then(function(response) {
            res.send(response);
        })
        .then(null, next);
});

// GET ONE ORDER BY ID
// EI: findByUser method, use req.user ID
// EI: create another route for an admin, allowing admin to get all orders, with middleware above it to keep non-admins out
router.get('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                res.status(200).send(response);    
            }
            else{
                res.sendStatus(403);
            }
        })
        .then(null, next);
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
       .then(null, next);
});

// DELETE ONE ORDER
router.delete('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                return response.destroy()
                .then(function(response) {
                    res.redirect(204, '/');
                });
            }
            else{
                res.sendStatus(403);
            }
        })
        .then(null, next);
});
