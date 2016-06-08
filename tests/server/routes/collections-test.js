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
var User = db.model('user');
var supertest = require('supertest');
var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('collections', function() {

    // seed db with 2 fake collections and 1 fake user
    var allCollections, collection1, collection2, admin, fakeUser;
    before(function() {
        collection1 = { name: 'collection1' };
        collection2 = { name: 'collection2' };
        fakeUser = {
            email: 'whatsupdoc@gmail.com',
            name: 'Bugs Bunny',
            password: 'sosecret',
            isAdmin: true
        };
        return Collection.bulkCreate([collection1, collection2])
            .then(function(response) {
                return Collection.findAll();
            })
            .then(function(response) {
                allCollections = response;
                return User.create(fakeUser);
            })
            .then(function(response) {
                admin = response;
            });
    });

    after(function(done) {
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
                    // expect(res.body[0].name).to.be.equal('collection1');
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

    describe('non-admins cannot do things', function() {
        it('forbids non-admins from posting', function(done) {
            agent
                .post('/api/collections/')
                .send({name: 'Should not work'})
                .expect(403, done);
        });

        it('forbids non-admins from updating', function(done) {
            var updated = {name: 'Updated name yo'};
            agent
                .put('/api/collections/1')
                .send(updated)
                .expect(403, done);
        });

        it('forbids non-admins from deleting', function(done) {
            agent
                .delete('/api/collections/1')
                .expect(403, done);
        });
    });

    describe('admin rights', function() {
        var loggedInAgent;
        var collection3 = {name: 'updated'};

        beforeEach('log in admin', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(fakeUser).end(done);
        });

        it('admins can post', function(done) {
            loggedInAgent
                .post('/api/collections/')
                .send(collection3)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(collection3.name);
                    done();
                });
        });

        it('admins can update', function(done) {
            var updated = {name: 'Updated name yo'};
            loggedInAgent
                .put('/api/collections/1')
                .send(updated)
                .expect(300)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(updated.name);
                    done();
                });
        });

        it('admins can delete', function(done) {
            loggedInAgent
                .delete('/api/collections/1')
                // status is 302 and not 204 because of the redirect
                .expect(302, done); 
        });
    });
});
