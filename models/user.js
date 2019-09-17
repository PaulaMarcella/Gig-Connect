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
  },
  userDescribtion: {
    type: String,
    default: 'User Describtion here'
  }
});


/*
const cloudinary = require('cloudinary');
userSchema.virtual('resizedURL').get(function() {
  const user = this;
  console.log(user);
  const path = user.imageURL.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
  
  return cloudinary.url(path, { width: 800 });
});
*/

const User = mongoose.model('User', userSchema);

module.exports = User;