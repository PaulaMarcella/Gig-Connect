'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    required: true,
    unique: true
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
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
    type: [ObjectId],
    default: []
  },
  eventsAttending: {
    type: [ObjectId],
    default: []
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;