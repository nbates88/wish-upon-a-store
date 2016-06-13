'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {

    var Order = db.define('order', {
        status: {
            type: Sequelize.STRING,
            validate: {
                isIn: [
                    ["Created", "Processing", "Cancelled", "Completed"]
                ]
            }
        },
        _createdAt: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        _updatedAt: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        checkoutInfo: {
            type: Sequelize.JSON
        }

    })

    return Order;

};
