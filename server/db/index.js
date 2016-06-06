'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/product')(db);
require('./models/order')(db);
require('./models/review')(db);
require('./models/collection')(db);
require('./models/wishlist')(db);

