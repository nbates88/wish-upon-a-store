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
var Order = db.model('order');
var Collection = db.model('collection');
var Review = db.model('review');


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

  var product1 = Product.create({name: 'Lose weight',
            description: 'Shed five pounds',
            price: 5.50,
            inventoryQuantity: 5,
            imageUrl: 'http://cdn-image.myrecipes.com/sites/default/files/styles/300x300/public/image/articles/10/scale_upload-x.jpg?itok=VJ14_e8V'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Health)
         .then(function(product){
                return product;
            })
   });

   var product2 = Product.create({
            name: 'Get a job after senior phase',
            description: 'Finished Grace Hopper yayyy need job',
            price: 10.50,
            inventoryQuantity: 22,
            imageUrl: 'http://blog.jobtoday.com/wp-content/uploads/2016/02/land-a-job.jpg'
        })
     .then(function(product){
        console.log(product);
        return product.addCollection(collections.Career)
            .then(function(product){
                return product;
            })
   });

     var product3 = Product.create({name: 'Find the love of your life',
            description: 'Tired of all that online dating? We will introduce you to your soul mate',
            price: 25.99,
            inventoryQuantity: 5,
            imageUrl: 'http://assets.merriam-webster.com/mw/images/article/art-wap-landing-mp-lg/love-valentines-day-79@1x.jpg'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Romance)
         .then(function(product){
                return product;
            })
   });

    var product4 = Product.create({name: 'Add an hour an day',
            description: 'For when 24 hours just aren\'t enough',
            price: 4.99,
            inventoryQuantity: 15,
            imageUrl: 'http://victorygirlsblog.com/wp-content/uploads/2015/09/clock1.jpg'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Luxury)
         .then(function(product){
                return product;
            })
   });

    var product5 = Product.create({name: 'The power to function without sleep',
            description: 'Even better than coffee',
            price: 73.99,
            inventoryQuantity: 25,
            imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/c3/86/93/c38693f05449bd2036db57afb9b8b200.jpg'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Luxury)
         .then(function(product){
                return product;
            })
   });

    var product6 = Product.create({name: 'The power to read people\'s minds',
            description: 'What is everyone thinking about you??',
            price: 199.99,
            inventoryQuantity: 3,
            imageUrl: 'http://www.learning-mind.com/wp-content/uploads/2013/10/mind-reading.jpg'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Luxury)
         .then(function(product){
                return product;
            })
   });

    var product7 = Product.create({name: 'The power to network',
            description: 'Magically transform into a social butterfly',
            price: 129.99,
            inventoryQuantity: 7,
            imageUrl: 'http://newventurist.com/wp-content/uploads/2015/10/networking.jpg'
        })
    .then(function(product){
        var product = product;
        return product.addCollection(collections.Luxury)
         .then(function(product){
                return product;
            })
   });

     return Promise.all([product1, product2, product3, product4, product5, product6]);
};

var seedOrders = function () {

    var orders = [
        {
            status: 'Created',
            userId: 1
        },
        {
            status: 'Processing',
            userId: 2
        }
    ];

    var creatingOrders = orders.map(function (order) {
        return Order.create(order)
            .then(function(response) {
                return response;
            });
    });

    return Promise.all(creatingOrders);

};

var seedReviews = function () {

    var reviews = [
        {
            stars: 1,
            userId: 1,
            productId: 1,
            description: 'This sux'
        },
        {
            stars: 5,
            userId: 1,
            productId: 2,
            description: 'This rox'
        },
        {
            stars: 1,
            userId: 1,
            productId: 3,
            description: 'THE PACKAGE WAS DELIVERED IN A DENTED AND WET BOX WHAT A RIP OFF!!!!'
        },
        {
            stars: 5,
            userId: 1,
            productId: 4,
            description: 'Not really sure what this did for me but it was great'
        },
        {
            stars: 2,
            userId: 2,
            productId: 3,
            description: 'Meh'
        },
    ];

    var creatingReviews = reviews.map(function (review) {
        return Review.create(review)
            .then(function(response) {
                return response
            });
    });

    return Promise.all(creatingReviews);

};

db.sync({ force: true })
    .then(seedUsers)
    .then(seedCollections)
    .then(seedProducts)
    .then(seedOrders)
    .then(seedReviews)
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
