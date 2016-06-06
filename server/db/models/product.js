'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('product', {
        description: {
            type: Sequelize.TEXT,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: Sequelize.Number,
            allowNull: false
        }
    })



};

// Must have title, description, price, and inventory quantity