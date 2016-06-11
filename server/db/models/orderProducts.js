'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {

    var OrderProducts = db.define('OrderProducts', {
        Quantity: {
            type: Sequelize.INTEGER
        }

    })

    return OrderProducts;

};
