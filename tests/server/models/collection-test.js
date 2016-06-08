var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/collection')(db);

var Collection = db.model('collection');

describe('Collection model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    // KC: Other tests to add if Collection model is updated:
    // - empty string (validate: {notEmpty: true})

    describe('validations', function() {

        it('has name field of type String', function() {
            return Collection.create({
                name: 'Health'
            })
            .then(function(savedCollection) {
                expect(savedCollection.name).to.equal('Health');
                expect(savedCollection.name).to.be.a('string');
            }); 
        });

        it('requires name', function() {
            return Collection.build({})
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: name cannot be null');
            });
        });

        it('does not accept empty strings in name field', function() {
            return Collection.build({
                name: ''
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation notEmpty failed');
            });
        });


    });  // ends describe validations block




    // ----------  End of tests for data types, validation.  ----------


});
