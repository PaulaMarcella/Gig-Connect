'use strict';

const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

router.get('/', (req, res, next) => {
  Event.find()
  .then(eventList => {
    const data = {
      eventList
    };
    //console.log(data);
    res.render('index', data);
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;