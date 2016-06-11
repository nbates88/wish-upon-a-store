'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Product = require('./models/product')(db);
var Order = require('./models/order')(db);
var Review = require('./models/review')(db);
var Collection = require('./models/collection')(db);
var Wishlist = require('./models/wishlist')(db);
var OrderProducts = require('./models/orderProducts')(db);

Product.belongsToMany(Order, {through: OrderProducts});
Order.belongsToMany(Product, {through: OrderProducts});
// Order.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Order, {as: 'Orders'});
Review.belongsTo(Product);
Review.belongsTo(User);

// Review.belongsToMany(Product, {through: 'ProductReview', through: 'UserReview'})
// Review.belongsToMany(User, {through: 'UserReview', through: 'UserReview'})

User.hasMany(Review, {as: 'Reviews'})
Product.hasMany(Review, {as: 'Reviews'})

Product.belongsToMany(Collection, {through: 'CollectionProduct'});
Collection.belongsToMany(Product, {through: 'CollectionProduct'});
Product.belongsToMany(Wishlist, {through: 'WishlistProduct'});
Wishlist.belongsTo(User);
