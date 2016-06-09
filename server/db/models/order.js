'use strict';
var Sequelize = require('sequelize');

let formatDate = function(rawDateString) {
	let date = rawDateString.slice(0, 10).split('-');
	let months = {
		'01': 'January',
		'02': 'February',
		'03': 'March',
		'04': 'April',
		'05': 'May',
		'06': 'June',
		'07': 'July',
		'08': 'August',
		'09': 'September',
		'10': 'October',
		'11': 'November',
		'12': 'December',
	};
	return `${months[date[1]]} ${date[2]}, ${date[0]}`;
}

module.exports = function (db) {

    var Order = db.define('order', {
        status: {
            type: Sequelize.STRING,
            validate: {
            	isIn: [["Created", "Processing", "Cancelled", "Completed"]]
            }
        },
        _createdAt: {
        	type: Sequelize.STRING
        },
        _updatedAt: {
        	type: Sequelize.STRING
        }
       
    }, {
    	hooks: {
    		beforeValidate: function() {
    			this._createdAt = formatDate(this.createdAt);
    			this._updatedAt = formatDate(this.updatedAt);
    		}
    	}
    })

    return Order;

};