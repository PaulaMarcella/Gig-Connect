'use strict';

const mongoose = require('mongoose');

const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

exports.connect = uri => mongoose.connect(uri, mongooseConnectionOptions);
exports.disconnect = mongoose.disconnect;
