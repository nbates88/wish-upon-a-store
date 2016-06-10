'use strict';
var router = require('express').Router();
// var db = require('../../../db');
// var users = db.model('user');

module.exports = router;

// router.use('/', function(req,res, next){
//   if(!req.user){
//         users.create()
//        .then(function(user){
//         req.user = user;
//         console.log("REQ USER", req.user)
//             return user.dataValues.id;
//        })
//     }
//   next();
// })

router.use('/members', require('./members'));
router.use('/collections', require('./collections'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
