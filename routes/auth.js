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

  
  bcrypt.hash(passwordHash, 10)
      .then(hash => {
        return User.create( {
          firstname,
          lastname,
          email,
          username,
          passwordHash: hash
        });
        res.redirect('/user');
      })
      .catch(error => {
        console.log('Could not sign up user', error);
      });
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });

module.exports = router;