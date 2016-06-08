// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
process.env.NODE_ENV = 'testing';
var db = require('../../../server/db', {loggging: false});
var User = db.model('user');
var supertest = require('supertest');

var app = require('../../../server/app')(db);
var agent = supertest.agent(app);

describe('/users', function() {

    before(function() {
        return db.sync({ force: true });
    });

    var user;
    var userInfo = {
        name: 'Mr. H',
        email: 'test@test.com',
        isAdmin: true,
        password: "myPassword"
    };
    var user2Info = {
        name: 'Mrs. M',
        email: 'email@test.com',
        isAdmin: false,
        password: "password"
    };

    before(function() {
        return User.create(userInfo)
        .then(function (u) {
            user = u;
            return User.create(user2Info)
        })
    });

    before(function(done){
        agent.post('/login').send(userInfo).end(done);
    })

    // after(function() {
    //     return db.sync({ force: true });
    // });

    describe('GET /users', function() {

        it('returns all of the users in the DB', function(done) {
                return agent
                .get('/api/users')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(2);
                    done();    
                });
        });
    });

    describe('POST /users', function() {
        it('creates a new user', function(done) {
                return agent
                .post('/api/users')
                .send({
                    name: 'Mrs. Blah',
                    email: 'emailthree@test.com',
                    isAdmin: false,
                    password: "Aaapassword"
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal('Mrs. Blah');
                    expect(res.body.id).to.exist;
                    User.findById(res.body.id)
                    .then(function(b) {
                        expect(b).to.not.be.null;
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
