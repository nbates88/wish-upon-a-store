'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Order = db.define('order', {
        status: {
            type: Sequelize.STRING,
            validate: {
            	isIn: [["Created", "Processing", "Cancelled", "Completed"]]
            }
        }
       
    })

    return Order;

};