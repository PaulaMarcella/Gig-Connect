'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require("bcrypt");

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});


const User = require('./../models/user');


router.post('/signup', (req, res, next)=> {
  //const fistname = req.body.password;
  //const lastname = req.body.password;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

 User.create({ username: username, passwordHash: password, email: email })
        .then(user => { console.log('The user is saved and its value is: ', user) })
        .catch(err => { console.log('An error happened:', err)});

});
  router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });

module.exports = router;