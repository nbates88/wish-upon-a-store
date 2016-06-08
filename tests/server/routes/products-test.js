// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
// var dbURI = 'postgres://localhost:5432/testing-fsg';
// var db = new Sequelize(dbURI, {
//     logging: false
// });
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db', {loggging: false});
var Product = db.model('product');

// var Product = require('../../../server/db/models/product')(db);
var supertest = require('supertest');

var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('/products', function() {
    before(function() {
        return db.sync({ force: true });
    });

    // afterEach(function() {
    //     return db.sync({ force: true });
    // });
   
    describe('GET /products', function() {
        var product;
        beforeEach(function() {
            return Product.create({
                    name: 'Product1',
                    description: 'a product',
                    price: 10.0,
                    inventoryQuantity: 2
                })
                .then(function(p) {
                    product = p;
                    return Product.create({
                        name: 'Product2',
                        description: 'another product',
                        price: 12.0,
                        inventoryQuantity: 5
                    });
                });
        });

        it('returns all of the products in the DB', function(done) {
                return agent
                .get('/api/products')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    done();    
                });
        });
    });

    describe('POST /products', function() {

        it('creates a new product', function(done) {
                return agent
                .post('/api/products')
                .send({
                    name: 'Product3',
                    description: 'yay product',
                    price: 15.0,
                    inventoryQuantity: 5
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.product.name).to.equal('Product3');
                    expect(res.body.id).to.exist;
                    Book.findById(res.body.id)
                    .then(function(b) {
                        expect(b).to.not.be.null;
                        expect(res.body).to.eql(toPlainObject(b));
                        done();
                    })
                    .catch(done);
                });
        });
    });

    describe('GET /products/:id', function() {
        it('returns a product by id', function(done) {
                return agent
                .get('/api/products/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal('Product1');
                    done();
                });
        });
    });

    describe('PUT /products/:id', function() {
        it('updates a product', function(done) {
                return agent
                .put('/api/products/2')
                .send({
                    name: 'A Product'
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal('A Product');
                    Product.findById(2)
                    .then(function(b) {
                        expect(b).to.not.be.null;
                        expect(res.body).to.eql(toPlainObject(b));
                        done();
                    })
                    .catch(done);
                });
        });
    });

    describe('DELETE /products/:id', function() {
        it('deletes a product', function(done) {
                return agent
                .delete('/api/products/2')
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Product.findById(2)
                    .then(function (b) {
                        expect(b).to.be.null;
                        done();
                    })
                    .catch(done);
                });
        });
    });
});
