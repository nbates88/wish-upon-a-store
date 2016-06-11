'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {

    var OrderProducts = db.define('OrderProducts', {
        quantity: {
            type: Sequelize.INTEGER
        }
    })

    return OrderProducts;

};
