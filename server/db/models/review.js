'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Review = db.define('review', {
       stars: {
       	type: Sequelize.ENUM(1, 2, 3, 4, 5),
       	allowNull: false
       },
       description: {
       	type: Sequelize.TEXT,
       	allowNull: false,
       	notEmpty: true
       }
     
    })

    return Review;

};