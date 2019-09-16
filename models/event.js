'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ticketURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
