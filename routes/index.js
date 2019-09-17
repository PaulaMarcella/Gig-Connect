'use strict';

const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'GigConnect' });
});

// Work in progress:
// router.get('/', (req, res, next) => {
//   Event.findById(req.body.)
//   .then((event) => {
//     res.render('index', {event});
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// });

module.exports = router;