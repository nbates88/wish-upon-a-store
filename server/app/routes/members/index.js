'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../../db');
var User = db.model('user');

var ensureAuthenticated = function (req, res, next) {

    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/myaccount', ensureAuthenticated, function (req, res) {

    User.findOne({
        where: {
            id: req.user.id
        },
    })
        .then(function(response) {
            res.status(200).send(response);
        });
});
