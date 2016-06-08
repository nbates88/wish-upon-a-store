'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    var Collection = db.define('collection', {
       name: {
       	type: Sequelize.STRING,
       	allowNull: false,
       	validate: {
       		notEmpty: true
       	}
       }
    })

    return Collection;

};