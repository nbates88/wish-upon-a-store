var router = require('express').Router();

var db = require('../../../db');
var Order = db.model('order');
var User = db.model('user');
var Product = db.model('product');
var passport = ('passport');
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "wishuponastoregha@gmail.com",
        pass: ""
    }
}));
var Sequelize = require('sequelize');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_tjLm2xBtWM5KW8ShhgWyGiy8");


module.exports = router;

//FYI:These functions should be methods on the models.

function addProductToOrder(product, userId) {
    var productId = product.id
    var productQuantity = product.qnty;

    var createOrder = Order.build({
        userId: userId,
        status: 'Created'
    });

    return findOrderProductPair(productId, userId, createOrder)
        .then(function(result) {
            var product = result.product
            var order = result.order
            return order.addProduct(product, { quantity: productQuantity })
        })
}

function findOrderProductPair(productId, userId, fallbackOrder) {
    var findProduct = Product.findById(productId)
    var findOrder = Order.find({
        where: {
            userId: userId,
            status: 'Created'
        }
    })
    if (fallbackOrder !== undefined) {
        findOrder = findOrder
            .then(function(order) {
                if (!order) {
                    return fallbackOrder.save()
                } else {
                    return order
                }
            })
    }
    return Promise.all([findOrder, findProduct])
        .then(function(values) {
            return {
                product: values[1],
                order: values[0]
            }
        })
}

function removeProductFromOrder(productId, userId) {
    return findOrderProductPair(productId, userId)
        .then(function(result) {
            var product = result.product
            var order = result.order
            return order.removeProduct(product)
        })
}

function updateProductQty(productId, quantity, userId) {
    return findOrderProductPair(productId, userId)
        .then(function(result) {
            var product = result.product
            var order = result.order
            return order.addProduct(product, { quantity: quantity })
        })
}

// GET ALL ORDERS
router.get('/', function(req, res, next) {
    if (!req.user.isAdmin) res.sendStatus(403);
    else {
        Order.findAll()
            .then(function(response) {
                res.status(200).send(response);
            })
            .then(null, next);
    }
});

// GET ALL ORDERS BY USER ID
router.get('/user', function(req, res, next) {
    if (!req.user) res.sendStatus(403);
    else {
        Order.findAll({
            where: {
                userId: req.user.id
            },
            include: [Product]
        })
            .then(function(response) {
                res.status(200).send(response);
            })
            .then(null, next);
    }
});

// ADDING A PRODUCT TO AN ORDER
router.post('/products', function(req, res, next) {
    var userId = req.user ? req.user.id : req.session.userId;
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
    if (req.body.qty < 1 || req.body.qty > 3) {
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
    Order.find({
            where: {
                userId: userId,
                status: 'Created'
            }
        })
        .then(function(foundOrder) {
            if (!foundOrder) {
                res.send({})
            } else {
                return foundOrder.getProducts()
                    .then(function(foundProducts) {
                        return foundProducts;
                    })
                    .then(function(response) {
                        res.send(response);
                    })
            }
        })

    .then(null, next);
});

// GET ONE ORDER BY ID
router.get('/:id', function(req, res, next) {
    Order.findById(req.params.id)
        .then(function(response) {
            if (response.user === req.user || req.user.isAdmin) {
                res.status(200).send(response);
            } else {
                res.sendStatus(403);
            }
        })
        .then(null, next);
});

//UPDATE ONE ORDER'S STATUS UPON ORDERING
router.put('/', function(req, res, next) {
    var userId = req.user ? req.user.id : req.session.userId;
    Order.find({
            where: {
                userId: userId,
                status: 'Created'
            }
        })
        .then(function(foundOrder) {
            return foundOrder.update({
                status: "Processing",
                checkoutInfo: req.body
            })
        })
        .then(function(updatedOrder) {
            res.sendStatus(201)
        })
        .then(null, next);
});

// ROUTE FOR ADMIN CHANGING ORDER STATUS
router.put('/status', function(req, res, next) {
    if (!req.user.isAdmin) res.sendStatus(403);
    var theOrder
    Order.find({
            where: {
                id: req.body.id,
            }
        })
        .then(function(foundOrder) {
            return foundOrder.update({
                status: req.body.status,
            })
        })
        .then(function(updatedOrder) {
            theOrder = updatedOrder
            return User.findById(updatedOrder.userId)
        })
        .then(function(foundUser) {
            var mailOptions = {
                from: "Wish Upon A Store",
                to: foundUser.email,
                subject: "Your order has been updated",
                text: "Hi " + foundUser.name + ". Your order is now " + theOrder.status + "."
            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error)
                }
                console.log("Message Sent: ", info.response)
            })
            res.sendStatus(201)
        })
        .then(null, next);
});


// DELETE ONE ORDER
router.delete('/:id', function(req, res, next) {
    Order.findById(req.params.id)
        .then(function(response) {
            if (response.user === req.user || req.user.isAdmin) {
                return response.destroy()
                    .then(function(response) {
                        res.redirect(204, '/');
                    });
            } else {
                res.sendStatus(403);
            }
        })
        .then(null, next);
});

router.post('/checkout', function(req, res, next) {

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = req.body.stripeToken;
    console.log(req.body)
    var charge = stripe.charges.create({
      amount: req.body.amount, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: "Example charge"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
        console.error(err);
      }
      else console.log("yay")
    });

     var mailOptions = {
        from: "Wish Upon A Store",
        to: req.body.stripeEmail,
        subject: "Your Wishes Will Be Granted Soon",
        text: "Thanks for placing your order, " + req.body.stripeEmail
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error)
        }
        console.log("Message Sent: ", info.response)
    })
    var userId = req.user ? req.user.id : req.session.userId;
    Order.find({
            where: {
                userId: userId,
                status: 'Created'
            }
        })
        .then(function(foundOrder) {
            return foundOrder.update({
                status: "Processing"
            })
        })
        .then(function(updatedOrder) {
            res.send("Yay! Your wish is on its way!").status(201)
        })
        .then(null, next);

});
