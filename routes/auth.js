'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require("bcrypt");
const User = require('../models/user');


router.get('/', (req, res, next) => {
  res.render('index', { title: 'GigConnect' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const passwordHash = req.body.password;
  const imageURL = req.body.imageURL;

  
  bcrypt.hash(passwordHash, 10)
      .then(hash => {
        return User.create( {
          firstname,
          lastname,
          email,
          username,
          passwordHash: hash,
          imageURL
        });
        //res.redirect('/user');
      })
      .catch(error => {
        console.log('Could not sign up user', error);
      });
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });

  router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const passwordHash = req.body.password;

    let tempUser;

    User.findOne({ username })
      .then(user => {
        if (!user) {
          throw new Error ('username could not be found');
        } else {
          tempUser = user;
          return bcrypt.compare(passwordHash, user.passwordHash);
        }
      })
      .then(match => {
        if (!match) {
          throw new Error ('Ups! Wrong Password!');
        } else {
          req.session.user = {
            _id: tempUser._id
          };
          res.redirect('profile');
        }
      })
      .catch(error => {
        console.log('Problem Logging user in', error);
        next(error);
      });
  });
  
  router.get('/logout', (req, res, next) => {
    req.session.destroy((error) => {
      // can't access session here
      res.redirect('/login');
    });
  });
  
module.exports = router;