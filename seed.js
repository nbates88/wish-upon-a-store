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

  var product1 = Product.create({name: 'Shed 5 pounds',
            description: "Cat ipsum dolor sit amet, immediately regret falling into bathtub where is my slave? I'm getting hungry chase laser. Make muffins eat the fat cats food walk on car leaving trail of paw prints on hood and windshield lick the plastic bag lick butt and make a weird face. Claw drapes chew on cable or lick the plastic bag bathe private parts with tongue then lick owner's face or mew, yet climb leg where is my slave? I'm getting hungry. Sniff other cat's butt and hang jaw half open thereafter lie on your belly and purr when you are asleep flop over, yet if it fits, i sits and lay on arms while you're using the keyboard meowwww. Rub face on everything. Scratch at the door then walk away groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! yet sit on human and refuse to leave cardboard box. Behind the couch loves cheeseburgers but attack feet, or scratch at the door then walk away throwup on your pillow if it smells like fish eat as much as you wish.",
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
            name: 'Get a muy bueno job *immediately* after Senior Phase',
            description: "Finished Grace Hopper yayyy need job. Lick arm hair ears back wide eyed sleep on dog bed, force dog to sleep on floor flop over. Hiss at vacuum cleaner. Thinking longingly about tuna brine if it smells like fish eat as much as you wish thinking longingly about tuna brine so eat and than sleep on your face peer out window, chatter at birds, lure them to mouth. Flee in terror at cucumber discovered on floor loves cheeseburgers sun bathe. Soft kitty warm kitty little ball of furr kitty scratches couch bad kitty pee in human's bed until he cleans the litter box flee in terror at cucumber discovered on floor flop over, yet this human feeds me, i should be a god. Slap owner's face at 5am until human fills food dish burrow under covers, or this human feeds me, i should be a god then cats take over the world human is washing you why halp oh the horror flee scratch hiss bite for asdflkjaertvlkjasntvkjn (sits on keyboard). Hack up furballs hide when guests come over, yet jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed purr for no reason sit on human if it smells like fish eat as much as you wish dream about hunting birds.",
            price: 10.50,
            inventoryQuantity: 22,
            imageUrl: 'http://www.techlicious.com/images/computers/woman-with-money-at-computer-shutterstock-510px.jpg'
        })
     .then(function(product){
        console.log(product);
        return product.addCollection(collections.Career)
            .then(function(product){
                return product;
            })
   });

     var product3 = Product.create({name: 'Find the love of your life',
            description: "Tired of all that online dating? We will introduce you to your soul mate. Sleep on keyboard attack dog, run away and pretend to be victim. Instantly break out into full speed gallop across the house for no reason lounge in doorway attack feet chase laser or meow, steal the warm chair right after you get up behind the couch. Attack dog, run away and pretend to be victim play time, for chirp at birds asdflkjaertvlkjasntvkjn (sits on keyboard). Claw drapes cats go for world domination. Cat snacks russian blue and poop on grasses throwup on your pillow, so chase red laser dot but damn that dog purr for no reason. Sit on the laptop put butt in owner's face yet jump around on couch, meow constantly until given food, have secret plans so sleep in the bathroom sink. Chase dog then run away leave fur on owners clothes put butt in owner's face burrow under covers.",
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

    var product4 = Product.create({name: 'Add an hour per day',
            description: "For when 24 hours just aren\'t enough. Refuse to leave cardboard box toy mouse squeak roll over and chew on cable. Roll on the floor purring your whiskers off burrow under covers, so ignore the squirrels, you'll never catch them anyway yet human is washing you why halp oh the horror flee scratch hiss bite knock dish off table head butt cant eat out of my own dish. Chase ball of string spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce spit up on light gray carpet instead of adjacent linoleum, but chase mice meowing non stop for food if it fits, i sits. Eat and than sleep on your face meow for food, then when human fills food dish, take a few bites of food and continue meowing. Refuse to drink water except out of someone's glass walk on car leaving trail of paw prints on hood and windshield or i am the best tuxedo cats always looking dapper or human give me attention meow yet use lap as chair, or where is my slave? I'm getting hungry. Lounge in doorway eat grass, throw it back up chase after silly colored fish toys around the house. Kitty loves pigs. Behind the couch hopped up on catnip, chase ball of string hola te quiero play time. Kick up litter when in doubt, wash i like big cats and i can not lie and put butt in owner's face run in circles. I am the best.",
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

    var product5 = Product.create({name: 'Function without sleep',
            description: "Even better than coffee. Groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! lay on arms while you're using the keyboard so climb a tree, wait for a fireman jump to fireman then scratch his face yet spit up on light gray carpet instead of adjacent linoleum. Scratch the furniture attack the dog then pretend like nothing happened, but hola te quiero. Flee in terror at cucumber discovered on floor poop on grasses caticus cuteicus, or poop in litter box, scratch the walls always hungry, use lap as chair, or plan steps for world domination. Wake up human for food at 4am i like big cats and i can not lie kick up litter. Fall asleep on the washing machine stares at human while pushing stuff off a table, but swat turds around the house so flee in terror at cucumber discovered on floor so chase red laser dot or scream at teh bath but lick yarn hanging out of own butt.",
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

    var product6 = Product.create({name: 'Read people\'s minds',
            description: "What is everyone thinking about you?? Roll on the floor purring your whiskers off. Favor packaging over toy. Cat is love, cat is life if it smells like fish eat as much as you wish hiss at vacuum cleaner hate dog if it fits, i sits for unwrap toilet paper. Paw at beetle and eat it before it gets away cough furball swat turds around the house stare out the window, or kitty loves pigs. Eat grass, throw it back up jump around on couch, meow constantly until given food, but stand in front of the computer screen. This human feeds me, i should be a god. Meowwww eat grass, throw it back up stare at the wall, play with food and get confused by dust play riveting piece on synthesizer keyboard or pelt around the house and up and down stairs chasing phantoms. Find empty spot in cupboard and sleep all day paw at beetle and eat it before it gets away for my left donut is missing, as is my right need to chase tail, or paw at beetle and eat it before it gets away. Hide when guests come over my left donut is missing, as is my right and refuse to drink water except out of someone's glass, for destroy couch.",
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

    var product7 = Product.create({name: 'Network like supadupastah',
            description: "Magically transform into a social butterfly. Eat grass, throw it back up russian blue ears back wide eyed for chase red laser dot but russian blue. Mark territory eat a plant, kill a hand. Give attitude lick sellotape or under the bed use lap as chair lick butt, but kitty scratches couch bad kitty, or ignore the squirrels, you'll never catch them anyway. Scratch at the door then walk away stretch slap owner's face at 5am until human fills food dish hate dog, for you call this cat food? and my left donut is missing, as is my right yet intently stare at the same spot. When in doubt, wash peer out window, chatter at birds, lure them to mouth sit by the fire and dream about hunting birds. Poop in the plant pot sleep nap for drink water out of the faucet, steal the warm chair right after you get up yet knock dish off table head butt cant eat out of my own dish so fall over dead (not really but gets sypathy), but cat snacks.",
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
        console.log(chalk.yellow('***** OMG that was like the best seed evah! *****'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
