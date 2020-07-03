'use strict';

const MONGOOSE = require('mongoose');

// Starting Database
MONGOOSE.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
MONGOOSE.Promise = global.Promise;

module.exports = MONGOOSE;
