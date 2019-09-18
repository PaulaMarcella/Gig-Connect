'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  artists: {
    type: String //change to array
    //required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true //change to array
  },
  city: {
    type: String,
    required: true
  },
  ticketURL: {
    type: String
  },
  imageURL: {
    type: String,
    default: '../images/joshua-hoehne-6M9jjeZjscE-unsplash.jpg'
    //required: true
  },
  date: {
    type: Date
    //required: true
    //
  }
});

module.exports = mongoose.model('Event', eventSchema);
