'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require("bcrypt");
const User = require('../models/user');


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  console.log('signup post route req.body',req.body);
  //const fistname = req.body.password;
  //const lastname = req.body.password;
  const email = req.body.email;
  const username = req.body.username;
  const passwordHash = req.body.password;
  
  bcrypt.hash(passwordHash, 10)
      .then(hash => {
        User.create( {
          email,
          username,
          passwordHash: hash
        });
        res.redirect('/auth/user');
      })
      .catch(error => {
        console.log('Could not sign up user', error);
      });
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });

module.exports = router;