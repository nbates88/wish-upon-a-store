var Promise = require('bluebird')

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Collection = db.model('collection');
var Review = db.model('review');

///////////////

/* SEED DATA */

///////////////

var users = [{
  name: 'fsa',
  email: 'testing@fsa.com',
  password: 'password',
  isAdmin: false
}, {
  name: 'Obama',
  email: 'obama@gmail.com',
  password: 'potus',
  isAdmin: true
}, {
  name: 'chewbacca',
  email: 'chewbacca@star.wars',
  password: 'wuhhha',
  isAdmin: false
}, {
  name: 'definitelynotarobot',
  email: 'beep@boop.com',
  password: 'wuhhha',
  isAdmin: true
}];

var collections = [{
  name: 'Health'
}, {
  name: 'Career'
}, {
  name: 'Romance'
}, {
  name: 'Luxury'
}];

var products = [{
  name: 'Lose weight',
  description: "Cat ipsum dolor sit amet, immediately regret falling into bathtub where is my slave? I'm getting hungry chase laser. Make muffins eat the fat cats food walk on car leaving trail of paw prints on hood and windshield lick the plastic bag lick butt and make a weird face. Claw drapes chew on cable or lick the plastic bag bathe private parts with tongue then lick owner's face or mew, yet climb leg where is my slave? I'm getting hungry. Sniff other cat's butt and hang jaw half open thereafter lie on your belly and purr when you are asleep flop over, yet if it fits, i sits and lay on arms while you're using the keyboard meowwww. Rub face on everything. Scratch at the door then walk away groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! yet sit on human and refuse to leave cardboard box. Behind the couch loves cheeseburgers but attack feet, or scratch at the door then walk away throwup on your pillow if it smells like fish eat as much as you wish.",
  price: 5.50,
  inventoryQuantity: 5,
  imageUrl: 'http://cdn-image.myrecipes.com/sites/default/files/styles/300x300/public/image/articles/10/scale_upload-x.jpg?itok=VJ14_e8V'
}, {
  name: 'Get a muy bueno job *immediately* after Senior Phase',
  description: "Finished Grace Hopper yayyy need job. Lick arm hair ears back wide eyed sleep on dog bed, force dog to sleep on floor flop over. Hiss at vacuum cleaner. Thinking longingly about tuna brine if it smells like fish eat as much as you wish thinking longingly about tuna brine so eat and than sleep on your face peer out window, chatter at birds, lure them to mouth. Flee in terror at cucumber discovered on floor loves cheeseburgers sun bathe. Soft kitty warm kitty little ball of furr kitty scratches couch bad kitty pee in human's bed until he cleans the litter box flee in terror at cucumber discovered on floor flop over, yet this human feeds me, i should be a god. Slap owner's face at 5am until human fills food dish burrow under covers, or this human feeds me, i should be a god then cats take over the world human is washing you why halp oh the horror flee scratch hiss bite for asdflkjaertvlkjasntvkjn (sits on keyboard). Hack up furballs hide when guests come over, yet jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed purr for no reason sit on human if it smells like fish eat as much as you wish dream about hunting birds.",
  price: 10.50,
  inventoryQuantity: 22,
  imageUrl: 'http://blog.jobtoday.com/wp-content/uploads/2016/02/land-a-job.jpg'
}, {
  name: 'Find the love of your life',
  description: 'Tired of all that online dating? We will introduce you to your soul mate. Caution: soul mate might be a goat.',
  price: 25.99,
  inventoryQuantity: 5,
  imageUrl: 'http://assets.merriam-webster.com/mw/images/article/art-wap-landing-mp-lg/love-valentines-day-79@1x.jpg'
}, {
  name: 'An extra hour every day',
  description: 'For when 24 hours just aren\'t enough.',
  price: 4.99,
  inventoryQuantity: 15,
  imageUrl: 'http://victorygirlsblog.com/wp-content/uploads/2015/09/clock1.jpg'
}, {
  name: 'Function without sleep',
  description: 'Even better than coffee',
  price: 73.99,
  inventoryQuantity: 25,
  imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/c3/86/93/c38693f05449bd2036db57afb9b8b200.jpg'
}, {
  name: 'Read people\'s minds',
  description: 'What is everyone thinking about you??',
  price: 199.99,
  inventoryQuantity: 3,
  imageUrl: 'http://www.learning-mind.com/wp-content/uploads/2013/10/mind-reading.jpg'
}, {
  name: 'The ability to network',
  description: 'Break out of that shy cocoon and magically transform into a social butterfly!',
  price: 129.99,
  inventoryQuantity: 7,
  imageUrl: 'http://newventurist.com/wp-content/uploads/2015/10/networking.jpg'
}, {
  name: 'Get a promotion at work',
  description: 'The promotion you\'ve been owed is within reach. Salary boost and respect of your professional peers not guaranteed.',
  price: 29.99,
  inventoryQuantity: 13
}, {
  name: 'Get your ex back',
  description: 'They\'ll immediately realize how mistaken they were for leaving you. Cheaper than finding the love of your life, but let\'s be honest here, do you really want your ex back?',
  price: 9.99,
  inventoryQuantity: 33
}, {
  name: 'Dr. Braun\'s Magic Panacea',
  description: 'No matter what ails you, you will wake up tomorrow completely healed',
  price: 529.50,
  inventoryQuantity: 7
}]

