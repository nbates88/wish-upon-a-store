'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../../db');
var User = db.model('user');
var Order = db.model('order');
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
    User.findOne({
        where: {
            id: req.user.id
        },
    })
        .then(function(response) {
            console.log('info from db is', response);
            res.status(200).send(response);
        });
    // }

    // res.send();
});
