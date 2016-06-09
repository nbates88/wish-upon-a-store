var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
// EI: might want to turn this off, made reading tests easier for me
var db = new Sequelize(env.DATABASE_URI, {
	logging: false
});

module.exports = db;
