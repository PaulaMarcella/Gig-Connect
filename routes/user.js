'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const checkLogin = require('./../controllers/check-login');

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

router.post('/profile/edit', (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const userDescription = req.body.userDescription;

  const data = {
    firstname,
    lastname,
    userDescription
  };

  User.update({_id: req.session.user._id}, data)
    .then(user => {
      console.log(user);
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('Could not update user information', error);
    });
});

router.get('/image/edit', (req, res, next)=> {
  User.findById(req.session.user._id)
  .then((image)=> {
    console.log(image);
    res.render('image-edit', {image});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.post('/image/edit', upload.single('file'), (req, res, next) => {
  const imageURL = req.file.url;
  const data = {
    imageURL
  };

  User.update({_id: req.session.user._id}, data)
    .then(() => { //removed image
      res.redirect('/profile');
    })
    .catch((error) => {
      console.log('Could not update profile image', error);
    });
});

router.get('/profile/attending', (req, res, next) => {
  User.findById(req.session.user._id)
  .populate('eventsAttending')
  .then((user) => {
    console.log(user);
    res.render('profile-attending', {user});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.post('/eventPageAttend/:id', checkLogin, (req, res, next) => {
  const eventId = req.params.id;
  console.log(eventId);

  User.findByIdAndUpdate(req.session.user._id, {
    $push: {eventsAttending: eventId}
    }).populate('eventsAttending')
      .then(()=> {
        res.redirect('/eventPageAttend');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get('/eventPageAttend', (req, res, next)=> {
    const userId = req.session.user._id;
    User.findById(userId).populate('eventsAttending')
      .then((user)=> {
        console.log(user);
            res.render('profile-attending', {user});
          })
      .catch((error) => {
        console.log(error);
      });
    });
  
  module.exports = router;