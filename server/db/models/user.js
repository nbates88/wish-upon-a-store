
'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

   var User = db.define('user', {
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
            // KC: Added this because all the User model tests are breaking after the changes to the define block (for requiring email, etc).
            defaultValue: 'pleiades' + parseInt(Math.random() * 1000)
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        twitter_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        google_id: {
            type: Sequelize.STRING
        }
    }, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }, 
            updatePassword: function (newPassword) {
                // KC: Don't forget to add new salt as an argument when calling user.update! This function (updatePassword) is changing 2 properties (salt and password), so you need to update both. Not adding the salt to the update call was the reason you couldn't log in with either the old or the new password after a password change.
                console.log("salt: ", this.salt);
                console.log("new password: ", newPassword);
                this.salt = this.Model.generateSalt();
                this.password = this.Model.encryptPassword(newPassword, this.salt);
                return this.password;
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                console.log("plainText: ", plainText, "salt: ", salt)
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');

            }
        },
        hooks: {
            // // KC: Replaced beforeValidate with beforeCreate.
            // // But I think beforeValidate is what came with fsg?
            // beforeValidate: function (user) {
            //     if (user.changed('password')) {
            //         user.salt = user.Model.generateSalt();
            //         user.password = user.Model.encryptPassword(user.password, user.salt);
            //     }
            // }


            beforeCreate: function (user) {
                // KC: Added conditional so that hook runs only if password exists.
                // Otherwise, the route.use('/') causes problems because it runs users.create()
                // which causes an error because there's no password set yet.
                if (user.password) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }

        }
    });

   return User;

};