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
  name: 'Shed 5 pounds',
  description: "Cat ipsum dolor sit amet, immediately regret falling into bathtub where is my slave? I'm getting hungry chase laser. Make muffins eat the fat cats food walk on car leaving trail of paw prints on hood and windshield lick the plastic bag lick butt and make a weird face. Claw drapes chew on cable or lick the plastic bag bathe private parts with tongue then lick owner's face or mew, yet climb leg where is my slave? I'm getting hungry. Sniff other cat's butt and hang jaw half open thereafter lie on your belly and purr when you are asleep flop over, yet if it fits, i sits and lay on arms while you're using the keyboard meowwww. Rub face on everything. Scratch at the door then walk away groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! yet sit on human and refuse to leave cardboard box. Behind the couch loves cheeseburgers but attack feet, or scratch at the door then walk away throwup on your pillow if it smells like fish eat as much as you wish.",
  price: 5.50,
  inventoryQuantity: 5,
  imageUrl: 'http://cdn-image.myrecipes.com/sites/default/files/styles/300x300/public/image/articles/10/scale_upload-x.jpg?itok=VJ14_e8V'
}, {
  name: 'Un muy bueno job after GHA',
  description: "Finished Grace Hopper yayyy need job. Hiss at vacuum cleaner. Thinking longingly about tuna brine if it smells like fish eat as much as you wish thinking longingly about tuna brine so eat and than sleep on your face peer out window, chatter at birds, lure them to mouth. Flee in terror at cucumber discovered on floor loves cheeseburgers sun bathe. Soft kitty warm kitty little ball of furr kitty scratches couch bad kitty pee in human's bed until he cleans the litter box flee in terror at cucumber discovered on floor flop over, yet this human feeds me, i should be a god. Slap owner's face at 5am until human fills food dish burrow under covers, or this human feeds me, i should be a god then cats take over the world human is washing you why halp oh the horror flee scratch hiss bite for asdflkjaertvlkjasntvkjn (sits on keyboard). Hack up furballs hide when guests come over, yet jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed purr for no reason sit on human if it smells like fish eat as much as you wish dream about hunting birds.",
  price: 10.50,
  inventoryQuantity: 22,
  imageUrl: 'http://www.techlicious.com/images/computers/woman-with-money-at-computer-shutterstock-510px.jpg'
}, {
  name: 'Find the love of your life',
  description: "Tired of all that online dating? We will introduce you to your soul mate. Caution: soul mate might be a goat. Scratch leg; meow for can opener to feed me poop on grasses cough furball lick the plastic bag for cat slap dog in face, chase red laser dot knock dish off table head butt cant eat out of my own dish. Chew iPad power cord hide at bottom of staircase to trip human and flop over. Immediately regret falling into bathtub paw at beetle and eat it before it gets away pee in human's bed until he cleans the litter box. If it smells like fish eat as much as you wish. Destroy couch paw at beetle and eat it before it gets away swat at dog, yet swat at dog. Paw at beetle and eat it before it gets away groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! but cat snacks leave fur on owners clothes chirp at birds.",
  price: 25.99,
  inventoryQuantity: 5,
  imageUrl: 'http://assets.merriam-webster.com/mw/images/article/art-wap-landing-mp-lg/love-valentines-day-79@1x.jpg'
}, {
  name: 'An extra hour every day',
  description: "For when 24 hours just aren\'t enough. Hunt anything that moves refuse to leave cardboard box, scratch leg; meow for can opener to feed me but attack feet, but roll on the floor purring your whiskers off so bathe private parts with tongue then lick owner's face but roll on the floor purring your whiskers off. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce. Stare at ceiling light stick butt in face, but wake up human for food at 4am, eat from dog's food, so if it smells like fish eat as much as you wish. Chase mice touch water with paw then recoil in horror. Where is my slave? I'm getting hungry destroy couch nap all day. Ignore the squirrels, you'll never catch them anyway sit on the laptop yet lounge in doorway for favor packaging over toy. Curl into a furry donut.",
  price: 4.99,
  inventoryQuantity: 15,
  imageUrl: 'http://victorygirlsblog.com/wp-content/uploads/2015/09/clock1.jpg'
}, {
  name: 'Function without sleep',
  description: "Even better than coffee Chase the pig around the house jump off balcony, onto stranger's head for hide at bottom of staircase to trip human throwup on your pillow gnaw the corn cob. Chase the pig around the house meowwww for sniff other cat's butt and hang jaw half open thereafter. Chase mice eat owner's food so eat the fat cats food and spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce under the bed. Mew. Stare out the window kitty power! sleep on dog bed, force dog to sleep on floor so behind the couch. Chase mice chase after silly colored fish toys around the house and i am the best. Cat is love, cat is life why must they do that human give me attention meow.",
  price: 73.99,
  inventoryQuantity: 25,
  imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/c3/86/93/c38693f05449bd2036db57afb9b8b200.jpg'
}, {
  name: "Read people\'s minds",
  description: "What is everyone thinking about you?? Inspect anything brought into the house scratch leg; meow for can opener to feed me steal the warm chair right after you get up hide at bottom of staircase to trip human ears back wide eyed so get video posted to internet for chasing red dot but lay on arms while you're using the keyboard. Steal the warm chair right after you get up chase laser climb leg, yet scream at teh bath, so drink water out of the faucet intently stare at the same spot. Toy mouse squeak roll over intently sniff hand jump off balcony, onto stranger's head or stare at ceiling light. Play riveting piece on synthesizer keyboard pelt around the house and up and down stairs chasing phantoms Gate keepers of hell, for Gate keepers of hell but wake up human for food at 4am chase laser. Throwup on your pillow lick plastic bags. Where is my slave? I'm getting hungry asdflkjaertvlkjasntvkjn (sits on keyboard) eat grass, throw it back up play time. Chase dog then run away eat a plant, kill a hand or human give me attention meow so dream about hunting birds use lap as chair.",
  price: 199.99,
  inventoryQuantity: 3,
  imageUrl: 'http://www.learning-mind.com/wp-content/uploads/2013/10/mind-reading.jpg'
}, {
  name: 'Network like a supadupastah',
  description: "Break out of that shy cocoon and magically transform into a social butterfly! Pooping rainbow while flying in a toasted bread costume in space put toy mouse in food bowl run out of litter box at full speed , so need to chase tail, or chase laser, please stop looking at your phone and pet me but poop in the plant pot. Stares at human while pushing stuff off a table hide head under blanket so no one can see yet why must they do that. Love to play with owner's hair tie chase after silly colored fish toys around the house, yet favor packaging over toy for roll on the floor purring your whiskers off thug cat where is my slave? I'm getting hungry for kitty power!",
  price: 129.99,
  inventoryQuantity: 7,
  imageUrl: 'http://newventurist.com/wp-content/uploads/2015/10/networking.jpg'
}, {
  name: 'Get a promotion at work',
  description: "The promotion you\'ve been owed is within reach. Salary boost and respect of your professional peers not guaranteed. Scratch at the door then walk away scratch at the door then walk away or run in circles favor packaging over toy human is washing you why halp oh the horror flee scratch hiss bite. Flop over knock over christmas tree drink water out of the faucet. Hopped up on catnip who's the baby, and chase dog then run away this human feeds me, i should be a god kitty power! . Purr for no reason cats go for world domination but kick up litter or hack up furballs yet thinking longingly about tuna brine get video posted to internet for chasing red dot play time. Gate keepers of hell i like big cats and i can not lie slap owner's face at 5am until human fills food dish and kitty power! lie on your belly and purr when you are asleep. ",
  price: 29.99,
  inventoryQuantity: 13
}, {
  name: 'Get your ex back',
  description: "They\'ll immediately realize how mistaken they were for leaving you. Cheaper than finding the love of your life, but let\'s be honest here, do you really want your ex back? Meow for food, then when human fills food dish, take a few bites of food and continue meowing destroy couch hola te quiero. Hide at bottom of staircase to trip human ignore the squirrels, you'll never catch them anyway, for knock over christmas tree. Caticus cuteicus scratch at the door then walk away jump around on couch, meow constantly until given food, so toy mouse squeak roll over climb a tree, wait for a fireman jump to fireman then scratch his face and i am the best for touch water with paw then recoil in horror. I like big cats and i can not lie i like big cats and i can not lie and attack feet, for has closed eyes but still sees you lick sellotape. Cough furball eat owner's food yet lick butt attack the dog then pretend like nothing happened so hate dog paw at your fat belly yet chase laser. If it smells like fish eat as much as you wish purr while eating or white cat sleeps on a black shirt and chase laser find something else more interesting. Sit on the laptop lick yarn hanging out of own butt and kick up litter.",
  price: 9.99,
  inventoryQuantity: 33
}, {
  name: 'Dr. Braun\'s Magic Panacea',
  description: "No matter what ails you, you will wake up tomorrow completely healed Refuse to leave cardboard box steal the warm chair right after you get up and flop over knock dish off table head butt cant eat out of my own dish, favor packaging over toy present belly, scratch hand when stroked. Human give me attention meow cat is love, cat is life favor packaging over toy. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed kick up litter. Touch water with paw then recoil in horror hunt by meowing loudly at 5am next to human slave food dispenser for lick arm hair yet tuxedo cats always looking dapper. Chase ball of string jump around on couch, meow constantly until given food, claws in your leg chase imaginary bugs. ",
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
