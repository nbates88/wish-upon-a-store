var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/review')(db);

var Review = db.model('review');

describe('Review model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    describe('validations', function() {

        it('has description field of type String (even though it\'s Text)', function() {
            return Review.create({
                stars: 5,
                description: "This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!"
            })
            .then(function(savedReview) {
                expect(savedReview.description).to.equal("This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!");
                expect(savedReview.description).to.be.a('string');
            }); 
        });

        it('requires description', function() {
            return Review.build({
                stars: 5
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: description cannot be null');
            });
        });

        // // This version also works.
        // it('does not accept empty strings in description field', function() {
        //     return Review.create({
        //         stars: 5,
        //         description: ''
        //     })
        //     .then(function(savedReview) {
        //         expect(savedReview.description).to.equal('');
        //     })
        //     .catch(function(err) {
        //         expect(err).to.exist;
        //         // console.log err to see where err.errors[0].message comes from:
        //         // console.log("BOOOOOOOOO: ", err.errors[0].message);
        //         // console.log("ERROR: ", err.errors[0].message);
        //         expect(err.errors[0].message).to.equal('Validation notEmpty failed');
        //     });
        // });

        it('does not accept empty strings in description field', function() {
            return Review.build({
                stars: 5,
                description: ''
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation notEmpty failed');
            });
        });

        it('requires stars', function() {
            return Review.build({
                description: "This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: stars cannot be null');
            });
        });

        it('accepts only integers in stars field', function() {
            return Review.build({
                stars: 3.5,
                description: "This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation isInt failed');
            }); 
        });

        it('has 1 has the minimum value for stars field', function() {
            return Review.build({
                stars: 0,
                description: "This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation min failed');
            }); 
        });

        it('has 5 has the maximum value for stars field', function() {
            return Review.build({
                stars: 6,
                description: "This wish changed my life!!! I'd give it 50 stars if I could!!! OMG SO MANY EXCLAMATION POINTS I LOVE IT SO MUCH!!!!!!"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation max failed');
            }); 
        });

    });  // ends describe validations block




    // ----------  End of tests for data types, validation.  ----------


});
