'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db) {

    var User = db.model('user');

    // Define strategy function that will be passed to passport.use.
    var strategyFn = function(email, password, done) {
        console.log("AUTH EMAIL:", email)

        // find the user in the database
        User.find({
                where: {
                    email: email
                }
            })
            .then(function(result) {

                // if the user already exists, LOGIN:
                if (result) {
                    let user = result;
                    // console.log("user: ", user);
                    // console.log("AUTH PW:", password)
                    // user.correctPassword is a method from the User schema.
                    if (!user || !user.correctPassword(password)) {
                        done(null, false);
                    } else {
                        // Properly authenticated.
                        done(null, user);
                    }

                    // if the user DOESN'T exist (new user SIGNUP), create one:
                } else {
                    // console.log("no user exists");
                    // console.log("user email: ", email);
                    // console.log("user password: ", password);

                    return User.create({
                            email: email,
                            password: password
                        })
                        .then(function(user) {
                            // console.log("user: ", user);
                            // console.log("AUTH PW:", password)
                            // user.correctPassword is a method from the User schema.
                            if (!user || !user.correctPassword(password)) {
                                done(null, false);
                            } else {
                                // Properly authenticated.
                                done(null, user);
                            }
                        })

                }
            })
    };


    // Define how your authentication works (messages for invalid username or password, etc).
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, strategyFn));




    // A POST /login route is created to handle login.
    // ALSO HANDLES SIGN UP
    app.post('/login', function(req, res, next) {

        var authCb = function(err, user) {
            console.log('err from passport :', err)
            console.log('if not user', user)
            if (err) return next(err);

            if (!user) {
                var error = new Error("User doesn't exist. Please sign up.");
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function(loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });
        };

        passport.authenticate('local', authCb)(req, res, next);

    });


    app.put('/login', function(req, res, next) {

        User.find({
                where: {
                    email: req.user.email
                }
            })
            .then(function(user) {
                if (!user) throw new Error('user not found')
                console.log("new password: ", req.body.newpassword);
                // Need to update BOTH password and salt because the updatePassword changes both of these properties.
                return user.update({ password: user.updatePassword(req.body.newpassword), salt: user.salt });
            })
            .then(function(me) {
                console.log('me after save: ', me)
                res.send({ message: "You just updated your password like a ROCK STAR!" });
            })
            .catch(next);

    });

}; // closes module.exports
