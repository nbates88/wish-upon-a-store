'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Review = db.define('review', {
       stars: {
       	type: Sequelize.INTEGER,
       	allowNull: false,
        validate: {
          isInt: true,
          min: 1,
          max: 5
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