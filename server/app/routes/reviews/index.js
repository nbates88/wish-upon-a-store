var router = require('express').Router();
var db = require('../../../db');
var Review = db.model('review');
var Product = db.model('product');
var User = db.model('user');
var Sequelize = require('sequelize');
module.exports = router;

// GET ALL REVIEWS FOR ONE USER
router.get('/', function(req, res, next) {
    Review.findAll({
        include: [Product, User]
    })
        .then(function(reviews) {
            res.status(200).send(reviews);
        });
});

// DELETE ONE REVIEW
router.delete('/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) res.sendStatus(403);
    else {
        Review.findById(req.params.id)
            .then(function(review) {
                return review.destroy();
            })
            .then(function(response) {
                res.status(204).redirect('/');
            });
    }
});

// GET ALL REVIEWS FOR ONE USER
router.get('/user', function(req, res, next) {
    Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [{model: Product}]
    })
        .then(function(reviews) {
            res.status(200).send(reviews);
        });
});


