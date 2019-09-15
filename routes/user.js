'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('user', { name: 'James Dean' });
});

module.exports = router;
