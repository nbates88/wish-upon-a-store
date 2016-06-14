var router = require('express').Router();

var db = require('../../../db');
var orders = db.model('order');
var users = db.model('user');
var products = db.model('product');
var passport = ('passport');
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth : {
        user: "wishuponastoregha@gmail.com",
        pass: "graceHopper"
    }
}));
var Sequelize = require('sequelize');
module.exports = router;

//FYI:These functions should be methods on the models.

function addProductToOrder(product, userId){
    var productId = product.id
    var productQuantity = product.qnty;
 
    var createOrder = orders.build(
        {userId: userId, 
        status: 'Created'});

    return findOrderProductPair(productId, userId, createOrder)
        .then(function(result){
            var product = result.product
            var order = result.order
            return order.addProduct(product, {quantity: productQuantity})
        })
}

function findOrderProductPair(productId, userId, fallbackOrder){
    var findProduct = products.findById(productId)
    var findOrder = orders.find({
        where:{ 
            userId: userId, 
            status: 'Created'
            }
        })
    if(fallbackOrder !== undefined){
        findOrder = findOrder
        .then(function(order){
            if(!order){
                return fallbackOrder.save()
            } else{
                return order
            }
        })
    }
    return Promise.all([findOrder, findProduct])
    .then(function(values){
        return {
            product: values[1],
            order: values[0]
        }
    })
}

function removeProductFromOrder(productId, userId){
    return findOrderProductPair(productId, userId)
    .then(function(result){
        var product = result.product
        var order = result.order
        return order.removeProduct(product)
    })    
}

function updateProductQty(productId, quantity, userId){
    return findOrderProductPair(productId, userId)
    .then(function(result){
        var product = result.product
        var order = result.order
        return order.addProduct(product, {quantity: quantity})
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

// ADDING A PRODUCT TO AN ORDER
router.post('/products', function(req, res, next) {
    //console.log("IDDDDS", req.user.id, req.session.userId)
   
    var userId = req.user ? req.user.id : req.session.userId;
    console.log("USER ID", userId)
    addProductToOrder(req.body, userId)
    .then(function(response) {
        res.status(200).send(response);
    })
    .then(null, next);
        
});

//DELETE ONE PRODUCT FROM AN ORDER
router.delete('/products/:id', function(req, res, next) {
    var userId = req.user ? req.user.id : req.session.userId;
    removeProductFromOrder(req.params.id, userId)
    .then(function(response) {
        res.sendStatus(200)
    })
    .then(null, next);
        
})

//UPDATE QTY OF A PRODUCT IN AN ORDER
router.put('/products/:id', function(req, res, next) {
    var userId = req.user ? req.user.id : req.session.userId;
    if(req.body.qty < 1 || req.body.qty > 3){
        res.sendStatus(500)
        return;
    }
    updateProductQty(req.params.id, req.body.qty, userId)
    .then(function(response) {
        res.sendStatus(200)
    })
    .then(null, next);
        
})

//GET ALL PRODUCTS IN A USER'S CART
router.get('/products', function(req, res, next) {

    var userId = req.user ? req.user.id : req.session.userId;
        orders.find({
            where:{ 
                userId: userId, 
                status: 'Created'
            }
       })
       .then(function(foundOrder){
            if(!foundOrder){
                res.send({})
            } else{
               return foundOrder.getProducts()
               .then(function(foundProducts){
                    return foundProducts;
            })
               .then(function(response){
                    res.send(response);
                })
            }
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

//UPDATE ONE ORDER'S STATUS
router.put('/', function(req, res, next) {

    var userId = req.user ? req.user.id : req.session.userId;
        orders.find({
            where:{ 
                userId: userId, 
                status: 'Created'
            }
       })
        .then(function(foundOrder){
            return foundOrder.update({
                status: "Processing",
                checkoutInfo: req.body
            })
        })
        .then(function(updatedOrder){
            res.sendStatus(201)
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

router.post('/email', function(req, res, next) {

    var mailOptions = {
        from: "Wish Upon A Store",
        to: req.body.email,
        subject: "Your Wishes Will Be Granted Soon",
        text: "Thanks for placing your order, " + req.body.name
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error)
        }
        console.log("Message Sent: ", info.response)
    })
        
});