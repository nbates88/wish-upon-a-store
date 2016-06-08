'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Wishlist = db.define('wishlist', {
        name: {
            type: Sequelize.STRING,
            default: null
            } 
    })

    return Wishlist;

};