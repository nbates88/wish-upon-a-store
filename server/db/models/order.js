'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Order = db.define('order', {
        status: {
            type: Sequelize.ENUM("Created", "Processing", "Cancelled", "Completed")
        }
       
    })

    return Order;

};