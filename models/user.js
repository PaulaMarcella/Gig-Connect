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
    //trim: true
  },
  imageURL: {
    type: String,
    default: '../images/default-user-icon-4.jpg'
  },
  userDescription: {
    type: String,
    default: 'User Description here'
  },
  eventsWatching: {
    type: Array
  },
  eventsAttending: {
    type: Array
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;