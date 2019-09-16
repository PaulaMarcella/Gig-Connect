'use strict';

const { Router } = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt         = require("bcrypt");

router.get('/', (req, res, next) => {
  res.render('index', { title: 'GigConnect' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next)=> {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const salt     = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  User.create({
    username,
    password: passwordHash,
    email
  })
  .then(()=> {
    res.redirect('/signup');
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;