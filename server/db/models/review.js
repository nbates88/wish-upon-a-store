'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Review = db.define('review', {
       stars: {
       	type: Sequelize.DECIMAL(10,1),
       	allowNull: false,
        validate: {
          isInt: true,
          min: 1.0,
          max: 5.0
        }
       },

       description: {
       	type: Sequelize.TEXT,
       	allowNull: false,
        validate: {
          notEmpty: true
        }
       }
     
    })

    return Review;

};