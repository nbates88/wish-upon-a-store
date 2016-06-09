// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
// var dbURI = 'postgres://localhost:5432/testing-fsg';
// var db = new Sequelize(dbURI, {
//     logging: false
// });
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db/');
var Order = db.model('order');
var User = db.model('user');
var supertest = require('supertest');
var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('orders', function() {

    // seed db with 2 fake orders and 1 fake user
    var allorders, order1, order2, admin, fakeUser;
    before(function() {
        order1 = { name: 'order1', status: 'Created' };
        order2 = { name: 'order2', status: 'Created' };
        fakeUser = {
            email: 'whatsupdoc@gmail.com',
            name: 'Bugs Bunny',
            password: 'sosecret',
            isAdmin: true
        };
        return Order.bulkCreate([order1, order2])
            .then(function(response) {
                return Order.findAll();
            })
            .then(function(response) {
                allorders = response;
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

    describe('GET /api/orders', function(next) {
        it('retrieves all the orders', function(done) {
            return agent
                .get('/api/orders/')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    // expect(res.body[0].name).to.be.equal('order1');
                    done();
                });
        });
    });

    describe('GET /orders/:id', function() {
        it('returns a order by id', function(done) {
            agent
                .get('/api/orders/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(order1.name);
                    done();
                });
        });
    });

    describe('non-admins cannot do things', function() {
        it('forbids non-admins from posting', function(done) {
            agent
                .post('/api/orders/')
                .send({name: 'Should not work'})
                .expect(403, done);
        });

        it('forbids non-admins from updating', function(done) {
            var updated = {name: 'Updated name yo'};
            agent
                .put('/api/orders/1')
                .send(updated)
                .expect(403, done);
        });

        it('forbids non-admins from deleting', function(done) {
            agent
                .delete('/api/orders/1')
                .expect(403, done);
        });
    });

    describe('admin rights', function() {
        var loggedInAgent;
        var order3 = {name: 'updated'};

        beforeEach('log in admin', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(fakeUser).end(done);
        });

        it('admins can post', function(done) {
            loggedInAgent
                .post('/api/orders/')
                .send(order3)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(order3.name);
                    done();
                });
        });

        it('admins can update', function(done) {
            var updated = {name: 'Updated name yo'};
            loggedInAgent
                .put('/api/orders/1')
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
                .delete('/api/orders/1')
                // status is 302 and not 204 because of the redirect
                .expect(302, done); 
        });
    });
});
