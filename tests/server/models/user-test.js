// KC: Unclear what sinon is about. Maybe encryption?
var sinon = require('sinon');
var expect = require('chai').expect;

// KC: Sequelize, dbURI, db are replacing what next line usually does:
// var db = require('../path/to/database')
var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/user')(db);

var User = db.model('user');

describe('User model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    // ----------  Start of tests for data types, validation.  ----------

    // KC: Other tests to add if User model is updated:
    // - password is required (allowNull: false)

    // KC: Commented out the User tests because of changes to the User model (not requiring email, etc).

    describe('validations', function() {

        // it('has email and name fields of type String', function() {
        //     return User.create({
        //         email: 'omg@wtf.com',
        //         name: 'Kloo Less',
        //         isAdmin: true
        //     })
        //     .then(function(savedUser) {
        //         expect(savedUser.email).to.equal('omg@wtf.com');
        //         expect(savedUser.email).to.be.a('string');
        //         expect(savedUser.name).to.equal('Kloo Less');
        //         expect(savedUser.name).to.be.a('string');
        //     }); 
        // });

        // it('requires email', function() {
        //     return User.build({
        //         name: 'Kloo Less',
        //         isAdmin: true
        //     })
        //     .validate()
        //     .then(function(result) {
        //         expect(result).to.be.an('object');
        //         expect(result.message).to.equal('notNull Violation: email cannot be null');
        //     });
        // });

        // it('requires a valid email', function() {
        //     return User.build({
        //         email: 'omg@wtf,com',
        //         name: 'Kloo Less',
        //         isAdmin: true
        //     })
        //     .validate()
        //     .then(function(result) {
        //         expect(result).to.be.an('object');
        //         expect(result.message).to.equal('Validation error: Validation isEmail failed');
        //     });
        // });

        // it('requires a unique email', function() {
        //     var user1 = User.create({
        //         email: 'omg@wtf.com',
        //         name: 'Kloo Less',
        //         isAdmin: true
        //     });

        //     // Trying to create another user with the same email as user1.
        //     return User.create({
        //         email: 'omg@wtf.com',
        //         name: 'Ida Noh',
        //         isAdmin: false
        //     })
        //     .then(function(savedUser) {
        //         // This will throw an error, which catch will handle.
        //         expect(savedUser.email).to.equal('omg@wtf.com');
        //     })
        //     .catch(function(err) {
        //         expect(err).to.exist;
        //         // console.log err to see where err.errors[0].type comes from:
        //         // console.log("BOOOOOOOOO: ", err.errors[0].type);
        //         expect(err.errors[0].type).to.equal('unique violation');
        //     });
        // });

        // it('has isAdmin field of type Boolean', function() {
        //     return User.create({
        //         email: 'omg@wtf.com',
        //         name: 'Kloo Less',
        //         isAdmin: true
        //     })
        //     .then(function(savedUser) {
        //         expect(savedUser.isAdmin).to.equal(true);
        //         expect(savedUser.isAdmin).to.be.a('boolean');
        //     });
        // });

        // it('requires isAdmin', function() {
        //     return User.build({
        //         email: 'omg@wtf.com',
        //         name: 'Kloo Less',
        //     })
        //     .validate()
        //     .then(function(result) {
        //         expect(result).to.be.an('object');
        //         expect(result.message).to.equal('notNull Violation: isAdmin cannot be null');
        //     });
        // });

    });  // ends describe validations block




    // ----------  End of tests for data types, validation.  ----------



    // ----------  Start of tests for encryption (included with FSG). ----------

    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok;
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {};
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

                expect(hashDigestStub.calledWith('hex')).to.be.ok;
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({
                    email: 'omg@wtf.com', 
                    password: 'WritingTestsIsHard',
                    isAdmin: true });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });

            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('WritingTestsIsHard', generatedSalt)).to.be.ok;
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
            });

            it('should set user.password to the encrypted password', function (done) {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

        describe('sanitize method', function () {

            var createUser = function () {
                return User.create({
                    email: 'omg@wtf.com', 
                    password: 'WritingTestsIsHard',
                    isAdmin: true });
            };

            it('should remove sensitive information from a user object', function () {
                createUser().then(function (user) {
                    var sanitizedUser = user.sanitize();
                    expect(user.password).to.be.ok;
                    expect(user.salt).to.be.ok;
                    expect(sanitizedUser.password).to.be.undefined;
                    expect(sanitizedUser.salt).to.be.undefined;
                });
            });
        });

    });

    // ----------  End of tests for encryption (included with FSG). ----------

});
