var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/order')(db);

var Order = db.model('order');

describe('Order model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    describe('validations', function() {

        it('has status field of type String', function() {
            return Order.create({
                status: 'Created'
            })
            .then(function(savedOrder) {
                expect(savedOrder.status).to.equal('Created');
                expect(savedOrder.status).to.be.a('string');
            }); 
        });

        it('accepts only valid status values', function() {
            return Order.build({
                status: 'Considering'
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation isIn failed');
            }); 
        });

    });  // ends describe validations block




    // ----------  End of tests for data types, validation.  ----------


});
