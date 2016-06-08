var expect = require('chai').expect;
var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db', {loggging: false});
var Order = db.model('order');
var User = db.model('user');
var supertest = require('supertest');

var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('/orders', function() {
    // before(function() {
    //     return db.sync({ force: true });
    // });

    var userInfo = {
        name: 'Mr. H',
        email: 'test@test.com',
        isAdmin: true,
        password: "myPassword"
    };

    before(function(done) {
        return User.create(userInfo).then(function (user) {
            done();
        }).catch(done);
    });

    before(function(done){
        agent.post('/login').send(userInfo).end(done);
    })

    // after(function() {
    //     return db.sync({ force: true });
    // });

    describe('GET /orders', function() {
        var order;
        beforeEach(function() {
            return Order.create({
                status: "Processing"
                })
                .then(function(o) {
                    order = o;
                    return Order.create({
                       status: "Created"
                    });
                });
        });

        it('returns all of the orders in the DB', function(done) {
                return agent
                .get('/api/orders')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    done();    
                });
        });
    });

    describe('POST /orders', function() {


        it('creates a new order', function(done) {
                return agent
                .post('/api/orders')
                .send({
                    status: "Created"
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.status).to.equal('Created');
                    expect(res.body.id).to.exist;
                    Order.findById(res.body.id)
                    .then(function(b) {
                        expect(b).to.not.be.null;
                        done();
                    })
                    .catch(done);
                });
        });
    });

    describe('GET /orders/:id', function() {
        it('returns an order by id', function(done) {
                return agent
                .get('/api/orders/1')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.status).to.equal('Processing');
                    done();
                });
        });
    });

    describe('PUT /orders/:id', function() {
        it('updates an order', function(done) {
                return agent
                .put('/api/orders/2')
                .send({
                    status: 'Processing'
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.status).to.equal('Processing');
                    Order.findById(2)
                    .then(function(b) {
                        expect(b).to.not.be.null;
                        done();
                    })
                    .catch(done);
                });
        });
    });

    describe('DELETE /orders/:id', function() {
        it('deletes an order', function(done) {
                return agent
                .delete('/api/orders/2')
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Order.findById(2)
                    .then(function (b) {
                        expect(b).to.be.null;
                        done();
                    })
                    .catch(done);
                });
        });
    });
});
