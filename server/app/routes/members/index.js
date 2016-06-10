'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../../db');
var users = db.model('user');
var orders = db.model('order');
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    console.log('isAuthenticated')
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/myaccount', ensureAuthenticated, function (req, res) {
    // console.log('hit backend route' );
    // get user page
    // if(!req.user) res.sendStatus(403);
    // else {
    users.find({
        where: {
            id: req.user.id
        },
        include: [{model: orders, as: "Orders"}]
    })
        .then(function(response) {
            console.log('info from db is', response);
            res.status(200).send(response);
        });
    // }

    // res.send();
});
