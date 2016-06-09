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
            unique: true, 
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        inventoryQuantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
        }
    }, {
        hooks: {
            beforeValidate: function (product) {
                product.price = parseFloat(product.price).toFixed(2);
            }
        }
    })

   return Product;

};