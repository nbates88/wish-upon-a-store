var router = require('express').Router();

var db = require('../../../db');
var orders = db.model('order');
var users = db.model('user');
var products = db.model('product');
var passport = ('passport');

var Sequelize = require('sequelize');
module.exports = router;

function addProductToOrder(productId, userId){
    var productObj;

    products.findById(productId)
        .then(function(product){
            productObj = product;
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
            return orders.create(
                {userId: userId, 
                status: 'Created'})
        }else{
            return order;
        }
       })
       .then(function(order){
            return order;
       })
       .then(function(newOrder){
            return newOrder.setProducts(productObj);
       });
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

// ADDING A PRODUCT TO AN ORDER
router.get('/products/:id', function(req, res, next) {

    if(req.user){
        addProductToOrder(req.params.id, req.user.id);
    }else{
        users.create()
       .then(function(user){
        //add this to cookies
            return user.dataValues.id;
       })
       .then(function(userId){
            addProductToOrder(req.params.id, userId);
       });
           
    }

    // if(req.user || req.session.cookie.user){
    //     var userId = req.user || req.session.cookie.user
    //     addProductToOrder(req.params.id, userId);
    // }else{
    //     users.create()
    //    .then(function(user){
    //     //add this to cookies
    //     req.session.cookie.user = user.id;
    //     console.log("REQ SESSION", req.session.cookie.user)
    //         return user.dataValues.id;
    //    })
    //    .then(function(userId){
    //         addProductToOrder(req.params.id, userId);
    //    });
           
    // }
    
});

//GET ALL PRODUCTS IN A USER'S CART
// router.get('/products/', function(req, res, next) {
//     if(!req.user || !req.session.cookie.user){
//         throw new Error('Nothing in your cart!');
//     }else{
//         orders.find({
//             where:{ 
//                 userId: req.user.id, 
//                 status: 'Created'
//             }
//        })
//        .then(function(order){
//             return order;
//        })
//        .then(function(foundOrder){
//             return foundOrder.getProducts();
//        })
//        .then(function(products){
//             return products.dataValues;
//        })
//     }
// });

//not using yet
// // GET ONE ORDER BY ID
// router.get('/:id', function(req, res, next) {
//     orders.findById(req.params.id)
//         .then(function(response) {
//             if(response.user === req.user || req.user.isAdmin){
//                 res.status(200).send(response);    
//             }
//             else{
//                 res.sendStatus(403);
//             }
//         })
//         .then(null, next)
// });

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
