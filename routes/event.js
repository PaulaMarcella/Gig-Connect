'use strict';

const { Router } = require('express');
const router = Router();

router.get('/event', (req, res, next) => {
    res.render('event/event');
  });

module.exports = router;