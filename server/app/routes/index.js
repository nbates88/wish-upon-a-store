'use strict';
var router = require('express').Router();
var db = require('../../db');
var users = db.model('user');

module.exports = router;

//ADD A USER RIGHT AWAY
router.use('/', function(req,res, next){
  
  if(!req.session.userId || !req.user){
        users.create()
       .then(function(user){
        req.session.userId = user.dataValues.id;
            return req.session.userId;
       });
    }

  console.log("REQ SESSION USER", req.session.userId);

  next();
});

router.use('/members', require('./members'));
router.use('/collections', require('./collections'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
