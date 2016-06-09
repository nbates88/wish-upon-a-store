var router = require('express').Router();

var db = require('../../../db');
var orders = db.model('order');
var users = db.model('user');
var products = db.model('product');

var Sequelize = require('sequelize');
module.exports = router;



// GET ALL ORDERS
router.get('/', function(req, res, next) {
    if(!req.user || !req.user.isAdmin) res.sendStatus(403);
    else{
    orders.findAll()
        .then(function(response) {
            res.status(200).send(response);
        })
        .then(null, next)
    }
});

// GET OR CREATE ORDER (call this route every time user adds one thing to a cart)
router.get('/products/:id', function(req, res, next) {

    var productObj;
    var userId;
    //is thre a req.user?
    if(req.user){
       //yes? use user.id (this is DB.id) to 
        userId = req.user.id;

        orders.findOrCreate({
        where:{ 
            userId: userId, 
            status: 'Created'}
        });
    }else{

        products.findById(req.params.id)
        .then(function(product){
            console.log('PRODUCT', product)
            productObj = product;
        })
        .then(function(){
            return users.create()
        })
       //no? create a user that should automatically store new user id on session, use new user.id to find or create an order 
       .then(function(user){
        userId = user.dataValues.id;
        return userId;
       })
       .then(function(userId){
           return orders.find({
            where:{ 
                userId: userId, 
                status: 'Created'
                }
            })
       })
       .then(function(order){
        if(!order){
            return orders.create({userId: userId, 
                status: 'Created'})
        }else{
            return order;
        }
       })
       .then(function(order){
            return order;
       })
       .then(function(newOrder){
        //console.log(orders.associations)
            return newOrder.setProducts(productObj);
       })
       .then(function(something){
        console.log('RESULT',something);
       })
    }
   
    //associaie product id with new or old order! 
    //setProduct!!!
    
});

// //GET ALL ORDERS BY USER ID
// router.get('/user', function(req,res,next){
    
// });

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
        })
        .then(null, next)
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
       .then(null, next)
});

// DELETE ONE ORDER
router.delete('/:id', function(req, res, next) {
    orders.findById(req.params.id)
        .then(function(response) {
            if(response.user === req.user || req.user.isAdmin){
                return response.destroy()
                .then(function(response) {
                    res.redirect(204, '/')
                })
            }
            else{
                res.sendStatus(403);
            }
        })
        .then(null, next)
});
