'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

//-------cloudinary configurations--------

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/gig-connect',
  allowedFormats: [ 'jpg', 'png' ]
});
const upload = multer({ storage });

//----------------------------------------

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
  User.findById(req.session.user._id)
  .then((user) => {
    console.log(user);
    res.render('profile', {user});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/profile/edit', (req, res, next)=> {
  User.findById(req.session.user._id)
  .then((user)=> {
    console.log(user);
    res.render('profile-edit', {user});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.post('/profile/edit', upload.single('file'), (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const imageURL = req.file.url;

  const data = {
    firstname,
    lastname,
    imageURL
  };

  User.update({_id: req.session.user._id}, data)
    .then(user => {
      console.log(user);
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('Could not update user information');
    });
});

module.exports = router;