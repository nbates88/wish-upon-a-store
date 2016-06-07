// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});
require('../../../server/models/products')(db);

var supertest = require('supertest');

describe('/products', function() {


})