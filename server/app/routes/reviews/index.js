var router = require('express').Router();
var db = require('../../../db');
var Review = db.model('review');
var Product = db.model('product');
var Sequelize = require('sequelize');
module.exports = router;

// GET ALL REVIEWS FOR ONE USER
router.get('/', function(req, res, next) {
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
