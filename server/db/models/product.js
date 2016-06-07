'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

   var Product = db.define('product', {
        description: {
            type: Sequelize.TEXT,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        inventoryQuantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
        }
    })

   return Product;

};