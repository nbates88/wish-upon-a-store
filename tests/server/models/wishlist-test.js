var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/wishlist')(db);

var Wishlist = db.model('wishlist');

describe('Wishlist model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    describe('validations', function() {

        it('has name field of type String', function() {
            return Wishlist.create({
                name: 'Wishlist for World Domination'
            })
            .then(function(savedWishlist) {
                expect(savedWishlist.name).to.equal('Wishlist for World Domination');
                expect(savedWishlist.name).to.be.a('string');
            }); 
        });

        it('has name field with default value of null', function() {
            return Wishlist.create({})
            .then(function(savedWishlist) {
                expect(savedWishlist.name).to.equal(null);
            }); 
        });

    });  // ends describe validations block




    // ----------  End of tests for data types, validation.  ----------


});
