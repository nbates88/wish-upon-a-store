var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/product')(db);

var Product = db.model('product');

describe('Product model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    describe('validations', function() {

        it('has name and imageUrl fields of type String', function() {
            return Product.create({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .then(function(savedProduct) {
                expect(savedProduct.name).to.equal('Post-graduation Employment');
                expect(savedProduct.name).to.be.a('string');
                expect(savedProduct.imageUrl).to.equal('https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg');
                expect(savedProduct.imageUrl).to.be.a('string');
            }); 
        });

        it('requires name', function() {
            var product = Product.build({
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            });

            return product.validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: name cannot be null');
            });
        });

        it('requires a unique name', function() {
            var product1 = Product.create({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            });

            // Trying to create another product with the same name as product1.
            return Product.create({
                name: 'Post-graduation Employment',
                price: 715.00,
                inventoryQuantity: 2200,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .then(function(savedProduct) {
                // This will throw an error, which catch will handle.
                expect(savedProduct.name).to.equal('Post-graduation Employment');
            })
            .catch(function(err) {
                expect(err).to.exist;
                // console.log err to see where err.errors[0].type comes from:
                // console.log("BOOOOOOOOO: ", err.errors[0].type);
                expect(err.errors[0].type).to.equal('unique violation');
            });
        });

        it('does not accept empty strings in name field', function() {
            return Product.build({
                name: '',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation notEmpty failed');
            });
        });

        it('has description field of type String (even though it\'s Text)', function() {
            return Product.create({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .then(function(savedProduct) {
                expect(savedProduct.description).to.equal("You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!");
                expect(savedProduct.description).to.be.a('string');
            }); 
        });

        it('requires price', function() {
            return Product.build({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: price cannot be null');
            });
        });

        it('requires price to be a (decimal) number', function() {
            return Product.build({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 'boogie woogie',
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation isDecimal failed');
            });
        });

        it('rounds price to 2 decimal places', function() {
            return Product.create({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.155,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .then(function(savedProduct) {
                // // KC: Apparently it saves as a string.
                // expect(savedProduct.price).to.be.a('number');
                expect(savedProduct.price).to.equal('7.16');
            });
        });

        it('pads price to 2 decimal places', function() {
            return Product.create({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.1,
                inventoryQuantity: 22,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .then(function(savedProduct) {
                // // KC: Apparently it saves as a string.
                // expect(savedProduct.price).to.be.a('number');
                expect(savedProduct.price).to.equal('7.10');
            });
        });

        it('requires inventoryQuantity', function() {
            return Product.build({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('notNull Violation: inventoryQuantity cannot be null');
            });
        });

        it('requires inventoryQuantity to be an integer', function() {
            return Product.build({
                name: 'Post-graduation Employment',
                description: "You've busted your butt on databases and routes, eaten countless bowls of cereal, and trusted the process despite deep DEEP (we're talkin' deeeeeeeeep) levels of confusion and doubt. Now let's get you a JOB homie!",
                price: 7.15,
                inventoryQuantity: 2.2,
                imageUrl: "https://pixabay.com/static/uploads/photo/2015/05/24/21/19/wish-782424_960_720.jpg"
            })
            .validate()
            .then(function(result) {
                expect(result).to.be.an('object');
                expect(result.message).to.equal('Validation error: Validation isInt failed');
            });
        });

    });  // ends describe validations block


    // ----------  End of tests for data types, validation.  ----------


});
