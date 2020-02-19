"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  artists: [{ type: String }],
  genre: [{ type: String }],
  city: {
    type: String,
    required: true
  },
  ticketURL: {
    type: String
  },
  imageURL: {
    type: String,
    default: "../images/default-image.jpg"
    //required: true
  },
  date: {
    type: Date
    //required: true
    //
  },
  creator: {
    type: ObjectId,
    ref: "User"
  },
  comments: [
    {
      commentBody: String,
      commentTitle: String,
      commentAuthor: { type: ObjectId, ref: "User" }
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
