'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,
    trim: true
  },
  imageURL: {
    type: String
  }
  
});

//module.exports = mongoose.model('User', userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;