var orders = [{
  status: 'Created',
  userId: 1
}, {
  status: 'Processing',
  userId: 2
}, {
  status: 'Processing',
  userId: 1
}];

var reviews = [{
  stars: 1,
  userId: 2,
  productId: 1,
  description: 'After I bought this wish, I was mailed a 1-year gym membership. CONDESCENDING WASTE OF MONEY.'
}, {
  stars: 3,
  userId: 1,
  productId: 7,
  description: 'I turned into a social moth. Please help.'
}, {
  stars: 1,
  userId: 1,
  productId: 3,
  description: 'THE PACKAGE WAS DELIVERED IN A DENTED AND WET BOX. CUSTOMER SERVICE REFUSED TO HELP AND SAID THAT IT WAS NOT THEIR FAULT IT WAS RAINING. SCAMMERS!! RIP OFF!!!!'
}, {
  stars: 2,
  userId: 3,
  productId: 3,
  description: 'aguhwwgggghhh uughguughhhghghghhhgh huuguughghg uggguh uughghhhgh aaaaahnr aarrragghuuhw uhghhhgh uughghhhgh aarrragghuuhw huuguughghg huurh'
}, {
  stars: 5,
  userId: 3,
  productId: 5,
  description: 'aarrragghuuhw uughghhhgh aaahnruh hnnnhrrhhh uugggh huuguughghg uughghhhgh aguhwwgggghhh uughguughhhghghghhhgh uggguh uughghhhgh aaaaahnr aarrragghuuhw uughghhhgh aarrragghuuhw huuguughghg huurh uughguughhhghghghhhgh huuguughghg aaaaahnr raaaaaahhgh uughguughhhghghghhhgh huuguughghg wuuh wrrhw raaaaaahhgh raaaaaahhgh huuguughghg wrrhwrwwhw'
}, {
  stars: 5,
  userId: 4,
  productId: 4,
  description: 'beep boop beep beep BOP BOP beep BEEP boop beep boop bop MORE TIME TO ANNIHILATE HUMANITY boop beep bop'
}, {
  stars: 3,
  userId: 2,
  productId: 4,
  description: 'I got an extra hour every day but I just spent the time watching Keeping up with the Kardashians.'
}, ];

////////////////////

/* SEED FUNCTIONS */

////////////////////

var seedUsers = function() {

  var creatingUsers = users.map(function(userObj) {
    return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

var seedCollections = function() {

  var creatingCollections = collections.map(function(collectionObj) {
    return Collection.create(collectionObj);
  });

  return Promise
    .all(creatingCollections)
    .then(collections => collections.reduce((all, one) => (all[one.name] = one, all), {}))

};

var seedProducts = function(collections) {

  return Product.create(products[0])
    .then(function(product) {
      return product.addCollection(collections.Health)
    })
    .then(function(product) {
      return Product.create(products[1])
    })
    .then(function(product) {
      return product.addCollection(collections.Career)
    })
    .then(function(product) {
      return Product.create(products[2])
    })
    .then(function(product) {
      return product.addCollection(collections.Romance)
    })
    .then(function(product) {
      return Product.create(products[3]);
    })
    .then(function(product) {
      return product.addCollection(collections.Luxury)
    })
    .then(function(product) {
      return Product.create(products[4])
    })
    .then(function(product) {
      return product.addCollection(collections.Luxury)
    })
    .then(function(product) {
      return Product.create(products[5])
    })
    .then(function(product) {
      return product.addCollection(collections.Luxury)
    })
    .then(function(product) {
      return Product.create(products[6])
    })
    .then(function(product) {
      return product.addCollection(collections.Luxury)
    })
    .then(function(product) {
      return Product.create(products[7])
    })
    .then(function(product) {
      return product.addCollection(collections.Career)
    })
    .then(function(product) {
      return Product.create(products[8])
    })
    .then(function(product) {
      return product.addCollection(collections.Romance)
    })
    .then(function(product) {
      return Product.create(products[9])
    })
    .then(function(product) {
      return product.addCollection(collections.Health)
    })
    .then(function(product) {
      console.log('done adding products');
    })

};


var seedOrders = function() {

  var creatingOrders = orders.map(function(order) {
    return Order.create(order)
      .then(function(response) {
        return response;
      });
  });

  return Promise.all(creatingOrders)
    .then(function() {
      console.log('done creating orders');
    })
};

var seedReviews = function() {

  var creatingReviews = reviews.map(function(review) {
    return Review.create(review)
      .then(function(response) {
        return response
      });
  });

  return Promise.all(creatingReviews)
    .then(function() {
      console.log('done creating reviews');
    })
};

///////////////////

/* BEGIN SEEDING */

///////////////////

db.sync({ force: true })
  .then(seedUsers)
  .then(seedCollections)
  .then(seedProducts)
  .then(seedOrders)
  .then(seedReviews)
  .then(function() {
    console.log(chalk.yellow('***** OMG that was like the best seed evah! *****'));
    process.exit(0);
  })
  .catch(function(err) {
    console.error(err);
    process.exit(1);
  });
