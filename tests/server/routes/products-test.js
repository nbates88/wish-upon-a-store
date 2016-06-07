// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});
var Product = require('../../../server/db/models/product')(db);
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('/products', function(){
	before(function () {
    	return db.sync({force: true});
  	});

  	afterEach(function () {
    	return db.sync({force: true});
  	});

	describe('GET /products', function() {
		var product;
      beforeEach(function () {
        return Product.create({
          	name: 'Product1',
	        description: 'a product',
	        price: 10.0,
	        inventoryQuantity: 2
        })
        .then(function (p) {
          product = p;
          return Product.create({
          	name: 'Product2',
	        description: 'another product',
	        price: 12.0,
	        inventoryQuantity: 5
          });
        });
      });

	   it('returns all of the products in the DB', function () {
	   		it('GET all', function (done) {
	        agent
	        .get('/products')
	        .expect(200)
	        .end(function (err, res) {
	          if (err) return done(err);
	          expect(res.body).to.be.instanceof(Array);
	          expect(res.body).to.have.length(2);
	          done();
	        });
	      });
		});
	});

	describe('POST /products', function () {

	    it('creates a new product', function () {
	    	it('POST all', function (done) {
	      	agent
	        .post('/products')
	        .send({
	        	name: 'Product3',
	       		description: 'yay product',
	        	price: 15.0,
	        	inventoryQuantity: 5
	        })
	        .expect(200)
	        .end(function (err, res) {
	          if (err) return done(err);
	          expect(res.body.title).to.equal('Book Made By Test');
	          expect(res.body.id).to.exist;
	          Book.findById(res.body.id)
	          .then(function (b) {
	            expect(b).to.not.be.null;
	            expect(res.body).to.eql(toPlainObject(b));
	            done();
	          })
	          .catch(done);
        	});
	    	});
	    });
	});

	 describe('GET /products/:id', function() {
		it('returns a product by id', function () {
		  	it('GET one', function (done) {
	        agent
	        .get('/products/' + product.id)
	        .expect(200)
	        .end(function (err, res) {
	          if (err) return done(err);
	          expect(res.body.name).to.equal(product.name);
	          done();
	        });
	      	});
		});
	 });

	describe('PUT /products/:id', function () {
		it('returns a product by id', function () {
			it('PUT one', function (done) {
	        agent
	        .put('/product/' + product.id)
	        .send({
	          name: 'Another Product'
	        })
	        .expect(200)
	        .end(function (err, res) {
	          if (err) return done(err);
	          expect(res.body.name).to.equal('Another Product');
	          Product.findById(book.id)
	          .then(function (b) {
	            expect(b).to.not.be.null;
	            expect(res.body).to.eql(toPlainObject(b));
	            done();
	          })
	          .catch(done);
	        });
	      	});
		});
	});
});


