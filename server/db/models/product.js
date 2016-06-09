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
        // hooks: {
        //     KC: Function to force 2 decimal places not working as expected. Will worry about it later.
        //     EI: why do you need this hook?
        //     beforeValidate: function (product) {
        //         function twoDecimalPlaces(num) {
        //             var numString = num.toString;
        //             if (num % 1 === 0) return (numString + ".00")*1;
        //             else if (numString.split('.')[1].length === 1) return (numString + ".0")*1;
        //             else return (numString + numString.split('.')[1].slice(0,2).join())*1;
        //         }           

        //         product.price = twoDecimalPlaces(product.price);
        //     }
        // }
    })

   return Product;

};