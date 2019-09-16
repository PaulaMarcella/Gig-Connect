'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('index');
});

/*
router.get('/user', (req, res, next) => {

  res.render('user');
});
*/

router.get('/user', (req, res, next) => {
  const userId = req.session.user._id;
  //console.log(req.session);
  User.findById(userId)
    .then(() => {
      res.render('user');

    })
    .catch(error => {
      console.log('User not found', error);
    });
});


module.exports = router;