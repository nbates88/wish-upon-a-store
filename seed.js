/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var Promise = require('bluebird')


var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Collection = db.model('collection');


var seedUsers = function () {

    var users = [
        {
            name: 'fsa',
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: false
        },
        {
            name: 'Obama',
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedCollections = function () {

    var collections = [
        {
            name: 'Health'
        },
        {
            name: 'Career'
        },
        {   
            name: 'Romance'
        },
        {   
            name: 'Luxury'
        }
    ];

    var creatingCollections = collections.map(function (collectionObj) {
        return Collection.create(collectionObj);
    });

    return Promise
        .all(creatingCollections)
        .then(collections => collections.reduce((all, one) => (all[one.name] = one, all), {}))

};

var seedProducts = function (collections) {

  var product1 = Product.create({name: 'lose weight',
            description: 'lose five pounds',
            price: 5.50,
            inventoryQuantity: 5
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Health)
         .then(function(product){
                return product;
            })
   });

   var product2 = Product.create({
            name: 'get a job after senior phase',
            description: 'finished Grace Hopper yayyy need job',
            price: 10.50,
            inventoryQuantity: 22
        })
     .then(function(product){
        console.log(product);
        return product.addCollection(collections.Career)
            .then(function(product){
                return product;
            })
   });

     return Promise.all([product1, product2]);
};

db.sync({ force: true })
    .then(seedUsers)
    .then(seedCollections)
    .then(seedProducts)
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
