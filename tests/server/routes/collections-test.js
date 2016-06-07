// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
// var dbURI = 'postgres://localhost:5432/testing-fsg';
// var db = new Sequelize(dbURI, {
//     logging: false
// });
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db/');
var Collection = db.model('collection');
var supertest = require('supertest');
var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('collections', function() {

    var allCollections, collection1, collection2;
    beforeEach(function() {
        collection1 = { name: 'collection1' };
        collection2 = { name: 'collection2' };
        return Collection.bulkCreate([collection1, collection2])
            .then(function(response) {
                return Collection.findAll();
            })
            .then(function(response) {
                allCollections = response;
            });
    });

    afterEach(function(done) {
        return db.sync({ force: true })
            .then(function() {
                done();
            });
    });

    describe('GET /api/collections', function(next) {
        it('retrieves all the collections', function(done) {
            return agent
                .get('/api/collections/')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].name).to.be.equal('collection1');
                    done();
                });
        });
    });

    describe('GET /collections/:id', function() {
        it('returns a collection by id', function(done) {
            agent
                .get('/api/collections/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(collection1.name);
                    done();
                });
        });
    });
});
